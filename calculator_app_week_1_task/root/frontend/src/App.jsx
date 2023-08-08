import { useState } from "react";
import MDHistorySection from "./Components/HistorySection/MDHistorySection";
import useWindowSize from "./Hooks/useWindowSize";
import LGHistorySection from "./Components/HistorySection/LGHistorySection";
import useCalculationHistoryManager from "./Hooks/useCalculationHistoryManager";
import Calculator from "./Components/CalculatorSection/Calculator";
import useExpressionManager from "./Hooks/useExpressionManager";

function App() {
  const windowSize = useWindowSize(1, 8);
  const { calculationHistory, saveCalculation, fetchCalculationHistory } =
    useCalculationHistoryManager();

  const {
    root,
    addElement,
    deleteElement,
    clearExpression,
    replaceExpression,
  } = useExpressionManager();
  return (
    <div className="h-screen max-h-screen w-screen flex flex-row items-stretch">
      <div className="w-full flex justify-center bg-teal-900 items-center">
        <div className="w-full max-w-md md:w-10/12 md:max-w-3xl lg:w-10/12 lg:max-w-4xl p-2 sm:p-3">
          <div className="relative w-full  flex flex-col">
            <div className="absolute top-0 left-0 h-full w-full backdrop-blur bg-slate-200/40 border-2 border-slate-200/60 rounded-lg"></div>
            <div className="z-10  w-full p-2 sm:p-3 flex flex-col gap-3 py-3">
              <Calculator
                root={root}
                addElement={addElement}
                deleteElement={deleteElement}
                clearExpression={clearExpression}
                replaceExpression={replaceExpression}
                saveCalculation={saveCalculation}
                screenWidth={windowSize["width"]}
                calculationHistory={calculationHistory}
                loadMoreCalculationHistory={fetchCalculationHistory}
              />
            </div>
          </div>
        </div>
      </div>
      {windowSize["width"] >= 768 && windowSize["width"] < 1024 ? (
        <MDHistorySection
          calculationHistory={calculationHistory}
          loadMoreCalculationHistory={fetchCalculationHistory}
          replaceExpression={replaceExpression}
        />
      ) : null}
      {windowSize["width"] >= 1024 ? (
        <LGHistorySection
          calculationHistory={calculationHistory}
          loadMoreCalculationHistory={fetchCalculationHistory}
          replaceExpression={replaceExpression}
        />
      ) : null}
    </div>
  );
}

export default App;

/**
 * 
 {JSON.stringify(windowSize)}
 */

//for expression =>  5 . 3 + sin( 3.141 * ( 8 + 5 ) )
