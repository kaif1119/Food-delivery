import foodModel from "../models/food.model.js";

export async function findFoodById(id) {
  const food = await foodModel
    .findById(id)
    .populate("restaurantId", "name ownerId city");
  return food;
}

export async function findAllFoods() {
  const foods = awaitfoodModel.find().populate("restaurantId", "name city");
  return foods;
}

export async function createFood(payload) {
  const food = await foodModel.create(payload);
  return food;
}
export async function updateFood(id, payload) {
  const updatedFood = await foodModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return updatedFood;
}
export async function deleteFood(id) {
  const deletedFood = await foodModel.findByIdAndDelete(id);
  return deletedFood;
}
