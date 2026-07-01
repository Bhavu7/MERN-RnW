import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import CategoryPanel from '../components/CategoryPanel';
import Loader from '../components/Loader';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/categories');
      setCategories(data.categories);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreate = async (payload, reset) => {
    try {
      setCreating(true);
      await api.post('/categories', payload);
      toast.success('Category created successfully');
      reset();
      loadCategories();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create category');
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <Loader />;
  return <CategoryPanel categories={categories} onCreate={handleCreate} loading={creating} />;
};

export default CategoriesPage;
