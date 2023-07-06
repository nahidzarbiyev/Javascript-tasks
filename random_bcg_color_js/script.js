const btn = document.querySelector('#btn')

let randomnum = ()=>{
    return Math.floor(Math.random()*256)}


btn.addEventListener('click',()=>{
    document.querySelector('body').style.backgroundColor = `rgb(${randomnum()},${randomnum()},${randomnum()})`
})
window.addEventListener('load',()=>{
    document.querySelector('body').style.backgroundColor = `rgb(${randomnum()},${randomnum()},${randomnum()})`
})
