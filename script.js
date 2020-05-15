const container = document.querySelector('.container');

// add display
const display = document.createElement('input');
display.classList.add('display');
display.value = '0';
container.appendChild(display);

// add operators
const operatorContainer = document.createElement('div');
operatorContainer.classList.add('operatorContainer');

// add operator buttons
let operatorArray = ['+', '-', '*', '/']
for (i of operatorArray) {
    const button = document.createElement('button');
    button.classList.add('operator');
    button.textContent = i;
    operatorContainer.appendChild(button);
}
container.appendChild(operatorContainer);

// add equals button
const equalsButton = document.createElement('button');
equalsButton.classList.add('equals');
equalsButton.textContent = '=';
container.appendChild(equalsButton);

// add clear button
const clearButton = document.createElement('button');
clearButton.classList.add('clear');
clearButton.textContent = 'Clear';
container.appendChild(clearButton);

// add decimal button
const decButton = document.createElement('button');
decButton.classList.add('dec');
decButton.textContent = '.';
container.appendChild(decButton);

// add backspace button
const backButton = document.createElement('button');
backButton.classList.add('back');
backButton.textContent = 'Back';
container.appendChild(backButton);

// add number buttons
for (let i = 9; i >= 0; i--) {
    const button = document.createElement('button');
    button.classList.add('nums');
    button.textContent = i;
    container.appendChild(button);
}

// operation functions
function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    return n1 / n2;
}

function operate(operator, n1, n2) {
    if (operator == '+') {
        return add(n1, n2);
    } else if (operator == '-') {
        return subtract(n1, n2);
    } else if (operator == '*') {
        return multiply(n1, n2);
    } else if (operator == '/') {
        return divide(n1, n2);
    }
}
