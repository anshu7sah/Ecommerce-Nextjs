import { createRouter } from "next-connect";

import Order from "../../../../models/Order";
import auth from "../../../../middleware/auth";
import { mongoConnect, mongoDisconnect } from "../../../../utils/db";
const router = createRouter();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.use(auth).post(async (req, res) => {
  try {
    await mongoConnect();
    const { amount, id } = req.body;
    const order_id = req.query.id;
    const payment = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "USD",
      description: "M74JJI Store",
      payment_method_types: ["card"],
      payment_method: id,
      // confirm: true,
      metadata: {
        id: order_id,
      },
    });
    // console.log(payment);
    res.status(200).json({
      client_secret: payment.client_secret,
    });

    // const order = await Order.findById(order_id);
    // if (order) {
    //   order.isPaid = true;
    //   order.paidAt = Date.now();
    //   order.paymentResult = {
    //     id: payment.id,
    //     status: payment.status,
    //     email: payment.email_address,
    //   };

    //   await order.save();
    //   res.status(201).json({
    //     success: true,
    //   });
    // } else {
    //   res.status(404).json({ message: "Order not found" });
    // }

    await mongoDisconnect();
  } catch (error) {
    await mongoDisconnect();
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end(err.message);
  },
});
