import { useContext, useState } from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { WordsContext } from "./words";
import { useSearch } from "./search";

const Comp20231002 = () => {
  const { search, setSearchOpt } = useSearch();
  const [page, setPage] = useState(search.page);
  const { words, loadWords, pageInfo } = useContext(WordsContext);

  console.log(search);

  const onChange = (e) => {
    if (e.target.value < 1 || e.target.value > pageInfo.totalPages) return;
    setPage(e.target.value);
  };

  const onClick = (e) => {
    loadWords(search.opt, search.key, page);
  };

  const onClickPrev = () => {
    setPage(page - 1);
    loadWords(search.opt, search.key, page - 1);
  };

  const onClickNext = () => {
    setPage(page + 1);
    loadWords(search.opt, search.key, page + 1);
  };

  return (
    <Container className="mb-2">
      <Row className="g-1">
        <Col xs={6}>
          <InputGroup>
            <Form.Control
              className="text-end"
              placeholder="page"
              onChange={onChange}
              type="number"
              min={1}
              max={pageInfo.totalPages}
              value={page}
            ></Form.Control>
            <InputGroup.Text id="IG.01">/</InputGroup.Text>
            <InputGroup.Text id="IG.02">{pageInfo.totalPages}</InputGroup.Text>
            <Button variant="outline-secondary" id="BT.01" onClick={onClick}>
              Go
            </Button>
          </InputGroup>
        </Col>
        <Col className="text-end">
          <Button
            variant="outline-secondary"
            onClick={onClickPrev}
            disabled={page === 1}
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
          <Button variant="outline-primary">Add</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Comp20231002;
