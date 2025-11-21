import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsX, BsLayoutSplit, BsLayoutSidebar, BsLayoutSidebarReverse } from 'react-icons/bs';
import { Tab } from './TabManager'; // Import Tab interface
import './TopTabsBar.scss';

interface TopTabsBarProps {
  openTabs: Tab[];
  activeTabId: string | null;
  activateTab: (tabId: string) => void;
  removeTab: (tabId: string) => void;
}

const TopTabsBar: React.FC<TopTabsBarProps> = ({ openTabs, activeTabId, activateTab, removeTab }) => {
  return (
    <div className="top-tabs-bar">
      <Nav variant="tabs">
        {openTabs.map((tab) => (
          <Nav.Item key={tab.id}>
            <NavLink
              to={tab.path}
              className={activeTabId === tab.id ? 'nav-link active' : 'nav-link'}
              onClick={() => activateTab(tab.id)}
            >
              <span>
                {tab.name}
                <BsX className="close-tab-icon" onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeTab(tab.id);
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
