import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Package,
  Pencil,
  Plus,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserCircle2,
  X
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000';

const initialFormState = {
  title: '',
  price: '',
  description: '',
  category: '',
  image: ''
};

const cards = [
  { title: 'Protected API', value: 'JWT + RBAC', icon: ShieldCheck },
  { title: 'External Source', value: 'Fake Store API', icon: Sparkles },
  { title: 'Product Module', value: 'Full CRUD Flow', icon: Package }
];

export const DashboardPage = () => {
  const token = localStorage.getItem('accessToken') || '';

  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  const user = useMemo(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }, []);

  const authHeaders = {
    Authorization: `Bearer ${token}`
  };

  const fetchItems = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_BASE_URL}/api/items`, {
        params: { search },
        headers: authHeaders
      });

      setItems(response.data?.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem('accessToken');

    if (!savedToken) {
      toast.error('Please login again');
      navigate('/login');
    }
  }, [navigate]);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    await fetchItems();
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      price: item.price || '',
      description: item.description || '',
      category: item.category || '',
      image: item.image || ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData(initialFormState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);

      const payload = {
        title: formData.title.trim(),
        price: Number(formData.price),
        description: formData.description.trim(),
        category: formData.category.trim(),
        image: formData.image.trim()
      };

      if (editingItem) {
        await axios.put(
          `${API_BASE_URL}/api/items/${editingItem.id || editingItem._id}`,
          payload,
          {
            headers: authHeaders
          }
        );
        toast.success('Product updated successfully');
      } else {
        await axios.post(`${API_BASE_URL}/api/items`, payload, {
          headers: authHeaders
        });
        toast.success('Product created successfully');
      }

      closeModal();
      await fetchItems();
    } catch (error) {
      const backendErrors = error.response?.data?.errors;

      if (Array.isArray(backendErrors) && backendErrors.length > 0) {
        toast.error(backendErrors[0].message);
      } else {
        toast.error(error.response?.data?.message || 'Failed to save product');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);

      await axios.delete(`${API_BASE_URL}/api/items/${id}`, {
        headers: authHeaders
      });

      toast.success('Product deleted successfully');
      await fetchItems();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete product');
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await axios.post(
        `${API_BASE_URL}/api/auth/logout`,
        {},
        {
          headers: authHeaders,
          withCredentials: true
        }
      );

      toast.success('Logout successful');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Session cleared locally');
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      setLoggingOut(false);
      navigate('/login');
    }
  };

  return (
    <main className="min-h-screen px-4 py-6 lg:px-10">
      <div className="mx-auto space-y-6 max-w-7xl">
        <nav className="sticky top-4 z-50 rounded-[28px] border border-white/10 bg-slate-950/70 px-5 py-4 shadow-panel backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-500/15 text-brand-500">
                <LayoutDashboard className="w-6 h-6" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-brand-500">
                  Production suite
                </p>
                <h1 className="text-lg font-semibold text-white">
                  REST API Product Dashboard
                </h1>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3 px-4 py-3 border rounded-2xl border-white/10 bg-white/5">
                <UserCircle2 className="w-5 h-5 text-brand-500" />
                <div>
                  <p className="text-sm font-medium text-white">
                    {user?.name || 'Authenticated User'}
                  </p>
                  <p className="text-xs text-slate-400">
                    {user?.email || 'No email found'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 font-medium text-red-300 transition border rounded-2xl border-red-500/20 bg-red-500/10 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <LogOut className="w-4 h-4" />
                {loggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </nav>

        <header className="flex flex-col gap-4 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-500">
              Fake Store API CRUD
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-white">
              Manage products from your backend
            </h2>
            <p className="max-w-2xl mt-3 text-slate-300">
              Create, view, update, search, and delete products using your
              Express API as a secure middle layer in front of Fake Store API.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={fetchItems}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 font-medium text-white transition border rounded-2xl border-white/10 bg-white/5 hover:bg-white/10"
            >
              <RefreshCcw className="w-4 h-4" />
              Refresh
            </button>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 font-medium transition rounded-2xl bg-brand-500 text-slate-950 hover:bg-brand-600"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[28px] border border-white/10 bg-slate-900/50 p-6 shadow-panel"
              >
                <Icon className="w-10 h-10 text-brand-500" />
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-slate-300">{card.value}</p>
              </motion.article>
            );
          })}
        </section>

        <section className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/60 shadow-panel">
          <div className="flex flex-col gap-4 p-6 border-b border-white/10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-white">
                Product inventory
              </h3>
              <p className="mt-1 text-slate-400">
                Search and manage products from the connected API source.
              </p>
            </div>

            <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search className="absolute w-4 h-4 -translate-y-1/2 pointer-events-none left-4 top-1/2 text-slate-500" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-full py-3 pr-4 text-white border outline-none rounded-2xl border-white/10 bg-slate-950/70 pl-11 placeholder:text-slate-500 sm:w-80"
                  placeholder="Search title, category, description"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-3 font-medium text-white transition border rounded-2xl border-white/10 bg-white/5 hover:bg-white/10"
              >
                Search
              </button>
            </form>
          </div>

          {loading ? (
            <div className="flex h-[500px] items-center justify-center gap-3 p-10 text-slate-300">
              <LoaderCircle className="w-5 h-5 animate-spin" />
              Loading products...
            </div>
          ) : items.length === 0 ? (
            <div className="flex h-[500px] items-center justify-center p-10 text-center">
              <div>
                <p className="text-lg font-medium text-white">No products found</p>
                <p className="mt-2 text-slate-400">
                  Try a different search or create a new product.
                </p>
              </div>
            </div>
          ) : (
            <div className="max-h-[500px] overflow-auto no-scrollbar">
              <table className="min-w-full text-sm text-left">
                <thead className="sticky top-0 z-10 bg-slate-900 text-slate-300">
                  <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => {
                    const itemId = item.id || item._id;

                    return (
                      <tr key={itemId} className="align-top border-t border-white/5">
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-4">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="object-contain p-2 h-14 w-14 rounded-2xl bg-white/5"
                            />
                            <div>
                              <p className="max-w-xs font-medium text-slate-100">
                                {item.title}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                ID: {itemId}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-slate-300">{item.category}</td>
                        <td className="px-6 py-4 font-medium text-slate-100">
                          ${Number(item.price).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-slate-400">
                          <p className="max-w-md">{item.description}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => openEditModal(item)}
                              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium transition border rounded-xl border-amber-500/20 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
                            >
                              <Pencil className="w-4 h-4" />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(itemId)}
                              disabled={deletingId === itemId}
                              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-300 transition border rounded-xl border-red-500/20 bg-red-500/10 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              <Trash2 className="w-4 h-4" />
                              {deletingId === itemId ? 'Deleting...' : 'Delete'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl rounded-[28px] border border-white/10 bg-slate-900 p-6 shadow-panel"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-500">
                    {editingItem ? 'Update product' : 'Create product'}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    {editingItem ? 'Edit product details' : 'Add a new product'}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="p-2 transition border rounded-xl border-white/10 text-slate-300 hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="mt-6 space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-200">
                    Title
                  </label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-white border outline-none rounded-2xl border-white/10 bg-slate-950/70"
                    placeholder="Product title"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-200">
                      Price
                    </label>
                    <input
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-white border outline-none rounded-2xl border-white/10 bg-slate-950/70"
                      placeholder="99.99"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-200">
                      Category
                    </label>
                    <input
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-white border outline-none rounded-2xl border-white/10 bg-slate-950/70"
                      placeholder="electronics"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-200">
                    Image URL
                  </label>
                  <input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-white border outline-none rounded-2xl border-white/10 bg-slate-950/70"
                    placeholder="https://example.com/product.jpg"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-200">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="5"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-white border outline-none rounded-2xl border-white/10 bg-slate-950/70"
                    placeholder="Product description"
                    required
                  />
                </div>

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-5 py-3 font-medium text-white transition border rounded-2xl border-white/10 bg-white/5 hover:bg-white/10"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 font-medium transition rounded-2xl bg-brand-500 text-slate-950 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? (
                      <>
                        <LoaderCircle className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : editingItem ? (
                      'Update Product'
                    ) : (
                      'Create Product'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};