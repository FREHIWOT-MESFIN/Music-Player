let allSongs = document.querySelector(".all-songs");
let playingState = document.querySelector(".playing-state");
let songs = [
    { name: "song1", artistName: "Artist 1", isFavorite: false },
    { name: "song2", artistName: "Artist 2", isFavorite: false  },
    { name: "song3", artistName: "Artist 3", isFavorite: false  },
    { name: "song4", artistName: "Artist 4", isFavorite: false  },
    { name: "song5", artistName: "Artist 5", isFavorite: false  },
    { name: "song6", artistName: "Artist 6", isFavorite: false  }
];

songs.forEach(song => {
    createSongCard(song.name, song.artistName);
});

function createSongCard(songName, artistName) {
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
    songEle.src = `./audios/${songName}.mp3`;
    let controls = document.createElement("div");
    controls.classList.add("controls");
    let prev = document.createElement("i");
    prev.classList.add("bx", "bx-skip-previous");
    let play = document.createElement("i");
    play.classList.add("bx", "bx-play");
    let pause = document.createElement("i");
    pause.classList.add("bx", "bx-pause");
    controls.appendChild(prev);
    controls.appendChild(play);
    controls.appendChild(pause);
    songInfo1.appendChild(i);
    songInfo1.appendChild(img);
    songInfo1.appendChild(songDetails);
    songInfo1.appendChild(songEle);
    songInfo1.appendChild(controls);

    songCard.appendChild(songInfo1);
    allSongs.appendChild(songCard);
}

let songCards = document.querySelectorAll(".song-card");
songCards.forEach(songCard => {
    let songInfoi = songCard.querySelector(".song-info1 > span i");
    let audio = songCard.querySelector(".song");
   

    songCard.addEventListener("mouseover", () => {
        songInfoi.style.display = "block";
    });

    songCard.addEventListener("mouseout", () => {
        songInfoi.style.display = "none";
    });

    songInfoi.addEventListener("click", () => {
        if (songInfoi.classList.contains("bx-play")) {
            play(audio, songInfoi);
            playingState.style.display = "block";
        } else {
            pause(audio, songInfoi);
        }
    });
});

function play(audio, songInfoi) {
    let allAudios = document.querySelectorAll(".song");
    allAudios.forEach(a => {
        if (a !== audio && !a.paused) {
            a.load();
            playingState.style.display = "none";
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