const express = require('express');
const Password = require('../models/Password');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all passwords for user
router.get('/', auth, async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.userId });
    res.json(passwords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add password
router.post('/', auth, async (req, res) => {
  try {
    const { site, username, password } = req.body;
    const newPassword = new Password({ userId: req.userId, site, username, password });
    await newPassword.save();
    res.status(201).json(newPassword);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update password
router.put('/:id', auth, async (req, res) => {
  try {
    const { site, username, password } = req.body;
    const updatedPassword = await Password.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { site, username, password },
      { new: true }
    );
    if (!updatedPassword) return res.status(404).json({ error: 'Password not found' });
    res.json(updatedPassword);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete password
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedPassword = await Password.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!deletedPassword) return res.status(404).json({ error: 'Password not found' });
    res.json({ message: 'Password deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;