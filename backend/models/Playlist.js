const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
  name: { type: String, default: 'New Playlist' },
  songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Playlist', PlaylistSchema);