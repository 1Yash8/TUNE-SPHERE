const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: String,
  artist: String,
  album: String,
  duration: Number,
  audioUrl: String,
  coverUrl: String
});

module.exports = mongoose.model('Song', SongSchema);