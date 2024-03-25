import songs from './songsDATA.js';
import { createSongCard } from './createSongCard.js';
import { playingState } from './playingState.js';


let currentSongIndex = 0;

//////////////render songs

songs.forEach(song => {
    createSongCard(song.id, song.songName, song.artistName);
});

let songCards = document.querySelectorAll(".song-card");
songCards.forEach(songCard => {
    let songInfoi = songCard.querySelector(".song-info1 > span i");
    let controls = songCard.querySelector(".controls");
    let audio = songCard.querySelector(".song");
    let songName = songCard.querySelector(".song-name").textContent;
    let artistName = songCard.querySelector(".artist-name").textContent;

    songCard.addEventListener("mouseover", () => {
        songInfoi.style.display = "block";
    });

    songCard.addEventListener("mouseout", () => {
        songInfoi.style.display = "none";
    });

    songInfoi.addEventListener("click", () => {
        if (songInfoi.classList.contains("bx-play")) {
            play(audio, songInfoi, songCard, controls);
            songInfoi.style.display = "block";
            playingState(songName, artistName)
            songCard.classList.add("isPlaying")
            controls.style.visibility = "visible";
        } else {
            pause(audio, songInfoi);
            songInfoi.style.display = "block";
            controls.children[1].style.visibility = "hidden";
        }
    });

    audio.addEventListener('timeupdate', updateProgress);
});

/////play function

function play(audio, songInfoi, songCard, controls) {
    let allAudios = document.querySelectorAll(".song");
    allAudios.forEach(a => {
        if (a !== audio) {
            a.load();
            a.parentElement.parentElement.classList.remove("isPlaying")
           
            a.parentElement.parentElement.children[1].style.visibility = "hidden";
            let previousSibling = a.parentElement.parentElement.parentElement.previousElementSibling;
            if (previousSibling) {
                previousSibling.style.display = "none";
            }
            a.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.classList.add("bx-play")
            a.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.classList.remove(".bx-pause");
        }
    });
    audio.play();
    songInfoi.classList.remove("bx-play");
    songInfoi.classList.add("bx-pause");
}

/////pause function

function pause(audio, songInfoi) {
    audio.pause();
    songInfoi.classList.remove("bx-pause");
    songInfoi.classList.add("bx-play");
}

///recently played function

function recentlyPlayed() {
    let recent = [];

    let audioElements = document.querySelectorAll('.audio');
    
    audioElements.forEach(audio => {
        if (audio.played) {
            recent.push(audio);
        }
    });
    
    let div = document.querySelector('.recent-songs');
    
    recent.forEach(song => {
        div.appendChild(createSongCard(song));
    });
}

/////browse all function

function browseAll() {
    songs.forEach(song => {
        createSongCard(song.name, song.artistName);
    });
    
}

/////album function

function album() {
    songs.forEach(song => {
        createSongCard(song.name, song.artistName);
    });
    
}

////playlists function

function playlists() {
    songs.forEach(song => {
        createSongCard(song.name, song.artistName);
    });
    
}

////artists function

function artists() {
    songs.forEach(song => {
        createSongCard(song.name, song.artistName);
    });
    
}
//////favorites

function favorites() {
  let favorite = document.querySelector("i :has(.bx-heart)");
  if(favorite){
    console.log("favorited")
  }
    
}

////new playlist

function newPlaylist() {
    songs.forEach(song => {
        createSongCard(song.name, song.artistName);
    });
    
}

//////prev song

function prevSong(e) {
    function findPlayingParentDiv() {
        let allAudios = document.querySelectorAll("audio");
        for (let i = 0; i < allAudios.length; i++) {
            let audio = allAudios[i];
            if (!audio.paused && audio.currentTime > 0) {
                return audio.parentElement.parentElement; 
            }
        }
        return null; 
    }
    
    let playingParentDiv = findPlayingParentDiv();
    if (playingParentDiv && playingParentDiv.previousElementSibling && playingParentDiv.previousElementSibling.querySelector(".song-info1 > span i")) {
        playingParentDiv.previousElementSibling.querySelector(".song-info1 > span i").click();
    } else {
        playingParentDiv.parentElement.lastElementChild.querySelector(".song-info1 > span i").click();
    }
}

// Function to play the next song
function nextSong(e) {
    function findPlayingParentDiv() {
        let allAudios = document.querySelectorAll("audio");
        for (let i = 0; i < allAudios.length; i++) {
            let audio = allAudios[i];
            if (!audio.paused && audio.currentTime > 0) {
                return audio.parentElement.parentElement;
            }
        }
        return null;
    }
    
    let playingParentDiv = findPlayingParentDiv();

    if (playingParentDiv && playingParentDiv.nextElementSibling && playingParentDiv.nextElementSibling.querySelector(".song-info1 > span i")) {
        playingParentDiv.nextElementSibling.querySelector(".song-info1 > span i").click();
    } else {
        playingParentDiv.parentElement.firstElementChild.querySelector(".song-info1 > span i").click();
    }
}

// Function to shuffle the songs
function shuffle() {
    songs = shuffleArray(songs); // Shuffle the songs array
    console.log("Shuffled songs:", songs);
    // Implement logic to reflect shuffled songs in the UI if needed
}

// Function to toggle favorite status of the current song
function favorite() {
    let currentSong = songs[currentSongIndex];
    currentSong.isFavorite = !currentSong.isFavorite;
    if (currentSong.isFavorite) {
        console.log("Song is now favorite.");
        // Implement logic to reflect favorite status in the UI if needed
    } else {
        console.log("Song is no longer favorite.");
        // Implement logic to reflect favorite status in the UI if needed
    }
}

// Function to toggle repeat mode
let isRepeatOn = false; // Flag to indicate if repeat mode is on

function repeat() {
    isRepeatOn = !isRepeatOn;
    if (isRepeatOn) {
        console.log("Repeat mode is on.");
        // Implement logic to reflect repeat mode in the UI if needed
    } else {
        console.log("Repeat mode is off.");
        // Implement logic to reflect repeat mode in the UI if needed
    }
}

// Helper function to shuffle an array
function shuffleArray(array) {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

//////updateprogress function

function updateProgress(e){
    let progress = document.querySelector(".progress")
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}
///////setprogress

function setProgress(e){
    let width = this.clientWidth
    console.log(width)
}
////////event listeners//////////////////////////////////


document.addEventListener('click', function(event) {
 
    if (event.target.classList.contains('bx-skip-next')) {
        nextSong(event)
    }
    if (event.target.classList.contains('bx-skip-previous')) {
        prevSong(event)
    }
    if (event.target.classList.contains('bx-play')){
        let allAudios = document.querySelectorAll("audio");
        for (let i = 0; i < allAudios.length; i++) {
            let audio = allAudios[i];
            if (audio.played) {
                audio.parentElement.parentElement.querySelector('.song-info > span i').classList.remove('bx-play');
                audio.parentElement.parentElement.querySelector('.song-info > span i').classList.add('bx-pause');
            }else{
                audio.parentElement.parentElement.querySelector('.song-info > span i').classList.remove('bx-pause');
                audio.parentElement.parentElement.querySelector('.song-info > span i').classList.add('bx-play');
            }
        }
    }
});

/*
shufflE.addEventListener("click", function() {
    // Handle shuffle functionality
    shuffle()
    console.log("Shuffle clicked");
    // Implement your logic here
});

repeaT.addEventListener("click", function() {
    // Handle repeat functionality
    repeat()
    console.log("Repeat clicked");
    // Implement your logic here
});
heart.addEventListener("click", function() {
    // Handle repeat functionality
    favorite()
    console.log("Repeat clicked");
    // Implement your logic here
});
*/
