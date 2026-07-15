import axios from 'axios';
import { LoaderCircle, LockKeyhole, Mail } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000';

export const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        {
          email: formData.email.trim(),
          password: formData.password
        },
        {
          withCredentials: true
        }
      );

      const accessToken = response.data?.data?.accessToken;
      const user = response.data?.data?.user;

      if (!accessToken) {
        throw new Error('Access token not found in login response');
      }

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user || {}));

      toast.success('Login successful');
      navigate('/dashboard');
    } catch (error) {
      const backendErrors = error.response?.data?.errors;

      if (Array.isArray(backendErrors) && backendErrors.length > 0) {
        toast.error(backendErrors[0].message);
      } else {
        toast.error(error.response?.data?.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen px-4 place-items-center">
      <section className="w-full max-w-md p-8 border rounded-3xl border-white/10 bg-white/5 shadow-panel backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-500">
          Secure access
        </p>

        <h1 className="mt-3 text-3xl font-semibold text-white">Welcome back</h1>

        <p className="mt-2 text-slate-300">
          Connect your admin workspace and manage products securely.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="relative">
            <Mail className="absolute w-4 h-4 -translate-y-1/2 pointer-events-none left-4 top-1/2 text-slate-500" />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-3 pr-4 text-white border outline-none rounded-2xl border-white/10 bg-slate-900/70 pl-11 placeholder:text-slate-500"
              placeholder="Email"
              required
            />
          </div>

          <div className="relative">
            <LockKeyhole className="absolute w-4 h-4 -translate-y-1/2 pointer-events-none left-4 top-1/2 text-slate-500" />
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full py-3 pr-4 text-white border outline-none rounded-2xl border-white/10 bg-slate-900/70 pl-11 placeholder:text-slate-500"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 font-medium transition rounded-2xl bg-brand-500 text-slate-950 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          Need an account?{' '}
          <Link className="text-brand-500" to="/register">
            Create one
          </Link>
        </p>
      </section>
    </main>
  );
};