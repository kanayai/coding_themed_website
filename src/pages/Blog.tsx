import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import '../styles/pages.scss';
import anscombeQuartetContent from '../../_quarto_source/anscombe_quartet.qmd?raw'; // Import as raw string
import { useSearch } from '../context/SearchContext';
import { Helmet } from 'react-helmet-async';
import CodeBlock from '../components/CodeBlock';

const Blog: React.FC = () => {
  const { searchTerm } = useSearch();
  const [qmdContent, setQmdContent] = useState('');

  useEffect(() => {
    // For now, we just set the raw content. In a real scenario, this would be parsed/rendered.
    setQmdContent(anscombeQuartetContent);
  }, []);

  const matchesAnscombeQuartet = searchTerm === '' || qmdContent.toLowerCase().includes(searchTerm.toLowerCase());
  const moreArticlesContent = "More Articles Coming Soon!";
  const matchesMoreArticles = searchTerm === '' || moreArticlesContent.toLowerCase().includes(searchTerm.toLowerCase());


  return (
    <Container className="page-content">
      <Helmet>
        <title>Blog | Prof. Karim AI</title>
      </Helmet>
      <h1>Blog</h1>
      <p>Here are some of my articles and tutorials.</p>

      {matchesAnscombeQuartet && (
        <>
          <h2 className="mt-4">Anscombe's quartet (.qmd)</h2>
          <CodeBlock code={qmdContent} language="qmd" />
        </>
      )}

      {matchesMoreArticles && (
        <h2 className="mt-5">{moreArticlesContent}</h2>
      )}

      {(!matchesAnscombeQuartet && !matchesMoreArticles) && (
        <p>No matching content found on this page.</p>
      )}
    </Container>
  );
};

export default Blog;