import { useState, useContext } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useAuth } from "./auth";
import axios from "axios";
import { WordsContext } from "./words";
import { useSearch } from "./search";

export const Comp20231001 = () => {
  const { user } = useAuth();
  const { search, setSearchOpt } = useSearch();

  console.log(search);

  const [opt, setOpt] = useState(search.opt);
  const [key, setKey] = useState(search.key);

  const { words, loadWords } = useContext(WordsContext);

  const onChange = (e) => {
    setOpt(e.target.value);
  };

  const onChangeText = (e) => {
    setKey(e.target.value);
  };

  const onClick = async (e) => {
    e.preventDefault();
    /*
    try {
      const result = await axios.get(`/api/v1/words/${opt}/${key}`, {
        headers: {
          Authorization: "Bearer " + user.access_token,
        },
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
    */
    loadWords(opt, key, 1);
  };

  return (
    <Container className="my-2">
      <Form>
        <Row className="g-2">
          <Form.Group className="col col-3" controlId="formGridState">
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
    </Container>
  );
};
