import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section style={{ padding: '6rem 0 8rem', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow effect */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'var(--accent-gradient)', opacity: 0.1, filter: 'blur(100px)', borderRadius: '50%', zIndex: 0 }} />
      
      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card"
          style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', background: 'rgba(255,255,255,0.02)' }}
        >
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Ready to build your dream?</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Applications for our next incubation cohort are now open. Get access to seed capital, world-class mentorship, and a thriving community of builders.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/apply" className="btn-primary" style={{ textDecoration: 'none', padding: '1rem 2.5rem', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Apply Now <ArrowRight size={20} />
            </Link>
            <Link to="/programs" className="btn-secondary" style={{ textDecoration: 'none', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Explore Programs
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
