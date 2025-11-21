import React from 'react';
// import { Container } from 'react-bootstrap'; // No longer needed
import '../styles/pages.scss';
import { useSearch } from '../context/SearchContext';
import { Title } from 'react-head';
import CodeBlock from '../components/CodeBlock';

const About: React.FC = () => {
  const { searchTerm } = useSearch();
  const pythonCode = `import os
import sys
import numpy as np
import pandas as pd

# ,_, 
# {o,o}
# /)  )
# -"-"-

def get_profile_data():
    """
    Retrieves academic and contact information for Prof. Karim AI.

    Returns:
        dict: A dictionary containing personal and academic details.
    """
    profile = {
        "name": "Prof. Karim AI (Anaya-Izquierdo)",
        "department": "Mathematical Sciences",
        "university": "University of Bath, United Kingdom",
        "email": "kai21@bath.ac.uk",
        "office": "4West 4.13",
        "address": "Claverton Down, BA2 7AY, Bath, United Kingdom",
        "socials": {
            "github": "https://github.com/kanayai",
            "orcid": "https://orcid.org/0000-0001-9718-5256",
            "linkedin": "www.linkedin.com/in/karim-anaya-izquierdo-b596bb2",
            "google_scholar": "https://scholar.google.com/citations?user=SrcprVQAAAAJ&hl=en"
        }
    }
    return profile

class AcademicBiography:
    """
    This class provides a comprehensive overview of Prof. Karim AI's
    academic background, research interests, and professional affiliations.
    """
    def __init__(self):
        self.background = """
        Prof. Karim AI is a distinguished academic in the Department of Mathematical Sciences
        at the University of Bath. His research spans various areas of statistical methodology
        and its applications, with a particular focus on advanced computational techniques
        and their practical implementation.
        """
        self.research_interests = [
            "Computational Statistics",
            "Information Geometry",
            "Bayesian Inference",
            "Machine Learning in Scientific Discovery",
            "Statistical Modelling of Complex Systems"
        ]
        self.affiliations = [
            "University of Bath, Department of Mathematical Sciences",
            "Fellow of the Royal Statistical Society"
        ]

    def display_info(self):
        print(f"Name: {get_profile_data()['name']}")
        print("--- Biography ---")
        print(self.background)
        print("--- Research Interests ---")
        for interest in self.research_interests:
            print(f"- {interest}")
        print("--- Affiliations ---")
        for affiliation in self.affiliations:
            print(f"- {affiliation}")

if __name__ == "__main__":
    profile_data = get_profile_data()
    bio = AcademicBiography()
    bio.display_info()
    print("\n--- Contact ---")
    print(f"Email: {profile_data['email']}")
    print(f"Office: {profile_data['office']}")
    print(f"Address: {profile_data['address']}")
    print("\n--- Socials ---")
    for platform, link in profile_data['socials'].items():
        print(f"{platform.replace('_', ' ').title()}: {link}")
`;

  const matchesSearch = searchTerm === '' || pythonCode.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <div className="page-content">
      <Title>About | Prof. Karim AI</Title>
      {matchesSearch ? (
        <CodeBlock code={pythonCode} language="python" />
      ) : (
        <p>No matching content found on this page.</p>
      )}
    </div>
  );
};

export default About;