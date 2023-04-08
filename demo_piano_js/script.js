const pianoKeys = document.querySelectorAll('.piano-keys .key')

let audio = new Audio('./audio/tunes/a.wav')

const playTune=(key)=>{
audio.play()
}


pianoKeys.forEach(key=>{
    key.addEventListener('click', ()=>playTune(key.dataset.key))
   
})