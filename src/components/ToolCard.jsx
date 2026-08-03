import { Link } from 'react-router-dom';
import './ToolCard.css';

const iconMap = {
  qr: '🔲',
  image: '🖼️',
  password: '🔒',
  text: '📝',
};

export default function ToolCard({ title, description, path, icon, delay = 0 }) {
  return (
    <Link
      to={path}
      className="tool-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="tool-card-icon">
        <span className="tool-emoji">{iconMap[icon]}</span>
      </div>
      <div className="tool-card-content">
        <h3 className="tool-card-title">{title}</h3>
        <p className="tool-card-desc">{description}</p>
      </div>
      <div className="tool-card-arrow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
