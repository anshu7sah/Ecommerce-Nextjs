import { createRouter } from "next-connect";
import { mongoConnect, mongoDisconnect } from "../../../utils/db";
import User from "../../../models/User";

import auth from "../../../middleware/auth";
const router = createRouter();

router.use(auth).put(async (req, res) => {
  try {
    await mongoConnect();
    const { paymentMethod } = req.body;
    const newUser = await User.findByIdAndUpdate(
      req.user,
      {
        defaultPaymentMethod: paymentMethod,
      },
      {
        returnOriginal: false,
      }
    );

    res.status(201).json({
      paymentMethod: newUser.defaultPaymentMethod,
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
