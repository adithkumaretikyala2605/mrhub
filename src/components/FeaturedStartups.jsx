import React from 'react';
import { motion } from 'framer-motion';

const startups = [
  { name: "AgriTech Pro", industry: "Agriculture", description: "Revolutionizing crop yield predictions using AI drone imagery and hyper-local weather models.", funding: "$2M Seed" },
  { name: "FinFlow", industry: "FinTech", description: "Democratizing cross-border B2B payments for small businesses in Southeast Asia with zero markup.", funding: "Series A" },
  { name: "HealthSync", industry: "HealthTech", description: "Seamless wearable integrations for remote patient monitoring and preventative care management.", funding: "$500k Pre-Seed" }
];

const FeaturedStartups = () => {
  return (
    <section className="content-section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}
          >
            Startups Shaping the Future
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}
          >
            A glimpse into some of the most innovative companies built from the ground up at MRHub.
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {startups.map((startup, i) => (
            <motion.div 
              key={i}
              className="glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>{startup.name}</h3>
                <span style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: 'rgba(255, 77, 0, 0.1)', color: 'var(--accent-primary)', borderRadius: '50px', fontWeight: 'bold' }}>
                  {startup.industry}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', flexGrow: 1 }}>{startup.description}</p>
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>Status:</span>
                <span style={{ color: '#10b981', fontWeight: '600' }}>{startup.funding}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStartups;
