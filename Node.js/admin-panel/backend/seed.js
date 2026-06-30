import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";

dotenv.config();
connectDB();

const run = async () => {
  await User.deleteMany();
  await User.create({
    name: "Super Admin",
    email: "admin@admin.com",
    password: "admin123",
    role: "admin",
  });
  console.log("Seeded admin -> email: admin@admin.com / password: admin123");
  process.exit();
};

run();
