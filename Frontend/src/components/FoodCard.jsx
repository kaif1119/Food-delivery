import { Star, Clock, Edit2, Trash2, ShoppingBag, Minus, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCartItem, removeCartItem } from '../features/cart/cartSlice';

const FoodCard = ({ food, isOwner, onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const {
    _id,
    name,
    image,
    description,
    price,
    category,
    isVeg,
    isAvailable,
    preparationTimeInMinutes,
    rating,
  } = food;

  const cartItem = cart?.items?.find((item) => item.foodId === _id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ foodId: _id, quantity: 1 }));
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    dispatch(updateCartItem({ foodId: _id, quantity: quantityInCart + 1 }));
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (quantityInCart === 1) {
      dispatch(removeCartItem(_id));
    } else {
      dispatch(updateCartItem({ foodId: _id, quantity: quantityInCart - 1 }));
    }
  };

  const defaultImage =
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600';

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden border border-stone-200/60 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full relative group ${
        !isAvailable ? 'opacity-75' : ''
      }`}
    >
      {/* Food Image */}
      <div className="aspect-[4/3] w-full bg-stone-100 overflow-hidden relative border-b border-stone-100">
        <img
          src={image || defaultImage}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />

        {/* Veg/Non-Veg Badge & Category */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border shadow-xs select-none ${
              isVeg
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200/50'
                : 'bg-rose-50 text-rose-700 border-rose-200/50'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isVeg ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
            />
            <span>{isVeg ? 'VEG' : 'NON-VEG'}</span>
          </div>
        </div>

        {/* Status / Availability Badge */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center z-10 select-none">
            <span className="px-4 py-1.5 bg-stone-900/90 text-white rounded-full text-xs font-extrabold tracking-wider border border-stone-700/50">
              OUT OF STOCK
            </span>
          </div>
        )}

        {/* Rating overlay if any */}
        {rating > 0 && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-xs text-xs font-bold text-amber-700 select-none border border-stone-200/40">
            <Star className="w-3 h-3 fill-amber-500 stroke-amber-500" />
            <span>{rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category & Prep Time */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-stone-400">
            {category}
          </span>
          <div className="flex items-center gap-1 text-stone-405 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>{preparationTimeInMinutes || 20}m</span>
          </div>
        </div>

        {/* Name */}
        <h4 className="font-extrabold text-stone-900 text-base mb-1.5 leading-tight group-hover:text-amber-500 transition-colors">
          {name}
        </h4>

        {/* Description */}
        <p className="text-stone-500 text-xs leading-relaxed mb-4 flex-grow line-clamp-2">
          {description || 'No description available for this delicious menu item.'}
        </p>

        {/* Footer Area: Price & Action Buttons */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
          <div>
            <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">
              Price
            </span>
            <span className="text-lg font-black text-stone-900">
              ₹{price}
            </span>
          </div>

          {/* Action buttons depending on role */}
          {isOwner ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(_id);
                }}
                title="Edit item"
                className="p-2 bg-stone-100 hover:bg-amber-100 hover:text-amber-600 text-stone-600 rounded-xl transition-all cursor-pointer border border-transparent hover:border-amber-200/40"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(_id);
                }}
                title="Delete item"
                className="p-2 bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-stone-600 rounded-xl transition-all cursor-pointer border border-transparent hover:border-rose-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : quantityInCart > 0 ? (
            <div className="flex items-center bg-stone-100 rounded-xl border border-stone-200 overflow-hidden">
              <button
                onClick={handleDecrement}
                className="px-3 py-2 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition-all font-black text-sm cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-3 text-stone-850 font-extrabold text-sm select-none">
                {quantityInCart}
              </span>
              <button
                onClick={handleIncrement}
                disabled={quantityInCart >= 20}
                className="px-3 py-2 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition-all font-black text-sm cursor-pointer disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={!isAvailable}
              className={`flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all select-none cursor-pointer disabled:bg-stone-100 disabled:text-stone-400 disabled:shadow-none disabled:cursor-not-allowed`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
