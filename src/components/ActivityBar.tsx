import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {
  BsFileEarmarkText, // Explorer
  BsSearch,          // Search
  BsCodeSlash,       // Source Control (generic code icon for now)
  BsPlayCircle,      // Run and Debug
  BsPuzzle,          // Extensions
  BsSun,             // Light Mode
  BsMoon,            // Dark Mode
  BsGear,            // Settings
} from 'react-icons/bs';
import { useTheme } from '../context/ThemeContext';
import { useSearch } from '../context/SearchContext';
import './ActivityBar.scss';

const ActivityBar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { setSearchTerm } = useSearch();

  const handleSearchClick = () => {
    setSearchTerm(''); // Clear search term to show all results, or navigate to search page
  };

  return (
    <div className="activity-bar">
      <Nav className="flex-column text-center">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link activity-bar-icon active' : 'nav-link activity-bar-icon')} aria-label="Explorer">
          <BsFileEarmarkText />
        </NavLink>
        <NavLink to="/search-page" onClick={handleSearchClick} className="nav-link activity-bar-icon" aria-label="Search">
          <BsSearch />
        </NavLink>

        <NavLink to="/run-debug" className={({ isActive }) => (isActive ? 'nav-link activity-bar-icon active' : 'nav-link activity-bar-icon')} aria-label="Run and Debug">
          <BsPlayCircle />
        </NavLink>
        <NavLink to="/extensions" className={({ isActive }) => (isActive ? 'nav-link activity-bar-icon active' : 'nav-link activity-bar-icon')} aria-label="Extensions">
          <BsPuzzle />
        </NavLink>

        <div className="activity-bar-bottom">
          <Nav.Link onClick={toggleTheme} className="activity-bar-icon" aria-label="Toggle Theme">
            {theme === 'light' ? <BsMoon /> : <BsSun />}
          </Nav.Link>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? 'nav-link activity-bar-icon active' : 'nav-link activity-bar-icon')} aria-label="Settings">
            <BsGear />
          </NavLink>
        </div>
      </Nav>
    </div>
  );
};

export default ActivityBar;
