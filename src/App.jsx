import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { seedSampleData } from './utils/seedData';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Ecosystem from './pages/Ecosystem';
import Apply from './pages/Apply';
import ApplyStage2 from './pages/ApplyStage2';
import AdminDashboard from './pages/AdminDashboard';
import Events from './pages/Events';
import EventRegistration from './pages/EventRegistration';
import News from './pages/News';
import GenericPage from './pages/GenericPage';
import PopupAd from './components/PopupAd';

const PageLoader = () => {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(true);
    const timeout = setTimeout(() => {
      setIsNavigating(false);
    }, 400); // Progress bar duration
    
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          initial={{ width: "0%", opacity: 1 }}
          animate={{ width: "100%", opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '4px',
            background: 'var(--accent-gradient)',
            zIndex: 9999,
            boxShadow: '0 0 10px rgba(255, 77, 0, 0.5)'
          }}
        />
      )}
    </AnimatePresence>
  );
};

function App() {
  const [maintenance, setMaintenance] = useState(false);
  const location = useLocation();

  useEffect(() => {
    seedSampleData();
  }, []);

  useEffect(() => {
    const checkSettings = () => {
      const settings = JSON.parse(localStorage.getItem('mrhub_settings') || 'null');
      if (settings && settings.maintenanceMode) {
        setMaintenance(true);
      } else {
        setMaintenance(false);
      }
    };
    checkSettings();
    window.addEventListener('storage', checkSettings);
    return () => window.removeEventListener('storage', checkSettings);
  }, [location.pathname]);

  if (maintenance && location.pathname !== '/asdfghjkl') {
    return (
      <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: '4rem' }}>
          <h1 style={{ fontSize: '3rem', color: 'var(--accent-primary)', marginBottom: '1rem' }}>We'll be right back!</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: '1.6' }}>
            MRHub is currently undergoing scheduled maintenance.<br/>
            Please check back in a few minutes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <PageLoader />
      <PopupAd />
      {/* Global Animated Background Aurora */}
      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>
      <div className="bg-glow glow-3"></div>
      
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/ecosystem" element={<Ecosystem />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/apply/stage2" element={<ApplyStage2 />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/register/:eventId" element={<EventRegistration />} />
          <Route path="/news" element={<News />} />
          <Route path="/asdfghjkl" element={<AdminDashboard />} />
          {/* Dynamic route for all other pages (e.g. from footer links) */}
          <Route path="/:pageName" element={<GenericPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
// Triggering HMR rebuild to resolve ApplyStage2 import
