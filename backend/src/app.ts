import express, { Application } from "express";
import authRoutes from "./routes/authRoute";

const app: Application = express(); // Deklarasikan app di sini

// Middleware untuk parsing JSON
app.use(express.json());

// Daftarkan rute otentikasi
app.use("/auth", authRoutes);

const PORT = 3000;

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
