import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import './Pages.css';

const EventRegistration = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Load event from localStorage
    const storedEvents = JSON.parse(localStorage.getItem('mrhub_events') || '[]');
    const foundEvent = storedEvents.find(e => e.id.toString() === eventId);
    
    if (foundEvent) {
      setEvent(foundEvent);
      // Initialize form data
      const initialData = {};
      (foundEvent.formFields || []).forEach(field => {
        initialData[field.id] = '';
      });
      setFormData(initialData);
    }
  }, [eventId]);

  const handleChange = (e, fieldId) => {
    setFormData({
      ...formData,
      [fieldId]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const registration = {
      id: Date.now().toString(),
      eventId: event.id,
      eventTitle: event.title,
      date: new Date().toLocaleDateString(),
      data: formData
    };

    const existingRegs = JSON.parse(localStorage.getItem('mrhub_event_registrations') || '[]');
    localStorage.setItem('mrhub_event_registrations', JSON.stringify([registration, ...existingRegs]));
    
    setSubmitted(true);
  };

  if (!event) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Event Not Found</h2>
          <Link to="/events" className="btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>Back to Events</Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <motion.div 
          className="glass-card" 
          style={{ textAlign: 'center', maxWidth: '500px', padding: '3rem 2rem' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 1.5rem' }} />
          <h2 style={{ marginBottom: '1rem' }}>Registration Successful!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Thank you for registering for <strong>{event.title}</strong>. We have received your details.
          </p>
          <Link to="/events" className="btn-primary" style={{ textDecoration: 'none' }}>
            Browse More Events
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <header className="page-header" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <Link to="/events" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2rem' }}>
            <ArrowLeft size={16} /> Back to Events
          </Link>
          <motion.h1 
            className="page-title gradient-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Register for Event
          </motion.h1>
          <motion.p 
            className="page-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {event.title}
          </motion.p>
        </div>
      </header>

      <section className="content-section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="glass-card" style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
               {event.logo && <img src={event.logo} alt={event.title} style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', padding: '0.5rem' }} />}
               <div>
                 <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{event.title}</h2>
                 <p style={{ color: 'var(--text-muted)', margin: 0 }}>{event.date} • {event.location}</p>
               </div>
            </div>

            <form onSubmit={handleSubmit} className="apply-form">
              {(!event.formFields || event.formFields.length === 0) ? (
                <p style={{ color: 'var(--text-muted)' }}>No registration fields required for this event.</p>
              ) : (
                event.formFields.map((field) => (
                  <div className="form-group" key={field.id}>
                    <label>
                      {field.label} {field.required && <span style={{ color: '#ef4444' }}>*</span>}
                    </label>
                    {field.type === 'dropdown' ? (
                      <select 
                        className="form-control"
                        required={field.required}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleChange(e, field.id)}
                      >
                        <option value="">Select {field.label}</option>
                        {(field.options || []).map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input 
                        type={field.type === 'email' ? 'email' : (field.type === 'phone' ? 'tel' : 'text')}
                        className="form-control"
                        required={field.required}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleChange(e, field.id)}
                        placeholder={`Enter ${field.label}`}
                      />
                    )}
                  </div>
                ))
              )}
              
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '1rem' }}>
                Complete Registration
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventRegistration;
