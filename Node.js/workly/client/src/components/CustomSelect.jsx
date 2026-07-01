import { Fragment, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const CustomSelect = ({ label, value, onChange, options = [], placeholder = 'Select option' }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = options.find((option) => String(option.value) === String(value));

  return (
    <div className="relative" ref={containerRef}>
      {label && <label className="mb-2 block text-sm text-slate-600 dark:text-slate-300">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="input flex items-center justify-between text-left"
      >
        <span className={selected ? 'text-slate-900 dark:text-white' : 'text-slate-400'}>{selected?.label || placeholder}</span>
        <ChevronDownIcon className={`h-5 w-5 text-slate-400 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900">
            <div className="max-h-60 overflow-y-auto p-2 hide-scrollbar">
              {options.map((option) => (
                <Fragment key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange({ target: { name: option.name, value: option.value } });
                      setOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5"
                  >
                    <span>{option.label}</span>
                    {String(option.value) === String(value) && <CheckIcon className="h-4 w-4 text-brand-500" />}
                  </button>
                </Fragment>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;
