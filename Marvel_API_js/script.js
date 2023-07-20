let button = document.querySelector(".button");

let input = document.getElementById("input-box");

let showContainer = document.getElementById("show-container");

let listContainer = document.querySelector(".list");

let date = new Date();
console.log(date.getTime());

const [timeStamp, apiKey, hashValue] = [ts, publicKey, hashVal];

button.addEventListener(
  "click",
  (getResult = async () => {
    if (input.value.trim().length < 1) {
      alert("input is empty");
    }
    showContainer.innerHTML = "";
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

    const response = await fetch(url)
    const jsonData = await response.json()
    jsonData.data['results'].forEach(element => {
        showContainer.innerHTML `<div class='card-container'>
        <div class='caracter-img'>
        <img src="${element.thumbnail['path'] + "." + element.thumbnail['extension']}"/>
        </div>
        <div class="character-name">${element.name}</div>
        <div class="character-description">${element.description}</div>
        </div>`
    });
  })
);


window.onload=()=>{
    getResult()
}