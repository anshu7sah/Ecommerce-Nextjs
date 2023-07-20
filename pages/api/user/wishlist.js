import { createRouter } from "next-connect";
import { mongoConnect, mongoDisconnect } from "../../../utils/db";

import User from "../../../models/User";
import auth from "../../../middleware/auth";
const router = createRouter();

router.use(auth).put(async (req, res) => {
  try {
    await mongoConnect();
    const { product_id, style } = req.body;
    const user = await User.findById(req.user);
    const exist = user?.wishlist?.find(
      (x) => x.product == product_id && x.style == style
    );
    if (exist) {
      return res
        .status(400)
        .json({ message: "Product already exists in your wishlist" });
    }
    await user.updateOne({
      $push: {
        wishlist: {
          product: product_id,
          style,
        },
      },
    });

    await mongoDisconnect();

    res
      .status(200)
      .json({ message: "Product successfully added to your wishlist." });
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
