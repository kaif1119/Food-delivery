import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["user", "admin", "restaurantOwner"],
    default: "user",
  },
  refreshToken: {
    type: String,
    default: null,
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
