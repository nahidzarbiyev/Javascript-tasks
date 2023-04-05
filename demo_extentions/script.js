const colorPickerBtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const clearAll = document.querySelector('.clear-all')

const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");
const copyColor = elem=>{
    navigator.clipboard.writeText(elem.dataset.color)
    elem.innerText = 'Copied'
    setTimeout(() => {
        elem.innerText = elem.dataset.color
    }, 1000);
}
const showColors = () => {
  colorList.innerHTML = pickedColors
    .map(
      (el) => `
<li class="color">
<span class="rect" style="background:${el}; border: 1px solid ${
        el == "#ffffff" ? "#333" : el
      }" ></span>
<span class="value" data-color='${el}'>${el}</span>
</li>`
    )
    .join("");

    document.querySelector('.picked-colors').classList.remove('hide')


    document.querySelectorAll('.color').forEach(elem => {
        elem.addEventListener('click', e=>copyColor(e.currentTarget.lastElementChild))
    });
};
showColors()
const clearAllFunct = ()=>{
    pickedColors.length = 0
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    document.querySelector('.picked-colors').classList.add('hide')


}
const activeEyeDropper = async () => {
  try {
    const eyeDropper = new EyeDropper();
    const { sRGBHex } = await eyeDropper.open();
    navigator.clipboard.writeText(sRGBHex);

if (!pickedColors.includes(sRGBHex)) {
    
    pickedColors.push(sRGBHex);
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    showColors();
}

  } catch (error) {
    console.log(error);
  }
};
clearAll.addEventListener('click', clearAllFunct)
colorPickerBtn.addEventListener("click", activeEyeDropper);
