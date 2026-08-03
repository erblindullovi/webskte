import { useState, useEffect } from 'react';
import { ArrowLeft, Copy, RefreshCw, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ToolPage.css';

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(0);

  const generate = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const nums = '0123456789';
    const syms = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (uppercase) chars += upper;
    if (lowercase) chars += lower;
    if (numbers) chars += nums;
    if (symbols) chars += syms;

    if (!chars) {
      setPassword('');
      setStrength(0);
      return;
    }

    let pass = '';
    for (let i = 0; i < length; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(pass);

    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (uppercase && lowercase) score++;
    if (numbers) score++;
    if (symbols) score++;
    setStrength(Math.min(score, 4));
  };

  useEffect(() => {
    generate();
  }, []);

  const copyToClipboard = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
  const strengthColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4'];

  return (
    <div className="tool-page">
      <div className="tool-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          Back
        </Link>
        <h1>Password Generator</h1>
        <p className="tool-desc">Generate strong, secure passwords with custom options</p>
      </div>

      <div className="tool-content password-content">
        <div className="password-display">
          <div className="password-output">
            <code className="password-text">{password || 'Click generate'}</code>
          </div>
          <div className="password-actions">
            <button className="btn-icon" onClick={generate} title="Regenerate">
              <RefreshCw size={20} />
            </button>
            <button className="btn-icon" onClick={copyToClipboard} title="Copy">
              {copied ? <Check size={20} color="#22c55e" /> : <Copy size={20} />}
            </button>
          </div>
          <div className="strength-bar">
            <div
              className="strength-fill"
              style={{
                width: `${(strength / 4) * 100}%`,
                background: strengthColors[strength],
              }}
            />
          </div>
          <p className="strength-label" style={{ color: strengthColors[strength] }}>
            {strengthLabels[strength]} password
          </p>
        </div>

        <div className="password-options">
          <div className="option-group">
            <div className="option-header">
              <label>Length: {length}</label>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          <div className="options-grid">
            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
              />
              <span>Uppercase (A-Z)</span>
            </label>
            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
              />
              <span>Lowercase (a-z)</span>
            </label>
            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={numbers}
                onChange={(e) => setNumbers(e.target.checked)}
              />
              <span>Numbers (0-9)</span>
            </label>
            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={symbols}
                onChange={(e) => setSymbols(e.target.checked)}
              />
              <span>Symbols (!@#$)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
