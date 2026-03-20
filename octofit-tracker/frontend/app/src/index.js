import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Set REACT_APP_CODESPACE_NAME from window location if not set
if (!process.env.REACT_APP_CODESPACE_NAME) {
  const host = window.location.host;
  const match = host.match(/^([^-]+)-8000\.app\.github\.dev/);
  if (match) {
    process.env.REACT_APP_CODESPACE_NAME = match[1];
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
