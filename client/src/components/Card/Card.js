import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.remove = this.remove.bind(this);
  }

  handleRemove() {
    this.remove(this.props.ID_room);
  }
        // {" "}
        // <li>{this.props.title}</li>
        // <li>{this.props.location}</li>
        // <li>{this.props.price}</li>
        // <button>Edit</button>
        // <button onClick={this.handleRemove}>Delete</button>
  remove = async (id) => {
    await axios.delete(`http://localhost:3001/rooms/remove/${id}`);
    this.props.removeCard(id);
  };
  render() {
    return (
      <> 
      

                <div className="card" styles="height: 20px;">
                <div className="pb-6">
                <img src={this.props.image} className="card-img-top img-thumb-rf" alt="..."/>
                </div>
                  <div className="card-body">
                    <h5 className="card-title">{this.props.location}</h5>
                    <p clasName="card-text">{this.props.title}</p>
                    <p clasName="card-text"><span class="badge btn-rf-2">{this.props.price}€</span> /night</p>
                    
                  </div>
               </div>
      
      </>
    );
  }
}

export default Card;
