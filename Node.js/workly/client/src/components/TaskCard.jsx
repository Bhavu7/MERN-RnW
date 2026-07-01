import { motion } from 'framer-motion';
import { CalendarDaysIcon, PencilSquareIcon, TrashIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { formatDate, getPriorityClasses, getStatusClasses } from '../utils/helpers';

const TaskCard = ({ task, onEdit, onDelete, canManage }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="glass rounded-3xl p-5 transition duration-300 hover:-translate-y-1 hover:border-brand-400/30"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{task.title}</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{task.description || 'No description added yet.'}</p>
        </div>
        <div className="flex flex-col gap-2">
          <span className={`badge ${getStatusClasses(task.status)}`}>{task.status}</span>
          <span className={`badge ${getPriorityClasses(task.priority)}`}>{task.priority}</span>
        </div>
      </div>

      <div className="grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <CalendarDaysIcon className="h-4 w-4 text-brand-500 dark:text-brand-300" />
          <span>{formatDate(task.dueDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <UserCircleIcon className="h-4 w-4 text-brand-500 dark:text-brand-300" />
          <span>{task.assignedTo?.username || 'Unknown user'}</span>
        </div>
        <div className="rounded-2xl bg-slate-50 px-3 py-2 dark:bg-white/5">Category: <span className="text-slate-900 dark:text-white">{task.category?.name || 'Uncategorized'}</span></div>
        <div className="rounded-2xl bg-slate-50 px-3 py-2 dark:bg-white/5">Created By: <span className="text-slate-900 dark:text-white">{task.createdBy?.username || 'Unknown'}</span></div>
      </div>

      {canManage && (
        <div className="mt-5 flex gap-3">
          <button onClick={() => onEdit(task)} className="btn-secondary flex-1">
            <PencilSquareIcon className="mr-2 h-5 w-5" /> Edit
          </button>
          <button onClick={() => onDelete(task)} className="flex-1 rounded-2xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-200 dark:hover:bg-rose-500/20">
            <TrashIcon className="mr-2 inline h-5 w-5" /> Delete
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default TaskCard;
