import React from 'react';
import './SupSignup.css';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
const SupSignup = () => {
  return (
    <div class="hero">

        <div class="login_form">

            <h1>Supplier Register</h1>

            <form class="input_box">

                <input type="text" class="field" placeholder="Name"/>
                <input type="password" class="field" placeholder="Password" maxlength="10"/>
                <input type="email" class="field" placeholder="Email"/>
                <input type="checkbox" class="check_box"/><p className="rmps">Remember Password</p>
                <button type="submit" class="submit_btn">Register</button>

                <div class="social_icon">
                  <i className="fa-brands fa-facebook-f"><FaFacebookF /></i>
                    <i className="fa-brands fa-twitter"><FaTwitter /></i>
                    <i className="fa-brands fa-google"><FaGoogle /></i>
                </div>

                <div class="tag">
                    <span>New User?</span>
                    <a href="/suppsignin">Log in</a>
                </div>

            </form>

        </div>

    </div>
  );
}

export default SupSignup;
