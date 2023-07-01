import { createRouter } from "next-connect";
import { mongoConnect, mongoDisconnect } from "../../../utils/db";
import { validateEmail } from "../../../utils/validation";
import User from "../../../models/User";
import { createResetToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmail";
import { forgotEmailTemplate } from "../../../emails/forgotEmailTemplate";
const router = createRouter();

router.post(async (req, res) => {
  try {
    await mongoConnect();
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ message: "Please provide the valid email for your account." });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "This user does not exist." });
    }

    const user_id = createResetToken({
      id: user._id.toString(),
    });

    const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;

    sendEmail(email, url, "", "Reset Your Password", forgotEmailTemplate);

    await mongoDisconnect();
    res.status(200).json({
      message: "An email has been sent to your account",
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
