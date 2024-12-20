import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoute";
import connectToDatabase from "./db-connection";
import { seedUsers } from "./models/user";

// Muat variabel lingkungan dari .env
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Koneksi ke database
connectToDatabase().then(() => {
  seedUsers(); // Seed data setelah koneksi berhasil
});

// Endpoint utama
app.get("/", (_, res) => {
  const currentTime = new Date().toLocaleString();
  res.status(200).send({
    status: "success",
    date: currentTime,
  });
});

// Tambahkan rute autentikasi
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
