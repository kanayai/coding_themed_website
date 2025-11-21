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
              onClick={(e) => {
                // Check if the click originated from the close button
                const isCloseButtonClick = (e.target as HTMLElement).closest('.close-tab-icon');
                if (!isCloseButtonClick) {
                  activateTab(tab.id);
                } else {
                  // If it's the close button, prevent NavLink from activating
                  e.preventDefault();
                }
              }}
            >
              <span>
                {tab.name}
                {tab.id !== 'home' && ( // Conditionally render close button
                  <BsX className="close-tab-icon" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeTab(tab.id);
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
