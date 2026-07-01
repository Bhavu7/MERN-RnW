import { useState } from 'react';

const CategoryPanel = ({ categories, onCreate, loading }) => {
  const [form, setForm] = useState({ name: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(form, () => setForm({ name: '', description: '' }));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[360px,1fr]">
      <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Create Category</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Admins can add reusable categories for populated task forms.</p>
        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-600 dark:text-slate-300">Category Name</label>
            <input className="input" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="UI Design" required />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-600 dark:text-slate-300">Description</label>
            <textarea className="input min-h-28" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Optional short description" />
          </div>
          <button className="btn-primary w-full" disabled={loading}>{loading ? 'Creating...' : 'Create Category'}</button>
        </div>
      </form>

      <div className="glass rounded-[2rem] p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Available Categories</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {categories.map((category) => (
            <div key={category._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{category.name}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{category.description || 'No description provided.'}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-brand-500 dark:text-brand-300">By {category.createdBy?.username || 'Admin'}</p>
            </div>
          ))}
          {!categories.length && <p className="text-sm text-slate-500 dark:text-slate-400">No categories yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default CategoryPanel;
