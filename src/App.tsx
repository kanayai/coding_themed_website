import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Research from './pages/Research';
import Teaching from './pages/Teaching';
import Contact from './pages/Contact';

import BackToTopButton from './components/BackToTopButton';
import ActivityBar from './components/ActivityBar';
import PrimarySideBar from './components/PrimarySideBar';
import TopTabsBar from './components/TopTabsBar';
import CommandPalette from './components/CommandPalette';

import './App.scss'; // Import App styles

import ResearchProjectsPage from './pages/ResearchProjectsPage'; // Import ResearchProjectsPage
import PublicationsPage from './pages/PublicationsPage'; // Import PublicationsPage
import BlogPostPage from './pages/BlogPostPage'; // Import BlogPostPage

function App() {
  return (
    <>
      {/* New VSCode-like Layout */}
      <CommandPalette />
      <div className="main-layout">
        <ActivityBar />
        <PrimarySideBar />
        <div className="main-content-container">
          <TopTabsBar />
          <div className="main-content-inner">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:postId" element={<BlogPostPage />} />
              <Route path="/research" element={<Research />} />
              <Route path="/research/projects" element={<ResearchProjectsPage />} />
              <Route path="/research/publications" element={<PublicationsPage />} />
              <Route path="/teaching" element={<Teaching />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
      <BackToTopButton />
    </>
  );
}

export default App;
