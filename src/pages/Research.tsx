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
  as_tibble() # Format as a Tibble
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
            <div className="tibble-grid">
              {/* Headers */}
              <div className="tibble-header">date</div>
              <div className="tibble-header">authors/title/journal</div>
              <div className="tibble-header">year</div>

              {/* Data Rows */}
              {currentPublications.map((pub, index) => (
                <React.Fragment key={index}>
                  <div className="tibble-cell tibble-cell-date">{pub.date}</div>
                  <div className="tibble-cell tibble-cell-details">
                    <p className="tibble-cell-authors">{pub.authors}</p>
                    <p className="tibble-cell-title"><strong>{pub.title}</strong></p>
                    <p className="tibble-cell-journal"><em>{pub.journal}</em></p>
                    <a href={pub.link} target="_blank" rel="noopener noreferrer">View Publication</a>
                  </div>
                  <div className="tibble-cell tibble-cell-year">{pub.year}</div>
                </React.Fragment>
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
    </Container>
  );
};

export default Research;