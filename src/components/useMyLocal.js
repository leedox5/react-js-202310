import { useState, useEffect } from "react";

const useMyLocal = (key, init) => {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) || init
  );
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default useMyLocal;
