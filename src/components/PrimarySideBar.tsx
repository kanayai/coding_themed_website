import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsChevronRight } from 'react-icons/bs'; // For the '>' symbol
import './PrimarySideBar.scss';

const PrimarySideBar: React.FC = () => {
  const [isResearchOpen, setResearchOpen] = useState(false);

  const toggleResearch = () => {
    setResearchOpen(!isResearchOpen);
  };

  return (
    <div className="primary-sidebar">
      <Nav className="flex-column">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')} aria-label="Home">
          <div className="d-flex align-items-center">
            <BsChevronRight className="sidebar-arrow" />
            <span className="sidebar-item-label">Home</span>
          </div>
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')} aria-label="About">
          <div className="d-flex align-items-center">
            <BsChevronRight className="sidebar-arrow" />
            <span className="sidebar-item-label">About</span>
          </div>
        </NavLink>
        <NavLink to="/blog" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')} aria-label="Blog">
          <div className="d-flex align-items-center">
            <BsChevronRight className="sidebar-arrow" />
            <span className="sidebar-item-label">Blog</span>
          </div>
        </NavLink>
        <div className="sidebar-item-toggle" onClick={toggleResearch}>
          <div className="d-flex align-items-center">
            <BsChevronRight className={`sidebar-arrow ${isResearchOpen ? 'open' : ''}`} />
            <span className="sidebar-item-label">Research</span>
          </div>
        </div>
        {isResearchOpen && (
          <div className="sidebar-submenu">
            <NavLink to="/research/publications" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')} aria-label="Publications">
              <div className="d-flex align-items-center">
                <span className="sidebar-item-label">Publications</span>
              </div>
            </NavLink>
            <NavLink to="/research/projects" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')} aria-label="Research Projects">
              <div className="d-flex align-items-center">
                <span className="sidebar-item-label">Projects</span>
              </div>
            </NavLink>
          </div>
        )}
        <NavLink to="/teaching" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')} aria-label="Teaching">
          <div className="d-flex align-items-center">
            <BsChevronRight className="sidebar-arrow" />
            <span className="sidebar-item-label">Teaching</span>
          </div>
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')} aria-label="Contact">
          <div className="d-flex align-items-center">
            <BsChevronRight className="sidebar-arrow" />
            <span className="sidebar-item-label">Contact</span>
          </div>
        </NavLink>
      </Nav>
    </div>
  );
};

export default PrimarySideBar;
