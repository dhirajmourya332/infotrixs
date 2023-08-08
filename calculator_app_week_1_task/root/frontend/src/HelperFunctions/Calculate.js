// const expression = [
//   { type: "number", value: 5 },
//   { type: "decimal" },
//   { type: "number", value: 3 },
//   { type: "operator", operator_type: "addition" },
//   {
//     type: "function",
//     function_type: "sin",
//     expression: [
//       { type: "constant", constant_type: "pie" },
//       { type: "operator", operator_type: "multiplication" },
//       { type: "bracket", bracket_type: "opening" },
//       { type: "number", value: 8 },
//       { type: "operator", operator_type: "addition" },
//       { type: "number", value: 5 },
//       { type: "bracket", bracket_type: "closing" },
//     ],
//   },
// ];

/**
 *
 * @param {[]} expression
 * @returns result of calculation of expression
 */

export default function Calculate(expression) {
  let funcBody =
    "function square(num) { return num * num; };function factorial(num) { if (num > 170) return Infinity; if (num < 0) return -1; else if (num == 0) return 1; else { return num * factorial(num - 1); } };return ";
  expression.forEach((element) => {
    switch (element["type"]) {
      case "number":
      case "result":
        funcBody += element["value"];
        break;

      case "operator":
        switch (element["operator_type"]) {
          case "addition":
            funcBody += "+";
            break;

          case "substraction":
            funcBody += "-";
            break;

          case "division":
            funcBody += "/";
            break;

          case "multiplication":
            funcBody += "*";
            break;

          default:
            break;
        }
        break;

      case "decimal":
        funcBody += ".";
        break;

      case "constant":
        switch (element["constant_type"]) {
          case "pie":
            funcBody += "Math.PI";
            break;

          case "eular":
            funcBody += "Math.E";
            break;

          default:
            break;
        }
        break;

      case "function":
        switch (element["function_type"]) {
          case "sin":
            funcBody += "Math.sin(";
            break;

          case "cos":
            funcBody += "Math.cos(";
            break;

          case "tan":
            funcBody += "Math.tan(";
            break;

          case "sqrt":
            funcBody += "Math.sqrt(";
            break;

          case "ln":
            funcBody += "Math.log(";
            break;

          case "fact":
            funcBody += "factorial(";
            break;

          case "log":
            funcBody += "(1 / 2.303) * Math.log(";
            break;

          case "square":
            funcBody += "square(";
            break;
          default:
            break;
        }
        funcBody += Calculate(element["expression"]);
        funcBody += ")";
        break;

      case "bracket":
        if (element["bracket_type"] === "opening") {
          funcBody += "(";
        } else {
          funcBody += ")";
        }
        break;

      default:
        break;
    }
  });
  try {
    console.log(funcBody);
    let calculationResult = new Function(funcBody)();
    //this is to return 0 instead of negligible number
    if (Math.abs(calculationResult) < Number.EPSILON) {
      calculationResult = 0;
    }
    return calculationResult;
  } catch (error) {
    return "error";
  }
}
