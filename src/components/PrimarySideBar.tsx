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
            <div className="d-flex align-items-center">
              <BsHouseDoor />
              <span className="sidebar-item-label">Home</span>
            </div>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/about">
          <Nav.Link className="sidebar-item" aria-label="About">
            <div className="d-flex align-items-center">
              <BsInfoCircle />
              <span className="sidebar-item-label">About</span>
            </div>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/blog">
          <Nav.Link className="sidebar-item" aria-label="Blog">
            <div className="d-flex align-items-center">
              <BsJournalText />
              <span className="sidebar-item-label">Blog</span>
            </div>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/research">
          <Nav.Link className="sidebar-item" aria-label="Research">
            <div className="d-flex align-items-center">
              <BsBook />
              <span className="sidebar-item-label">Research</span>
            </div>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/teaching">
          <Nav.Link className="sidebar-item" aria-label="Teaching">
            <div className="d-flex align-items-center">
              <BsMortarboard />
              <span className="sidebar-item-label">Teaching</span>
            </div>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/contact">
          <Nav.Link className="sidebar-item" aria-label="Contact">
            <div className="d-flex align-items-center">
              <BsEnvelope />
              <span className="sidebar-item-label">Contact</span>
            </div>
          </Nav.Link>
        </LinkContainer>
      </Nav>
    </div>
  );
};

export default PrimarySideBar;
