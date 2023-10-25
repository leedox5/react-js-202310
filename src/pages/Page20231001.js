import { useContext, useState, useEffect } from "react";
import { Comp20231001 } from "../components/Comp20231001";
import Comp20231002 from "../components/Comp20231002";
import Comp20231003 from "../components/Comp20231003";
import { createContext } from "react";
import axios from "axios";
import { useAuth } from "../components/auth";
import { WordsContext } from "../components/words";
import { useSearch } from "../components/search";
import { OptProvider, useOptState } from "../components/counter";
import { getRefreshToken } from "../apis/refresh";

const Page20231001 = () => {
  const { user, login } = useAuth();
  const [words, setWords] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const { search, setSearchOpt } = useSearch();

  //const [opt, setOpt ] = useState(search.opt);

  console.log(search);

  //const [opt, setOpt] = useState("eng");
  //const [key, setKey] = useState("");
  //const [page, setPage] = useState(1);

  const [pageInfo, setPageInfo] = useState({});

  const loadWords = async (opt, key, page) => {
    let path = "/api/v1/words";

    if (opt) path += "/" + opt;
    path += "/" + (key ? key : "*");
    path += "/" + (page ? page : 1);

    console.log(path);

    try {
      const result = await axios.get(path, {
        headers: {
          Authorization: "Bearer " + user.access_token,
        },
      });
      console.log(result.data);
      setWords(result.data.words);
      setPageInfo(result.data.pageInfo);
      let copySearch = search;
      copySearch.opt = opt;
      copySearch.key = key;
      copySearch.page = page;
      setSearchOpt(copySearch);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        setIsRefresh(true);
        const ret = await axios.post(
          "/api/v1/auth/refresh-token",
          {},
          {
            headers: {
              Authorization: "Bearer " + user.refresh_token,
            },
          }
        );
        login(ret.data);
      }
    }
  };

  useEffect(() => {
    loadWords(search.opt, search.key, search.page);
    if (isRefresh) {
      loadWords(search.opt, search.key, search.page);
      setIsRefresh(false);
    }
  }, []);

  return (
    <>
      <WordsContext.Provider
        value={{
          words,
          loadWords,
          pageInfo,
        }}
      >
        <Comp20231001></Comp20231001>
        <Comp20231002></Comp20231002>
        <Comp20231003></Comp20231003>
      </WordsContext.Provider>
    </>
  );
};

export default Page20231001;
