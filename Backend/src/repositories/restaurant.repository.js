import restaurantModel from "../models/restaurant.model.js";

export async function createRestaurant(data) {
  const restaurant = await restaurantModel.create(data);
  return restaurant;
}

export async function findRestaurantById(id) {
  const restaurant = await restaurantModel
    .findById(id)
    .populate("ownerId", "username email");

  return restaurant;
}

export async function findAllRestaurants() {
  const restaurants = await restaurantModel
    .find()
    .populate("ownerId", "username email");

  return restaurants;
}

export async function findRestaurantByIdAndUpdate(id, data) {
  const updatedRestaurant = await restaurantModel
    .findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
    .populate("ownerId", "username email");

  return updatedRestaurant;
}

export async function deleteRestaurant(id) {
  const deletedRestaurant = await restaurantModel
    .findByIdAndDelete(id)
    .populate("ownerId", "username email");

  return deletedRestaurant;
}
