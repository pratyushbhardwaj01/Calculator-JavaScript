let currentOperand = "";
let previousOperand = "";
let opt = "";
function appendNumber(number) {
  if (currentOperand.includes(".") && number === ".") return;
  currentOperand += number.toString();
}
function Delete() {
  currentOperand = currentOperand.toString().slice(0, -1);
}

function allClear() {
  currentOperand = "";
  previousOperand = "";
  opt = "";
}

function chooseOperation(operation) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    opt = operation;
    compute();
  }
  previousOperand = currentOperand;
  opt = operation;
  currentOperand = "";
}
function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) return;
  switch (opt) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "*":
      computation = prev * curr;
      break;
    case "/":
      computation = prev / curr;
      break;
  }
  currentOperand = computation;
  prevOperand = "";
  opt = "";
}

function updateDisplay() {
  currentOperandInnerText.value = currentOperand;
  if (opt !== "") {
    previousOperandInnerText.value = `${previousOperand} ${opt}`;
  } else {
    previousOperandInnerText.value = "";
  }
}

const numbers = document.querySelectorAll("[data-numbers]");
const operators = document.querySelectorAll("[data-operators]");
const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-all-clear]");
const previousOperandInnerText = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandInnerText = document.querySelector(
  "[data-current-operand]"
);
const equalBtn = document.querySelector("[data-equals]");

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    appendNumber(number.textContent.trim());
    updateDisplay();
  });
});
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    chooseOperation(operator.textContent.trim());

    updateDisplay();
  });
});
deleteBtn.addEventListener("click", () => {
  Delete();
  updateDisplay();
});
allClearBtn.addEventListener("click", () => {
  allClear();
  updateDisplay();
});
equalBtn.addEventListener("click", () => {
  compute();
  updateDisplay();
});
