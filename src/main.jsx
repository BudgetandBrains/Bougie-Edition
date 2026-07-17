import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CatalogProvider } from './context/CatalogContext';
import { CurrencyProvider } from './context/CurrencyContext';
import './styles/tokens.css';
import './styles/site.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CurrencyProvider>
        <CatalogProvider>
          <App />
        </CatalogProvider>
      </CurrencyProvider>
    </BrowserRouter>
  </React.StrictMode>
);
