import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsX, BsLayoutSplit, BsLayoutSidebar, BsLayoutSidebarReverse } from 'react-icons/bs';
import { useTab } from '../context/TabContext'; // Import useTab hook
import './TopTabsBar.scss';

const TopTabsBar: React.FC = () => {
  const { openTabs, activeTabId, activateTab, removeTab } = useTab();

  return (
    <div className="top-tabs-bar">
      <Nav variant="tabs">
        {openTabs.map((tab) => (
          <Nav.Item key={tab.id}>
            <NavLink
              to={tab.path}
              className={activeTabId === tab.id ? 'nav-link active' : 'nav-link'} // Use activeTabId from context
              onClick={() => activateTab(tab.id)} // Activate tab on click
            >
              <span>
                {tab.name}
                {tab.id !== 'home' && ( // Conditionally render close button
                  <BsX className="close-tab-icon" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeTab(tab.id); // Remove tab on close icon click
                  }} />
                )}
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
