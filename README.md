💳 Razorpay Payment Gateway Integration

  This project demonstrates how to integrate the Razorpay Payment Gateway using a Node.js (Express) backend and React frontend.

📦 Tech Stack

  Backend: Node.js, Express, Razorpay Node SDK

  Frontend: React, Axios

  Payment Gateway: Razorpay (Test Mode)

🚀 Features

  Initiate payment with custom amount

  Razorpay Checkout integration

  Payment verification on the server
  
  Razorpay key managed via environment variables

Works in Razorpay Test Mode

🔧 Setup Instructions

  1. Clone the Repository

  git clone https://github.com/Md-hasrat/Razer-payment.git
  
  cd razorpay-payment-integration

  2. Setup Backend

    Install dependencies:
    
    cd backend
    
    npm install

Environment Variables (config.env):

  RAZORPAY_KEY_ID=your_key_id
  
  RAZORPAY_KEY_SECRET=your_key_secret
  
  PORT=4000

Start the backend server:

  npm run dev

3. Setup Frontend
    
  cd ../frontend

  npm install
  
Start the React app:

  npm run dev

⚙️ API Endpoints

  .GET /api/getkey
  
Returns Razorpay Public Key to frontend.

  .POST /api/checkout
  
Creates an order on Razorpay with the specified amount.

  .POST /api/paymentverification
  
Verifies the payment using signature and stores the result 

💡 Example Flow

  1.User clicks Pay Now in frontend
  
  2.Frontend calls GET /api/getkey to get Razorpay key
  
  3.Frontend calls POST /api/checkout with amount
  
  4.Razorpay Checkout is initialized
  
  5.On successful payment, frontend calls POST /api/paymentverification with payment details
  
  6.Backend verifies signature and confirms transaction

🔒 Security

  > Do not expose your RAZORPAY_KEY_SECRET on the frontend.

  > Use HTTPS in production.

🧪 Test Cards

Use the following card details in test mode:

  Card Number: 4111 1111 1111 1111
  
  Expiry: Any future date
  
  CVV: 123
  
  OTP: 123456




  

