import {
  addToCartService,
  getCartService,
  updateCartItemService,
  removeCartItemService,
  clearCartService,
} from "../services/cart.service.js";

async function addToCart(req, res) {
  try {
    const userId = req.user.id;
    const { foodId, quantity } = req.body;

    const item = await addToCartService(userId, foodId, quantity);

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      data: item,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Error adding item to cart",
    });
  }
}

async function getCart(req, res) {
  try {
    const userId = req.user.id;
    const cart = await getCartService(userId);
    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Error fetching cart",
    });
  }
}

async function updateCartItem(req, res) {
  try {
    const userId = req.user.id;
    const { foodId, quantity } = req.body;
    const cart = await updateCartItemService(userId, foodId, quantity);
    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: cart,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Error updating cart",
    });
  }
}

async function removeCartItem(req, res) {
  try {
    const userId = req.user.id;
    const { foodId } = req.params;
    const cart = await removeCartItemService(userId, foodId);
    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: cart,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Error removing item from cart",
    });
  }
}

async function clearCart(req, res) {
  try {
    const userId = req.user.id;
    const cart = await clearCartService(userId);
    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      data: cart,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Error clearing cart",
    });
  }
}

export default {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
