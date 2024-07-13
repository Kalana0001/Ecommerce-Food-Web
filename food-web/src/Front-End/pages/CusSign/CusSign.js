import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CusSign.css';
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import Validation from '../../../Back-End/LoginValidation';

const CusSign = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (!validationErrors.email && !validationErrors.password) {
            axios.post('http://localhost:8089/cussignin', values)
                .then(res => {
                    const { message, userId } = res.data;
                    if (message === "Success") {
                        localStorage.setItem('userId', userId);
                        navigate('/');
                    } else {
                        setError("Invalid credentials");
                    }
                })
                .catch(err => {
                    setError("Something went wrong. Please try again later.");
                    console.error("Login error:", err);
                });
        }
    };

    return (
        <div className='AdminSign'>
            <div className="hero">
                <div className="login_form">
                    <h1>Customer Login</h1>
                    <form className="input_box" onSubmit={handleSubmit}>
                        <div className='signdiv'>
                            <label htmlFor='email'>Email</label>
                            <input 
                                className="field" 
                                type='email' 
                                placeholder='Enter Email' 
                                name='email' 
                                value={values.email} 
                                onChange={handleInputChange} 
                                required 
                            />
                            {errors.email && <span className='text-danger'>{errors.email}</span>}
                        </div>
                        <div className='signdiv'>
                            <label htmlFor='password'>Password</label>
                            <input 
                                className="field" 
                                type='password' 
                                placeholder='Enter Password' 
                                name='password' 
                                value={values.password} 
                                onChange={handleInputChange} 
                                required 
                            />
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                        </div>
                        {error && <p className='text-danger'>{error}</p>}
                        <button type="submit" className="submit_btn">Login</button>
                        <div className="social_icon">
                            <i className="fa-brands fa-facebook-f"><FaFacebookF /></i>
                            <i className="fa-brands fa-twitter"><FaTwitter /></i>
                            <i className="fa-brands fa-google"><FaGoogle /></i>
                        </div>
                        <div className="tag">
                            <span>New User?</span>
                            <Link to="/cussignup">Sign Up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CusSign;
