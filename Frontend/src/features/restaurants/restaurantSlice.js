import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Thunk to fetch all restaurants
export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/get-restaurants');
      // Response contains: { success: true, message: "...", restaurants: [...] }
      return response.data.restaurants;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch restaurants'
      );
    }
  }
);

// Thunk to fetch a single restaurant by ID
export const fetchRestaurantById = createAsyncThunk(
  'restaurants/fetchRestaurantById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/restaurants/${id}`);
      // Response contains: { success: true, message: "...", restaurant: {...} }
      return response.data.restaurant;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch restaurant details'
      );
    }
  }
);

// Thunk to create a restaurant
export const createRestaurant = createAsyncThunk(
  'restaurants/createRestaurant',
  async (restaurantData, { rejectWithValue }) => {
    try {
      const response = await api.post('/restaurants', restaurantData);
      // Response contains: { success: true, message: "...", restaurant: {...} }
      return response.data.restaurant;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create restaurant'
      );
    }
  }
);

const initialState = {
  restaurants: [],
  currentRestaurant: null,
  isLoading: false,
  error: null,
  createSuccess: false,
};

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    clearRestaurantError: (state) => {
      state.error = null;
    },
    resetCreateSuccess: (state) => {
      state.createSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all restaurants
      .addCase(fetchRestaurants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.restaurants = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch restaurant by ID
      .addCase(fetchRestaurantById.pending, (state) => {
        state.currentRestaurant = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.currentRestaurant = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchRestaurantById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create restaurant
      .addCase(createRestaurant.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.createSuccess = false;
      })
      .addCase(createRestaurant.fulfilled, (state, action) => {
        state.restaurants.push(action.payload);
        state.isLoading = false;
        state.createSuccess = true;
      })
      .addCase(createRestaurant.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.createSuccess = false;
      });
  },
});

export const { clearRestaurantError, resetCreateSuccess } = restaurantSlice.actions;
export default restaurantSlice.reducer;
