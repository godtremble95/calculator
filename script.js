const numberBtns = document.querySelectorAll('.num');
const operaterBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('#equals');
const clearBtn = document.querySelector('#clear');
const deleteBtn = document.querySelector('#delete');
const display = document.querySelector('.display');
const storage = {
  operator: '',
  num1: null,
  num2: null,
  answer: 0,
}
let overwrite = true;

numberBtns.forEach(num => {
  num.addEventListener('click', appendStoredNum);
});
operaterBtns.forEach(operator => {
  operator.addEventListener('click', appendStoredOp);
});
equalBtn.addEventListener('click', evaluate);
clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', backSpace);

function appendStoredNum() {
  //append entered number to the end of on-screen number, unless overwrite is true
  storage.answer = (overwrite) ?
    Number(this.textContent) :
    Number(storage.answer.toString() + this.textContent);
  overwrite = false;
}

function appendStoredOp() {
  //operate if there's a number in num1, but not num2
  if (storage.num1 !== null && storage.num2 === null) {
    console.log(operate(storage.operator, storage.num1, storage.answer));
  }
  storage.num1 = storage.answer; //place on-screen number to num1
  storage.num2 = null;
  overwrite = true;
  storage.operator = this.textContent;
}

function evaluate() {
  //if there's a number in num2 OR no operator,
  //place on-screen number in num1; otherwise place in num2
  if (storage.num2 !== null || storage.operator === '') {
    storage.num1 = storage.answer;
  } else {
    storage.num2 = storage.answer;
  }
  console.log(operate(storage.operator, storage.num1, storage.num2));
  overwrite = true;
}

function clear() {
  storage.operator = '';
  storage.num1 = null;
  storage.num2 = null;
  storage.answer = 0;
}

function backSpace() {
  //only delete user-entered numbers
  if (!overwrite) {
    storage.answer =Number(storage.answer.toString().
      substring(0, storage.answer.toString().length -1));
  }
}

function operate(operator, num1, num2) { //perform operation, apply ansser to first number
  switch (operator) {
    case '+':
      storage.answer = add(num1, num2);
      break;
    case '-':
      storage.answer = subtract(num1,num2);
      break;
    case '\u00D7': //multiplication symbol
      storage.answer = multiply(num1, num2);
      break;
    case '\u00F7': //division symbol
      storage.answer = divide(num1,num2);
      break;
  }
  return storage.answer;
}

function add(num1, num2) {
  return (num1 + num2);
}

function subtract(num1, num2) {
  return (num1 - num2);
}

function multiply(num1, num2) {
  return (num1 * num2);
}

function divide(num1, num2) {
  return (num1 / num2);
}