import {
  createRestaurantService,
  getRestaurantsByIdService,
  getRestaurantsService,
} from "../services/restaurant.service.js";

export async function createRestaurant(req, res) {
  try {
    const ownerId = req.user.id;
    const restaurantData = req.body;

    // console.log("ownerId is: =>",ownerId)
    // console.log("restaurantData is: =>", restaurantData);

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
    const restaurantId = req.params.id;

    const restaurantData = await getRestaurantsByIdService(restaurantId);

    return res.status(200).json({
      success: true,
      message: "Restaurant fetched by id successfully",
      restaurant: restaurantData,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}