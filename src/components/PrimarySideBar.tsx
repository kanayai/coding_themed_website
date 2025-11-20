import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // Import NavLink directly
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
        <NavLink to="/" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')} aria-label="Home">
          <div className="d-flex align-items-center">
            <BsHouseDoor />
            <span className="sidebar-item-label">Home</span>
          </div>
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')} aria-label="About">
          <div className="d-flex align-items-center">
            <BsInfoCircle />
            <span className="sidebar-item-label">About</span>
          </div>
        </NavLink>
        <NavLink to="/blog" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')} aria-label="Blog">
          <div className="d-flex align-items-center">
            <BsJournalText />
            <span className="sidebar-item-label">Blog</span>
          </div>
        </NavLink>
        <NavLink to="/research" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')} aria-label="Research">
          <div className="d-flex align-items-center">
            <BsBook />
            <span className="sidebar-item-label">Research</span>
          </div>
        </NavLink>
        <NavLink to="/teaching" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')} aria-label="Teaching">
          <div className="d-flex align-items-center">
            <BsMortarboard />
            <span className="sidebar-item-label">Teaching</span>
          </div>
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')} aria-label="Contact">
          <div className="d-flex align-items-center">
            <BsEnvelope />
            <span className="sidebar-item-label">Contact</span>
          </div>
        </NavLink>
      </Nav>
    </div>
  );
};

export default PrimarySideBar;
