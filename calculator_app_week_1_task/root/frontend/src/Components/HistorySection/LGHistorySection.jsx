import HistoryCard from "./HistoryCard";
import HistoryLoader from "./HistoryLoader";
import uuid from "react-uuid";

export default function LGHistorySection({
  calculationHistory,
  loadMoreCalculationHistory,
  replaceExpression,
  deleteCalculation,
}) {
  return (
    <div className="relative w-80 h-full flex flex-col gap-3 bg-white shrink-0">
      <h2 className="px-2 py-3 text-lg font-bold bg-slate-200">Hisory</h2>
      <div className="flex flex-col gap-3 h-full overflow-auto px-1 w-full">
        {calculationHistory["history"].map((calculation) => {
          return (
            <HistoryCard
              key={`${uuid()}-${uuid()}`}
              calculation={calculation}
              replaceExpression={replaceExpression}
              deleteCalculation={deleteCalculation}
            />
          );
        })}
        <HistoryLoader
          loadMore={loadMoreCalculationHistory}
          hasMoreToLoad={calculationHistory["hasMore"]}
        />
      </div>
    </div>
  );
}
