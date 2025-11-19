import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { BsArrowUp } from 'react-icons/bs';
import './BackToTopButton.scss';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to "top"
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top scroll behavior
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="back-to-top">
      {isVisible && (
        <Button onClick={scrollToTop} className="btn-code scroll-btn">
          <BsArrowUp />
        </Button>
      )}
    </div>
  );
};

export default BackToTopButton;
