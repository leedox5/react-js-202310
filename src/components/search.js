import { createContext, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

const SearchContext = createContext({});

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useLocalStorage("search", {
    opt: "eng",
    key: "",
    page: 1,
  });

  const setSearchOpt = (searchOpt) => {
    setSearch(searchOpt);
  };

  return (
    <SearchContext.Provider value={{ search, setSearchOpt }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const value = useContext(SearchContext);
  if (value === undefined) {
    throw new Error("useSearch Error");
  }
  return value;
};
