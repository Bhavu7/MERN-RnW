import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import CustomDateInput from './CustomDateInput';
import CustomSelect from './CustomSelect';

const defaultForm = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  dueDate: '',
  category: '',
  assignedTo: '',
};

const TaskFormModal = ({ open, onClose, onSubmit, categories, users, editingTask, isAdmin, submitting }) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || '',
        description: editingTask.description || '',
        status: editingTask.status || 'pending',
        priority: editingTask.priority || 'medium',
        dueDate: editingTask.dueDate ? new Date(editingTask.dueDate).toISOString().slice(0, 10) : '',
        category: editingTask.category?._id || '',
        assignedTo: editingTask.assignedTo?._id || '',
      });
    } else {
      setForm(defaultForm);
    }
  }, [editingTask, open]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 p-4 overflow-y-auto z-90 bg-slate-950/45 backdrop-blur-md sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="flex items-start justify-center min-h-full py-6 sm:py-10">
            <motion.div initial={{ scale: 0.98, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.98, opacity: 0, y: 20 }} className="glass w-full max-w-3xl rounded-[2rem]">
              <div className="flex items-start justify-between gap-4 p-6 border-b border-slate-200/80 dark:border-white/10 sm:p-8">
                <div className="pr-4">
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{editingTask ? 'Update Task' : 'Create Task'}</h2>
                </div>
                <button className="p-2 transition border rounded-2xl border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white" onClick={onClose}>
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto px-6 py-6 hide-scrollbar sm:px-8 sm:py-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm text-slate-600 dark:text-slate-300">Task Title</label>
                    <input name="title" value={form.title} onChange={handleChange} className="input" placeholder="Enter task title" required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm text-slate-600 dark:text-slate-300">Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} className="input min-h-28" placeholder="Add task details" />
                  </div>
                  <CustomSelect
                    label="Status"
                    value={form.status}
                    onChange={handleChange}
                    placeholder="Select status"
                    options={[
                      { name: 'status', value: 'pending', label: 'Pending' },
                      { name: 'status', value: 'in-progress', label: 'In Progress' },
                      { name: 'status', value: 'completed', label: 'Completed' },
                    ]}
                  />
                  <CustomSelect
                    label="Priority"
                    value={form.priority}
                    onChange={handleChange}
                    placeholder="Select priority"
                    options={[
                      { name: 'priority', value: 'low', label: 'Low' },
                      { name: 'priority', value: 'medium', label: 'Medium' },
                      { name: 'priority', value: 'high', label: 'High' },
                    ]}
                  />
                  <CustomDateInput label="Due Date" name="dueDate" value={form.dueDate} onChange={handleChange} />
                  <CustomSelect
                    label="Category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Select category"
                    options={categories.map((category) => ({ name: 'category', value: category._id, label: category.name }))}
                  />
                  {isAdmin && (
                    <div className="sm:col-span-2">
                      <CustomSelect
                        label="Assign To"
                        value={form.assignedTo}
                        onChange={handleChange}
                        placeholder="Select user"
                        options={users.map((user) => ({ name: 'assignedTo', value: user._id, label: `${user.username} (${user.role})` }))}
                      />
                    </div>
                  )}
                </div>
                <div className="grid gap-3 mt-6 sm:grid-cols-2">
                  <button type="submit" disabled={submitting} className="w-full btn-primary">
                    {submitting ? 'Saving...' : editingTask ? 'Update Task' : 'Add Task'}
                  </button>
                  <button type="button" onClick={onClose} className="w-full btn-secondary">Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskFormModal;
