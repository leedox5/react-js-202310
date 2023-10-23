import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

export const Comp20231001 = () => {
  return (
    <Container className="my-2">
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
  );
};
