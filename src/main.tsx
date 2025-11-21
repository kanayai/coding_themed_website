import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import { HeadProvider } from 'react-head'; // Import HeadProvider
import { TabProvider } from './context/TabContext';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap with BrowserRouter */}
      <HeadProvider>
        <TabProvider>
          <App />
        </TabProvider>
      </HeadProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
