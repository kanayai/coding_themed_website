import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
// import About from './pages/About';
// import Blog from './pages/Blog';
// import Research from './pages/Research';
// import Teaching from './pages/Teaching';
// import Contact from './pages/Contact';
import { SearchProvider } from './context/SearchContext';
import { ThemeProvider } from './context/ThemeContext';
import BackToTopButton from './components/BackToTopButton';
import ActivityBar from './components/ActivityBar'; // Uncommented
// import PrimarySideBar from './components/PrimarySideBar';
// import TopTabsBar from './components/TopTabsBar';
// import CommandPalette from './components/CommandPalette';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <SearchProvider>
          {/* New VSCode-like Layout */}
          {/* <CommandPalette /> */}
          <div style={{ display: 'flex', minHeight: '100vh', paddingTop: '30px', paddingBottom: '50px' }}> {/* Keep paddingTop to allow for future CommandPalette */}
            <ActivityBar /> {/* Uncommented */}
            {/* <PrimarySideBar /> */}
            <div style={{ marginLeft: '0px', flexGrow: 1, position: 'relative' }}> {/* Removed left margin */}
              {/* <TopTabsBar /> */}
              <div className="main-content" style={{ paddingTop: '0px' }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  {/* <Route path="/about" element={<About />} /> */}
                  {/* <Route path="/blog" element={<Blog />} /> */}
                  {/* <Route path="/research" element={<Research />} /> */}
                  {/* <Route path="/teaching" element={<Teaching />} /> */}
                  {/* <Route path="/contact" element={<Contact />} /> */}
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
