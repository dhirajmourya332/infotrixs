/**
 * this function manages the calculationHistoryArray
 * provides functionalities for
 *  fetches the history from server
 *  posts new calcualtion to server and adding new calculation to history array
 *  requests to delete a particular calculation from database
 */

import { useRef, useState } from "react";
import axios from "axios";

export default function useCalculationHistoryManager() {
  const [calculationHistory, setCalculationHistory] = useState({
    hasMore: true,
    history: [],
  });
  const isFetchingCalculationHistory = useRef(false);
  const fetchCalculationHistory = async () => {
    return new Promise((resolve, reject) => {
      if (!isFetchingCalculationHistory.current) {
        isFetchingCalculationHistory.current = true;
        axios
          .get(
            `/calculation?offset=${calculationHistory["history"].length}&count=15`
          )
          .then((response) => {
            const data = response["data"];
            setCalculationHistory((prevCalculationHistory) => {
              const prevCalculationHistoryClone = JSON.parse(
                JSON.stringify(prevCalculationHistory)
              );
              prevCalculationHistoryClone["history"] =
                prevCalculationHistoryClone["history"].concat(data);
              if (data.length < 15) {
                prevCalculationHistoryClone["hasMore"] = false;
              }
              return prevCalculationHistoryClone;
            });
            resolve(true);
            isFetchingCalculationHistory.current = false;
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject(false);
      }
    });
  };
  const saveCalculation = async (expression, result) => {
    return new Promise((resolve, reject) => {
      axios
        .post("/calculation", {
          expression: expression,
          result: result,
        })
        .then((response) => {
          if (response.status === 200) {
            setCalculationHistory((prevCalculationHistory) => {
              const prevCalculationHistoryClone = JSON.parse(
                JSON.stringify(prevCalculationHistory)
              );
              prevCalculationHistoryClone["history"].unshift({
                expression: expression,
                result: result,
              });
              return prevCalculationHistoryClone;
            });
            resolve(true);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  };
  return { calculationHistory, saveCalculation, fetchCalculationHistory };
}
