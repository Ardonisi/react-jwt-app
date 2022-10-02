import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card/Card";
import axios from "axios";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        rooms:[]
    };
    console.log("Constructur is run")
    this.remove = this.remove.bind(this);
  }

async componentDidMount (){
  let data = await axios.get ("http://localhost:3001/rooms");
  this.setState ({rooms: data.data})
  console.log("component did mount is run")
}

remove(id){
  this.setState ({
    rooms: this.state.rooms.filter((x)=>x.ID_room !==id)
  })
}


  render() {
    console.log("render is called")
    const datas = this.state.rooms.map((val,key)=>{
      return(

          <Link className="col-xl-3 col-lg-4 col-md-6 link-rf card-hover" to={`/room/${val.ID_room}`} key={val.ID_room}>     
          <Card 
          ID_room= {val.ID_room}
          title = {val.Title}
          location = {val.Location}
          price = {val.Price}
          image = {val.Image}
          removeCard = {this.remove}
          /> 
          </Link> 
      )
    });

    return (
      <div>        
        <br/>


        <section>
          <div className="container py-8 h-100">
            <div className="row gy-4 justify-content-left h-25">
                {datas}
           </div>
          </div>
          <br/>
        </section>
      </div>
    );
  }
}
export default Home;