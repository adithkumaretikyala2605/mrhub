import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Shield, Users, Building, Activity, Lightbulb } from 'lucide-react';
import './Pages.css';

const Ecosystem = () => {
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
            The Ecosystem
          </motion.h1>
          <motion.p 
            className="page-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A vibrant community of founders, investors, and mentors working together.
          </motion.p>
        </div>
      </header>

      <section className="content-section">
        <div className="container">
          <div className="card-grid">
            {[
              { title: "Startups", icon: <Rocket size={24} />, count: "10,000+" },
              { title: "Corporate Partners", icon: <Building size={24} />, count: "500+" },
              { title: "Angel Investors", icon: <Activity size={24} />, count: "250+" },
              { title: "Global Mentors", icon: <Users size={24} />, count: "100+" },
              { title: "Incubators", icon: <Lightbulb size={24} />, count: "50+" },
              { title: "Government Bodies", icon: <Shield size={24} />, count: "10+" }
            ].map((item, i) => (
              <motion.div 
                className="glass-card"
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div style={{ color: "var(--accent-primary)", marginBottom: "1rem" }}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p className="gradient-text" style={{ fontSize: "2rem", fontWeight: "bold", marginTop: "1rem" }}>{item.count}</p>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: '4rem', display: 'grid', gap: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Our Corporate Partners</h3>
              <p className="text-muted" style={{ lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '2rem' }}>
                We have partnered with some of the biggest names in the industry to provide our startups with unparalleled corporate access, discounted cloud credits, API access, and potential enterprise pilot programs.
              </p>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {['Microsoft', 'Amazon Web Services', 'Google Cloud', 'NVIDIA', 'Stripe', 'HubSpot'].map((partner, i) => (
                  <div key={i} style={{ padding: '1rem 2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-main)', fontWeight: 'bold' }}>
                    {partner}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Global Mentor Network</h3>
              <p className="text-muted" style={{ lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '2rem' }}>
                Our startups are backed by a global network of over 100 mentors. These include serial entrepreneurs, ex-CXOs of Fortune 500 companies, and subject matter experts in engineering, marketing, and legal. They host office hours, conduct deep-dive workshops, and provide invaluable 1-on-1 guidance.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem', background: 'rgba(255, 77, 0, 0.03)' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>Government & Institutional Backing</h3>
              <p className="text-muted" style={{ lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                We actively collaborate with state and central government bodies to facilitate seamless policy integration, direct grants, and international expansion schemes. Startups at MRHub receive comprehensive assistance in navigating complex regulatory landscapes.
              </p>
              <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li>Startup India Seed Fund Scheme facilitation.</li>
                <li>T-Hub and TSIC (Telangana State Innovation Cell) ecosystem access.</li>
                <li>Patent and IP filing reimbursements through government channels.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ecosystem;
