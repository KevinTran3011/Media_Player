const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevbtn = document.getElementById('prev');
const playbtn = document.getElementById('play');
const nextbtn = document.getElementById('next');


// Music
// crate a song object
const songs = [
    {
        name: 'I can\'t stop me',
        display: 'I can\'t stop me',
        artist: 'Twice'
    },
    {
        name: 'TruE',
        display: 'TruE',
        artist: 'Mihoyo'
    },
    {
        name: 'Racing into The Night',
        display: 'Racing into The Night',
        artist: 'Yoasobi'
    },

    {
        name: 'Time of victory',
        display: 'Time of victory',
        artist: 'Kamen Rider Girls'
    },
]

// Check if playing
let isPlaying = false;

// Play song
const playSong = () => {
  isPlaying = true;

//   change the play button into the pause button when play
  playbtn.classList.replace('fa-circle-play', 'fa-pause');
  playbtn.setAttribute('title', 'Pause')
  music.play();
}

// Pause song
const pauseSong = () => {
  isPlaying = false;
  //   change the play button into the pause button when play
  playbtn.classList.replace('fa-pause', 'fa-circle-play');
  playbtn.setAttribute('title', 'Play')

  music.pause();
}

// Play or pause
playbtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM 

const loadSong = (song) =>{
    title.textContent = song.display;;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//Current SOng
let songIndex = 0;


// Previous

const prevSong = ()=>{
    songIndex--;
    if( songIndex < 0 ){
        songIndex = songs.length -1
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}


// next song

const nextSong = ()=>{
    songIndex++;
    if ( songIndex > songs.length -1){
        songIndex = 0
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

//On load- select the first song
 loadSong(songs[0]);





// update Progress bar and time
const updateProgressBar = (e)=>{
    if(isPlaying){
        const{duration, currentTime} = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        // set the css progress bar based on the percentage of the song
        progress.style.width = `${progressPercent}%`
        // claculate diaplay duration
        const durationMinute = Math.floor(duration / 60);
        //calculate the second
        let durationSeconds = Math.floor(duration%60)
        durationSeconds<10? durationSeconds = `0${durationSeconds}`: durationSeconds = durationSeconds ;
        

        // delay switching to avoid NaN
        if(durationSeconds){
            durationEl.textContent = `${durationMinute}:${durationSeconds} `
        } 

        //change the curent time dynamically

        // claculate diaplay current
        const currentMinute = Math.floor(currentTime / 60);
        //calculate the second
        let currentSeconds = Math.floor(currentTime%60);
        currentSeconds<10? currentSeconds = `0${currentSeconds}`: currentSeconds = currentSeconds ;
        

        currentTimeEl.textContent = `${currentMinute}:${currentSeconds} `

         
    }

}

// Set progress bar so that you can control the progress bar

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
  }
  
 
 // Previous button
prevbtn.addEventListener('click', prevSong);
nextbtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong)
progressContainer.addEventListener('click', setProgressBar);