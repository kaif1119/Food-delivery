import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import cartController from '../controllers/cart.controller.js';

const router = express.Router();

router.get("/cart", authMiddleware, cartController.getCart);
router.post("/cart", authMiddleware, cartController.addToCart);
router.patch("/cart", authMiddleware, cartController.updateCartItem);
router.delete("/cart/:foodId", authMiddleware, cartController.removeCartItem);
router.delete("/cart", authMiddleware, cartController.clearCart);

export default router;
