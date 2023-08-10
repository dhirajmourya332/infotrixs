/**
 *
 * @param {[]} expression
 * @returns stringified expression with '|' at position of cursor
 */

export default function StringifyExpression(expression) {
  let stringifiedExpression = "";
  expression.forEach((element, index) => {
    switch (element["type"]) {
      case "cursor":
        stringifiedExpression += "|";
        break;
      case "number":
      case "result":
        stringifiedExpression += element["value"];
        break;

      case "operator":
        switch (element["operator_type"]) {
          case "addition":
            stringifiedExpression += " + ";
            break;
          case "substraction":
            stringifiedExpression += " - ";
            break;
          case "multiplication":
            stringifiedExpression += " * ";
            break;
          case "division":
            stringifiedExpression += " / ";
            break;

          default:
            break;
        }
        break;

      case "decimal":
        stringifiedExpression += ".";
        break;

      case "constant":
        switch (element["constant_type"]) {
          case "pie":
            stringifiedExpression += "π";
            break;
          case "eular":
            stringifiedExpression += "E";
            break;
          default:
            break;
        }
        break;

      case "function":
        switch (element["function_type"]) {
          case "sin":
            stringifiedExpression += "sin(";
            break;
          case "cos":
            stringifiedExpression += "cos(";
            break;
          case "tan":
            stringifiedExpression += "tan(";
            break;
          case "sqrt":
            stringifiedExpression += "sqrt(";
            break;
          case "ln":
            stringifiedExpression += "ln(";
            break;
          case "fact":
            stringifiedExpression += "factorial(";
            break;
          case "log":
            stringifiedExpression += "log(";
            break;
          case "square":
            stringifiedExpression += "square(";
            break;

          default:
            break;
        }
        stringifiedExpression += StringifyExpression(element["expression"]);
        stringifiedExpression += ")";

        break;

      case "bracket":
        if (element["bracket_type"] === "opening") {
          stringifiedExpression += "(";
        } else {
          stringifiedExpression += ")";
        }
        break;

      case "Error":
        stringifiedExpression += "Error!";
        break;

      default:
        break;
    }
  });

  return stringifiedExpression;
}
