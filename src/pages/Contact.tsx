import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/pages.scss';
import { useSearch } from '../context/SearchContext';
import { Title } from 'react-head'; // Import Title from react-head
import CodeBlock from '../components/CodeBlock';

const Contact: React.FC = () => {
  const { searchTerm } = useSearch();
  const yamlCode = `---
name: "Prof. Karim AI (Anaya-Izquierdo)"
email: "mailto:kai21@bath.ac.uk"
office: "4West 4.13"
address: "Claverton Down, BA2 7AY, Bath, United Kingdom"
socials:
  - platform: "University of Bath Profile"
    link: "https://researchportal.bath.ac.uk/en/persons/karim-anaya-izquierdo/"
  - platform: "GitHub"
    link: "https://github.com/kanayai"
  - platform: "Orcid"
    link: "https://orcid.org/0000-0001-9718-5256"
  - platform: "LinkedIn"
    link: "www.linkedin.com/in/karim-anaya-izquierdo-b596bb2"
  - platform: "Google Scholar"
    link: "https://scholar.google.com/citations?user=SrcprVQAAAAJ&hl=en"
---
`;

  const matchesSearch = searchTerm === '' || yamlCode.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <Container className="page-content">
      <Title>Contact | Prof. Karim AI</Title>
      {matchesSearch ? (
        <CodeBlock code={yamlCode} language="yaml" />
      ) : (
        <p>No matching content found on this page.</p>
      )}
    </Container>
  );
};

export default Contact;
