import userModel from "../models/user.model.js";

export async function findByEmail(email) {
  return await userModel.findOne({ email });
}

export async function createUser(user) {
  return await userModel.create(user);
}

export async function findById(userId) {
  return await userModel.findById(userId).select("-password -refreshToken");
}

export async function findByIdWithCredentials(userId) {
  return await userModel.findById(userId);
}

export async function updateRefreshToken(userId, refreshToken) {
  return await userModel.findByIdAndUpdate(
    userId,
    { refreshToken },
    { returnDocument: "after" },
  );
}

export async function clearRefreshToken(refreshToken) {
  return await userModel.findOneAndUpdate(
    { refreshToken },
    { refreshToken: null },
    { returnDocument: "after" },
  );
}
