import React from 'react';
import './Card.css';

const Card = ({ amount, img, checkoutHandler }) => { // Removed 'title' prop
  return (
    <div className="card-wrapper">
      <div className="card-image-container">
        <img src={img} alt="Product Image" className="card-image" /> {/* Simplified alt text */}
      </div>
      <div className="card-content">
        {/* Removed the <h3 className="card-title">{title || "Product Name"}</h3> line */}
        <p className="card-price">₹{amount}</p>
        <button className="card-button" onClick={() => checkoutHandler(amount)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;