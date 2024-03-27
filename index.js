import songs from './songsDATA.js';
import { createSongCard } from './createSongCard.js';
import { playingState } from './playingState.js';

let recently = document.querySelector('#recently-p');
let browse = document.querySelector('#b-all');
let playlists = document.querySelector('#playlists');
let artists = document.querySelector('#artists');
let favorites = document.querySelector('#favorites');

let currentSongIndex = 0;
let favorited = [];

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

    songCard.addEventListener("mouseenter", () => {
        songInfoi.style.display = "block";
    });

   songCard.addEventListener("mouseleave", () => {
        if (!songCard.classList.contains("isPlaying")) {
            songInfoi.style.display = "none";
        }
    });
    if (!songCard.classList.contains("isPlaying")) {
        songInfoi.style.display = "none";
    }
    songInfoi.addEventListener("click", () => {
        if (songInfoi.classList.contains("bx-play")) {
            play(audio, songInfoi, songCard, controls);
            songInfoi.style.display = "block";
            playingState(audio, songName, artistName)
            songCard.classList.add("isPlaying")
            controls.style.visibility = "visible";
            controls.children[1].style.visibility = "visible";
        } else {
            pause(audio, songInfoi);
            songInfoi.style.display = "block";
            controls.children[1].style.visibility = "hidden";
        }
    });
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong)
   console.log(audio.currentTime)
});

/////play function

function play(audio, songInfoi, songCard, controls) {
    if (audio.paused || audio.ended) {
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
                a.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.style.display = 'none'
            }
        });
        audio.play();
        songInfoi.classList.remove("bx-play");
        songInfoi.classList.add("bx-pause");
    }
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
        if (audio.currentTime > 0) {
            recent.push(audio);
        }
    });
    
    let div = document.querySelector('.content');
    div.innerHTML = '';
    
    recent.forEach(song => {
        div.appendChild(createSongCard(song));
    });
}


/////browse all function

function browseAll() {
  
}


////playlists function

function playLists() {
    songs.forEach(song => {
        createSongCard(song.id, song.songName, song.artistName);
    });
    
}

//////favorites

function favoRites() {
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
            if (audio.currentTime > 0) {
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
            if (audio.currentTime > 0) {
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

function favorite(e) {
    let currentSong = songs[currentSongIndex];
    currentSong.isFavorite = !currentSong.isFavorite;
    if (currentSong.isFavorite) {
        console.log("Song is now favorite.");
        e.target.classList.add('isFavorite');
        favorited.push(currentSong);
    } else {
        console.log("Song is no longer favorite.");
        e.target.classList.remove('isFavorite');
        // Remove the current song from the favorited array
        favorited = favorited.filter(song => song !== currentSong);
    }
}


// Function to toggle repeat mode
let isRepeatOn = false; // Flag to indicate if repeat mode is on

function repeat(e) {
    isRepeatOn = !isRepeatOn;
    if (isRepeatOn) {
        console.log("Repeat mode is on.");
        let allAudios = document.querySelectorAll("audio");
        for (let i = 0; i < allAudios.length; i++) {
            let audio = allAudios[i];
            if (audio.currentTime > 0) {
                audio.addEventListener('ended', ()=>{audio.play()})
                e.target.style.color = "orange"
            }
        }
      
    } else {
        console.log("Repeat mode is off.");
        // Implement logic to reflect repeat mode in the UI if needed
        e.target.style.color = "black"
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
    let progress = document.querySelectorAll(".progress")
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.forEach(pro=>  pro.style.width = `${progressPercent}%`)
  
}

////////event listeners//////////////////////////////////


document.addEventListener('click', function(event) {
 
    if (event.target.classList.contains('bx-skip-next')) {
        nextSong(event)
    }
    if (event.target.classList.contains('bx-skip-previous')) {
        prevSong(event)
    }
    if (event.target.classList.contains('bx-shuffle')) {
        shuffle()
    }
    if (event.target.classList.contains('bx-sync')) {
        repeat()
    }
    if (event.target.classList.contains('bx-heart')) {
       favorite()
    }
});

artists.addEventListener('click', () => {
    let content = document.querySelector('.content');
    content.innerHTML = '';

    let artistCounts = songs.reduce((counts, song) => {
        counts[song.artistName] = (counts[song.artistName] || 0) + 1;
        return counts;
    }, {});

    let duplicateArtists = Object.keys(artistCounts).filter(artistName => {
        return artistCounts[artistName] > 1;
    });

    duplicateArtists.forEach(artistName => {
        let filteredSongs = songs.filter(song => song.artistName === artistName);
        
        filteredSongs.forEach(song => {
            createSongCard(song.songName, song.artistName);
        });
    });
});

recently.addEventListener('click', recentlyPlayed)
browse.addEventListener('click', browseAll)

let searchInput = document.getElementById('search-fun');
let input = document.getElementById('search-input');
searchInput.addEventListener('click', function() {
    let query = input.value.toLowerCase().trim();

    let neighbour = document.querySelector('.playing-state')
    if(neighbour){
        neighbour.innerHTML = '';
    }
    
    let searchResultsContainer = document.querySelector('.all-songs')
    searchResultsContainer.innerHTML = '';

    let matchingSongs = songs.filter(song => {
        return (
            song.songName.toLowerCase().includes(query) ||
            song.artistName.toLowerCase().includes(query)
        );
    });

    if (matchingSongs.length === 0 || query == "") {
        let noResultsMessage = document.createElement('div');
        noResultsMessage.textContent = 'No matching songs found.';
        searchResultsContainer.appendChild(noResultsMessage);
    } else {
        matchingSongs.forEach(song => {
            createSongCard(song.id, song.songName, song.artistName);
        });
    }

    let songCards = document.querySelectorAll(".song-card");
    songCards.forEach(songCard => {
        let songInfoi = songCard.querySelector(".song-info1 > span i");
        let controls = songCard.querySelector(".controls");
        let audio = songCard.querySelector(".song");
        let songName = songCard.querySelector(".song-name").textContent;
        let artistName = songCard.querySelector(".artist-name").textContent;
    
        songCard.addEventListener("mouseenter", () => {
            songInfoi.style.display = "block";
        });
    
       songCard.addEventListener("mouseleave", () => {
            if (!songCard.classList.contains("isPlaying")) {
                songInfoi.style.display = "none";
            }
        });
        
    
        songInfoi.addEventListener("click", () => {
            if (songInfoi.classList.contains("bx-play")) {
                play(audio, songInfoi, songCard, controls);
                songInfoi.style.display = "block";
                playingState(audio, songName, artistName)
                songCard.classList.add("isPlaying")
                controls.style.visibility = "visible";
            } else {
                pause(audio, songInfoi);
                songInfoi.style.display = "block";
                controls.children[1].style.visibility = "hidden";
            }
        });
        
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', nextSong)

    });
    
    console.log('logged');
});

///////////////
let mobileNav = document.querySelector('.mobile-nav')
let hamburger = document.querySelector('.bx-menu-alt-right')

window.addEventListener('scroll', ()=>{
    if(scrollY > 20){
        mobileNav.style.backgroundColor = "white"
    }else{
        mobileNav.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
    }
})