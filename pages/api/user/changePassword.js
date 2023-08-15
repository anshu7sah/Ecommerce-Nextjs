import { createRouter } from "next-connect";
import { mongoConnect, mongoDisconnect } from "../../../utils/db";
import User from "../../../models/User";
import auth from "../../../middleware/auth";
import bcrypt from "bcrypt";
const router = createRouter();

router.use(auth).post(async (req, res) => {
  console.log("anshu");
  try {
    await mongoConnect();
    const { current_password, password, conf_password } = req.body;
    const user = await User.findById(req.user);
    const crypted_password = await bcrypt.hash(password, 12);
    if (!user.password) {
      if (password !== conf_password) {
        return res.status(400).json({
          message: "New password and confirm password does not matches.",
        });
      }
      await user.updateOne({
        password: crypted_password,
      });

      return res.status(201).json({
        message:
          "You can use your social login credential with this new password for normal login !",
      });
    }
    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is wrong" });
    }

    if (password !== conf_password) {
      return res.status(400).json({
        message: "New password and confirm password does not matches.",
      });
    }
    console.log(crypted_password);
    await user.updateOne({
      password: crypted_password,
    });

    await mongoDisconnect();
    res.status(201).json({ message: "Password has been changes successfully" });
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
