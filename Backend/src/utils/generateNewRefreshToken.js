import jwt from "jsonwebtoken";
import config from "../config/environement.js";
import { generateAccessToken, generateRefreshToken } from "./generateToken.js";

export async function generateNewRefreshToken(payload) {
  const decoded = jwt.verify(payload, config.JWT_SECRET);

  const newAccessToken = generateAccessToken({
    _id: decoded.id,
  });

  const newRefreshToken = generateRefreshToken({
    _id: decoded.id,
  });

  return {
    userId: decoded.id,
    newAccessToken,
    newRefreshToken,
  };
}