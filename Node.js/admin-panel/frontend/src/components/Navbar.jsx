import { FiMenu, FiLogOut, FiMoon, FiSun, FiUser } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Navbar({ setOpen, dark, setDark }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <button
        className="md:hidden text-xl text-gray-600 dark:text-gray-200"
        onClick={() => setOpen(true)}
      >
        <FiMenu />
      </button>
      <h1 className="font-semibold text-gray-700 dark:text-gray-100 hidden md:block">
        Welcome back, {user?.name?.split(" ")[0] || "Admin"} 👋
      </h1>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-200 transition"
        >
          {dark ? <FiSun /> : <FiMoon />}
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700">
          <FiUser className="text-primary-600 dark:text-primary-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {user?.name}
          </span>
        </div>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 transition"
          title="Logout"
        >
          <FiLogOut />
        </button>
      </div>
    </header>
  );
}
