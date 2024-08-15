let allSongs = document.querySelector(".all-songs");


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
    heart.innerHTML = "<i class='bx bx-heart heart'></i>"
    let wave = document.createElement("div");
    wave.classList.add("wave")
    let duration = document.createElement("div")
    duration.classList.add("duration")
    songEle.addEventListener('loadedmetadata', function() {
        
    let totalSeconds = Math.floor(songEle.duration);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    duration.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    });
    controls.appendChild(heart);
    controls.appendChild(wave);
    songInfo1.appendChild(i);
    songInfo1.appendChild(img);
    songInfo1.appendChild(songDetails);
    songInfo1.appendChild(songEle);

    songCard.appendChild(songInfo1);
    songCard.appendChild(controls);
    songCard.appendChild(duration);
    allSongs.appendChild(songCard);
    return songCard
}
export { createSongCard };