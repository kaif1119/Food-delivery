import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import restaurantReducer from '../features/restaurants/restaurantSlice';
import foodReducer from '../features/foods/foodSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurants: restaurantReducer,
    foods: foodReducer,
    cart: cartReducer,
  },
});

