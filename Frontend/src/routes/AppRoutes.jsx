import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Restaurants from '../pages/Restaurants';
import RestaurantDetails from '../pages/RestaurantDetails';
import CreateRestaurant from '../pages/CreateRestaurant';
import EditRestaurant from '../pages/EditRestaurant';
import CreateFood from '../pages/CreateFood';
import EditFood from '../pages/EditFood';
import Dashboard from '../pages/Dashboard';
import Cart from '../pages/Cart';
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
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
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
      <Route
        path="/edit-restaurant/:id"
        element={
          <RoleProtectedRoute allowedRoles={['restaurantOwner', 'admin']}>
            <EditRestaurant />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/restaurants/:restaurantId/add-food"
        element={
          <RoleProtectedRoute allowedRoles={['restaurantOwner', 'admin']}>
            <CreateFood />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/edit-food/:id"
        element={
          <RoleProtectedRoute allowedRoles={['restaurantOwner', 'admin']}>
            <EditFood />
          </RoleProtectedRoute>
        }
      />

      {/* Catch-all 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

