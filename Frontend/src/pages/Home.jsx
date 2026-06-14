import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight, Utensils, ShieldCheck, Zap, Star } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="relative overflow-hidden bg-stone-50 min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            {/* Left Column: Headline */}
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200/40 mb-6 select-none">
                <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                <span>#1 Food Delivery Service in Town</span>
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-tight mb-6">
                Hungry? We deliver{' '}
                <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                  Freshness
                </span>{' '}
                straight to your door.
              </h1>
              <p className="text-base sm:text-lg text-stone-600 mb-8 leading-relaxed">
                Choose from a curated collection of local restaurants offering delicious, high-quality, and freshly made cuisines. Delivered hot and on-time.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                {isAuthenticated ? (
                  <Link
                    to="/restaurants"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-200"
                  >
                    <span>Browse Restaurants</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-stone-900 hover:bg-stone-850 rounded-xl shadow-md transition-all duration-200"
                    >
                      <span>Get Started Now</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-stone-700 bg-white hover:bg-stone-50 rounded-xl border border-stone-200/80 transition-all duration-200"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Visual illustration */}
            <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-amber-100 to-orange-50 shadow-2xl border border-stone-200/45 p-2 group">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800"
                  alt="Delicious food spread"
                  className="w-full h-full object-cover rounded-2xl shadow-inner group-hover:scale-[1.02] transition-all duration-500"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/85 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-550 font-bold uppercase tracking-wider">Popular Choice</span>
                    <h4 className="font-extrabold text-stone-800 text-sm">Gourmet Burger & Herbs</h4>
                  </div>
                  <span className="text-amber-600 font-extrabold text-sm">$12.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature section */}
      <section className="bg-white py-16 sm:py-20 border-t border-stone-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-stone-900">Why choose TastyTrail?</h2>
            <p className="text-stone-600 mt-4 text-base">We prioritize taste, speed, and safety in every single delivery.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-stone-50 rounded-2xl border border-stone-150/40 flex flex-col items-center text-center hover:scale-102 transition-all">
              <div className="bg-amber-100 text-amber-600 p-4 rounded-xl mb-4">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-stone-900 mb-2">Diverse Selection</h3>
              <p className="text-stone-550 text-sm">Hundreds of restaurants ranging from street food gems to fine dining destinations.</p>
            </div>
            <div className="p-6 bg-stone-50 rounded-2xl border border-stone-150/40 flex flex-col items-center text-center hover:scale-102 transition-all">
              <div className="bg-amber-100 text-amber-600 p-4 rounded-xl mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-stone-900 mb-2">Superfast Delivery</h3>
              <p className="text-stone-550 text-sm">An optimized delivery network ensures your food arrives hot, fresh, and on time.</p>
            </div>
            <div className="p-6 bg-stone-50 rounded-2xl border border-stone-150/40 flex flex-col items-center text-center hover:scale-102 transition-all">
              <div className="bg-amber-100 text-amber-600 p-4 rounded-xl mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-stone-900 mb-2">Verified Hygiene</h3>
              <p className="text-stone-550 text-sm">All partner restaurants are strictly audited for food safety and clean preparation.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
