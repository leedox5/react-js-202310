import { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [expanded, setExpanded] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
    setExpanded("");
  }, [pathname]);

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      bg="dark"
      className="bg-body-tertiary border-bottom"
    >
      <Container className="container-fluid">
        <LinkContainer to={"/"} onClick={() => setExpanded("")}>
          <Navbar.Brand>단어장</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded((prev) => (prev === "" ? "expanded" : ""))}
        ></Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/intro">
              <Nav.Link>소개</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/signin">
              <Nav.Link>Sign in</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>로그인</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/signup">
              <Nav.Link>SignUp</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
