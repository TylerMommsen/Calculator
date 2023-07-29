function add(num1, num2) {
    let intNum1 = parseInt(num1);
    let intNum2 = parseInt(num2);
    return parseInt(intNum1 + intNum2);
}

function subtract(num1, num2) {
    return num1 - num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function clear() {
    currentNumbers = [];
    currentOperators = [];
    num1 = '';
    num2 = '';
    operator = null;
    displayValue.textContent = 0;
}

// function invertSign(num) {

// }

// function calculatePercent(num) {

// }

function operate(operator, num1, num2) {
    if (operator == "+") return add(num1, num2);
    if (operator == "-") return subtract(num1, num2);
    if (operator == "/") return divide(num1, num2);
    if (operator == "*") return multiply(num1, num2);
}

function calculate(numbers, operators) {
    let total = numbers[0];
    let currentOperator = 0
    for (i = 1; i <= numbers.length; i++) {
        if (operators[currentOperator] == '+') {
            total = operate('+', total, numbers[i]); 
            currentOperator++;
        } else if (operators[currentOperator] == '-') {
            total = operate('-', total, numbers[i]); 
            currentOperator++;
        } else if (operators[currentOperator] == '/') {
            total = operate('/', total, numbers[i]); 
            currentOperator++;
        } else if (operators[currentOperator] == '*') {
            total = operate('*', total, numbers[i]); 
            currentOperator++;
        }
    }
    return total;
}

let num1 = '';
let operator = null;
let num2 = '';
let displayValue = document.querySelector('#display');
let currentNumbers = [];
let currentOperators = [];

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.classList.contains('operand')) {
            num1 += e.target.textContent;
            displayValue.textContent = num1;
        }

        if (e.target.classList.contains('operator')) {
            if (num1 === '') return;
            currentNumbers.push(num1);
            currentOperators.push(e.target.textContent);
            displayValue.textContent = e.target.textContent;
            num1 = '';
        }

        if (e.target.classList.contains('equals')) {
            currentNumbers.push(num1);
            console.log(currentNumbers, currentOperators);
            calculatedValue = calculate(currentNumbers, currentOperators);
            clear();
            num1 = ''+calculatedValue;
            displayValue.textContent = calculatedValue.toFixed(2);
        }

        if (e.target.classList.contains('decimal')) {
            
        }

        if (e.target.classList.contains('clear')) {
            clear();
        }
    })
});