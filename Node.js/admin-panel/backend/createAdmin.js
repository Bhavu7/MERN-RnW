// Creates (or promotes) a single admin user directly in the database.
// Does NOT delete existing data — safe to run on a live/shared database.
//
// Usage:
//   node createAdmin.js "Admin Name" admin@example.com mySecurePass123
// or via env vars:
//   ADMIN_NAME="Admin" ADMIN_EMAIL=admin@x.com ADMIN_PASSWORD=secret node createAdmin.js

import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";

dotenv.config();

const [, , argName, argEmail, argPassword] = process.argv;

const name = argName || process.env.ADMIN_NAME || "Super Admin";
const email = argEmail || process.env.ADMIN_EMAIL || "admin@admin.com";
const password = argPassword || process.env.ADMIN_PASSWORD || "admin123";

const run = async () => {
  await connectDB();

  let user = await User.findOne({ email });

  if (user) {
    user.role = "admin";
    user.status = "active";
    if (argPassword || process.env.ADMIN_PASSWORD) {
      user.password = password; // pre-save hook hashes it
    }
    await user.save();
    console.log(`Existing user promoted to admin -> ${email}`);
  } else {
    await User.create({ name, email, password, role: "admin" });
    console.log(`Admin created -> email: ${email} / password: ${password}`);
  }

  process.exit();
};

run().catch((err) => {
  console.error("Failed to create admin:", err.message);
  process.exit(1);
});
