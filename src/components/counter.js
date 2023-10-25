import { createContext, useContext, useState } from "react";

const OptContext = createContext();

export const OptProvider = ({ children }) => {
  const [opt, setOpt] = useState("eng");
  return (
    <OptContext.Provider value={{ opt, setOpt }}>
      {children}
    </OptContext.Provider>
  );
};

export const useOptState = () => {
  const value = useContext(OptContext);
  /*
  if (value === undefined) {
    throw new Error("useOptState Error");
  }
  */
  return value;
};
