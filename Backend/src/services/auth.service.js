import {
  clearRefreshToken,
  createUser,
  findByEmail,
  findById,
  findByIdWithCredentials,
  updateRefreshToken,
} from "../repositories/auth.repositorie.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/environement.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

export async function userRegister(userPayload) {
  const { username, email, password, role, phoneNumber } = userPayload;

  const isExist = await findByEmail(email);

  if (isExist) {
    const error = new Error("User already exists, try login");
    error.statusCode = 409;
    throw error;
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const userData = {
    username,
    email,
    phoneNumber,
    password: hashPassword,
    role: role || "user",
  };
  const newUser = await createUser(userData);

  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);

  await updateRefreshToken(newUser._id, refreshToken);

  const userResponse = {
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
  };
  return {
    user: userResponse,
    accessToken,
    refreshToken,
  };
}

export async function userLogin(userPayload) {
  const { email, password } = userPayload;

  const isUser = await findByEmail(email);

  if (!isUser) {
    const error = new Error("Invalid email or password");
    error.statusCode = 400;
    throw error;
  }

  const comparePassword = await bcrypt.compare(password, isUser.password);

  if (!comparePassword) {
    const error = new Error("Invalid email or password");
    error.statusCode = 400;
    throw error;
  }

  const accessToken = generateAccessToken(isUser);
  const refreshToken = generateRefreshToken(isUser);

  await updateRefreshToken(isUser._id, refreshToken);

  const userResponse = {
    id: isUser._id,
    username: isUser.username,
    email: isUser.email,
  };

  return {
    user: userResponse,
    accessToken,
    refreshToken,
  };
}

export async function userLogout(refreshToken) {
  if (!refreshToken) {
    return null;
  }

  return await clearRefreshToken(refreshToken);
}

export async function userGet(userId) {
  const user = await findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
}

export async function userGetRefreshToken(refreshToken) {
  if (!refreshToken) {
    const error = new Error("User unauthorized");
    error.statusCode = 401;
    throw error;
  }

  // Verify the JWT signature and expiration
  let decoded;
  try {
    decoded = jwt.verify(refreshToken, config.JWT_SECRET);
  } catch (err) {
    const error = new Error("Invalid or Expired Refresh Token");
    error.statusCode = 401;
    throw error;
  }

  // Find the user from DB (with the stored refresh token)
  const user = await findByIdWithCredentials(decoded.id);
  if (!user || user.refreshToken !== refreshToken) {
    const error = new Error("User unauthorized or session expired");
    error.statusCode = 401;
    throw error;
  }

  // Generate new tokens
  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  // Update the new refresh token in database
  await updateRefreshToken(user._id, newRefreshToken);

  return {
    userId: user._id,
    newAccessToken,
    newRefreshToken,
  };
}