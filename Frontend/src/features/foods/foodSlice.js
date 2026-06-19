import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Thunk to fetch all foods
export const fetchFoods = createAsyncThunk(
  'foods/fetchFoods',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/foods');
      // Response contains: { success: true, message: "...", foods: [...] }
      return response.data.foods;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch foods'
      );
    }
  }
);

// Thunk to fetch food by ID
export const fetchFoodById = createAsyncThunk(
  'foods/fetchFoodById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/foods/${id}`);
      // Response contains: { success: true, message: "...", food: {...} }
      return response.data.food;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch food details'
      );
    }
  }
);

// Thunk to create a food item
export const createFood = createAsyncThunk(
  'foods/createFood',
  async (foodData, { rejectWithValue }) => {
    try {
      const response = await api.post('/foods', foodData);
      // Response contains: { success: true, message: "...", food: {...} }
      return response.data.food;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create food item'
      );
    }
  }
);

// Thunk to update a food item
export const updateFood = createAsyncThunk(
  'foods/updateFood',
  async ({ id, foodData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/foods/${id}`, foodData);
      // Response contains: { success: true, message: "...", food: {...} }
      return response.data.food;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update food item'
      );
    }
  }
);

// Thunk to delete a food item
export const deleteFood = createAsyncThunk(
  'foods/deleteFood',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/foods/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete food item'
      );
    }
  }
);

const initialState = {
  foods: [],
  currentFood: null,
  isLoading: false,
  error: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const foodSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {
    clearFoodError: (state) => {
      state.error = null;
    },
    resetFoodCreateSuccess: (state) => {
      state.createSuccess = false;
    },
    resetFoodUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
    resetFoodDeleteSuccess: (state) => {
      state.deleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all foods
      .addCase(fetchFoods.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.foods = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch food by ID
      .addCase(fetchFoodById.pending, (state) => {
        state.currentFood = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFoodById.fulfilled, (state, action) => {
        state.currentFood = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFoodById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create food
      .addCase(createFood.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.createSuccess = false;
      })
      .addCase(createFood.fulfilled, (state, action) => {
        state.foods.push(action.payload);
        state.isLoading = false;
        state.createSuccess = true;
      })
      .addCase(createFood.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.createSuccess = false;
      })

      // Update food
      .addCase(updateFood.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateSuccess = true;
        const index = state.foods.findIndex((f) => f._id === action.payload._id);
        if (index !== -1) {
          state.foods[index] = action.payload;
        }
        if (state.currentFood && state.currentFood._id === action.payload._id) {
          state.currentFood = action.payload;
        }
      })
      .addCase(updateFood.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.updateSuccess = false;
      })

      // Delete food
      .addCase(deleteFood.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleteSuccess = true;
        state.foods = state.foods.filter((f) => f._id !== action.payload);
        if (state.currentFood && state.currentFood._id === action.payload) {
          state.currentFood = null;
        }
      })
      .addCase(deleteFood.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.deleteSuccess = false;
      });
  },
});

export const {
  clearFoodError,
  resetFoodCreateSuccess,
  resetFoodUpdateSuccess,
  resetFoodDeleteSuccess,
} = foodSlice.actions;

export default foodSlice.reducer;
