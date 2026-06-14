import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin } from 'lucide-react';

const RestaurantCard = ({ restaurant }) => {
  const {
    _id,
    name,
    image,
    description,
    address,
    city,
    rating,
    isOpen,
    deliveryTimeInMinutes,
    cuisine,
  } = restaurant;

  // Premium fallback image of restaurant setting
  const defaultImage =
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600';

  return (
    <Link
      to={`/restaurants/${_id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-stone-200/60 transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
        <img
          src={image || defaultImage}
          alt={name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full shadow-md ${
              isOpen
                ? 'bg-emerald-500 text-white'
                : 'bg-stone-500 text-white'
            }`}
          >
            {isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-stone-850 group-hover:text-amber-500 transition-colors line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-amber-600 font-semibold text-xs shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
            <span>{rating > 0 ? rating.toFixed(1) : 'New'}</span>
          </div>
        </div>

        {/* Cuisines */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {cuisine && cuisine.length > 0 ? (
            cuisine.slice(0, 3).map((item, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2 py-0.5 bg-stone-100 text-stone-600 rounded-md border border-stone-200/40"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="text-[11px] text-stone-400 italic">Various Cuisines</span>
          )}
        </div>

        {/* Description */}
        <p className="text-stone-500 text-xs line-clamp-2 mb-4 flex-grow">
          {description || 'No description available for this restaurant.'}
        </p>

        <hr className="border-stone-100 mb-4" />

        {/* Footer info */}
        <div className="flex items-center justify-between text-stone-550 text-xs font-medium mt-auto">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>{deliveryTimeInMinutes || 30} mins</span>
          </div>
          <div className="flex items-center gap-1 max-w-[60%]">
            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="truncate capitalize">{city}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
