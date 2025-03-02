import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&family=Inter:wght@300;400;500;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #0f0020 0%, #220938 100%);
    color: #f5f5f5;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }
  
  /* Synthwave sun with full gradient and transparent stripes */
  body::after {
    content: '';
    position: fixed;
    bottom: -150px;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 600px;
    background: 
      linear-gradient(0deg, #ffcc00 0%, #ff9e00 20%, #ff5e00 40%, #ff1b8d 60%, rgba(255, 27, 141, 0) 100%);
    border-radius: 50% 50% 0 0;
    z-index: -2;
    opacity: 0.95;
    box-shadow: 0 0 100px rgba(255, 204, 0, 0.3);
    mask-image: 
      repeating-linear-gradient(
        0deg,
        black 0%,
        black 5%,
        transparent 5%,
        transparent 7%
      ),
      radial-gradient(circle at center, black 0%, black 50%, transparent 70%);
    -webkit-mask-image: 
      repeating-linear-gradient(
        0deg,
        black 0%,
        black 5%,
        transparent 5%,
        transparent 7%
      ),
      radial-gradient(circle at center, black 0%, black 50%, transparent 70%);
    -webkit-mask-composite: source-in;
    mask-composite: intersect;
  }

  /* Grid lines on the horizon */
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      repeating-linear-gradient(180deg, transparent, transparent 45%, rgba(255, 0, 255, 0.1) 45%, rgba(255, 0, 255, 0.1) 45.1%, transparent 45.1%, transparent 50%),
      repeating-linear-gradient(90deg, transparent, transparent 45%, rgba(0, 255, 255, 0.05) 45%, rgba(0, 255, 255, 0.05) 45.1%, transparent 45.1%, transparent 50%);
    background-size: 100% 100px, 100px 100%;
    background-position: 0 bottom, 0 0;
    pointer-events: none;
    z-index: 10;
  }

  h1, h2, h3 {
    font-family: 'Orbitron', sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  button {
    font-family: 'Orbitron', sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);