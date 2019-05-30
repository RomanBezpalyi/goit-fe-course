// TASK 1

let userInput;
const numbers = [];
let total = 0;

do {
    userInput = prompt('Enter your number', '')
    let numUserInput = Number(userInput);

    if (Number.isNaN(numUserInput) || userInput === '') {
        alert('Было введено не число, попробуйте еще раз');
        continue;
    } else {
        if (userInput !== null) {
            numbers.push(userInput);
        } else break;
    }
} while (userInput !== null)

console.log(numbers);

for (const key of numbers) {
    total += Number(key);
}

console.log(total);


// TASK 2

const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attempts = 3;

do {
    userInput = prompt('Enter your password');

    if (userInput === null) {
        break
    } else if (passwords.includes(userInput)) {
        alert('Добро пожаловать!');
        break
    } else {
        attempts -= 1;
        if (attempts > 0) {
            alert(`Неверный пароль, у вас осталось ${attempts} попыток`);
            continue;
        } else {
            alert("У вас закончились попытки, аккаунт заблокирован!")
        }
    }
} while (attempts > 0)