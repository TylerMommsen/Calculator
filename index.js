function add(num1, num2) {

}

function subtract(num1, num2) {

}

function divide(num1, num2) {

}

function multiply(num1, num2) {

}

function clear() {
    currentComputation = [];
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
    if (operator == "+") add(num1, num2);
    if (operator == "-") subtract(num1, num2);
    if (operator == "/") divide(num1, num2);
    if (operator == "*") multiply(num1, num2);
}

function calculate(arr) {
    let total = arr[0];
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
            if (currentComputation.length === 0) return;

            currentNumbers.push(num1);
            currentOperators.push(e.target.textContent);
            displayValue.textContent = e.target.textContent;
            num1 = '';
        }

        if (e.target.classList.contains('equals')) {
            calculate(currentComputation);
        }

        if (e.target.classList.contains('decimal')) {
            
        }

        if (e.target.classList.contains('clear')) {
            clear();
        }
    })
});