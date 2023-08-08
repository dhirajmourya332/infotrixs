/**
 * it is card that displays each calculation in history section
 * ~seprated it becaues if is used on every screens and needs more functionalities to be added later like adding delete button to request for delete individual calculation
 */

import StringifyExpression from "../../HelperFunctions/StringifyExpression";
export default function HistoryCard({
  index,
  calculation,
  replaceExpression,
  toggleVisibilityState,
  deleteCalculation,
}) {
  const deleteHistory = (id, index) => {
    deleteCalculation(id, index);
  };
  return (
    <button
      className="p-2 px-3 text-left w-full  bg-slate-100 active:bg-slate-200 rounded-md flex flex-row items-center gap-2"
      onClick={() => {
        replaceExpression(calculation["expression"]);
        toggleVisibilityState ? toggleVisibilityState() : null;
      }}
    >
      <div className="w-full">
        {StringifyExpression(calculation["expression"])} ={" "}
        {calculation["result"]}
      </div>
      <div
        className="h-10 w-10 bg-slate-200 active:bg-red-200 rounded-full p-2 shrink-0"
        aria-label="delete calculation"
        onClick={(e) => {
          e.stopPropagation();
          deleteCalculation(calculation["_id"], index);
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12V17"
            className="stroke-red-800"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 12V17"
            className="stroke-red-800"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 7H20"
            className="stroke-red-800"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
            className="stroke-red-800"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
            className="stroke-red-800"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
}
