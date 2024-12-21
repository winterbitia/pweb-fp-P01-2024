import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model"; 

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
      process.env.JWT_SECRET || "s3cr37_p1", 
      { expiresIn: "2h" }
    );

    res.json({ 
      token,
      username: user.username,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const registerController = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({ username, password, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};