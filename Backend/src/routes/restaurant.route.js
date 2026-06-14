import express from 'express';
import { createRestaurant, getRestaurant, getRestaurantById } from '../controllers/restaurant.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();
/* 
/api/get-restaurants
/api/restaurants

*/
router.post("/restaurants", authMiddleware, createRestaurant);
router.get("/get-restaurants", authMiddleware, getRestaurant);
router.get('/restaurants/:id', authMiddleware, getRestaurantById )

export default router
