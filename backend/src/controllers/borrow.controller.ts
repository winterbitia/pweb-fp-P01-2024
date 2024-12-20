import { BorrowItems } from '../models/borrowItems.model';
import { Request, Response } from 'express';

export const createBorrow = async (req: Request, res: Response) => {
    try {
        const borrow = new BorrowItems(req.body);
        await borrow.save();
        res.status(201).json({ message: 'Borrow record created successfully', borrow });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Unknown error occurred' });
        }
    }
};

export const getAllBorrowedItems = async (req: Request, res: Response) => {
    try {
        const borrowedItems = await BorrowItems.find();
        res.status(200).json(borrowedItems);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
};
