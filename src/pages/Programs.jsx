import React from 'react';
import { motion } from 'framer-motion';
import Features from '../components/Features';
import './Pages.css';

const Programs = () => {
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
            Our Programs
          </motion.h1>
          <motion.p 
            className="page-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tailored tracks to support you from ideation to IPO.
          </motion.p>
        </div>
      </header>

      <Features />

      <section className="content-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'grid', gap: '2rem' }}
          >
            <div className="glass-card" style={{ padding: '3rem' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>1. Pre-Incubation (Ideation Stage)</h3>
              <p className="text-muted" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                Have an idea but don't know where to start? Our Pre-Incubation program is a 3-month intensive sprint designed to help you validate your idea, build a prototype, and find your early adopters. You'll get access to maker spaces, design thinking workshops, and one-on-one sessions with industry veterans.
              </p>
              <ul style={{ color: 'var(--text-muted)', marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li>Customer discovery and market research.</li>
                <li>Prototyping and Minimum Viable Product (MVP) development.</li>
                <li>Initial pitch deck creation.</li>
              </ul>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>2. Incubation (Early Stage)</h3>
              <p className="text-muted" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                Ready to take your MVP to the market? The 6-12 month Incubation program provides early-stage startups with seed capital, dedicated office space, and specialized mentorship. We help you refine your business model, achieve product-market fit, and prepare for your first major institutional funding round.
              </p>
              <ul style={{ color: 'var(--text-muted)', marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li>Up to $50,000 in seed capital via MRHub ventures.</li>
                <li>Legal, financial, and accounting support.</li>
                <li>Go-to-market strategy and growth hacking.</li>
              </ul>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>3. Acceleration (Growth Stage)</h3>
              <p className="text-muted" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                For post-revenue startups looking to scale exponentially. Our Accelerator is an exclusive, invitation-only track that connects you directly with massive corporate partners, late-stage VCs, and global markets. We focus on scaling your operations, expanding your team, and capturing significant market share.
              </p>
              <ul style={{ color: 'var(--text-muted)', marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li>Access to series A/B venture capital networks.</li>
                <li>International expansion support.</li>
                <li>Executive coaching and leadership development.</li>
              </ul>
            </div>
            
            <div className="glass-card" style={{ padding: '3rem' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Funding & Investment Opportunities</h3>
              <p className="text-muted" style={{ lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                MRHub acts as a catalyst for capital infusion. We do not just prepare you for investors; we bring the investors to you. Our multi-tiered funding approach ensures startups have the runway they need at every stage.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(255, 77, 0, 0.05)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--accent-primary)' }}>
                  <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Prototyping Grant</h4>
                  <p className="text-muted" style={{ fontSize: '0.95rem' }}>Up to ₹5 Lakhs equity-free grant for hardware and deep-tech startups to build their initial working prototypes.</p>
                </div>
                <div style={{ background: 'rgba(255, 77, 0, 0.05)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--accent-primary)' }}>
                  <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Seed Fund</h4>
                  <p className="text-muted" style={{ fontSize: '0.95rem' }}>Up to ₹50 Lakhs in seed investment through MRHub's internal venture arm for startups showing strong early traction.</p>
                </div>
                <div style={{ background: 'rgba(255, 77, 0, 0.05)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--accent-primary)' }}>
                  <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Investor Syndicate</h4>
                  <p className="text-muted" style={{ fontSize: '0.95rem' }}>Direct access to our network of 250+ Angel Investors and micro-VCs during our bi-annual Demo Days.</p>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Who Should Apply?</h3>
              <p className="text-muted" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                We are industry-agnostic but highly biased towards ambition. We look for:
              </p>
              <ul style={{ color: 'var(--text-muted)', marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <li><strong>Driven Teams:</strong> Founders with deep domain expertise and relentless execution capability.</li>
                <li><strong>Scalable Solutions:</strong> Ideas that leverage technology to solve massive, urgent problems.</li>
                <li><strong>Defensible Tech:</strong> Startups building intellectual property, deep-tech, or unique business moats.</li>
                <li><strong>Commitment:</strong> Full-time dedication to building and scaling the venture.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
