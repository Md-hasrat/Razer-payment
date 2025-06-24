import React from 'react';
import './Home.css'; // We'll write styles separately
import Card from './Card'; // Ensure this is also plain HTML/CSS
import axios from 'axios';

const Home = () => {

  const checkoutHandler = async (amount) => {
    const { data: { key } } = await axios.get("http://localhost:4000/api/getkey");

    const { data: { order } } = await axios.post("http://localhost:4000/api/checkout", {
      amount
    });

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Amazon",
      description: "Tutorial of RazorPay",
      image: "https://github.com/Md-hasrat.png",
      order_id: order.id,
      callback_url: "http://localhost:4000/api/paymentverification",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#121212"
      }
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="home-container">
      <div className="stack-container">
        <Card
          amount={1499}
          img="https://www.sonatawatches.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw4bcefb11/images/Sonata/Catalog/77105SM12W_1.jpg?sw=600&sh=600"
          checkoutHandler={checkoutHandler}
        />
        <Card
          amount={9999}
          img="http://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_32c26ad194234d42b3cd9e582a21c99b"
          checkoutHandler={checkoutHandler}
        />
        <Card
          amount={999}
          img="https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg"
          checkoutHandler={checkoutHandler}
        />
        <Card
          amount={499}
          img="https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg"
          checkoutHandler={checkoutHandler}
        />
        <Card
          amount={1999}
          img="https://images.pexels.com/photos/4013157/pexels-photo-4013157.jpeg"
          checkoutHandler={checkoutHandler}
        />
        <Card
          amount={999}
          img="https://plus.unsplash.com/premium_photo-1661412706592-0d43f0b0b440?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          checkoutHandler={checkoutHandler}
        />
      </div>
    </div>
  );
};

export default Home;
