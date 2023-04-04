const colorInputs = document.querySelectorAll(".colors input");
const gradientBox = document.querySelector(".gradient-box");
const selectBox = document.querySelector(".select-box select");
const textArea = document.querySelector("textarea");
const refresh = document.querySelector(".refresh");
const copy = document.querySelector(".copy");
console.log(copy);
const getRandomColor = () => {
  const randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${randomHex}`;
};
const generateGradient = (isRandom) => {
  if (isRandom) {
    colorInputs[0].value = getRandomColor();
    colorInputs[1].value = getRandomColor();
  }
  const gradient = `linear-gradient(${selectBox.value}, ${colorInputs[0].value},${colorInputs[1].value})`;
  gradientBox.style.background = gradient;
  textArea.value = `background:${gradient}`;
};

const copyCode = () => {
   
  navigator.clipboard.writeText(textArea.value);
  copy.innerText = "Code Copied";
  setTimeout(() => {
    copy.innerText = "Copy Code";
  }, 1000);
};

colorInputs.forEach((input) => {
  input.addEventListener("input", () => generateGradient(false));
});

selectBox.addEventListener("change", () => generateGradient(false));
refresh.addEventListener("click", () => generateGradient(true));
copy.addEventListener("click", () => copyCode());
