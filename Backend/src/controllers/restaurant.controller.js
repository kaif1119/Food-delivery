import {
  createRestaurantService,
  deleteRestaurantService,
  getRestaurantsByIdService,
  getRestaurantsService,
  updateRestaurantService,
} from "../services/restaurant.service.js";

export async function createRestaurant(req, res) {
  try {
    const ownerId = req.user.id;
    const restaurantData = req.body;

    const { name, address, city } = restaurantData;

    if (!name || !address || !city) {
      return res.status(400).json({
        success: false,
        message: "Name, address and city are required",
      });
    }

    const restaurant = await createRestaurantService(ownerId, restaurantData);

    return res.status(201).json({
      success: true,
      message: "Restaurant registered successfully",
      restaurant,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

export async function getRestaurant(req, res) {
  try {
    const restaurants = await getRestaurantsService();

    return res.status(200).json({
      success: true,
      message: "All restaurants fetched successfully",
      restaurants,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

export async function getRestaurantById(req, res) {
  try {
    const { id } = req.params;

    const restaurant = await getRestaurantsByIdService(id);

    return res.status(200).json({
      success: true,
      message: "Restaurant fetched successfully",
      restaurant,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

export async function updateRestaurant(req, res) {
  try {
    const { id } = req.params;
    const ownerId = req.user.id;
    const restaurantUpdateData = req.body;

    const restaurant = await updateRestaurantService(
      id,
      ownerId,
      restaurantUpdateData,
    );

    return res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      restaurant,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

export async function deleteRestaurantController(req, res) {
  try {
    const { id } = req.params;
    const ownerId = req.user.id;

    const deletedRestaurant = await deleteRestaurantService(id, ownerId);

    return res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
      restaurant: deletedRestaurant,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}
