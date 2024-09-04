document.addEventListener('DOMContentLoaded', () => {
  const audioPlayer = document.getElementById('audio-player');
  const playPauseButton = document.getElementById('playpause');
  const nextButton = document.getElementById('next');
  const prevButton = document.getElementById('prev');
  const shuffleButton = document.getElementById('shuffle');
  const loopButton = document.getElementById('loop');
  const progressBar = document.getElementById('progress-bar');
  const volumeControl = document.getElementById('volume');
  const currentTimeDisplay = document.getElementById('current-time');
  const durationDisplay = document.getElementById('duration');
  const trackTitle = document.getElementById('track-title');
  const trackArtist = document.getElementById('track-artist');

  const tracks = [
    { title: 'CHIRON', artist: 'TCHUBI', src: 'songs/CHIRON.mp3' },
    { title: 'SHADOW BOXING', artist: 'TIF', src: 'songs/SHADOW BOXING.mp3' },
    { title: 'JOURNEY', artist: 'liax feat dexter & tga', src: 'songs/JOURNEY.mp3' },
    { title: 'RGUEB RGUEB', artist: 'THE LIELA', src: 'songs/RGUEB RGUEB.mp3' },
    { title: 'حزين الوقت', artist: 'dj MUBARAK', src: 'songs/حزين الوقت.mp3' },
  ];

  let currentTrackIndex = 0;
  let isShuffle = false;
  let isLoop = false;


 
  function loadTrack() {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    const track = tracks[randomIndex];
    audioPlayer.src = track.src;
    trackTitle.textContent = `Title: ${track.title}`;
    trackArtist.textContent = `Artist: ${track.artist}`;
    audioPlayer.load();
    audioPlayer.play();
  }

  function updateProgress() {
      const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progressBar.value = progress;
      currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
      durationDisplay.textContent = formatTime(audioPlayer.duration);
  }

  function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function playPauseTrack() {
      if (audioPlayer.paused) {
          audioPlayer.play();
          playPauseButton.textContent = 'Pause';
      } else {
          audioPlayer.pause();
          playPauseButton.textContent = 'Play';
      }
  }

  function nextTrack() {
      if (isShuffle) {
          currentTrackIndex = Math.floor(Math.random() * tracks.length);
      } else {
          currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
      }
      loadTrack(currentTrackIndex);
  }

  function prevTrack() {
      if (isShuffle) {
          currentTrackIndex = Math.floor(Math.random() * tracks.length);
      } else {
          currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
      }
      loadTrack(currentTrackIndex);
  }

  function toggleShuffle() {
      isShuffle = !isShuffle;
      shuffleButton.style.color = isShuffle ? '#ddd' : '#fff';
  }

  function toggleLoop() {
      isLoop = !isLoop;
      audioPlayer.loop = isLoop;
      loopButton.style.color = isLoop ? '#ddd' : '#fff';
  }

  function updateVolume() {
      audioPlayer.volume = volumeControl.value / 100;
  }

  progressBar.addEventListener('input', () => {
      const value = progressBar.value;
      audioPlayer.currentTime = (value / 100) * audioPlayer.duration;
  });

  volumeControl.addEventListener('input', updateVolume);

  audioPlayer.addEventListener('timeupdate', updateProgress);
  audioPlayer.addEventListener('ended', () => {
      if (!isLoop) nextTrack();
  });

  playPauseButton.addEventListener('click', playPauseTrack);
  nextButton.addEventListener('click', nextTrack);
  prevButton.addEventListener('click', prevTrack);
  shuffleButton.addEventListener('click', toggleShuffle);
  loopButton.addEventListener('click', toggleLoop);

  loadTrack(currentTrackIndex);
});
let timeout;
const musicPlayer = document.querySelector('.music-player');

function showMusicPlayer() {
    musicPlayer.classList.remove('hidden');
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        musicPlayer.classList.add('hidden');
    }, 5000); // Hide after 5 seconds of inactivity
}

document.addEventListener('scroll', showMusicPlayer);
document.addEventListener('mousemove', showMusicPlayer);
document.addEventListener('keydown', showMusicPlayer);

// Initial hide after a few seconds
timeout = setTimeout(() => {
    musicPlayer.classList.add('hidden');
}, 5000);