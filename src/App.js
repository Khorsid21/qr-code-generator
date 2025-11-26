import React from 'react';
import './App.css';
import QrGenerator from './components/QrGenerator';

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>QR Code Generator</h1>
        <p>Generate QR codes for text and photos (image links / uploads)</p>
      </header>
      <main className="app-main">
        <QrGenerator />
      </main>
      <footer className="app-footer">
        <small>Built with React &amp; qrcode.react</small>
      </footer>
    </div>
  );
}

export default App;
