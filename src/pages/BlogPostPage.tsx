import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Title } from 'react-head';
import CodeBlock from '../components/CodeBlock';

// Helper functions for parsing QMD content - copied from Blog.tsx
const qmdHeaderRegex = /---\s*([\s\S]*?)\s*---/;

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

const extractContent = (qmdContent: string) => {
  return qmdContent.replace(/---\s*[\s\S]*?\s*---/, '').trim();
};

const BlogPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [postContent, setPostContent] = useState('');
  const [postTitle, setPostTitle] = useState('Loading...');
  const [postDate, setPostDate] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;

      try {
        const modules = import.meta.glob('../../_quarto_source/*.qmd', { query: '?raw', import: 'default' });
        const filePath = `../../_quarto_source/${postId}.qmd`;

        if (modules[filePath]) {
          const rawContent = await modules[filePath]();
          const header = parseQmdHeader(rawContent);
          const content = extractContent(rawContent);

          setPostTitle(header.title || 'Untitled Post');
          setPostDate(header.date || 'Unknown Date');
          setPostContent(content);
        } else {
          setPostTitle('Post Not Found');
          setPostContent('The requested blog post could not be found.');
        }
      } catch (error) {
        console.error('Failed to load blog post:', error);
        setPostTitle('Error');
        setPostContent('Failed to load blog post content.');
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <div className="page-content">
      <Title>{`Blog Post: ${postTitle}`}</Title>
      <h1>{postTitle}</h1>
      <p className="text-muted">{postDate}</p>
      {postContent && <CodeBlock code={postContent} language="qmd" />}
    </div>
  );
};

export default BlogPostPage;
