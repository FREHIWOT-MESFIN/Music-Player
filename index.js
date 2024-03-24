import songs from './songsDATA.js'

let allSongs = document.querySelector(".all-songs");
let playingState = document.querySelector(".playing-state");


songs.forEach(song => {
    createSongCard(song.id, song.songName, song.artistName);
});

function createSongCard(id, songName, artistName) {
    let songCard = document.createElement("div");
    songCard.classList.add("song-card");

    let songInfo1 = document.createElement("div");
    songInfo1.classList.add("song-info1");
    let i = document.createElement("span");
    i.innerHTML = "<i class='bx bx-play bx-sm'></i>"
    let img = document.createElement("img");
    img.src = "./images/discImage.jpg"
    let songDetails = document.createElement("div");
    songDetails.classList.add("song-details");
    let songNameElem = document.createElement("h4");
    songNameElem.classList.add("song-name");
    songNameElem.textContent = songName;
    let artistNameElem = document.createElement("p");
    artistNameElem.classList.add("artist-name");
    artistNameElem.textContent = artistName;
    songDetails.appendChild(songNameElem);
    songDetails.appendChild(artistNameElem);
    let songEle = document.createElement("audio");
    songEle.classList.add("song");
    songEle.src = `./audios/${id}.mp3`;
    let controls = document.createElement("div");
    controls.classList.add("controls");
    let heart = document.createElement("span");
    heart.innerHTML = "<i class='bx bx-heart'></i>"
    let wave = document.createElement("div");
    wave.classList.add("wave")
    controls.appendChild(heart);
    controls.appendChild(wave);
    songInfo1.appendChild(i);
    songInfo1.appendChild(img);
    songInfo1.appendChild(songDetails);
    songInfo1.appendChild(songEle);

    songCard.appendChild(songInfo1);
    songCard.appendChild(controls);
    allSongs.appendChild(songCard);
}

let songCards = document.querySelectorAll(".song-card");
songCards.forEach(songCard => {
    let songInfoi = songCard.querySelector(".song-info1 > span i");
    let controls = songCard.querySelector(".controls");
    let audio = songCard.querySelector(".song");
   

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
            playingState.style.display = "block";
            songCard.classList.add("isPlaying")
            controls.style.visibility = "visible";
        } else {
            pause(audio, songInfoi);
            songInfoi.style.display = "block";
            controls.children[1].style.visibility = "hidden";
        }
    });
});

function play(audio, songInfoi, songCard, controls) {
    let allAudios = document.querySelectorAll(".song");
    allAudios.forEach(a => {
        if (a !== audio) {
            a.load();
            playingState.style.display = "none";
            a.parentElement.parentElement.classList.remove("isPlaying")
            console.log(a.parentElement.parentElement)
            a.parentElement.parentElement.children[1].style.visibility = "hidden";
            console.log(a.previousElementSibling)
            a.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.classList.add("bx-play")
            a.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.classList.remove(".bx-pause");
        }
    });
    audio.play();
    songInfoi.classList.remove("bx-play");
    songInfoi.classList.add("bx-pause");
}

function pause(audio, songInfoi) {
    audio.pause();
    songInfoi.classList.remove("bx-pause");
    songInfoi.classList.add("bx-play");
}

function recentlyPlayed() {
    let recent = [];

    let audioElements = document.querySelectorAll('.audio');
    
    // Loop through each audio element to check if it has been played
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
function browseAll() {
    songs.forEach(song => {
        createSongCard(song.name, song.artistName);
    });
    
}
function album() {
    songs.forEach(song => {
        createSongCard(song.name, song.artistName);
    });
    
}
function playlists() {
    songs.forEach(song => {
        createSongCard(song.name, song.artistName);
    });
    
}
function artists() {
    songs.forEach(song => {
        createSongCard(song.name, song.artistName);
    });
    
}
function favorites() {
  let favorite = document.querySelector("i :has(.bx-heart)");
  if(favorite){
    console.log("favorited")
  }
    
}
favorites();
function newPlaylist() {
    songs.forEach(song => {
        createSongCard(song.name, song.artistName);
    });
    
}
let prev = document.querySelector(".bx-skip-previous");
let next = document.querySelector(".bx-skip-next");
let shufflE = document.querySelector(".bx-shuffle");
let repeaT = document.querySelector(".bx-sync");

prev.addEventListener("click", function() {
    // Handle previous song functionality
    prevSong()
    console.log("Previous song clicked");
    // Implement your logic here
});

next.addEventListener("click", function() {
    // Handle next song functionality
    nextSong()
    console.log("Next song clicked");
    // Implement your logic here
});

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
let currentSongIndex = 0; // Keep track of the index of the currently playing song

// Function to play the next song
function nextSong() {
    pause(audio, songInfoi); // Pause the currently playing song
    currentSongIndex = (currentSongIndex + 1) % songs.length; // Calculate the index of the next song
    let nextSong = songs[currentSongIndex]; // Get the next song from the songs array
    playNextOrPrevSong(nextSong); // Play the next song
}

// Function to play the previous song
function prevSong() {
    pause(audio, songInfoi); // Pause the currently playing song
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Calculate the index of the previous song
    let prevSong = songs[currentSongIndex]; // Get the previous song from the songs array
    playNextOrPrevSong(prevSong); // Play the previous song
}

// Function to handle playing the next or previous song
function playNextOrPrevSong(song) {
    let songName = song.name;
    let artistName = song.artistName;

    // Create and play the audio element for the next or previous song
    let audio = new Audio(`./audios/${songName}.mp3`);
    createSongCard(songName, artistName);
    play(audio, songInfoi, songCard, controls);
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

