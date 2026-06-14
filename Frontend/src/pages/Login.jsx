import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginUser, clearError } from '../features/auth/authSlice';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import Loader from '../components/Loader';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, error } = useSelector((state) => state.auth);

  // Get destination route from location state
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    // Clear any leftover auth errors on mount
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-stone-550/5 px-4 py-12 sm:px-6 lg:px-8">
      {isLoading && <Loader message="Logging you in..." />}
      
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-stone-200/50">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-sm text-stone-500">
            Sign in to satisfy your cravings today
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 text-rose-600 text-sm animate-fade-in">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase mb-2">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all text-sm font-medium"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase mb-2">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all text-sm font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold shadow-lg shadow-amber-500/20 transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            <LogIn className="w-5 h-5" />
            <span>Sign In</span>
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-stone-550">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-bold text-amber-500 hover:text-amber-600 transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
