import jwt from "jsonwebtoken";
import config from "../config/environement.js";

export async function restaurantMiddleware(req, res, next) {
  try {
    const token = req.cookies.accessToken;
    console.log(token);

    if (!token) {
      return res.statas(401).json({
        success: false,
        message: "User Unauthorized",
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.statua(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
}
