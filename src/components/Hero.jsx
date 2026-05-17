import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp, Star, Globe, Users, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

const heroSlides = [
  {
    badge: "MRHub Ecosystem",
    titleStart: "We Back The Best Founders",
    titleHighlight: ".",
    description: "$2M+ deployed to the next generation of engineers, builders, and operators.",
    primaryBtn: { text: "Get Funded", link: "/apply" },
    secondaryBtn: { text: "Explore Startups", link: "/startups" },
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    stats: [
      { icon: <Zap size={20} />, value: "240+", label: "Startups Funded" },
      { icon: <TrendingUp size={20} />, value: "$84M", label: "Capital Facilitated", gradient: true }
    ]
  },
  {
    badge: "MRJEE 2026 Admissions",
    titleStart: "Kickstart Your Journey at",
    titleHighlight: "MRHub",
    description: "Applications for the 2026 incubator batch are officially open. Discover unparalleled opportunities, state-of-the-art facilities, and a global alumni network.",
    primaryBtn: { text: "Apply Now", link: "/apply" },
    secondaryBtn: { text: "View Guidelines", link: "/programs" },
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    stats: [
      { icon: <Trophy size={20} />, value: "Top 10", label: "National Ranking" },
      { icon: <Users size={20} />, value: "50,000+", label: "Global Alumni", gradient: true }
    ]
  },
  {
    badge: "Global Partnerships",
    titleStart: "Collaborate with Industry",
    titleHighlight: "Leaders",
    description: "We've recently partnered with leading tech giants to provide our startups with cutting-edge AI tools, cloud credits, and direct market access.",
    primaryBtn: { text: "Partner With Us", link: "/contact" },
    secondaryBtn: { text: "Read Announcement", link: "/newsroom" },
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    stats: [
      { icon: <Globe size={20} />, value: "50+", label: "Corporate Partners" },
      { icon: <TrendingUp size={20} />, value: "$10M+", label: "Cloud Credits", gradient: true }
    ]
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000); // Slower: 10 seconds per slide
    return () => clearInterval(interval);
  }, [currentSlide]); // Reset timer when slide is changed manually

  const slide = heroSlides[currentSlide];

  return (
    <section className="hero-section">
      <div className="container hero-content">
        
        {/* Left Side: Text Content */}
        <div className="hero-text-wrapper">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="hero-text-content"
            >
              <div className="hero-badge" style={{ display: 'inline-flex' }}>
                <Star size={16} className="text-accent" /> <span className="gradient-text font-bold">{slide.badge}</span>
              </div>
              <h1>
                {slide.titleStart} <span className="gradient-text">{slide.titleHighlight}</span>
              </h1>
              <p>
                {slide.description}
              </p>
              <div className="hero-buttons">
                <Link to={slide.primaryBtn.link} className="btn-primary">
                  {slide.primaryBtn.text} <ArrowRight size={18} />
                </Link>
                <Link to={slide.secondaryBtn.link} className="btn-secondary">{slide.secondaryBtn.text}</Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Image Content */}
        <div className="hero-image-wrapper">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ width: '100%', position: 'relative' }}
            >
              <div className="hero-image-card">
                <img 
                  src={slide.image} 
                  alt="Highlight" 
                  className="hero-image"
                />
              </div>
              
              <motion.div 
                className="floating-badge badge-1 float-anim"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{ zIndex: 10 }}
              >
                <div className="badge-icon">
                  {slide.stats[0].icon}
                </div>
                <div className="badge-text">
                  <h4>{slide.stats[0].value}</h4>
                  <p>{slide.stats[0].label}</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="floating-badge badge-2 float-anim"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{ zIndex: 10 }}
              >
                <div className="badge-icon" style={slide.stats[1].gradient ? { background: 'linear-gradient(135deg, #7000FF, #00F0FF)' } : {}}>
                  {slide.stats[1].icon}
                </div>
                <div className="badge-text">
                  <h4>{slide.stats[1].value}</h4>
                  <p>{slide.stats[1].label}</p>
                </div>
              </motion.div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Absolute Carousel Controls */}
      <button 
        className="carousel-control prev"
        onClick={prevSlide}
        style={{ 
          position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
          width: '50px', height: '50px', borderRadius: '50%', 
          border: '1px solid rgba(0,0,0,0.05)', background: 'white', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          transition: 'all 0.3s', zIndex: 100
        }}
        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(255,77,0,0.2)'; }}
        onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'; }}
      >
        <ChevronLeft size={28} color="#ff4d00" />
      </button>

      <button 
        className="carousel-control next"
        onClick={nextSlide}
        style={{ 
          position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
          width: '50px', height: '50px', borderRadius: '50%', 
          border: '1px solid rgba(0,0,0,0.05)', background: 'white', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          transition: 'all 0.3s', zIndex: 100
        }}
        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(255,77,0,0.2)'; }}
        onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'; }}
      >
        <ChevronRight size={28} color="#ff4d00" />
      </button>

      {/* Pagination Dots */}
      <div style={{
        position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '8px', zIndex: 100
      }}>
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: currentSlide === index ? '24px' : '10px',
              height: '10px',
              borderRadius: '5px',
              background: currentSlide === index ? 'var(--accent-gradient)' : 'rgba(0,0,0,0.2)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
};

export default Hero;
