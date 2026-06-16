import {
  createRestaurant,
  findAllRestaurants,
  findRestaurantById,
  findRestaurantByIdAndUpdate,
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

export async function updateRestaurantService(restuarentsUpdateData, id) {
  // console.log("service restaurant id by params: =>", id);
  // console.log("service restaurant updated data: =>", restuarentsUpdateData);

  if (!id || !restuarentsUpdateData) {
    const error = new Error("Restaurant id and update data are required");
    error.statusCode = 400;
    throw error;
  }

  const restaurant = await findRestaurantByIdAndUpdate(
    id,
    restuarentsUpdateData,
  );

  if (!restaurant) {
    const error = new Error("Restaurant not found");
    error.statusCode = 404;
    throw error;
  }

  return restaurant;
}