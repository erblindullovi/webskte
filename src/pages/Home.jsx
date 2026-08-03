import ToolCard from '../components/ToolCard';
import './Home.css';

const tools = [
  {
    title: 'QR Code Generator',
    description: 'Create custom QR codes from text, URLs, or any content. Download as PNG.',
    path: '/qr',
    icon: 'qr',
    delay: 0,
  },
  {
    title: 'Image Converter',
    description: 'Convert images between PNG, JPEG, and WEBP formats instantly.',
    path: '/image',
    icon: 'image',
    delay: 100,
  },
  {
    title: 'Password Generator',
    description: 'Generate strong, secure passwords with customizable length and options.',
    path: '/password',
    icon: 'password',
    delay: 200,
  },
  {
    title: 'Text Formatter',
    description: 'Format, clean, and transform text with case conversion and whitespace tools.',
    path: '/text',
    icon: 'text',
    delay: 300,
  },
];

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          100% Free & Private
        </div>
        <h1 className="hero-title">
          Essential Tools,
          <br />
          <span className="gradient-text">Zero Hassle</span>
        </h1>
        <p className="hero-subtitle">
          A growing collection of free, browser-based tools.
          <br />
          No sign-up, no downloads, no tracking.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">4+</span>
            <span className="stat-label">Tools</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Private</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">$0</span>
            <span className="stat-label">Forever</span>
          </div>
        </div>
      </section>

      <section className="tools-section">
        <div className="tools-header">
          <h2 className="tools-title">Our Tools</h2>
          <p className="tools-subtitle">Pick a tool to get started</p>
        </div>
        <div className="tools-grid">
          {tools.map(tool => (
            <ToolCard key={tool.path} {...tool} />
          ))}
        </div>
      </section>

      <section className="features-section">
        <h2 className="features-title">Why Free Tools?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>Private & Secure</h3>
            <p>All processing happens in your browser. Your data never leaves your device.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <h3>Lightning Fast</h3>
            <p>No server roundtrips. Tools run instantly in your browser with zero latency.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
            <h3>No Sign-Up</h3>
            <p>No accounts, no passwords, no email required. Just open and use.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
