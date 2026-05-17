import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import './Pages.css';

const defaultEvent = {
  id: "1",
  title: "India's Start Up Mega Expo 2026",
  date: "2026",
  location: "Malla Reddy University",
  description: "Join the biggest gathering of innovative startups, visionary investors, and industry leaders at the India Start Up Mega Expo 2026. Showcase your products, pitch your ideas, and network with the best in the ecosystem.",
  logo: "/startup_expo_logo.png",
  formFields: [
    { id: 'f1', label: 'Full Name', type: 'text', required: true },
    { id: 'f2', label: 'Email Address', type: 'email', required: true },
    { id: 'f3', label: 'Startup Name', type: 'text', required: false },
    { id: 'f4', label: 'Ticket Type', type: 'dropdown', options: ['Visitor', 'Exhibitor', 'Investor'], required: true }
  ]
};

const Events = () => {
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedEvents = localStorage.getItem('mrhub_events');
    if (!storedEvents) {
      // Seed default event if none exist
      localStorage.setItem('mrhub_events', JSON.stringify([defaultEvent]));
      setEventsList([defaultEvent]);
    } else {
      setEventsList(JSON.parse(storedEvents));
    }
  }, []);

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
            Ecosystem Events
          </motion.h1>
          <motion.p 
            className="page-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover, participate, and network at premier startup events.
          </motion.p>
        </div>
      </header>

      <section className="content-section">
        <div className="container">
          <div className="events-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {eventsList.map((event, index) => (
              <motion.div 
                key={event.id}
                className="glass-card event-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '150px',
                  height: '150px',
                  background: 'var(--accent-gradient)',
                  filter: 'blur(80px)',
                  opacity: '0.2',
                  borderRadius: '50%',
                  zIndex: 0
                }} />
                
                <div style={{ zIndex: 1, display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  {event.logo && <img src={event.logo} alt={event.title} style={{ width: '90px', height: '90px', objectFit: 'contain', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', border: '1px solid rgba(255, 255, 255, 0.1)' }} />}
                  <div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--text-light)', lineHeight: '1.3' }}>{event.title}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <Calendar size={16} color="var(--accent-primary)" /> {event.date}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <MapPin size={16} color="var(--accent-primary)" /> {event.location}
                      </span>
                    </div>
                  </div>
                </div>

                <p style={{ zIndex: 1, color: 'var(--text-muted)', lineHeight: '1.6', flexGrow: 1 }}>
                  {event.description}
                </p>

                <div style={{ zIndex: 1, marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Link to={`/events/register/${event.id}`} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', width: '100%', justifyContent: 'center' }}>
                    Register Now <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
            
            {eventsList.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                No events found.
              </div>
            )}
          </div>

          <div style={{ marginTop: '5rem' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-main)', textAlign: 'center' }}>Types of Events We Host</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>Demo Days</h4>
                <p className="text-muted" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                  Bi-annual flagship events where our top accelerating startups pitch to a curated room of over 200 angel investors, micro-VCs, and corporate innovation heads.
                </p>
              </div>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>Hackathons</h4>
                <p className="text-muted" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                  48-hour intense coding sprints sponsored by our corporate partners. Solve real-world problem statements, win cash prizes, and potentially get fast-tracked into our incubation program.
                </p>
              </div>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>Founder Mixers</h4>
                <p className="text-muted" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                  Exclusive networking evenings designed for serendipitous collisions. Meet potential co-founders, share war stories with alumni, and build your support system.
                </p>
              </div>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>Masterclasses</h4>
                <p className="text-muted" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                  Deep-dive tactical workshops led by industry experts covering topics like GTM strategy, B2B sales scaling, term sheet negotiation, and performance marketing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
