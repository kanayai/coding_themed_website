import React from 'react';
// import { Container } from 'react-bootstrap'; // No longer needed
import '../styles/pages.scss';
import { useSearch } from '../context/SearchContext';
import { Title } from 'react-head';
import CodeBlock from '../components/CodeBlock';

const Teaching: React.FC = () => {
  const { searchTerm } = useSearch();
  const latexCode = `
\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{geometry}
\\usepackage{graphicx}

\\begin{document}

\\section*{Current Courses}
\\subsection*{Statistical Learning}
This course provides an introduction to the theory and application of statistical learning methods.
\\begin{itemize}
  \\item Linear Regression
  \\item Classification
  \\item Resampling Methods
  \\item Tree-Based Methods
\\end{itemize}

\\section*{Past Courses}
Information about past courses will be available here soon.

\\end{document}
`;

  const matchesSearch = searchTerm === '' || latexCode.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <div className="page-content">
      <Title>Teaching | Prof. Karim AI</Title>
      {matchesSearch ? (
        <CodeBlock code={latexCode} language="latex" />
      ) : (
        <p>No matching content found on this page.</p>
      )}
    </div>
  );
};

export default Teaching;
