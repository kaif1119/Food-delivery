import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRestaurants } from '../features/restaurants/restaurantSlice';
import RestaurantCard from '../components/RestaurantCard';
import Loader from '../components/Loader';
import { User, Mail, Shield, Plus, Building2, Star, ShoppingBag } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { restaurants, isLoading } = useSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  // Filter restaurants owned by this user
  const myRestaurants = restaurants.filter((r) => {
    const owner = r.ownerId;
    const ownerIdStr = typeof owner === 'object' ? owner?._id : owner;
    return ownerIdStr === user?.id;
  });

  const isOwner = user?.role === 'restaurantOwner' || user?.role === 'admin';

  if (isLoading && restaurants.length === 0) {
    return <Loader message="Loading dashboard stats..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-8 sm:p-10 text-white mb-10 shadow-xl shadow-amber-500/10">
        <div className="max-w-2xl">
          <span className="text-xs uppercase font-extrabold tracking-widest bg-white/20 px-3 py-1 rounded-full text-amber-50 select-none">
            Member Area
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-4 mb-2">
            Hello, {user?.username || 'Foodie'}!
          </h1>
          <p className="text-amber-100 text-sm sm:text-base">
            Welcome to your TastyTrail command center. Track your status, manage your shops, and browse menus.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: User Profile Details Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/60 h-fit">
          <h3 className="font-extrabold text-stone-900 text-lg mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-amber-500" />
            <span>Profile Details</span>
          </h3>

          <div className="space-y-5">
            <div>
              <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-1 font-bold">
                Full Name
              </span>
              <p className="text-stone-850 font-semibold text-sm">{user?.username}</p>
            </div>
            <div>
              <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-1 font-bold">
                Email Address
              </span>
              <div className="flex items-center gap-2 text-stone-850 font-semibold text-sm">
                <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="truncate">{user?.email}</span>
              </div>
            </div>
            <div>
              <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-1 font-bold">
                Account Role
              </span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-stone-705 border border-stone-200/40 rounded-xl font-bold text-xs capitalize mt-1 select-none">
                <Shield className="w-3.5 h-3.5 text-stone-405" />
                <span>{user?.role}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Role-based Dashboard Views */}
        <div className="lg:col-span-8 space-y-8">
          {isOwner ? (
            /* Restaurant Owner Panel */
            <div>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-6 rounded-3xl border border-stone-200/60 shadow-xs flex items-center gap-4">
                  <div className="bg-amber-100 text-amber-600 p-3.5 rounded-2xl">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-stone-400 text-xs font-bold uppercase tracking-wider">Total Restaurants</span>
                    <span className="text-2xl font-black text-stone-850">{myRestaurants.length}</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-stone-200/60 shadow-xs flex items-center gap-4">
                  <div className="bg-emerald-100 text-emerald-600 p-3.5 rounded-2xl">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-stone-400 text-xs font-bold uppercase tracking-wider">Avg. Shop Rating</span>
                    <span className="text-2xl font-black text-stone-850">
                      {myRestaurants.length > 0
                        ? (
                            myRestaurants.reduce((sum, r) => sum + (r.rating || 0), 0) /
                            myRestaurants.length
                          ).toFixed(1)
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* My Shops Title & Action */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-extrabold text-stone-900 text-xl">My Managed Restaurants</h3>
                <Link
                  to="/create-restaurant"
                  className="flex items-center gap-1 px-4 py-2 bg-stone-900 hover:bg-stone-850 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New</span>
                </Link>
              </div>

              {/* Restaurant List */}
              {myRestaurants.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {myRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-stone-200 p-6 shadow-xs">
                  <div className="text-4xl mb-3 select-none">🏬</div>
                  <h4 className="font-bold text-stone-800 text-base mb-1">No Shops Registered</h4>
                  <p className="text-stone-500 text-xs max-w-xs mx-auto mb-6">
                    You haven't added any restaurants yet. Register your kitchen and start accepting orders!
                  </p>
                  <Link
                    to="/create-restaurant"
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition-all text-sm cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Register Restaurant</span>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            /* Normal User Panel */
            <div className="space-y-6">
              {/* Promo Banner */}
              <div className="bg-amber-50 rounded-3xl p-6 sm:p-8 border border-amber-200/40 shadow-xs flex flex-col sm:flex-row items-center gap-6">
                <div className="text-5xl select-none">🎁</div>
                <div className="text-center sm:text-left flex-grow">
                  <h3 className="font-extrabold text-amber-900 text-lg mb-1">Free Delivery on First 3 Orders</h3>
                  <p className="text-amber-705 text-xs font-semibold leading-relaxed">
                    Order from any verified restaurant on TastyTrail and pay zero delivery fees! Applied automatically at checkout.
                  </p>
                </div>
                <Link
                  to="/restaurants"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition-all text-xs cursor-pointer shadow-md shrink-0"
                >
                  Browse Now
                </Link>
              </div>

              {/* Mock Orders List */}
              <div>
                <h3 className="font-extrabold text-stone-900 text-xl mb-4">Recent Orders</h3>
                <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-stone-200 p-6 shadow-xs">
                  <div className="text-4xl mb-3 select-none">🛍️</div>
                  <h4 className="font-bold text-stone-850 text-base mb-1">Your Plate is Empty</h4>
                  <p className="text-stone-500 text-xs max-w-xs mx-auto mb-6">
                    You haven't placed any food orders yet. Explore our restaurant list to find delicious meals.
                  </p>
                  <Link
                    to="/restaurants"
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-stone-900 hover:bg-stone-850 text-white rounded-xl font-bold transition-all text-sm cursor-pointer shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order Food</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
