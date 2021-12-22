import React, { useEffect, useRef } from "react";

export const useUpdateEffect = (effect, dependencies) => {
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (!isFirstMount.current) effect();
    else isFirstMount.current = false;
  }, dependencies);
};
