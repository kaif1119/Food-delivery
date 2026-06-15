import jwt from "jsonwebtoken";
import config from "../config/environement.js";
import { generateAccessToken, generateRefreshToken } from "./generateToken.js";

export async function generateNewRefreshToken(payload) {
  // console.log("Ger user refresh token: =>",payload)

  const decoded = jwt.verify(payload, config.JWT_SECRET);
  console.log("Ger user refresh token decoded: =>", decoded);

  const newAccessToken = generateAccessToken({
    _id: decoded.id,
  });

  const newRefreshToken = generateRefreshToken({
    _id: decoded.id,
  });

  // console.log("Generate new access token: =>", accessToken)

  const newTokenData={
    newAccessToken,
    newRefreshToken
  }
}
