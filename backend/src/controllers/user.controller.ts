import { Request, Response } from 'express';
import User from '../models/user.model';

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Read all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Read a single user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).send();
            return;
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            res.status(404).send();
            return;
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).send();
            return;
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};
