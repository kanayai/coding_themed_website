import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {
  BsHouseDoor,      // Home
  BsInfoCircle,     // About
  BsJournalText,    // Blog
  BsBook,           // Research
  BsMortarboard, // Teaching
  BsEnvelope,       // Contact
} from 'react-icons/bs';
import './PrimarySideBar.scss';

const PrimarySideBar: React.FC = () => {
  return (
    <div className="primary-sidebar">
      <Nav className="flex-column">
        <LinkContainer to="/">
          <Nav.Link className="sidebar-item" aria-label="Home">
            <BsHouseDoor />
            <span className="sidebar-item-label">Home</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/about">
          <Nav.Link className="sidebar-item" aria-label="About">
            <BsInfoCircle />
            <span className="sidebar-item-label">About</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/blog">
          <Nav.Link className="sidebar-item" aria-label="Blog">
            <BsJournalText />
            <span className="sidebar-item-label">Blog</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/research">
          <Nav.Link className="sidebar-item" aria-label="Research">
            <BsBook />
            <span className="sidebar-item-label">Research</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/teaching">
          <Nav.Link className="sidebar-item" aria-label="Teaching">
            <Bs mortarboard />
            <span className="sidebar-item-label">Teaching</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/contact">
          <Nav.Link className="sidebar-item" aria-label="Contact">
            <BsEnvelope />
            <span className="sidebar-item-label">Contact</span>
          </Nav.Link>
        </LinkContainer>
      </Nav>
    </div>
  );
};

export default PrimarySideBar;
