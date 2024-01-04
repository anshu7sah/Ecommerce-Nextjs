import { createRouter } from "next-connect";
import getRawBody from "raw-body";
import Order from "../../models/Order";
import { mongoConnect, mongoDisconnect } from "../../utils/db";

const router = createRouter();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const endpointSecret =
//   "whsec_8b92afb014884f4e3b7b4d38ca7b041a270b7d7d40e5fae89f74538ec504a6ab";
const endpointSecret = process.env.ENDPOINT_SECRET;

router
  //   .use(express.raw({ type: "application/json" }))
  .post(async (request, response) => {
    let event = request.body;
    const rawBody = await getRawBody(request);
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          rawBody,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.status(400).send();
      }
    }

    // Handle the event

    switch (event.type) {
      case "payment_intent.succeeded":
        await mongoConnect();
        const paymentIntent = event.data.object;
        console.log(paymentIntent);
        const order_id = paymentIntent.metadata.id;
        const order = await Order.findById(order_id);
        if (order) {
          order.isPaid = true;
          order.paidAt = Date.now();
          order.paymentResult = {
            id: paymentIntent.id,
            status: "succeeded",
            email: paymentIntent.email_address,
          };

          await order.save();
          await mongoDisconnect();
        } else {
          res.status(404).json({ message: "Order not found" });
        }
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case "payment_intent.payment_failed":
        intent = event.data.object;
        const message =
          intent.last_payment_error && intent.last_payment_error.message;
        console.log("Failed:", intent.id, message);
        break;
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end(err.message);
  },
});
