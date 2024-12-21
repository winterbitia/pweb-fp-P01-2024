import express from 'express';
import { createBorrow, getAllBorrowedItems } from '../controllers/borrow.controller';

const router = express.Router();

router.post('/book-equipment', createBorrow);
router.get('/all-equipment', getAllBorrowedItems);

export default router;
