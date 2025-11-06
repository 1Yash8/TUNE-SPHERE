const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');
const Song = require('../models/Song');

// GET all playlists
router.get('/', async (req, res) => {
  try {
    const playlists = await Playlist.find({}).populate('songs');
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create playlist
router.post('/', async (req, res) => {
  try {
    const pl = new Playlist({ name: req.body.name || 'New Playlist', songs: req.body.songs || [] });
    await pl.save();
    res.json(pl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add song to playlist
router.post('/:id/add', async (req, res) => {
  try {
    const pl = await Playlist.findById(req.params.id);
    if (!pl) return res.status(404).json({ error: 'Playlist not found' });
    pl.songs.push(req.body.songId);
    await pl.save();
    res.json(await pl.populate('songs'));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove song
router.post('/:id/remove', async (req, res) => {
  try {
    const pl = await Playlist.findById(req.params.id);
    pl.songs = pl.songs.filter(s => s.toString() !== req.body.songId);
    await pl.save();
    res.json(await pl.populate('songs'));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;