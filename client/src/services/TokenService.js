import axios from "axios";
//import jwt_decode from "jwt-decode";

class TokenService {
  setUser(user) {
    console.log("**********8TokenService Here......");
    console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
  }
  removeUser() {
    localStorage.removeItem("user");
  }
}
export default new TokenService();
