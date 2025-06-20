import React from 'react';
import './Card.css';

const Card = ({ amount, img, checkoutHandler }) => {
  return (
    <div className="card-wrapper">
      <img src={img} alt="Product" className="card-image" />
      <p className="card-price">₹{amount}</p>
      <button className="card-button" onClick={() => checkoutHandler(amount)}>
        Buy Now
      </button>
    </div>
  );
};

export default Card;
