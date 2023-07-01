import { createRouter } from "next-connect";
import { mongoConnect, mongoDisconnect } from "../../../utils/db";

import Cart from "../../../models/Cart";
import Coupon from "../../../models/Coupon";
import auth from "../../../middleware/auth";
const router = createRouter();

router.use(auth).post(async (req, res) => {
  try {
    await mongoConnect();
    const { coupon } = req.body;
    const checkCoupon = await Coupon.findOne({ coupon });
    if (checkCoupon == null) {
      return res.status(400).json({ message: "Invalid Coupon" });
    }

    const { cartTotal } = await Cart.findOne({ user: req.user });
    let totalAfterDiscount =
      cartTotal - (cartTotal * checkCoupon.discount) / 100;

    await Cart.findOneAndUpdate({ user: req.user }, { totalAfterDiscount });

    res.status(201).json({
      totalAfterDiscount: totalAfterDiscount.toFixed(2),
      discount: checkCoupon.discount,
    });

    await mongoDisconnect();
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
