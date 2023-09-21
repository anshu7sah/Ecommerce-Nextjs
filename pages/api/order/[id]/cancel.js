import { createRouter } from "next-connect";

import Order from "../../../../models/Order";
import auth from "../../../../middleware/auth";
import { mongoConnect, mongoDisconnect } from "../../../../utils/db";
const router = createRouter();

router.use(auth).put(async (req, res) => {
  try {
    await mongoConnect();

    const order_id = req.query.id;

    const order = await Order.findById(order_id);
    if (order) {
      order.cancelOrder = true;
      await mongoDisconnect();
      const newOrder = await order.save();
      res.status(201).json({ message: "Your Order has been cancelled." });
    } else {
      await mongoDisconnect();
      res.status(404).json({ message: "Order is not found" });
    }
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
