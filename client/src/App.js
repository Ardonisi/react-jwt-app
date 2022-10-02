import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Host from "./views/Host";
import Room from './views/Room';
import Signup from './views/Signup';
import Login from './views/Login';
import Navbar from "./components/Navbar/Navbar";
import "./App.css";


 class App extends Component{

  render(){
    return(
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/host" element={<Host />} />
            <Route path="/room/:id" element={<Room />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/login" element={<Login/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      
    </div>
    )
  }
 }
 export default App;
