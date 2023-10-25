import { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useAuth } from "./auth";
import { WordsContext } from "./words";
import { useSearch } from "./search";

const Comp20231003 = () => {
  /*
  const words = [
    { word: "10010", meaning: "소개" },
    { word: "10020", meaning: "축하" },
  ];
  */
  const { user } = useAuth();
  //const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { words, loadWords, pageInfo } = useContext(WordsContext);

  const { search } = useSearch();

  useEffect(() => {
    //setIsLoading(true);
    /* ---
    fetch("/api/v1/words", {
      headers: {
        Authorization: "Bearer " + user.access_token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} 에러 발생`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setWords(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
      --- */
    //loadWords(opt, search.key, search.page);
  }, []);

  return (
    <Container>
      <h6 className="small text-muted text-end mt-1">
        조회건수 : {pageInfo.totalElements}
      </h6>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>단어</th>
            <th>의미</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word, index) => (
            <tr key={index}>
              <td>
                <Link to={"/detail/" + word.id}>{word.word}</Link>
              </td>
              <td>{word.meaning}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Comp20231003;
