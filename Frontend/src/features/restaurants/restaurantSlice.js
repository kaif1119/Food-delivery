import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Thunk to fetch all restaurants
export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/restaurants');
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

// Thunk to update a restaurant
export const updateRestaurant = createAsyncThunk(
  'restaurants/updateRestaurant',
  async ({ id, restaurantData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/restaurants/${id}`, restaurantData);
      // Response contains: { success: true, message: "...", data: {...} }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update restaurant'
      );
    }
  }
);

// Thunk to delete a restaurant
export const deleteRestaurant = createAsyncThunk(
  'restaurants/deleteRestaurant',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/restaurants/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete restaurant'
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
  updateSuccess: false,
  deleteSuccess: false,
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
    resetUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
    resetDeleteSuccess: (state) => {
      state.deleteSuccess = false;
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
      })

      // Update restaurant
      .addCase(updateRestaurant.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateSuccess = true;
        const index = state.restaurants.findIndex((r) => r._id === action.payload._id);
        if (index !== -1) {
          state.restaurants[index] = action.payload;
        }
        if (state.currentRestaurant && state.currentRestaurant._id === action.payload._id) {
          state.currentRestaurant = action.payload;
        }
      })
      .addCase(updateRestaurant.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.updateSuccess = false;
      })

      // Delete restaurant
      .addCase(deleteRestaurant.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleteSuccess = true;
        state.restaurants = state.restaurants.filter((r) => r._id !== action.payload);
        if (state.currentRestaurant && state.currentRestaurant._id === action.payload) {
          state.currentRestaurant = null;
        }
      })
      .addCase(deleteRestaurant.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.deleteSuccess = false;
      });
  },
});

export const {
  clearRestaurantError,
  resetCreateSuccess,
  resetUpdateSuccess,
  resetDeleteSuccess,
} = restaurantSlice.actions;
export default restaurantSlice.reducer;
