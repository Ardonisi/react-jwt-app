import axios from "axios";
import TokenService from "./TokenService";

class Auth {
  login = async (userData) => {
    console.log("auth here");
    await axios
      .post("http://localhost:3001/login", userData)
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }
        return response.data;
      });
  };
  logout() {
    TokenService.removeUser();
  }
}

export default new Auth();
