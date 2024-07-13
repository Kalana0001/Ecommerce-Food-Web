import React from 'react';
import './Footer.css';
import logo from '../../assests/food-logo.png'; 
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div id="footer" className='footer'>
      <footer>
        <div className="footer_main">

          <div className="footer_tag">
            <h2>Location</h2>
            <p>Sri Lanka</p>
            <p>USA</p>
            <p>India</p>
            <p>Japan</p>
            <p>Italy</p>
          </div>

          <div className="footer_tag">
            <h2>Quick Link</h2>
            <p>Home</p>
            <p>About</p>
            <p>Menu</p>
            <p>Gallery</p>
            <p>Order</p>
          </div>

          <div className="footer_tag">
            <h2>Contact</h2>
            <p>+94 12 3456 789</p>
            <p>+94 12 3456 789</p>
            <p>example@gmail.com</p>
          </div>

          <div className="footer_tag">
            <h2>Our Services</h2>
            <p>Fast Delivery</p>
            <p>Easy Payments</p>
            <p>24 x 7 Service</p>
          </div>

          <div className="footer_tag">
            <h2>Follows</h2>
            <i className="fa-brands fa-facebook-f"><FaFacebookF /></i>
            <i className="fa-brands fa-twitter"><FaTwitter /></i>
            <i className="fa-brands fa-instagram"><FaInstagram /></i>
            <i className="fa-brands fa-linkedin-in"><FaLinkedinIn /></i>
          </div>

        </div>
        <p className="end">&copy; 2024 Kalana De Silva. All rights reserved.</p>

      </footer>
    </div>
  );
}

export default Footer;
