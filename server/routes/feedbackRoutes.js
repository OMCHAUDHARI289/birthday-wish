const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// POST: Add new feedback
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    const newFeedback = new Feedback({ message });
    await newFeedback.save();
    res.status(201).json({ success: true, feedback: newFeedback });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to save feedback' });
  }
});

module.exports = router;
