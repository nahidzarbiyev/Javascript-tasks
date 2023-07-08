const result = document.querySelector(".result input");

const copyBtn = document.querySelector("#copy-btn");

const sliders = document.querySelectorAll(".wrapper input[type='range']");

const rColor = document.getElementById("red");
const gColor = document.getElementById("green");
const bColor = document.getElementById("blue");

let generateColor = () => {
  let rColorValue = rColor.value;
  let gColorValue = gColor.value;
  let bColorValue = bColor.value;
  let finalColor = `rgb(${rColorValue},${gColorValue},${bColorValue})`

  result.value = finalColor
  document.body.style.backgroundColor = finalColor
};


sliders.forEach((input)=>{
    input.addEventListener('input',generateColor)
})

copyBtn.addEventListener('click', ()=>{
navigator.clipboard.writeText(result.value)
copyBtn.innerText = "copied"
setTimeout(() => {
copyBtn.innerText = "Copy Color Code"
     
}, 2000);
})

window.addEventListener('load',generateColor)