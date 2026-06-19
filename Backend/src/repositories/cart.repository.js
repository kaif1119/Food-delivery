import cartModel from "../models/cart.model.js";

export async function findCartByUserId(userId) {
  return await cartModel.findOne({ userId });
}

export async function createCart(cartData) {
  return await cartModel.create(cartData);
}

export async function updateCartByUserId(userId, cartData) {
  return await cartModel.findOneAndUpdate({ userId }, cartData, {
    new: true,
    runValidators: true,
  });
}

export async function deleteCartByUserId(userId) {
  return await cartModel.findOneAndDelete({ userId });
}

export async function findCartByUserIdAndPopulate(userId) {
  return await cartModel.findOne({ userId }).populate("items.foodId");
}
