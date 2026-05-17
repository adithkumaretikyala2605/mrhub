import React from 'react';
import { motion } from 'framer-motion';
import './Stats.css';

const statsData = [
  { id: 1, number: '10K+', label: 'Startups Supported' },
  { id: 2, number: '500+', label: 'Corporate Partners' },
  { id: 3, number: '$2B+', label: 'Funding Facilitated' },
  { id: 4, number: '100+', label: 'Global Mentors' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 200, damping: 15 } 
  }
};

const Stats = () => {
  return (
    <section className="stats-section">
      <div className="container">
        <motion.div 
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {statsData.map((stat) => (
            <motion.div 
              key={stat.id} 
              className="stat-item"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <span className="stat-number gradient-text">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
