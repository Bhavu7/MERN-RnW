import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { FiUser, FiMail, FiShield, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../api/axios.js";

export default function Settings() {
  const { user } = useAuth();
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  const rows = [
    { label: "Name", value: user?.name, icon: FiUser },
    { label: "Email", value: user?.email, icon: FiMail },
    { label: "Role", value: user?.role, icon: FiShield },
  ];

  const submit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirm) {
      toast.error("New passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await api.put("/auth/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      toast.success("Password updated successfully");
      setForm({ currentPassword: "", newPassword: "", confirm: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4 h-fit"
        >
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">Profile</h3>
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex items-center gap-3 py-2 border-b border-gray-50 dark:border-gray-700/50 last:border-0"
            >
              <r.icon className="text-primary-600" />
              <div>
                <p className="text-xs text-gray-400">{r.label}</p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 capitalize">
                  {r.value}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
            <FiLock /> Change Password
          </h3>
          <form onSubmit={submit} className="space-y-3">
            <input
              type="password"
              required
              placeholder="Current Password"
              value={form.currentPassword}
              onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
            <input
              type="password"
              required
              minLength={6}
              placeholder="New Password"
              value={form.newPassword}
              onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
            <input
              type="password"
              required
              placeholder="Confirm New Password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
            <button
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-3">
            Tip: to reset another user's password, edit them from the Users page.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
