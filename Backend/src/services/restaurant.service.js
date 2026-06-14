import {
  createRestaurant,
  findAllRestaurants,
  findRestaurantById,
} from "../repositories/restaurant.repository.js";

export async function createRestaurantService(ownerId, restaurantData) {
  const newRestaurantData = {
    ownerId,
    ...restaurantData,
  };

  const restaurant = await createRestaurant(newRestaurantData);
  return restaurant;
}

export async function getRestaurantsService() {
  const allRestaurants = await findAllRestaurants();
  return allRestaurants;
}

export async function getRestaurantsByIdService(restaurantId) {
  const restaurant = await findRestaurantById(restaurantId);

  if (!restaurant) {
    const error = new Error("Restaurant not found!");
    error.statusCode = 404;
    throw error;
  }

  return restaurant;
}