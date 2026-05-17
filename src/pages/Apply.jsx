import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Pages.css';

const Apply = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    founderName: '',
    mobile: '',
    email: '',
    cityState: '',
    age: '',
    gender: '',
    nationality: '',
    startupName: '',
    industry: '',
    description: '',
    website: '',
    amountSeeking: '',
    equityOfferings: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Save to localStorage
    const existingSubmissions = JSON.parse(localStorage.getItem('mrhub_submissions') || '[]');
    const newSubmission = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      stage: 'Level 1'
    };
    
    localStorage.setItem('mrhub_submissions', JSON.stringify([newSubmission, ...existingSubmissions]));

    // Send Confirmation Email
    const SERVICE_ID = 'service_kskaz5j';
    const TEMPLATE_ID = 'template_s4y0q4h';
    const PUBLIC_KEY = 'g9Vs-dl50jusIngFx';

    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      startupName: formData.startupName,
      founderName: formData.founderName,
      email: formData.email,
      stage: "Level 1 Screening"
    }, PUBLIC_KEY)
      .then(() => {
        console.log("Confirmation email sent successfully!");
        setSubmitted(true);
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Failed to send email. Ensure you have replaced the placeholder keys.", error);
        setSubmitted(true);
        setIsSubmitting(false);
      });
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const sectionTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: 'var(--text-main)',
    borderBottom: '2px solid rgba(255, 77, 0, 0.2)',
    paddingBottom: '0.5rem',
    marginBottom: '1rem',
    marginTop: '2rem'
  };

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div className="container">
          <motion.h1 
            className="page-title gradient-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Apply to MRHub (Level 1)
          </motion.h1>
          <motion.p 
            className="page-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Initial screening application. Qualified startups will be invited to Stage 2 for detailed due diligence.
          </motion.p>
        </div>
      </header>

      <section className="content-section">
        <div className="container" style={{ maxWidth: '900px' }}>
          {submitted ? (
            <motion.div 
              className="apply-form" 
              style={{ textAlign: 'center', padding: '5rem 3rem' }}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            >
              <div style={{ position: 'relative', display: 'inline-block', margin: '0 auto 2rem' }}>
                {/* Confetti Explosion */}
                {[...Array(16)].map((_, i) => {
                  const angle = (i * 360) / 16;
                  return (
                    <motion.div
                      key={i}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: i % 3 === 0 ? '6px' : '10px',
                        height: i % 3 === 0 ? '6px' : '10px',
                        backgroundColor: i % 2 === 0 ? '#ff4d00' : '#ff007b',
                        borderRadius: i % 4 === 0 ? '2px' : '50%',
                        zIndex: 0
                      }}
                      initial={{ x: '-50%', y: '-50%', scale: 0, opacity: 1 }}
                      animate={{ 
                        x: `calc(-50% + ${Math.cos((angle * Math.PI) / 180) * (80 + (i % 2) * 40)}px)`, 
                        y: `calc(-50% + ${Math.sin((angle * Math.PI) / 180) * (80 + (i % 2) * 40)}px)`,
                        scale: [0, 1.2, 0],
                        opacity: [1, 1, 0],
                        rotate: [0, 180]
                      }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                    />
                  );
                })}

                <motion.svg 
                  width="120" height="120" viewBox="0 0 50 50" 
                  style={{ display: 'block', overflow: 'visible', position: 'relative', zIndex: 1 }}
                >
                  <motion.circle 
                    cx="25" cy="25" r="22" 
                    stroke="url(#gradient)" 
                    strokeWidth="3" 
                    fill="white"
                    initial={{ pathLength: 0, rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ pathLength: 1, rotate: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", type: "spring", bounce: 0.4 }}
                  />
                  <motion.path 
                    d="M16 26 L22 32 L34 18" 
                    stroke="url(#gradient)" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff4d00" />
                      <stop offset="100%" stopColor="#ff007b" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </div>

              <motion.h2 
                className="gradient-text mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                style={{ fontSize: '2.5rem' }}
              >
                Level 1 Application Received!
              </motion.h2>
              
              <motion.p 
                className="text-muted"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                style={{ fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.6 }}
              >
                Thank you for applying to MRHub. Our ecosystem team will review your initial screening details. 
                <br/><br/>
                If your startup qualifies, you will be contacted within 3-5 business days to proceed to <strong>Stage 2</strong> (Business & Financial Due Diligence).
              </motion.p>
              
              <motion.button 
                onClick={() => setSubmitted(false)} 
                className="btn-secondary mt-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
              >
                Submit Another Application
              </motion.button>
            </motion.div>
          ) : (
            <motion.form 
              className="apply-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ maxWidth: '100%', padding: '3rem' }}
            >
              
              {/* SECTION 1: Personal Details */}
              <h3 style={{ ...sectionTitleStyle, marginTop: 0 }}>Personal Details</h3>
              <div style={gridStyle}>
                <div className="form-group">
                  <label>Founder Name</label>
                  <input type="text" name="founderName" value={formData.founderName} onChange={handleChange} className="form-control" required placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="form-control" required placeholder="+91 9876543210" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required placeholder="founder@startup.com" />
                </div>
                <div className="form-group">
                  <label>City/State</label>
                  <input type="text" name="cityState" value={formData.cityState} onChange={handleChange} className="form-control" required placeholder="Hyderabad, Telangana" />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-control" required placeholder="28" min="16" max="100" />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="form-control" required>
                    <option value="">Select gender...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Nationality</label>
                  <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} className="form-control" required placeholder="Indian" />
                </div>
              </div>

              {/* SECTION 2: Startup Basics */}
              <h3 style={sectionTitleStyle}>Startup Basics</h3>
              <div style={gridStyle}>
                <div className="form-group">
                  <label>Startup Name</label>
                  <input type="text" name="startupName" value={formData.startupName} onChange={handleChange} className="form-control" required placeholder="Enter your startup name" />
                </div>
                <div className="form-group">
                  <label>Industry/Category</label>
                  <select name="industry" value={formData.industry} onChange={handleChange} className="form-control" required>
                    <option value="">Select industry...</option>
                    <option value="SaaS / Enterprise">SaaS / Enterprise</option>
                    <option value="Fintech">Fintech</option>
                    <option value="EdTech">EdTech</option>
                    <option value="HealthTech">HealthTech</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="AI / DeepTech">AI / DeepTech</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>One-line Startup Description</label>
                  <input type="text" name="description" value={formData.description} onChange={handleChange} className="form-control" required placeholder="Briefly describe what your startup does in one sentence" />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Website / Social Media Link</label>
                  <input type="url" name="website" value={formData.website} onChange={handleChange} className="form-control" placeholder="https://yourstartup.com" />
                </div>
              </div>

              {/* SECTION 3: Basic Funding Ask */}
              <h3 style={sectionTitleStyle}>Basic Funding Ask</h3>
              <div style={gridStyle}>
                <div className="form-group">
                  <label>Amount Seeking (INR/USD)</label>
                  <input type="text" name="amountSeeking" value={formData.amountSeeking} onChange={handleChange} className="form-control" required placeholder="e.g. 50 Lakhs INR" />
                </div>
                <div className="form-group">
                  <label>Equity Offerings (%)</label>
                  <input type="text" name="equityOfferings" value={formData.equityOfferings} onChange={handleChange} className="form-control" required placeholder="e.g. 10%" />
                </div>
              </div>

              <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  By submitting this form, you are applying for Level 1 screening. If qualified, you will be invited to Stage 2 to provide detailed financials, traction, and business information.
                </p>
                <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ width: '100%', maxWidth: '400px', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? (
                    <>
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <Loader2 size={18} />
                      </motion.div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      Submit Level 1 Application <Send size={18} />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Apply;
