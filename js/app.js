const playlistContainer = document.querySelector(".playlist");
const songTitle = document.querySelector(".song-title");
const songArtist = document.querySelector(".song-artist");
const audio = document.querySelector(".audio");
const albumArt = document.querySelector(".album-art");
const playBtn = document.querySelector(".play-btn");
const nextBtn = document.querySelector(".next-btn");
const progressWrapper=document.querySelector(".player-progress");
const progress=document.querySelector(".progress");
const trackDuration = document.querySelector(".duration");
const trackCurrentTime = document.querySelector(".current-time");
let currentSongIndex = 0;
const prevBtn = document.querySelector(".prev-btn");
let isPlaying = false;
const playlist = [  
{
    'artist':"Genuwine",
    'title':"I am Sorry",
    'track':"./assets/songs/sorry.mp3",
    'duration':"4:13",
    'albumArt':"./assets/images/genuwine.jpg"
},
{
    'artist':"Babyface",
    'title':"Lonliness",
    'track':"./assets/songs/loneliness.mp3",
    'duration':"3:53",
    'albumArt':"./assets/images/lonliness.jpg"
},
{
    'artist':"Lionel Ritchie",
    'title':"Hello",
    'track':"./assets/songs/hello.mp3",
    'duration':"5.26",
    "albumArt":"./assets/images/hello.jpg"
},
{
    'artist':"Craig David",
    'title':"Walking Away",
    'track':"./assets/songs/away.mp3",
    'duration':"3.31",
    "albumArt":"./assets/images/away.jpg"
},
{
    'artist':"Michael Bolton",
    'title':"Said I Loved You",
    'track':"./assets/songs/love.mp3",
    'duration':"5:02",
    "albumArt":"./assets/images/michael-bolton.webp"
},
{
    'artist':"Lionel Ritchie",
    'title':"I Call It Love",
    'track':"./assets/songs/call.mp3",
    'duration':"3:23",
    "albumArt":"./assets/images/call.jpg"
}
,{
    'artist':"Reuben Stardart",
    'title':"Sorry 2004",
    'track':"./assets/songs/sorry-2004.mp3",
    'duration':"4:17",
    "albumArt":"./assets/images/sorry.jpg"
}
];
function showCurrentSong(){
    const active = document.querySelector('li.active');

    if(active){
        active.classList.remove('active');
    }else{
        playlistContainer.children[currentSongIndex].classList.add('active');
    }
}

function loadSong(index){
    const song=playlist[index];
    songTitle.textContent=song.title;
    songArtist.textContent=`- ${song.artist} -`;
    audio.src = song.track;
    trackDuration.textContent=song.duration;
    albumArt.src=song.albumArt;
    showCurrentSong();
    
}

playlist.map(index=>{
    let playlistHTML = ''
    playlistHTML = `<li><span>${index.title}</span><span>${index.duration}</span></li>`;

    playlistContainer.innerHTML +=playlistHTML;
})


function playSong(){
    isPlaying = true;
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    playBtn.title = "Pause Music"
}

function pauseSong(){
    isPlaying = false;
    audio.pause();
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    playBtn.title = "Play Music"
}
function playNextSong(){
    if(currentSongIndex == playlist.length-1){
        currentSongIndex=playlist.length-1;
    }else{
    currentSongIndex++
    loadSong(currentSongIndex);
    playSong();
    showCurrentSong();
  }
}
function playPrevSong(){
    if(currentSongIndex == 0){
        currentSongIndex=0
    }else{
    currentSongIndex--
    loadSong(currentSongIndex);
    playSong();
    showCurrentSong();
  }
}

function updateProgressBar(e){
    if(isPlaying){
        const{duration,currentTime}=e.srcElement;
        const progressPercentage = (currentTime/duration)*100;
        progress.style.width=`${progressPercentage}%`;
    
    const trackDurationMinutes = Math.floor(duration/60);
    let trackDurationSeconds = Math.floor(duration%60);
    if(trackDurationSeconds < 10){
        trackDurationSeconds=`0${trackDurationSeconds}`;
    }
    if(trackDurationSeconds){

    trackDuration.textContent =`${trackDurationMinutes}:${trackDurationSeconds}`;

    const currentTrackMinutes = Math.floor(currentTime/60);
    let currentTrackSeconds = Math.floor(currentTime%60);
    if(currentTrackSeconds < 10){
        currentTrackSeconds=`0${currentTrackSeconds}`;
    }
    if(currentTrackSeconds){

    trackCurrentTime.textContent =`${currentTrackMinutes}:${currentTrackSeconds}`;
   }
   if(duration == trackCurrentTime.innerText){
    playNextSong();
   }
 }
}
}

function setProgressBar(e){
    const  width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX/width)*duration;

}

playBtn.addEventListener("click",()=>(isPlaying ? pauseSong():playSong()));
nextBtn.addEventListener("click",playNextSong);
prevBtn.addEventListener("click",playPrevSong);
audio.addEventListener("timeupdate",updateProgressBar);
progressWrapper.addEventListener("click",setProgressBar);



loadSong(currentSongIndex);

