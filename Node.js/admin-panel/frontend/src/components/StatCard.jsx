import { motion } from "framer-motion";

export default function StatCard({ title, value, icon: Icon, color }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 animate-slide-up"
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl text-white ${color}`}
      >
        <Icon />
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {value}
        </p>
      </div>
    </motion.div>
  );
}
