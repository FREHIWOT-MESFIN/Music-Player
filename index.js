





let allSongs =document.querySelector(".all-songs");
let songs=["song1", "song2", "song3", "song4", "song5", "song6"]
 
songs.forEach(song=>{
    createSongCard(song)
})


function createSongCard(song){
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
                let songName = document.createElement("h4");
                songName.classList.add("song-name");
                songName.textContent = "prop.name"
                let artistName = document.createElement("p");
                artistName.classList.add("artist-name");
                artistName.textContent = "prop.artistName"
            songDetails.appendChild(songName);
            songDetails.appendChild(artistName);
            let songEle = document.createElement("audio");
            songEle.classList.add("song");
            songEle.src = `./audios/${song}.mp3`
            let controls = document.createElement("div");
          /*  controls.classList.add("controls");
                let prev = document.createElement("i");
                prev.classList.add("bx bx-skip-previous");
                let play = document.createElement("i");
                play.classList.add("bx bx-play");
                let pause = document.createElement("i");
                pause.classList.add("bx bx-skip-next");
             controls.appendChild(prev);
             controls.appendChild(play);
             controls.appendChild(pause);*/
            songInfo1.appendChild(i);
            songInfo1.appendChild(img);
            songInfo1.appendChild(songDetails);
            songInfo1.appendChild(songEle);
           // songInfo1.appendChild(controls);
        let songInfo2 = document.createElement("div");
        songInfo2.classList.add("song-info2");
            let albumName = document.createElement("p");
            albumName.textContent = "Album name"
            songInfo2.appendChild(albumName);
        let duration = document.createElement("div");
        duration.classList.add("duration");
        duration.textContent = "3:00"
    songCard.appendChild(songInfo1);
    songCard.appendChild(songInfo2);
    songCard.appendChild(duration);
    allSongs.appendChild(songCard)
}





document.querySelectorAll(".song-card").forEach(songCard => {
    let songInfoi = songCard.querySelector(".song-info1 > span i");
    let audio = songCard.querySelector(".song");
    let playingState = document.querySelector(".playing-state");

    songCard.addEventListener("mouseover", () => {
        songInfoi.style.display = "block";
    });

    songCard.addEventListener("mouseout", () => {
        songInfoi.style.display = "none";
    });

    songInfoi.addEventListener("click", () => {
        if (songInfoi.classList.contains("bx-play")) {
            audio.play();
            playingState.style.display = "block";
            songInfoi.classList.remove("bx-play");
            songInfoi.classList.add("bx-pause");
        } else {
            audio.pause();
            playingState.style.display = "none";
            songInfoi.classList.remove("bx-pause");
            songInfoi.classList.add("bx-play");
        }
    });
});