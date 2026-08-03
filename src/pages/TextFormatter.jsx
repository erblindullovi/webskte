import { useState } from 'react';
import { ArrowLeft, Copy, Check, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ToolPage.css';

const operations = [
  { id: 'upper', label: 'UPPERCASE', fn: (t) => t.toUpperCase() },
  { id: 'lower', label: 'lowercase', fn: (t) => t.toLowerCase() },
  { id: 'capitalize', label: 'Capitalize', fn: (t) => t.replace(/\b\w/g, (c) => c.toUpperCase()) },
  { id: 'sentence', label: 'Sentence case', fn: (t) => t.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()) },
  { id: 'trim', label: 'Trim spaces', fn: (t) => t.trim() },
  { id: 'removeExtra', label: 'Remove extra spaces', fn: (t) => t.replace(/\s+/g, ' ').trim() },
  { id: 'removeNewlines', label: 'Remove line breaks', fn: (t) => t.replace(/[\r\n]+/g, ' ') },
  { id: 'reverse', label: 'Reverse text', fn: (t) => t.split('').reverse().join('') },
];

export default function TextFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeOp, setActiveOp] = useState('upper');

  const applyOperation = (opId) => {
    setActiveOp(opId);
    const op = operations.find((o) => o.id === opId);
    if (op) setOutput(op.fn(input));
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="tool-page">
      <div className="tool-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          Back
        </Link>
        <h1>Text Formatter</h1>
        <p className="tool-desc">Format, clean, and transform text with ease</p>
      </div>

      <div className="tool-content text-content">
        <div className="text-options">
          <div className="operations-grid">
            {operations.map((op) => (
              <button
                key={op.id}
                className={`op-btn ${activeOp === op.id ? 'active' : ''}`}
                onClick={() => applyOperation(op.id)}
              >
                {op.label}
              </button>
            ))}
          </div>
        </div>

        <div className="text-areas">
          <div className="text-area-wrapper">
            <div className="text-area-header">
              <label>Input</label>
              <button className="btn-small" onClick={clearAll}>
                <Trash2 size={16} />
                Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                applyOperation(activeOp);
              }}
              placeholder="Type or paste your text here..."
              rows={12}
            />
          </div>

          <div className="text-area-wrapper">
            <div className="text-area-header">
              <label>Output</label>
              <button className="btn-small" onClick={copyOutput}>
                {copied ? <Check size={16} color="#22c55e" /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Formatted text will appear here..."
              rows={12}
            />
          </div>
        </div>

        <div className="text-stats">
          <span>{input.length} characters</span>
          <span>{input.split(/\s+/).filter(Boolean).length} words</span>
          <span>{input.split('\n').length} lines</span>
        </div>
      </div>
    </div>
  );
}
