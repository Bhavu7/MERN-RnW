import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import CustomSelect from '../components/CustomSelect';

const AuthPage = ({ type }) => {
  const isRegister = type === 'register';
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        await register(form);
        toast.success('Registration successful');
      } else {
        await login({ email: form.email, password: form.password });
        toast.success('Welcome back');
      }

      navigate(location.state?.from || '/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 py-12 overflow-hidden auth-shell">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass relative w-full max-w-md rounded-[2rem] p-8"
      >
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-brand-300 font-bold">Workly</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">
            {isRegister ? 'Create account' : 'Sign in'}
          </h1>
          {/* <p className="mt-2 text-sm text-slate-400">
            JWT cookie auth, role-based access, multiuser task workspace.
          </p> */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block mb-2 text-sm text-slate-300">Username</label>
                <input
                  name="username"
                  className="input"
                  placeholder="Enter username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <CustomSelect
                label="Role"
                value={form.role}
                onChange={handleChange}
                placeholder="Select role"
                options={[
                  { name: 'role', value: 'user', label: 'User' },
                  { name: 'role', value: 'admin', label: 'Admin' },
                ]}
              />
            </>
          )}

          <div>
            <label className="block mb-2 text-sm text-slate-300">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-slate-300">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary">
            {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-slate-400">
          {isRegister ? 'Already have an account?' : 'New here?'}{' '}
          <Link
            to={isRegister ? '/login' : '/register'}
            className="font-medium text-brand-300 hover:text-brand-200"
          >
            {isRegister ? 'Login' : 'Register'}
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;