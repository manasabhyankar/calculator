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
equalsButton.classList.add('equals');
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

// press events for numbers and operators
document.addEventListener('keydown', f);
let arr01 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
            , '+', '-', '*', '/', '.'];
function f(e) {
    if (arr01.includes(e.key)) {
        if (display.value == 0 && e.key != '.') {
           display.value = ''; 
        }
        display.value += e.key;
    }    
}

// press events for backpace and enter
document.addEventListener('keydown', g);
function g(e) {
    if (e.key == 'Backspace') {
        display.value = display.value.substring(0, display.value.length - 1);
    } else if (e.key == 'Enter') {
        let arr = displayToArray();
        prodQuo(arr);
        sumDiff(arr);
    }
}

// click events
clickPressNumber();
clickPressOperator();
clickPressEquals();
clickPressClear();
clickPressDec();
clickPressBack();

function clickPressNumber() {
    const clicked = document.querySelector('.layout');
    clicked.addEventListener('click', f); 

    function f(e) {
        if (e.target.classList.contains('num')) {
            if (display.value == 0) {
                display.value = '';
            }
            display.value += e.target.textContent;
        }
    } 
}

function clickPressOperator() {
    const clicked = document.querySelector('.operatorContainer');
    clicked.addEventListener('click', f);

    function f(e) {
        display.value += e.target.textContent;
    }
}

function clickPressEquals() {
    const clicked = document.querySelector('.container');
    clicked.addEventListener('click', f);

    function f(e) {
        if (e.target.classList.contains('equals')) {
            let arr = displayToArray();
            prodQuo(arr);
            sumDiff(arr);
        }
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
    display.value = result;
}

function displayToArray() {
    display.value = display.value.replace(/[+]/gi, ",+,");
    display.value = display.value.replace(/[-]/gi, ",-,");
    display.value = display.value.replace(/[*]/gi, ",*,");
    display.value = display.value.replace(/[/]/gi, ",/,");
    return display.value.split(',');
}

function clickPressClear() {
    const clicked = document.querySelector('.container');
    clicked.addEventListener('click', f);

    function f(e) {
        if (e.target.classList.contains('clear')) {
            display.value = '0';
        }
    }
}

function clickPressDec() {
    const clicked = document.querySelector('.container');
    clicked.addEventListener('click', f);

    function f(e) {
        if (e.target.classList.contains('dec')) {
            display.value += '.';
        }
    }
}

function clickPressBack() {
    const clicked = document.querySelector('.container');
    clicked.addEventListener('click', f);

    function f(e) {
        if (e.target.classList.contains('back')) {
            display.value = display.value.substring(0, display.value.length - 1);
        }
    }
}
