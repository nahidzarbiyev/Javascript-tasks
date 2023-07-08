const button = document.querySelector("#btn");
const inputText = document.querySelector("#input-text");
const result = document.querySelector("#result");

button.addEventListener("click", () => {
  const text = inputText.value.trim();

  if (text.length == 0) {
    alert("Input Cannot be empty");
    return;
  }

  const cleanText = text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const isPalindrome = cleanText === cleanText.split("").reverse("").join("");

  const message = isPalindrome
    ? `<span>It's a Polindrome</span>`
    : `<span>not Polindrome</span>`;
  result.innerHTML = message;
  result.classList.remove("error", "success");
  setTimeout(() => {
    result.classList.add(isPalindrome ? "success" : "error");
  }, 10);
  inputText.value = ''
});
