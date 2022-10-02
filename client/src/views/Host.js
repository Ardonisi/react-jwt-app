import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

class Host extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      location: "",
      price: "",
      formData:[],
      shouldRedirect: false,
      isEditing: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handeleSubmit = this.handeleSubmit.bind(this);
    this.handelChangeImage = this.handelChangeImage.bind(this);
  }
  addRoom = async (data) => {

    await axios.post("http://localhost:3001/add",data.formData);
    
  };


  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  handelChangeImage(event) {
    let image = event.target.files[0];
    let form = new FormData();

    form.append('image', image);
    form.append('title',this.state.title)
    form.append('location',this.state.location)
    form.append('price',this.state.price)


    this.setState({
      formData: form,
    });
  }
  handeleSubmit(evt) {
    evt.preventDefault();

    this.addRoom(this.state);
    this.setState({ title: "", location: "", price: "", formData:[],shouldRedirect: true });
  }
  render() {
    if (this.state.shouldRedirect) {
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
                      <div className="col-md-6 col-lg-1 d-none d-md-block">

                      </div>
                      <div className="col-md-6 col-lg-6 d-flex align-items-center">
                        <div className="card-body p-4 p-lg-5 text-black">
          
                          <form className="needs-validation" onSubmit={this.handeleSubmit} encType='multipart/form-data'>
          
                            <div className="d-flex align-items-center mb-3 pb-1">
                              
                              <span className="h1 fw-bold mb-0">Add your place</span>
                            </div>
          
          
                            <div className="form-outline mb-4">
                              <input 
                              id="title"
                              type="text"
                              name="title"
                              value={this.state.title}
                              onChange={this.handleChange}
                              className="form-control form-control-lg" />
                              <label className="form-label" htmlFor="title">Country  (e.g., Germany...)</label>
                            </div>
          
                            <div className="form-outline mb-4">
                              <input             
                               id="location"
                               type="text"
                               name="location"
                               value={this.state.location}
                               onChange={this.handleChange}
                               className="form-control form-control-lg" />
                              <label className="form-label" htmlFor="location">City  (e.g., Frankfurt...)</label>
                            </div>
                            <div className="form-outline mb-4">
                              <input             
                               id="price"
                               type="number"
                               name="price"
                               value={this.state.price}
                               onChange={this.handleChange}
                              className="form-control form-control-lg" 
                              required/>                            
                              <label className="form-label" htmlFor="price" >Price</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="file" className="form-control form-control-lg"id="image" name="image" onChange={this.handelChangeImage} required/>
                                <label cclassName="form-label" htmlFor="image">Add an image of the property</label>
                            </div>

                            <div className="pt-1 mb-4">
                              <button className="btn btn-dark btn-rf-2 btn-lg btn-block">Publish</button>
                            </div>
        
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

export default Host;
