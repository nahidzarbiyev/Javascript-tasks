const downloadBtn = document.querySelector(".download-btn");
const fileLink =
  "https://drive.google.com/u/0/uc?id=1HISRomgGs_XEpCzBuBLfNsYT19ULyGlT&export=download";

const initTimer = () => {
    if (downloadBtn.classList.contains('disable-timer')) {
       return location.href = fileLink;
    }
  let timer = downloadBtn.dataset.timer;
  downloadBtn.classList.add("timer");
  downloadBtn.innerHTML = `your file will download in <b>${timer}</b> seconds `;
  const initCounter = setInterval(() => {
    if (timer > 0) {
      timer--;
      return (downloadBtn.innerHTML = `your file will download in <b>${timer}</b> seconds `);
    }
    clearInterval(initCounter);
    location.href = fileLink;
    downloadBtn.textContent = "your file is downloading...";
    setTimeout(() => {
      downloadBtn.classList.replace("timer", "disable-timer");
      downloadBtn.innerHTML = `<i class="fa-solid fa-download"></i>
        <span class="text">download Again</span>`;
    }, 3000);
  }, 1000);
};
downloadBtn.addEventListener("click", initTimer);
