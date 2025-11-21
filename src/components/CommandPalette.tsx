import React, { useState, useRef, useEffect, useCallback } from 'react';
import './CommandPalette.scss';
import { useSearch } from '../context/SearchContext';
import { BsLayoutSplit, BsLayoutSidebar, BsLayoutSidebarReverse } from 'react-icons/bs';
import { sectionMap } from './PrimarySideBar'; // Import sectionMap
import { Tab } from './TabManager'; // Import Tab interface

interface CommandPaletteProps {
  addTab: (tab: Tab) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ addTab }) => {
  const { searchTerm, setSearchTerm, isSearchVisible, toggleSearchVisibility } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<Tab[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  useEffect(() => {
    if (isSearchVisible) {
      inputRef.current?.focus();
    }
  }, [isSearchVisible]);

  useEffect(() => {
    if (searchTerm) {
      const allTabs = Object.values(sectionMap).filter(section => !section.isFolder) as Tab[];
      const filteredSuggestions = allTabs.filter(tab =>
        tab.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
    setActiveSuggestionIndex(0);
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (suggestions.length > 0) {
        addTab(suggestions[activeSuggestionIndex]);
      }
      toggleSearchVisibility();
      setSearchTerm('');
    } else if (e.key === 'Escape') {
      toggleSearchVisibility();
      setSearchTerm('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    }
  };

  const handleSuggestionClick = (suggestion: Tab) => {
    addTab(suggestion);
    toggleSearchVisibility();
    setSearchTerm('');
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
          <>
            <input
              ref={inputRef}
              type="text"
              placeholder="Type command or search (Cmd+Shift+P to toggle)"
              className="command-input"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={suggestion.id}
                    className={index === activeSuggestionIndex ? 'active' : ''}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
          </>
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
