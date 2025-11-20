import React, { useState, useEffect, useMemo } from 'react';
// import { Container, Card } from 'react-bootstrap'; // No longer needed
import '../styles/pages.scss';
import Papa from 'papaparse';
import publicationsCsv from '../../data/publications.csv?raw';
import { useSearch } from '../context/SearchContext';
import { Head, Title } from 'react-head';
import CodeBlock from '../components/CodeBlock';

interface Publication {
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
  as_tibble()
`;
  const matchesCodeBlock = searchTerm === '' || rCodeBlock.toLowerCase().includes(searchTerm.toLowerCase());


  return (
    <div className="page-content">
      <Title>Research | Prof. Karim AI</Title>
      {matchesCodeBlock && (
        <CodeBlock code={rCodeBlock} language="r" />
      )}

      {(filteredPublications.length > 0 || searchTerm === '') && (
        <>
          <h2 className="mt-4">Publications</h2>
          <div className="code-block" style={{ overflowX: 'auto' }}>
            <p className="comment">{`# A tibble: ${filteredPublications.length} x 5`}</p>
            <div className="tibble-grid-fixed">
              {/* Headers */}
              <div className="tibble-header">year</div>
              <div className="tibble-header">authors</div>
              <div className="tibble-header">title</div>
              <div className="tibble-header">journal</div>
              <div className="tibble-header">link</div>

              {/* Data Rows */}
              {currentPublications.map((pub, index) => (
                <a href={pub.link} target="_blank" rel="noopener noreferrer" className="tibble-row-link" key={index}>
                  <div className="tibble-cell">{pub.year}</div>
                  <div className="tibble-cell">{pub.authors}</div>
                  <div className="tibble-cell">{pub.title}</div>
                  <div className="tibble-cell">{pub.journal}</div>
                  <div className="tibble-cell">{pub.link}</div>
                </a>
              ))}
            </div>
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
    </div>
  );
};