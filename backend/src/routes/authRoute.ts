import express from "express";
import { loginController } from "../controllers/auth.controller";
import { authenticateToken, getUserData } from "../middleware/authMiddleware";

const router = express.Router();

// Rute login
router.post("/login", loginController);

// Rute untuk mendapatkan informasi pengguna
router.get("/user", authenticateToken, getUserData);

export default router;
