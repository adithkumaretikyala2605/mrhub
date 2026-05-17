import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './PopupAd.css';

const PopupAd = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    // Load popup data from localStorage
    const storedData = localStorage.getItem('mrhub_popup_ad');
    let data = null;
    
    if (storedData) {
      data = JSON.parse(storedData);
      if (data.buttonLink === '/register') {
        data.buttonLink = '/events/register/1';
        localStorage.setItem('mrhub_popup_ad', JSON.stringify(data));
      }
    } else {
      // Default data
      data = {
        subtitle: 'Announcing',
        titleLine1: "India's Start Up",
        titleLine2: "Mega Expo 2026",
        description: "Join over 10,000 founders, investors, and industry leaders at the largest innovation summit in the country. Secure your spot today!",
        buttonText: "Register Now",
        buttonLink: "/events/register/1",
        isActive: true
      };
      // Save default so admin sees it initially
      localStorage.setItem('mrhub_popup_ad', JSON.stringify(data));
    }
    
    setPopupData(data);

    if (data && data.isActive) {
      // Show the popup after a short delay when the website is opened
      const timer = setTimeout(() => {
        // Check if it has been shown in this session to prevent annoyance on every refresh
        const hasSeenAd = sessionStorage.getItem('mrhub_ad_seen');
        if (!hasSeenAd) {
          setIsOpen(true);
          sessionStorage.setItem('mrhub_ad_seen', 'true');
        }
      }, 1000); // 1 second delay
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="popup-content"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              className="popup-close-btn"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>

            {/* Ad Content */}
            <div style={{ position: 'relative' }}>
              {popupData && (
                <div 
                  className="popup-inner"
                  style={popupData.image ? { backgroundImage: `url(${popupData.image})` } : {}}
                >
                   <h4 className="popup-subtitle">
                     {popupData.subtitle}
                   </h4>
                   <h2 className="popup-title">
                     {popupData.titleLine1}<br/>
                     <span>{popupData.titleLine2}</span>
                   </h2>
                   <p className="popup-desc">
                     {popupData.description}
                   </p>
                   {popupData.buttonText && popupData.buttonLink && (
                     <Link 
                       to={popupData.buttonLink} 
                       onClick={() => setIsOpen(false)}
                       className="popup-btn"
                     >
                       {popupData.buttonText} <ArrowRight size={22} />
                     </Link>
                   )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupAd;
