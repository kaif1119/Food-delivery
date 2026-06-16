import jwt from "jsonwebtoken";
import config from "../config/environement.js";

export function generateAccessToken(user) {
  return jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "15m",
  });
}

export function generateRefreshToken(user) {
  return jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });
}
