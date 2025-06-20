import React from 'react';
import { useSearchParams } from "react-router-dom";
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const referenceNum = searchParams.get("reference");

  return (
    <div className="payment-success-container">
      <h1 className="payment-success-heading">Order Successful</h1>
      <p className="payment-success-text">Reference No. {referenceNum}</p>
    </div>
  );
};

export default PaymentSuccess;
