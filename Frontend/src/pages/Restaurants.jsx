import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../features/restaurants/restaurantSlice';
import RestaurantCard from '../components/RestaurantCard';
import Loader from '../components/Loader';
import { Search, MapPin, Info, RefreshCw } from 'lucide-react';

const Restaurants = () => {
  const dispatch = useDispatch();
  const { restaurants, isLoading, error } = useSelector((state) => state.restaurants);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  // Extract unique cities for filtering dropdown
  const cities = [...new Set(restaurants.map((r) => r.city?.toLowerCase()))].filter(Boolean);

  // Filter restaurants on client side
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine?.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCity = selectedCity ? restaurant.city?.toLowerCase() === selectedCity : true;
    return matchesSearch && matchesCity;
  });

  const handleRefresh = () => {
    dispatch(fetchRestaurants());
  };

  if (isLoading && restaurants.length === 0) {
    return <Loader message="Finding nearby restaurants..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
            Browse Restaurants
          </h1>
          <p className="text-stone-500 text-sm">
            Discover the best food & drinks in your city
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="self-start md:self-auto flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-stone-600 bg-white hover:bg-stone-50 border border-stone-200/80 rounded-xl transition-all shadow-xs cursor-pointer animate-fade-in"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-8 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 text-rose-600 text-sm animate-fade-in">
          <Info className="w-5 h-5 shrink-0 animate-pulse" />
          <div>
            <span className="font-bold">Error loading restaurants:</span> {error}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-stone-200/60 mb-10">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search by restaurant name or cuisine (e.g. Pizza, Burger)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all text-sm font-medium"
            />
          </div>

          {/* Filters dropdown */}
          <div className="flex gap-2 shrink-0">
            <div className="relative flex-grow md:flex-initial">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400 pointer-events-none">
                <MapPin className="w-4 h-4" />
              </span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="block w-full md:w-48 pl-10 pr-8 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all text-sm font-medium appearance-none cursor-pointer capitalize"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-stone-400 text-[10px]">
                ▼
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid listing */}
      {filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-250 p-8 shadow-xs">
          <div className="text-5xl mb-4 select-none">🔍</div>
          <h3 className="font-extrabold text-stone-850 text-lg mb-1">
            No Restaurants Found
          </h3>
          <p className="text-stone-500 text-sm max-w-sm mx-auto mb-6">
            We couldn't find any restaurants matching your search filters. Try clearing some filters or searching for something else.
          </p>
          {(searchTerm || selectedCity) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCity('');
              }}
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-850 text-white rounded-xl font-bold transition-all text-sm cursor-pointer shadow-md"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Restaurants;
