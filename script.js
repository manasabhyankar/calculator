const container = document.querySelector('.container');

// add display
const display = document.createElement('input');
display.classList.add('display');
display.disabled = true;
display.value = 0;
container.appendChild(display);

// add operators
const operatorContainer = document.createElement('div');
operatorContainer.classList.add('operatorContainer');

// add operator buttons
let operatorArray = ['+', '-', '*', '/']
for (i of operatorArray) {
    const button = document.createElement('button');
    button.classList.add('operator');
    button.classList.add(i);
    button.textContent = i;
    operatorContainer.appendChild(button);
}
container.appendChild(operatorContainer);

// add equals button
const equalsButton = document.createElement('button');
equalsButton.classList.add('eq');
equalsButton.textContent = '=';
container.appendChild(equalsButton);

// add clear button
const clearButton = document.createElement('button');
clearButton.classList.add('clear');
clearButton.id = 'clearBack';
clearButton.textContent = 'clear';
container.appendChild(clearButton);

// add decimal button
const decButton = document.createElement('button');
decButton.classList.add('dec');
decButton.id = 'yellow';
decButton.textContent = '.';
container.appendChild(decButton);

// add back button
const backButton = document.createElement('button');
backButton.classList.add('back');
backButton.id = 'clearBack';
backButton.textContent = 'del';
container.appendChild(backButton);

// add number buttons
for (let i = 9; i >= 0; i--) {
    const button = document.createElement('button');
    button.classList.add('num');
    button.id = 'yellow';
    button.textContent = i;
    container.appendChild(button);
}

const allButtons = document.querySelectorAll('button');
allButtons.forEach(button => button.type = 'button');

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
/*
// press events for numbers and operators
document.addEventListener('keydown', pressNumOpDec);
let arr01 = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, '+', '-', '*', '/', '.'];
function pressNumOpDec(e) {
    if (arr01.includes(e.keyCode) || arr01.includes(e.key)) {
        if (display.value == 0 && e.key != '.') {
           display.value = ''; 
        }
        display.value += e.key;
    }    
}
*/

// click events
const clicked = document.querySelector('.layout');
clicked.addEventListener('click', clickNumber);
clicked.addEventListener('click', clickOperator);
clicked.addEventListener('click', clickEquals);
clicked.addEventListener('click', clickClear);
clicked.addEventListener('click', clickDec);
clicked.addEventListener('click', clickBack);

// press events
document.addEventListener('keydown', clickEquals);
document.addEventListener('keydown', clickBack);

let arr01 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.'];
document.addEventListener('keydown', clickNumber);

function clickNumber(e) {
    if (e.target.classList.contains('num')) {
        if (display.value == '0') {
            display.value = '';
        }
        display.value += e.target.textContent;
    } else if (arr01.includes(e.key)) {
        if (display.value == '0') {
            display.value = '';
        }
        display.value += e.key;
    }
} 

function clickOperator(e) {
    if (e.target.classList.contains('operator')) {
        display.value += e.target.textContent;
    }
}

function clickEquals(e) {
    if (e.target.classList.contains('eq') || e.key == 'Enter') {
        let arrClickEquals = displayToArray();
        prodQuo(arrClickEquals);
        sumDiff(arrClickEquals);
    }
}

function clickClear(e) {
    if (e.target.classList.contains('clear')) {
        display.value = '0';
    }
}

function clickDec(e) {
    if (e.target.classList.contains('dec')) {
        display.value += '.';
    }
}

function clickBack(e) {
    if (e.target.classList.contains('back') || e.keyCode == 8) {
        display.value = display.value.substring(0, display.value.length - 1);
    }
}

function prodQuo(arr) {
    let result = 1;
    while (arr.includes('*') || arr.includes('/')) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == '*' || arr[i] == '/') {
                let n1 = Number(arr[i - 1]);
                let n2 = Number(arr[i + 1]);
                result = operate(arr[i], n1, n2);
                arr.splice(arr.indexOf(arr[i - 1]), 3, result);
            }
        }
    }
    return arr;
}

function sumDiff(arr) {
    let result = arr;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == '+' || arr[i] == '-') { 
            let n1 = i == 1 ? Number(arr[i - 1]) : result;
            let n2 = Number(arr[i + 1]);
            result = operate(arr[i], n1, n2);
        }
    }
    console.log(display.value);
    display.value = result;
}

function displayToArray() {
    display.value = display.value.replace(/[+]/gi, ",+,");
    display.value = display.value.replace(/[-]/gi, ",-,");
    display.value = display.value.replace(/[*]/gi, ",*,");
    display.value = display.value.replace(/[/]/gi, ",/,");
    return display.value.split(',');
}
