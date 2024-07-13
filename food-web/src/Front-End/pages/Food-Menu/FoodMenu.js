import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHamburger, FaCartPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './FoodMenu.css';

const FoodMenu = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8089/api/get');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const addToCart = async (productId) => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            try {
                await axios.post('http://localhost:8089/cart/add', { usid: userId, pid: productId });
                toast.success("Item added to cart successfully!");
            } catch (error) {
                console.error("Error adding to cart:", error);
                toast.error("Failed to add item to cart. Please try again.");
            }
        } else {
            toast.error("User not logged in. Please log in to add items to the cart.");
        }
    };

    const orderNow = (productId) => {
        const product = data.find(item => item.id === productId);
        if (product) {
            navigate(`/orders/${productId}`, { state: { product } });
        }
    };

    return (
        <div id="food-menu" className="food-menu">
            <div className="banner_bg">
                <h1><span>Our</span>Menu</h1>
            </div>
            <div className="menu">
                <div className="menu_box anim">
                    {data.map((item) => (
                        <div key={item.id} className="menu_card">
                            <div className="menu_img">
                                <img src={`http://localhost:8089/images/${item.image}`} alt={item.pname} />
                            </div>
                            <div className="menu_text">
                                <h2>{item.pname}</h2>
                                <p>{item.pdisc}</p>
                                <div className="menu_icon">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star-half-stroke"></i>
                                </div>
                                <p className="price">${item.price}<sub><del>10% off</del></sub></p>
                                <button onClick={() => orderNow(item.id)} className="menu_btn">
                                    <FaHamburger /> Order Now
                                </button>
                                <button onClick={() => addToCart(item.id)} className="menu_btn">
                                    <FaCartPlus /> Add To Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FoodMenu;
