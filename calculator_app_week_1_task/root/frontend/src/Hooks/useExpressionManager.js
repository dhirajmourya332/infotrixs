/**
 * manages the expression
 * provides functionalities to:
 *  set new expression from history
 *  add new element to expression
 *  delete a element from expression
 *  clear expression
 *
 *  and provides expression arrray
 *
 */

import { useEffect, useState } from "react";

export default function useExpressionManager() {
  const [root, setRoot] = useState({
    type: "root",
    expression: [],
    cursorStack: [0],
  });

  useEffect(() => {
    const mapKeyBoardToCalculatorKeyPad = (e) => {
      console.log(e.key);
      switch (e.key) {
        case "+":
          addElement({ type: "operator", operator_type: "addition" });
          break;
        case "-":
          addElement({ type: "operator", operator_type: "substraction" });
          break;
        case "*":
          addElement({ type: "operator", operator_type: "multiplication" });
          break;
        case "/":
          addElement({ type: "operator", operator_type: "division" });
          break;

        case "" + Number(e.key) < 10 ? e.key : null + "":
          addElement({ type: "number", value: Number(e.key) });
          break;

        case "(":
          addElement({ type: "bracket", bracket_type: "opening" });
          break;
        case ")":
          addElement({ type: "bracket", bracket_type: "closing" });
          break;

        case ".":
          addElement({ type: "decimal" });
          break;
        case "Backspace":
          deleteElement();
          break;

        default:
          break;
      }
    };
    window.addEventListener("keydown", mapKeyBoardToCalculatorKeyPad);
    return () => {
      window.removeEventListener("keydown", mapKeyBoardToCalculatorKeyPad);
    };
  }, []);

  const addNumber = (root, element) => {
    let topExpressionLayer = root;
    for (let i = 0; i < root["cursorStack"].length - 1; i++) {
      topExpressionLayer =
        topExpressionLayer["expression"][root["cursorStack"][i]];
    }
    //case when user enters a number without adding any operator then adding multiplication operator by default
    if (
      topExpressionLayer["expression"].length > 0 &&
      (topExpressionLayer["expression"][
        root["cursorStack"][root["cursorStack"].length - 1] - 1
      ]["type"] === "function" ||
        topExpressionLayer["expression"][
          root["cursorStack"][root["cursorStack"].length - 1] - 1
        ]["type"] === "constant" ||
        topExpressionLayer["expression"][
          root["cursorStack"][root["cursorStack"].length - 1] - 1
        ]["type"] === "result" ||
        topExpressionLayer["expression"][
          root["cursorStack"][root["cursorStack"].length - 1] - 1
        ]["bracket_type"] === "closing")
    ) {
      addOperator(root, { type: "operator", operator_type: "multiplication" });
    }
    topExpressionLayer["expression"].splice(
      root["cursorStack"][root["cursorStack"].length - 1],
      0,
      element
    );
    root["cursorStack"][root["cursorStack"].length - 1]++;
    return root;
  };

  const addDecimal = (root, element) => {
    let topExpressionLayer = root;
    for (let i = 0; i < root["cursorStack"].length - 1; i++) {
      topExpressionLayer =
        topExpressionLayer["expression"][root["cursorStack"][i]];
    }
    //case when user don't add 0 before decimal
    if (
      topExpressionLayer["expression"].length === 0 ||
      topExpressionLayer["expression"][
        root["cursorStack"][root["cursorStack"].length - 1] - 1
      ]["type"] !== "number"
    ) {
      addNumber(root, { type: "number", value: 0 });
    }
    topExpressionLayer["expression"].splice(
      root["cursorStack"][root["cursorStack"].length - 1],
      0,
      element
    );
    root["cursorStack"][root["cursorStack"].length - 1]++;
    return root;
  };

  const addOperator = (root, element) => {
    let topExpressionLayer = root;
    for (let i = 0; i < root["cursorStack"].length - 1; i++) {
      topExpressionLayer =
        topExpressionLayer["expression"][root["cursorStack"][i]];
    }
    //case when user add an operator even if there is operator before
    if (
      topExpressionLayer["expression"].length > 0 &&
      topExpressionLayer["expression"][
        root["cursorStack"][root["cursorStack"].length - 1] - 1
      ]["type"] === "operator"
    ) {
      topExpressionLayer["expression"][
        root["cursorStack"][root["cursorStack"].length - 1] - 1
      ]["operator_type"] = element["operator_type"];
    } else if (topExpressionLayer["expression"].length === 0) {
      if (
        element["operator_type"] === "addition" ||
        element["operator_type"] === "substraction"
      ) {
        topExpressionLayer["expression"].splice(
          root["cursorStack"][root["cursorStack"].length - 1],
          0,
          element
        );
        root["cursorStack"][root["cursorStack"].length - 1]++;
      }
    } else {
      topExpressionLayer["expression"].splice(
        root["cursorStack"][root["cursorStack"].length - 1],
        0,
        element
      );
      root["cursorStack"][root["cursorStack"].length - 1]++;
    }
    return root;
  };

  const addFunction = (root, element) => {
    let topExpressionLayer = root;
    for (let i = 0; i < root["cursorStack"].length - 1; i++) {
      topExpressionLayer =
        topExpressionLayer["expression"][root["cursorStack"][i]];
    }
    //case when user enters a function without adding any poerator then adding multiplication operator by default
    if (
      topExpressionLayer["expression"].length > 0 &&
      topExpressionLayer["expression"][
        root["cursorStack"][root["cursorStack"].length - 1] - 1
      ]["type"] !== "operator"
    ) {
      addOperator(root, { type: "operator", operator_type: "multiplication" });
    }
    topExpressionLayer["expression"].splice(
      root["cursorStack"][root["cursorStack"].length - 1],
      0,
      element
    );
    root["cursorStack"].push(0);
    console.log(root);
    return root;
  };

  const addConstant = (root, element) => {
    let topExpressionLayer = root;
    for (let i = 0; i < root["cursorStack"].length - 1; i++) {
      topExpressionLayer =
        topExpressionLayer["expression"][root["cursorStack"][i]];
    }
    //case when user enters a constant without adding any poerator then adding multiplication operator by default
    if (
      topExpressionLayer["expression"].length > 0 &&
      topExpressionLayer["expression"][
        root["cursorStack"][root["cursorStack"].length - 1] - 1
      ]["type"] !== "operator"
    ) {
      addOperator(root, { type: "operator", operator_type: "multiplication" });
    }
    topExpressionLayer["expression"].splice(
      root["cursorStack"][root["cursorStack"].length - 1],
      0,
      element
    );
    root["cursorStack"][root["cursorStack"].length - 1]++;

    return root;
  };

  const addBracket = (root, element) => {
    let topExpressionLayer = root;
    for (let i = 0; i < root["cursorStack"].length - 1; i++) {
      topExpressionLayer =
        topExpressionLayer["expression"][root["cursorStack"][i]];
    }
    if (element["bracket_type"] === "opening") {
      //case when user enters a opening bracket without adding any operator then adding multiplication operator by default
      if (
        topExpressionLayer["expression"].length > 0 &&
        topExpressionLayer["expression"][
          root["cursorStack"][root["cursorStack"].length - 1] - 1
        ]["type"] !== "operator"
      ) {
        addOperator(root, {
          type: "operator",
          operator_type: "multiplication",
        });
      }
      topExpressionLayer["expression"].splice(
        root["cursorStack"][root["cursorStack"].length - 1],
        0,
        element
      );
      root["cursorStack"][root["cursorStack"].length - 1]++;
      topExpressionLayer["expression"].splice(
        root["cursorStack"][root["cursorStack"].length - 1],
        0,
        { type: "bracket", bracket_type: "closing" }
      );
    } else if (
      topExpressionLayer["expression"].length >
        root["cursorStack"][root["cursorStack"].length - 1] &&
      topExpressionLayer["expression"][
        root["cursorStack"][root["cursorStack"].length - 1]
      ]["bracket_type"] === "closing"
    ) {
      root["cursorStack"][root["cursorStack"].length - 1]++;
    } else {
      if (topExpressionLayer["type"] === "function") {
        root["cursorStack"].pop();
        root["cursorStack"][root["cursorStack"].length - 1]++;
      }
    }
  };

  const addElement = (element) => {
    setRoot((prevRoot) => {
      const prevRootClone = JSON.parse(JSON.stringify(prevRoot));
      if (element["type"] === "number" || element["type"] === "result")
        addNumber(prevRootClone, element);
      if (element["type"] === "decimal") addDecimal(prevRootClone, element);
      if (element["type"] === "operator") addOperator(prevRootClone, element);
      if (element["type"] === "function") addFunction(prevRootClone, element);
      if (element["type"] === "constant") addConstant(prevRootClone, element);
      if (element["type"] === "bracket") addBracket(prevRootClone, element);
      if (element["type"] === "error") {
        prevRootClone["expression"] = [{ type: "error" }];
        prevRootClone["cursorStack"] = [1];
      }
      return prevRootClone;
    });
  };
  const traverseToLayer = (root, layerFromTop = 1) => {
    let layer = root;
    for (let i = 0; i < root["cursorStack"].length - layerFromTop; i++) {
      layer = layer["expression"][root["cursorStack"][i]];
    }
    return layer;
  };
  const deleteElement = () => {
    setRoot((prevRoot) => {
      const root = JSON.parse(JSON.stringify(prevRoot));
      let topExpressionLayer = root;
      for (let i = 0; i < root["cursorStack"].length - 1; i++) {
        topExpressionLayer =
          topExpressionLayer["expression"][root["cursorStack"][i]];
      }

      //case similat to sin(|)
      if (
        topExpressionLayer["type"] === "function" &&
        topExpressionLayer["expression"].length === 0
      ) {
        const secondLayer = traverseToLayer(root, 2);
        root["cursorStack"].pop();
        secondLayer["expression"].splice(
          root["cursorStack"][root["cursorStack"].length - 1],
          1
        );
      }
      //cases similar to sin(30 + 90)|
      else if (
        topExpressionLayer["expression"].length > 0 &&
        topExpressionLayer["expression"][
          root["cursorStack"][root["cursorStack"].length - 1] - 1
        ]["type"] === "function"
      ) {
        root["cursorStack"][root["cursorStack"].length - 1]--;
        root["cursorStack"].push(
          topExpressionLayer["expression"][
            root["cursorStack"][root["cursorStack"].length - 1]
          ]["expression"].length
        );
      }
      //cases similar to (9 * 8)|
      else if (
        topExpressionLayer["expression"].length > 0 &&
        topExpressionLayer["expression"][
          root["cursorStack"][root["cursorStack"].length - 1] - 1
        ]["bracket_type"] === "closing"
      ) {
        root["cursorStack"][root["cursorStack"].length - 1]--;
      }
      //cases like (|)
      else if (
        topExpressionLayer["expression"].length > 0 &&
        topExpressionLayer["expression"][
          root["cursorStack"][root["cursorStack"].length - 1] - 1
        ]["bracket_type"] === "opening" &&
        topExpressionLayer["expression"][
          root["cursorStack"][root["cursorStack"].length - 1]
        ]["bracket_type"] === "closing"
      ) {
        topExpressionLayer["expression"].splice(
          root["cursorStack"][root["cursorStack"].length - 1],
          1
        );
        root["cursorStack"][root["cursorStack"].length - 1]--;
        topExpressionLayer["expression"].splice(
          root["cursorStack"][root["cursorStack"].length - 1],
          1
        );
      } else if (
        topExpressionLayer["type"] !== "root" ||
        (topExpressionLayer["type"] === "root" &&
          topExpressionLayer["expression"].length > 0)
      ) {
        topExpressionLayer["expression"].splice(
          root["cursorStack"][root["cursorStack"].length - 1] - 1,
          1
        );
        root["cursorStack"][root["cursorStack"].length - 1]--;
      }
      return root;
    });
  };

  const clearExpression = () => {
    setRoot({
      type: "root",
      expression: [],
      cursorStack: [0],
    });
  };

  const replaceExpression = (newExpression) => {
    setRoot({
      type: "root",
      expression: newExpression,
      cursorStack: [newExpression.length],
    });
  };

  return {
    root,
    addElement,
    deleteElement,
    clearExpression,
    replaceExpression,
  };
}
