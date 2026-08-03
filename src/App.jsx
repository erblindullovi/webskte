import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import QrGenerator from './pages/QrGenerator';
import ImageConverter from './pages/ImageConverter';
import PasswordGenerator from './pages/PasswordGenerator';
import TextFormatter from './pages/TextFormatter';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qr" element={<QrGenerator />} />
          <Route path="/image" element={<ImageConverter />} />
          <Route path="/password" element={<PasswordGenerator />} />
          <Route path="/text" element={<TextFormatter />} />
        </Routes>
      </Layout>
    </Router>
  );
}
