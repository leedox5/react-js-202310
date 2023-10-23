import React from "react";
import { Container, Row, Col, Button, Card, Accordion } from "react-bootstrap";

const Page20231002 = () => {
  return (
    <Container className="my-2">
      <Row className="border-bottom">
        <Col ms={4}>
          <h2>10010</h2>
        </Col>
        <Col ms={8} className="text-end">
          <Button>목록으로</Button>
        </Col>
      </Row>
      <h6 className="small text-muted text-end mt-1">조회수 : 3</h6>
      <Card className="my-2">
        <Card.Body>
          <Card.Text>소개</Card.Text>
        </Card.Body>
        <Card.Footer className="text-end">
          <Button className="small">수정</Button>
        </Card.Footer>
      </Card>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>안녕하세요!</Accordion.Header>
          <Accordion.Body>나만의 단어를 저장하고 공부해 보세요.</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>업데이트</Accordion.Header>
          <Accordion.Body>
            [2022.09.21] 단어장 오픈 [2023.08.21] 페이징 처리 [2023.09.13]
            오픈단어장 추가 [2023.09.19] 단어장 생성 기능
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default Page20231002;
