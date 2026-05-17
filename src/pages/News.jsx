import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Pages.css';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedNews = JSON.parse(localStorage.getItem('mrhub_news') || '[]');
    setNews(storedNews);
  }, []);

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div className="container">
          <motion.h1 
            className="page-title gradient-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Newsroom
          </motion.h1>
          <motion.p 
            className="page-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Latest updates, funding announcements, and stories from our ecosystem.
          </motion.p>
        </div>
      </header>

      <section className="content-section">
        <div className="container">
          {news.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              No news articles published yet.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
              {news.map((item, i) => (
                <motion.div 
                  key={item.id}
                  className="glass-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}
                >
                  {item.image && (
                    <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <span style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{item.date}</span>
                    <h3 style={{ color: 'var(--text-main)', fontSize: '1.4rem', marginBottom: '1rem', lineHeight: '1.4' }}>{item.title}</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', flexGrow: 1 }}>{item.excerpt}</p>
                    {item.content && (
                      <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{item.content}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;
