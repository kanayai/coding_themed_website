import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {
  BsX,
  BsLayoutSplit,
  BsLayoutSidebar,
  BsLayoutSidebarReverse
} from 'react-icons/bs';
import './TopTabsBar.scss';

// Temporary static list of open tabs
const openTabs = [
  { id: 'home', name: 'home.py', path: '/' },
  { id: 'about', name: 'about.py', path: '/about' },
];

const TopTabsBar: React.FC = () => {
  return (
    <div className="top-tabs-bar">
      <Nav variant="tabs">
        {openTabs.map((tab) => (
          <Nav.Item key={tab.id}>
            <NavLink
              to={tab.path}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <span>
                {tab.name}
                <BsX className="close-tab-icon" onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // TODO: Implement close tab logic
                  console.log('Close tab:', tab.name);
                }} />
              </span>
            </NavLink>
          </Nav.Item>
        ))}
      </Nav>
      <div className="layout-icons">
        <BsLayoutSplit />
        <BsLayoutSidebar />
        <BsLayoutSidebarReverse />
      </div>
    </div>
  );
};

export default TopTabsBar;
