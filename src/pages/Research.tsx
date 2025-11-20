import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import '../styles/pages.scss';
import Papa from 'papaparse'; // Import papaparse
import publicationsCsv from '../../data/publications.csv?raw'; // Re-add CSV import
import { useSearch } from '../context/SearchContext';
import { Head, Title } from 'react-head';
import CodeBlock from '../components/CodeBlock';

interface Publication {
  date: string;
  authors: string;
  year: string;
  title: string;
  journal: string;
  link: string;
}

import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo
import { Container, Card } from 'react-bootstrap';
import '../styles/pages.scss';
import Papa from 'papaparse'; // Import papaparse
import publicationsCsv from '../../data/publications.csv?raw'; // Re-add CSV import
import { useSearch } from '../context/SearchContext';
import { Head, Title } from 'react-head';
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
  const [allPublications, setAllPublications] = useState<Publication[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const publicationsPerPage = 20;

  useEffect(() => {
    Papa.parse(publicationsCsv, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setAllPublications(results.data as Publication[]);
      },
    });
  }, []);

  const filteredPublications = allPublications.filter(pub =>
    (pub.title && pub.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (pub.authors && pub.authors.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (pub.journal && pub.journal.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate dynamic column widths
  const columnWidths = useMemo(() => {
    const maxWidths = {
      date: 'date'.length,
      authors: 'authors'.length,
      year: 'year'.length,
      title: 'title'.length,
      journal: 'journal'.length,
      link: 'link'.length,
    };

    filteredPublications.forEach(pub => {
      maxWidths.date = Math.max(maxWidths.date, pub.date.length);
      maxWidths.authors = Math.max(maxWidths.authors, pub.authors.length);
      maxWidths.year = Math.max(maxWidths.year, pub.year.length);
      maxWidths.title = Math.max(maxWidths.title, pub.title.length);
      maxWidths.journal = Math.max(maxWidths.journal, pub.journal.length);
      maxWidths.link = Math.max(maxWidths.link, pub.link.length);
    });
    return maxWidths;
  }, [filteredPublications]);

  // Pagination Logic
  const indexOfLastPublication = currentPage * publicationsPerPage;
  const indexOfFirstPublication = indexOfLastPublication - publicationsPerPage;
  const currentPublications = filteredPublications.slice(indexOfFirstPublication, indexOfLastPublication);
  const totalPages = Math.ceil(filteredPublications.length / publicationsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const researchProjectsContent = "Information about research projects will be added here soon.";
  const matchesResearchProjects = searchTerm === '' || researchProjectsContent.toLowerCase().includes(searchTerm.toLowerCase());
  const rCodeBlock = `
# Load necessary libraries
library("tidyverse")
library("readr") # For read_csv

# Load publications data from CSV
publications_df <- read_csv("data/publications.csv")

# Display recent publications (first 20 entries)
publications_df %>%
  arrange(desc(year)) %>%
  head(20) %>%
  as_tibble() # Format as a Tibble, with dynamic column widths
`;
  const matchesCodeBlock = searchTerm === '' || rCodeBlock.toLowerCase().includes(searchTerm.toLowerCase());


  return (
    <Container className="page-content">
      <Title>Research | Prof. Karim AI</Title>
      {matchesCodeBlock && (
        <CodeBlock code={rCodeBlock} language="r" />
      )}

      {(filteredPublications.length > 0 || searchTerm === '') && (
        <>
          <h2 className="mt-4">Publications (Tibble-like)</h2>
          <div className="tibble-table code-block">
            <pre>
              <code>
                {`# A tibble: ${filteredPublications.length} x 6`}
                {`
${'date'.padEnd(columnWidths.date)} ${'authors'.padEnd(columnWidths.authors)} ${'year'.padEnd(columnWidths.year)} ${'title'.padEnd(columnWidths.title)} ${'journal'.padEnd(columnWidths.journal)} ${'link'.padEnd(columnWidths.link)}`}
                {`
${'-'.repeat(columnWidths.date)} ${'-'.repeat(columnWidths.authors)} ${'-'.repeat(columnWidths.year)} ${'-'.repeat(columnWidths.title)} ${'-'.repeat(columnWidths.journal)} ${'-'.repeat(columnWidths.link)}`}
                {currentPublications.map(pub =>
                  `
${pub.date.padEnd(columnWidths.date)} ${pub.authors.padEnd(columnWidths.authors)} ${pub.year.padEnd(columnWidths.year)} ${pub.title.padEnd(columnWidths.title)} ${pub.journal.padEnd(columnWidths.journal)} ${pub.link.padEnd(columnWidths.link)}`
                ).join('')}
              </code>
            </pre>
          </div>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-center mt-3">
            <ul className="pagination">
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button onClick={() => paginate(index + 1)} className="page-link btn-code">
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
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