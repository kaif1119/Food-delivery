import {
  createCart,
  findCartByUserId,
  updateCartByUserId,
} from "../repositories/cart.repository.js";

import { findFoodById } from "../repositories/food.repository.js";

export async function addToCartService(userId, foodId, quantity = 1) {
    
  if (!userId || !foodId) {
    const error = new Error("User id and food id are required");
    error.statusCode = 400;
    throw error;
  }

  if (quantity < 1) {
    const error = new Error("Quantity must be at least 1");
    error.statusCode = 400;
    throw error;
  }

  const food = await findFoodById(foodId);

  if (!food) {
    const error = new Error("Food not found");
    error.statusCode = 404;
    throw error;
  }

  if (!food.isAvailable) {
    const error = new Error("Food is not available");
    error.statusCode = 400;
    throw error;
  }

  let cart = await findCartByUserId(userId);

  if (!cart) {
    const totalAmount = food.price * quantity;

    cart = await createCart({
      userId,
      items: [
        {
          foodId: food._id,
          name: food.name,
          price: food.price,
          image: food.image,
          quantity,
        },
      ],
      totalAmount,
    });

    return cart;
  }

  const existingItem = cart.items.find(
    (item) => item.foodId.toString() === foodId.toString(),
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      foodId: food._id,
      name: food.name,
      price: food.price,
      image: food.image,
      quantity,
    });
  }

  cart.totalAmount = cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const updatedCart = await updateCartByUserId(userId, {
    items: cart.items,
    totalAmount: cart.totalAmount,
  });

  return updatedCart;
}

export async function getCartService(userId) {
  if (!userId) {
    const error = new Error("User id is required");
    error.statusCode = 400;
    throw error;
  }

  let cart = await findCartByUserId(userId);

  if (!cart) {
    cart = await createCart({
      userId,
      items: [],
      totalAmount: 0,
    });
  }

  return cart;
}

export async function updateCartItemService(userId, foodId, quantity) {
  if (!userId || !foodId) {
    const error = new Error("User id and food id are required");
    error.statusCode = 400;
    throw error;
  }

  if (quantity < 1) {
    return await removeCartItemService(userId, foodId);
  }

  let cart = await findCartByUserId(userId);

  if (!cart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    throw error;
  }

  const existingItem = cart.items.find(
    (item) => item.foodId.toString() === foodId.toString(),
  );

  if (!existingItem) {
    const error = new Error("Item not found in cart");
    error.statusCode = 404;
    throw error;
  }

  existingItem.quantity = quantity;

  cart.totalAmount = cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const updatedCart = await updateCartByUserId(userId, {
    items: cart.items,
    totalAmount: cart.totalAmount,
  });

  return updatedCart;
}

export async function removeCartItemService(userId, foodId) {
  if (!userId || !foodId) {
    const error = new Error("User id and food id are required");
    error.statusCode = 400;
    throw error;
  }

  let cart = await findCartByUserId(userId);

  if (!cart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    throw error;
  }

  cart.items = cart.items.filter(
    (item) => item.foodId.toString() !== foodId.toString(),
  );

  cart.totalAmount = cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const updatedCart = await updateCartByUserId(userId, {
    items: cart.items,
    totalAmount: cart.totalAmount,
  });

  return updatedCart;
}

export async function clearCartService(userId) {
  if (!userId) {
    const error = new Error("User id is required");
    error.statusCode = 400;
    throw error;
  }

  const updatedCart = await updateCartByUserId(userId, {
    items: [],
    totalAmount: 0,
  });

  return updatedCart;
}

