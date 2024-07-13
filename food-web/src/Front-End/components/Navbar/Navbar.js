import React, { useEffect, useState } from 'react';
import './Navbar.css'; 
import logo from '../../assests/log.png'; 
import { FaHamburger, FaUser, FaShippingFast, FaUserCog, FaCartPlus  } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [products, setProducts] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productRes = await axios.get('http://localhost:8089/products');
                setProducts(productRes.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
                setLoading(false);
            }

            fetchCartItemCount();
        };

        fetchData();
    }, []);

    const fetchCartItemCount = async () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            try {
                const cartCountRes = await axios.get(`http://localhost:8089/cart/count/${userId}`);
                setCartItemCount(cartCountRes.data.count);
            } catch (err) {
                console.error("Error fetching cart item count:", err);
            }
        }
    };

    return (
        <div id="navbar">
            <nav>
                <div className="logo">
                    <img src={logo} className='logo1' alt="Logo" />
                </div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/menu">Menu</Link></li>
                    <li><Link to="/admindashboard">AdminDashboard</Link></li>
                    <li><Link to="/review">Review</Link></li>
                    <li><Link to="/cartitems">Cart</Link></li>
                    <li><Link to="/vieworders">Orders</Link></li>
                    <li>
                        <Link to="/cussignin" className="nav_button">
                            <FaUser /> Customer
                        </Link>
                    </li>
                    <li>
                        <Link to="/suppsignin" className="nav_button">
                            <FaShippingFast /> Supplier
                        </Link>
                    </li>
                    <li>
                        <Link to="/adminsignin" className="nav_button">
                            <FaUserCog /> Admin
                        </Link>
                    </li>
                    <li>
                        <Link to="/cartitems">
                            <p><FaCartPlus /><span className='cartcount'>{cartItemCount}</span></p>
                        </Link>
                    </li>
                </ul>
                <div className="icon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <i className="fa-solid fa-heart"></i>
                    <i className="fa-solid fa-cart-shopping"></i>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
