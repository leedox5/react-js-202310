import { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
import { useAuth } from "./auth";

const Header = () => {
  const { user, logout } = useAuth();
  const [expanded, setExpanded] = useState("");
  const { pathname } = useLocation();

  const handleLogout = () => {
    setExpanded("");
    logout();
    window.location.assign("/");
  };

  useEffect(() => {
    setExpanded("");
  }, [pathname]);

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      bg="dark"
      className="bg-body-tertiary border-bottom"
    >
      <Container fluid>
        <LinkContainer to={"/"} onClick={() => setExpanded("")}>
          <Navbar.Brand>단어장</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded((prev) => (prev === "" ? "expanded" : ""))}
        ></Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="sm-auto">
            <LinkContainer to="/" onClick={() => setExpanded("")}>
              <Nav.Link>소개</Nav.Link>
            </LinkContainer>
            {user && (
              <LinkContainer
                to="/mypage"
                onClick={() =>
                  setExpanded((prev) => (prev === "" ? "expanded" : ""))
                }
              >
                <Nav.Link>내단어장</Nav.Link>
              </LinkContainer>
            )}
            {!user && (
              <LinkContainer to="/signin" onClick={() => setExpanded("")}>
                <Nav.Link>로그인</Nav.Link>
              </LinkContainer>
            )}
            {!user && (
              <LinkContainer to="/signup" onClick={() => setExpanded("")}>
                <Nav.Link>회원가입</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          {user && (
            <Form className="d-flex">
              <Button
                variant="outline-success"
                size="sm"
                onClick={handleLogout}
              >
                로그아웃
              </Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
