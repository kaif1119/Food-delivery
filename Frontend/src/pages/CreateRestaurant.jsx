import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRestaurant, resetCreateSuccess, clearRestaurantError } from '../features/restaurants/restaurantSlice';
import Loader from '../components/Loader';
import { UtensilsCrossed, FileText, MapPin, Image, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const CreateRestaurant = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    image: '',
    deliveryTimeInMinutes: 30,
    cuisineInput: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, createSuccess } = useSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(clearRestaurantError());
    dispatch(resetCreateSuccess());
  }, [dispatch]);

  useEffect(() => {
    if (createSuccess) {
      dispatch(resetCreateSuccess());
      navigate('/restaurants');
    }
  }, [createSuccess, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, address, city, image, deliveryTimeInMinutes, cuisineInput } = formData;

    if (!name || !address || !city) return;

    // Convert cuisines to array of strings
    const cuisinesArray = cuisineInput
      ? cuisineInput.split(',').map((c) => c.trim()).filter((c) => c.length > 0)
      : [];

    const restaurantData = {
      name,
      description,
      address,
      city,
      image,
      deliveryTimeInMinutes: Number(deliveryTimeInMinutes),
      cuisine: cuisinesArray,
    };

    dispatch(createRestaurant(restaurantData));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {isLoading && <Loader message="Registering your restaurant..." />}

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
          Register Your Restaurant
        </h1>
        <p className="text-stone-500 text-sm max-w-md mx-auto">
          Partner with TastyTrail to reach hungry foodies and grow your business today
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
            {/* Restaurant Name */}
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase mb-2">Restaurant Name *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                  <UtensilsCrossed className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Pizza Palace"
                  className="block w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Banner Image URL */}
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase mb-2">Image URL</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                  <Image className="w-5 h-5" />
                </span>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="e.g. https://example.com/restaurant.jpg"
                  className="block w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all text-sm font-medium"
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
                  placeholder="Describe your dishes, ambience, or food philosophy..."
                  className="block w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase mb-2">Street Address *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                  <MapPin className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. 123 Food Street"
                  className="block w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-905 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase mb-2">City *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                  <MapPin className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. New York"
                  className="block w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-905 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Cuisine categories */}
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase mb-2">Cuisines (comma-separated)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                  <UtensilsCrossed className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  name="cuisineInput"
                  value={formData.cuisineInput}
                  onChange={handleChange}
                  placeholder="e.g. Italian, Pizza, Pasta"
                  className="block w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-905 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Delivery time */}
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase mb-2">Est. Delivery Time (minutes)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                  <Clock className="w-5 h-5" />
                </span>
                <input
                  type="number"
                  name="deliveryTimeInMinutes"
                  min="5"
                  required
                  value={formData.deliveryTimeInMinutes}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-905 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all text-sm font-medium"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
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
              <span>Submit Restaurant</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRestaurant;
