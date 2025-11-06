# Backend — Tune Sphere

## Setup
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and set `MONGO_URI`
4. Run `node seed/seed.js` to populate DB
5. Run `npm run dev` to start the server on port 4000

API endpoints:
- GET `/api/songs`
- GET `/api/playlists`
- POST `/api/playlists` (body: { name, songs: [] })
- POST `/api/playlists/:id/add` (body: { songId })
- POST `/api/playlists/:id/remove` (body: { songId })