import { createRouter } from "next-connect";
import { mongoConnect, mongoDisconnect } from "../../../utils/db";
import User from "../../../models/User";
import Cart from "../../../models/Cart";
import Product from "../../../models/Product";
import auth from "../../../middleware/auth";
const router = createRouter();

router.use(auth).post(async (req, res) => {
  try {
    await mongoConnect();
    const { address } = req.body;
    const newUser = await User.findByIdAndUpdate(
      req.user,
      {
        $push: {
          address: address,
        },
      },
      {
        new: true,
      }
    );

    res.status(201).json({
      address: newUser.address,
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
