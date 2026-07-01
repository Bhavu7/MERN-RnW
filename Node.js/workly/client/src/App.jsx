import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import CategoriesPage from './pages/CategoriesPage';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage type="login" />} />
      <Route path="/register" element={<AuthPage type="register" />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage scope="mine" />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route element={<AppLayout />}>
          <Route path="/all-tasks" element={<DashboardPage scope="all" />} />
          <Route path="/categories" element={<CategoriesPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
