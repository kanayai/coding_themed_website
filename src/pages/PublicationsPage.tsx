import React, { useState, useEffect } from 'react';
import { Title } from 'react-head';
import Papa from 'papaparse';
import publicationsCsv from '../../data/publications.csv?raw';
import { useSearch } from '../context/SearchContext';
import CodeBlock from '../components/CodeBlock';
import { Container } from 'react-bootstrap';

interface Publication {
  authors: string;
  year: string;
  title: string;
  journal: string;
  link: string;
}

const PublicationsPage: React.FC = () => {
  const { searchTerm } = useSearch();
  const [allPublications, setAllPublications] = useState<Publication[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const publicationsPerPage = 20;

  const rCodeBlock = `library("tidyverse")
library("readr")
publications_df <- read_csv("data/publications.csv")
publications_df %>%
  arrange(desc(year)) %>%
  head(20) %>%
  as_tibble()
`;
  const matchesCodeBlock = searchTerm === '' || rCodeBlock.toLowerCase().includes(searchTerm.toLowerCase());

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

  return (
    <div className="page-content">
      <Title>Publications | Prof. Karim AI</Title>
      <h1>Publications</h1>

      {matchesCodeBlock && (
        <CodeBlock code={rCodeBlock} language="r" />
      )}
      
      {(filteredPublications.length > 0 || searchTerm === '') && (
        <>
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
    </div>
  );
};

export default PublicationsPage;
