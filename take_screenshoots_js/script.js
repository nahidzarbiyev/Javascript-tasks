const container = document.getElementById("container");
const captureButton = document.getElementById("capture-button");

const previewContainer = document.getElementById("preview-container");

const downloadBtn = document.getElementById("download-button");

captureButton.addEventListener("click", async () => {
  downloadBtn.classList.remove("hide");
  const canvas = await html2canvas(container);
  const imgURL = canvas.toDataURL();
  previewContainer.innerHTML = `<img src=${imgURL} alt="" id='image' />`;
  downloadBtn.href = imgURL;
  downloadBtn.download = "image.png";
});

window.onload = () => {
  downloadBtn.classList.add("hide");
  previewContainer.innerHTML = "";
};
