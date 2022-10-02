import React, { Component } from 'react'
import axios from 'axios'


class Room extends Component {
 constructor(props){
  super(props)
  this.state = {
    id_url : window.location.pathname.substring(6),
    room:[]
  }
 }
 async componentDidMount (){
  let res = await axios.get (`http://localhost:3001/room/${this.state.id_url}`);
  this.setState ({
    room: res.data[0]
  })
  console.log(this.state.room.Title)
  }


  render(){
    
      return(
      <>


        <section className="vh-100">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-1d0">
                <div className="col col-xl-10">
                  <div className="card" styles="border-radius: 1rem;">
                    <div className="row g-0">
                      <div className="col-md-6 col-lg-8 d-none d-md-block">
                        <img src={this.state.room.Image}
                          alt="login form" className="img-fluid" styles="border-radius: 1rem 0 0 1rem;" />
                          
                      </div>
                      <div className="col-md-6 col-lg-4 d-flex align-items-center">
                        <div className="card-body p-4 p-lg-5 text-black">
          
                          <form>
          
                            <div className="d-flex align-items-center mb-3 pb-1">
                              
                              <span className="h1 fw-bold mb-0">{this.state.room.Location}</span>
                            </div>
          
                            <h5 className="fw-normal mb-3 pb-3" styles="letter-spacing: 1px;">{this.state.room.Title}</h5>
                            <h5 className="fw-normal mb-3 pb-3" styles="letter-spacing: 1px;">Total Cost: {this.state.room.Price}€</h5>
          
          
                            <div className="pt-1 mb-4">
                              <button className="btn btn-dark btn-rf-2 btn-lg btn-block">Reserve</button>
                            </div>
          
                            <p className="mb-5 pb-lg-2" styles="color: #393f81;">Price per night includes VAT and all applicable fees </p>
                            <a href="#!" className="small text-muted">Terms of use</a>
                            <br/>
                            <a href="#!" className="small text-muted">Privacy policy</a>
                          </form>
          
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item"><button className="btn btn-dark btn-min btn-block">Edit post</button> <button className="btn btn-dark btn-min btn-block"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg></button></li>
                    <li class="list-group-item">Add a review (COMING SOON)</li>  
                  </ul>
                </div>
              </div>
            </div>
          </section>
      </>
  )
 } 
}
export default Room