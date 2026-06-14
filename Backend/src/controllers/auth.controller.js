import {
  userGet,
  userLogin,
  userLogout,
  userRegister,
} from "../services/auth.service.js";
import { setTokenInCookie } from "../utils/setTokenInCookie.js";

export async function register(req, res) {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await userRegister({ username, email, password, role });

    setTokenInCookie(res, user);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await userLogin({ email, password });
    setTokenInCookie(res, user);
    return res.status(200).json({
      success: true,
      message: "User login successfully!",
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

export async function logout(req, res) {
  try {
    const refreshToken = req.cookies?.refreshToken;

    await userLogout(refreshToken);

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

export async function getMe(req, res) {
  try {
    const userId = req.user.id;
    const user = await userGet(userId);

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}
