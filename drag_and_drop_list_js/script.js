const items = document.querySelectorAll(".item");
const sortableList = document.querySelector(".sortable");
console.log(sortableList);
items.forEach((item) => {
  item.addEventListener("dragstart", () => {
    setTimeout(() => {
      item.classList.add("dragging");
    }, 0);
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
  });
});
const sortableListFunct = (e) => {
    const draggingItem = sortableList.querySelector('.dragging')
  const siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];
  let nextSibling = siblings.find((sibling) => {
    return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  });
sortableList.insertBefore(draggingItem, nextSibling)
};

sortableList.addEventListener("dragover", sortableListFunct);
sortableList.addEventListener("dragenter", e=>e.preventDefault);
