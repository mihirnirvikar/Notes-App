import React from 'react'
import { Link } from "react-router"
import LogoImage from "../assets/notesNew.jpg"
import "../../public/style.css"

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to="http://localhost:3000/notes">
            <img src={LogoImage} alt="Notes App Logo" />
          </Link>
        </div>
        <div className="nav-links">
          <Link to="http://localhost:3000/notes">Home</Link>
          <Link to="/notes/about">About</Link>
          <Link to="/notes/imp">Imp Notes</Link>
          <Link to="/notes/login">Login</Link>
          <Link to="/notes/signup">Signup</Link>
          <Link to="/notes/logout">Logout</Link>
        </div>
      </div>
    </>
  )
}

export default Navbar