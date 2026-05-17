import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "MRHub's acceleration program completely changed the trajectory of our startup. The mentorship and corporate connects helped us close our first major enterprise deal within weeks.",
    author: "Sneha Reddy",
    role: "Founder, TechVision AI",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    quote: "The due diligence and level of support we received from the MRHub Angel Network was unparalleled. They didn't just write a check; they became true partners in our growth.",
    author: "Rahul Sharma",
    role: "CEO, FinEase",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    quote: "Access to the ecosystem's cloud credits and the legal support for our IP filing saved us months of runway. MRHub is the best launchpad for any deep-tech founder.",
    author: "Dr. Ananya Patil",
    role: "CTO, BioSynergy",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
  }
];

const Testimonials = () => {
  return (
    <section className="content-section" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}
          >
            Success Stories
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}
          >
            Hear from the founders who have accelerated their growth with MRHub.
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {testimonials.map((testimonial, i) => (
            <motion.div 
              key={testimonial.id}
              className="glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ position: 'relative', padding: '3rem 2rem 2rem', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', color: 'rgba(255, 77, 0, 0.2)' }}>
                <Quote size={40} />
              </div>
              
              <p style={{ color: 'var(--text-light)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem', position: 'relative', zIndex: 1, flexGrow: 1 }}>
                "{testimonial.quote}"
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-primary)' }} 
                />
                <div>
                  <h4 style={{ color: 'var(--text-main)', fontSize: '1rem', marginBottom: '0.2rem' }}>{testimonial.author}</h4>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{testimonial.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
