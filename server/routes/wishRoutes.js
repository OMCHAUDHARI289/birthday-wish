const express = require('express');
const router = express.Router();
const Wish = require('../models/wish');

// POST: Add a new wish
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    const newWish = new Wish({ message });
    await newWish.save();
    res.status(201).json({ success: true, wish: newWish });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// GET: Retrieve all wishes (optional if you want to display them later)
router.get('/', async (req, res) => {
  try {
    const wishes = await Wish.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, wishes });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch wishes' });
  }
});

module.exports = router;
