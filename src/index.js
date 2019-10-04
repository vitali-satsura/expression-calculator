function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    let numbers = [];
    let operators = [];
    let countBrackets = 0;

    for (let i = 0; i < expr.length; i++) {
        if (expr[i] == ' ') {
            continue;
        }

        if (expr[i] >= '0' && expr[i] <= '9') {
            let str = "";
            while (i < expr.length && expr[i] >= '0' && expr[i] <= '9') {
                str += expr[i];
                i++;
            }
            i--;
            numbers.push(+str);
        } else if (expr[i] == '(') {
            countBrackets++;
            operators.push(expr[i]);
        } else if (expr[i] == ')') {
            countBrackets--;
            for (let j = operators.length - 1; operators[j] != '(' && j >= 0; j--) {
                numbers.push(calculation(operators.pop(), numbers.pop(), numbers.pop()));
            }
            operators.pop();
        } else if (expr[i] == '+' || expr[i] == '-' || expr[i] == '*' || expr[i] == '/') {
            while (operators.length != 0 && hasPrecedence(expr[i], operators[operators.length - 1])) {
                numbers.push(calculation(operators.pop(), numbers.pop(), numbers.pop()));
            }
            operators.push(expr[i]);
        }
    }

    if (countBrackets != 0) {
        throw new Error("ExpressionError: Brackets must be paired");
    }

    while (operators.length != 0) {
        numbers.push(calculation(operators.pop(), numbers.pop(), numbers.pop()));
    }

    return numbers.pop();
}

function calculation(operator, number2, number1) {
    if (operator == '+') {
        return number1 + number2;
    } else if (operator == '-') {
        return number1 - number2;
    } else if (operator == '*') {
        return number1 * number2;
    } else if (operator == '/') {
        if (number2 === 0) {
            throw new Error("TypeError: Division by zero.");
        }
        return number1 / number2;
    }

    return 0;
}

function hasPrecedence(operator1, operator2) {
    if (operator2 == '(' || operator2 == ')') {
        return false;
    }
    if ((operator1 == '*' || operator1 == '/') && (operator2 == '+' || operator2 == '-')) {
        return false;
    } else {
        return true;
    }
}

module.exports = {
    expressionCalculator
}