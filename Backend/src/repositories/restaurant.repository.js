import restaurantModel from "../models/restaurant.model.js";

export async function createRestaurant(data) {
  const restaurant = await restaurantModel.create(data);
  return restaurant;
}
export async function findRestaurantById(id) {
  return await restaurantModel
    .findById(id).populate("ownerId", "username email");
}
export async function findAllRestaurants() {
  return await restaurantModel.find().populate("ownerId", "username email");
}

export async function findRestaurantByIdAndUpdate(id, data) {
  const updatedRestaurant = await restaurantModel.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
  return updatedRestaurant;
}
export async function deleteRestaurant(id) {
  const deletedRestaurant = await restaurantModel.findByIdAndDelete(id);
  return deletedRestaurant;
}
