import React from 'react';
import { motion } from 'framer-motion';
import './Pages.css';

const About = () => {
  const customPages = JSON.parse(localStorage.getItem('mrhub_custom_pages') || '{}');
  const customData = customPages['about'];

  if (customData && customData.isActive) {
    return (
      <div className="page-wrapper">
        <header className="page-header">
          <div className="container">
            <motion.h1 className="page-title gradient-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {customData.title || "About MRHub"}
            </motion.h1>
            <motion.p className="page-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              {customData.subtitle}
            </motion.p>
          </div>
        </header>
        <section className="content-section">
          <div className="container">
            <div className="glass-card" style={{ padding: '3rem' }}>
              <div 
                className="custom-content"
                dangerouslySetInnerHTML={{ __html: customData.content }} 
                style={{ lineHeight: '1.8', color: 'var(--text-muted)' }} 
              />
            </div>
          </div>
        </section>
      </div>
    );
  }

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
            About MRHub
          </motion.h1>
          <motion.p 
            className="page-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our mission is to create a thriving environment where innovation meets execution.
          </motion.p>
        </div>
      </header>

      <section className="content-section">
        <div className="container">
          <div className="card-grid">
            <div className="glass-card">
              <h3>Our Vision</h3>
              <p className="text-muted mt-4">
                To be the epicenter of global innovation by empowering dreamers, creators, and builders with the resources they need to change the world.
              </p>
            </div>
            <div className="glass-card">
              <h3>Our Mission</h3>
              <p className="text-muted mt-4">
                We provide a comprehensive ecosystem of capital, mentorship, and corporate access to accelerate startup growth and drive economic impact.
              </p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginTop: '4rem', display: 'grid', gap: '2rem' }}
          >
            <div className="glass-card" style={{ padding: '3rem' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Our History</h3>
              <p className="text-muted" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                Founded at Malla Reddy University, MRHub began with a simple yet powerful idea: to bridge the gap between academic research and real-world entrepreneurial success. Over the years, we have grown from a small university incubator into a sprawling ecosystem that supports hundreds of startups across diverse sectors including deep-tech, fintech, agritech, and healthtech. 
                <br /><br />
                Our journey has been defined by the success of our founders, who have collectively raised millions in venture capital, created thousands of jobs, and built products that are transforming industries globally.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Core Values</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                <div>
                  <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Innovation First</h4>
                  <p className="text-muted" style={{ lineHeight: '1.6' }}>We believe in challenging the status quo and supporting disruptive ideas that have the potential to scale globally.</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Founder Centric</h4>
                  <p className="text-muted" style={{ lineHeight: '1.6' }}>Everything we do is designed to support the founder's journey, providing the right resources at the right time.</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Community Driven</h4>
                  <p className="text-muted" style={{ lineHeight: '1.6' }}>We foster a culture of collaboration, where founders, mentors, and investors actively help each other succeed.</p>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Why Choose MRHub?</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.2rem' }}>Academic Excellence</h4>
                  <p className="text-muted" style={{ lineHeight: '1.6' }}>Leverage the profound intellectual capital of Malla Reddy University. Get direct access to top-tier researchers, proprietary labs, and a steady pipeline of brilliant interns and co-founders.</p>
                </div>
                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.2rem' }}>Zero-Equity Grants</h4>
                  <p className="text-muted" style={{ lineHeight: '1.6' }}>We offer early-stage prototyping grants that are completely equity-free. This ensures that you retain maximum ownership of your company during the most critical early phases.</p>
                </div>
                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.2rem' }}>Global Market Access</h4>
                  <p className="text-muted" style={{ lineHeight: '1.6' }}>Through our international partnership network, we facilitate soft-landing programs in Silicon Valley, London, and Singapore, helping you scale globally from day one.</p>
                </div>
                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.2rem' }}>State-of-the-Art Facilities</h4>
                  <p className="text-muted" style={{ lineHeight: '1.6' }}>Operate out of our 50,000 sq ft innovation campus featuring 24/7 access, AR/VR labs, advanced hardware prototyping centers, podcast studios, and premium coworking spaces.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
