const hour = document.getElementById('hour')
const minute = document.getElementById('minute')
const second = document.getElementById('second')

const clock = setInterval(() => {
    const newDate = new Date();
    let hr = newDate.getHours()
    let min = newDate.getMinutes()
    let sec = newDate.getSeconds()
    hr = hr.toString().padStart(2,"0")
    min = min.toString().padStart(2,"0")
    sec = sec.toString().padStart(2,"0")

    const timeString = `${hr}:${min}:${sec}`
    // console.log(timeString);
    hour.innerText = hr;
    minute.innerText = min;
    second.innerText = sec;

}, 1000);


