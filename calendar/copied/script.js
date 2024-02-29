const dateh1 = document.querySelector(".date h1");
const datep = document.querySelector(".date p");
const left = document.querySelector(".prev");
const right = document.querySelector(".next");
const monthDays = document.querySelector(".days");
const date = new Date();
const renderCalendar = () => {
  date.setDate(1);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = "";
  const month = date.getMonth();
  const firstDayIndex = date.getDay();
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();
  const nextDays = 7 - lastDayIndex - 1;

  dateh1.innerHTML = months[month];

  datep.innerHTML = date.toDateString();

  for (let i = firstDayIndex; i > 0; i--) {
    days += `<div class="prev-date">${prevLastDay - i + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
    monthDays.innerHTML = days;
  }

  for (let i = 1; i <= nextDays; i++) {
    days += `<div class="next-date">${i}</div>`;
    monthDays.innerHTML = days;
  }
};
left.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

right.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
