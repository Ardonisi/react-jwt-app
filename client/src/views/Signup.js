import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      shouldRedirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addUser = async (data) => {
    let results = await axios.post("http://localhost:3001/register", data);

    if (results.status === 200) {
      this.setState({
        shouldRedirect: true,
      });
    }
  };
  handleChange(evt) {
    console.log(evt);
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.addUser(this.state);
  }
  render() {
    if(this.state.shouldRedirect === true){
        return<Navigate to="/" />  
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
                              
                              <span className="h1 fw-bold mb-0">Register</span>
                            </div>
          
                            <h5 className="fw-normal mb-3 pb-3" styles="letter-spacing: 1px;">Open a new account</h5>
          
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
          
                            <div className="form-outline mb-4">
                              <input             
                                id="email"
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                className="form-control form-control-lg" />
                              <label className="form-label" htmlFor="email">Email</label>
                            </div>

                            <div className="pt-1 mb-4">
                              <button className="btn btn-dark btn-rf-2 btn-lg btn-block">Register</button>
                            </div>

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

export default Signup;
