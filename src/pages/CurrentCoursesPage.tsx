import React from 'react';
import CodeBlock from '../components/CodeBlock';
import { useTab } from '../context/TabContext';
import { Title } from 'react-head';
import currentCoursesLatex from '../data/current_courses.tex?raw'; // Import raw LaTeX content

const CurrentCoursesPage: React.FC = () => {
  const { addTab } = useTab();

  return (
    <div className="page-content">
      <Title>Current Courses | Prof. Karim AI</Title>
      <h1>Current Courses</h1>
      <CodeBlock code={currentCoursesLatex} language="latex" />
      <p>This page details the courses I am currently teaching.</p>
    </div>
  );
};

export default CurrentCoursesPage;