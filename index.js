import songs from './songsDATA.js';
import { createSongCard } from './createSongCard.js';
import { playingState } from './playingState.js';



let recently = document.querySelector('#recently-p');
let playlistsNav = document.querySelector('#playlists');
let artists = document.querySelector('#artists');
let favorites = document.querySelector('#favorites');
let searchInput = document.getElementById('search-fun');
let searchInputInput = document.getElementById('search-input');
let input = document.getElementById('search-input');




function getFileName(filePath) {
    // Remove the path and get the file name
    const fileNameWithExtension = filePath.split('/').pop();
    // Remove the extension from the file name
    const fileName = fileNameWithExtension.split('.').shift();
    return fileName;
}

//////////////render songs
function populateSongCards() {
    // Create song cards for all songs
    songs.forEach(song => {
        createSongCard(song.id, song.songName, song.artistName, ".all-songs");
    });
}
setupAudioListeners()
let currentlyPlayingAudio = null;

function initializeSongCardEvents() {
    let songCards = document.querySelectorAll(".song-card");
    songCards.forEach(songCard => {
        let songInfoi = songCard.querySelector(".song-info1 > span i");
        let controls = songCard.querySelector(".controls");
        let audio = songCard.querySelector(".song");
        let songName = songCard.querySelector(".song-name").textContent;
        let artistName = songCard.querySelector(".artist-name").textContent;
        let playing_state = songCard.querySelector(".playing-state");

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
            if(playing_state){playing_state.style.display = "none"}
            if (songInfoi.classList.contains("bx-play")) {
                // Check if another song is currently playing
                if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
                    pause(currentlyPlayingAudio, currentlyPlayingAudio.parentElement.querySelector(".song-info1 > span i"));
                }

                play(audio, songInfoi, songCard, controls);
                songInfoi.style.display = "block";
                // Update playback state only if it changes
                if (currentlyPlayingAudio !== audio) {
                    
                    playingState(audio, songName, artistName);
                    currentlyPlayingAudio = audio; // Set the currently playing audio
                }
                songCard.classList.add("isPlaying");
                controls.style.visibility = "visible";
            } else {
                pause(audio, songInfoi);
                songInfoi.style.display = "block";
                controls.children[1].style.visibility = "hidden";
                if (currentlyPlayingAudio === audio) {
                    currentlyPlayingAudio = null; // Reset currently playing audio
                }
            }
        });


    });
}

/////play function

function play(audio, songInfoi, songCard, controls) {
    if (audio.paused || audio.ended) {
        let allAudios = document.querySelectorAll(".song");
        allAudios.forEach(a => {
            if (a !== audio) {
                a.load();
                a.parentElement.parentElement.classList.remove("isPlaying")
                a.parentElement.parentElement.children[1].style.visibility = "hidden";
                a.parentElement.parentElement.children[1].children[1].style.visibility = "hidden";
                let previousSibling = a.parentElement.parentElement.parentElement.previousElementSibling;
                if (previousSibling) {
                    previousSibling.style.display = "none";
                }
                a.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.classList.add("bx-play")
                a.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.classList.remove(".bx-pause");
                a.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.style.display = 'none'
            }
        });
        audio.play().then(() => {
            songInfoi.classList.remove("bx-play");
            songInfoi.classList.add("bx-pause");
            controls.children[1].style.visibility = "visible";
        }).catch(error => {
            console.error('Error playing audio:', error);
        });
    
    }
}

/////pause function

function pause(audio, songInfoi) {
    audio.pause();
    songInfoi.classList.remove("bx-pause");
    songInfoi.classList.add("bx-play");
}

///////////recently played ///////////////



const playedAudios = [];

function markAudioAsPlayed(audio) {
    const audioId = getFileName(audio.src);
    if (!playedAudios.includes(audioId)) {
        playedAudios.push(audioId);
    }
}

function setupAudioListeners() {
    let audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.addEventListener('play', () => markAudioAsPlayed(audio));
        audio.addEventListener('seeking', ()=>console.log('seeking'));
        audio.addEventListener('timeupdate', updateProgress);

        audio.addEventListener('ended', nextSong);

        // audio.addEventListener('ended', () => {
        //     controls.children[1].style.visibility = "hidden";
        //     if (currentlyPlayingAudio === audio) {
        //         currentlyPlayingAudio = null; // Reset currently playing audio
        //     }
        // });
    });
}

function recentlyPlayed() {
    
    let content = document.querySelector('.content');
    if (!content) {
        console.error('.content element not found');
        return;
    }
    
    let allSongs = content.querySelector('.all-songs');
    if (!allSongs) {
        console.error('.all-songs element not found within .content');
        return;
    }
    
    // Display only the .all-songs element
    allSongs.style.display = 'block';
    allSongs.innerHTML = ''
    // Optionally clear other content if needed
    content.querySelectorAll(':not(.all-songs)').forEach(el => el.style.display="none");
    
    console.log('clicked')
    // Append song cards for each recently played audio
    if(playedAudios && playedAudios.length != 0){
    playedAudios.forEach(audioId => {
        let song = songs.find(song => song.id === audioId);
        if (song) {
            let { songName, artistName } = song;
    
            // Create and append song card
            let songCard = createSongCard(audioId, songName, artistName, ".all-songs");
            allSongs.appendChild(songCard);
        } else {
            console.warn('Song not found for ID:', audioId);
        }
        
    });
}else{
    allSongs.innerHTML = 'No played audio';
}
initializeSongCardEvents();
}

// Initialize page
function initializePage() {
    populateSongCards(); 

    setupAudioListeners();
    initializeSongCardEvents();
}

window.addEventListener('DOMContentLoaded', initializePage);


//////============favorites===========================////////////

let favorited = [];

function favoRites() {
        
    let content = document.querySelector('.content');
    if (!content) {
        console.error('.content element not found');
        return;
    }
    
    let favorites = content.querySelector('.favorites');
    if (!favorites) {
        console.error('.favorites element not found within .content');
        return;
    }
    
    // Display only the .all-songs element
    favorites.style.display = 'block';
    
    // Optionally clear other content if needed
    content.querySelectorAll(':not(.favorites)').forEach(el => el.style.display="none");
    
    
    if(favorited && favorited.length != 0){
        favorited.forEach(audioId => {
            let song = songs.find(song => song.id === audioId);
            if (song) {
                let { songName, artistName } = song;
        
                // Create and append song card
                let songCard = createSongCard(audioId, songName, artistName, '.favorites');
                favorites.appendChild(songCard);
                initializeSongCardEvents();
            } else {
                console.warn('Song not found for ID:', audioId);
            }
        });
    }else{
        favorites.innerHTML = 'No favorited song';
    }
    
}

favorites.addEventListener('click', favoRites);


// favorite toggle function

function favoriteToggle(event) {
    let allAudios = document.querySelectorAll("audio");
    for (let i = 0; i < allAudios.length; i++) {
        let audio = allAudios[i];
        if (audio.currentTime > 0) {
            let currentSong = audio;
            let filePath = currentSong.src
            let audioId = getFileName(filePath)
            currentSong.isFavorite = !currentSong.isFavorite;
            if (currentSong.isFavorite) {
                event.target.classList.add('isFavorite');
                favorited.push(audioId);
            } else {
                event.target.classList.remove('isFavorite')
                favorited = favorited.filter(song => song !== audioId);
                console.log(favorited)
            }
        }
    }
}



////new playlist

function createPlaylist(name, containerSelector) {
    let playlist = document.createElement('div');
    playlist.classList.add('playlist-card');
  
    let img = document.createElement('img');
    img.src = "./images/discImage.jpg";
    playlist.appendChild(img);
    
    let playlistName = document.createElement('p');
    playlistName.textContent = name;
    playlist.appendChild(playlistName);
    
    let container = document.querySelector(containerSelector);
    if (!container) {
        console.error(`Container ${containerSelector} not found.`);
        return null;
    }

    playlist.addEventListener('click', ()=>{
        container.innerHTML = ''
        let filteredSongs;
        if (name === 'allSongs') {
            filteredSongs = songs;
        } else {
            filteredSongs = songs.filter(song => song.artistName === name);
        }

        
        filteredSongs.forEach(song => {
            let playlistSong = createSongCard(song.id, song.songName, song.artistName, containerSelector);
            initializeSongCardEvents();
            container.appendChild(playlistSong)
        });
    })

    
    container.appendChild(playlist);
    
    return playlist;
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
            console.log('Checking audio:', audio);
            if (!audio.paused && audio.currentTime > 0) {
                // Check if the parent structure matches the expected pattern
                if (audio.parentElement && audio.parentElement.parentElement) {
                    console.log('Found playing parent div:', audio.parentElement.parentElement);
                    console.log('Audio paused:', audio.paused);
                    console.log('Audio current time:', audio.currentTime);
                    audio.addEventListener('loadeddata', () => console.log('Audio loaded'));
                    audio.addEventListener('play', () => console.log('Audio playing'));
                    audio.addEventListener('error', (e) => console.error('Audio error:', e));
                    return audio.parentElement.parentElement;
                }
            }
        }
        return null;
    }
    
    let playingParentDiv = findPlayingParentDiv();
    console.log(playingParentDiv)

    if (playingParentDiv && playingParentDiv.nextElementSibling && playingParentDiv.nextElementSibling.querySelector(".song-info1 > span i")) {
        playingParentDiv.nextElementSibling.querySelector(".song-info1 > span i").click();
    } else {
        playingParentDiv.parentElement.firstElementChild.querySelector(".song-info1 > span i").click();
    }
}



// repeat function
let isRepeatOn = false; 

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
     
        e.target.style.color = "black"
    }
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
    if (event.target.classList.contains('heart')) {
        favoriteToggle(event)
        
    }
    if (event.target.classList.contains('bxs-volume-full')) {
        let vprogress=document.querySelector('.vprogress');
        vprogress.classList.toggle('active')
        
    }
});

artists.addEventListener('click', () => {
    let content = document.querySelector('.content');

    content.querySelectorAll(':not(.artists)').forEach(el => el.style.display="none");
    let artistCont = document.querySelector('.artists');

    let artistCounts = songs.reduce((counts, song) => {
        counts[song.artistName] = (counts[song.artistName] || 0) + 1;
        return counts;
    }, {});

    let duplicateArtists = Object.keys(artistCounts).filter(artistName => {
        return artistCounts[artistName] > 1;
    });

        // Clear the container once before adding new playlists
        artistCont.innerHTML = ''; 
        artistCont.style.display = "grid";
        artistCont.classList.add('playlist-container');

    duplicateArtists.forEach(artistName => {
        let playlist = createPlaylist(artistName, ".artists");
        artistCont.appendChild(playlist)
    })
});


recently.addEventListener('click', recentlyPlayed)

playlistsNav.addEventListener('click', () => {
    let content = document.querySelector('.content');
    
    content.querySelectorAll(':not(.playlists)').forEach(el => el.style.display="none");
    let playlists = document.querySelector('.playlists');
    playlists.style.display = "grid";
    let playlist = createPlaylist("allSongs", ".playlists");
    playlists.appendChild(playlist)
});

/////////search functionality

searchInput.addEventListener('click', searchOnEnter);


searchInputInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        searchOnEnter(); 
    }
});




    let searchTimeout;
    function searchOnEnter() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            let query = input.value.toLowerCase().trim();
            let neighbour = document.querySelector('.playing-state')

            if(neighbour){
                neighbour.style.display = 'none';
            }
            let content = document.querySelector('.content');
        
            content.querySelectorAll(':not(.all-songs)').forEach(el => el.style.display="none");
           
            let searchResultsContainer = document.querySelector('.all-songs');
            searchResultsContainer.innerHTML = '';
    
            let matchingSongs = songs.filter(song => {
                return (
                    song.songName.toLowerCase().includes(query) ||
                    song.artistName.toLowerCase().includes(query)
                );
            });
    
            if (matchingSongs.length === 0 || query == "") {
                searchResultsContainer.innerHTML = 'No matching songs found.';
            } else {
                matchingSongs.forEach(song => {
                    createSongCard(song.id, song.songName, song.artistName, '.all-songs');
                });
            }
    
            initializeSongCardEvents(); // Ensure events are re-initialized
            input.value = ''
        }, 300); // Adjust delay as needed
    }
 
///////////////////////////////////////MOBILE/////////////////////////////////////////////////

let mobileNav = document.querySelector('.mobile-nav')
let hamburger = document.querySelector('.bx-menu-alt-right')
let mobileMenu = document.querySelector('.menu-mobile')
let searchbtn = document.querySelector('.bx-search')
let mobileInput = document.querySelector('.mobile-search')
let allMenu = document.querySelector('.all-menu')
let desktopMenu = document.querySelector('.desktop-nav')

window.addEventListener('scroll', ()=>{
    if(scrollY > 10){
        mobileNav.style.backgroundColor = "white"
    }else{
        mobileNav.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
    }
})


hamburger.addEventListener('click', () => {
    
    mobileMenu.classList.toggle('active');
    if (mobileMenu.classList.contains('active')) {
        mobileMenu.appendChild(allMenu); 
        hamburger.classList.remove('bx-menu-alt-right')
        hamburger.classList.add('bx-x')
    }else{
    desktopMenu.appendChild(allMenu)
    hamburger.classList.remove('bx-x')
    hamburger.classList.add('bx-menu-alt-right')
    }
});

let navLinks = document.querySelectorAll('.all-menu p, .all-menu a, .all-menu li');

navLinks.forEach(nav=> nav.addEventListener('click', ()=>{
    mobileMenu.classList.remove('active');
    hamburger.classList.remove('bx-x')
    hamburger.classList.add('bx-menu-alt-right') 
}))

let miniNav = document.querySelector('.mini-nav');
let miniSearch = document.querySelector('.mini-search');

searchbtn.addEventListener('click', ()=>{

    if(mobileNav){
        mobileInput.classList.toggle('active')
    }else{
        mobileInput.classList.remove('active')
    }
   

    if (mobileInput.classList.contains('active')) {
        mobileInput.appendChild(miniSearch); 
    }else{
            let greeting = document.querySelector('.greeting')

            miniNav.insertBefore(miniSearch, greeting)
    }

})


