const inputEl = document.getElementById("inputEl");
const searchBtn = document.getElementById("searchBtn");
const result = document.querySelector('.result')
searchBtn.addEventListener("click", () => {
  if (inputVal.trim().length==0) {
    result.innerHTML = `<p> please Enter Country Name</p>`
}
try {
  
} catch (error) {
  
}
  let inputVal = inputEl.value;
  console.log(inputVal);
  let URL = `https://restcountries.com/v3.1/name/${inputVal}?fullText=true
    `;
  fetch(URL)
    .then((res) => res.json())
    .then((data) =>{
        // console.log(data[0]);
        // console.log(data[0].flags.svg)
        // console.log(data[0].name.common)
        // console.log(data[0].continents[0])
        // console.log(data[0].capital[0])
        // console.log(Object.keys(data[0].currencies)[0])
        // console.log(data[0].currencies[Object.keys(data[0].currencies)].name);
        // console.log(Object.values(data[0].languages).toString().split(',').join(', '));


        result.innerHTML = `
        <img src="${data[0].flags.svg}"/>
        <p>Country: <span>${data[0].name.common}</span></p>
        <p>Area:  <span>${data[0].area}</span></p>
        <p>Continents:  <span>${data[0].continents[0]}</span></p>
        <p>Capital:  <span>${data[0].capital[0]}</span></p>
        <p>Currencies:  <span>${Object.keys(data[0].currencies)[0]}</span></p>
        <p>Languages:  <span>${Object.values(data[0].languages).toString().split(',').join(', ')}</span></p>
        <p>Population:  <span>${data[0].population}</span></p>
        `
    });
    


});
