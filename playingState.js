let content = document.querySelector(".content");
function setProgress(e, audio) {
  let width = this.clientWidth;
  let clickX = e.offsetX;

  audio.addEventListener('loadedmetadata', function() {
      let duration = audio.duration;
      let currentTime = (clickX / width) * duration;
      audio.currentTime = currentTime;
      console.log(audio.currentTime); 
  });
}

function playingState(audio, songName, artistName){
    let playingState = document.createElement("div");
    playingState.classList.add("playing-state");
        let progresscon = document.createElement("div");
        progresscon.classList.add("progress-container");
          let progress = document.createElement("div");
          progress.classList.add("progress");
          progresscon.appendChild(progress);
        let songPlaying = document.createElement("div");
        songPlaying.classList.add("song-playing");
            let img = document.createElement("img");
            img.src = "./images/discImage.jpg";
            let songDetails = document.createElement("div");
            songDetails.classList.add("song-details");
                let h4 = document.createElement("h4");
                h4.classList.add("song-name");
                h4.textContent = songName;
                let p = document.createElement("p");
                p.classList.add("artist-name");
                p.textContent = artistName;
            songDetails.appendChild(h4);
            songDetails.appendChild(p);
        songPlaying.appendChild(img);
        songPlaying.appendChild(songDetails);
        let playingBot = document.createElement("div");
        playingBot.classList.add("playing-bot");
            let songDetailss = document.createElement("div");
            songDetailss.classList.add("song-details");
              let img1 = document.createElement("img");
              img1.src = "./images/discImage.jpg";
              let sub = document.createElement("div")
              sub.classList.add("sub");
                let h4ss = document.createElement("h4");
                h4ss.classList.add("song-name");
                h4ss.textContent = songName;
                let ps = document.createElement("p");
                ps.classList.add("artist-name");
                ps.textContent = artistName;
              sub.appendChild(h4ss);
              sub.appendChild(ps);
            songDetailss.appendChild(img1);
            songDetailss.appendChild(sub);
            let controlsPl = document.createElement("div");
            controlsPl.classList.add("controls-playing")
                let i = document.createElement("span");
                i.innerHTML = " <i class='bx bx-heart heart'></i>";
                let i1 = document.createElement("span");
                i1.innerHTML = " <i class='bx bx-sync'></i>";
                let i2 = document.createElement("span");
                i2.innerHTML = " <i class='bx bx-skip-previous bx-md'></i>";
                let i3 = document.createElement("span");
                i3.innerHTML = "<i class='bx bx-play bx-md'></i>";
                i3.classList.add('thePlayBtn')
                let i4 = document.createElement("span");
                i4.innerHTML = "<i class='bx bx-skip-next bx-md'></i>";
  
           
            controlsPl.appendChild(i1);
            controlsPl.appendChild(i2);
            controlsPl.appendChild(i3);
            controlsPl.appendChild(i4);
            controlsPl.appendChild(i);
            let volume = document.createElement("div");
            volume.classList.add("volume");
              let iv = document.createElement("span");
              iv.innerHTML = "<i class='bx bxs-volume-full'></i>";
              let vprogress = document.createElement("div");
              vprogress.classList.add("vprogress");
              let vprogressin = document.createElement("div");
              vprogressin.classList.add("progress-inside");
              vprogress.appendChild(vprogressin)
            volume.appendChild(iv);
            volume.appendChild(vprogress);
        playingBot.appendChild(songDetailss);
        playingBot.appendChild(controlsPl);  
        playingBot.appendChild(volume);
        playingBot.appendChild(progresscon);
    playingState.appendChild(songPlaying);
    playingState.appendChild(playingBot);    
    
    progresscon.addEventListener('click', setProgress.bind(progresscon, audio));

    let allSongs = content.querySelector(".all-songs");

    content.insertBefore(playingState, allSongs);
}  

export { playingState };