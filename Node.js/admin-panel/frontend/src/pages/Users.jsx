import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import api from "../api/axios.js";
import Modal from "../components/Modal.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const emptyForm = { name: "", email: "", password: "", role: "user", status: "active" };

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users", { params: { search, page, limit: 8 } });
      setUsers(data.users);
      setPages(data.pages || 1);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    const t = setTimeout(fetchUsers, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [search, page]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (u) => {
    setEditing(u);
    setForm({ name: u.name, email: u.email, password: "", role: u.role, status: u.status });
    setModalOpen(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await api.put(`/users/${editing._id}`, form);
        toast.success("User updated");
      } else {
        await api.post("/users", form);
        toast.success("User created");
      }
      setModalOpen(false);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const doDelete = async () => {
    try {
      await api.delete(`/users/${deleteId}`);
      toast.success("User deleted");
      setConfirmOpen(false);
      fetchUsers();
    } catch {
      toast.error("Delete failed");
    }
  };

  const roleBadge = {
    admin: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    editor: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
    user: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Users</h2>
        <div className="flex gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Search users..."
              className="pl-9 pr-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <FiPlus /> Add User
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {users.map((u) => (
                <motion.tr
                  key={u._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition"
                >
                  <td className="px-5 py-3 font-medium text-gray-700 dark:text-gray-200">{u.name}</td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{u.email}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleBadge[u.role]}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        u.status === "active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(u)}
                        className="p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/30 text-primary-600 transition"
                      >
                        <FiEdit2 size={15} />
                      </button>
                      <button
                        onClick={() => confirmDelete(u._id)}
                        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 transition"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                p === page
                  ? "bg-primary-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit User" : "Add User"}>
        <form onSubmit={submit} className="space-y-3">
          <input
            required
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          />
          <input
            type="password"
            placeholder={editing ? "New password (optional)" : "Password"}
            required={!editing}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          />
          <div className="flex gap-3">
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white outline-none text-sm"
            >
              <option value="user">User</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white outline-none text-sm"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition disabled:opacity-60"
          >
            {loading ? "Saving..." : editing ? "Update User" : "Create User"}
          </button>
        </form>
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={doDelete}
        message="Are you sure you want to delete this user? This action cannot be undone."
      />
    </div>
  );
}
