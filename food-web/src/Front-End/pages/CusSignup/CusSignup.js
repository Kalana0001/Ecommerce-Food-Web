import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../../../Back-End/SignupValidation';
import axios from 'axios';
import './CusSignup.css';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
const CusSignup = () => {

  const [values, SetValues] = useState({
    name: "", 
    email: "",
    password: "",
});
const navigate = useNavigate();
const [errors, SetErrors] = useState([])

const handleInput = (event) =>{
    SetValues(prev => ({...prev, [event.target.name]: [event.target.value] }))
}

const handleSubmit = (event) =>{
event.preventDefault();
SetErrors(Validation(values));
if(errors.name === "" && errors.email === "" && errors.password === ""){
    axios.post('http://localhost:8089/cussignup', values)
    .then(res => {
        navigate('/cussignin');
    })
    .catch(err => console.log(err));
}
}
  return (
    <div class="hero">

        <div class="login_form">

            <h1>Customer Register</h1>

            <form class="input_box" action="" onSubmit={handleSubmit}>

                <div className='signdiv'>
                    <label htmlFor='name'>Name</label>
                    <input class="field" type='text' onChange={handleInput} placeholder='Enter Name' name='name' />
                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                </div>

                <div className='signdiv'>
                    <label htmlFor='email'>Email</label>
                    <input class="field"  type='email' onChange={handleInput} placeholder='Enter Email' name='email'/>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div className='signdiv'>
                    <label htmlFor='password'>Password</label>
                    <input class="field" type='password' onChange={handleInput} placeholder='Enter Password' name='password'/>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <button type="submit" class="submit_btn">Register</button>

                <div class="social_icon">
                  <i className="fa-brands fa-facebook-f"><FaFacebookF /></i>
                    <i className="fa-brands fa-twitter"><FaTwitter /></i>
                    <i className="fa-brands fa-google"><FaGoogle /></i>
                </div>

                <div class="tag">
                    <span>New User?</span>
                    <a href="/cussignin">Log in</a>
                </div>

            </form>

        </div>

    </div>
  );
}

export default CusSignup;
