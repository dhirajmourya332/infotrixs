/***
 * this component displays the expression and blinking cursor
 */

import { useRef } from "react";
import StringifyExpression from "../../HelperFunctions/StringifyExpression";

export default function ExpressionDisplay({ expressionRoot }) {
  const cursorRef = useRef(null);
  const parseExpression = () => {
    const clonedExpressionRoot = JSON.parse(JSON.stringify(expressionRoot));
    const clonedCursorStack = JSON.parse(
      JSON.stringify(expressionRoot["cursorStack"])
    );
    let topExpressionLayer = clonedExpressionRoot;
    for (let i = 0; i < clonedExpressionRoot["cursorStack"].length - 1; i++) {
      topExpressionLayer =
        topExpressionLayer["expression"][
          clonedExpressionRoot["cursorStack"][i]
        ];
    }
    topExpressionLayer["expression"].splice(
      [clonedCursorStack[clonedCursorStack.length - 1]],
      0,
      { type: "cursor" }
    );
    const stringifiedExpression = StringifyExpression(
      clonedExpressionRoot["expression"],
      clonedCursorStack
    );
    const stringArr = stringifiedExpression.split("|");
    setTimeout(() => {
      cursorRef?.current.scrollIntoView({
        inline: "center",
        block: "center",
        behaviour: "smooth",
      });
    });
    return (
      <>
        <span>{stringArr[0]}</span>
        <span
          ref={cursorRef}
          className="animate-cursor"
          style={{ overflowAnchor: "auto" }}
        >
          |
        </span>
        <span className="opacity-40">{stringArr[1]}</span>
      </>
    );
  };
  return (
    <div className="py-2 px-3 bg-white text-2xl rounded-md w-full h-12 overflow-hidden">
      <div
        className="h-full w-full overflow-x-auto overflow-y-hidden text-right whitespace-nowrap"
        style={{ overflowAnchor: "none" }}
      >
        {parseExpression()}
      </div>
    </div>
  );
}
