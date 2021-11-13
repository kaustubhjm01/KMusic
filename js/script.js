const wrapper = document.querySelector(".wrapper");
musicImg = wrapper.querySelector(".img-area img");
musicName = wrapper.querySelector(".song-details .name");
musicArtist = wrapper.querySelector(".song-details .artist");
mainAudio = wrapper.querySelector("#main-audio");
playPauseBtn = wrapper.querySelector(".play-pause");
prevBtn = wrapper.querySelector("#prev");
nextBtn = wrapper.querySelector("#next");
progressArea = wrapper.querySelector(".progress-area");
progressBar = wrapper.querySelector(".progress-bar");
musicList = wrapper.querySelector(".music-list");
showMoreBtn = wrapper.querySelector("#more-music");
hideMusicBtn = musicList.querySelector("#close");

let musicIndex = Math.floor(Math.random() * allMusic.length) + 1;;


window.addEventListener("load", () => {

    loadMusic(musicIndex); // calling when window is loaded
})

// load music function
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `images/${allMusic[indexNumb - 1].img}.jpeg`;
    mainAudio.src = `Musics/${allMusic[indexNumb - 1].src
        }.m4a`;
    playingNow();
    playingNow();



}
// play music function
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";

    mainAudio.pause();
}
// next music function
function nextMusic() {
    if (musicIndex == allMusic.length) musicIndex = 0;
    musicIndex++;
    loadMusic(musicIndex);
    playMusic();
    playingNow();

}
function prevMusic() {
    if (musicIndex == 1) musicIndex = allMusic.length + 1;
    musicIndex--;
    loadMusic(musicIndex);
    playMusic();
    playingNow();

}
// play and pause music button 
playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");

    isMusicPaused ? pauseMusic() : playMusic();
})

nextBtn.addEventListener("click", () => {
    nextMusic(); // calling next music function
});
prevBtn.addEventListener("click", () => {
    prevMusic(); // calling prev music function
});

// update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e) => {
    // console.log(e); // for printing the object to see the properites
    const currentTime = e.target.currentTime; // getting current time of song
    const duration = e.target.duration;// getting total duration of current song
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    let musicCurrentTime = wrapper.querySelector(".current");
    let musicDuration = wrapper.querySelector(".duration");
    mainAudio.addEventListener("loadeddata", () => {
        // update song total duration
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSecs = Math.floor(audioDuration % 60);
        if (totalSecs <= 9) {
            // totalSecs = "0" + totalSecs;
            totalSecs = `0${totalSecs}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSecs}`

    });
    // update playing song current time 
    let currentMin = Math.floor(currentTime / 60);
    let currentSecs = Math.floor(currentTime % 60);
    if (currentSecs <= 9) {
        // totalSecs = "0" + totalSecs;
        currentSecs = `0${currentSecs}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSecs}`;
})
// update playing song time according to the progrss area value 
progressArea.addEventListener("click", (e) => {
    let progressWidthval = progressArea.clientWidth; // getting width of the progress bar
    let clickedOffsetX = e.offsetX; //getting offsetx valie
    let songDuration = mainAudio.duration; // getting song total duration

    mainAudio.currentTime = (clickedOffsetX / progressWidthval) * songDuration;
    console.log("width is " + progressWidthval);
    console.log("offset x is " + clickedOffsetX);
    playMusic(); // if user music is paused and if user clicks on bar then music will play 
})

// now will work on repeat,
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText; // getting innertext of icon
    switch (getText) {
        case "repeat": // if icon is repeat then change it to repeat_one
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped")
            break;
        case "repeat_one": // if icon is repeat one then change it to shuffle 
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffle")
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped")
            break;


    }

});

// after song has been ended
mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.innerText; // getting innertext of icon
    switch (getText) {
        case "repeat": // if icon is repeat then change simply call the next music cause by default is repeat
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            // loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);

            do {
                // loadMusic(randIndex);
                console.log("random is " + randIndex);
                // playMusic();
                randIndex = Math.floor(Math.random() * allMusic.length);
            }
            while (musicIndex == randIndex);
            musicIndex = randIndex;


            // hi my name is jhfhkjf i  woukd like to tell you that i will be joining Google as SDE 1 congrats me for this amazing opportunity
            loadMusic(musicIndex);
            playMusic();
            break;


    }

})
showMoreBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});
hideMusicBtn.addEventListener("click", () => {
    showMoreBtn.click();
});

const ulTag = wrapper.querySelector("ul");

// create li according to the array length 
// by using li index we will find which song is currently playing 
for (let i = 0; i < allMusic.length; i++) {
    let liTag = `
    
                <li li-index="${i + 1}">
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                    </div>
            <audio class="${allMusic[i].src}" src="Musics/${allMusic[i].src}.m4a"></audio>

                    <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                </li>
                
    `;
    ulTag.insertAdjacentHTML("beforeend", liTag);
    let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    liAudioTag.addEventListener("loadeddata", () => {
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSecs = Math.floor(audioDuration % 60);
        if (totalSecs <= 9) {
            // totalSecs = "0" + totalSecs;
            totalSecs = `0${totalSecs}`;
        }
        liAudioDuration.innerText = `${totalMin}:${totalSecs}`
        liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSecs}`);
    })

}

//lets work in particular song o click
const allLiTags = ulTag.querySelectorAll("li");
function playingNow() {
    for (let i = 0; i < allLiTags.length; i++) {
        let audioTag = allLiTags[i].querySelector(".audio-duration");

        if (allLiTags[i].classList.contains("playing")) {
            allLiTags[i].classList.remove("playing");
            let audioDu = audioTag.getAttribute("t-duration");
            console.log(audioDu);

            audioTag.innerText = audioDu;

        }
        if (allLiTags[i].getAttribute("li-index") == musicIndex) {
            allLiTags[i].classList.add("playing");
            audioTag.innerText = "Playing";
        }
        // adding onclick attribute in every li tags
        allLiTags[i].setAttribute("onclick", "clicked(this)");

    }
}

// let's play song on li click
function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    // if (element.classList.contains("playing")) {
    // pauseMusic();
    playMusic();
    // element.classList.remove("playing");

    playingNow();
}