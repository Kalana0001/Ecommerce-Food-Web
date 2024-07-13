import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Payment.css';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderId, orderDate, product, orderData } = location.state;

    
    const [name, setName] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [cvv, setCVV] = useState('');

    const handlePayment = async () => {
        try {
           
            const paymentData = {
                orderId: orderId,
                amount: product.price,
                pdate: new Date().toISOString(),
            };

           
            const apiUrl = 'http://localhost:8089/api/payment';
            const response = await axios.post(apiUrl, paymentData);

           
            console.log(response.data); 

            
            navigate('/payment/success', {
                state: {
                    orderId: orderId,
                    orderDate: orderDate,
                    product: product
                }
            });
        } catch (error) {
            console.error('Error processing payment:', error);
            alert("Payment failed. Please try again."); 
        }
    };

    return (
        <div className='paymentall'>
        <div className='payment'>
            <h2>Payment Details</h2>
            <div className='paydetails'>
                <p>Order ID: {orderId}</p>
                <p>Order Date: {orderDate}</p>
                <p>Product Name: {product.name}</p>
                <p>Product Price: {product.price}</p>
                <p>Quantity: {orderData.items[0].quantity}</p>
                <p>Total Amount: {orderData.items[0].uprice}</p>
            </div>


            <form>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="payment-input"
                />

                <label htmlFor="creditCardNumber">Credit Card Number:</label>
                <input
                    type="text"
                    id="creditCardNumber"
                    value={creditCardNumber}
                    onChange={(e) => setCreditCardNumber(e.target.value)}
                    required
                    className="payment-input"
                />

                <label htmlFor="cvv">CVV Number:</label>
                <input
                    type="text"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCVV(e.target.value)}
                    required
                    className="payment-input"
                />

                <button type="button" onClick={handlePayment} className="payment-button">Pay Now</button>
            </form>
        </div>
        </div>
    );
};

export default Payment;
