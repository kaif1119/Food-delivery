import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchRestaurantById } from '../features/restaurants/restaurantSlice';
import Loader from '../components/Loader';
import { Star, Clock, MapPin, ArrowLeft, Calendar } from 'lucide-react';

const RestaurantDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentRestaurant, isLoading, error } = useSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(fetchRestaurantById(id));
  }, [dispatch, id]);

  if (isLoading) {
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
              <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-1">Rating</span>
              <div className="flex items-center justify-center gap-1 text-amber-600 font-bold text-base">
                <Star className="w-4 h-4 fill-amber-500 stroke-amber-500" />
                <span>{rating > 0 ? rating.toFixed(1) : 'New'}</span>
              </div>
            </div>
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100">
              <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-1">Delivery</span>
              <div className="flex items-center justify-center gap-1 text-stone-700 font-bold text-base">
                <Clock className="w-4 h-4 text-stone-500" />
                <span>{deliveryTimeInMinutes || 30}m</span>
              </div>
            </div>
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100">
              <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-1">Status</span>
              <span className={`inline-block font-extrabold text-sm ${isOpen ? 'text-emerald-600' : 'text-stone-500'}`}>
                {isOpen ? 'Open' : 'Closed'}
              </span>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-2 text-stone-500 text-xs font-medium bg-stone-550/5 p-4 rounded-2xl border border-stone-200/30">
            <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-stone-800">{address}</p>
              <p className="capitalize text-stone-500 mt-0.5">{city}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu / Items Section (Mocked for now) */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/60 shadow-xs">
        <div className="max-w-3xl mx-auto text-center py-10">
          <div className="text-5xl mb-4 select-none">🥘</div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Our Culinary Menu</h2>
          <p className="text-stone-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            We are currently updating our digital catalog with live ordering, online payment, and real-time tracking features.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 border border-amber-200/40 rounded-full font-bold text-xs select-none">
            <Calendar className="w-4 h-4 animate-bounce" />
            <span>Ordering module launching soon!</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
