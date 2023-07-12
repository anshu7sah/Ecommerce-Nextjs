import { createRouter } from "next-connect";
import auth from "../../../middleware/auth";
import { mongoConnect, mongoDisconnect } from "../../../utils/db";
import slugify from "slugify";
import Coupon from "../../../models/Coupon";
import admin from "../../../middleware/admin";
const router = createRouter();

router
  .use(auth)
  .use(admin)
  .post(async (req, res) => {
    try {
      await mongoConnect();
      const { coupon, discount, startDate, endDate } = req.body;
      const test = await Coupon.findOne({ coupon });
      if (test) {
        return res
          .status(400)
          .json({ message: "Coupon already exist, Try a different coupon" });
      }
      await new Coupon({ coupon, discount, startDate, endDate }).save();

      res.json({
        message: `Coupon ${coupon} has been created successfully`,
        coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
      });
      await mongoDisconnect();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

router
  .use(auth)
  .use(admin)
  .delete(async (req, res) => {
    try {
      const { id } = req.query;
      await mongoConnect();
      await Coupon.findByIdAndRemove(id);
      await mongoDisconnect();
      return res.status(201).json({
        message: "Coupon has been deleted successfully",
        coupons: await Coupon.find({}).sort({ updatedAt: -1 }).lean(),
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router
  .use(auth)
  .use(admin)
  .put(async (req, res) => {
    try {
      const { id, coupon, discount, startDate, endDate } = req.body;
      await mongoConnect();
      await Coupon.findByIdAndUpdate(id, {
        coupon,
        discount,
        startDate,
        endDate,
      });
      await mongoDisconnect();
      return res.status(201).json({
        message: "Coupon has been updated successfully",
        coupons: await Coupon.find({}).sort({ createdAt: -1 }).lean(),
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end(err.message);
  },
});
