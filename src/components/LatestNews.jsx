import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LatestNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const storedNews = JSON.parse(localStorage.getItem('mrhub_news') || '[]');
    setNews(storedNews.slice(0, 3)); // Only take top 3
  }, []);

  if (news.length === 0) return null;

  return (
    <section className="content-section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}
            >
              Latest News
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}
            >
              Stories and announcements from our ecosystem
            </motion.p>
          </div>
          <Link to="/news" style={{ color: 'var(--accent-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
            View All <ArrowRight size={18} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
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
                <h3 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginBottom: '1rem', lineHeight: '1.4' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{item.excerpt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
