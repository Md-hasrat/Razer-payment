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
      name: "6 Pack Programmer",
      description: "Tutorial of RazorPay",
      image: "https://avatars.githubusercontent.com/u/25058652?v=4",
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
          amount={5000}
          img="https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fwristwatch&psig=AOvVaw3OVtJyN0vTXBARqFi5Fite&ust=1750499506580000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJjekrLd_40DFQAAAAAdAAAAABAE"
          checkoutHandler={checkoutHandler}
        />
        <Card
          amount={3000}
          img="http://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_32c26ad194234d42b3cd9e582a21c99b"
          checkoutHandler={checkoutHandler}
        />
      </div>
    </div>
  );
};

export default Home;
