import Calculate from "../../HelperFunctions/Calculate";

export default function TabKeyPad({
  expressionRoot,
  addElement,
  deleteElement,
  clearExpression,
  saveCalculation,
}) {
  return (
    <div className="flex flex-row items-center gap-3 py-2 px-2 bg-white/50 rounded-md">
      <div className="flex flex-row gap-3 w-2/5 shrink-0">
        <div className="flex flex-col gap-3 w-full">
          <button
            className="p-2 bg-white rounded-md  active:bg-slate-200"
            onClick={() => {
              addElement({
                type: "constant",
                constant_type: "pie",
                expression: [],
              });
            }}
          >
            π
          </button>
          <button
            className="p-2 bg-white rounded-md active:bg-slate-200"
            onClick={() => {
              addElement({
                type: "constant",
                constant_type: "eular",
                expression: [],
              });
            }}
          >
            E
          </button>
          <button
            className="p-2 bg-white rounded-md active:bg-slate-200"
            onClick={() => {
              addElement({
                type: "function",
                function_type: "sqrt",
                expression: [],
              });
            }}
          >
            sqrt
          </button>
          <button
            className="p-2 bg-white rounded-md active:bg-slate-200"
            onClick={() => {
              addElement({
                type: "function",
                function_type: "square",
                expression: [],
              });
            }}
          >
            square
          </button>
          <button
            className="p-2 bg-white rounded-md active:bg-slate-200"
            onClick={() => {
              addElement({
                type: "function",
                function_type: "log",
                expression: [],
              });
            }}
          >
            log
          </button>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <button
            className="p-2 bg-white rounded-md active:bg-slate-200"
            onClick={() => {
              addElement({
                type: "function",
                function_type: "sin",
                expression: [],
              });
            }}
          >
            sin
          </button>
          <button
            className="p-2 bg-white rounded-md active:bg-slate-200"
            onClick={() => {
              addElement({
                type: "function",
                function_type: "cos",
                expression: [],
              });
            }}
          >
            cos
          </button>
          <button
            className="p-2 bg-white rounded-md active:bg-slate-200"
            onClick={() => {
              addElement({
                type: "function",
                function_type: "tan",
                expression: [],
              });
            }}
          >
            tan
          </button>
          <button
            className="p-2 bg-white rounded-md active:bg-slate-200"
            onClick={() => {
              addElement({
                type: "function",
                function_type: "fact",
                expression: [],
              });
            }}
          >
            fact
          </button>
          <button
            className="p-2 bg-white rounded-md active:bg-slate-200"
            onClick={() => {
              addElement({
                type: "function",
                function_type: "ln",
                expression: [],
              });
            }}
          >
            ln
          </button>
        </div>
      </div>
      <div className="w-[1px] bg-white mx-1"></div>
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-row gap-3 w-full">
          <button
            className="p-2 bg-white rounded-md w-full active:bg-slate-200 "
            onClick={() => {
              addElement({
                type: "bracket",
                bracket_type: "opening",
                expression: [],
              });
            }}
          >
            {"("}
          </button>
          <button
            className="p-2 bg-white rounded-md w-full active:bg-slate-200 "
            onClick={() => {
              addElement({
                type: "bracket",
                bracket_type: "closing",
                expression: [],
              });
            }}
          >
            {")"}
          </button>
          <button
            className="p-2 bg-white rounded-md w-full active:bg-red-50  font-bold text-red-800"
            aria-label="clear all"
            onClick={clearExpression}
          >
            C
          </button>
          <button
            className="p-2 bg-white rounded-md w-full active:bg-slate-200 flex items-center justify-center"
            aria-label="backspace"
            onClick={deleteElement}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.91987 5C7.33602 5 6.78132 5.25513 6.40136 5.69842L2.11564 10.6984C1.47366 11.4474 1.47366 12.5526 2.11564 13.3016L6.40136 18.3016C6.78132 18.7449 7.33602 19 7.91987 19L19 19C20.1046 19 21 18.1046 21 17L21 7C21 5.89543 20.1046 5 19 5L7.91987 5Z"
                stroke="#292929"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M15 10.0001L11 14.0001"
                stroke="#292929"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M11 10.0001L15 14.0001"
                stroke="#292929"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-row gap-3 w-full">
          <button
            className="p-2 bg-slate-600 active:bg-slate-700 text-slate-100 font-bold rounded-md w-full"
            onClick={() => {
              addElement({ type: "operator", operator_type: "multiplication" });
            }}
          >
            *
          </button>
          <button
            className="p-2 bg-white rounded-md w-full active:bg-slate-200 "
            onClick={() => {
              addElement({ type: "number", value: 7 });
            }}
          >
            7
          </button>
          <button
            className="p-2 bg-white rounded-md w-full active:bg-slate-200 "
            onClick={() => {
              addElement({ type: "number", value: 8 });
            }}
          >
            8
          </button>
          <button
            className="p-2 bg-white rounded-md w-full active:bg-slate-200 "
            onClick={() => {
              addElement({ type: "number", value: 9 });
            }}
          >
            9
          </button>
        </div>
        <div className="flex flex-row gap-3 w-full">
          <button
            className="p-2 bg-slate-600 active:bg-slate-700 text-slate-100 font-bold rounded-md w-full"
            onClick={() => {
              addElement({ type: "operator", operator_type: "division" });
            }}
          >
            /
          </button>
          <button
            className="p-2 bg-white rounded-md w-full active:bg-slate-200 "
            onClick={() => {
              addElement({ type: "number", value: 4 });
            }}
          >
            4
          </button>
          <button
            className="p-2 bg-white rounded-md w-full active:bg-slate-200 "
            onClick={() => {
              addElement({ type: "number", value: 5 });
            }}
          >
            5
          </button>
          <button
            className="p-2 bg-white rounded-md w-full active:bg-slate-200 "
            onClick={() => {
              addElement({ type: "number", value: 6 });
            }}
          >
            6
          </button>
        </div>
        <div className="flex flex-row gap-3 w-full">
          <button
            className="p-2 bg-slate-600 active:bg-slate-700 text-slate-100 font-bold rounded-md w-full"
            onClick={() => {
              addElement({ type: "operator", operator_type: "addition" });
            }}
          >
            +
          </button>
          <button
            className="p-2 bg-white rounded-md w-full active:bg-slate-200 "
            onClick={() => {
              addElement({ type: "number", value: 1 });
            }}
          >
            1
          </button>
          <button
            className="p-2 bg-white rounded-md w-full active:bg-slate-200 "
            onClick={() => {
              addElement({ type: "number", value: 2 });
            }}
          >
            2
          </button>
          <button
            className="p-2 bg-white rounded-md w-full active:bg-slate-200 "
            onClick={() => {
              addElement({ type: "number", value: 3 });
            }}
          >
            3
          </button>
        </div>
        <div className="flex flex-row gap-3 w-full">
          <button
            className="p-2 bg-slate-600 active:bg-slate-700 text-slate-100 font-bold rounded-md w-full"
            onClick={() => {
              addElement({ type: "operator", operator_type: "substraction" });
            }}
          >
            -
          </button>
          <button
            className="p-2 bg-white rounded-md w-full active:bg-slate-200 "
            onClick={() => {
              addElement({ type: "number", value: 0 });
              addElement({ type: "number", value: 0 });
            }}
          >
            00
          </button>
          <button
            className="p-2 bg-white rounded-md w-full active:bg-slate-200 "
            onClick={() => {
              addElement({ type: "number", value: 0 });
            }}
          >
            0
          </button>
          <button
            className="p-2 bg-white rounded-md w-full active:bg-slate-200 "
            onClick={() => {
              addElement({ type: "decimal" });
            }}
          >
            .
          </button>
        </div>
        <div className="flex flex-row gap-3 w-full">
          <button
            className="py-2 bg-white rounded-md w-full active:bg-slate-200 "
            onClick={() => {
              if (expressionRoot["expression"].length > 0) {
                const result = Calculate(
                  expressionRoot["expression"],
                  saveCalculation
                );
                saveCalculation(
                  expressionRoot["expression"],
                  !isNaN(result) ? result : "NaN"
                ).catch((e) => {
                  console.log(e);
                });
                if (typeof result === "number") {
                  clearExpression();
                  addElement({ type: "result", value: result });
                } else {
                  addElement({ type: "error" });
                }
              }
            }}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
