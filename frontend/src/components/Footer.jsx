import React from 'react'
import { Link } from "react-router"
import LogoImage from "../assets/notesNew.jpg"
import "../../public/style.css"

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-details">
          <div className="footer-logo">
            <img className="footer-logo-img" src={LogoImage} alt="Notes App Logo" />
            <br/>

            <p className="footer-logo-title">Notes App Pvt. Ltd.</p>
          </div>

          <div className="footer-links">
            <div>
              <h3>About</h3>
                <p>
                  Welcome to our platform! We aim to provide the best experience for our users
                  by offering reliable services, secure features, and easy-to-use tools.
                </p>
            </div>

            <div>
              <h3>Contact</h3>
                <p>
                  Have questions or need support? Reach us at:
                  <br/>Email: support@example.com
                  <br/>Phone: +91 98765 43210
                  <br/>Address: 123, Main Street, New Delhi, India
                </p>
            </div>

            <div>
              <h3>Privacy Policy</h3>
                <p>
                  Your privacy is important to us. We only collect the information necessary
                  to provide our services and never share your personal details without consent.
                </p>
            </div>

            <div>
              <h3>Terms & Conditions</h3>
                <p>
                  By using our platform, you agree to follow our rules and policies. Continued
                  use of the platform means you accept any changes made in the future.
                </p>
            </div>
        </div>

      </div>

      <div className="footer-social-links">
          <h3>Follow Us</h3>
          <div>
              <Link to="/notes" className="social-link-facebook"><i className="fa-brands fa-facebook-f"></i></Link>
              <Link to="/notes" className="social-link-instagram"><i className="fa-brands fa-instagram"></i></Link>
              <Link to="/notes" className="social-link-twitter"><i className="fa-brands fa-x-twitter"></i></Link>
              <Link to="/notes" className="social-link-linkedin"><i className="fa-brands fa-linkedin-in"></i></Link>
              <Link to="/notes" className="social-link-github"><i className="fa-brands fa-github"></i></Link>
              <Link to="/notes" className="social-link-youtube"><i className="fa-brands fa-youtube"></i></Link>
          </div>
      </div>

      <div className="footer-copyright">
          <p>@Copyright 2025 Mihir Nirvikar</p>
      </div>
  </div>
</>
  )
}

export default Footer