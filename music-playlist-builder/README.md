# Tune Sphere — Music Playlist Builder

A GitHub-ready full-stack demo project (Node.js + Express + MongoDB + Vanilla JS frontend)
that replicates a dark-themed music dashboard UI similar to the screenshot provided.

## What's included
- Backend: Express + Mongoose API for songs & playlists (seed script included)
- Frontend: `frontend/index.html`, CSS, and JS to interact with the API
- `seed/seed.js` to populate MongoDB with sample songs
- `.env.example` and Dockerfile for deployment
- Instructions for running locally and deploying (Render/Railway)

## Run locally (quick)
1. Install Node & npm.
2. Start a MongoDB instance (Atlas or local) and get the connection URI.
3. Backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # edit .env and paste MONGO_URI
   node seed/seed.js   # seeds sample songs & playlists
   npm run dev
   ```
4. Frontend:
   - Open `frontend/index.html` directly in browser, or
   - Backend serves static frontend at `http://localhost:4000` (see server.js)

## Deploy
This repo is ready for Render/Railway. See backend/Dockerfile and instructions in backend/README.md.

---

Enjoy — customize songs and artwork in `backend/seed/sample_songs.json`.