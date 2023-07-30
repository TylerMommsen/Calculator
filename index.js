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
    hasClickedDecimal = false;
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
    if (!parseInt(a) && !a.toString().includes('0')) { // check if it's an operator
        displayValue.textContent = a;
        return;
    }

    let numberString = a.toString();
    let decimalPart = numberString.split('.')[1];
    if (decimalPart) {
        hasClickedDecimal = true;
    } else {
        hasClickedDecimal = false;
    }

    if (decimalPart && decimalPart.length > 9) {
        displayValue.textContent = parseFloat(a).toFixed(3);
    } else {
        if (a.toString().length > 9) {
            displayValue.textContent = a.toString().slice(0, 9);
        } else {
            displayValue.textContent = a;
        }
    }
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
let displayValue = document.querySelector('#display');
let currentNumbers = [];
let currentOperators = [];
let hasClickedDecimal = false;

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.classList.contains('operand')) {
            num1 += e.target.textContent;
            display(num1);
        }

        if (e.target.classList.contains('operator')) {
            if (num1 === '') return;
            hasClickedDecimal = false;
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
            display(calculatedValue);
        }

        if (e.target.classList.contains('decimal')) {
            if (hasClickedDecimal) return;
            hasClickedDecimal = true;
            num1 += '.';
            display(num1);
        }

        if (e.target.id === ('clear')) {
            clear();
        }

        if (e.target.id === ('sign')) {
            let inverted = invertSign(num1);
            num1 = inverted;
            display(num1);
        }

        if (e.target.id === ('percent')) {
            let newNum = calculatePercent(num1);
            num1 = newNum;
            display(num1);
        }
    })
});