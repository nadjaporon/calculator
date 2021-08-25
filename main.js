const keys = document.querySelector('#digits');
const display = document.querySelector('#output');
const operatorArray = ['+', '-', '*', '/'];
let numbers = [];
let operators = [];
let resetDone = 1;

const digits = document.querySelectorAll('#digits > div');
digits.forEach((digit) => {
    if (!digit.classList.contains('output')) {
        digit.classList.add('box');
    }
})

display.textContent = 0;

function listenToAction(action) {

    if (resetDone == 0) {
        reset();
    }

    if (isNaN(action)) {

        if ((action === '+') ||
            (action === '-') ||
            (action === '*') ||
            (action === '/')) {
            addOperatorToDisplay(action);
        }
        if (action === '=' || action == 'Enter') {
            calculate();
        }
        if (action == '.' || action == ',') {
            addNumberToDisplay('.');
        }

        if (action == 'clear' || action == 'Delete') {
            reset();
        }
    } else {
        addNumberToDisplay(action);
    }
}

function listenToKeys() {
    keys.addEventListener('click', (e) => {
        if (e.target.matches('.box')) {
            let key = e.target;
            let action = key.dataset.action;
            let value = key.dataset.value;

            if (!action) {
                addNumberToDisplay(value);
            }

            listenToAction(action);
        }
    })
}

function listenToKeyboard() {
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        listenToAction(key);
    })
}

function reset() {
    for (let i = 0; i < numbers.length; i++) {
        numbers.pop();
        operators.pop();
    }
    display.textContent = 0;
    resetDone = 1;
}

function addNumberToDisplay(number) {
    if (display.textContent == 0 && number != '.' && display.textContent != '0.') {
        display.textContent = '';
    }
    display.textContent += number;
}

function addOperatorToDisplay(operator) {
    let lastCharacterOfDisplay = display.textContent.substr(-1);    // Letztes Zeichen am Display

    // Abfrage, ob das letzte Zeichen des Displays ein Rechenoperator ist UND
    // das letzte Zeichen der selbe neu übergebene Rechenoperator ist
    // --> dann lösche das letzte Zeichen des Displays
    if (lastCharacterOfDisplay != operator) {
        operatorArray.forEach(function (element) {    // Rechenoperator Array 
            if (lastCharacterOfDisplay == element) { // Abfrage, ob das letzte Zeichen ein Rechenoperator des Arrays ist
                display.textContent = display.textContent.slice(0, -1); // wenn ja -> lösche das letzte Zeichen
                operators.pop();
            }
        });
    } else {    // wenn das letzte Zeichen das neu übergebene Zeichen ist
        display.textContent = display.textContent.slice(0, -1); // lösche das letzte Zeichen
        operators.pop();
    }

    display.textContent += operator;    // Rechenoperator am Display hinzufügen
    operators.push(operator);   // Rechenoperator wird in Array gespeichert
}

// Hier soll berechnet werden wenn "=" gedrückt wird
function calculate() {

    putInArray();

    let result = 0;
    result = parseFloat(result);

    for (let i = 0; i < numbers.length; i++) {
        if (operators[i] == "+") {
            if (i == 0) {
                result += parseFloat(numbers[i]) + parseFloat(numbers[i + 1]);
            } else {
                result += parseFloat(numbers[i + 1]);
            }
        }
        if (operators[i] == "-") {
            if (i == 0) {
                result += parseFloat(numbers[i]) - parseFloat(numbers[i + 1]);
            } else {
                result -= parseFloat(numbers[i + 1]);
            }
        }
        if (operators[i] == "*") {
            if (i == 0) {
                result += parseFloat(numbers[i]) * parseFloat(numbers[i + 1]);
            } else {
                result *= parseFloat(numbers[i + 1]);
            }
        }
        if (operators[i] == "/") {
            if (i == 0) {
                result += parseFloat(numbers[i]) / parseFloat(numbers[i + 1]);
            } else {
                result /= parseFloat(numbers[i + 1]);
            }
        }
    }

    display.textContent = result;
    resetDone = 0;


}

// Zahlen und Rechenoperatoren werden in ein Array gespeichert
function putInArray() {

    let number = display.textContent;

    numbers = number.split(/[*/+-]/);

    // console.table(numbers);
    // console.table(operators);
}

listenToKeys();
listenToKeyboard();