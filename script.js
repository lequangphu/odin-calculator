function operate(firstNumber, secondNumber, operator) {

  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);

  let result;

  switch (operator) {
    case '+':
      result = firstNumber + secondNumber;
      break;
    case '-':
      result = firstNumber - secondNumber;
      break;
    case '*':
      result = firstNumber * secondNumber;
      break;
    case '/':
      if (secondNumber === 0) {
        alert('Cannot divide by zero');
      } else {
        result = firstNumber / secondNumber;
      }
      break;
  }

  if (result % 1 !== 0) {
    const resultString = result.toString();
    const decimalPart = resultString.split('.')[1];
    
    if (decimalPart && decimalPart.length > 10) {
      result = Math.round(result * 1e10) / 1e10;
    }
  }

  return result;
}

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
let firstNumber = '';
let secondNumber = '';
let operator = '';
let decimalCount = 0;
let negate = false;

// Add data-key attribute to each button in the HTML
buttons.forEach((button) => {
  button.setAttribute('data-key', button.textContent);
});

// Add keyboard event listener for keydown
document.addEventListener('keydown', (event) => {
  const key = event.key;
  const button = document.querySelector(`button[data-key="${key}"]`);

  if (button) {
    button.click();
  }
});

// Calculating logics
buttons.forEach(button => {
  
  button.addEventListener('click', () => {
    
    if (button.classList.contains('number')) {
      
      console.log(button.textContent);
      
      if (!operator) {
        firstNumber += button.textContent;
        display.textContent = firstNumber;
      } else {
        secondNumber += button.textContent;
        display.textContent = secondNumber;
      }
    } else if (button.classList.contains('operator')) {
      
      console.log(button.textContent);
      
      if (firstNumber && !secondNumber) {
        operator = button.textContent;
        decimalCount = 0;
      } else if (firstNumber && secondNumber) {
        firstNumber = operate(firstNumber, secondNumber, operator);
        secondNumber = '';
        operator = button.textContent;
        display.textContent = firstNumber;
        decimalCount = 0;
      } else if (display.textContent && !firstNumber) {
        operator = button.textContent;
        firstNumber = display.textContent;
        decimalCount = 0;
      }
    } else if (button.id === 'decimal') {
      
      console.log(button.textContent);
      
      if (!decimalCount) {
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
      } else {
        alert('A number cannot have more than one decimal!');
      }
    } else if (button.id === 'equal') {
      
      console.log(button.textContent);
      
      if (firstNumber && secondNumber && operator) {
        display.textContent = operate(firstNumber, secondNumber, operator);
        firstNumber = '';
        secondNumber = '';
        operator = '';
        decimalCount = 0;
      } else {
        alert('Not enough data to calculate, click Clear button to start again!')
      }
    } else if (button.id === 'clear') {
      
      console.log(button.textContent);
      
      firstNumber = '';
      secondNumber = '';
      operator = '';
      display.textContent = '0';
      decimalCount = 0;
    } else if (button.id === 'delete') {
      
      console.log(button.textContent);
      
      if (!operator) {
        firstNumber = firstNumber.slice(0, -1);
        firstNumber ? display.textContent = firstNumber : display.textContent = '0';
      } else {
        secondNumber = secondNumber.slice(0, -1);
        secondNumber ? display.textContent = secondNumber : display.textContent = '0';
      }
    } else if (button.id === 'negate') {

      console.log(button.textContent);
      
      if (parseFloat(display.textContent) > 0) {
        if (!secondNumber) {
          display.textContent = '-' + display.textContent;
          firstNumber = display.textContent;
        } else {
          display.textContent = '-' + display.textContent;
          secondNumber = display.textContent;
        }
      } else if (parseFloat(display.textContent) < 0) {
        if (!secondNumber) {
          display.textContent = display.textContent.slice(1);
          firstNumber = display.textContent;
        } else {
          display.textContent = display.textContent.slice(1);
          secondNumber = display.textContent;
        }
      }
    } else if (button.id === 'percent') {

      console.log(button.textContent);
      
      if (firstNumber && !secondNumber) {
        firstNumber = (parseFloat(firstNumber) / 100).toString();
        display.textContent = firstNumber;
      } else if (firstNumber && secondNumber) {
        secondNumber = (parseFloat(secondNumber) / 100).toString();
        display.textContent = secondNumber;
      }
    }
  })
})
