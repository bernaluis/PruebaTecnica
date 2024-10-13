// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client' in React 18
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
// Find the root element in your HTML file
const rootElement = document.getElementById('root');

// Create the root using the new React 18 API
const root = ReactDOM.createRoot(rootElement);

// Render your app inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
