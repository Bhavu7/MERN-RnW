import express from "express";
import { register, login, getMe, changePassword } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/change-password", protect, changePassword);

export default router;
