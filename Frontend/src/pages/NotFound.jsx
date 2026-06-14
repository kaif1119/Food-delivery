import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-stone-50 px-4">
      <div className="max-w-md w-full text-center py-12 px-6 bg-white rounded-3xl shadow-xl border border-stone-200/50">
        <div className="relative w-40 h-40 mx-auto mb-8">
          <div className="absolute inset-0 bg-amber-100 rounded-full animate-pulse"></div>
          <span className="absolute inset-0 flex items-center justify-center text-7xl select-none">🍕</span>
          <div className="absolute -top-2 -right-2 bg-amber-500 text-white font-extrabold text-2xl w-10 h-10 rounded-full flex items-center justify-center shadow-lg select-none">?</div>
        </div>
        <h1 className="text-6xl font-black text-stone-900 mb-2">404</h1>
        <h2 className="text-xl font-bold text-stone-800 mb-4">Did someone eat this page?</h2>
        <p className="text-stone-500 text-sm mb-8 leading-relaxed">
          The plate is empty! We couldn't find the page you are looking for. It might have been moved, deleted, or never existed in the menu.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition-all shadow-md text-sm cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
          <Link
            to="/restaurants"
            className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold transition-all text-sm cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Browse Food</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
