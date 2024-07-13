import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewOrders.css'; 

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(1); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8089/orders/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="orders-container">
      <h1 className="orders-heading">Orders</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th className="orders-th">Order ID</th>
            <th className="orders-th">Product Name</th>
            <th className="orders-th">Quantity</th>
            <th className="orders-th">Unit Price</th>
            <th className="orders-th">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderId} className="orders-tr">
              <td className="orders-td">{order.orderId}</td>
              <td className="orders-td">{order.pname}</td>
              <td className="orders-td">{order.quantity}</td>
              <td className="orders-td">{order.uprice}</td>
              <td className="orders-td">{order.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewOrders;
