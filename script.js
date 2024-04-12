function operate(firstNumber, secondNumber, operator) {
  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);

  switch (operator) {
    case '+':
      return firstNumber + secondNumber;
    case '-':
      return firstNumber - secondNumber;
    case '*':
      return firstNumber * secondNumber;
    case '/':
      return Math.round((firstNumber / secondNumber) * 100) / 100;
    default:
      return NaN;
  }
}

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
let firstNumber = '';
let secondNumber = '';
let operator = '';
let decimalCount = 0;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('number')) {
      if (!operator) {
        firstNumber += button.textContent;
        display.textContent = firstNumber;
      } else {
        secondNumber += button.textContent;
        display.textContent = secondNumber;
      }
    } else if (button.classList.contains('operator')) {
      if (firstNumber && !secondNumber) {
        operator = button.textContent;
        decimalCount = 0;
      } else if (firstNumber && secondNumber) {
        firstNumber = operate(firstNumber, secondNumber, operator);
        secondNumber = '';
        operator = button.textContent;
        display.textContent = firstNumber;
        decimalCount = 0;
      }
    } else if (button.id === 'decimal' && !decimalCount) {
      decimalCount++;
      if (!operator) {
        if (firstNumber) {
          firstNumber += button.textContent;
          display.textContent = firstNumber;
        } else {
          firstNumber = '0' + button.textContent;
          display.textContent = firstNumber;
        }
      } else {
        if (secondNumber) {
          secondNumber += button.textContent;
          display.textContent = secondNumber;
        } else {
          secondNumber = '0' + button.textContent;
          display.textContent = secondNumber;
        }
      }
    } else if (button.id === 'equal') {
      if (firstNumber && secondNumber && operator) {
        firstNumber = operate(firstNumber, secondNumber, operator);
        secondNumber = '';
        operator = '';
        display.textContent = firstNumber;
        decimalCount = 0;
      }
    } else if (button.id === 'clear') {
      firstNumber = '';
      secondNumber = '';
      operator = '';
      display.textContent = '0';
      decimalCount = 0;
    } else if (button.id === 'delete') {
      if (!operator) {
        firstNumber = firstNumber.slice(0, -1);
        firstNumber ? display.textContent = firstNumber : display.textContent = '0';
      } else {
        secondNumber = secondNumber.slice(0, -1);
        secondNumber ? display.textContent = secondNumber : display.textContent = '0';
      }
    }
  })
})