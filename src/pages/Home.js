import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getHome } from "../apis/getHome";
import { useAuth } from "../components/auth";
import { Container, Spinner } from "react-bootstrap";

const Home = () => {
  const [word, setWord] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  /* ---
  useEffect(() => {
    getHome()
      .then((data) => {
        console.log(data);
        setWord(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
      });
  }, []);
  --- */

  useEffect(() => {
    setIsLoading(true);

    fetch("/api/v1/auth/intro")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} 에러가 발생했습니다.`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setWord(data);
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
      });
  }, []);

  if (errorMessage) {
    return (
      <Container>
        <div className="alert alert-danger text-center">{errorMessage}</div>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container className="text-center">
        <Spinner animation="border" role="sataus"></Spinner>
      </Container>
    );
  }

  return (
    <>
      <div className="container my-3">
        <div className="row border-bottom">
          <div className="col-8">
            <h2>소개</h2>
          </div>
          <div className="col-4 text-end">
            <Link to="/mypage" className="btn btn-sm btn-secondary">
              시작하기
            </Link>
          </div>
        </div>
        <div>
          <div id="collap33" className="collapse show mulcol33">
            <div className="card mt-1">
              <div className="card-body">
                <span style={{ whiteSpace: "pre-line" }}>
                  {word.meanings[0].meaning}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
