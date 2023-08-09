import MDHistorySection from "./Components/HistorySection/MDHistorySection";
import useWindowSize from "./Hooks/useWindowSize";
import LGHistorySection from "./Components/HistorySection/LGHistorySection";
import useCalculationHistoryManager from "./Hooks/useCalculationHistoryManager";
import Calculator from "./Components/CalculatorSection/Calculator";
import useExpressionManager from "./Hooks/useExpressionManager";

function App() {
  const windowSize = useWindowSize(1, 8);
  const {
    calculationHistory,
    saveCalculation,
    fetchCalculationHistory,
    deleteCalculation,
  } = useCalculationHistoryManager();

  const {
    root,
    addElement,
    deleteElement,
    clearExpression,
    replaceExpression,
  } = useExpressionManager();
  return (
    <div className="h-screen max-h-screen w-screen flex flex-row items-stretch">
      <div className="relative w-full flex justify-center bg-teal-900 items-center">
        <div className="w-full max-w-md md:w-10/12 md:max-w-3xl lg:w-10/12 lg:max-w-4xl p-2 sm:p-3">
          <div className="relative w-full  flex flex-col z-10">
            <div className="absolute top-0 left-0 h-full w-full backdrop-blur-sm bg-slate-200/40 border-2 border-slate-200/60 rounded-lg"></div>
            <div className="z-10  w-full px-2 py-4 sm:p-3 sm:py-4 flex flex-col gap-4">
              <Calculator
                root={root}
                addElement={addElement}
                deleteElement={deleteElement}
                clearExpression={clearExpression}
                replaceExpression={replaceExpression}
                saveCalculation={saveCalculation}
                deleteCalculation={deleteCalculation}
                screenWidth={windowSize["width"]}
                calculationHistory={calculationHistory}
                loadMoreCalculationHistory={fetchCalculationHistory}
              />
            </div>
          </div>
        </div>
        <div className="fixed left-0 top-0 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500"></div>
      </div>
      {windowSize["width"] >= 768 && windowSize["width"] < 1024 ? (
        <MDHistorySection
          calculationHistory={calculationHistory}
          loadMoreCalculationHistory={fetchCalculationHistory}
          replaceExpression={replaceExpression}
          deleteCalculation={deleteCalculation}
        />
      ) : null}
      {windowSize["width"] >= 1024 ? (
        <LGHistorySection
          calculationHistory={calculationHistory}
          loadMoreCalculationHistory={fetchCalculationHistory}
          replaceExpression={replaceExpression}
          deleteCalculation={deleteCalculation}
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
