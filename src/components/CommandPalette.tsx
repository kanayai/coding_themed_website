import React from 'react';
import './CommandPalette.scss';

const CommandPalette: React.FC = () => {
  return (
    <div className="command-palette">
      <div className="window-controls">
        <span className="control-button close"></span>
        <span className="control-button minimize"></span>
        <span className="control-button maximize"></span>
      </div>
      <div className="command-input-container">
        <input type="text" placeholder="Type command or search (Ctrl+P)" className="command-input" />
      </div>
    </div>
  );
};

export default CommandPalette;
