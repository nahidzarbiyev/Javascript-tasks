const body = document.querySelector('body')

const hourHand = document.querySelector('.hour')
const minuteHand = document.querySelector('.minute')
const secondHand = document.querySelector('.second')
const switchMode = document.querySelector('.mode-switch')

if (localStorage.getItem('mode')==='Dark Mode') {
    body.classList.add('dark')
    switchMode.innerText = 'Light Mode'
    
}
else{
    switchMode.innerText = 'Dark Mode'

}

switchMode.addEventListener('click', ()=>{
    body.classList.toggle('dark')
    const isDark = body.classList.contains('dark')
    if (isDark) {
        switchMode.innerText = 'Light Mode'
    }
    else{
        switchMode.innerText = 'Dark Mode'

    }
    localStorage.setItem('mode', isDark ? 'Dark Mode': 'Light Mode')
})


const updateTime = ()=>{
 let date = new Date()
 secToDeg = (date.getSeconds()/60)*360;
 minToDeg = (date.getMinutes()/60)*360;
 hourToDeg = (date.getHours()/12)*360;

 secondHand.style.transform = `rotate(${secToDeg}deg)`
 minuteHand.style.transform = `rotate(${minToDeg}deg)`
 hourHand.style.transform = `rotate(${hourToDeg}deg)`
}


setInterval(() => {
    updateTime()
}, 1000);

updateTime()