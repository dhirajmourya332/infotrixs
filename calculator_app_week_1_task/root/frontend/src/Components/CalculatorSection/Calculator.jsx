import ExpressionDisplay from "./ExpressionDisplay";
import MobileKeypad from "./MobileKeyPad";
import TabKeyPad from "./TabKeyPad";

export default function Calculator({
  screenWidth,
  calculationHistory,
  loadMoreCalculationHistory,
  root,
  addElement,
  deleteElement,
  clearExpression,
  replaceExpression,
  saveCalculation,
}) {
  return (
    <>
      <ExpressionDisplay expressionRoot={root} />
      {screenWidth < 768 ? (
        <MobileKeypad
          expressionRoot={root}
          addElement={addElement}
          deleteElement={deleteElement}
          clearExpression={clearExpression}
          replaceExpression={replaceExpression}
          calculationHistory={calculationHistory}
          loadMoreCalculationHistory={loadMoreCalculationHistory}
          saveCalculation={saveCalculation}
        />
      ) : (
        <TabKeyPad
          expressionRoot={root}
          addElement={addElement}
          deleteElement={deleteElement}
          clearExpression={clearExpression}
          saveCalculation={saveCalculation}
        />
      )}
    </>
  );
}
