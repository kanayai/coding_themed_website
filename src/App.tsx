import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
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

function App() {
  return (
    <Router>
      <ThemeProvider>
        <SearchProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/research" element={<Research />} />
            <Route path="/teaching" element={<Teaching />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
          <BackToTopButton />
        </SearchProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
