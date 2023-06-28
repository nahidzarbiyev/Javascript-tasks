const passwordInput = document.querySelector(".pass-field input");
const eyeIcon = document.querySelector(".pass-field span");

const requirementsList = document.querySelectorAll(".requirement-list li");

const requirements = [
  { regex: /.{8,}/, index: 0 },
  { regex: /[0-9]/, index: 1 },
  { regex: /[a-z]/, index: 2 },
  { regex: /[^A-Za-z0-9]/, index: 3 },
  { regex: /[A-Z]/, index: 4 },
];

const checkPassword = (e) => {
  requirements.forEach((item) => {
    const isValid = item.regex.test(e.target.value);
    const requirementItem = requirementsList[item.index];

if (isValid) {
    requirementItem.firstElementChild.innerText = 'done';
    requirementItem.classList.add('valid')

}
else{
    requirementItem.firstElementChild.innerText = 'circle'
    requirementItem.classList.remove('valid')

}
  });
};

passwordInput.addEventListener("keyup", checkPassword);

// const showPassword = ()=>{
//     if (passwordInput.type === 'password') {
//         passwordInput.type = 'text'
//         eyeIcon.innerText = 'visibility_off'
//     }
//     else{
//         passwordInput.type = 'password'
//         eyeIcon.innerText = 'visibility'
//     }
// }

const showPassword = () => {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  eyeIcon.innerText =
    eyeIcon.innerText === "visibility" ? "visibility_off" : "visibility";
};

eyeIcon.addEventListener("click", showPassword);
