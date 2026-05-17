import express from "express";
const router = express.Router();

import { register, login, logout, updateProfile } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Logout
router.get("/logout", logout);

// Update Profile (Protected)
router.put("/profile/update", isAuthenticated, updateProfile);

export default router;