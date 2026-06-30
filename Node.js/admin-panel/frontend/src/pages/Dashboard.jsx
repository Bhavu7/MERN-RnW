import { useEffect, useState } from "react";
import { FiUsers, FiUserCheck, FiShield, FiEdit3 } from "react-icons/fi";
import StatCard from "../components/StatCard.jsx";
import api from "../api/axios.js";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const PIE_COLORS = ["#6366f1", "#f97316", "#ec4899", "#10b981", "#3b82f6"];

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    admins: 0,
    editors: 0,
    roleDistribution: [],
    statusDistribution: [],
    monthlySignups: [],
  });

  useEffect(() => {
    api.get("/users/stats").then(({ data }) => setStats(data)).catch(() => {});
  }, []);

  const cards = [
    { title: "Total Users", value: stats.total, icon: FiUsers, color: "bg-primary-500" },
    { title: "Active Users", value: stats.active, icon: FiUserCheck, color: "bg-green-500" },
    { title: "Admins", value: stats.admins, icon: FiShield, color: "bg-orange-500" },
    { title: "Editors", value: stats.editors, icon: FiEdit3, color: "bg-pink-500" },
  ];

  const cardStyle =
    "bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700";

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Overview of your application</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <StatCard key={c.title} {...c} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${cardStyle} lg:col-span-2`}
        >
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">
            User Growth (Last 6 Months)
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={stats.monthlySignups}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#colorUsers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cardStyle}
        >
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={stats.statusDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
              >
                {stats.statusDistribution.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={30} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "none" }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={cardStyle}
      >
        <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Users by Role
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={stats.roleDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} allowDecimals={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {stats.roleDistribution.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
