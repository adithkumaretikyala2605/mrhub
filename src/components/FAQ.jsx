import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Do you take equity in the startups you incubate?",
    answer: "Yes, we typically take between 2% to 5% equity in exchange for our 16-week acceleration program, workspace, and access to our network. However, terms can vary based on the startup's stage and funding history."
  },
  {
    question: "Do I need to be an alumni of Malla Reddy University?",
    answer: "No! While we have specialized tracks for academic founders, MRHub is completely open to any founder from across the country. Our ecosystem thrives on diversity."
  },
  {
    question: "What stage of startups do you accept?",
    answer: "We primarily accept early-stage startups ranging from prototype/MVP stage to early revenue. If you have a solid team and a working product, you are a great fit for our acceleration program."
  },
  {
    question: "Is physical presence in Hyderabad mandatory?",
    answer: "While we highly encourage founders to work out of our state-of-the-art campus in Hyderabad to maximize serendipitous networking, we do offer hybrid tracks for exceptional teams based elsewhere."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="content-section" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}
          >
            Everything you need to know about joining MRHub.
          </motion.p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.05)', 
                borderRadius: '12px',
                overflow: 'hidden'
              }}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                style={{ 
                  width: '100%', 
                  padding: '1.5rem', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  background: 'none', 
                  border: 'none',
                  color: 'var(--text-main)',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                {faq.question}
                <span style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center' }}>
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div style={{ padding: '0 1.5rem 1.5rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
