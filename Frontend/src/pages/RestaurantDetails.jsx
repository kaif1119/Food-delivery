import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchRestaurantById } from '../features/restaurants/restaurantSlice';
import { fetchFoods, deleteFood } from '../features/foods/foodSlice';
import Loader from '../components/Loader';
import FoodCard from '../components/FoodCard';
import { Star, Clock, MapPin, ArrowLeft, Search, Plus, Sparkles } from 'lucide-react';

const RestaurantDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [vegOnly, setVegOnly] = useState(false);

  const { currentRestaurant, isLoading: isRestaurantLoading, error: restaurantError } = useSelector((state) => state.restaurants);
  const { foods, isLoading: isFoodsLoading, error: foodsError } = useSelector((state) => state.foods);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchRestaurantById(id));
    dispatch(fetchFoods());
  }, [dispatch, id]);

  const isLoading = isRestaurantLoading || isFoodsLoading;
  const error = restaurantError || foodsError;

  if (isLoading && !currentRestaurant) {
    return <Loader message="Fetching restaurant menu..." />;
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4 select-none">⚠️</div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Failed to Load Restaurant</h2>
        <p className="text-stone-500 mb-8">{error}</p>
        <Link
          to="/restaurants"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition-all shadow-md text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Restaurants</span>
        </Link>
      </div>
    );
  }

  if (!currentRestaurant) return null;

  const {
    name,
    image,
    description,
    address,
    city,
    rating,
    isOpen,
    deliveryTimeInMinutes,
    cuisine,
  } = currentRestaurant;

  // Filter foods for this restaurant
  const restaurantFoods = foods.filter((food) => {
    const rId = typeof food.restaurantId === 'object' ? food.restaurantId?._id : food.restaurantId;
    return rId === id;
  });

  // Calculate dynamic categories based on foods of this restaurant
  const categories = ['All', ...new Set(restaurantFoods.map((food) => food.category))];

  // Filter foods based on search and category
  const filteredFoods = restaurantFoods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
    const matchesVeg = !vegOnly || food.isVeg;
    return matchesSearch && matchesCategory && matchesVeg;
  });

  const owner = currentRestaurant?.ownerId;
  const ownerIdStr = typeof owner === 'object' ? owner?._id : owner;
  const isOwner = ownerIdStr === user?.id || user?.role === 'admin';

  const handleEditFood = (foodId) => {
    navigate(`/edit-food/${foodId}`);
  };

  const handleDeleteFood = (foodId) => {
    if (window.confirm("Are you sure you want to delete this food item? This action is permanent.")) {
      dispatch(deleteFood(foodId));
    }
  };

  const defaultImage =
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/restaurants"
          className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-850 font-semibold text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Restaurants</span>
        </Link>
      </div>

      {/* Main Banner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Banner Image */}
        <div className="lg:col-span-7 aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-lg bg-stone-100 relative border border-stone-200/50">
          <img
            src={image || defaultImage}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 right-6 flex gap-2">
            <span
              className={`px-4 py-1.5 text-xs font-bold rounded-full shadow-md text-white select-none ${
                isOpen ? 'bg-emerald-500' : 'bg-stone-500'
              }`}
            >
              {isOpen ? 'Open Now' : 'Closed'}
            </span>
          </div>
        </div>

        {/* Restaurant Info Panel */}
        <div className="lg:col-span-5 flex flex-col justify-center bg-white rounded-3xl p-8 shadow-xs border border-stone-200/60">
          {/* Cuisines */}
          <div className="flex flex-wrap gap-2 mb-4">
            {cuisine && cuisine.length > 0 ? (
              cuisine.map((item, idx) => (
                <span
                  key={idx}
                  className="text-xs font-bold px-3 py-1 bg-amber-100/60 text-amber-800 rounded-full"
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="text-xs text-stone-400 italic">Various Cuisines</span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-4 leading-tight">
            {name}
          </h1>

          <p className="text-stone-600 text-sm leading-relaxed mb-6">
            {description || 'Welcome to TastyTrail! Discover gourmet dishes prepared by professional chefs and delivered right to your table.'}
          </p>

          <hr className="border-stone-100 mb-6" />

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100">
              <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-1 font-bold">Rating</span>
              <div className="flex items-center justify-center gap-1 text-amber-600 font-bold text-base">
                <Star className="w-4 h-4 fill-amber-500 stroke-amber-500" />
                <span>{rating > 0 ? rating.toFixed(1) : 'New'}</span>
              </div>
            </div>
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100">
              <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-1 font-bold">Delivery</span>
              <div className="flex items-center justify-center gap-1 text-stone-700 font-bold text-base">
                <Clock className="w-4 h-4 text-stone-500" />
                <span>{deliveryTimeInMinutes || 30}m</span>
              </div>
            </div>
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100">
              <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-1 font-bold">Status</span>
              <span className={`inline-block font-extrabold text-sm ${isOpen ? 'text-emerald-600' : 'text-stone-500'}`}>
                {isOpen ? 'Open' : 'Closed'}
              </span>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-2 text-stone-500 text-xs font-medium bg-stone-550/5 p-4 rounded-2xl border border-stone-200/30">
            <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-stone-850">{address}</p>
              <p className="capitalize text-stone-500 mt-0.5">{city}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu / Items Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/60 shadow-xs mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
              <span>Our Menu</span>
              <Sparkles className="w-5 h-5 text-amber-500" />
            </h2>
            <p className="text-stone-500 text-xs mt-1">
              Explore culinary specialties curated specifically by our chefs
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Veg Only Toggle */}
            <label className="flex items-center gap-2 cursor-pointer bg-stone-50 border border-stone-200 hover:bg-stone-100 px-4 py-2 rounded-xl text-xs font-bold text-stone-700 transition-all select-none">
              <input
                type="checkbox"
                checked={vegOnly}
                onChange={(e) => setVegOnly(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded-md cursor-pointer"
              />
              <span>Veg Only</span>
            </label>

            {/* Add Food Item Button for Owner */}
            {isOwner && (
              <Link
                to={`/restaurants/${id}/add-food`}
                className="flex items-center gap-1 px-4 py-2 bg-stone-900 hover:bg-stone-850 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Food Item</span>
              </Link>
            )}
          </div>
        </div>

        {/* Search & Category Filter Header */}
        <div className="space-y-6 mb-8">
          {/* Search bar */}
          <div className="relative max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-905 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all text-xs font-medium"
            />
          </div>

          {/* Dynamic Categories */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/20 border border-transparent'
                      : 'bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Menu Grid */}
        {filteredFoods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFoods.map((food) => (
              <FoodCard
                key={food._id}
                food={food}
                isOwner={isOwner}
                onEdit={handleEditFood}
                onDelete={handleDeleteFood}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-stone-50/50 rounded-2xl border border-dashed border-stone-200 p-6 shadow-xs max-w-lg mx-auto">
            <div className="text-4xl mb-3 select-none">🥘</div>
            <h4 className="font-bold text-stone-850 text-base mb-1">No Dishes Found</h4>
            <p className="text-stone-500 text-xs max-w-xs mx-auto">
              We couldn't find any dishes matching your filters. Try adjusting your search term or category selection.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default RestaurantDetails;
