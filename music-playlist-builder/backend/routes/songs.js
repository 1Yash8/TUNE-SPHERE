const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// GET all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find({});
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;