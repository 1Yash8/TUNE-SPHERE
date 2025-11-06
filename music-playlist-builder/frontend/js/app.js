const API = window.location.origin + '/api';
const featuredGrid = document.getElementById('featured-grid');
const playlistsGrid = document.getElementById('playlists-grid');
const playerInfo = document.getElementById('player-info');
const playBtn = document.getElementById('play');
let currentAudio = null;
let currentIndex = -1;
let songs = [];

async function loadSongs(){
  try{
    const res = await fetch(API + '/songs');
    songs = await res.json();
    renderFeatured();
  }catch(e){
    console.error('failed to load songs',e);
    // fallback to embedded sample
    songs = [
      { title:'Electric Dreams', artist:'Neon Pulse', coverUrl:'/assets/covers/cover1.svg' },
      { title:'Thunder Road', artist:'Rock Legends', coverUrl:'/assets/covers/cover2.svg' },
      { title:'Midnight City', artist:'Urban Echoes', coverUrl:'/assets/covers/cover3.svg' },
      { title:'Summer Vibes', artist:'Tropical Beats', coverUrl:'/assets/covers/cover4.svg' }
    ];
    renderFeatured();
  }
}

function renderFeatured(){
  featuredGrid.innerHTML = '';
  songs.forEach((s, i) => {
    const c = document.createElement('div');
    c.className = 'card';
    c.innerHTML = `<img src="${s.coverUrl||'/assets/covers/cover1.svg'}" alt="">
      <div class="meta"><div class="title">${s.title}</div><div class="artist">${s.artist||s.album||''}</div></div>`;
    c.onclick = () => playSong(i);
    featuredGrid.appendChild(c);
  });
}

function playSong(i){
  const s = songs[i];
  if(!s) return;
  if(currentAudio){ currentAudio.pause(); }
  // if audioUrl empty, create a 1-second silent audio blob to simulate
  if(!s.audioUrl){
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(0, ctx.currentTime);
    const dest = ctx.createMediaStreamDestination();
    oscillator.connect(dest);
    oscillator.start();
    const audio = new Audio();
    currentAudio = audio;
    playerInfo.innerText = s.title + ' — ' + s.artist;
    playBtn.innerText = '⏸';
    currentIndex = i;
    return;
  }
  currentAudio = new Audio(s.audioUrl);
  currentAudio.play();
  playerInfo.innerText = s.title + ' — ' + s.artist;
  playBtn.innerText = '⏸';
  currentIndex = i;
}

playBtn.onclick = () => {
  if(!currentAudio) return;
  if(currentAudio.paused) { currentAudio.play(); playBtn.innerText='⏸'; } else { currentAudio.pause(); playBtn.innerText='▶️'; }
};

document.getElementById('prev').onclick = () => {
  if(currentIndex > 0) playSong(currentIndex - 1);
};
document.getElementById('next').onclick = () => {
  if(currentIndex < songs.length - 1) playSong(currentIndex + 1);
};

loadSongs();