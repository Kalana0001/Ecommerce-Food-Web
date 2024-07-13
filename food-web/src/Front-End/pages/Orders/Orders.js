import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Order.css';

const Orders = () => {
    const [product, setProduct] = useState(null);
    const { pid } = useParams();
    const [userId, setUserId] = useState(null);
    const [orderId, setOrderId] = useState(null); // State to store order ID
    const navigate = useNavigate();

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem('userId');
        if (userIdFromStorage) {
            setUserId(userIdFromStorage);
        } else {
            console.error("User ID not found. Ensure the user is logged in.");
        }

        axios.get(`http://localhost:8089/products/${pid}`)
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => {
                console.error("Error fetching product details:", err);
            });
    }, [pid]);

    const placeOrder = () => {
        if (!userId) {
            console.error("User ID is not set. Cannot place order.");
            return;
        }

        if (!product || !product.id) {
            console.error("Product ID is not available. Cannot place order.");
            return;
        }

        const orderData = {
            usid: userId,
            items: [
                {
                    pid: product.id,
                    quantity: 1,
                    uprice: product.price
                }
            ]
        };

        axios.post(`http://localhost:8089/orders/place`, orderData)
            .then(res => {
                console.log("Order placed successfully:", res.data);
                setOrderId(res.data.orderId); // Update state with the order ID
                navigate('/payment', { state: { orderId: res.data.orderId, orderData, product, orderDate: new Date().toLocaleDateString() } });
            })
            .catch(err => {
                console.error("Error placing order:", err);
            });
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className='myorder-order'>
            <div className="section__container class__container">
                <div className="class__image">
                    <span className="bg__blur"></span>
                    <img src={`http://localhost:8089/images/${product.image}`} alt={product.pname} className="class__img-1" />
                    <img src={`http://localhost:8089/images/${product.image}`} alt={product.pname} className="class__img-2" />
                </div>
                <div className="class__content">
                    <h2 className="section__header">Order Details</h2>
                    <p>Name: {product.pname}</p>
                    <p>Price: ${product.price}</p>
                    <p>Available: {product.pstock}</p>
                    <p>Product Type: {product.ptype}</p>
                    <button className='orderbtn' onClick={placeOrder}>Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default Orders;
