import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) return; // Handle if userId is not available

        axios.get(`http://localhost:8089/cart/${userId}`)
            .then(res => {
                if (res.data && res.data.items) {
                    setCartItems(res.data.items);
                    setTotalPrice(res.data.totalPrice);
                } else {
                    setCartItems([]);
                    setTotalPrice(0);
                }
            })
            .catch(err => {
                console.error("Error fetching cart items:", err);
                setCartItems([]);
                setTotalPrice(0);
            });
    }, []);

    const removeFromCart = (productId) => {
        const userId = localStorage.getItem('userId');
        axios.post('http://localhost:8089/cart/remove', { usid: userId, pid: productId })
            .then(res => {
                console.log(res.data);
                setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
                // Recalculate total price
                setTotalPrice(prevPrice => {
                    const removedItem = cartItems.find(item => item.id === productId);
                    return prevPrice - (removedItem.price * removedItem.quantity);
                });
            })
            .catch(err => {
                console.error("Error removing from cart:", err);
            });
    };

    return (
        <div className='cart'>
            <div className="container-xl">
                <div className="row">
                    <div className="col-lg-8 col-12 cart-padding">
                        <div className="d-flex justify-content-between align-items-center mycart-top-div">
                            <div className="d-flex align-items-center mycart-top-heading">
                                <h4>MY CART</h4><span>({cartItems.length} ITEMS)</span>
                            </div>
                            <div className="mycart-top-total">
                                Total: Rs <span>{totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-12 cart-padding">
                        <section className="attendance">
                            <div className="attendance-list">
                                <h1>Product List</h1>
                                {cartItems.length > 0 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Product ID</th>
                                                <th>Name</th>
                                                <th>Unit Price($)</th>
                                                <th>Quantity</th>
                                                <th>Total($)</th>
                                                <th>Update</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.pname}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>${item.price * item.quantity}</td>
                                                    <td><button className='btn-delete' onClick={() => removeFromCart(item.id)}>Remove from Cart</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No items in the cart</p>
                                )}
                            </div>
                        </section>
                    </div>
                    <div className="col-lg-4 col-12 cart-padding">
                        <div className="coupon-box">
                            <div className="coupon-head">
                                <h5>Coupons</h5>
                                <div className="apply-coupon">
                                    <span><i className="fas fa-tag"></i> Apply Coupons</span>
                                    <a href="./thankyou.html"><button>Apply</button></a>
                                </div>
                            </div>
                            <div className="coupon-body">
                                <div className="price-list">
                                    <div className="price-details-left">Price Details</div>
                                    <div className="price-details-right"><span></span></div>
                                    <div className="coupon-discount-left">Coupon Discount</div>
                                    <div className="coupon-discount-right">Apply Coupon</div>
                                    <div className="order-toatal-left">Order Total</div>
                                    <div className="order-toatal-right">$ <span id="totalPriceAfterDiscount">{totalPrice}</span></div>
                                    <div className="delivery-charges-left">Delivery Charges</div>
                                    <div className="delivery-charges-right"><span>Free</span><span> Shipping</span></div>
                                </div>
                                <hr />
                                <div className="coupon-footer">
                                    <div className="price-total">
                                        <div className="grid-item">Total</div>
                                        <div className="grid-item">$ <span>{totalPrice}</span></div>
                                    </div>
                                    <div className="placeorder-btn">
                                        <Link to="/checkout"><button>Place Order</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
