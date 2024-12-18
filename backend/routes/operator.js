const express = require('express');
const { createBorrow, getAllBorrowedItems } = require('../controllers/operator');

const router = express.Router();

router.post('/book-equipment', createBorrow);
router.get('/all-equipment', getAllBorrowedItems);

module.exports = router;