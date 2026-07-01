import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRightOnRectangleIcon,
  ClipboardDocumentListIcon,
  FolderPlusIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from './ConfirmModal';
import { useState } from 'react';
import logo from '../assets/logo.png';

const navItemClass = ({ isActive }) =>
  `rounded-2xl px-4 py-2 text-sm font-medium transition ${isActive
    ? 'bg-brand-500 text-white shadow-glow'
    : 'text-slate-300 hover:bg-white/5 hover:text-white'
  }`;

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Signed out successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Logout failed');
    } finally {
      setConfirmLogout(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between gap-4 px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Workly logo"
              className="object-contain w-auto h-16"
            />
          </Link>

          <nav className="items-center hidden gap-2 md:flex">
            <NavLink to="/dashboard" className={navItemClass}>
              <span className="inline-flex items-center gap-2">
                <ClipboardDocumentListIcon className="w-4 h-4" />
                My Tasks
              </span>
            </NavLink>

            {user.role === 'admin' && (
              <>
                <NavLink to="/all-tasks" className={navItemClass}>
                  <span className="inline-flex items-center gap-2">
                    <Squares2X2Icon className="w-4 h-4" />
                    All User Tasks
                  </span>
                </NavLink>
                <NavLink to="/categories" className={navItemClass}>
                  <span className="inline-flex items-center gap-2">
                    <FolderPlusIcon className="w-4 h-4" />
                    Categories
                  </span>
                </NavLink>
              </>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden px-4 py-2 border rounded-2xl border-white/10 bg-white/5 md:block">
              <p className="text-sm font-semibold text-white">{user.username}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-brand-300">{user.role}</p>
            </div>

            <button onClick={() => setConfirmLogout(true)} className="btn-secondary">
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </motion.header>

      <ConfirmModal
        open={confirmLogout}
        title="Sign out now?"
        message="Your current session will be cleared from the browser cookie."
        confirmText="Yes, sign out"
        onConfirm={handleLogout}
        onClose={() => setConfirmLogout(false)}
      />
    </>
  );
};

export default Navbar;