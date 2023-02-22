let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let prev_track = document.querySelector(".prev-track");
let pauseplay_track = document.querySelector(".pauseplay-track");
let next_track = document.querySelector(".next-track");

let seek_slider = document.querySelector(".seek-slider");
let volume_slider = document.querySelector(".volume-slider");

let current_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false ;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [{
    name: "Lae Dooba",
    artist: "Sunidhi Chauhan",
    image: "Lae_dooba.jpg",
    path: "Lae_dooba.mp3"
},
{
    name: "Tu Hai Ki Nahi",
    artist: "Ankit Tiwari",
    image: "Tu_hai_ki_nahi.jpg",
    path: "Tu_hai_ki_nahi.mp3"
},
{
    name: "Challa",
    artist: "Rabbi Shergill",
    image: "Challa.jpg",
    path: "Challa.mp3"
}];

function loadTrack(track_index) {
    let updateTimer;
    clearInterval(updateTimer); 
    resetValues();

    curr_track.src = track_list[track_index].path;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = "PLAYING " + (track_index+1) + " OF " + (track_list.length) ;

     updateTimer = setInterval(seekUpdate, 1000);   

    curr_track.addEventListener("ended", nextTrack);

    random_bg_color();
}

function random_bg_color() {
    let red = Math.floor(Math.random() * 256) + 64 ;
    let green = Math.floor(Math.random() * 256) + 64 ;
    let blue = Math.floor(Math.random() * 256) + 64 ;

    let bgColor = "rgb(" + red + "," + green + "," + blue + ")"

    document.body.style.background = bgColor;
}

function resetValues() {
    current_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0 ;
}

function pausePlayTrack() {
    if(!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack(){
    curr_track.play();
    isPlaying = true ;
    pauseplay_track.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>'
}

function pauseTrack(){
    curr_track.pause();
    isPlaying = false ;
    pauseplay_track.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>'
}

function prevTrack(){
    if(track_index < 0){
        track_index = track_index - 1;
    }
    else track_index = track_list.length - 1;
    loadTrack(track_index);
    playTrack();
}

function nextTrack(){
    if(track_index<track_list.length-1){
        track_index = track_index + 1;
    }
    else track_index = 0;
    loadTrack(track_index);
    playTrack();
}

// code to delete later //

function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
   let seekto = curr_track.duration * (seek_slider.value / 100);
   
    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
  }
   
  function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
  }
   
  function seekUpdate() {
    let seekPosition = 0;
   
    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_slider.value = seekPosition;
   
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
   
      // Add a zero to the single digit time values
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
   
      // Display the updated duration
      current_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }






// code to delete later // 


loadTrack(track_index);
