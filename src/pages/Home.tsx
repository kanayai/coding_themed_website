import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/pages.scss';
import { useSearch } from '../context/SearchContext';
import { Title } from 'react-head'; // Import Title from react-head
import CodeBlock from '../components/CodeBlock';

const Home: React.FC = () => {
  const { searchTerm } = useSearch();
  const pythonCode = `import os
import sys

# Welcome to Prof. Karim AI's Academic Website
# Explore my research, teaching, and blog.
# This website is built to mimic a VSCode environment.

def get_welcome_message():
    """
    Returns a personalized welcome message.
    """
    return "Hello, welcome to my digital space!"

if __name__ == "__main__":
    message = get_welcome_message()
    print(message)
`;

  const matchesSearch = searchTerm === '' || pythonCode.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <Container className="page-content">
      <Title>Home | Prof. Karim AI</Title>
      {matchesSearch ? (
        <CodeBlock code={pythonCode} language="python" />
      ) : (
        <p>No matching content found on this page.</p>
      )}
    </Container>
  );
};

export default Home;
