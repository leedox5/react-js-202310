import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getHome } from "../apis/getHome";

const msg = `안녕하세요!
나만의 단어를 저장하고 공부해 보세요
`;

const Home = ({ username }) => {
  /* ---
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHome().then((res) => {
      console.log(res);
      setData(res);
      setLoading(false);
    });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  --- */
  const [word, setWord] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const accessToken = localStorage.getItem("access");

    if (!accessToken) {
      return;
    }

    fetch("/api/v1/intro", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
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
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading ...</p>
      </section>
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
            <Link to="/signin" className="btn btn-sm btn-primary">
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
