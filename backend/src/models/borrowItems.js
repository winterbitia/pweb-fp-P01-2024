const mongoose = require('mongoose');

const BorrowItemsSchema = new mongoose.Schema({
    item_name: { type: String, required: true },
    amount: { type: Number, required: true },
    borrow_date: { type: Date, required: true },
    return_date: { type: Date, required: true },
    borrower_name: { type: String, required: true },
    officer_name: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('BorrowItems', BorrowItemsSchema);