import { useState } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';
import './ToolPage.css';

export default function QrGenerator() {
  const [text, setText] = useState('https://example.com');
  const [qrUrl, setQrUrl] = useState('');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [error, setError] = useState('');

  const generateQR = async () => {
    if (!text.trim()) {
      setError('Please enter some text or URL');
      return;
    }
    setError('');
    try {
      const url = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: { dark: fgColor, light: bgColor },
      });
      setQrUrl(url);
    } catch (err) {
      setError('Failed to generate QR code');
    }
  };

  const downloadQR = () => {
    if (!qrUrl) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrUrl;
    link.click();
  };

  return (
    <div className="tool-page">
      <div className="tool-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          Back
        </Link>
        <h1>QR Code Generator</h1>
        <p className="tool-desc">Create custom QR codes from text, URLs, or any content</p>
      </div>

      <div className="tool-content qr-content">
        <div className="qr-form">
          <div className="form-group">
            <label>Content</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or URL..."
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Size: {size}px</label>
              <input
                type="range"
                min="128"
                max="512"
                step="32"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Foreground Color</label>
              <div className="color-input">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                />
                <span>{fgColor}</span>
              </div>
            </div>
            <div className="form-group">
              <label>Background Color</label>
              <div className="color-input">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
                <span>{bgColor}</span>
              </div>
            </div>
          </div>

          <button className="btn-primary" onClick={generateQR}>
            Generate QR Code
          </button>

          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="qr-preview">
          {qrUrl && (
            <div className="preview-card">
              <img src={qrUrl} alt="QR Code" />
              <button className="btn-secondary" onClick={downloadQR}>
                <Download size={18} />
                Download PNG
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
