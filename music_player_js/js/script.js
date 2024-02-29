const wrapper = document.querySelector(".wrapper"),
  musicImg = wrapper.querySelector(".img-area img"),
  musicName = wrapper.querySelector(".song-details .name"),
  musicArtist = wrapper.querySelector(".song-details .artist"),
  mainAudio = wrapper.querySelector("#main-audio"),
  playPauseBtn = wrapper.querySelector(".play-pause"),
  nextBtn = wrapper.querySelector("#next"),
  prevBtn = wrapper.querySelector("#prev"),
  progressBar = wrapper.querySelector(".progress-bar"),
  progressArea = wrapper.querySelector(".progress-area"),
  repeatBtn = wrapper.querySelector("#repeat-plist"),
  showMoreBtn = wrapper.querySelector("#more-music"),
  hideMusicBtn = wrapper.querySelector("#close"),
  musicList = wrapper.querySelector(".music-list"),
  ulTag = wrapper.querySelector("ul");

let index = 6;
window.addEventListener("load", () => {
  loadMusic(index);
  playingNow();
});
function loadMusic(indexnum) {
  musicName.innerText = allMusic[indexnum - 1].name;
  musicImg.src = `images/${allMusic[indexnum - 1].src}.jpg`;
  mainAudio.src = `songs/${allMusic[indexnum - 1].src}.mp3`;
  musicArtist.innerText = allMusic[indexnum - 1].artist;
}

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

function nextMusic() {
  index++;
  index > allMusic.length ? (index = 1) : (index = index);
  loadMusic(index);
  playMusic();
}
function prevMusic() {
  index--;
  index < 1 ? (index = allMusic.length) : (index = index);
  loadMusic(index);
  playMusic();
}

playPauseBtn.addEventListener("click", () => {
  const isMusicPaused = wrapper.classList.contains("paused");
  isMusicPaused ? pauseMusic() : playMusic();
});

nextBtn.addEventListener("click", () => {
  nextMusic();
  playingNow();

});

prevBtn.addEventListener("click", () => {
  prevMusic();
  playingNow();

});

mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current-time"),
    musicDuration = wrapper.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", () => {
    let audioDuration = mainAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    totalSec < 10 ? (totalSec = `0${totalSec}`) : (totalSec = totalSec);
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  currentSec < 10 ? (currentSec = `0${currentSec}`) : (currentSec = currentSec);
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
  let progressWidthval = progressArea.clientWidth;
  let clickOFffsetX = e.offsetX;
  let songDuration = mainAudio.duration;
  mainAudio.currentTime = (clickOFffsetX / progressWidthval) * songDuration;
  playMusic();
});

repeatBtn.addEventListener("click", () => {
  let getText = repeatBtn.innerText;
  switch (getText) {
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffle");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
    default:
      break;
  }
});

mainAudio.addEventListener("ended", () => {
  let getText = repeatBtn.innerText;
  switch (getText) {
    case "repeat":
      nextMusic();
      break;
    case "repeat_one":
      mainAudio.currentTime = 0;
      loadMusic(index);
      playMusic();
      

      break;
    case "shuffle":
      let randomIndex = Math.floor(Math.random() * allMusic.length + 1);
      do {
        randomIndex = Math.floor(Math.random() * allMusic.length + 1);
      } while (index == randomIndex);
      index = randomIndex;
      loadMusic(index);
      playMusic();
  playingNow();

      break;
    default:
      break;
  }
});

showMoreBtn.addEventListener("click", () => {
  musicList.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", () => {
  musicList.classList.toggle("show");
});

allMusic.map((el, i) => {
  let liTag = `<li li-index='${i + 1}'>
    <div class="row">
    <span>${el.name}</span>
    <p>${el.artist}</p>
    </div>
    <audio class="${el.src}" src="songs/${el.src}.mp3"></audio>

    <span id="${el.src}" class="audio-duration"></span>

    </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag);
  let liAudioTag = ulTag.querySelector(`.${el.src}`);
  let liAudioTagDuration = ulTag.querySelector(`#${el.src}`);

  liAudioTag.addEventListener("loadeddata", () => {
    let audioDuration = liAudioTag.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    totalSec < 10 ? (totalSec = `0${totalSec}`) : (totalSec = totalSec);
    liAudioTagDuration.innerText = `${totalMin}:${totalSec}`;
    liAudioTagDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
});

const allLiTags = ulTag.querySelectorAll("li");
console.log(allLiTags);
function playingNow() {
  [...allLiTags].map((el, i) => {
    let audioTag = el.querySelector(".audio-duration");

    if (el.classList.contains("playing")) {
      el.classList.remove("playing");
      let audioTime = audioTag.getAttribute("t-duration");
      audioTag.innerText = audioTime;
    }

    if (el.getAttribute("li-index") == index) {
      el.classList.add("playing");
      audioTag.innerText = "Playing";
    }

    el.setAttribute("onclick", "clicked(this)");
  });
}

function clicked(el) {
  let getLiIndex = el.getAttribute("li-index");
  index = getLiIndex;
  loadMusic(index);
  playMusic();
  playingNow();
}
