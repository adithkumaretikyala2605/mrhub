import React from 'react';
import { motion } from 'framer-motion';
import { FileEdit, Users, Rocket, TrendingUp } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Apply Online",
    description: "Submit your basic details through our Level 1 application form. Our team reviews your idea, market potential, and team.",
    icon: <FileEdit size={32} />
  },
  {
    id: 2,
    title: "Due Diligence",
    description: "Shortlisted startups are invited for Stage 2, where we dive deep into financials, product traction, and business models.",
    icon: <Users size={32} />
  },
  {
    id: 3,
    title: "Incubation",
    description: "Selected founders join our intensive 16-week program with access to mentors, workspace, and cloud credits.",
    icon: <Rocket size={32} />
  },
  {
    id: 4,
    title: "Scale & Fund",
    description: "Pitch at our exclusive Demo Day to a curated network of 250+ angel investors and VCs to secure seed funding.",
    icon: <TrendingUp size={32} />
  }
];

const Process = () => {
  return (
    <section className="content-section" style={{ position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}
          >
            Your journey from an ambitious idea to a funded, scalable enterprise.
          </motion.p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem',
          position: 'relative'
        }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              style={{ 
                background: 'rgba(255,255,255,0.02)', 
                border: '1px solid rgba(255,255,255,0.05)', 
                borderRadius: '16px', 
                padding: '2.5rem 2rem',
                textAlign: 'center',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div style={{ 
                width: '70px', 
                height: '70px', 
                borderRadius: '50%', 
                background: 'var(--accent-gradient)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#fff',
                marginBottom: '1.5rem',
                boxShadow: '0 10px 25px rgba(255, 77, 0, 0.3)'
              }}>
                {step.icon}
              </div>
              
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                fontSize: '4rem',
                fontWeight: '900',
                color: 'rgba(255,255,255,0.03)',
                lineHeight: 1
              }}>
                0{step.id}
              </div>

              <h3 style={{ color: 'var(--text-main)', fontSize: '1.4rem', marginBottom: '1rem', zIndex: 1 }}>{step.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', zIndex: 1 }}>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
