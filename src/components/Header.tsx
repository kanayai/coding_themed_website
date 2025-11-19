import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Header.scss';
import { useSearch } from '../context/SearchContext';
import { useTheme } from '../context/ThemeContext';
import { BsSun, BsMoon } from 'react-icons/bs'; // Import icons

const Header: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Actual search functionality will be implemented in the individual pages
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-0 header-script">
      <Container fluid>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <span className="import-keyword">import</span> <span className="module-name">karim_ai</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-imports">
            <LinkContainer to="/">
              <Nav.Link><span className="import-keyword">import</span> <span className="module-name">home</span></Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link><span className="import-keyword">import</span> <span className="module-name">about</span></Nav.Link>
            </LinkContainer>
            <LinkContainer to="/blog">
              <Nav.Link><span className="import-keyword">import</span> <span className="module-name">blog</span></Nav.Link>
            </LinkContainer>
            <LinkContainer to="/research">
              <Nav.Link><span className="from-keyword">from</span> <span className="module-name">research</span> <span className="import-keyword">import</span> <span className="module-name">publications</span></Nav.Link>
            </LinkContainer>
            <LinkContainer to="/teaching">
              <Nav.Link><span className="import-keyword">import</span> <span className="module-name">teaching</span></Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link><span className="import-keyword">import</span> <span className="module-name">contact</span></Nav.Link>
            </LinkContainer>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="search_website()"
              className="me-2 search-input"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-success" type="submit" className="btn-code">Run</Button>
          </Form>
          <Button variant="outline-secondary" className="ms-2 btn-code" onClick={toggleTheme}>
            {theme === 'light' ? <><BsMoon className="me-1" /> Dark Mode</> : <><BsSun className="me-1" /> Light Mode</>}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
