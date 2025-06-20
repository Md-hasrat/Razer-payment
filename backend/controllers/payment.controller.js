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


// export const paymentVerification = async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;

//   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
//     .update(body) // Removed .toString() as body is already a string
//     .digest("hex");

//   const isAuthentic = expectedSignature === razorpay_signature;

//   if (isAuthentic) {
//     try {
//       // Check for duplicate payment to ensure idempotency
//       const existingPayment = await Payment.findOne({ razorpay_payment_id });
//       if (existingPayment) {
//         console.warn("Duplicate payment attempt for Razorpay Payment ID:", razorpay_payment_id);
//         return res.redirect(
//           `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}&status=duplicate`
//         );
//       }

//       await Payment.create({
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//       });

//       res.redirect(
//         `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
//       );
//     } catch (dbError) {
//       console.error("Error saving payment to database:", dbError);
//       res.status(500).json({
//         success: false,
//         message: "Payment verified but failed to save record. Please contact support.",
//         error: dbError.message, // Include error message for debugging (consider removing in production)
//       });
//     }
//   } else {
//     res.status(400).json({
//       success: false,
//       message: "Payment verification failed. Invalid signature.",
//     });
//   }
// };


export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  // Basic validation to ensure all required fields are present
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    console.error("Missing Razorpay callback parameters in request body.");
    return res.status(400).redirect(`http://localhost:5173/?paymentStatus=failed&error=missing_params`);
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  try {
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET) // Use the loaded secret
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      try {
        // 1. Check for duplicate payment to ensure idempotency
        const existingPayment = await Payment.findOne({ razorpay_payment_id });
        if (existingPayment) {
          console.warn(`[Payment Verification] Duplicate payment attempt for Razorpay Payment ID: ${razorpay_payment_id}`);
          // Redirect to home with a specific status for duplicates
          return res.redirect(
            `http://localhost:5173/?paymentStatus=duplicate&reference=${razorpay_payment_id}`
          );
        }

        // 2. Save payment details to your database
        await Payment.create({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        });
        console.log(`[Payment Verification] Payment details saved for ID: ${razorpay_payment_id}`);

        // 3. Redirect to the home page with success status
        return res.redirect(
          `http://localhost:5173/?paymentStatus=success&reference=${razorpay_payment_id}`
        );

      } catch (dbError) {
        // Handle database save errors
        console.error(`[Payment Verification] Error saving payment to database for ID ${razorpay_payment_id}:`, dbError);
        // Redirect to home with a database error status
        return res.redirect(
          `http://localhost:5173/?paymentStatus=failed&error=db_save_failed`
        );
      }
    } else {
      // Signature verification failed
      console.warn(`[Payment Verification] Signature mismatch for Order ID: ${razorpay_order_id}, Payment ID: ${razorpay_payment_id}`);
      // Redirect to home with a signature error status
      return res.redirect(
        `http://localhost:5173/?paymentStatus=failed&error=signature_mismatch`
      );
    }
  } catch (signatureError) {
    // Handle errors during the crypto/signature process itself (e.g., secret not found)
    console.error("[Payment Verification] Error during signature creation/verification:", signatureError);
    return res.status(500).redirect(`http://localhost:5173/?paymentStatus=failed&error=server_error`);
  }
};
