import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const Comp20231003 = () => {
  /*
  const words = [
    { word: "10010", meaning: "소개" },
    { word: "10020", meaning: "축하" },
  ];
  */

  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const accessToken = localStorage.getItem("access");
    fetch("/api/v1/words", {
      headers: {
        Authorization: "Bearer " + accessToken,
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
  }, []);

  return (
    <Container>
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
                <Link to="/detail">{word.word}</Link>
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
