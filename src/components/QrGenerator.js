import React, { useState, useEffect } from 'react';
import {QRCodeCanvas} from 'qrcode.react';


//import QRCode from 'qrcode.react';
//import './QrGenerator.css'; // optional, for styling

function QrGenerator() {
  const [mode, setMode] = useState('text'); // 'text' | 'image-url' | 'image-file'
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [filePreview, setFilePreview] = useState(null); // local image preview (URL)
  const [qrValue, setQrValue] = useState('');

  // When mode changes, reset fields
  useEffect(() => {
    setText('');
    setImageUrl('');
    setFilePreview(null);
    setQrValue('');
  }, [mode]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setFilePreview(objectUrl);
    setQrValue(objectUrl); // QR will encode this local object URL (demo)
  };

  const handleGenerate = () => {
    if (mode === 'text') {
      const value = text.trim();
      setQrValue(value || ''); 
    } else if (mode === 'image-url') {
      const value = imageUrl.trim();
      setQrValue(value || '');
    } else if (mode === 'image-file') {
      // already handled when file selected
      if (!filePreview) {
        alert('Please upload an image file first.');
      }
    }
  };

  const hasValue = !!qrValue;

  return (
    <div className="qr-container">
      <div className="qr-card">
        <div className="mode-switch">
          <button
            className={mode === 'text' ? 'mode-btn active' : 'mode-btn'}
            onClick={() => setMode('text')}
          >
            Text
          </button>
          <button
            className={mode === 'image-url' ? 'mode-btn active' : 'mode-btn'}
            onClick={() => setMode('image-url')}
          >
            Image URL
          </button>
          <button
            className={mode === 'image-file' ? 'mode-btn active' : 'mode-btn'}
            onClick={() => setMode('image-file')}
          >
            Upload Photo
          </button>
        </div>

        {mode === 'text' && (
          <div className="input-group">
            <label>Enter text / link:</label>
            <textarea
              rows="3"
              placeholder="Type your text or URL here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        )}

        {mode === 'image-url' && (
          <div className="input-group">
            <label>Image URL:</label>
            <input
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            {imageUrl && (
              <div className="preview">
                <p>Image preview:</p>
                <img src={imageUrl} alt="Preview" />
              </div>
            )}
          </div>
        )}

        {mode === 'image-file' && (
          <div className="input-group">
            <label>Upload a photo (local demo):</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {filePreview && (
              <div className="preview">
                <p>Uploaded image:</p>
                <img src={filePreview} alt="Uploaded preview" />
              </div>
            )}
          </div>
        )}

        <button className="generate-btn" onClick={handleGenerate}>
          Generate QR Code
        </button>
      </div>

      <div className="qr-display">
        <h2>QR Code</h2>
        {hasValue ? (
          <div className="qr-box">
            <QRCodeCanvas value={qrValue} size={256} includeMargin={true} />
            <p className="qr-caption">Scan this code with your phone&apos;s camera.</p>
          </div>
        ) : (
          <p className="qr-placeholder">Fill the form &amp; click Generate.</p>
        )}
      </div>
    </div>
  );
}

export default QrGenerator;
