import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Using atomDark for VSCode-like dark theme
import './CodeBlock.scss';

interface CodeBlockProps {
  code: string;
  language?: string; // Optional: for future syntax highlighting based on language
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'python' }) => {
  return (
    <div className="code-block-container">
      <div className="code-block-header">
        <span className="code-block-language">{language}</span>
      </div>
      <div className="code-block">
        <div className="code-block-content">
          <div className="line-numbers">
            {code.split('\n').map((_, i) => (
              <div key={i} className="line-number">{i + 1}</div>
            ))}
          </div>
          <SyntaxHighlighter language={language} style={atomDark} customStyle={{ margin: 0, background: 'none', padding: 0 }}>
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
