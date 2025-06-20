import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/payment.model.js";


export const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order. Please try again.",
      error: error.message, // Include error message for debugging (consider removing in production)
    });
  }
};


export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body) // Removed .toString() as body is already a string
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    try {
      // Check for duplicate payment to ensure idempotency
      const existingPayment = await Payment.findOne({ razorpay_payment_id });
      if (existingPayment) {
        console.warn("Duplicate payment attempt for Razorpay Payment ID:", razorpay_payment_id);
        return res.redirect(
          `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}&status=duplicate`
        );
      }

      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } catch (dbError) {
      console.error("Error saving payment to database:", dbError);
      res.status(500).json({
        success: false,
        message: "Payment verified but failed to save record. Please contact support.",
        error: dbError.message, // Include error message for debugging (consider removing in production)
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Payment verification failed. Invalid signature.",
    });
  }
};

