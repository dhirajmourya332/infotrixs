import { useState } from "react";
import HistoryCard from "../HistorySection/HistoryCard";
import Calculate from "../../HelperFunctions/Calculate";
import HistoryLoader from "../HistorySection/HistoryLoader";
import uuid from "react-uuid";

export default function MobileKeypad({
  expressionRoot,
  addElement,
  deleteElement,
  clearExpression,
  calculationHistory,
  loadMoreCalculationHistory,
  replaceExpression,
  saveCalculation,
}) {
  const [currentSection, setCurrentSection] = useState("number");
  const [isHistorySectionVisible, setHistorySectionVisible] = useState(false);

  const toggleHistorySection = () => {
    setHistorySectionVisible((prevHistorySectionVIsiblityStatus) => {
      return !prevHistorySectionVIsiblityStatus;
    });
  };

  return (
    <div className="flex flex-col">
      {isHistorySectionVisible ? (
        <div
          className={`relative h-[316px] flex flex-col gap-3 bg-slate-200/50 rounded-md`}
        >
          <h2 className="font-bold p-2 bg-slate-100 rounded-t-md px-3">
            History
          </h2>
          <div className="h-full overflow-auto py-2 flex flex-col gap-2 px-1">
            {calculationHistory["history"].map((calculation) => {
              return (
                <HistoryCard
                  key={`${uuid()}-${uuid()}`}
                  hasMoreToLoad={calculation["hasMore"]}
                  calculation={calculation}
                  replaceExpression={replaceExpression}
                />
              );
            })}
            <HistoryLoader
              loadMore={loadMoreCalculationHistory}
              hasMoreToLoad={calculationHistory["hasMore"]}
            />
          </div>
          <button
            className="absolute z-10 h-10 w-10 bottom-0 right-0 bg-slate-200 border-2 border-slate-800 p-3 rounded-full"
            onClick={toggleHistorySection}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g
                id="icons"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  transform="translate(-2168.000000, -158.000000)"
                  fill="#1C1C1F"
                  fillRule="nonzero"
                >
                  <g id="1" transform="translate(1350.000000, 120.000000)">
                    <path
                      d="M821.426657,38.5856848 L830.000001,47.1592624 L838.573343,38.5856848 C839.288374,37.8706535 840.421422,37.8040611 841.267835,38.4653242 L841.414315,38.5987208 C842.195228,39.3796338 842.195228,40.645744 841.414306,41.4266667 L832.840738,50 L841.414315,58.5733429 C842.129347,59.2883742 842.195939,60.4214224 841.534676,61.2678347 L841.401279,61.4143152 C840.620366,62.1952283 839.354256,62.1952283 838.573333,61.4143055 L830.000001,52.8407376 L821.426657,61.4143152 C820.711626,62.1293465 819.578578,62.1959389 818.732165,61.5346758 L818.585685,61.4012792 C817.804772,60.6203662 817.804772,59.354256 818.585694,58.5733333 L827.159262,50 L818.585685,41.4266571 C817.870653,40.7116258 817.804061,39.5785776 818.465324,38.7321653 L818.598721,38.5856848 C819.379634,37.8047717 820.645744,37.8047717 821.426657,38.5856848 Z M820.028674,60.999873 C820.023346,60.9999577 820.018018,61 820.012689,61 Z M820.161408,60.9889406 L820.117602,60.9945129 L820.117602,60.9945129 C820.132128,60.9929912 820.146788,60.9911282 820.161408,60.9889406 Z M819.865274,60.9891349 L819.883098,60.9916147 C819.877051,60.9908286 819.87101,60.9899872 819.864975,60.9890905 L819.865274,60.9891349 Z M819.739652,60.9621771 L819.755271,60.9664589 C819.749879,60.9650278 819.744498,60.9635509 819.739126,60.9620283 L819.739652,60.9621771 Z M820.288411,60.9614133 L820.234515,60.9752112 L820.234515,60.9752112 C820.252527,60.971132 820.270527,60.9665268 820.288411,60.9614133 Z M820.401572,60.921544 L820.359957,60.9380009 L820.359957,60.9380009 C820.373809,60.9328834 820.387743,60.9273763 820.401572,60.921544 Z M819.623655,60.9214803 C819.628579,60.923546 819.626191,60.9225499 819.623806,60.921544 L819.623655,60.9214803 Z M819.506361,60.8625673 L819.400002,60.7903682 C819.444408,60.8248958 819.491056,60.8551582 819.539393,60.8811554 L819.506361,60.8625673 L819.506361,60.8625673 Z M820.51858,60.8628242 L820.486378,60.8809439 L820.486378,60.8809439 C820.496939,60.8752641 820.507806,60.8691536 820.51858,60.8628242 Z M840.881155,60.4606074 L840.862567,60.4936392 L840.862567,60.4936392 L840.790368,60.5999978 C840.824896,60.555592 840.855158,60.5089438 840.881155,60.4606074 Z M840.936494,60.3386283 L840.92148,60.3763453 L840.92148,60.3763453 C840.926791,60.3637541 840.931774,60.3512293 840.936494,60.3386283 Z M840.974777,60.2110466 L840.962177,60.2603479 L840.962177,60.2603479 C840.966711,60.2443555 840.97096,60.2277405 840.974777,60.2110466 Z M840.994445,60.0928727 L840.989135,60.1347261 L840.989135,60.1347261 C840.991174,60.1210064 840.992958,60.1069523 840.994445,60.0928727 Z M839.987311,39.9996529 L830,49.9872374 L820.012689,39.9996529 L819.999653,40.0126889 L829.987237,50 L819.999653,59.9873111 L820.012689,60.0003471 L830,50.0127626 L839.987311,60.0003471 L840.000347,59.9873111 L830.012763,50 L840.000347,40.0126889 L839.987311,39.9996529 Z M840.999873,59.9713258 L840.999916,60.0003193 L840.999916,60.0003193 C841.000041,59.9907089 841.000027,59.9810165 840.999873,59.9713258 Z M840.988941,59.8385918 L840.994513,59.8823981 L840.994513,59.8823981 C840.992991,59.8678719 840.991128,59.8532122 840.988941,59.8385918 Z M840.961413,59.7115886 L840.975211,59.7654853 L840.975211,59.7654853 C840.971132,59.7474727 840.966527,59.7294733 840.961413,59.7115886 Z M840.921544,59.5984278 L840.938001,59.6400431 L840.938001,59.6400431 C840.932883,59.6261908 840.927376,59.612257 840.921544,59.5984278 Z M840.862824,59.4814199 L840.880944,59.5136217 L840.880944,59.5136217 C840.875264,59.503061 840.869154,59.4921939 840.862824,59.4814199 Z M819.119056,40.4863783 L819.134164,40.5134185 C819.128903,40.5043379 819.123796,40.4951922 819.118845,40.4859852 L819.119056,40.4863783 Z M819.061999,40.3599569 L819.075467,40.3944079 C819.070734,40.3829341 819.066223,40.3713901 819.061935,40.3597825 L819.061999,40.3599569 Z M819.024789,40.2345147 L819.033541,40.2701072 C819.030397,40.2582611 819.027473,40.2463686 819.024771,40.234436 L819.024789,40.2345147 Z M819.005077,40.1136164 L819.008385,40.1422797 C819.007138,40.1326872 819.00603,40.12308 819.005061,40.1134615 L819.005077,40.1136164 Z M819.000419,39.9836733 L819,40.0126889 C819,40.002956 819.000141,39.993223 819.000424,39.9834934 L819.000419,39.9836733 Z M819.010865,39.8652739 L819.008385,39.8830981 C819.009171,39.8770511 819.010013,39.8710099 819.010909,39.8649753 L819.010865,39.8652739 Z M819.037823,39.7396521 L819.033541,39.7552707 C819.034972,39.7498794 819.036449,39.7444978 819.037972,39.7391264 L819.037823,39.7396521 Z M819.07852,39.6236547 C819.076454,39.6285788 819.07745,39.6261907 819.078456,39.6238057 L819.07852,39.6236547 Z M819.137433,39.5063608 L819.209632,39.4000022 C819.175104,39.444408 819.144842,39.4910562 819.118845,39.5393926 L819.137433,39.5063608 L819.137433,39.5063608 Z M820.485985,39.1188446 L820.519017,39.1374327 L820.519017,39.1374327 L820.625376,39.2096318 C820.58097,39.1751042 820.534322,39.1448418 820.485985,39.1188446 Z M839.513622,39.1190561 L839.486582,39.1341644 C839.495662,39.128903 839.504808,39.1237964 839.514015,39.1188446 L839.513622,39.1190561 Z M819.539,39.1190561 L819.511959,39.1341644 C819.52104,39.128903 819.530186,39.1237964 819.539393,39.1188446 L819.539,39.1190561 Z M840.460607,39.1188446 L840.493639,39.1374327 L840.493639,39.1374327 L840.599998,39.2096318 C840.555592,39.1751042 840.508944,39.1448418 840.460607,39.1188446 Z M819.661418,39.0634885 L819.63097,39.0754675 C819.641051,39.0713084 819.651187,39.0673212 819.661372,39.0635059 L819.661418,39.0634885 Z M820.359783,39.0619346 L820.401723,39.0785197 L820.401723,39.0785197 C820.387743,39.0726237 820.373809,39.0671166 820.359783,39.0619346 Z M839.640043,39.0619991 L839.605592,39.0754675 C839.617066,39.0707338 839.62861,39.0662229 839.640217,39.0619346 L839.640043,39.0619991 Z M840.338628,39.0635059 L840.376345,39.0785197 L840.376345,39.0785197 C840.363754,39.0732095 840.351229,39.0682261 840.338628,39.0635059 Z M819.789259,39.0251536 L819.755271,39.0335411 C819.766459,39.0305713 819.777688,39.0277987 819.788953,39.0252234 L819.789259,39.0251536 Z M820.234436,39.0247709 L820.288548,39.0386257 L820.288548,39.0386257 C820.270527,39.0334732 820.252527,39.028868 820.234436,39.0247709 Z M839.765485,39.0247888 L839.729893,39.0335411 C839.741739,39.0303966 839.753631,39.0274732 839.765564,39.0247709 L839.765485,39.0247888 Z M840.211047,39.0252234 L840.260348,39.0378229 L840.260348,39.0378229 C840.244356,39.0332892 840.227741,39.0290398 840.211047,39.0252234 Z M819.911404,39.0051132 L819.883098,39.0083853 C819.892432,39.0071719 819.901779,39.0060902 819.911137,39.0051402 L819.911404,39.0051132 Z M820.113462,39.0050614 L820.161342,39.0110494 L820.161342,39.0110494 C820.145468,39.0086743 820.12948,39.006675 820.113462,39.0050614 Z M839.886384,39.005077 L839.85772,39.0083853 C839.867313,39.0071382 839.87692,39.0060303 839.886538,39.0050614 L839.886384,39.005077 Z M840.088863,39.0051402 L840.134726,39.0108651 L840.134726,39.0108651 C840.119676,39.0086288 840.104284,39.0067057 840.088863,39.0051402 Z M839.95834,39.0004173 L840.016507,39.0004238 C839.997122,38.9998609 839.977725,38.9998588 839.95834,39.0004173 Z M819.983493,39.0004238 L820.04166,39.0004173 C820.022275,38.9998588 820.002878,38.9998609 819.983493,39.0004238 Z"
                      id="cancel"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-row gap-3">
            <button
              className={`py-1 w-full  ${
                currentSection === "number" ? "bg-slate-300/50 font-bold" : ""
              }  rounded-md rounded-b-none`}
              onClick={() => {
                setCurrentSection("number");
              }}
            >
              123
            </button>
            <button
              className={`py-1 w-full  ${
                currentSection === "function" ? "bg-slate-300/50 font-bold" : ""
              }  rounded-md rounded-b-none`}
              onClick={() => {
                setCurrentSection("function");
              }}
            >
              π / fn
            </button>
          </div>

          <div
            className={`flex flex-row items-center gap-2 bg-slate-300/50 rounded-md p-2 py-3 ${
              currentSection === "number"
                ? "rounded-tl-none"
                : "rounded-tr-none"
            }`}
          >
            {currentSection === "number" ? (
              <>
                <div className="w-full flex flex-row gap-2">
                  <div className="w-full flex flex-col gap-3">
                    <button
                      className="bg-white py-1 rounded-md active:bg-slate-200"
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
                      className="bg-white py-1 rounded-md active:bg-slate-200"
                      onClick={() => {
                        addElement({ type: "number", value: 7 });
                      }}
                    >
                      7
                    </button>
                    <button
                      className="bg-white py-1 rounded-md active:bg-slate-200"
                      onClick={() => {
                        addElement({ type: "number", value: 4 });
                      }}
                    >
                      4
                    </button>
                    <button
                      className="bg-white py-1 rounded-md active:bg-slate-200"
                      onClick={() => {
                        addElement({ type: "number", value: 1 });
                      }}
                    >
                      1
                    </button>
                    <button
                      className="bg-white py-1 rounded-md active:bg-slate-200"
                      onClick={() => {
                        addElement({ type: "decimal" });
                      }}
                    >
                      .
                    </button>
                  </div>
                  <div className="w-full flex flex-col gap-3">
                    <button
                      className="bg-white py-1 rounded-md active:bg-slate-200"
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
                      className="bg-white py-1 rounded-md active:bg-slate-200"
                      onClick={() => {
                        addElement({ type: "number", value: 8 });
                      }}
                    >
                      8
                    </button>
                    <button
                      className="bg-white py-1 rounded-md active:bg-slate-200"
                      onClick={() => {
                        addElement({ type: "number", value: 5 });
                      }}
                    >
                      5
                    </button>
                    <button
                      className="bg-white py-1 rounded-md active:bg-slate-200"
                      onClick={() => {
                        addElement({ type: "number", value: 2 });
                      }}
                    >
                      2
                    </button>
                    <button
                      className="bg-white py-1 rounded-md active:bg-slate-200"
                      onClick={() => {
                        addElement({ type: "number", value: 0 });
                      }}
                    >
                      0
                    </button>
                  </div>
                  <div className="w-full flex flex-col gap-3">
                    <button
                      className="bg-white py-1 rounded-md active:bg-red-200 font-bold text-red-800"
                      onClick={clearExpression}
                    >
                      C
                    </button>
                    <button
                      className="bg-white py-1 rounded-md active:bg-slate-200"
                      onClick={() => {
                        addElement({ type: "number", value: 9 });
                      }}
                    >
                      9
                    </button>
                    <button
                      className="bg-white py-1 rounded-md active:bg-slate-200"
                      onClick={() => {
                        addElement({ type: "number", value: 6 });
                      }}
                    >
                      6
                    </button>
                    <button
                      className="bg-white py-1 rounded-md active:bg-slate-200"
                      onClick={() => {
                        addElement({ type: "number", value: 3 });
                      }}
                    >
                      3
                    </button>
                    <button
                      className="bg-white py-1 rounded-md active:bg-slate-200"
                      onClick={() => {
                        addElement({ type: "decimal" });
                      }}
                    >
                      .
                    </button>
                  </div>
                </div>
                <div className="w-1/4 flex flex-col gap-3">
                  <button
                    className="bg-white py-1 rounded-md active:bg-slate-200 flex items-center justify-center"
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
                  <button
                    className="bg-slate-700 active:bg-slate-800 text-slate-100 py-1 rounded-md font-bold"
                    onClick={() => {
                      addElement({
                        type: "operator",
                        operator_type: "multiplication",
                      });
                    }}
                  >
                    *
                  </button>
                  <button
                    className="bg-slate-700 active:bg-slate-800 text-slate-100 py-1 rounded-md font-bold"
                    onClick={() => {
                      addElement({
                        type: "operator",
                        operator_type: "division",
                      });
                    }}
                  >
                    /
                  </button>
                  <button
                    className="bg-slate-700 active:bg-slate-800 text-slate-100 py-1 rounded-md font-bold"
                    onClick={() => {
                      addElement({
                        type: "operator",
                        operator_type: "addition",
                      });
                    }}
                  >
                    +
                  </button>
                  <button
                    className="bg-slate-700 active:bg-slate-800 text-slate-100 py-1 rounded-md font-bold"
                    onClick={() => {
                      addElement({
                        type: "operator",
                        operator_type: "substraction",
                      });
                    }}
                  >
                    -
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-full flex flex-col gap-3">
                  <button
                    className="bg-white py-1 rounded-md active:bg-slate-200"
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
                    className="bg-white py-1 rounded-md active:bg-slate-200"
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
                    className="bg-white py-1 rounded-md active:bg-slate-200"
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
                    className="bg-white py-1 rounded-md active:bg-slate-200"
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
                    className="bg-white py-1 rounded-md active:bg-slate-200"
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
                <div className="w-full flex flex-col gap-3">
                  <button
                    className="bg-white py-1 rounded-md active:bg-slate-200"
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
                    className="bg-white py-1 rounded-md active:bg-slate-200"
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
                    className="bg-white py-1 rounded-md active:bg-slate-200"
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
                    className="bg-white py-1 rounded-md active:bg-slate-200"
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
                    className="bg-white py-1 rounded-md active:bg-slate-200"
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
              </>
            )}
          </div>

          <div className="flex flex-row gap-3 mt-3 items-center">
            <button
              className="py-2 rounded-md w-full bg-white active:bg-slate-200 font-bold"
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
            <button
              className="w-10 h-10 rounded-full p-2 shrink-0 bg-slate-200"
              onClick={toggleHistorySection}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 5.67541V3C3 2.44772 2.55228 2 2 2C1.44772 2 1 2.44772 1 3V7C1 8.10457 1.89543 9 3 9H7C7.55229 9 8 8.55229 8 8C8 7.44772 7.55229 7 7 7H4.52186C4.54218 6.97505 4.56157 6.94914 4.57995 6.92229C5.621 5.40094 7.11009 4.22911 8.85191 3.57803C10.9074 2.80968 13.173 2.8196 15.2217 3.6059C17.2704 4.3922 18.9608 5.90061 19.9745 7.8469C20.9881 9.79319 21.2549 12.043 20.7247 14.1724C20.1945 16.3018 18.9039 18.1638 17.0959 19.4075C15.288 20.6513 13.0876 21.1909 10.9094 20.9247C8.73119 20.6586 6.72551 19.605 5.27028 17.9625C4.03713 16.5706 3.27139 14.8374 3.06527 13.0055C3.00352 12.4566 2.55674 12.0079 2.00446 12.0084C1.45217 12.0088 0.995668 12.4579 1.04626 13.0078C1.25994 15.3309 2.2082 17.5356 3.76666 19.2946C5.54703 21.3041 8.00084 22.5931 10.6657 22.9188C13.3306 23.2444 16.0226 22.5842 18.2345 21.0626C20.4464 19.541 22.0254 17.263 22.6741 14.6578C23.3228 12.0526 22.9963 9.30013 21.7562 6.91897C20.5161 4.53782 18.448 2.69239 15.9415 1.73041C13.4351 0.768419 10.6633 0.756291 8.14853 1.69631C6.06062 2.47676 4.26953 3.86881 3 5.67541Z"
                  fill="#0F0F0F"
                />
                <path
                  d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2344 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.546 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                  fill="#0F0F0F"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
