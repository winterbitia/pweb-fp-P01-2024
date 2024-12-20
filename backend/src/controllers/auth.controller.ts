import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate token JWT
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET || "s3cr37_p1", // Gunakan secret dari .env
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token,
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};
