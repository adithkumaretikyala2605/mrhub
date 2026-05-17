import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Inbox, Lock, Eye, CheckCircle, XCircle, X, Plus, Calendar, Edit, Users } from 'lucide-react';
import './Pages.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'startups', 'events'
  const [submissions, setSubmissions] = useState([]);
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [news, setNews] = useState([]);
  const [inboxMsgs, setInboxMsgs] = useState([]);
  const [siteSettings, setSiteSettings] = useState({ email: 'hello@mrhub.com', phone: '+91 9876543210', linkedin: '', twitter: '', maintenanceMode: false });
  
  // Custom Lists State
  const [listData, setListData] = useState([]);
  const [editingPageSlug, setEditingPageSlug] = useState('portfolio');
  const [showListForm, setShowListForm] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [newItem, setNewItem] = useState({ title: '', subtitle: '', description: '', image: '', extra: '' });
  const pageSlugs = ['startups', 'portfolio', 'investors', 'mentors', 'corporate', 'careers', 'resources'];
  
  // Popup State
  const [popupData, setPopupData] = useState({
    subtitle: '', titleLine1: '', titleLine2: '', description: '', buttonText: '', buttonLink: '', isActive: false
  });
  const [isSavingPopup, setIsSavingPopup] = useState(false);
  
  // Modal states
  const [selectedSub, setSelectedSub] = useState(null);
  const [selectedEventForRegs, setSelectedEventForRegs] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState(null);
  
  // Event Form State
  const [newEvent, setNewEvent] = useState({
    title: '', date: '', location: '', description: '', logo: '',
    formFields: []
  });

  // News Form State
  const [newNewsItem, setNewNewsItem] = useState({
    title: '', date: '', image: '', excerpt: '', content: ''
  });

  useEffect(() => {
    if (sessionStorage.getItem('mrhub_admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
    loadData();

    const handleStorageChange = () => loadData();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadData = () => {
    // Startups
    const level1 = JSON.parse(localStorage.getItem('mrhub_submissions') || '[]');
    const stage2 = JSON.parse(localStorage.getItem('mrhub_submissions_stage2') || '[]');
    const combined = [...level1, ...stage2].sort((a, b) => b.id - a.id);
    const initialized = combined.map(sub => ({ ...sub, status: sub.status || 'Pending' }));
    setSubmissions(initialized);

    // Events
    const storedEvents = JSON.parse(localStorage.getItem('mrhub_events') || '[]');
    if (storedEvents.length === 0) {
        // Seed default
        const defaultEvent = {
          id: "1", title: "India's Start Up Mega Expo 2026", date: "2026", location: "Malla Reddy University",
          description: "Join the biggest gathering of innovative startups, visionary investors, and industry leaders at the India Start Up Mega Expo 2026.",
          logo: "/startup_expo_logo.png",
          formFields: [
            { id: 'f1', label: 'Full Name', type: 'text', required: true },
            { id: 'f2', label: 'Email Address', type: 'email', required: true },
            { id: 'f3', label: 'Ticket Type', type: 'dropdown', options: ['Visitor', 'Exhibitor', 'Investor'], required: true }
          ]
        };
        localStorage.setItem('mrhub_events', JSON.stringify([defaultEvent]));
        setEvents([defaultEvent]);
    } else {
        setEvents(storedEvents);
    }

    // Registrations
    const storedRegs = JSON.parse(localStorage.getItem('mrhub_event_registrations') || '[]');
    setRegistrations(storedRegs);

    // News
    const storedNews = JSON.parse(localStorage.getItem('mrhub_news') || '[]');
    setNews(storedNews);

    // Popup Data
    const storedPopup = localStorage.getItem('mrhub_popup_ad');
    if (storedPopup) {
      let parsed = JSON.parse(storedPopup);
      if (parsed.buttonLink === '/register') {
        parsed.buttonLink = '/events/register/1';
        localStorage.setItem('mrhub_popup_ad', JSON.stringify(parsed));
      }
      setPopupData(parsed);
    } else {
      setPopupData({
        subtitle: 'Announcing',
        titleLine1: "India's Start Up",
        titleLine2: "Mega Expo 2026",
        description: "Join over 10,000 founders, investors, and industry leaders at the largest innovation summit in the country. Secure your spot today!",
        buttonText: "Register Now",
        buttonLink: "/events/register/1",
        isActive: true
      });
    }

    // Default load first list
    const storedList = JSON.parse(localStorage.getItem(`mrhub_list_portfolio`) || '[]');
    setListData(storedList);

    // Inbox & Settings
    const storedInbox = JSON.parse(localStorage.getItem('mrhub_inbox') || '[]');
    setInboxMsgs(storedInbox);
    const storedSettings = JSON.parse(localStorage.getItem('mrhub_settings') || 'null');
    if (storedSettings) setSiteSettings(storedSettings);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('mrhub_admin_auth', 'true');
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('mrhub_admin_auth');
  };

  // --- Startups Management ---
  const saveSubmissions = (updatedList) => {
    const level1 = updatedList.filter(sub => sub.stage === 'Level 1');
    const stage2 = updatedList.filter(sub => sub.stage !== 'Level 1');
    localStorage.setItem('mrhub_submissions', JSON.stringify(level1));
    localStorage.setItem('mrhub_submissions_stage2', JSON.stringify(stage2));
  };

  const handleUpdateStatus = (id, newStatus) => {
    const updated = submissions.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub);
    setSubmissions(updated);
    saveSubmissions(updated);
    if (selectedSub && selectedSub.id === id) setSelectedSub({ ...selectedSub, status: newStatus });
  };

  const handleDeleteSub = (id) => {
    if(window.confirm('Are you sure you want to delete this submission?')) {
      const updated = submissions.filter(sub => sub.id !== id);
      setSubmissions(updated);
      saveSubmissions(updated);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Accepted': return '#10b981';
      case 'Denied': return '#ef4444';
      default: return '#f59e0b';
    }
  };

  // --- Events Management ---
  const saveEvents = (updatedList) => {
    localStorage.setItem('mrhub_events', JSON.stringify(updatedList));
    setEvents(updatedList);
  };

  const handleCreateNewEvent = () => {
    setEditingEventId(null);
    setNewEvent({ title: '', date: '', location: '', description: '', logo: '', formFields: [] });
    setShowEventForm(true);
  };

  const handleEditEvent = (event) => {
    setEditingEventId(event.id);
    setNewEvent({ ...event });
    setShowEventForm(true);
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (editingEventId) {
      const updatedList = events.map(ev => ev.id === editingEventId ? { ...newEvent, id: editingEventId } : ev);
      saveEvents(updatedList);
    } else {
      const newE = { ...newEvent, id: Date.now().toString() };
      saveEvents([newE, ...events]);
    }
    setShowEventForm(false);
    setEditingEventId(null);
    setNewEvent({ title: '', date: '', location: '', description: '', logo: '', formFields: [] });
  };

  const handleDeleteEvent = (id) => {
    if(window.confirm('Are you sure you want to delete this event? This will not delete past registrations.')) {
      saveEvents(events.filter(e => e.id !== id));
    }
  };

  const addFormField = () => {
    setNewEvent({
      ...newEvent,
      formFields: [...newEvent.formFields, { id: 'f' + Date.now(), label: '', type: 'text', required: false }]
    });
  };

  const updateFormField = (index, key, value) => {
    const updatedFields = [...newEvent.formFields];
    updatedFields[index][key] = value;
    setNewEvent({ ...newEvent, formFields: updatedFields });
  };

  const removeFormField = (index) => {
    const updatedFields = [...newEvent.formFields];
    updatedFields.splice(index, 1);
    setNewEvent({ ...newEvent, formFields: updatedFields });
  };

  // --- Image Upload Handler ---
  const handleImageUpload = (e, setter, fieldKey) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(prev => ({ ...prev, [fieldKey]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- News Management ---
  const saveNews = (updatedList) => {
    localStorage.setItem('mrhub_news', JSON.stringify(updatedList));
    setNews(updatedList);
  };

  const handleCreateNewNews = () => {
    setEditingNewsId(null);
    setNewNewsItem({ title: '', date: '', image: '', excerpt: '', content: '' });
    setShowNewsForm(true);
  };

  const handleEditNews = (n) => {
    setEditingNewsId(n.id);
    setNewNewsItem({ ...n });
    setShowNewsForm(true);
  };

  const handleSaveNews = (e) => {
    e.preventDefault();
    if (editingNewsId) {
      const updatedList = news.map(n => n.id === editingNewsId ? { ...newNewsItem, id: editingNewsId } : n);
      saveNews(updatedList);
    } else {
      const n = { ...newNewsItem, id: Date.now().toString() };
      saveNews([n, ...news]);
    }
    setShowNewsForm(false);
    setEditingNewsId(null);
    setNewNewsItem({ title: '', date: '', image: '', excerpt: '', content: '' });
  };

  const handleDeleteNews = (id) => {
    if(window.confirm('Are you sure you want to delete this news article?')) {
      saveNews(news.filter(n => n.id !== id));
    }
  };

  // --- Registrations Management ---
  const handleDeleteRegistration = (id) => {
    if(window.confirm('Delete this registration?')) {
      const updated = registrations.filter(r => r.id !== id);
      setRegistrations(updated);
      localStorage.setItem('mrhub_event_registrations', JSON.stringify(updated));
    }
  };

  // --- Popup Management ---
  const handleSavePopup = (e) => {
    e.preventDefault();
    setIsSavingPopup(true);
    localStorage.setItem('mrhub_popup_ad', JSON.stringify(popupData));
    setTimeout(() => {
      setIsSavingPopup(false);
      alert('Popup Message saved successfully!');
    }, 500);
  };

  // --- Dynamic Lists Management ---
  const handleLoadList = (slug) => {
    setEditingPageSlug(slug);
    const data = JSON.parse(localStorage.getItem(`mrhub_list_${slug}`) || '[]');
    setListData(data);
    setShowListForm(false);
  };

  const handleCreateNewItem = () => {
    setEditingItemId(null);
    setNewItem({ title: '', subtitle: '', description: '', image: '', extra: '' });
    setShowListForm(true);
  };

  const handleEditItem = (item) => {
    setEditingItemId(item.id);
    setNewItem({ ...item });
    setShowListForm(true);
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    let updatedList;
    if (editingItemId) {
      updatedList = listData.map(i => i.id === editingItemId ? { ...newItem, id: editingItemId } : i);
    } else {
      updatedList = [{ ...newItem, id: Date.now().toString() }, ...listData];
    }
    setListData(updatedList);
    localStorage.setItem(`mrhub_list_${editingPageSlug}`, JSON.stringify(updatedList));
    setShowListForm(false);
    setEditingItemId(null);
  };

  const handleDeleteItem = (id) => {
    if(window.confirm('Are you sure you want to delete this item?')) {
      const updatedList = listData.filter(i => i.id !== id);
      setListData(updatedList);
      localStorage.setItem(`mrhub_list_${editingPageSlug}`, JSON.stringify(updatedList));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          className="apply-form" 
          style={{ textAlign: 'center', maxWidth: '400px', padding: '3rem' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Lock size={48} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
          <h2 className="gradient-text mb-4">Admin Access</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input 
                type="password" 
                className="form-control" 
                placeholder="Enter admin password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: '#ff6b6b', fontSize: '0.9rem', marginBottom: '1rem' }}>{error}</p>}
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <header className="page-header" style={{ padding: '6rem 0 3rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 className="page-title gradient-text" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Admin Dashboard</h1>
              <p className="page-subtitle" style={{ margin: 0 }}>Manage platform content</p>
            </div>
            <button onClick={handleLogout} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Logout</button>
          </div>
        </div>
      </header>

      <section className="content-section" style={{ paddingTop: '0' }}>
        <div className="container">
          
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', overflowX: 'auto', whiteSpace: 'nowrap' }}>
            <button 
              onClick={() => { setActiveTab('dashboard'); setShowEventForm(false); setSelectedEventForRegs(null); setShowNewsForm(false); }}
              style={{ background: 'none', border: 'none', color: activeTab === 'dashboard' ? 'var(--accent-primary)' : 'var(--text-muted)', fontSize: '1.1rem', fontWeight: activeTab === 'dashboard' ? 'bold' : 'normal', cursor: 'pointer', padding: '0.5rem 1rem' }}
            >
              Overview
            </button>
            <button 
              onClick={() => { setActiveTab('startups'); setShowEventForm(false); setSelectedEventForRegs(null); setShowNewsForm(false); }}
              style={{ background: 'none', border: 'none', color: activeTab === 'startups' ? 'var(--accent-primary)' : 'var(--text-muted)', fontSize: '1.1rem', fontWeight: activeTab === 'startups' ? 'bold' : 'normal', cursor: 'pointer', padding: '0.5rem 1rem' }}
            >
              Startup Applications
            </button>
            <button 
              onClick={() => { setActiveTab('events'); setShowEventForm(false); setSelectedEventForRegs(null); setShowNewsForm(false); }}
              style={{ background: 'none', border: 'none', color: activeTab === 'events' ? 'var(--accent-primary)' : 'var(--text-muted)', fontSize: '1.1rem', fontWeight: activeTab === 'events' ? 'bold' : 'normal', cursor: 'pointer', padding: '0.5rem 1rem' }}
            >
              Events Management
            </button>
            <button 
              onClick={() => { setActiveTab('news'); setShowEventForm(false); setSelectedEventForRegs(null); setShowNewsForm(false); }}
              style={{ background: 'none', border: 'none', color: activeTab === 'news' ? 'var(--accent-primary)' : 'var(--text-muted)', fontSize: '1.1rem', fontWeight: activeTab === 'news' ? 'bold' : 'normal', cursor: 'pointer', padding: '0.5rem 1rem' }}
            >
              News Management
            </button>
            <button 
              onClick={() => { setActiveTab('popup'); setShowEventForm(false); setSelectedEventForRegs(null); setShowNewsForm(false); }}
              style={{ background: 'none', border: 'none', color: activeTab === 'popup' ? 'var(--accent-primary)' : 'var(--text-muted)', fontSize: '1.1rem', fontWeight: activeTab === 'popup' ? 'bold' : 'normal', cursor: 'pointer', padding: '0.5rem 1rem' }}
            >
              Popup Message
            </button>
            <button 
              onClick={() => { setActiveTab('pages'); setShowEventForm(false); setSelectedEventForRegs(null); setShowNewsForm(false); handleLoadList(editingPageSlug); }}
              style={{ background: 'none', border: 'none', color: activeTab === 'pages' ? 'var(--accent-primary)' : 'var(--text-muted)', fontSize: '1.1rem', fontWeight: activeTab === 'pages' ? 'bold' : 'normal', cursor: 'pointer', padding: '0.5rem 1rem' }}
            >
              Dynamic Directories
            </button>
            <button 
              onClick={() => { setActiveTab('inbox'); setShowEventForm(false); setSelectedEventForRegs(null); setShowNewsForm(false); }}
              style={{ background: 'none', border: 'none', color: activeTab === 'inbox' ? 'var(--accent-primary)' : 'var(--text-muted)', fontSize: '1.1rem', fontWeight: activeTab === 'inbox' ? 'bold' : 'normal', cursor: 'pointer', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Inbox {inboxMsgs.filter(m => !m.read).length > 0 && <span style={{ background: '#ef4444', color: 'white', fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '10px' }}>{inboxMsgs.filter(m => !m.read).length}</span>}
            </button>
            <button 
              onClick={() => { setActiveTab('settings'); setShowEventForm(false); setSelectedEventForRegs(null); setShowNewsForm(false); }}
              style={{ background: 'none', border: 'none', color: activeTab === 'settings' ? 'var(--accent-primary)' : 'var(--text-muted)', fontSize: '1.1rem', fontWeight: activeTab === 'settings' ? 'bold' : 'normal', cursor: 'pointer', padding: '0.5rem 1rem' }}
            >
              Settings
            </button>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            
            {/* DASHBOARD OVERVIEW TAB */}
            {activeTab === 'dashboard' && (
              <div style={{ display: 'grid', gap: '2rem' }}>
                <h3 style={{ margin: 0, color: 'var(--text-main)' }}>Platform Overview</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                    <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '1rem' }}>Total Applications</h4>
                    <span style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{submissions.length}</span>
                  </div>
                  <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                    <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '1rem' }}>Active Events</h4>
                    <span style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{events.length}</span>
                  </div>
                  <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                    <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '1rem' }}>Event Registrations</h4>
                    <span style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{registrations.length}</span>
                  </div>
                  <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                    <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '1rem' }}>Unread Inquiries</h4>
                    <span style={{ fontSize: '3rem', fontWeight: 'bold', color: inboxMsgs.filter(m => !m.read).length > 0 ? '#10b981' : 'var(--text-main)' }}>{inboxMsgs.filter(m => !m.read).length}</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* STARTUPS TAB */}
            {activeTab === 'startups' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h3 style={{ margin: 0, color: 'var(--text-main)' }}>Applications ({submissions.length})</h3>
                </div>
                {submissions.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                    <Inbox size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
                    <p>No applications received yet.</p>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                          <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Date</th>
                          <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Startup</th>
                          <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Stage</th>
                          <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Status</th>
                          <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {submissions.map((sub, index) => (
                          <tr key={sub.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '1rem' }}>{sub.date}</td>
                            <td style={{ padding: '1rem' }}>
                              <strong style={{ color: 'var(--text-main)' }}>{sub.startupName || "N/A"}</strong>
                            </td>
                            <td style={{ padding: '1rem' }}>{sub.stage || 'Stage 2 Due Diligence'}</td>
                            <td style={{ padding: '1rem' }}>
                              <span style={{ color: getStatusColor(sub.status), fontWeight: '600' }}>{sub.status}</span>
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button onClick={() => setSelectedSub(sub)} style={{ color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)', padding: '0.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}><Eye size={18} /></button>
                                <button onClick={() => handleUpdateStatus(sub.id, 'Accepted')} style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}><CheckCircle size={18} /></button>
                                <button onClick={() => handleUpdateStatus(sub.id, 'Denied')} style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}><XCircle size={18} /></button>
                                <button onClick={() => handleDeleteSub(sub.id)} style={{ color: '#64748b', background: 'rgba(100, 116, 139, 0.1)', padding: '0.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {/* EVENTS TAB */}
            {activeTab === 'events' && !selectedEventForRegs && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h3 style={{ margin: 0, color: 'var(--text-main)' }}>Events ({events.length})</h3>
                  {!showEventForm && (
                    <button onClick={handleCreateNewEvent} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Plus size={16} /> Create Event
                    </button>
                  )}
                </div>
                
                {showEventForm && (
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem' }}>
                    <h4 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--text-main)' }}>{editingEventId ? 'Edit Event' : 'Create New Event'}</h4>
                    <form onSubmit={handleSaveEvent} className="apply-form">
                      <div className="form-group">
                        <label>Event Title</label>
                        <input type="text" className="form-control" required value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
                      </div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                          <label>Date</label>
                          <input type="text" className="form-control" required value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} placeholder="e.g. Oct 24, 2026" />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                          <label>Location</label>
                          <input type="text" className="form-control" required value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" required rows="3" value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})}></textarea>
                      </div>
                      <div className="form-group">
                        <label>Upload Logo (optional)</label>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="form-control" 
                          onChange={(e) => handleImageUpload(e, setNewEvent, 'logo')}
                          style={{ padding: '0.4rem' }}
                        />
                        {newEvent.logo && (
                          <div style={{ marginTop: '0.5rem' }}>
                            <img src={newEvent.logo} alt="Preview" style={{ height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                          </div>
                        )}
                      </div>
                      
                      <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <h5 style={{ margin: 0, color: 'var(--text-main)' }}>Registration Form Fields</h5>
                          <button type="button" onClick={addFormField} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>+ Add Field</button>
                        </div>
                        
                        {newEvent.formFields.map((field, index) => (
                          <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                            <div style={{ flex: 2 }}>
                              <input type="text" className="form-control" placeholder="Field Label" value={field.label} onChange={e => updateFormField(index, 'label', e.target.value)} required />
                            </div>
                            <div style={{ flex: 1 }}>
                              <select className="form-control" value={field.type} onChange={e => updateFormField(index, 'type', e.target.value)}>
                                <option value="text">Text</option>
                                <option value="email">Email</option>
                                <option value="phone">Phone</option>
                                <option value="dropdown">Dropdown</option>
                              </select>
                            </div>
                            {field.type === 'dropdown' && (
                              <div style={{ flex: 2 }}>
                                <input type="text" className="form-control" placeholder="Options (comma separated)" 
                                  value={(field.options || []).join(', ')} 
                                  onChange={e => updateFormField(index, 'options', e.target.value.split(',').map(s => s.trim()))} 
                                  required />
                              </div>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                              <input type="checkbox" checked={field.required} onChange={e => updateFormField(index, 'required', e.target.checked)} /> Required
                            </div>
                            <button type="button" onClick={() => removeFormField(index)} style={{ color: '#ff6b6b', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button type="submit" className="btn-primary">Save Event</button>
                        <button type="button" className="btn-secondary" onClick={() => { setShowEventForm(false); setEditingEventId(null); }}>Cancel</button>
                      </div>
                    </form>
                  </div>
                )}

                {!showEventForm && (
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {events.map(event => {
                      const eventRegsCount = registrations.filter(r => r.eventId === event.id).length;
                      return (
                        <div key={event.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>{event.title}</h4>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}><Calendar size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}/> {event.date} • {event.location}</p>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <button onClick={() => setSelectedEventForRegs(event)} style={{ color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.1)', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }} title="View Registrations">
                              <Users size={18} /> {eventRegsCount} Regs
                            </button>
                            <button onClick={() => handleEditEvent(event)} style={{ color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)', padding: '0.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }} title="Edit Event">
                              <Edit size={18} />
                            </button>
                            <button onClick={() => handleDeleteEvent(event.id)} style={{ color: '#ff6b6b', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }} title="Delete Event">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* EVENT REGISTRATIONS SUB-VIEW */}
            {activeTab === 'events' && selectedEventForRegs && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <div>
                    <button onClick={() => setSelectedEventForRegs(null)} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', marginBottom: '1rem', border: 'none' }}>
                      &larr; Back to Events
                    </button>
                    <h3 style={{ margin: 0, color: 'var(--text-main)' }}>{selectedEventForRegs.title} - Registrations</h3>
                  </div>
                </div>
                
                {(() => {
                  const eventRegs = registrations.filter(r => r.eventId === selectedEventForRegs.id);
                  if (eventRegs.length === 0) {
                    return (
                      <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                        <Inbox size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
                        <p>No registrations for this event yet.</p>
                      </div>
                    );
                  }
                  return (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Date Registered</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Registrant Details</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eventRegs.map((reg) => (
                            <tr key={reg.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                              <td style={{ padding: '1rem', verticalAlign: 'top' }}>{reg.date}</td>
                              <td style={{ padding: '1rem' }}>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                  {Object.entries(reg.data || {}).map(([k, v]) => {
                                    // Find field label from event
                                    const field = selectedEventForRegs.formFields?.find(f => f.id === k);
                                    const label = field ? field.label : k;
                                    return (
                                      <div key={k}>
                                        <strong style={{ color: 'var(--text-main)', opacity: 0.8 }}>{label}:</strong> {v}
                                      </div>
                                    );
                                  })}
                                </div>
                              </td>
                              <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                                <button onClick={() => handleDeleteRegistration(reg.id)} style={{ color: '#64748b', background: 'rgba(100, 116, 139, 0.1)', padding: '0.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
              </>
            )}

            {/* NEWS TAB */}
            {activeTab === 'news' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h3 style={{ margin: 0, color: 'var(--text-main)' }}>News Articles ({news.length})</h3>
                  {!showNewsForm && (
                    <button onClick={handleCreateNewNews} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Plus size={16} /> Create News
                    </button>
                  )}
                </div>
                
                {showNewsForm && (
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem' }}>
                    <h4 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--text-main)' }}>{editingNewsId ? 'Edit News' : 'Create New Article'}</h4>
                    <form onSubmit={handleSaveNews} className="apply-form">
                      <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" required value={newNewsItem.title} onChange={e => setNewNewsItem({...newNewsItem, title: e.target.value})} />
                      </div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                          <label>Date</label>
                          <input type="text" className="form-control" required value={newNewsItem.date} onChange={e => setNewNewsItem({...newNewsItem, date: e.target.value})} placeholder="e.g. Oct 24, 2026" />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                          <label>Upload Image (optional)</label>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="form-control" 
                            onChange={(e) => handleImageUpload(e, setNewNewsItem, 'image')}
                            style={{ padding: '0.4rem' }}
                          />
                          {newNewsItem.image && (
                            <div style={{ marginTop: '0.5rem' }}>
                              <img src={newNewsItem.image} alt="Preview" style={{ height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Short Excerpt</label>
                        <textarea className="form-control" required rows="2" value={newNewsItem.excerpt} onChange={e => setNewNewsItem({...newNewsItem, excerpt: e.target.value})}></textarea>
                      </div>
                      <div className="form-group">
                        <label>Full Content (Markdown/Text)</label>
                        <textarea className="form-control" required rows="6" value={newNewsItem.content} onChange={e => setNewNewsItem({...newNewsItem, content: e.target.value})}></textarea>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button type="submit" className="btn-primary">Save News</button>
                        <button type="button" className="btn-secondary" onClick={() => { setShowNewsForm(false); setEditingNewsId(null); }}>Cancel</button>
                      </div>
                    </form>
                  </div>
                )}

                {!showNewsForm && (
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {news.map(n => (
                      <div key={n.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div>
                          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>{n.title}</h4>
                          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{n.date}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <button onClick={() => handleEditNews(n)} style={{ color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)', padding: '0.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }} title="Edit News">
                            <Edit size={18} />
                          </button>
                          <button onClick={() => handleDeleteNews(n.id)} style={{ color: '#ff6b6b', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }} title="Delete News">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {news.length === 0 && (
                      <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>No news articles created yet.</p>
                    )}
                  </div>
                )}
              </>
            )}

            {/* POPUP TAB */}
            {activeTab === 'popup' && (
              <>
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ margin: 0, color: 'var(--text-main)' }}>Edit Homepage Popup Message</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Update the content that appears when visitors open the site.</p>
                </div>
                
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <form onSubmit={handleSavePopup} className="apply-form">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                      <input 
                        type="checkbox" 
                        id="popupActive"
                        checked={popupData.isActive} 
                        onChange={e => setPopupData({...popupData, isActive: e.target.checked})} 
                        style={{ width: '18px', height: '18px' }}
                      /> 
                      <label htmlFor="popupActive" style={{ margin: 0, fontWeight: 'bold', color: popupData.isActive ? '#10b981' : 'var(--text-muted)' }}>
                        Enable Popup on Homepage
                      </label>
                    </div>

                    <div className="form-group">
                      <label>Subtitle (e.g., Announcing)</label>
                      <input type="text" className="form-control" value={popupData.subtitle} onChange={e => setPopupData({...popupData, subtitle: e.target.value})} />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label>Title Line 1</label>
                        <input type="text" className="form-control" value={popupData.titleLine1} onChange={e => setPopupData({...popupData, titleLine1: e.target.value})} />
                      </div>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label>Title Line 2 (Highlighted)</label>
                        <input type="text" className="form-control" value={popupData.titleLine2} onChange={e => setPopupData({...popupData, titleLine2: e.target.value})} />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Upload Popup Image (optional)</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="form-control" 
                        onChange={(e) => handleImageUpload(e, setPopupData, 'image')}
                        style={{ padding: '0.4rem' }}
                      />
                      {popupData.image && (
                        <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <img src={popupData.image} alt="Popup Preview" style={{ height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
                          <button 
                            type="button" 
                            onClick={() => setPopupData({...popupData, image: ''})}
                            style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '0.9rem' }}
                          >
                            Remove Image
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea className="form-control" rows="3" value={popupData.description} onChange={e => setPopupData({...popupData, description: e.target.value})}></textarea>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label>Button Text</label>
                        <input type="text" className="form-control" value={popupData.buttonText} onChange={e => setPopupData({...popupData, buttonText: e.target.value})} placeholder="e.g. Register Now" />
                      </div>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label>Button Link</label>
                        <input type="text" className="form-control" value={popupData.buttonLink} onChange={e => setPopupData({...popupData, buttonLink: e.target.value})} placeholder="e.g. /register or https://..." />
                      </div>
                    </div>
                    
                    <div style={{ marginTop: '2rem' }}>
                      <button type="submit" className="btn-primary" disabled={isSavingPopup} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {isSavingPopup ? 'Saving...' : 'Save Popup Settings'}
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}

            {/* DYNAMIC LISTS TAB */}
            {activeTab === 'pages' && (
              <>
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ margin: 0, color: 'var(--text-main)' }}>Manage Dynamic Directories</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Add or edit individual entries (Startups, Mentors, Investors, etc.) for the public directory pages.</p>
                </div>
                
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1', minWidth: '250px' }}>
                    <div className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                      <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Select Directory</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {pageSlugs.map(slug => {
                          const count = JSON.parse(localStorage.getItem(`mrhub_list_${slug}`) || '[]').length;
                          return (
                            <button
                              key={slug}
                              onClick={() => handleLoadList(slug)}
                              style={{
                                padding: '0.8rem 1rem',
                                textAlign: 'left',
                                background: editingPageSlug === slug ? 'rgba(255, 77, 0, 0.1)' : 'transparent',
                                border: editingPageSlug === slug ? '1px solid var(--accent-primary)' : '1px solid rgba(255,255,255,0.1)',
                                color: editingPageSlug === slug ? 'var(--accent-primary)' : 'var(--text-main)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: editingPageSlug === slug ? 'bold' : 'normal',
                                textTransform: 'capitalize',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}
                            >
                              {slug} List
                              <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{count}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ flex: '2', minWidth: '350px' }}>
                    <div className="glass-card" style={{ padding: '2rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h4 style={{ color: 'var(--text-main)', margin: 0, textTransform: 'capitalize' }}>Editing: {editingPageSlug} Directory</h4>
                        {!showListForm && (
                          <button onClick={handleCreateNewItem} className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Plus size={14} /> Add Item
                          </button>
                        )}
                      </div>

                      {showListForm ? (
                        <form onSubmit={handleSaveItem} className="apply-form" style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px' }}>
                          <h5 style={{ marginTop: 0, marginBottom: '1rem', color: 'var(--accent-primary)' }}>{editingItemId ? 'Edit Item' : 'New Item'}</h5>
                          <div className="form-group">
                            <label>Title (Name, Company, etc.)</label>
                            <input type="text" className="form-control" required value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} />
                          </div>
                          <div className="form-group">
                            <label>Subtitle (Role, Industry, etc.)</label>
                            <input type="text" className="form-control" value={newItem.subtitle} onChange={e => setNewItem({...newItem, subtitle: e.target.value})} />
                          </div>
                          <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control" rows="3" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})}></textarea>
                          </div>
                          <div style={{ display: 'flex', gap: '1rem' }}>
                            <div className="form-group" style={{ flex: 1 }}>
                              <label>Upload Image</label>
                              <input type="file" accept="image/*" className="form-control" onChange={(e) => handleImageUpload(e, setNewItem, 'image')} style={{ padding: '0.4rem' }} />
                              {newItem.image && <img src={newItem.image} alt="Preview" style={{ height: '40px', marginTop: '0.5rem', borderRadius: '4px' }} />}
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                              <label>Extra Tag (e.g. Funding Stage)</label>
                              <input type="text" className="form-control" value={newItem.extra} onChange={e => setNewItem({...newItem, extra: e.target.value})} />
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                            <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Save</button>
                            <button type="button" className="btn-secondary" style={{ padding: '0.5rem 1rem' }} onClick={() => setShowListForm(false)}>Cancel</button>
                          </div>
                        </form>
                      ) : (
                        <div>
                          {listData.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                              <p>No items added to this directory yet.</p>
                              <p style={{ fontSize: '0.9rem' }}>The page will show default placeholder content until you add an item.</p>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                              {listData.map(item => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    {item.image ? (
                                      <img src={item.image} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                                    ) : (
                                      <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--accent-gradient)' }} />
                                    )}
                                    <div>
                                      <h5 style={{ margin: '0 0 0.2rem 0', color: 'var(--text-main)', fontSize: '1rem' }}>{item.title}</h5>
                                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.subtitle}</span>
                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => handleEditItem(item)} style={{ color: '#3b82f6', background: 'rgba(59,130,246,0.1)', border: 'none', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}><Edit size={16} /></button>
                                    <button onClick={() => handleDeleteItem(item.id)} style={{ color: '#ff6b6b', background: 'rgba(239,68,68,0.1)', border: 'none', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* INBOX TAB */}
            {activeTab === 'inbox' && (
              <div>
                <h3 style={{ margin: '0 0 2rem 0', color: 'var(--text-main)' }}>Contact Inquiries</h3>
                {inboxMsgs.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                    <Inbox size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
                    <p>No messages received yet.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {inboxMsgs.map(msg => (
                      <div key={msg.id} className="glass-card" style={{ padding: '1.5rem', borderLeft: msg.read ? '1px solid rgba(255,255,255,0.1)' : '4px solid var(--accent-primary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                          <div>
                            <h4 style={{ margin: '0 0 0.3rem 0', color: 'var(--text-main)' }}>{msg.name}</h4>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{msg.email} • {msg.date}</span>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {!msg.read && (
                              <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => {
                                const updated = inboxMsgs.map(m => m.id === msg.id ? {...m, read: true} : m);
                                setInboxMsgs(updated);
                                localStorage.setItem('mrhub_inbox', JSON.stringify(updated));
                              }}>Mark Read</button>
                            )}
                            <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#ff6b6b', borderColor: 'rgba(239, 68, 68, 0.2)' }} onClick={() => {
                              if (window.confirm('Delete message?')) {
                                const updated = inboxMsgs.filter(m => m.id !== msg.id);
                                setInboxMsgs(updated);
                                localStorage.setItem('mrhub_inbox', JSON.stringify(updated));
                              }
                            }}><Trash2 size={14} /></button>
                          </div>
                        </div>
                        <p style={{ color: 'var(--text-main)', margin: 0, lineHeight: '1.6' }}>{msg.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div>
                <h3 style={{ margin: '0 0 2rem 0', color: 'var(--text-main)' }}>Global Site Settings</h3>
                <div className="glass-card" style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)' }}>
                  <form onSubmit={e => {
                    e.preventDefault();
                    localStorage.setItem('mrhub_settings', JSON.stringify(siteSettings));
                    alert('Settings saved successfully!');
                  }} className="apply-form">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                      <input type="checkbox" id="maintenance" checked={siteSettings.maintenanceMode} onChange={e => setSiteSettings({...siteSettings, maintenanceMode: e.target.checked})} style={{ width: '18px', height: '18px' }} />
                      <label htmlFor="maintenance" style={{ margin: 0, color: '#ff6b6b', fontWeight: 'bold' }}>Enable Maintenance Mode</label>
                    </div>
                    <div className="form-group">
                      <label>Contact Email (displayed in footer/contact page)</label>
                      <input type="email" className="form-control" value={siteSettings.email} onChange={e => setSiteSettings({...siteSettings, email: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Contact Phone</label>
                      <input type="text" className="form-control" value={siteSettings.phone} onChange={e => setSiteSettings({...siteSettings, phone: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>LinkedIn Profile URL</label>
                      <input type="url" className="form-control" value={siteSettings.linkedin} onChange={e => setSiteSettings({...siteSettings, linkedin: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Twitter Profile URL</label>
                      <input type="url" className="form-control" value={siteSettings.twitter} onChange={e => setSiteSettings({...siteSettings, twitter: e.target.value})} />
                    </div>
                    <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                      <button className="btn-primary" type="submit">Save Settings</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Submission Detail Modal (for Startups) */}
      <AnimatePresence>
        {selectedSub && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 99999, padding: '20px'
          }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              style={{
                background: 'white', borderRadius: '20px', width: '100%', maxWidth: '800px',
                maxHeight: '90vh', display: 'flex', flexDirection: 'column',
                boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
              }}
            >
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, color: '#1e293b' }}>{selectedSub.startupName || "Submission Details"}</h3>
                  <span style={{ fontSize: '0.9rem', color: '#64748b' }}>{selectedSub.stage || 'Stage 2 Due Diligence'} • Submitted {selectedSub.date}</span>
                </div>
                <button onClick={() => setSelectedSub(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={24} /></button>
              </div>

              <div style={{ padding: '2rem', overflowY: 'auto', flex: 1, color: '#1e293b' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  {Object.entries(selectedSub).map(([key, value]) => {
                    if (['id', 'status', 'date'].includes(key)) return null;
                    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                    return (
                      <div key={key} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px' }}>
                        <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{label}</span>
                        <p style={{ margin: 0, fontSize: '1rem', fontWeight: '500' }}>{value || <span style={{ color: '#cbd5e1' }}>Not provided</span>}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontWeight: 'bold', color: '#64748b' }}>Status:</span>
                  <span style={{ background: `${getStatusColor(selectedSub.status)}20`, color: getStatusColor(selectedSub.status), padding: '0.3rem 0.8rem', borderRadius: '50px', fontWeight: 'bold' }}>{selectedSub.status}</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={() => handleUpdateStatus(selectedSub.id, 'Denied')} className="btn-secondary" style={{ borderColor: '#ef4444', color: '#ef4444' }}>Deny</button>
                  <button onClick={() => handleUpdateStatus(selectedSub.id, 'Accepted')} className="btn-primary" style={{ background: '#10b981', boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)' }}>Accept</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
