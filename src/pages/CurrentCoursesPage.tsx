import React from 'react';
import { Title } from 'react-head';
import currentCoursesLatex from '../data/current_courses.tex?raw'; // Import raw LaTeX content
import CodeBlock from '../components/CodeBlock'; // Still need CodeBlock for Python example

const CurrentCoursesPage: React.FC = () => {
  const jupyterPythonCode = `import pandas as pd
import numpy as np

# Load course data (dummy example)
current_courses_data = {
    'Course': ['Statistical Learning', 'Advanced Regression'],
    'ECTS': [10, 10],
    'Level': ['Master', 'Master'],
    'Year': [2025, 2025]
}
df_courses = pd.DataFrame(current_courses_data)

print(df_courses)
`;

  return (
    <div className="page-content jupyter-notebook-like">
      <Title>Current Courses | Prof. Karim AI</Title>
      <h1>Current Courses</h1>

      {/* Jupyter Markdown Cell for LaTeX content */}
      <div className="jupyter-cell jupyter-markdown">
        <div className="cell-input-prompt">In []</div>
        <div className="cell-content">
          {/* Render LaTeX content as pre-formatted text */}
          <pre>{currentCoursesLatex}</pre>
        </div>
      </div>

      {/* Jupyter Code Cell */}
      <div className="jupyter-cell jupyter-code">
        <div className="cell-input-prompt">In [1]</div>
        <div className="cell-content">
          <CodeBlock code={jupyterPythonCode} language="python" />
        </div>
      </div>

      {/* Jupyter Output Cell */}
      <div className="jupyter-cell jupyter-output">
        <div className="cell-output-prompt">Out[1]</div>
        <div className="cell-content">
          <pre>                 Course  ECTS   Level  Year
0  Statistical Learning    10  Master  2025
1   Advanced Regression    10  Master  2025</pre>
        </div>
      </div>

      <p>This page details the courses I am currently teaching.</p>
    </div>
  );
};

export default CurrentCoursesPage;