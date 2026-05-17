import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Shield, Users, Network, Code, Briefcase } from 'lucide-react';
import './Features.css';

const features = [
  {
    icon: <Rocket size={28} />,
    title: 'Incubation Programs',
    description: 'Transform your idea into a viable product with our structured 6-month incubation support.'
  },
  {
    icon: <Network size={28} />,
    title: 'Corporate Innovation',
    description: 'Connect with industry leaders to pilot your solutions and secure early enterprise customers.'
  },
  {
    icon: <Briefcase size={28} />,
    title: 'Funding Access',
    description: 'Pitch to our network of 200+ angel investors and VCs through exclusive demo days.'
  },
  {
    icon: <Users size={28} />,
    title: 'Mentor Network',
    description: 'Get 1-on-1 guidance from serial entrepreneurs and domain experts.'
  },
  {
    icon: <Code size={28} />,
    title: 'Tech Infrastructure',
    description: 'Access premium APIs, cloud credits, and state-of-the-art prototyping labs.'
  },
  {
    icon: <Shield size={28} />,
    title: 'Legal & IP Support',
    description: 'Navigate complex regulations and protect your intellectual property with expert help.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const Features = () => {
  return (
    <section className="section features-section" id="programs">
      <div className="container">
        <div className="features-header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="gradient-text" style={{ paddingBottom: '0.5rem' }}>Comprehensive Ecosystem</h2>
            <p>
              Everything a startup needs to scale rapidly, from day zero to IPO.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="glass-card feature-card"
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 40px rgba(255, 77, 0, 0.15)",
                borderColor: "rgba(255, 77, 0, 0.4)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div 
                className="feature-icon"
                whileHover={{ scale: 1.15, rotate: 5 }}
              >
                {feature.icon}
              </motion.div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
