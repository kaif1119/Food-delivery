import mongoose from "mongoose";

/* FoodSchema {
  restaurantId
  name
  image
  description
  price
  category
  isVeg
  isAvailable
  preparationTimeInMinutes
  rating
} */

const foodSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    isVeg: {
      type: Boolean,
      default: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    preparationTimeInMinutes: {
      type: Number,
      default: 20,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  },
);


const foodModel = mongoose.model("Foods", foodSchema);

export default foodModel;
