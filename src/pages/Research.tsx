import React from 'react';
import { useSearch } from '../context/SearchContext';
import { Head, Title } from 'react-head';
import CodeBlock from '../components/CodeBlock';
import { Container } from 'react-bootstrap';

const Research: React.FC = () => {
  const { searchTerm } = useSearch();

  const researchProjectsContent = "Information about research projects will be added here soon.";
  const matchesResearchProjects = searchTerm === '' || researchProjectsContent.toLowerCase().includes(searchTerm.toLowerCase());
  const rCodeBlock = `library("tidyverse")
library("readr")
publications_df <- read_csv("data/publications.csv")
publications_df %>%
  arrange(desc(year)) %>%
  head(20) %>%
  as_tibble()
`;
  const matchesCodeBlock = searchTerm === '' || rCodeBlock.toLowerCase().includes(searchTerm.toLowerCase());


  return (
    <div className="page-content">
      <Title>Research | Prof. Karim AI</Title>
      {matchesCodeBlock && (
        <CodeBlock code={rCodeBlock} language="r" />
      )}

      {matchesResearchProjects && (
        <>
          <h2 className="mt-5">Research Projects</h2>
          <p>{researchProjectsContent}</p>
        </>
      )}

      {(!matchesCodeBlock && !matchesResearchProjects) && (
        <p>No matching content found on this page.</p>
      )}
    </div>
  );
};

export default Research;