import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import './Layout.css';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/qr', label: 'QR Code' },
  { path: '/image', label: 'Image Tools' },
  { path: '/password', label: 'Password' },
  { path: '/text', label: 'Text Tools' },
];

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <div className="logo-icon">
              <Zap size={22} />
            </div>
            <span className="logo-text">Free Tools</span>
          </Link>

          <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <Zap size={18} />
            <span>Free Tools</span>
          </div>
          <p className="footer-text">
            Free, fast, and private online tools. No sign-up required.
          </p>
          <p className="footer-copy">
            © {new Date().getFullYear()} Free Tools. All tools run in your browser.
          </p>
        </div>
      </footer>
    </div>
  );
}
