// NOTE: 

// THIS IS Martin STERIN code
// This is the starter file for a blog post "How to build a calculator". You can follow the lesson at https://zellwk.com/blog/calculator-part-1

// # START EDITING YOUR JAVASCRIPT HERE
// ===============

document.addEventListener('DOMContentLoaded', function () {
    const display = document.querySelector('.calculator__display'); // Sélectionne l'écran de la calculatrice
    const buttons = document.querySelectorAll('.calculator__keys button'); // Sélectionne tous les boutons

    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = this.textContent; // Obtient le texte du bouton cliqué

            if (buttonText === 'AC') {
                display.textContent = '0';
                firstOperand = null;
                operator = null;
                waitingForSecondOperand = false;
                return;
            }

            if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/' || buttonText === '=') {
                if (firstOperand === null) {
                    firstOperand = parseFloat(display.textContent);
                } else if (operator) {
                    const secondOperand = parseFloat(display.textContent);
                    const result = performCalculation(firstOperand, secondOperand, operator);
                    display.textContent = result;
                    firstOperand = result;
                }
                operator = buttonText;
                waitingForSecondOperand = true;
            } else {
                if (waitingForSecondOperand) {
                    display.textContent = buttonText;
                    waitingForSecondOperand = false;
                } else {
                    display.textContent = display.textContent === '0' ? buttonText : display.textContent + buttonText;
                }
            }
        });
    });

    function performCalculation(num1, num2, operator) {
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2;
            default:
                return num2;
        }
    }

    document.addEventListener('keydown', function (event) {
        const keyName = event.key;

        if (/[\d\+\-\*\/]/.test(keyName)) {
            if (keyName === '+' || keyName === '-' || keyName === '*' || keyName === '/') {
                if (firstOperand === null) {
                    firstOperand = parseFloat(display.textContent);
                } else if (operator) {
                    const secondOperand = parseFloat(display.textContent);
                    const result = performCalculation(firstOperand, secondOperand, operator);
                    display.textContent = result;
                    firstOperand = result;
                }
                operator = keyName;
                waitingForSecondOperand = true;
            } else {
                if (waitingForSecondOperand) {
                    display.textContent = keyName;
                    waitingForSecondOperand = false;
                } else {
                    display.textContent = display.textContent === '0' ? keyName : display.textContent + keyName;
                }
            }
        } else if (keyName === 'Escape') {
            display.textContent = '0';
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
        } else if (keyName === '=') {
            if (operator && waitingForSecondOperand) {
                const secondOperand = parseFloat(display.textContent);
                const result = performCalculation(firstOperand, secondOperand, operator);
                display.textContent = result;
                firstOperand = null;
                operator = null;
                waitingForSecondOperand = false;
            }
        }
    });
});
