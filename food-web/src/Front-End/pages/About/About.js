import React from 'react';
import './About.css'; 
import main from '../../assests/about1.png'; 
import { FaShippingFast } from "react-icons/fa";
import { FaAmazonPay } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa6";
import { FaHamburger } from "react-icons/fa";
const About = () => {
  return (
    <div id="about">
    <div  className='about'>
        <div class="banner_bg">
            <h1><span>About</span>Us</h1>
        </div>

        <div class="about anim">

        <div class="about_main">

            <div class="about_image">
                <img src={main}/>
            </div>

            <div class="about_text">

                <h3>why food choose us?</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Itaque recusandae dolore tempora fugiat quisquam illum, 
                    veniam adipisci iusto consequuntur porro explicabo 
                    repudiandae nam quis beatae obcaecati. Magnam provident 
                    fuga aspernatur. Lorem ipsum dolor sit amet consectetur 
                    adipisicing elit. Cum minus facilis placeat sint repellendus 
                    dolorum nostrum, corrupti magni ducimus, et neque nihil enim. 
                    Tempore quia rerum placeat laboriosam, sit quasi!
                </p>

                <div class="about_services">

                    <div class="s_1">
                        <i class="fa-solid fa-truck-fast"><FaShippingFast /></i>
                        <a href="#">Fast Delivery</a>
                    </div>

                    <div class="s_1">
                        <i class="fa-brands fa-amazon-pay"><FaAmazonPay /></i>
                        <a href="#">Easy Payment</a>
                    </div>

                    <div class="s_1">
                        <i class="fa-solid fa-headset"><FaHeadset /></i>
                        <a href="#">24 x 7 Services</a>
                    </div>

                </div>

                <a href="#" class="about_btn"><i class="fa-solid fa-burger"><FaHamburger /></i>Order Now</a>

            </div>

        </div>

    </div>
    </div>
    </div>
  );
}

export default About;
