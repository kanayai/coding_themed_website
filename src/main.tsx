import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import { HeadProvider } from 'react-head'; // Import HeadProvider from react-head

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HeadProvider>
      <App />
    </HeadProvider>
  </React.StrictMode>,
);
