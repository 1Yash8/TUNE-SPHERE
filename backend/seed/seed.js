/*
  seed/seed.js
  Usage:
    node seed/seed.js
  Make sure MONGO_URI is set in environment or .env
*/
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();
const Song = require('../models/Song');
const Playlist = require('../models/Playlist');

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tune_sphere';
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to Mongo for seeding...');
    const data = JSON.parse(fs.readFileSync(__dirname + '/sample_songs.json', 'utf8'));
    await Song.deleteMany({});
    await Playlist.deleteMany({});
    const created = await Song.insertMany(data);
    const pl = new Playlist({ name: 'My Favorites', songs: created.slice(0,2).map(s => s._id) });
    await pl.save();
    console.log('Seed complete. Songs inserted:', created.length);
    process.exit(0);
  }).catch(err => {
    console.error('Seed error', err.message);
    process.exit(1);
  });