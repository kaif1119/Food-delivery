import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from './Loader';

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Loader message="Checking permissions..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    // If user's role is not authorized, redirect to their main dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
