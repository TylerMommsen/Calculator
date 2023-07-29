function add(num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    return num1 + num2;
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

function invertSign(num) {
    return -num;
}

function calculatePercent(num) {
    return divide(num, 100);
}

function operate(operator, num1, num2) {
    if (operator == "+") return add(num1, num2);
    if (operator == "-") return subtract(num1, num2);
    if (operator == "/") return divide(num1, num2);
    if (operator == "*") return multiply(num1, num2);
}

function display(a) {
    if (!parseInt(a)) { // check if it's an operator
        displayValue.textContent = a;
        return;
    }

    displayValue.textContent = a
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
            display(num1);
        }

        if (e.target.classList.contains('operator')) {
            if (num1 === '') return;
            currentNumbers.push(num1);
            currentOperators.push(e.target.textContent);
            display(e.target.textContent);
            num1 = '';
        }

        if (e.target.classList.contains('equals')) {
            currentNumbers.push(num1);
            calculatedValue = calculate(currentNumbers, currentOperators);
            clear();
            num1 = ''+calculatedValue;
            display(parseFloat(calculatedValue).toFixed(2));
        }

        if (e.target.classList.contains('decimal')) {
            num1 += '.';
            display(num1);
        }

        if (e.target.classList.contains('clear')) {
            clear();
        }

        if (e.target.classList.contains('sign')) {
            let inverted = invertSign(num1);
            num1 = inverted;
            display(num1);
        }

        if (e.target.classList.contains('percent')) {
            let newNum = calculatePercent(num1);
            num1 = newNum;
            display(num1);
        }
    })
});

displayValue.addEventListener('input', updateDisplayCharacterCount);
const maxChar = 9;

function updateDisplayCharacterCount() {
    const content = displayValue.textContent;
    const remainingCharacters = maxChar - content.length;
    console.log('called');
    if (remainingCharacters <= 0) {
        content.textContent = content.substring(0, maxChar);
    }
}