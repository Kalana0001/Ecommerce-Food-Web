import React from 'react';
import { useLocation } from 'react-router-dom';
import './PaymentSuccess.css';
import { SiNike } from "react-icons/si";

const PaymentSuccess = () => {
    const location = useLocation();

    if (!location.state) {
       
        return <div className="payment-success-container">Error: Payment details not found.</div>;
    }

    const { orderId, orderDate, product } = location.state;

    return (
        <div className='payment-success'>
        <div className="payment-success-container">
            <h2>Payment Successful!</h2>
            <p>Order ID: {orderId}</p>
            <p>Order Date: {orderDate}</p>
            <p>Product: {product.name}</p>
            <p>Total Amount: ${product.price}</p>
            <p className="thank-you-message">Thank you for your purchase!</p>
            <p className='tick'><SiNike className='payment-successright'/></p>
        </div>
        </div>
    );
};

export default PaymentSuccess;
