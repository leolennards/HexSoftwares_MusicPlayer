const songs = [
  { title: "All My Life", src: "songs/AllMyLife-K-Ci&JoJo.mp3", artist: "K-Ci & JoJo", albumArt: "images/AllMyLife.jpg" },

  { title: "Mr. Telephone Man", src: "songs/MrTelephoneMan-NewEdition.mp3", artist: "New Edition", albumArt: "images/Mr.TelephoneMan.jpg" },

  { title: "Can We Talk", src: "songs/Tevin Campbell - Can We Talk.mp3", artist: "Tevin Campbell", albumArt: "images/CanWeTalk.jpeg" },

  { title: "Always On Time", src: "songs/Ja Rule - Always On Time (feat. Ashanti).mp3", artist: "Ja Rule", albumArt: "images/AlwaysOnTime.jpeg" },

  { title: "Between Me & You ft. Christina Milian", src: "songs/Ja Rule - Between Me & You ft. Christina Milian.mp3", artist: "Ja Rule", albumArt: "images/Between.jpg" },

  { title: "All I Have (feat. LL Cool J)", src: "songs/Jennifer Lopez - All I Have (feat. LL Cool J).mp3", artist: "Jennifer Lopez", albumArt: "images/JenniferLopez.jpg" },

  { title: "Baby (feat. Kerry)", src: "songs/Kulud-Baby-featKerry.mp3", artist: "Kulud", albumArt: "images/Baby.jpg" },

  { title: "Be My Queen (feat. Verd)", src: "songs/Kulud - Be My Queen (feat. Verd).mp3", artist: "Kulud", albumArt: "images/Queen.jpg" },

  { title: "Adorn", src: "songs/Miguel - Adorn (Official Video).mp3", artist: "Miguel", albumArt: "images/Adorn.jpg" },

  { title: "Because of You", src: "songs/Ne-Yo - Because of You.mp3", artist: "Ne-Yo", albumArt: "images/BecauseOfYou.jpg" },

  { title: "Ask of You", src: "songs/Raphael Saadiq - Ask of You.mp3", artist: "Raphael Saadiq", albumArt: "images/Ask.jpg" },

  { title: "Between the Sheets", src: "songs/The Isley Brothers - Between the Sheets.mp3", artist: "The Isley Brothers", albumArt: "images/Sheets.jpg" },

  { title: "Alone", src: "songs/Liquideep - Alone.mp3", artist: "Liquideep", albumArt: "images/Alone-Liquid.jpg" },

  { title: "Ambitionz az a Ridah", src: "songs/2Pac - Ambitionz az a ridah [HD].mp3", artist: "2Pac", albumArt: "images/Ambitionz.jpg" },

  { title: "Baby By Me (feat. Ne-Yo)", src: "songs/50 Cent - Baby By Me (feat. Ne-Yo).mp3", artist: "50 Cent", albumArt: "images/BabyByMe.jpg" },

  { title: "Blue Gangsta", src: "songs/Michael Jackson - Blue Gangsta.mp3", artist: "Michael Jackson", albumArt: "images/BlueGangsta.jpg" },

  { title: "Body On Me (feat. Ashanti & Akon)", src: "songs/Nelly - Body On Me (feat. Ashanti & Akon).mp3", artist: "Nelly", albumArt: "images/BodyOnMe.jpg" },

  { title: "Brown Eyed Girl", src: "songs/Tevin Campbell - Brown Eyed Girl.mp3", artist: "Tevin Campbell", albumArt: "images/BrownEyedGirl.jpg" },

  { title: "Brown Eyes", src: "songs/Danny K - Brown Eyes.mp3", artist: "Danny K", albumArt: "images/BrownEyesDannyK.jpg" },

  { title: "Butterflies", src: "songs/Michael Jackson - Butterflies.mp3", artist: "Michael Jackson", albumArt: "images/ButterfliesMJ.jpeg" },

  { title: "Call on Me", src: "songs/Janet Jackson - Call on Me (feat. Nelly).mp3", artist: "Janet Jackson", albumArt: "images/CallOnMe.jpg" },

  { title: "Call You Tonight", src: "songs/Whitney Houston - Call You Tonight.mp3", artist: "Whitney Houston", albumArt: "images/CallYouTonight.jpg" },
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const volumeControl = document.getElementById("volume");
const playlist = document.getElementById("playlist");
const albumArt = document.getElementById("album-art");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

let currentSong = 0;
let isPlaying = false;

songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener("click", () => {
    currentSong = index;
    loadSong(songs[currentSong]);
    playSong();
  });
  playlist.appendChild(li);
});

// Helper to format time in mm:ss
function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Update time display as song plays
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

// Update duration when metadata loads
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

// Reset times when loading a new song
function loadSong(song) {
  audio.src = song.src;
  albumArt.src = song.albumArt || "https://via.placeholder.com/120x120?text=Album+Art";
  document.getElementById("song-title").textContent = song.title;
  document.getElementById("song-artist").textContent = song.artist;
  currentTimeEl.textContent = "0:00";
  durationEl.textContent = "0:00";
  updateActiveSong();
}

function playSong() {
  audio.play();
  isPlaying = true;
  playIcon.style.display = "none";
  pauseIcon.style.display = "inline";
  document.querySelector(".player").classList.add("playing");
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playIcon.style.display = "inline";
  pauseIcon.style.display = "none";
  document.querySelector(".player").classList.remove("playing");
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
});

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
});

function updateActiveSong() {
  [...playlist.children].forEach((li, index) => {
    li.classList.toggle("active", index === currentSong);
  });
}

// Initialize
loadSong(songs[currentSong]);
