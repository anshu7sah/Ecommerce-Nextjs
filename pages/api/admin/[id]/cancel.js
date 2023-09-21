import { createRouter } from "next-connect";
import auth from "../../../../middleware/auth";
import { mongoConnect, mongoDisconnect } from "../../../../utils/db";
import Order from "../../../../models/Order";
import admin from "../../../../middleware/admin";

const router = createRouter();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router
  .use(auth)
  .use(admin)
  .put(async (req, res) => {
    try {
      await mongoConnect();
      const orderId = req.query.id;
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      if (order.paymentMethod == "cash") {
        order.confirmCancelOrder = true;
        await order.save();
        return res
          .status(200)
          .json({ message: "Order had been cancelled successfully" });
      } else if (order.paymentMethod == "credit_card") {
        console.log(order.paymentMethod);
        console.log(order.paymentResult.id);
        const refund = await stripe.refunds.create({
          payment_intent: order.paymentResult.id,
        });
        console.log(refund);
        res.status(200).send();
      }

      await mongoDisconnect();
    } catch (error) {
      console.log(error);
    }
  });

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end(err.message);
  },
});
