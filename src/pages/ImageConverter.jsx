import { useState, useRef } from 'react';
import { ArrowLeft, Download, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ToolPage.css';

export default function ImageConverter() {
  const [image, setImage] = useState(null);
  const [format, setFormat] = useState('png');
  const [preview, setPreview] = useState('');
  const [fileName, setFileName] = useState('image');
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target.result);
      setPreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const convertImage = () => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      let mimeType = 'image/png';
      if (format === 'jpeg') mimeType = 'image/jpeg';
      else if (format === 'webp') mimeType = 'image/webp';

      const dataUrl = canvas.toDataURL(mimeType, 0.9);
      setPreview(dataUrl);
    };
    img.src = image;
  };

  const downloadImage = () => {
    if (!preview) return;
    const link = document.createElement('a');
    link.download = `${fileName}.${format}`;
    link.href = preview;
    link.click();
  };

  return (
    <div className="tool-page">
      <div className="tool-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          Back
        </Link>
        <h1>Image Converter</h1>
        <p className="tool-desc">Convert images between PNG, JPEG, and WEBP formats</p>
      </div>

      <div className="tool-content">
        <div className="image-form">
          <div className="upload-zone" onClick={() => fileRef.current.click()}>
            <Upload size={40} />
            <p>Click to upload an image</p>
            <span>PNG, JPEG, WEBP supported</span>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              hidden
            />
          </div>

          {image && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Output Format</label>
                  <select value={format} onChange={(e) => setFormat(e.target.value)}>
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                    <option value="webp">WEBP</option>
                  </select>
                </div>
              </div>

              <button className="btn-primary" onClick={convertImage}>
                Convert Image
              </button>
            </>
          )}
        </div>

        <div className="image-preview">
          {preview && (
            <div className="preview-card">
              <img src={preview} alt="Converted" />
              <button className="btn-secondary" onClick={downloadImage}>
                <Download size={18} />
                Download .{format}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
