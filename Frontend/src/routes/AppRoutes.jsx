import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Restaurants from '../pages/Restaurants';
import RestaurantDetails from '../pages/RestaurantDetails';
import CreateRestaurant from '../pages/CreateRestaurant';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';
import RoleProtectedRoute from '../components/RoleProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes (Authenticated Customers/Owners/Admins) */}
      <Route
        path="/restaurants"
        element={
          <ProtectedRoute>
            <Restaurants />
          </ProtectedRoute>
        }
      />
      <Route
        path="/restaurants/:id"
        element={
          <ProtectedRoute>
            <RestaurantDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Role Protected Routes (Restricted to Restaurant Owners and Admins) */}
      <Route
        path="/create-restaurant"
        element={
          <RoleProtectedRoute allowedRoles={['restaurantOwner', 'admin']}>
            <CreateRestaurant />
          </RoleProtectedRoute>
        }
      />

      {/* Catch-all 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
