const corusel = document.querySelector(".corusel");
firstImg = corusel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");
let isDragStart = false,
  prevPageX,
  prevScrollLeft,
  isDragging = false,
  positionDiff;
const showHideIcons = () => {
  let scrollWidth = corusel.scrollWidth - corusel.clientWidth;
  arrowIcons[0].style.display = corusel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    corusel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgwidth = firstImg.clientWidth + 14;
    corusel.scrollLeft += icon.id == "left" ? -firstImgwidth : firstImgwidth;
    setTimeout(() => {
      showHideIcons();
    }, 60);
  });
});

const autoSlide = () => {
    if (corusel.scrollLeft == (corusel.scrollWidth - corusel.clientWidth)) return
  positionDiff = Math.abs(positionDiff);
  let firstImgwidth = firstImg.clientWidth + 14;
  let valDifference = firstImgwidth - positionDiff;

  if (corusel.scrollLeft > prevScrollLeft) {
    return (corusel.scrollLeft +=
      positionDiff > firstImgwidth / 3 ? valDifference : -positionDiff);
  }
  corusel.scrollLeft -=
    positionDiff > firstImgwidth / 3 ? valDifference : -positionDiff;
};
const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = corusel.scrollLeft;
};
const dragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  isDragging=true;
  corusel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  corusel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  corusel.classList.remove('dragging')
  if(!isDragging) return
  isDragging= false;
  autoSlide();
};
corusel.addEventListener("mousedown", dragStart);
corusel.addEventListener("touchstart", dragStart);
corusel.addEventListener("mousemove", dragging);
corusel.addEventListener("touchmove", dragging);
corusel.addEventListener("mouseup", dragStop);
corusel.addEventListener("mouseleave", dragStop);
corusel.addEventListener("touchend", dragStop);
