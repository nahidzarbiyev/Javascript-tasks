let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];

let timeRef = document.querySelector(".time-display");
let int = null;
document.querySelector("#start").addEventListener("click", () => {
  if (int !== null) {
    clearInterval(null);
  }

  int = setInterval(displayTimer, 10);
});
const displayTimer = () => {
  milliseconds += 10;
  seconds = milliseconds == 1000 ? (seconds + 1) % 60 : seconds;
  minutes = seconds == 0 && milliseconds == 0 ? (minutes + 1) % 60 : minutes;
  hours = minutes == 0 && seconds == 0 && milliseconds == 0 ? hours + 1 : hours;
  milliseconds = milliseconds == 1000 ? 0 : milliseconds;

  let h = String(hours).padStart(2, "0");
  let m = String(minutes).padStart(2, "0");
  let s = String(seconds).padStart(2, "0");
  let ms = String(milliseconds).padStart(3, "0");

  timeRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
};

document.getElementById("pause").addEventListener("click", () => {
  clearInterval(int);
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(int);
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  timeRef.innerHTML = "00 : 00 : 00 : 000";
});
