import mongoose from "mongoose";
import {
  createFood,
  deleteFood,
  findAllFoods,
  findFoodById,
  updateFood,
} from "../repositories/food.repository.js";

function validateObjectId(id, message = "Invalid Food ID") {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error(message);
    error.statusCode = 400;
    throw error;
  }
}

function validatePayload(payload) {
  if (!payload || Object.keys(payload).length === 0) {
    const error = new Error("Food data is required");
    error.statusCode = 400;
    throw error;
  }
}

export async function createFoodService(foods) {
  validatePayload(foods);

  return await createFood(foods);
}

export async function getFoodsService() {
  return await findAllFoods();
}

export async function getFoodByIdService(id) {
  validateObjectId(id);

  const food = await findFoodById(id);

  if (!food) {
    const error = new Error("Food not found");
    error.statusCode = 404;
    throw error;
  }

  return food;
}

export async function updateFoodService(id, payload) {
  validateObjectId(id);
  validatePayload(payload);

  const updatedFood = await updateFood(id, payload);

  if (!updatedFood) {
    const error = new Error("Food not found");
    error.statusCode = 404;
    throw error;
  }

  return updatedFood;
}

export async function deleteFoodService(id) {
  validateObjectId(id);

  const deletedFood = await deleteFood(id);

  if (!deletedFood) {
    const error = new Error("Food not found");
    error.statusCode = 404;
    throw error;
  }

  return deletedFood;
}
