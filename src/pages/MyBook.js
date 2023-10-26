import { useEffect, useState } from "react";
import {
  Container,
  Form,
  InputGroup,
  Button,
  Dropdown,
  DropdownButton,
  FormGroup,
  Row,
  Col,
  FormText,
} from "react-bootstrap";
import { useSearch } from "../components/search";
import WordList from "../components/WordList";
import axios from "axios";
import { useAuth } from "../components/auth";
import { useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const MyBook = () => {
  console.log("MyBook...");
  const { user } = useAuth();
  const { search, setSearchOpt } = useSearch();

  const location = useLocation();

  console.log(location.state);

  const [opt, setOpt] = useState(location.state ? location.state.opt : "eng");
  const [key, setKey] = useState(location.state ? location.state.key : "");
  const [page, setPage] = useState(location.state ? location.state.number : 1);

  const [isNewPage, setIsNewPage] = useState(false);

  const [words, setWords] = useState([]);
  const [pageInfo, setPageInfo] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (e) => {
    setOpt(e.target.value);
  };

  const onChangeText = (e) => {
    setKey(e.target.value);
    setPage(1);
  };

  const onClick = (e) => {
    setIsLoading(true);
    try {
      getWords().then((data) => {
        console.log(data);
        setWords(data.words);
        setPageInfo(data.pageInfo);
        if (data.pageInfo.totalElements === 0) {
          setPage(0);
        }
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const onChangePage = (e) => {
    setPage(e.target.value);
  };

  const renderPage = () => {
    setIsLoading(true);
    getWords().then((data) => {
      console.log(data);
      setWords(data.words);
      setPageInfo(data.pageInfo);
      setIsLoading(false);
    });
  };

  const onClickPage = (e) => {
    setIsLoading(true);
    getWords().then((data) => {
      console.log(data);
      setWords(data.words);
      setPageInfo(data.pageInfo);
      setIsLoading(false);
    });
  };

  const onClickPrev = () => {
    setPage(Number(page) - 1);
    setIsNewPage(!isNewPage);
    //renderPage();
  };

  const onClickNext = () => {
    setPage(Number(page) + 1);
    setIsNewPage(!isNewPage);
    //renderPage();
  };

  const getWords = async () => {
    let path = `/api/v1/words/${opt}/${key ? key : "*"}/${page}`;

    console.log(path);

    try {
      const result = await axios.get(path, {
        headers: {
          Authorization: "Bearer " + user.access_token,
        },
      });
      return result.data;
    } catch (error) {
      if (error.response.status === 401) {
        window.location.assign("/");
      } else {
        setIsError(true);
        setErrorMessage("네트워크 상태가 원할하지 않습니다.");
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      getWords().then((data) => {
        console.log(data);
        if (data) {
          setWords(data.words);
          setPageInfo(data.pageInfo);
          setIsLoading(false);
        } else {
          setPage(0);
        }
      });
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  }, [location.key, isNewPage]);

  let comp;

  if (isError) {
    return (
      <Container>
        <div className="alert alert-danger text-center">{errorMessage}</div>
      </Container>
    );
  }

  if (isLoading) {
    comp = (
      <Container className="text-center">
        <Spinner animation="border" role="sataus"></Spinner>
      </Container>
    );
  } else {
    comp = <WordList words={words} pageInfo={pageInfo}></WordList>;
  }

  return (
    <>
      <Container className="my-2">
        <Form>
          <Row className="g-2">
            <Form.Group className="col col-3">
              <Form.Select defaultValue={opt} onChange={onChange}>
                <option value="eng">단어</option>
                <option value="kor">의미</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                type="text"
                placeholder="검색어를 입력하세요"
                onChange={onChangeText}
                value={key}
              />
            </Form.Group>
            <Button
              className="sm col col-2"
              variant="secondary"
              onClick={onClick}
            >
              검색
            </Button>
          </Row>
        </Form>
        <Row className="g-1 my-1">
          <Col>
            <InputGroup>
              <InputGroup.Text id="IG.00">
                {pageInfo.totalElements}
              </InputGroup.Text>
              <Form.Control
                className="text-end"
                placeholder="page"
                onChange={onChangePage}
                type="number"
                min={0}
                max={pageInfo.totalPages}
                value={page}
              ></Form.Control>
              <InputGroup.Text id="IG.01">/</InputGroup.Text>
              <InputGroup.Text id="IG.02">
                {pageInfo.totalPages}
              </InputGroup.Text>
              <Button
                variant="outline-secondary"
                id="BT.01"
                onClick={onClickPage}
              >
                Go
              </Button>
            </InputGroup>
          </Col>
          <Col xs={4} className="text-end">
            <Button
              variant="outline-secondary"
              onClick={onClickPrev}
              disabled={page <= 1}
            >
              ◀
            </Button>
            <Button
              variant="outline-secondary"
              onClick={onClickNext}
              disabled={page === pageInfo.totalPages}
            >
              ▶
            </Button>
          </Col>
        </Row>
      </Container>
      {comp}
    </>
  );
};

export default MyBook;
