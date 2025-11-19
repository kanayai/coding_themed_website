import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/pages.scss';
import { useSearch } from '../context/SearchContext';
import { Helmet } from 'react-helmet-async';
import CodeBlock from '../components/CodeBlock';

const Home: React.FC = () => {
  const { searchTerm } = useSearch();
  const pythonCode = `
# Welcome to my academic website
"""
This website is a showcase of my academic work, including research, teaching, and blog posts.
It is designed to look and feel like a code editor.
Enjoy your stay!
"""

def hello_world():
    return "Hello, welcome to my digital space!"

message = hello_world()
print(message)
`;

  const matchesSearch = searchTerm === '' || pythonCode.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <Container className="page-content">
      <Helmet>
        <title>Home | Prof. Karim AI</title>
      </Helmet>
      {matchesSearch ? (
        <CodeBlock code={pythonCode} language="python" />
      ) : (
        <p>No matching content found on this page.</p>
      )}
    </Container>
  );
};

export default Home;
