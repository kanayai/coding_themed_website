import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap'; // No longer needed
import { Row, Col, Card } from 'react-bootstrap';
import '../styles/pages.scss';
import anscombeQuartetContent from '../../_quarto_source/anscombe_quartet.qmd?raw'; // Import as raw string
import { useSearch } from '../context/SearchContext';
import { Head, Title } from 'react-head';
import CodeBlock from '../components/CodeBlock';

interface BlogPost {
  title: string;
  date: string;
  description: string;
  path: string;
  language: string;
}

const qmdHeaderRegex = /---\s*([\s\S]*?)\s*---/; // Define the regex here

// Function to parse YAML header from QMD content
const parseQmdHeader = (qmdContent: string) => {
  const match = qmdHeaderRegex.exec(qmdContent);
  if (match && match[1]) {
    const yamlString = match[1];
    const lines = yamlString.split('\\n');
    const header: { [key: string]: string } = {};
    lines.forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join(':').trim().replace(/^"|"$/g, '');
        header[key] = value;
      }
    });
    return header;
  }
  return {};
};

// Function to extract first paragraph as description
const extractDescription = (qmdContent: string) => {
  const contentAfterYaml = qmdContent.replace(/---\s*[\s\S]*?\s*---/, '').trim();
  const firstParagraphMatch = contentAfterYaml.match(/^(.*?)\\n\\n/s);
  return firstParagraphMatch ? firstParagraphMatch[1].replace(/\\n/g, ' ') : contentAfterYaml.substring(0, 150) + '...';
};

const Blog: React.FC = () => {
  const { searchTerm } = useSearch();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const simulatedQmdContent = anscombeQuartetContent; // Use the imported raw content
  const anscombeHeader = parseQmdHeader(simulatedQmdContent);
  const anscombeDescription = extractDescription(simulatedQmdContent);

  useEffect(() => {
    // Simulate fetching blog posts
    const posts: BlogPost[] = [
      {
        title: anscombeHeader.title || "Anscombe's Quartet",
        date: anscombeHeader.date || "Unknown Date",
        description: anscombeDescription,
        path: '/blog/anscombe-quartet', // Example path for detail page
        language: 'qmd',
      },
      // Add more simulated blog posts here
      {
        title: "Introduction to Statistical Modeling",
        date: "October 26, 2024",
        description: "A comprehensive guide to fundamental statistical modeling techniques and their applications in data science.",
        path: '/blog/statistical-modeling',
        language: 'qmd',
      },
      {
        title: "Advanced React Hooks for Performance",
        date: "November 10, 2024",
        description: "Exploring advanced React hooks like useMemo, useCallback, and custom hooks to optimize component performance.",
        path: '/blog/react-hooks',
        language: 'qmd',
      },
    ];
    setBlogPosts(posts);
  }, []);

  const filteredBlogPosts = blogPosts.filter(post =>
    searchTerm === '' ||
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const blogYamlHeader = `---
title: "My Academic Blog"
author: "Prof. Karim AI"
date: "2025-11-19"
categories: [ "Research", "Teaching", "Python", "R", "LaTeX", "YAML" ]
format: html
---
`;

  return (
    <div className="page-content">
      <Title>Blog | Prof. Karim AI</Title>
      <h1>Blog Posts</h1>

      <CodeBlock code={blogYamlHeader} language="yaml" />

      <Row xs={1} md={2} lg={3} className="g-4 mt-4">
        {filteredBlogPosts.length > 0 ? (
          filteredBlogPosts.map((post, idx) => (
            <Col key={idx}>
              <Card className="h-100 code-block blog-card">
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{post.date}</Card.Subtitle>
                  <Card.Text>{post.description}</Card.Text>
                  <Card.Link href={post.path} className="btn-code">Read Post</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col><p>No matching blog posts found.</p></Col>
        )}
      </Row>
    </div>
  );
};

export default Blog;