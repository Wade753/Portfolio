//animation loading
function showform() {
    const form = [...document.querySelector('.form').children];
    console.log("test");
    form.forEach((item, i) => {
        setTimeout(() => {
            item.style.opacity = 1;
        }, i*100);
    })
}

window.onload = () => {
    if(sessionStorage.nume){
        location.href = '/';
    }
    showform();
}

//validation

const nume = document.querySelector('.nume') || null;
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');

if(nume == null){

    submitBtn.addEventListener('click', () =>{
        fetch('/login-user', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            validateData(data);
        })
    })
} else{
    submitBtn.addEventListener('click', () =>{
        fetch('/register-user', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                nume: nume.value,
                email: email.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            validateData(data);
        })
    })
}

const validateData = (data) => {
    if(!data.nume){
        alertBox(data);
    } else{
        sessionStorage.nume=data.nume;
        sessionStorage.email=data.email;
        location.href = '/';
    }
}

const alertBox =(data) => {
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');
    alertMsg.innerHTML = data;

    alertContainer.style.top ='5%';
    setTimeout(() => {
        alertContainer.style.top =null;
    }, 5000)
}