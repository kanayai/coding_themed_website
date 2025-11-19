import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import '../styles/pages.scss';
import publicationsData from '../../data/publications.json';
import { useSearch } from '../context/SearchContext';
import { Helmet } from 'react-helmet-async';
import CodeBlock from '../components/CodeBlock';

interface Publication {
  date: string;
  authors: string;
  year: string;
  title: string;
  journal: string;
  link: string;
}

const Research: React.FC = () => {
  const { searchTerm } = useSearch();
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    setPublications(publicationsData);
  }, []);

  const filteredPublications = publications.filter(pub =>
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.journal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const researchProjectsContent = "Information about research projects will be added here soon.";
  const matchesResearchProjects = searchTerm === '' || researchProjectsContent.toLowerCase().includes(searchTerm.toLowerCase());
  const rCodeBlock = `
# Load necessary libraries
library("tidyverse")
library("jsonlite")

# Load publications data
publications_df <- fromJSON("data/publications.json")

# Display recent publications
publications_df %>%
  arrange(desc(year)) %>%
  head(5)
`;
  const matchesCodeBlock = searchTerm === '' || rCodeBlock.toLowerCase().includes(searchTerm.toLowerCase());


  return (
    <Container className="page-content">
      <Helmet>
        <title>Research | Prof. Karim AI</title>
      </Helmet>
      {matchesCodeBlock && (
        <CodeBlock code={rCodeBlock} language="r" />
      )}

      {(filteredPublications.length > 0 || searchTerm === '') && (
        <>
          <h2 className="mt-4">Publications</h2>
          {filteredPublications.map((pub, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>{pub.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{pub.authors} ({pub.year})</Card.Subtitle>
                <Card.Text>{pub.journal}</Card.Text>
                <Card.Link href={pub.link} target="_blank" rel="noopener noreferrer">View Publication</Card.Link>
              </Card.Body>
            </Card>
          ))}
        </>
      )}

      {matchesResearchProjects && (
        <>
          <h2 className="mt-5">Research Projects</h2>
          <p>{researchProjectsContent}</p>
        </>
      )}

      {(!matchesCodeBlock && filteredPublications.length === 0 && !matchesResearchProjects) && (
        <p>No matching content found on this page.</p>
      )}
    </Container>
  );
};

export default Research;