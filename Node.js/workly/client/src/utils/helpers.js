export const formatDate = (date) => {
  if (!date) return 'No due date';
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const getStatusClasses = (status) => {
  const map = {
    pending: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
    'in-progress': 'border-sky-400/30 bg-sky-400/10 text-sky-200',
    completed: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
  };
  return map[status] || 'border-slate-400/30 bg-slate-400/10 text-slate-200';
};

export const getPriorityClasses = (priority) => {
  const map = {
    low: 'border-slate-400/30 bg-slate-400/10 text-slate-200',
    medium: 'border-violet-400/30 bg-violet-400/10 text-violet-200',
    high: 'border-rose-400/30 bg-rose-400/10 text-rose-200',
  };
  return map[priority] || 'border-slate-400/30 bg-slate-400/10 text-slate-200';
};
