import {
  createRestaurant,
  deleteRestaurant,
  findAllRestaurants,
  findRestaurantById,
  findRestaurantByIdAndUpdate,
} from "../repositories/restaurant.repository.js";

export async function createRestaurantService(ownerId, restaurantData) {
  if (!ownerId) {
    const error = new Error("Owner id is required");
    error.statusCode = 400;
    throw error;
  }

  const newRestaurantData = {
    ownerId,
    ...restaurantData,
  };

  const restaurant = await createRestaurant(newRestaurantData);
  return restaurant;
}

export async function getRestaurantsService() {
  const restaurants = await findAllRestaurants();
  return restaurants;
}

export async function getRestaurantsByIdService(id) {
  if (!id) {
    const error = new Error("Restaurant id is required");
    error.statusCode = 400;
    throw error;
  }

  const restaurant = await findRestaurantById(id);

  if (!restaurant) {
    const error = new Error("Restaurant not found");
    error.statusCode = 404;
    throw error;
  }

  return restaurant;
}

export async function updateRestaurantService(
  id,
  ownerId,
  restaurantUpdateData,
) {
  if (!id) {
    const error = new Error("Restaurant id is required");
    error.statusCode = 400;
    throw error;
  }

  if (!restaurantUpdateData || Object.keys(restaurantUpdateData).length === 0) {
    const error = new Error("Update data is required");
    error.statusCode = 400;
    throw error;
  }

  const restaurant = await findRestaurantById(id);

  if (!restaurant) {
    const error = new Error("Restaurant not found");
    error.statusCode = 404;
    throw error;
  }

  if (restaurant.ownerId._id.toString() !== ownerId.toString()) {
    const error = new Error("You are not authorized to update this restaurant");
    error.statusCode = 403;
    throw error;
  }

  const allowedFields = [
    "name",
    "image",
    "description",
    "address",
    "city",
    "isOpen",
    "deliveryTimeInMinutes",
    "cuisine",
  ];

  const filteredUpdateData = {};

  allowedFields.forEach((field) => {
    if (restaurantUpdateData[field] !== undefined) {
      filteredUpdateData[field] = restaurantUpdateData[field];
    }
  });

  if (Object.keys(filteredUpdateData).length === 0) {
    const error = new Error("No valid fields provided for update");
    error.statusCode = 400;
    throw error;
  }

  const updatedRestaurant = await findRestaurantByIdAndUpdate(
    id,
    filteredUpdateData,
  );

  return updatedRestaurant;
}

export async function deleteRestaurantService(id, ownerId) {
  if (!id) {
    const error = new Error("Restaurant id is required");
    error.statusCode = 400;
    throw error;
  }

  const restaurant = await findRestaurantById(id);

  if (!restaurant) {
    const error = new Error("Restaurant not found");
    error.statusCode = 404;
    throw error;
  }

  if (restaurant.ownerId._id.toString() !== ownerId.toString()) {
    const error = new Error("You are not authorized to delete this restaurant");
    error.statusCode = 403;
    throw error;
  }

  const deletedRestaurant = await deleteRestaurant(id);
  return deletedRestaurant;
}
