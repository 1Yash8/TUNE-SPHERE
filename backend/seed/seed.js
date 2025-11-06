import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Song from '../models/Song.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const songs = [
  {
    title: 'Electric Dreams',
    artist: 'Neon Pulse',
    album: 'Night Lights',
    duration: 210,
    audioUrl: '/assets/audio/demo1.mp3',
    coverUrl: '/assets/covers/cover1.svg',
  },
  {
    title: 'Thunder Road',
    artist: 'Rock Legends',
    album: 'Road Trip',
    duration: 185,
    audioUrl: '/assets/audio/demo2.mp3',
    coverUrl: '/assets/covers/cover2.svg',
  },
  {
    title: 'Midnight City',
    artist: 'Urban Echoes',
    album: 'Skyline',
    duration: 240,
    audioUrl: '/assets/audio/demo3.mp3',
    coverUrl: '/assets/covers/cover3.svg',
  },
  {
    title: 'Summer Vibes',
    artist: 'Tropical Beats',
    album: 'Sunset',
    duration: 200,
    audioUrl: '/assets/audio/demo4.mp3',
    coverUrl: '/assets/covers/cover4.svg',
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to Mongo for seeding...');
    await Song.deleteMany({});
    await Song.insertMany(songs);
    console.log('Seed complete. Songs inserted:', songs.length);
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
