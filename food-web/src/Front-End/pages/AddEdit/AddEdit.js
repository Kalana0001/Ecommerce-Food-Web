import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './AddEdit.css';

const initialState = {
    pname: '',
    ptype: '',
    price: '',
    pstock: '',
    pdisc: '',
    supid: '',
    image: null,
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const { pname, ptype, price, pstock, pdisc, supid, image } = state;
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8089/api/get/${id}`)
                .then((resp) => setState({ ...resp.data[0] }))
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    toast.error('Error fetching data');
                });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!pname || !ptype || !price || !pstock || !pdisc || !supid) {
            toast.error('Please fill all input fields');
            return;
        }

        const formData = new FormData();
        formData.append('pname', pname);
        formData.append('ptype', ptype);
        formData.append('price', price);
        formData.append('pstock', pstock);
        formData.append('pdisc', pdisc);
        formData.append('supid', supid);
        if (image) {
            formData.append('image', image);
        }

        try {
            if (!id) {
                await axios.post('http://localhost:8089/api/post', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success('Data Added Successfully');
            } else {
                await axios.put(`http://localhost:8089/api/update/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success('Data Updated Successfully');
            }

            setState(initialState);
            setTimeout(() => navigate('/productdash'), 500);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error saving data');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleImageChange = (e) => {
        setState({ ...state, image: e.target.files[0] });
    };

    return (
        <div className='addcontainer'>
            <form
                style={{ margin: 'auto', padding: '15px', maxWidth: '400px', alignContent: 'center' }}
                onSubmit={handleSubmit}
            >
                <label htmlFor='pname'>Name</label>
                <input
                    type='text'
                    id='pname'
                    name='pname'
                    placeholder='Enter Name'
                    value={pname}
                    onChange={handleInputChange}
                />

                <label htmlFor='ptype'>Type</label>
                <select id='ptype' name='ptype' value={ptype} onChange={handleInputChange}>
                    <option value=''>Select Type</option>
                    <option value='Fruits'>Fruits</option>
                    <option value='Vegetables'>Vegetables</option>
                    <option value='Dairy Products'>Dairy Products</option>
                    <option value='Baked Goods'>Baked Goods</option>
                    <option value='Handmade Crafts'>Handmade Crafts</option>
                </select>

                <label htmlFor='price'>Price</label>
                <input
                    type='text'
                    id='price'
                    name='price'
                    placeholder='Enter Price'
                    value={price}
                    onChange={handleInputChange}
                />

                <label htmlFor='pstock'>Stock</label>
                <input
                    type='text'
                    id='pstock'
                    name='pstock'
                    placeholder='Enter Stock'
                    value={pstock}
                    onChange={handleInputChange}
                />

                <label htmlFor='pdisc'>Description</label>
                <input
                    type='text'
                    id='pdisc'
                    name='pdisc'
                    placeholder='Enter Description'
                    value={pdisc}
                    onChange={handleInputChange}
                />

                <label htmlFor='supid'>Supplier ID</label>
                <input
                    type='text'
                    id='supid'
                    name='supid'
                    placeholder='Enter Supplier ID'
                    value={supid}
                    onChange={handleInputChange}
                />

                <label htmlFor='image'>Image</label>
                <input type='file' id='image' name='image' onChange={handleImageChange} />

                <input className='btn btn-add' type='submit' value={id ? 'Update' : 'Save'} />
                <Link to='/productdash'>
                    <input className='btn btn-delete' type='button' value='Go Back' />
                </Link>
            </form>
        </div>
    );
};

export default AddEdit;
