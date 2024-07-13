import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";

const initialState = {
    name: "",
    email: "",
    contact: "",
    address: "",
    password: ""
};

const AddeditUsers = () => {
    const [state, setState] = useState(initialState);

    const { name, email, contact, address, password } = state;
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8089/getuser/${id}`)
                .then((resp) => setState({ ...resp.data[0] }))
                .catch((err) => toast.error(err.response.data));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !contact || !address || !password) {
            toast.error("Please fill all input fields");
        } else {
            if (!id) {
                axios.post("http://localhost:8089/insertusers", {
                    name,
                    email,
                    contact,
                    address,
                    password
                })
                .then(() => {
                    setState(initialState);
                    toast.success("Data Added Successfully");
                })
                .catch((err) => toast.error(err.response.data));
            } else {
                axios.put(`http://localhost:8089/userupdate/${id}`, {
                    name,
                    email,
                    contact,
                    address,
                    password
                })
                .then(() => {
                    setState(initialState);
                    toast.success("Data Updated Successfully");
                })
                .catch((err) => toast.error(err.response.data));
            }

            setTimeout(() => navigate("/admindashboard"), 500);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <div className='addcontainer'>
            Add/Edit User
            <form style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center" }}
                onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={handleInputChange}
                />
                <label htmlFor="email">Email</label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={handleInputChange}
                />
                <label htmlFor="contact">Contact</label>
                <input
                    type='text'
                    id='contact'
                    name='contact'
                    placeholder='Enter Contact'
                    value={contact}
                    onChange={handleInputChange}
                />
                <label htmlFor="address">Address</label>
                <input
                    type='text'
                    id='address'
                    name='address'
                    placeholder='Enter Address'
                    value={address}
                    onChange={handleInputChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={handleInputChange}
                />
                <input className='btn btn-add' type='submit' value={id ? "Update" : "Save"} />
                <Link to="/admindashboard">
                    <input className='btn btn-delete' type='button' value="Go Back" />
                </Link>
            </form>
        </div>
    )
}

export default AddeditUsers;
