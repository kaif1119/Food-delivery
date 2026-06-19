import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from '../features/cart/cartSlice';
import Loader from '../components/Loader';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ChevronRight,
  Info,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react';

const Cart = () => {
  const dispatch = useDispatch();

  const { cart, isLoading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrement = (foodId, currentQty) => {
    if (currentQty >= 20) return;
    dispatch(updateCartItem({ foodId, quantity: currentQty + 1 }));
  };

  const handleDecrement = (foodId, currentQty) => {
    if (currentQty === 1) {
      dispatch(removeCartItem(foodId));
    } else {
      dispatch(updateCartItem({ foodId, quantity: currentQty - 1 }));
    }
  };

  const handleRemove = (foodId) => {
    dispatch(removeCartItem(foodId));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    // Placeholder checkout flow
    alert('Thank you for your order! Checkout feature (Step 5) is coming next.');
  };

  if (isLoading && (!cart || !cart.items)) {
    return <Loader message="Fetching your delicious items..." />;
  }

  const items = cart?.items || [];
  const subtotal = cart?.totalAmount || 0;

  // Premium pricing calculations
  const deliveryCharge = subtotal > 499 ? 0 : subtotal > 0 ? 40 : 0;
  const gstAndRestaurantCharges = subtotal > 0 ? Math.round(subtotal * 0.05) : 0;
  const platformFee = subtotal > 0 ? 5 : 0;
  const totalAmount = subtotal + deliveryCharge + gstAndRestaurantCharges + platformFee;

  const defaultImage =
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Header / Breadcrumb */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <Link
            to="/restaurants"
            className="inline-flex items-center gap-1 text-sm font-semibold text-stone-500 hover:text-stone-850 transition-all mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight flex items-center gap-2">
            <span>My Cart</span>
            <span className="text-lg font-bold px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full">
              {items.length} {items.length === 1 ? 'Item' : 'Items'}
            </span>
          </h1>
        </div>

        {items.length > 0 && (
          <button
            onClick={handleClearCart}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-100 transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-700 text-sm font-semibold rounded-2xl flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {items.length === 0 ? (
        /* Empty Cart State */
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200/60 shadow-xs max-w-xl mx-auto p-8 animate-slide-up">
          <div className="bg-amber-50 text-amber-500 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-md shadow-amber-500/10">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-stone-900 mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-stone-550 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
            Looks like you haven't added anything to your cart yet. Good food is always cooking! Go ahead, order some yummy items.
          </p>
          <Link
            to="/restaurants"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-2xl font-bold shadow-lg shadow-amber-500/20 transition-all text-sm cursor-pointer"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Explore Restaurants</span>
          </Link>
        </div>
      ) : (
        /* Cart Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.foodId}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/60 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-4 group"
              >
                {/* Left: Image & Title */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <div className="w-24 h-24 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/50 shrink-0">
                    <img
                      src={item.image || defaultImage}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      onError={(e) => {
                        e.target.src = defaultImage;
                      }}
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-extrabold text-stone-900 text-base leading-tight mb-1 group-hover:text-amber-500 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-stone-400 text-xs font-semibold">
                      ₹{item.price} each
                    </p>
                  </div>
                </div>

                {/* Right: Quantity Controls & Delete */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
                  {/* Quantity Increment/Decrement */}
                  <div className="flex items-center bg-stone-100 rounded-xl border border-stone-200 overflow-hidden">
                    <button
                      onClick={() => handleDecrement(item.foodId, item.quantity)}
                      className="px-3 py-2 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition-all cursor-pointer font-black text-sm"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-stone-850 font-extrabold text-sm select-none min-w-[20px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrement(item.foodId, item.quantity)}
                      disabled={item.quantity >= 20}
                      className="px-3 py-2 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition-all cursor-pointer font-black text-sm disabled:opacity-50"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Total price & delete button */}
                  <div className="flex items-center gap-4">
                    <span className="text-base font-extrabold text-stone-900 w-20 text-right">
                      ₹{item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => handleRemove(item.foodId)}
                      title="Remove item"
                      className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Order Summary Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-stone-200/60 shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-1.5">
              <span>Order Summary</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </h3>

            {/* Pricing details */}
            <div className="space-y-3.5 text-sm font-semibold text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-stone-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <span>Delivery Charges</span>
                  {deliveryCharge === 0 && subtotal > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                      FREE
                    </span>
                  )}
                </span>
                <span className={deliveryCharge === 0 ? 'text-emerald-600' : 'text-stone-900'}>
                  {deliveryCharge === 0 ? '₹0' : `₹${deliveryCharge}`}
                </span>
              </div>
              {subtotal <= 499 && (
                <p className="text-[10px] text-amber-600 font-bold bg-amber-50 p-2 rounded-xl border border-amber-100">
                  Tip: Add ₹{500 - subtotal} more for FREE delivery!
                </p>
              )}
              <div className="flex justify-between">
                <span>GST & Restaurant Charges</span>
                <span className="text-stone-900">₹{gstAndRestaurantCharges}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span className="text-stone-900">₹{platformFee}</span>
              </div>
            </div>

            <hr className="border-stone-100" />

            {/* Total Amount */}
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs text-stone-400 font-bold block uppercase tracking-wider">
                  To Pay
                </span>
                <span className="text-2xl font-black text-stone-900 tracking-tight">
                  ₹{totalAmount}
                </span>
              </div>
              <span className="text-xs text-emerald-600 font-bold">
                Inclusive of all taxes
              </span>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-2xl font-bold shadow-lg shadow-amber-500/20 transition-all text-base cursor-pointer group"
            >
              <span>Place Order</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
