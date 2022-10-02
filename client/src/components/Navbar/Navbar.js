import React from 'react'
import { Link, Outlet } from "react-router-dom"
import './navbar.css';

const Navbar = () => {
  return (
    <> 
     {/* <nav style={{borderBottom: 'solid 1px', paddingBottom: '1rem'}}>

        <Link to="/">home</Link>
        <Link to="/host">Host a room</Link>
        <Link to="/signup">Sign up</Link>
        <Link to="/login">Log in</Link>
        class="navbar-brand"
    </nav> */}
    <nav class="navbar bg-rf navbar-expand-lg navbar-dark p-2">
    <Link className="nav-link navbar-brand" to="/">RoomFinder</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <Link className="nav-link" to="/">Home</Link>
      </li>
      <li class="nav-item">
        <Link className="nav-link" to="/host">Host a room</Link>
      </li>
      <li class="nav-item ">
         <Link className="nav-link" to="/signup">Sign up</Link>
      </li>
      <li class="nav-item float-right">
         <Link className="nav-link" to="/login">Log in</Link>
      </li>
      
    </ul>
  </div>
</nav>
    <Outlet/>
    </>

  )
}

export default Navbar
