const buttonContainer = document.querySelector('.button-container');
const output = document.querySelector('.output-text');

const numberList = '0123456789';
const operatorList = '/*+-';
let result;

let operation = {
    operand1: [],
    operator: undefined,
    operand2: [],
}

buttonContainer.addEventListener('click', (e) => {
    if (numberList.includes(e.target.textContent)) {
        addOperand(e)
    } else if (operatorList.includes(e.target.textContent)) {
        changeOperator(e);
    } else if (e.target.textContent === 'AC') {
        operation.operand1 = [];
        operation.operand2 = [];
        operation.operator = undefined;
        output.textContent = 'All cleared.';
    } else if (e.target.textContent === 'DEL') {
        deleteOneCharacter(e);
    } else if (e.target.textContent === '=') {
        evaluate();
    } else if (e.target.textContent === '.') {
        addDecimalPoint(e);
    }
})

function changeOperator(e) {
    if (operation.operand1.length !== 0 &&
        operation.operand2.length !== 0 &&
        operation.operator !== undefined
    ) {
        evaluate(e);
        changeOperator(e);
    } else if (operation.operand1.length === 0) {
        output.textContent = 'First operand is missing...';
    } else {
        operation.operator = e.target.textContent;
        output.textContent += e.target.textContent;
    }
}

function addOperand(e) {
    if (operation.operator !== undefined) {
        operation.operand2.push(e.target.textContent);
        output.textContent += e.target.textContent;
    }  else {
        operation.operand1.push(e.target.textContent);
        output.textContent = operation.operand1.join('');
    }
}

function evaluate() {
    if (operation.operand1.length !== 0 
        && operation.operator !== undefined
        && operation.operand2.length !== 0
    ) { 
        if (operation.operator == '/') {
            result = Number(operation.operand1.join('')) / Number(operation.operand2.join(''));
        } else if (operation.operator == '*') {
            result = Number(operation.operand1.join('')) * Number(operation.operand2.join(''));
        } else if (operation.operator == '-') {
            result = Number(operation.operand1.join('')) - Number(operation.operand2.join(''));
        } else if (operation.operator == '+') {
            result = Number(operation.operand1.join('')) + Number(operation.operand2.join(''));
        }
    }

    output.textContent = result;
    operation.operand1 = [result];
    operation.operator = undefined;
    operation.operand2 = [];
}

function addDecimalPoint(e) {
    if (operation.operator !== undefined) {
        if (!operation.operand2.includes('.')) {
            operation.operand2.push(e.target.textContent);
            output.textContent += '.';
        }
    }  else {
        if (!operation.operand1.includes('.')) {
            operation.operand1.push(e.target.textContent);
            output.textContent = operation.operand1.join('');
        }
    }
}

function deleteOneCharacter(e) {
    let outputArray = output.textContent.split('');
    outputArray.splice(-1, 1);
    output.textContent = outputArray.join('');

    if (operation.operator == undefined) {
        operation.operand1.pop();
    } else if (operation.operand2.length == 0) {
        operation.operator = undefined;
    } else {
        operation.operand2.pop();
    }
}