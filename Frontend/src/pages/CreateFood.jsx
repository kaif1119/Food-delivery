import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createFood, resetFoodCreateSuccess, clearFoodError } from '../features/foods/foodSlice';
import Loader from '../components/Loader';
import { Utensils, Image, FileText, Sparkles, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const CreateFood = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    category: '',
    isVeg: true,
    isAvailable: true,
    preparationTimeInMinutes: 20,
  });

  const { isLoading, error, createSuccess } = useSelector((state) => state.foods);

  useEffect(() => {
    dispatch(clearFoodError());
    dispatch(resetFoodCreateSuccess());
  }, [dispatch]);

  useEffect(() => {
    if (createSuccess) {
      dispatch(resetFoodCreateSuccess());
      navigate(`/restaurants/${restaurantId}`);
    }
  }, [createSuccess, navigate, dispatch, restaurantId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, image, description, price, category, isVeg, isAvailable, preparationTimeInMinutes } = formData;

    if (!name || !image || !price || !category) return;

    const foodData = {
      restaurantId,
      name,
      image,
      description,
      price: Number(price),
      category,
      isVeg,
      isAvailable,
      preparationTimeInMinutes: Number(preparationTimeInMinutes),
    };

    dispatch(createFood(foodData));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {isLoading && <Loader message="Adding food item to menu..." />}

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
          Add New Food Item
        </h1>
        <p className="text-stone-500 text-sm max-w-md mx-auto">
          Expand your culinary offerings by introducing a fresh, tasty dish to your menu
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-8 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 text-rose-600 text-sm animate-fade-in">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="font-semibold">{error}</span>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-stone-200/50">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Food Name */}
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase mb-2">Dish Name *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                  <Utensils className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Garlic Butter Shrimp"
                  className="block w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase mb-2">Category *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                  <Sparkles className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Starters, Main Course, Desserts"
                  className="block w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-905 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase mb-2">Price (₹) *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400 font-extrabold text-sm select-none">
                  ₹
                </span>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 299"
                  className="block w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-905 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase mb-2">Image URL *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                  <Image className="w-5 h-5" />
                </span>
                <input
                  type="url"
                  name="image"
                  required
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="e.g. https://example.com/dish.jpg"
                  className="block w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-905 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-stone-600 uppercase mb-2">Description</label>
              <div className="relative">
                <span className="absolute top-3.5 left-3.5 text-stone-400">
                  <FileText className="w-5 h-5" />
                </span>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write a tasty description of ingredients, allergens, or serving style..."
                  className="block w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Preparation Time */}
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase mb-2">Prep Time (minutes)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                  <Clock className="w-5 h-5" />
                </span>
                <input
                  type="number"
                  name="preparationTimeInMinutes"
                  min="1"
                  required
                  value={formData.preparationTimeInMinutes}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-905 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Switches (Veg & Available) */}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-around bg-stone-50 p-4 rounded-xl border border-stone-200/60 md:col-span-1">
              {/* Veg Toggle */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="isVeg"
                  checked={formData.isVeg}
                  onChange={handleChange}
                  className="w-5 h-5 accent-emerald-500 rounded-md cursor-pointer"
                />
                <div>
                  <span className="block text-xs font-bold text-stone-800">Vegetarian Dish</span>
                  <span className="text-[10px] text-stone-450 leading-none font-medium">Green dot indicator</span>
                </div>
              </label>

              {/* Available Toggle */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  className="w-5 h-5 accent-amber-500 rounded-md cursor-pointer"
                />
                <div>
                  <span className="block text-xs font-bold text-stone-800">In Stock</span>
                  <span className="text-[10px] text-stone-450 leading-none font-medium">Ready for ordering</span>
                </div>
              </label>
            </div>
          </div>

          {/* Form Buttons */}
          <div className="flex gap-4 justify-end pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-stone-200 text-stone-600 hover:bg-stone-100 rounded-xl font-bold transition-all text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold shadow-lg shadow-amber-500/20 transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Add Food Item</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
