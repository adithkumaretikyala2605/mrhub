import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="nav-logo" onClick={() => setMobileOpen(false)}>
          <img src="/logo.png" alt="MRHub Logo" style={{ height: '60px', objectFit: 'contain' }} />
        </Link>
        
        <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
          <li><Link to="/about" onClick={() => setMobileOpen(false)}>About</Link></li>
          <li><Link to="/programs" onClick={() => setMobileOpen(false)}>Programs</Link></li>
          <li><Link to="/ecosystem" onClick={() => setMobileOpen(false)}>Ecosystem</Link></li>
          <li><Link to="/events" onClick={() => setMobileOpen(false)}>Events</Link></li>
          <li><Link to="/news" onClick={() => setMobileOpen(false)}>News</Link></li>
          <li className="nav-dropdown">
            <span className="dropdown-trigger">More</span>
            <div className="dropdown-menu">
              <div className="dropdown-column">
                <h4>Ecosystem</h4>
                <Link to="/startups" onClick={() => setMobileOpen(false)}>Startups</Link>
                <Link to="/investors" onClick={() => setMobileOpen(false)}>Investors</Link>
                <Link to="/mentors" onClick={() => setMobileOpen(false)}>Mentors</Link>
                <Link to="/corporate" onClick={() => setMobileOpen(false)}>Corporate</Link>
                <Link to="/portfolio" onClick={() => setMobileOpen(false)}>Portfolio</Link>
              </div>
              <div className="dropdown-column">
                <h4>Programs</h4>
                <Link to="/incubation" onClick={() => setMobileOpen(false)}>Incubation</Link>
                <Link to="/acceleration" onClick={() => setMobileOpen(false)}>Acceleration</Link>
                <Link to="/academic" onClick={() => setMobileOpen(false)}>Academic</Link>
                <Link to="/funding" onClick={() => setMobileOpen(false)}>Funding</Link>
              </div>
              <div className="dropdown-column">
                <h4>Company</h4>
                <Link to="/about" onClick={() => setMobileOpen(false)}>About Us</Link>
                <Link to="/careers" onClick={() => setMobileOpen(false)}>Careers</Link>
                <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
                <Link to="/resources" onClick={() => setMobileOpen(false)}>Resources</Link>
              </div>
            </div>
          </li>
        </ul>

        <div className="nav-actions">
          <Link to="/apply" className="btn-primary" style={{ textDecoration: 'none' }}>Apply Now</Link>
          
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer',
              padding: '0'
            }}
          >
            <div style={{ position: 'relative', width: '28px', height: '20px' }}>
              <motion.span 
                animate={mobileOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }} 
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ 
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '2.5px', 
                  background: '#1e293b', borderRadius: '4px' 
                }} 
              />
              <motion.span 
                animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }} 
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ 
                  position: 'absolute', top: '9px', left: 0, width: '100%', height: '2.5px', 
                  background: '#1e293b', borderRadius: '4px' 
                }} 
              />
              <motion.span 
                animate={mobileOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }} 
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ 
                  position: 'absolute', top: '18px', left: 0, width: '100%', height: '2.5px', 
                  background: '#1e293b', borderRadius: '4px' 
                }} 
              />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
