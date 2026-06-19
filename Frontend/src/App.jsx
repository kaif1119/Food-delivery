import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './features/auth/authSlice';
import { fetchCart } from './features/cart/cartSlice';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import Loader from './components/Loader';

function App() {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  if (isLoading) {
    return <Loader message="Connecting to TastyTrail..." />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900">
      <Navbar />
      <main className="flex-grow">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
