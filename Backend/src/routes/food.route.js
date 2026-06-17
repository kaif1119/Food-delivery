import express from "express";
import {
  createFoodController,
  deleteFoodController,
  getFoodByIdController,
  getFoodsController,
  updateFoodController,
} from "../controllers/food.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();
/* 
/api/foods

*/
router.post("/foods", authMiddleware, createFoodController);
router.get("/foods", authMiddleware, getFoodsController);
router.get("/foods/:id", authMiddleware, getFoodByIdController);
router.patch("/foods/:id", authMiddleware, updateFoodController);
router.delete("/foods/:id", authMiddleware, deleteFoodController);

export default router;
