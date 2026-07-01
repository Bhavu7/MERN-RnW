import { AnimatePresence, motion } from 'framer-motion';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ConfirmModal = ({ open, title, message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onClose, danger = false, loading = false }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ scale: 0.96, opacity: 0, y: 14 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0, y: 14 }} className="glass w-full max-w-md rounded-[2rem] p-6">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
              <ExclamationTriangleIcon className="h-7 w-7" />
            </div>
            <h3 className="text-center text-2xl font-semibold text-slate-900 dark:text-white">{title}</h3>
            <p className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">{message}</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button type="button" onClick={onClose} className="btn-secondary">{cancelText}</button>
              <button type="button" onClick={onConfirm} disabled={loading} className={`rounded-2xl px-4 py-3 text-sm font-semibold text-white transition ${danger ? 'bg-rose-500 hover:bg-rose-400' : 'bg-brand-500 hover:bg-brand-400'}`}>
                {loading ? 'Please wait...' : confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
