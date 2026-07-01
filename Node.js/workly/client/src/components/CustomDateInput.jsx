import { CalendarDaysIcon } from '@heroicons/react/24/outline';

const CustomDateInput = ({ label, name, value, onChange }) => {
  return (
    <div>
      {label && <label className="mb-2 block text-sm text-slate-600 dark:text-slate-300">{label}</label>}
      <div className="group relative">
        <input
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          className="input pr-12 [color-scheme:light] dark:[color-scheme:dark]"
        />
        <CalendarDaysIcon className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition group-focus-within:text-brand-500" />
      </div>
    </div>
  );
};

export default CustomDateInput;
