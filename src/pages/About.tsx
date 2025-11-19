import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/pages.scss';
import { useSearch } from '../context/SearchContext';
import { Helmet } from 'react-helmet-async';
import CodeBlock from '../components/CodeBlock';

const About: React.FC = () => {
  const { searchTerm } = useSearch();
  const yamlCode = `
title: "About Me"
author:
  - name: "Prof. Karim AI (Anaya-Izquierdo)"
    title: "Professor"
    department: "Mathematical Sciences"
    university: "University of Bath"
    country: "United Kingdom"
contact:
  - email: "kai21@bath.ac.uk"
  - office: "4West 4.13"
  - address: "Claverton Down, BA2 7AY, Bath, United Kingdom"
socials:
  - github: "https://github.com/kanayai"
  - orcid: "https://orcid.org/0000-0001-9718-5256"
  - linkedin: "www.linkedin.com/in/karim-anaya-izquierdo-b596bb2"
  - google-scholar: "https://scholar.google.com/citations?user=SrcprVQAAAAJ&hl=en"
`;

  const matchesSearch = searchTerm === '' || yamlCode.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <Container className="page-content">
      <Helmet>
        <title>About | Prof. Karim AI</title>
      </Helmet>
      {matchesSearch ? (
        <CodeBlock code={yamlCode} language="yaml" />
      ) : (
        <p>No matching content found on this page.</p>
      )}
    </Container>
  );
};
export default About;
