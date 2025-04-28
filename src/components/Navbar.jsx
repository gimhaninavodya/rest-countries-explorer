import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { useState } from "react";

function AppNavbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">Country Explorer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto mb-2 mb-lg-0">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/fav-countries">Favorites</Nav.Link>
          </Nav>

          <Form className="d-flex ms-lg-2 my-2 my-lg-0" style={{ maxWidth: "300px", width: "100%" }}>
            <Form.Control
              type="search"
              placeholder="Search countries..."
              className="rounded shadow-sm px-3 border-0 w-100"
              style={{ fontSize: "0.9rem" }}
              value={searchTerm}
              onChange={handleChange}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
