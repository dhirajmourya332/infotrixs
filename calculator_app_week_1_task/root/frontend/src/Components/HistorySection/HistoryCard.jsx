/**
 * it is card that displays each calculation in history section
 * ~seprated it becaues if is used on every screens and needs more functionalities to be added later like adding delete button to request for delete individual calculation
 */

import StringifyExpression from "../../HelperFunctions/StringifyExpression";
export default function HistoryCard({
  calculation,
  replaceExpression,
  toggleVisibilityState,
}) {
  return (
    <button
      className="p-2 px-3 text-left  bg-slate-100 active:bg-slate-200 rounded-md"
      onClick={() => {
        replaceExpression(calculation["expression"]);
        toggleVisibilityState ? toggleVisibilityState() : null;
      }}
    >
      {StringifyExpression(calculation["expression"])} = {calculation["result"]}
    </button>
  );
}
