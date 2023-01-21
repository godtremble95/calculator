const numberBtns = document.querySelectorAll('.num');
const operaterBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('#equals');
const clearBtn = document.querySelector('#clear');
const deleteBtn = document.querySelector('#delete');
const decimalBtn = document.querySelector('#decimal');
const negateBtn = document.querySelector('#negate');
const display = document.querySelector('.display');
const storage = {
  operator: '',
  num1: null,
  num2: null,
  answer: '0',
}
let overwrite = true;
const refreshDisplay = setInterval(() => { //setup a screen refresh
  display.textContent = (Number(storage.answer) % 1) ? 
  Math.round(Number(storage.answer) * 100) / 100 :
  storage.answer;
}, 100)

numberBtns.forEach(num => {
  num.addEventListener('click', appendStoredNum);
});
operaterBtns.forEach(operator => {
  operator.addEventListener('click', appendStoredOp);
});
equalBtn.addEventListener('click', evaluate);
clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', backSpace);
decimalBtn.addEventListener('click', makeFloat);
negateBtn.addEventListener('click', negate);

function appendStoredNum() {
  //append entered number to the end of on-screen number, unless overwrite is true
  storage.answer = (overwrite || storage.answer === '0') ?
    this.textContent :
    storage.answer + this.textContent;
  overwrite = false;
}

function appendStoredOp() {
  //operate if there's a number in num1, but not num2
  if (storage.num1 !== null && storage.num2 === null) {
    console.log(operate(storage.operator, storage.num1, Number(storage.answer)));
  }
  storage.num1 = Number(storage.answer); //place on-screen number to num1
  storage.num2 = null;
  overwrite = true;
  storage.operator = this.textContent;
}

function evaluate() {
  //if there's a number in num2 OR no operator,
  //place on-screen number in num1; otherwise place in num2
  if (storage.num2 !== null || storage.operator === '') {
    storage.num1 = Number(storage.answer);
  } else {
    storage.num2 = Number(storage.answer);
  }
  console.log(operate(storage.operator, storage.num1, storage.num2));
  overwrite = true;
}

function clear() {
  storage.operator = '';
  storage.num1 = null;
  storage.num2 = null;
  storage.answer = '0';
  overwrite = true;
}

function backSpace() {
  //only delete user-entered numbers
  if (!overwrite) {
    storage.answer = storage.answer.substring(0, storage.answer.length -1);
  }
}

function makeFloat() {
  storage.answer = (overwrite) ?
    '0.' :  //if overwite enabled, decimal overwrites with leading zero
    (!storage.answer.includes('.')) ? //if decimal already present, do noting;
      storage.answer + '.' :          //otherwise append decimal to end
      storage.answer;
  overwrite = false;
}

function negate() {
  storage.answer = (Number(storage.answer) * -1).toString();
}

function operate(operator, num1, num2) {
  switch (operator) {
    case '+':
      storage.answer = add(num1, num2).toString();
      break;
    case '-':
      storage.answer = subtract(num1,num2).toString();
      break;
    case '\u00D7': //multiplication symbol
      storage.answer = multiply(num1, num2).toString();
      break;
    case '\u00F7': //division symbol
      storage.answer = divide(num1,num2).toString();
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
  return (num2 !== 0) ? (num1 / num2): 'no, just no';
}