const numberBtns = document.querySelectorAll('.num');
const operaterBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('#equals');
const clearBtn = document.querySelector('#clear');
const deleteBtn = document.querySelector('#delete');
const display = document.querySelector('.display');
const storage = {
  operator: '',
  num1: '',
  num2: '',
}

numberBtns.forEach(num => {
  num.addEventListener('click', appendStoredNum);
});
operaterBtns.forEach(operator => {
  operator.addEventListener('click', appendStoredOp);
});
equalBtn.addEventListener('click', () => console.log(operate(storage.operator,
  storage.num1, storage.num2)));
clearBtn.addEventListener('click', function() {console.log(this)});
deleteBtn.addEventListener('click', function() {console.log(this)});

function appendStoredNum() {
  //if no operator is selected, add number to num1, otherwise add to num2
  //omit leading zeros
  if (storage.operator === '') {
    storage.num1 += (this.textContent === '0' && storage.num1 === '')?
      '' : this.textContent;
  } else {
    storage.num2 += (this.textContent === '0' && storage.num2 === '')?
      '' : this.textContent;
  }
}

function appendStoredOp() {
  if (storage.num1 === '') { //if first number not entered, make it zero
    storage.num1 = '0';
  } else if (storage.num2 !== '') { //if second number is entered, operate first
    console.log(operate(storage.operator, storage.num1, storage.num2));
    storage.num2 = ''; //reset second number
  }
  storage.operator = this.textContent;
}

function operate(operator, num1, num2) { //perform operation, apply ansser to first number
  switch (operator) {
    case '+':
      storage.num1 = add(num1, num2).toString();
      break;
    case '-':
      storage.num1 = subtract(num1,num2).toString();
      break;
    case '\u00D7': //multiplication symbol
      storage.num1 = multiply(num1, num2).toString();
      break;
    case '\u00F7': //division symbol
      storage.num1 = divide(num1,num2).toString();
  }
  return storage.num1;
}

function add(num1, num2) {
  return (Number(num1) + Number(num2));
}

function subtract(num1, num2) {
  return (Number(num1) - Number(num2));
}

function multiply(num1, num2) {
  return (Number(num1) * Number(num2));
}

function divide(num1, num2) {
  return (Number(num1) / Number(num2));
}