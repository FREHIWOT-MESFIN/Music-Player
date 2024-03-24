let content = document.querySelector(".content")

function playingState(){
    let playingState = document.createElement("div");
    playingState.classList.add("playing-state");
        let progress = document.createElement("div");
        progress.classList.add("progress");
        let songPlaying = document.createElement("div");
        songPlaying.classList.add("song-playing");
            let img = document.createElement("img");
            img.src = "./images/discImage.jpg";
            let songDetails = document.createElement("div");
            songDetails.classList.add("song-details");
                let h4 = document.createElement("h4");
                h4.classList.add("song-name");
                let p = document.createElement("p");
                p.classList.add("artist-name");
            songDetails.appendChild(h4);
            songDetails.appendChild(p);
        songPlaying.appendChild(img);
        songPlaying.appendChild(songDetails);
        let playingBot = document.createElement("div");
        playingBot.classList.add("playing-bot");
            let songDetailss = document.createElement("div");
            songDetailss.classList.add("song-details");
                let h4ss = document.createElement("h4");
                h4ss.classList.add("song-name");
                let ps = document.createElement("p");
                ps.classList.add("artist-name");
            songDetailss.appendChild(h4ss);
            songDetailss.appendChild(ps);
            let controlsPl = document.createElement("div");
            controlsPl.classList.add("controls-playing")
                let i = document.createElement("span");
                i.innerHTML = " <i class='bx bx-heart'></i>";
                let i1 = document.createElement("span");
                i1.innerHTML = " <i class='bx bx-sync'></i>";
                let i2 = document.createElement("span");
                i2.innerHTML = " <i class='bx bx-skip-previous bx-md'></i>";
                let i3 = document.createElement("span");
                i3.innerHTML = "<i class='bx bx-play bx-md'></i>";
                let i4 = document.createElement("span");
                i4.innerHTML = "<i class='bx bx-skip-next bx-md'></i>";
                let i5 = document.createElement("span");
                i5.innerHTML = "<i class='bx bx-shuffle'></i>";
            controlsPl.appendChild(i);
            controlsPl.appendChild(i1);
            controlsPl.appendChild(i2);
            controlsPl.appendChild(i3);
            controlsPl.appendChild(i4);
            controlsPl.appendChild(i5);
        playingBot.appendChild(songDetailss);
        playingBot.appendChild(controlsPl);  
    playingState.appendChild(progress)
    playingState.appendChild(songDetails)
    playingState.appendChild(playingBot)     
    
  content.appendChild(playingState)  
}  

export { playingState };