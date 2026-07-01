import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FunnelIcon, PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import api from '../api/axios';
import TaskCard from '../components/TaskCard';
import TaskFormModal from '../components/TaskFormModal';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from '../components/ConfirmModal';

const DashboardPage = ({ scope = 'mine' }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [taskToDelete, setTaskToDelete] = useState(null);

  const isAdminAllView = scope === 'all';

  const loadData = async () => {
    try {
      setLoading(true);
      const [taskRes, categoryRes, userRes] = await Promise.all([
        api.get(`/tasks${isAdminAllView ? '?scope=all' : ''}`),
        api.get('/categories'),
        user?.role === 'admin' ? api.get('/tasks/users') : Promise.resolve({ data: { users: [] } }),
      ]);
      setTasks(taskRes.data.tasks);
      setCategories(categoryRes.data.categories);
      setUsers(userRes.data.users || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [scope]);

  const filteredTasks = useMemo(() => {
    if (filter === 'all') return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  const stats = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter((task) => task.status === 'pending').length,
    inProgress: tasks.filter((task) => task.status === 'in-progress').length,
    completed: tasks.filter((task) => task.status === 'completed').length,
  }), [tasks]);

  const closeModal = () => {
    setOpen(false);
    setEditingTask(null);
  };

  const handleSubmit = async (formData) => {
    try {
      setSaving(true);
      const payload = { ...formData, category: formData.category || null, assignedTo: formData.assignedTo || null };
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, payload);
        toast.success('Task updated successfully');
      } else {
        await api.post('/tasks', payload);
        toast.success('Task created successfully');
      }
      closeModal();
      loadData();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to save task');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!taskToDelete) return;
    try {
      setDeleteLoading(true);
      await api.delete(`/tasks/${taskToDelete._id}`);
      toast.success('Task deleted');
      setTaskToDelete(null);
      loadData();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Delete failed');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="space-y-8">
        <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass overflow-hidden rounded-[2rem] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-500 dark:text-brand-300">{isAdminAllView ? 'Admin Command' : 'My Workspace'}</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{isAdminAllView ? 'All user tasks' : 'Manage your tasks'}</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">Fast multi-user task management with role-based visibility, category populate support, and smooth transitions.</p>
            </div>
            <button onClick={() => setOpen(true)} className="btn-primary">
              <PlusIcon className="mr-2 h-5 w-5" /> Add Task
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              ['Total Tasks', stats.total],
              ['Pending', stats.pending],
              ['In Progress', stats.inProgress],
              ['Completed', stats.completed],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/5">
                <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{value}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <section className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <FunnelIcon className="h-5 w-5 text-brand-500 dark:text-brand-300" /> Filter tasks
          </div>
          {['all', 'pending', 'in-progress', 'completed'].map((value) => (
            <button key={value} onClick={() => setFilter(value)} className={filter === value ? 'btn-primary' : 'btn-secondary'}>
              {value.replace('-', ' ')}
            </button>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              canManage={user.role === 'admin' || task.assignedTo?._id === user._id}
              onEdit={(task) => {
                setEditingTask(task);
                setOpen(true);
              }}
              onDelete={(task) => setTaskToDelete(task)}
            />
          ))}
          {!filteredTasks.length && (
            <div className="glass rounded-[2rem] p-10 text-center text-slate-500 dark:text-slate-400 lg:col-span-2 xl:col-span-3">
              No tasks found for this filter.
            </div>
          )}
        </section>

        <TaskFormModal
          open={open}
          onClose={closeModal}
          onSubmit={handleSubmit}
          categories={categories}
          users={users}
          editingTask={editingTask}
          isAdmin={user.role === 'admin'}
          submitting={saving}
        />
      </div>

      <ConfirmModal
        open={Boolean(taskToDelete)}
        title="Delete this task?"
        message={`This action will permanently remove ${taskToDelete?.title || 'this task'} from the workspace.`}
        confirmText="Yes, delete"
        onConfirm={handleDelete}
        onClose={() => setTaskToDelete(null)}
        danger
        loading={deleteLoading}
      />
    </>
  );
};

export default DashboardPage;
