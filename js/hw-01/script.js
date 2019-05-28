// TASK 1

const adminLogin = 'admin';
const adminPassword = 'm4ngo1zh4ackz0r';

let userLogin = prompt('Enter your login');

let loginAlert = '';
let passwordAlert = '';

if (userLogin === null) {
    loginAlert ='Отменено пользователем!';
    alert(loginAlert)
} else if (userLogin !== adminLogin) {
    loginAlert ='Доступ запрещен, неверный логин!';
    alert(loginAlert)
} else if (userLogin === adminLogin) {
    let userPassword = prompt('Enter tour password');

    if (userPassword === null) {
        passwordAlert ='Отменено пользователем!';
    } else if (userPassword !== adminPassword) {
        passwordAlert ='Доступ запрещен, неверный пароль!'  
    } else if (userPassword === adminPassword) {
        passwordAlert = 'Добро пожаловать!';
    }
    alert(passwordAlert)
}


// TASK 2

const sharm = 15;
const hurgada = 25;
const taba = 6;
let hotel = "";

const userNumber = prompt("Enter your number");
const intUserNumber = Number(userNumber);

if (userNumber === null) {
    alert("Нам очень жаль, приходите еще!")
} else if (Number.isNaN(intUserNumber) || intUserNumber !== Math.round(intUserNumber) || intUserNumber < 1) {
    alert("Ошибка ввода")
} else if (intUserNumber <= 15) {
    if (confirm('Sharm. Do you agree?')) {
        hotel = 'Sharm', alert(`Приятного путешествия в группе ${hotel}`);
    } else {
        alert('Нам очень жаль, приходите еще!')
    }
} else if (intUserNumber <= 25) {
    if (confirm('Hurgada. Do you agree?')) {
        hotel = 'Hurgada', alert(`Приятного путешествия в группе ${hotel}`);
    } else {
        alert('Нам очень жаль, приходите еще!')
    }
} else if (intUserNumber <= 6) {
    if (confirm('Taba. Do you agree?')) {
        hotel = 'Taba', alert(`Приятного путешествия в группе ${hotel}`);
    } else {
        alert('Нам очень жаль, приходите еще!')
    }
} else {
    alert('Извините, столько мест нет ни в одной группе!')
}