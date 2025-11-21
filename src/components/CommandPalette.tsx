import React, { useRef, useEffect } from 'react';
import './CommandPalette.scss';
import { useSearch } from '../context/SearchContext'; // Import useSearch hook
import { BsLayoutSplit, BsLayoutSidebar, BsLayoutSidebarReverse } from 'react-icons/bs';

const CommandPalette: React.FC = () => {
  const { searchTerm, setSearchTerm, isSearchVisible, toggleSearchVisibility } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchVisible) {
      inputRef.current?.focus();
    }
  }, [isSearchVisible]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Potentially navigate to a search results page or trigger a search action
      // For now, just close the command palette after search
      toggleSearchVisibility();
    } else if (e.key === 'Escape') {
      toggleSearchVisibility(); // Close command palette on Escape
      setSearchTerm(''); // Clear search term
    }
  };

  return (
    <div className="command-palette">
      <div className="window-controls">
        <span className="control-button close"></span>
        <span className="control-button minimize"></span>
        <span className="control-button maximize"></span>
      </div>
      
      <div className="command-input-container">
        {isSearchVisible ? (
          <input
            ref={inputRef}
            type="text"
            placeholder="Type command or search (Cmd+Shift+P to toggle)"
            className="command-input"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div className="command-input-placeholder" onClick={toggleSearchVisibility}>
            Type command or search (Cmd+Shift+P to toggle)
          </div>
        )}
      </div>

      <div className="layout-icons">
        <BsLayoutSplit />
        <BsLayoutSidebar />
        <BsLayoutSidebarReverse />
      </div>
    </div>
  );
};

export default CommandPalette;
