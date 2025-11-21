import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import { HeadProvider } from 'react-head';
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider
import { SearchProvider } from './context/SearchContext'; // Import SearchProvider
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HeadProvider>
        <ThemeProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </ThemeProvider>
      </HeadProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
