if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const cors = require("cors");
const session = require('express-session');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const {storage} = require('./cloudinary')
const upload = multer({storage})
//const upload = multer({ dest: 'uploads/' })

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {  
      expires: 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "roomfinder",
});
     
app.get("/", (req, res) => {});

//Add one room
app.post("/add",upload.single('image'),(req, res) => {
  const title = req.body.title;
  const location = req.body.location;
  const price = req.body.price;
  const image = req.file.path;
  image.replace('/upload','/upload/w_200')

  console.log(image)

  db.query(
    "INSERT INTO room(title,location,price,image) VALUES (?,?,?,?)",
    [title, location, price, image],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );

});

// app.post('/add2', upload.single('image'), function (req, res) {
//     const Title = req.file.filename;
//     const Url = req.file.path;
//     console.log(req.body.title)
//     db.query(
//       "INSERT INTO images(Title,Url) VALUES (?,?)",
//       [Title,Url],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//         } else {
//           res.send(result);
//         }
//       }
//     );
// })

//Get one room 
app.get("/room/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM room WHERE ID_room = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Get all the rooms
app.get("/rooms", (req, res) => {
  db.query("SELECT * FROM room", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//Update one room
app.put("/rooms/edit/:id", (req, res) => {
  const { id } = req.params;
  const { title, location, price } = req.body;

  db.query(
    "UPDATE room SET Title = ?, Location = ?, Price = ? WHERE ID_room = ?",
    [title, location, price, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//Delete one room
app.delete("/rooms/remove/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM room WHERE ID_room = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Register a user

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  let shouldRedirect = false;

  await db.query(
    "SELECT * FROM users WHERE Usr_name = ? OR Usr_email = ?",
    [username, email],
    async (err, result) => {
      if (result.length == 0) {
        console.log("kokoko");
        const hash = await bcrypt.hash(password, 12);
        await db.query(
          "INSERT INTO users(Usr_name,Usr_psw,Usr_email) VALUES (?,?,?)",
          [username, hash, email]
        );

        shouldRedirect = true;
      }
    }
  );
  res.send(shouldRedirect);
});

//Loging in a user 

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);

  await db.query(
    "SELECT * FROM users WHERE Usr_name = ?",
    username,
    async (err, result) => {
      const validPsw = await bcrypt.compare(
        password,
        result[0].Usr_psw
      );
      if (validPsw) {
        const user = result[0]
        //env file for the future 
        
        const accessToken = genereteAccessToken(user);
        const refreshToken = generateRefreshToke(user);
        refreshTokens.push(refreshToken);
        
         console.log("Welcome In brooo")
         res.json({
          username: result[0].Usr_name,
          isAdmin: result[0].isAdmin,
          accessToken,
          refreshToken,
         })
      } else {
        console.log("Try again bro");
        res.status(404).json("Username or password incorrect!")
      }
    }
  );
});

let refreshTokens = [];

app.post("/api/refresh", (req, res) => {
  //take the refresh token from the user
  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }
  jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });

  //if everything is ok, create new access token, refresh token and send to user
});


const verify = (req,res,next) =>{
  const authHeader = req.headers.authorization;
  if(authHeader){
    const token = authHeader.split(" ")[1];
    jwt.verify((token,"mySecretKey"),(err,user)=>{
      if(err){
        return res.status(403).json("Token is not valid");
      }
      req.user = user ;
      next();
    });
  } else{
    res.status(401).json("You are not authenticated");
  }
};



const genereteAccessToken = (user) =>{
  return jwt.sign({id:user.id, isAdmin:user.isAdmin},"mySecretKey",{
    expiresIn:"5s"
  });
};

const generateRefreshToke = (user)=>{
  return jwt.sign({id:user.id, isAdmin:user.isAdmin},"myRefreshKey")
};



app.listen(3001, () => {
  console.log("Server RUnning on port 3001");
});
