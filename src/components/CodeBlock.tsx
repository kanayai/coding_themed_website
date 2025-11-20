import React from 'react';
import { Button } from 'react-bootstrap';
import { BsClipboard } from 'react-icons/bs';
import './CodeBlock.scss';

interface CodeBlockProps {
  code: string;
  language?: string; // Optional: for future syntax highlighting based on language
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'python' }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!'); // Simple feedback for now
  };

  return (
    <div className="code-block-container">
      <div className="code-block-header">
        <span className="code-block-language">{language}</span>
        <Button variant="outline-secondary" size="sm" className="btn-code" onClick={handleCopy}>
          <BsClipboard className="me-1" /> Copy
        </Button>
      </div>
      <div className="code-block">
        <div className="code-block-content">
          <div className="line-numbers">
            {code.split('\\n').map((_, i) => (
              <div key={i} className="line-number">{i + 1}</div>
            ))}
          </div>
          <pre>
            <code>
              {code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
