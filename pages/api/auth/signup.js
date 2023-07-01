import { createRouter } from "next-connect";
import { mongoConnect, mongoDisconnect } from "../../../utils/db";
import { validateEmail } from "../../../utils/validation";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { createActivationToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmail";
import { activateEmailTemplate } from "../../../emails/activateEmailTemplate";
const router = createRouter();

router.post(async (req, res) => {
  try {
    await mongoConnect();
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fileds" });
    }
    if (!validateEmail(email)) {
      return res.status(200).json({ message: "Invalid Email" });
    }
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "This email already exist." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: cryptedPassword,
    });
    const addedUser = await newUser.save();

    const activation_token = createActivationToken({
      id: addedUser._id.toString(),
    });

    const url = `${process.env.BASE_URL}/activate/${activation_token}`;

    // sendEmail(email, url, "", "Activate Your Account", activateEmailTemplate);

    await mongoDisconnect();
    res.status(201).json({
      message: "Account created successfully, Please Activate your account",
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
