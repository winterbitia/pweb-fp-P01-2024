import express from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller';

const router = express.Router();

// Create user baru
router.post('/users', createUser);

// Read all users
router.get('/users', getAllUsers);

// Read a user by ID
router.get('/users/:id', getUserById);

// Update a user by ID
router.patch('/users/:id', updateUser);

// Delete a user by ID
router.delete('/users/:id', deleteUser);

export default router;