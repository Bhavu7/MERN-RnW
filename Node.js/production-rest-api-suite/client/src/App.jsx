import { AnimatePresence, motion } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RegisterPage } from './pages/RegisterPage';

const PageShell = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            <PageShell>
              <LoginPage />
            </PageShell>
          }
        />
        <Route
          path="/register"
          element={
            <PageShell>
              <RegisterPage />
            </PageShell>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PageShell>
                <DashboardPage />
              </PageShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <PageShell>
              <NotFoundPage />
            </PageShell>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}