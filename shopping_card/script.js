let circle = document.querySelector(".color-option");

circle.addEventListener("click", (e) => {
  console.log(e);
  if (e.target.classList.contains("circle")) {
    circle.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    document.querySelector(".main-images .active").classList.remove('active')
    document.querySelector(`.main-images .${e.target.id}`).classList.add('active')
  }
});
