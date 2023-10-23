import React from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";

const Comp20231002 = () => {
  return (
    <Container className="mb-2">
      <Row className="g-1">
        <Col xs={6}>
          <InputGroup>
            <Form.Control placeholder=""></Form.Control>
            <InputGroup.Text id="IG.01">/</InputGroup.Text>
            <InputGroup.Text id="IG.02">417</InputGroup.Text>
            <Button variant="outline-secondary" id="BT.01">
              Go
            </Button>
          </InputGroup>
        </Col>
        <Col className="text-end">
          <Button variant="outline-secondary">◀</Button>
          <Button variant="outline-secondary">▶</Button>
          <Button variant="outline-primary">Add</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Comp20231002;
