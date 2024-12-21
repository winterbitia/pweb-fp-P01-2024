import express from "express";
import { loginController, registerController } from "../controllers/auth.controller";
import { authenticateToken, getUserData } from "../middleware/authMiddleware";

const router = express.Router();

// Rute login
router.post("/login", loginController);

// Rute registrasi
router.post("/register", registerController);

// Rute untuk mendapatkan informasi pengguna
router.get("/user", authenticateToken, getUserData);

export default router;