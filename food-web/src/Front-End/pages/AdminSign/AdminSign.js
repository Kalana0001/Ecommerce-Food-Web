import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../../../Back-End/LoginValidation';
import axios from 'axios';
import './AdminSign.css';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

const AdminSign = () => {

    const [values, SetValues] = useState({
        email: "",
        password: "",
    });
const [errors, SetErrors] = useState([]);
const navigate = useNavigate();

const handleInput = (event) =>{
        SetValues(prev => ({...prev, [event.target.name]: [event.target.value] }))
    }

const handleSubmit = (event) =>{
    event.preventDefault();
    SetErrors(Validation(values));

    if(errors.email === "" && errors.password === ""){
        axios.post('http://localhost:8089/adminsignin', values)
        .then(res => {
            if(res.data === "Success") {
                navigate('/admindashboard');
            }else{
                alert("No records existed");
            }
        })
        .catch(err => console.log(err));
    }
}
  return (
    <div className='AdminSign'>
    <div className="hero">

        <div className="login_form">

            <h1>Admin Login</h1>

            <form className="input_box" action="" onSubmit={handleSubmit}>

                <div className='signdivs'>
                    <label htmlFor='email'>Email</label>
                    <input className="field" onChange={handleInput} type='email' placeholder='Enter Email' name='email'/>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div className='signdivs'>
                    <label htmlFor='password'>Password</label>
                    <input className="field" onChange={handleInput}  type='password' placeholder='Enter Password' name='password'/>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <button type="submit" className="submit_btn">Login</button>

                <div class="social_icon">
                    <i className="fa-brands fa-facebook-f"><FaFacebookF /></i>
                    <i className="fa-brands fa-twitter"><FaTwitter /></i>
                    <i className="fa-brands fa-google"><FaGoogle /></i>
                </div>

                <div className="tag">
                    <span>New User?</span>
                    <a href="/cussignup">Sing Up</a>
                </div>

            </form>

        </div>

    </div>
    </div>
  );
}

export default AdminSign;
