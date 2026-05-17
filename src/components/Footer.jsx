import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Rocket, Globe, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const settings = JSON.parse(localStorage.getItem('mrhub_settings') || '{"email":"hello@mrhub.com","phone":"+91 9876543210"}');

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" className="nav-logo">
              <img src="/logo.png" alt="MRHub Logo" style={{ height: '60px', objectFit: 'contain', marginBottom: '1rem' }} />
            </a>
            <p>
              The ultimate launchpad for innovative startups. Join our ecosystem to build, scale, and transform the future.
            </p>
            <div className="social-links">
              <a href={`mailto:${settings.email}`} title="Email Us"><Mail size={20} /></a>
              <a href={`tel:${settings.phone}`} title="Call Us"><Phone size={20} /></a>
              {settings.linkedin && <a href={settings.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" style={{fontSize: '0.85rem', fontWeight: 'bold', textDecoration: 'none'}}>IN</a>}
              {settings.twitter && <a href={settings.twitter} target="_blank" rel="noreferrer" title="Twitter" style={{fontSize: '0.85rem', fontWeight: 'bold', textDecoration: 'none'}}>X</a>}
            </div>
          </div>

          <div className="footer-links">
            <h4>Ecosystem</h4>
            <ul>
              <li><Link to="/startups">Startups</Link></li>
              <li><Link to="/investors">Investors</Link></li>
              <li><Link to="/mentors">Mentors</Link></li>
              <li><Link to="/corporate">Corporate</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Programs</h4>
            <ul>
              <li><Link to="/incubation">Incubation</Link></li>
              <li><Link to="/acceleration">Acceleration</Link></li>
              <li><Link to="/academic">Academic</Link></li>
              <li><Link to="/funding">Funding</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/newsroom">Newsroom</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p onClick={() => navigate('/asdfghjkl')} style={{ cursor: 'inherit' }}>&copy; {new Date().getFullYear()} MRHub Ecosystem. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
