import { Navigate, Outlet } from 'react-router-dom';
import Loader from './Loader';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
