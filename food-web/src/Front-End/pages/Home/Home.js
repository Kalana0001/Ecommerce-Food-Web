import React from 'react';
import './Home.css';
import main1 from '../../assests/main2.png';
import main2 from '../../assests/burger11.png';
import gal1 from '../../assests/gallery_6.jpg';
import gal2 from '../../assests/gallery_10.jpg';
import gal3 from '../../assests/gallery_20.jpg';
import offer1 from '../../assests/offer_1.jpg';
import offer2 from '../../assests/offer_2.png';
import { FaHamburger } from "react-icons/fa";
const Home = () => {
  return (
    <div>
    <section id="home"  className='home'>
      <div className="main">
        <div className="men_text">
          <h1>Get Fresh<span>Food</span><br />in an Easy Way</h1>
        </div>

        <div className="main_image">
          <img src={main2} alt="Main" className="main-img"/>
        </div>
      </div>

      <p className='homeparas'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse reiciendis quaerat nobis
        deleniti amet non inventore. Reprehenderit recusandae voluptatibus minus tenetur itaque numquam
        cum quos dolorem maxime. Quas, quaerat nisi. Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Cumque facilis, quaerat cupiditate nulla quibusdam quo sunt esse tempore inventore vel
        voluptate, amet laudantium adipisci veniam nihil quam molestiae omnis mollitia.
      </p>

      <div className="main_btn">
        <a href="#"><i className="fa-solid fa-angle-right"><FaHamburger /></i>Order Now</a>
      </div>
    </section>
    
    <div class="banner">
        <h1>Special Offer</h1>
        <div class="banner_center">
            <h2>50%<br/><span>Off</span></h2>
        </div>
        <a href="#" class="banner_btn"><i class="fa-solid fa-burger"><FaHamburger  /></i>Order Now</a>
      </div>

      <div class="gallery">

    <h1>Popular<span>Gallery</span></h1>

    <div class="gallery_box">

        <div class="gallery_image">
            <img src={gal1}/>
        </div>

        <div class="gallery_image">
            <img src={gal2}/>
        </div>

        <div class="gallery_image">
            <img src={gal3}/>
        </div>

    </div>

</div>


<div class="offer">

    <div class="offer_box">

        <div class="offer_card_1">

            <div class="offer_img">
                <img src={offer1}/>
            </div>

            <div class="offer_tag">

                <h2>Triplae Food</h2>
                <h1>40%</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Itaque quibusdam quas distinctio sit? Corrupti 
                    necessitatibus modi nobis?
                </p>
                <a href="#" class="offer_btn"><i class="fa-solid fa-burger"><FaHamburger /></i>Order Now</a>

            </div>

        </div>

        <div class="offer_card_2">

            <div class="offer_img">
                <img src={offer2}/>
            </div>

            <div class="offer_tag">

                <h2>Buy 2 pizza and get a <br/>free Drink</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Itaque quibusdam quas distinctio sit? Corrupti 
                    necessitatibus modi nobis?
                </p>
                <a href="#" class="offer_btn"><i class="fa-solid fa-burger"><FaHamburger /></i>Order Now</a>

            </div>

        </div>

    </div>

</div>

<div class="banner">
        <h1>Special Offer</h1>
        <div class="banner_center">
            <h2>50%<br/><span>Off</span></h2>
        </div>
        <a href="#" class="banner_btn"><i class="fa-solid fa-burger"><FaHamburger/></i>Order Now</a>
      </div>
    </div>
    
  );
}

export default Home;
