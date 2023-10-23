import React from "react";
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

const Mypage = () => {
  return (
    <>
      <Container className="my-4">
        <InputGroup className="mb-3">
          <Form.Select defaultValue="단어">
            <option>단어</option>
            <option>의미</option>
          </Form.Select>
          <Form.Control
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2">
            Search
          </Button>
        </InputGroup>
      </Container>
      <Container className="my-4">
        <Form>
          <Row className="g-2">
            <Form.Group className="col col-3" controlId="formGridState">
              <Form.Select defaultValue="단어">
                <option>단어</option>
                <option>의미</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Control placeholder="검색어를 입력하세요" />
            </Form.Group>
            <Button className="btn btn-sm col col-2" variant="primary">
              검색
            </Button>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default Mypage;
