import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    isOpen: {
      type: Boolean,
      default: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    deliveryTimeInMinutes: {
      type: Number,
      default: 30,
      min: 5,
    },

    cuisine: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const restaurantModel = mongoose.model("restaurants", restaurantSchema);

export default restaurantModel;
