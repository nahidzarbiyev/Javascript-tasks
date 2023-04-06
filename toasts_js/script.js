const buttons = document.querySelectorAll('.buttons .btn')
const notifications =document.querySelector('.notifications')
const toastDetails = {
    timer:5000,
    success:{
        icon:'fa-sharp fa-solid fa-circle-check',
        text:'Success: success toast'
    },
    info:{
        icon:'fa-solid fa-circle-info',
        text:'Info: info toast'
    },
    warning:{
        icon:'fa-solid fa-circle-exclamation',
        text:'Warning: warning toast'
    },
    error:{
        icon:'fa-regular fa-circle-xmark',
        text:'Error: error toast'
    }
}

const removeToasts= (toast)=>{
toast.classList.add('hide')
if (toast.timeotId) clearTimeout(toast.timeotId)
setTimeout(() => {
    toast.remove()
}, 500);
}
const createtoast=(id)=>{
    const {icon, text} = toastDetails[id]
const toast = document.createElement('li')
toast.className = `toast ${id}`
toast.innerHTML = ` <div class="column">
<i class="${icon}"></i>
<span>${text}</span>
</div>
<i class="fa-solid fa-xmark" onclick='removeToasts(this.parentElement)'></i>`;
notifications.append(toast)
toast.timeotId = setTimeout(() => {
    removeToasts(toast)
}, toastDetails.timer);

}

buttons.forEach((btn)=>{
    btn.addEventListener('click', ()=>createtoast(btn.id))
})