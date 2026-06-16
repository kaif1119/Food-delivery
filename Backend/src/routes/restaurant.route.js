import express from 'express';
import { createRestaurant, getRestaurant, getRestaurantById, updateRestaurant } from '../controllers/restaurant.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();
/* 
/api/get-restaurants
/api/restaurants

*/
router.post("/restaurants", authMiddleware, createRestaurant);
router.get("/get-restaurants", authMiddleware, getRestaurant);
router.get('/restaurants/:id', authMiddleware, getRestaurantById )
router.patch("/updata-restaurants/:id", authMiddleware, updateRestaurant);

export default router
