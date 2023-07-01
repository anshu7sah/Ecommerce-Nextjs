import { createRouter } from "next-connect";
import { mongoConnect, mongoDisconnect } from "../../../utils/db";
import User from "../../../models/User";
import Cart from "../../../models/Cart";
import Order from "../../../models/Order";
import Product from "../../../models/Product";
import auth from "../../../middleware/auth";
const router = createRouter();

router.use(auth).post(async (req, res) => {
  try {
    await mongoConnect();

    const {
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    } = req.body;
    const cart = await Cart.findOne({ user: req.user });

    const newOrder = await new Order({
      user: req.user,
      products,
      shippingAddress,
      paymentMethod,
      total: cart.totalAfterDiscount || cart.cartTotal,
      totalBeforeDiscount: cart.cartTotal,
      couponApplied,
    }).save();

    await mongoDisconnect();
    return res.status(201).json({
      order_id: newOrder._id,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end(err.message);
  },
});
