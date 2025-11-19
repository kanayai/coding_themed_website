import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer-vscode mt-auto py-2">
      <Container fluid className="d-flex justify-content-between align-items-center">
        <div className="status-left">
          <span className="status-item">master*</span>
          <span className="status-item">UTF-8</span>
          <span className="status-item">CRLF</span>
          <span className="status-item">TypeScript React</span>
        </div>
        <div className="status-right">
          <a href="https://researchportal.bath.ac.uk/en/persons/karim-anaya-izquierdo/" target="_blank" rel="noopener noreferrer" className="status-item social-link">
            UoB Profile
          </a>
          <a href="https://github.com/kanayai" target="_blank" rel="noopener noreferrer" className="status-item social-link">
            <FaGithub /> GitHub
          </a>
          <a href="https://orcid.org/0000-0001-9718-5256" target="_blank" rel="noopener noreferrer" className="status-item social-link">
            ORCID
          </a>
          <a href="www.linkedin.com/in/karim-anaya-izquierdo-b596bb2" target="_blank" rel="noopener noreferrer" className="status-item social-link">
            <FaLinkedin /> LinkedIn
          </a>
          <a href="https://scholar.google.com/citations?user=SrcprVQAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="status-item social-link">
            Google Scholar
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
