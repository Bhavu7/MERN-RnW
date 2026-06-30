import { NavLink } from "react-router-dom";
import { FiGrid, FiUsers, FiSettings, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Dashboard", icon: FiGrid, end: true },
  { to: "/users", label: "Users", icon: FiUsers },
  { to: "/settings", label: "Settings", icon: FiSettings },
];

function NavLinks({ onClick }) {
  return (
    <nav className="flex-1 px-3 py-4 space-y-1">
      {links.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onClick}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
              ? "bg-primary-600 text-white shadow-md shadow-primary-200 dark:shadow-none"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`
          }
        >
          <Icon className="text-lg" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {/* Desktop sidebar — always visible, no transform animation */}
      <aside className="hidden h-full bg-white border-r border-gray-200 md:flex md:w-64 md:flex-col dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center h-16 px-5 border-b border-gray-200 dark:border-gray-700">
          <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
            ⚡ AdminPanel
          </span>
        </div>
        <NavLinks />
        <div className="p-4 text-xs text-gray-400 border-t border-gray-200 dark:border-gray-700">
          v1.0.0 — MERN Admin
        </div>
      </aside>

      {/* Mobile drawer — overlay + animated slide-in */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/40 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 left-0 z-40 flex flex-col w-64 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 md:hidden"
            >
              <div className="flex items-center justify-between h-16 px-5 border-b border-gray-200 dark:border-gray-700">
                <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                  ⚡ AdminPanel
                </span>
                <button onClick={() => setOpen(false)}>
                  <FiX />
                </button>
              </div>
              <NavLinks onClick={() => setOpen(false)} />
              <div className="p-4 text-xs text-gray-400 border-t border-gray-200 dark:border-gray-700">
                v1.0.0 — MERN Admin
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}