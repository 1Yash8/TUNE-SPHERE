const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const songsRouter = require('./routes/songs');
const playlistsRouter = require('./routes/playlists');

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/songs', songsRouter);
app.use('/api/playlists', playlistsRouter);

// serve frontend static
const staticPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(staticPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tune_sphere', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log('Server running on port', PORT));
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
  app.listen(PORT, () => console.log('Server running (no DB) on port', PORT));
});