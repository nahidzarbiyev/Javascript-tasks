const fileInput = document.querySelector(".file-input");
const selectImg = document.querySelector(".choose-img");
const prewImg = document.querySelector(".preview-img img");
const filterName = document.querySelector(".filter-info .name");
const inputSlider = document.querySelector(".slider input");
const inputSliderValue = document.querySelector(".filter-info .value");
const container = document.querySelector(".container");
const filterOptions = document.querySelectorAll(".filter button");
const rotateOptions = document.querySelectorAll(".rotate button");
const resetFilter = document.querySelector(".reset-filter");
const saveImgBtn = document.querySelector(".save-img");
let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;
let rotate = 0,
  fliphorizontal = 1,
  flipVertical = 1;

const applyFilters = () => {
  prewImg.style.transform = `rotate(${rotate}deg) scale(${flipVertical}, ${fliphorizontal})`;
  prewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

const fileUpload = () => {
  let file = fileInput.files[0];
  if (!file) return;
  prewImg.src = URL.createObjectURL(file);
  prewImg.addEventListener("load", () => {
    resetFilter.click()
    container.classList.remove("disable");
  });
};

filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;
    if (option.id === "brightness") {
      inputSlider.max = 200;
      inputSlider.value = brightness;
      inputSliderValue.innerText = `${brightness}%`;
    } else if (option.id === "saturation") {
      inputSlider.max = 200;
      inputSlider.value = saturation;
      inputSliderValue.innerText = `${saturation}%`;
    } else if (option.id === "inversion") {
      inputSlider.max = 100;
      inputSlider.value = inversion;
      inputSliderValue.innerText = `${inversion}%`;
    } else {
      inputSlider.max = 100;
      inputSlider.value = grayscale;
      inputSliderValue.innerText = `${grayscale}%`;
    }
  });
});

const updateFilter = () => {
  inputSliderValue.innerText = `${inputSlider.value}%`;
  const selectedFilter = document.querySelector(".filter .active");
  if (selectedFilter.id === "brightness") {
    brightness = inputSlider.value;
  } else if (selectedFilter.id === "saturation") {
    saturation = inputSlider.value;
  } else if (selectedFilter.id === "inversion") {
    inversion = inputSlider.value;
  } else {
    grayscale = inputSlider.value;
  }
  applyFilters();
};

rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    if (option.id == "left") {
      rotate -= 90;
    } else if (option.id === "right") {
      rotate += 90;
    } else if (option.id === "vertical") {
      flipVertical = flipVertical === 1 ? -1 : 1;
    } else {
      fliphorizontal = fliphorizontal === 1 ? -1 : 1;
    }
    applyFilters();
  });
});

const resetFilterhandle = () => {
  (brightness = 100), (saturation = 100), (inversion = 0), (grayscale = 0);
  (rotate = 0), (fliphorizontal = 1), (flipVertical = 1);
  filterOptions[0].click();
  applyFilters();
};

const saveImage = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = prewImg.naturalWidth;
  canvas.height = prewImg.naturalHeight;
  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;

  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rotate !== 0) {
    ctx.rotate(rotate * Math.PI / 180);
  }
  ctx.scale(flipVertical, fliphorizontal);
  ctx.drawImage(
    prewImg,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
const link = document.createElement('a')
link.download = 'image.jpg'
link.href = canvas.toDataURL()
link.click()
};

fileInput.addEventListener("change", fileUpload);
resetFilter.addEventListener("click", resetFilterhandle);
selectImg.addEventListener("click", () => fileInput.click());
saveImgBtn.addEventListener("click", saveImage);
inputSlider.addEventListener("input", updateFilter);
