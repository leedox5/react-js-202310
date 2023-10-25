import axios from "axios";
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Accordion,
  Spinner,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../components/auth";

const Page20231002 = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [word, setWord] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchWord = async () => {
    try {
      const result = await axios.get("/api/v1/word/" + id, {
        headers: {
          Authorization: "Bearer " + user.access_token,
        },
      });
      console.log(result.data);
      setIsLoading(false);
      setWord(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWord();
  }, []);

  if (isLoading) {
    return (
      <Container className="text-center">
        <Spinner animation="border" role="sataus"></Spinner>
      </Container>
    );
  }

  return (
    <Container className="my-2">
      <Row className="border-bottom">
        <Col ms={4}>
          <h2>10010</h2>
        </Col>
        <Col ms={8} className="text-end">
          <Link
            to="/mypage"
            variant="outline-secondary"
            size="sm"
            className="mb-1"
          >
            목록으로
          </Link>
        </Col>
      </Row>
      <h6 className="small text-muted text-end mt-1">조회수 : 3</h6>
      <Card className="my-2">
        <Card.Body>
          <Card.Text>소개</Card.Text>
        </Card.Body>
        <Card.Footer className="text-end">
          <Button variant="outline-secondary" size="sm">
            수정
          </Button>
        </Card.Footer>
      </Card>
      <Accordion defaultActiveKey={[0]} alwaysOpen>
        {word.meanings.map((item, idx) => (
          <Accordion.Item eventKey={idx} key={item.id}>
            <Accordion.Header>{item.id}</Accordion.Header>
            <Accordion.Body style={{ whiteSpace: "pre-line" }}>
              {item.meaning}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default Page20231002;
