import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import { Menu, X, LogOut, User, PlusCircle, LayoutDashboard, Utensils } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive(path)
        ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
    }`;

  const mobileLinkClass = (path) =>
    `block px-4 py-2.5 rounded-xl text-base font-semibold transition-all duration-200 ${
      isActive(path)
        ? 'bg-amber-500 text-white'
        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
    }`;

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-stone-200/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-amber-500 text-white p-2 rounded-xl shadow-md shadow-amber-500/25">
              <Utensils className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              TastyTrail
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/" className={linkClass('/')}>
              Home
            </Link>
            {isAuthenticated && (
              <Link to="/restaurants" className={linkClass('/restaurants')}>
                Browse Restaurants
              </Link>
            )}

            {isAuthenticated && (user?.role === 'restaurantOwner' || user?.role === 'admin') && (
              <>
                <Link to="/dashboard" className={linkClass('/dashboard')}>
                  <div className="flex items-center gap-1.5">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </div>
                </Link>
                <Link to="/create-restaurant" className={linkClass('/create-restaurant')}>
                  <div className="flex items-center gap-1.5">
                    <PlusCircle className="w-4 h-4" />
                    <span>Add Restaurant</span>
                  </div>
                </Link>
              </>
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-105 rounded-xl border border-stone-200/50">
                  <User className="w-4 h-4 text-stone-500" />
                  <span className="text-xs font-semibold text-stone-700 select-none">
                    {user?.username} ({user?.role})
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-stone-700 hover:text-stone-900"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-850 rounded-xl shadow-md transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-500 hover:text-stone-700 p-2 rounded-xl hover:bg-stone-100"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 border-t border-stone-100 bg-white">
          <div className="space-y-1">
            <Link to="/" onClick={() => setIsOpen(false)} className={mobileLinkClass('/')}>
              Home
            </Link>
            {isAuthenticated && (
              <Link
                to="/restaurants"
                onClick={() => setIsOpen(false)}
                className={mobileLinkClass('/restaurants')}
              >
                Browse Restaurants
              </Link>
            )}

            {isAuthenticated && (user?.role === 'restaurantOwner' || user?.role === 'admin') && (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className={mobileLinkClass('/dashboard')}
                >
                  Dashboard
                </Link>
                <Link
                  to="/create-restaurant"
                  onClick={() => setIsOpen(false)}
                  className={mobileLinkClass('/create-restaurant')}
                >
                  Add Restaurant
                </Link>
              </>
            )}

            <hr className="border-stone-100 my-3" />

            {isAuthenticated ? (
              <div className="space-y-3 px-4 py-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-stone-600">
                  <User className="w-4 h-4" />
                  <span>
                    Hello, {user?.username} ({user?.role})
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl font-bold transition-all text-sm cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 px-4 py-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center items-center px-4 py-2 text-sm font-semibold text-stone-700 bg-stone-100 rounded-xl"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center items-center px-4 py-2 text-sm font-semibold text-white bg-stone-900 rounded-xl shadow-xs"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
