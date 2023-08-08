/**
 * it uses 'react-intersection-observer' to check if the loader is in viewport
 * if loader is in viewport, requests for more history
 */

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function HistoryLoader({ loadMore, hasMoreToLoad }) {
  const [loaderRef, loaderInView, __] = useInView({ threshold: 0.5 });
  useEffect(() => {
    if (loaderInView) {
      const loadMoreHistory = async () => {
        await loadMore()
          .then(async (response) => {
            // if (loaderInView) {
            //   await loadMoreHistory();
            // }
          })
          .catch((error) => {
            console.log(error);
          });
      };
      loadMoreHistory();
    }
  }, [loaderInView]);
  return hasMoreToLoad ? (
    <div className="flex items-center justify-center py-2" ref={loaderRef}>
      <svg
        className="h-5 w-5 animate-spin"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <g fill="#000000" fillRule="evenodd" clipRule="evenodd">
          <path
            d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
            opacity=".2"
          />

          <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z" />
        </g>
      </svg>
    </div>
  ) : (
    <div className="w-full border border-slate-200"></div>
  );
}
