import { createRouter } from "next-connect";
import Coupon from "../../../models/Coupon";
import { mongoConnect, mongoDisconnect } from "../../../utils/db";
const router = createRouter();

router.post(async (req, res) => {
  try {
    await mongoConnect();
    const { coupon, startDate, endDate, discount } = req.body;
    const test = await Coupon.findOne({ coupon });
    if (test) {
      return res.status(400).json({
        message: "This Coupon name already exists, try with a different name.",
      });
    }
    await new Coupon({
      coupon,
      startDate,
      endDate,
      discount,
    }).save();

    res.status(201).json({
      message: "Coupon created successfully",
      coupons: await Coupon.find({}),
    });
    await mongoDisconnect();
    return;
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
