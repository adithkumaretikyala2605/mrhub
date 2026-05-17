import React from 'react';
import { motion } from 'framer-motion';

const boardMembers = [
  { name: 'Ch. Malla Reddy', role: 'Founder & Chairman', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400' },
  { name: 'Dr. VSK Reddy', role: 'Vice Chancellor', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400' },
  { name: 'Praveen Reddy', role: 'Managing Director', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400' },
  { name: 'Dr. Ananya Sharma', role: 'Chief Innovation Officer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400' }
];

const BoardOfMembers = () => {
  return (
    <section className="content-section" style={{ padding: '6rem 0' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            color: 'var(--accent-primary)', 
            fontSize: '0.8rem', 
            fontWeight: '800', 
            letterSpacing: '0.2em', 
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}
        >
          Leadership
        </motion.p>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ 
            color: 'var(--text-main)', 
            fontSize: '3.5rem', 
            fontWeight: '600', 
            letterSpacing: '-0.02em',
            marginBottom: '4rem',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          The Board of MR.HUB<span style={{ color: 'var(--accent-primary)' }}>.</span>
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {boardMembers.map((member, i) => (
            <motion.div 
              key={i}
              className="glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              style={{
                padding: '0',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ height: '300px', overflow: 'hidden' }}>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)' }} 
                />
              </div>
              <div style={{ padding: '2rem 1.5rem', textAlign: 'left', borderTop: '1px solid rgba(255,255,255,0.05)', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ color: 'var(--text-light)', fontSize: '1.4rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{member.name}</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem', fontWeight: '500' }}>{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardOfMembers;
