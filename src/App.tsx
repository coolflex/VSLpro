import { useState } from 'react';
import './index.css';

export default function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}?controls=0&modestbranding=1&rel=0`;
    return url;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '24px', borderBottom: '1px solid #222', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '2rem', color: '#6366f1' }}>VSLPro</h1>
        <p style={{ color: '#888', marginTop: '8px' }}>Professional YouTube VSL Embed Generator</p>
      </header>
      <main style={{ maxWidth: '800px', margin: '48px auto', padding: '0 24px' }}>
        {!submitted ? (
          <div style={{ background: '#111', padding: '32px', borderRadius: '12px', border: '1px solid #222' }}>
            <h2 style={{ marginTop: 0 }}>Create Your VSL Embed</h2>
            <form onSubmit={handleSubmit}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#aaa' }}>YouTube Video URL</label>
              <input
                type="text"
                value={videoUrl}
                onChange={e => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                style={{ width: '100%', padding: '12px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }}
                required
              />
              <button
                type="submit"
                style={{ marginTop: '16px', padding: '12px 32px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}
              >
                Generate VSL Player
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '12px', overflow: 'hidden', background: '#000' }}>
              <iframe
                src={getEmbedUrl(videoUrl)}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="VSL Player"
              />
            </div>
            <div style={{ marginTop: '24px', background: '#111', padding: '24px', borderRadius: '12px', border: '1px solid #222' }}>
              <h3 style={{ marginTop: 0 }}>Embed Code</h3>
              <pre style={{ background: '#1a1a1a', padding: '16px', borderRadius: '8px', overflow: 'auto', color: '#4ade80', fontSize: '14px' }}>
                {`<iframe src="${getEmbedUrl(videoUrl)}" style="width:100%;aspect-ratio:16/9;border:none" allow="autoplay;encrypted-media" allowfullscreen></iframe>`}
              </pre>
              <button
                onClick={() => setSubmitted(false)}
                style={{ marginTop: '16px', padding: '10px 24px', background: '#333', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              >
                ← Back
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
