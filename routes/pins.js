const express = require('express');
const Pin = require('../models/Pin');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all pins for user
router.get('/', auth, async (req, res) => {
  try {
    const pins = await Pin.find({ userId: req.userId });
    res.json(pins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add pin
router.post('/', auth, async (req, res) => {
  try {
    const { category, pin, sessionOnly } = req.body;
    const newPin = new Pin({ userId: req.userId, category, pin, sessionOnly });
    await newPin.save();
    res.status(201).json(newPin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update pin
router.put('/:id', auth, async (req, res) => {
  try {
    const { category, pin, sessionOnly } = req.body;
    const updatedPin = await Pin.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { category, pin, sessionOnly },
      { new: true }
    );
    if (!updatedPin) return res.status(404).json({ error: 'Pin not found' });
    res.json(updatedPin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete pin
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedPin = await Pin.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!deletedPin) return res.status(404).json({ error: 'Pin not found' });
    res.json({ message: 'Pin deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;