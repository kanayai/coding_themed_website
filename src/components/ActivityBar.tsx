import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
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
import { useSearch } from '../context/SearchContext'; // Import useSearch hook
import './ActivityBar.scss';

const ActivityBar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { setSearchTerm } = useSearch();

  const handleSearchClick = () => {
    // For now, clicking the search icon will clear the search term
    // which effectively shows all content. In a more advanced setup,
    // this would open a search panel or navigate to a search results page.
    setSearchTerm('');
  };

  return (
    <div className="activity-bar">
      <Nav className="flex-column text-center">
        <LinkContainer to="/">
          <Nav.Link className="activity-bar-icon" aria-label="Explorer">
            <BsFileEarmarkText />
          </Nav.Link>
        </LinkContainer>
        <Nav.Link className="activity-bar-icon" aria-label="Search" onClick={handleSearchClick}>
          <BsSearch />
        </Nav.Link>
        <LinkContainer to="/source-control"> {/* Placeholder */}
          <Nav.Link className="activity-bar-icon" aria-label="Source Control">
            <BsCodeSlash />
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/run-debug"> {/* Placeholder */}
          <Nav.Link className="activity-bar-icon" aria-label="Run and Debug">
            <BsPlayCircle />
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/extensions"> {/* Placeholder */}
          <Nav.Link className="activity-bar-icon" aria-label="Extensions">
            <BsPuzzle />
          </Nav.Link>
        </LinkContainer>

        <div className="activity-bar-bottom">
          <Nav.Link onClick={toggleTheme} className="activity-bar-icon" aria-label="Toggle Theme">
            {theme === 'light' ? <BsMoon /> : <BsSun />}
          </Nav.Link>
          <LinkContainer to="/settings"> {/* Placeholder */}
            <Nav.Link className="activity-bar-icon" aria-label="Settings">
              <BsGear />
            </Nav.Link>
          </LinkContainer>
        </div>
      </Nav>
    </div>
  );
};

export default ActivityBar;
