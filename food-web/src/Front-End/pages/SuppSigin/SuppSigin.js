import React from 'react';
import './SuppSigin.css';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
const SuppSigin = () => {
  return (
    <div className='AdminSign'>
    <div className="hero">

        <div className="login_form">

            <h1>Supplier Login</h1>

            <form className="input_box">

                <input type="text" className="field" placeholder="User Name"/>
                <input type="password" className="field" maxlength="10" placeholder="Password"/>
                <input type="checkbox" className="check_box"/><p className="rmps">Remember Password</p>
                <button type="submit" className="submit_btn">Login</button>

                <div class="social_icon">
                    <i className="fa-brands fa-facebook-f"><FaFacebookF /></i>
                    <i className="fa-brands fa-twitter"><FaTwitter /></i>
                    <i className="fa-brands fa-google"><FaGoogle /></i>
                </div>

                <div className="tag">
                    <span>New User?</span>
                    <a href="/suppsignup">Sing Up</a>
                </div>

            </form>

        </div>

    </div>
    </div>
  );
}

export default SuppSigin;
