const rangeSliderCount = document.querySelector(".pass-length input");
const generateBtn = document.querySelector(".generate-btn");
const copyIcon = document.querySelector('.input-box span')
const passwordInput = document.querySelector(".input-box input");
const indicator = document.querySelector('.pass-indicator')
options = document.querySelectorAll(".option input");

const characters = {
  lowercase:"abcdefghijklmnopqrstuvwxy",
  uppercase:'ABCDEFGHIJKLMNOPQRSTUVWXY',
  numbers:'0123456789',
  symbols:'^!$&|[]{}():;.,+-#@<>~'
};




const generatePassword = () => {
  let staticPassword =''
    randomPassword = ''
    passLength = rangeSliderCount.value
    excluteduplicate = false
    options.forEach((option) => {
      if (option.checked) {

        if (option.id !== 'exc-duplicate' && option.id !== 'spaces') {
        staticPassword+= characters[option.id]
            
        }
        else if(option.id==='spaces'){
            staticPassword = `  ${staticPassword}  `
        }
        else{
            excluteduplicate=true
        }
      }
    });


    for (let i = 0; i < passLength; i++) {
      randomChar= staticPassword[Math.floor(Math.random()*staticPassword.length)]
        if (excluteduplicate) {
            !randomPassword.includes(randomChar) || randomChar ==  " " ? randomPassword += randomChar : i--;

        }
        else{
            randomPassword += randomChar
        }
    }
    passwordInput.value = randomPassword

};

const updatePassIndicator = ()=>{
    indicator.id = rangeSliderCount.value<=8 ? "weak" : rangeSliderCount.value<=16 ? "medium" : "strong"
}


const updateSlider = () => {
  document.querySelector(".pass-length span").innerText =
    rangeSliderCount.value;
    generatePassword()
    updatePassIndicator()
};
updateSlider();

const copyPassword = ()=>{
    navigator.clipboard.writeText(passwordInput.value)
    copyIcon.innerText = 'check'
    setTimeout(() => {
    copyIcon.innerText = 'content_copy'
        
    }, 1000);
}

copyIcon.addEventListener("click", copyPassword);
rangeSliderCount.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
