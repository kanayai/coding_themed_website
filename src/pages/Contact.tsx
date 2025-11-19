import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/pages.scss';
import { useSearch } from '../context/SearchContext';
import { Helmet } from 'react-helmet-async';
import CodeBlock from '../components/CodeBlock';

const Contact: React.FC = () => {
  const { searchTerm } = useSearch();
  const pythonCode = `
# Get in touch

contact_details = {
    "name": "Prof. Karim AI (Anaya-Izquierdo)",
    "email": "kai21@bath.ac.uk",
    "office": "4West 4.13",
    "address": "Claverton Down, BA2 7AY, Bath, United Kingdom"
}

for key, value in contact_details.items():
    print(f"{key}: {value}")
`;

  const matchesSearch = searchTerm === '' || pythonCode.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <Container className="page-content">
      <Helmet>
        <title>Contact | Prof. Karim AI</title>
      </Helmet>
      {matchesSearch ? (
        <CodeBlock code={pythonCode} language="python" />
      ) : (
        <p>No matching content found on this page.</p>
      )}
    </Container>
  );
};

export default Contact;
