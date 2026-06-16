import express from "express";
import {
  createRestaurant,
  deleteRestaurantController,
  getRestaurant,
  getRestaurantById,
  updateRestaurant,
} from "../controllers/restaurant.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/restaurants", authMiddleware, createRestaurant);
router.get("/restaurants", authMiddleware, getRestaurant);
router.get("/restaurants/:id", authMiddleware, getRestaurantById);
router.patch("/restaurants/:id", authMiddleware, updateRestaurant);
router.delete("/restaurants/:id", authMiddleware, deleteRestaurantController);

export default router;
