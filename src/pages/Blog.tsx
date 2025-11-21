import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import '../styles/pages.scss';
import { useSearch } from '../context/SearchContext';
import { Title } from 'react-head';
import CodeBlock from '../components/CodeBlock';

interface BlogPost {
  title: string;
  date: string;
  description: string;
  path: string;
  language: string;
}

const qmdHeaderRegex = /---\s*([\s\S]*?)\s*---/;

const parseQmdHeader = (qmdContent: string) => {
  const match = qmdHeaderRegex.exec(qmdContent);
  if (match && match[1]) {
    const yamlString = match[1];
    const lines = yamlString.split('\n');
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

const extractDescription = (qmdContent: string) => {
  const contentAfterYaml = qmdContent.replace(/---\s*[\s\S]*?\s*---/, '').trim();
  const firstParagraphMatch = contentAfterYaml.match(/^(.*?)\n\n/s);
  return firstParagraphMatch ? firstParagraphMatch[1].replace(/\n/g, ' ') : contentAfterYaml.substring(0, 150) + '...';
};

const Blog: React.FC = () => {
  const { searchTerm } = useSearch();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postModules = import.meta.glob('../../_quarto_source/*.qmd', { query: '?raw', import: 'default' });
      const posts: BlogPost[] = [];

      for (const path in postModules) {
        const qmdContent = await postModules[path]();
        const header = parseQmdHeader(qmdContent);
        const description = extractDescription(qmdContent);
        const slug = path.split('/').pop()?.replace('.qmd', '');
        
        if (slug) {
          posts.push({
            title: header.title || 'Untitled Post',
            date: header.date || 'Unknown Date',
            description,
            path: `/blog/${slug}`,
            language: 'qmd',
          });
        }
      }
      setBlogPosts(posts);
    };

    fetchPosts();
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