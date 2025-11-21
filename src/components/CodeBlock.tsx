import React, { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './CodeBlock.scss';

interface CodeBlockProps {
  code: string;
  language?: string;
  isJupyter?: boolean;
  extendLineNumbers?: boolean; // New prop
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'python', isJupyter = false, extendLineNumbers = false }) => {
  const [extraLines, setExtraLines] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const codeContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (extendLineNumbers) {
      const calculateExtraLines = () => {
        if (containerRef.current && codeContentRef.current) {
          const containerHeight = containerRef.current.clientHeight;
          const contentHeight = codeContentRef.current.clientHeight;
          const lineHeight = 18; // Approximate line height, adjust if needed
          
          if (containerHeight > contentHeight) {
            const linesNeeded = Math.floor((containerHeight - contentHeight) / lineHeight);
            const initialLineCount = code.split('\n').length;
            setExtraLines(
              Array.from({ length: linesNeeded }, (_, i) => initialLineCount + i + 1)
            );
          } else {
            setExtraLines([]);
          }
        }
      };
      
      calculateExtraLines();
      window.addEventListener('resize', calculateExtraLines);
      return () => window.removeEventListener('resize', calculateExtraLines);
    }
  }, [code, extendLineNumbers]);

  return (
    <div className="code-block-container" ref={containerRef}>
      {!isJupyter && (
        <div className="code-block-header">
          <span className="code-block-language">{language.charAt(0).toUpperCase() + language.slice(1)}</span>
        </div>
      )}
      <div className="code-block">
        <div className="code-block-content" ref={codeContentRef}>
          <div className="line-numbers">
            {code.split('\n').map((_, i) => (
              <div key={`line-${i}`} className="line-number">{i + 1}</div>
            ))}
            {extendLineNumbers && extraLines.map(lineNumber => (
              <div key={`extra-${lineNumber}`} className="line-number">{lineNumber}</div>
            ))}
          </div>
          <SyntaxHighlighter language={language} style={atomDark} customStyle={{ margin: 0, background: 'none', padding: 0 }}>
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
      {isJupyter && (
        <div className="code-block-footer">
          <span className="code-block-language">{language}</span>
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
