import User from "../models/User.js";

// GET all users (with search, pagination)
export const getUsers = async (req, res, next) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;
    const query = search
      ? { $or: [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }] }
      : {};
    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({ users, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const { password, ...rest } = user._doc;
    res.status(201).json(rest);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (!updates.password) delete updates.password;
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};

export const getStats = async (req, res, next) => {
  try {
    const total = await User.countDocuments();
    const active = await User.countDocuments({ status: "active" });
    const admins = await User.countDocuments({ role: "admin" });
    const editors = await User.countDocuments({ role: "editor" });

    // Role distribution (for pie/bar chart)
    const roleAgg = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } },
    ]);
    const roleDistribution = roleAgg.map((r) => ({ name: r._id, value: r.count }));

    // Status distribution
    const statusAgg = await User.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const statusDistribution = statusAgg.map((s) => ({ name: s._id, value: s.count }));

    // Signups for the last 6 months (line/area chart)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    const growthAgg = await User.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const growthMap = new Map(
      growthAgg.map((g) => [`${g._id.year}-${g._id.month}`, g.count])
    );
    const monthlySignups = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      monthlySignups.push({
        month: monthNames[d.getMonth()],
        users: growthMap.get(key) || 0,
      });
    }

    res.json({
      total,
      active,
      admins,
      editors,
      roleDistribution,
      statusDistribution,
      monthlySignups,
    });
  } catch (err) {
    next(err);
  }
};
