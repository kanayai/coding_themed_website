import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Research from './pages/Research';
import Teaching from './pages/Teaching';
import Contact from './pages/Contact';
import { SearchProvider } from './context/SearchContext';
import { ThemeProvider } from './context/ThemeContext';
import BackToTopButton from './components/BackToTopButton';
import ActivityBar from './components/ActivityBar';
import PrimarySideBar from './components/PrimarySideBar';
import TopTabsBar from './components/TopTabsBar';
import CommandPalette from './components/CommandPalette';

import './App.scss'; // Import App styles

import BlogPostPage from './pages/BlogPostPage'; // Import BlogPostPage

function App() {
  return (
    <Router>
      <ThemeProvider>
        <SearchProvider>
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
                  <Route path="/blog/:postId" element={<BlogPostPage />} /> {/* New route for individual posts */}
                  <Route path="/research" element={<Research />} />
                  <Route path="/teaching" element={<Teaching />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </div>
            </div>
          </div>
          <Footer />
          <BackToTopButton />
        </SearchProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
