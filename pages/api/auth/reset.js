import { createRouter } from "next-connect";
import { mongoConnect, mongoDisconnect } from "../../../utils/db";
import User from "../../../models/User";
import bcrypt from "bcrypt";

const router = createRouter();

router.put(async (req, res) => {
  try {
    await mongoConnect();
    const { user_id, password } = req.body;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ message: "This account doesnot exist" });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    await user.updateOne({
      password: cryptedPassword,
    });
    user.save();
    await mongoDisconnect();
    res.status(200).json({
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end(err.message);
  },
});
