import React from 'react';
import { motion } from 'framer-motion';

const Partners = () => {
  const partners = [
    { name: "Microsoft", color: "#00a4ef" },
    { name: "Google Cloud", color: "#ea4335" },
    { name: "AWS", color: "#ff9900" },
    { name: "Stripe", color: "#635bff" },
    { name: "HubSpot", color: "#ff7a59" },
    { name: "NVIDIA", color: "#76b900" }
  ];

  return (
    <section className="content-section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ 
              color: 'var(--text-muted)', 
              fontSize: '0.95rem', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              fontWeight: '600',
              marginBottom: '2rem'
            }}
          >
            Trusted by Global Industry Leaders
          </motion.p>
          
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '3rem' 
          }}>
            {partners.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                style={{
                  padding: '1rem 2rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '150px',
                  height: '80px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: `0 10px 30px ${partner.color}20`,
                  borderColor: `${partner.color}50` 
                }}
              >
                <span style={{ 
                  fontSize: '1.4rem', 
                  fontWeight: '800', 
                  color: 'var(--text-light)', 
                  letterSpacing: '1px' 
                }}>
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
