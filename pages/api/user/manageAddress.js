import { createRouter } from "next-connect";
import { mongoConnect, mongoDisconnect } from "../../../utils/db";
import User from "../../../models/User";
import Cart from "../../../models/Cart";
import Product from "../../../models/Product";
import auth from "../../../middleware/auth";
const router = createRouter();

router.use(auth).put(async (req, res) => {
  try {
    await mongoConnect();
    const { id } = req.body;
    const user = await User.findById(req.user);
    let user_addresses = user.address;
    let addresses = [];
    for (let i = 0; i < user_addresses.length; i++) {
      let temp_address = {};
      if (user_addresses[i]._id == id) {
        temp_address = { ...user_addresses[i].toObject(), active: true };
        addresses.push(temp_address);
      } else {
        temp_address = { ...user_addresses[i].toObject(), active: false };
        addresses.push(temp_address);
      }
    }
    const newUserData = await user.updateOne(
      {
        address: addresses,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      address: addresses,
    });

    await mongoDisconnect();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.use(auth).delete(async (req, res) => {
  try {
    await mongoConnect();

    const user = await User.findByIdAndUpdate(
      req.user,
      {
        $pull: { address: { _id: req.query.id } },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      address: user.address,
    });

    await mongoDisconnect();
  } catch (error) {}
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end(err.message);
  },
});
