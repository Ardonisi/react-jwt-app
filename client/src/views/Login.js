import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Auth from "../services/Auth";
//import refreshToken from "../controllers/refreshToken";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      shouldRedirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  addUser = async (data) => {
    console.log("processing");
    Auth.login(data).then(() => {
      console.log("returning");
      this.setState({
        shouldRedirect: true,
      });
    });
  };
  handleChange(evt) {
    console.log(evt);
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    try {
      this.addUser(this.state);
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    if (this.state.shouldRedirect === true) {
      return <Navigate to="/" />;
    }
    return (
      <>
        <section className="vh-100">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-1d0">
                <div className="col col-xl-10">
                  <div className="card" styles="border-radius: 1rem;">
                    <div className="row g-0">
                      <div className="col-md-6 col-lg-5 d-none d-md-block">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                          alt="login form" className="img-fluid" styles="border-radius: 1rem 0 0 1rem;" />
                      </div>
                      <div className="col-md-6 col-lg-7 d-flex align-items-center">
                        <div className="card-body p-4 p-lg-5 text-black">
          
                          <form onSubmit={this.handleSubmit}>
          
                            <div className="d-flex align-items-center mb-3 pb-1">
                              
                              <span className="h1 fw-bold mb-0">Login</span>
                            </div>
          
                            <h5 className="fw-normal mb-3 pb-3" styles="letter-spacing: 1px;">Sign into your account</h5>
          
                            <div className="form-outline mb-4">
                              <input id="username"
                              type="text"
                              name="username"
                              value={this.state.username}
                              onChange={this.handleChange}
                              className="form-control form-control-lg" />
                              <label className="form-label" htmlFor="username">Username</label>
                            </div>
          
                            <div className="form-outline mb-4">
                              <input             
                              type="password"
                              id="password"
                              name="password"
                              value={this.state.password}
                              onChange={this.handleChange} 
                              className="form-control form-control-lg" />
                              <label className="form-label" htmlFor="password">Password</label>
                            </div>
          
                            <div className="pt-1 mb-4">
                              <button className="btn btn-dark btn-rf-2 btn-lg btn-block">Login</button>
                            </div>
          
                            <p className="mb-5 pb-lg-2" styles="color: #393f81;">Don't have an account? <a href="/signup"
                                styles="color: #393f81;">Register here</a></p>
                            <a href="#!" className="small text-muted">Terms of use</a>
                            <br/>
                            <a href="#!" className="small text-muted">Privacy policy</a>
                          </form>
          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
      </>
    );
  }
}

export default Login;
