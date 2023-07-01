import jwt from "jsonwebtoken";

export const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ActivationTokenSecret, {
    expiresIn: "2d",
  });
};

export const createResetToken = (payload) => {
  return jwt.sign(payload, process.env.ResetTokenSecret, {
    expiresIn: "6h",
  });
};
