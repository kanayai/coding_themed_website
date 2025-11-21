import React from 'react';
import CodeBlock from '../components/CodeBlock';
import { useTab } from '../context/TabContext';
import { Title } from 'react-head';
import pastCoursesLatex from '../data/past_courses.tex?raw'; // Import raw LaTeX content

const PastCoursesPage: React.FC = () => {
  const { addTab } = useTab();

  return (
    <div className="page-content">
      <Title>Past Courses | Prof. Karim AI</Title>
      <h1>Past Courses</h1>
      <CodeBlock code={pastCoursesLatex} language="latex" />
      <p>This page details the courses I have taught in the past.</p>
    </div>
  );
};

export default PastCoursesPage;