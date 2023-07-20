let balance = document.querySelector(".balance span");
let income = document.querySelector(".incame span");
let expense = document.querySelector(".expense span");

let form = document.querySelector(".form form");

let textinput = document.querySelector("#text");
let amountinput = document.querySelector("#amount");
let list = document.querySelector(".history-list");
let deleteBtn = document.querySelector(".delete-btn");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

const addTransaction = (e) => {
  e.preventDefault();
  if (textinput.value.trim() === "" || amountinput.value.trim() === "") {
    return alert("please add text and amount");
  } else {
    const transaction = {
      id: generateId(),
      text: textinput.value,
      amount: amountinput.value,
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateLocalStorage();
    updateValues();
    init()
  }
};

const generateId = () => {
  return Math.floor(Math.random() * 1000000);
};

const addTransactionDOM = (transaction) => {
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("div");
  item.classList.add('list')
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
 
  <p>${transaction.text}</p>
  <span>${sign}${Math.abs(transaction.amount)}</span>
  <div class="delete-btn" onclick="removeTransaction(${transaction.id})">X</div>

  `;
  list.append(item);
};

const updateValues = () => {
  const amounts = transactions.map((transaction) => +transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const incomeval = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expenseval = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  income.innerText = `$${incomeval}`;
  expense.innerText = `$${expenseval}`;
};

const removeTransaction = (id) => {
  console.log(id);
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
};
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
function init() {
    textinput.value=''
    amountinput.value=''
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
}
init();

form.addEventListener("submit", addTransaction);
