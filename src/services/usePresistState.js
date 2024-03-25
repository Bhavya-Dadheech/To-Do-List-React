import { useState, useEffect, useMemo } from "react";

export default function usePersistState(initialValue) {
  const _initialValue = useMemo(() => {
    const localStorageValueStr = localStorage.getItem("listID");
    return localStorageValueStr !== "undefined" ? JSON.parse(localStorageValueStr) : initialValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState(_initialValue);

  useEffect(() => {
    const stateStr = JSON.stringify(state);
    localStorage.setItem("listID", stateStr);
  }, [state]);

  return [state, setState];
}
