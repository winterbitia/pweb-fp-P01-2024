const BorrowItems = require('../models/borrowItems.model');

exports.createBorrow = async (req, res) => {
  try {
      const borrow = new BorrowItems(req.body);
      await borrow.save();
      res.status(201).json({ message: 'Borrow record created successfully', borrow });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

exports.getAllBorrowedItems = async (req, res) => {
  try {
      const borrowedItems = await BorrowItems.find();
      res.status(200).json(borrowedItems);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};