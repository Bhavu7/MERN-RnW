import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        formData,
        { withCredentials: true }
      );

      const accessToken = response.data?.data?.accessToken;
      const user = response.data?.data?.user;

      if (!accessToken) {
        throw new Error('Access token not received');
      }

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success(response.data?.message || 'Registration successful');
      navigate('/dashboard');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Registration failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen px-4 place-items-center">
      <section className="w-full max-w-md p-8 border rounded-3xl border-white/10 bg-white/5 shadow-panel backdrop-blur-xl">
        <h1 className="text-3xl font-semibold">Create account</h1>
        <p className="mt-2 text-slate-300">
          Register to access protected routes and manage inventory.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-2xl border-white/10 bg-slate-900/70"
            placeholder="Name"
            required
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-2xl border-white/10 bg-slate-900/70"
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-2xl border-white/10 bg-slate-900/70"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 font-medium transition rounded-2xl bg-brand-500 text-slate-950 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          Already have an account?{' '}
          <Link className="text-brand-500" to="/login">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
};