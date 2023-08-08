/**
 * provides window size and updates it on window resize event
 */

import { useState, useEffect } from "react";
export default function useWindowSize(widthStep, heightStep) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const windowSizeChangeHandler = () => {
      if (
        (window.innerWidth % widthStep === 0 &&
          window.innerWidth !== windowSize["width"]) ||
        (window.innerHeight % heightStep === 0 &&
          window.innerHeight !== windowSize["height"])
      ) {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      }
    };
    window.addEventListener("resize", windowSizeChangeHandler);
    return () => {
      window.removeEventListener("resize", windowSizeChangeHandler);
    };
  }, [windowSize, heightStep, widthStep]);

  return windowSize;
}
