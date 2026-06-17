import {
  createFoodService,
  deleteFoodService,
  getFoodByIdService,
  getFoodsService,
  updateFoodService,
} from "../services/food.service.js";

export async function createFoodController(req, res) {
  try {
    const food = await createFoodService(req.body);

    return res.status(201).json({
      success: true,
      message: "Food created successfully",
      food,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

export async function getFoodsController(req, res) {
  try {
    const foods = await getFoodsService();

    return res.status(200).json({
      success: true,
      message: "Foods retrieved successfully",
      foods,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

export async function getFoodByIdController(req, res) {
  try {
    const food = await getFoodByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Food retrieved successfully",
      food,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

export async function updateFoodController(req, res) {
  try {
    const updatedFood = await updateFoodService(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Food updated successfully",
      food: updatedFood,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

export async function deleteFoodController(req, res) {
  try {
    await deleteFoodService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}
