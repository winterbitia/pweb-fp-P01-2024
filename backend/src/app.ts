import express, { Application } from "express";
import authRoutes from "./routes/authRoute";
import userRoutes from './routes/userRoutes'; 

const app: Application = express(); // Declare app here

app.use(express.json());

app.use("/auth", authRoutes);

app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
