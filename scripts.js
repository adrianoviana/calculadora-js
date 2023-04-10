/*
*Este arquivo contém uma classe "Calculator" que representa uma calculadora básica em JavaScript.
*/
class Calculator {
  /**
   * O construtor da classe recebe dois elementos do DOM como parâmetros,
   * que serão usados para mostrar o operando anterior e o operando atual da calculadora.
   * Ele chama a função "clear()" para inicializar os valores das variáveis.
   */
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  /**
   * Esta função é chamada pelo construtor e também pelo botão "AC" da calculadora.
   * Ela redefine o operando atual, o operando anterior e a operação.
   */
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  /**
   * Esta função é chamada pelo botão "DEL" da calculadora.
   * Ela remove o último dígito do operando atual.
   */
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  /**
   * Esta função é chamada quando um dos botões de número é clicado.
   * Ela adiciona o número clicado ao operando atual.
   * Se o número for uma vírgula e o operando atual já tiver uma vírgula, a função não faz nada.
   */
  appendNumber(number) {
    if (number === "," && this.currentOperand.includes(",")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  /**
   * Esta função é chamada quando um dos botões de operação é clicado.
   * Se não houver operando atual, a função não faz nada.
   * Se houver um operando anterior, a função chama a função "compute()".
   * Em seguida, ela define a operação selecionada como a nova operação e move o operando atual para o operando anterior,
   * limpando o operando atual.
   */
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  /**
   * Esta função é chamada quando o botão "=" é clicado.
   * Ela calcula o resultado da operação atual e atualiza o operando atual com o resultado.
   * A operação é definida como indefinida e o operando anterior é limpo.
   */
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
  /**
   * Esta função recebe um número como parâmetro e retorna uma string formatada
   * para exibir na tela da calculadora.
   * Ela separa os dígitos antes e depois da vírgula,
   * formata os dígitos antes da vírgula com separador de milhar e retorna a string formatada.
   */
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(",")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("pt-br", {
        style: "decimal",
        minimumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay},${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  /**
   * Esta função atualiza os elementos do DOM que exibem o operando anterior e o operando atual com os valores atualizados.
   * Se não houver operação selecionada, o elemento do operando anterior é limpo.
   */
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

/**
 * cria eventos de clique para os botões da calculadora e os associa às funções correspondentes da classe "Calculator".
 */
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-term]"
);
const currentOperandTextElement = document.querySelector("[data-current-term]");

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
