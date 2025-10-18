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
          <Link to="/notes">Home</Link>
          <Link to="/notes">About</Link>
          <Link to="/notes">Imp Notes</Link>
          <Link to="/notes">Login</Link>
          <Link to="/notes">Signup</Link>
          <Link to="/notes">Logout</Link>
        </div>
      </div>
    </>
  )
}

export default Navbar