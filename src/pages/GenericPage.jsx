import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Rocket } from 'lucide-react';
import './Pages.css';

const GenericPage = () => {
  const { pageName } = useParams();
  
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageName]);
  
  const customPages = JSON.parse(localStorage.getItem('mrhub_custom_pages') || '{}');
  const customData = customPages[pageName];
  const listData = JSON.parse(localStorage.getItem(`mrhub_list_${pageName}`) || '[]');

  // Format the URL parameter into a readable title (e.g., "about-us" -> "About Us")
  const defaultTitle = pageName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const title = customData?.isActive && customData?.title ? customData.title : defaultTitle;
  const subtitle = customData?.isActive && customData?.subtitle ? customData.subtitle : "This section of the MRHub ecosystem is currently under active development.";

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div className="container">
          <motion.h1 
            className="page-title gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h1>
          <motion.p 
            className="page-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        </div>
      </header>
      
      <section className="content-section">
        <div className="container">
          {customData && customData.isActive ? (
            <div className="glass-card" style={{ padding: '3rem' }}>
              <div 
                className="custom-content"
                dangerouslySetInnerHTML={{ __html: customData.content }} 
                style={{ lineHeight: '1.8', color: 'var(--text-muted)' }} 
              />
            </div>
          ) : pageName === 'contact' ? (
            <div style={{ display: 'grid', gap: '3rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              <div className="glass-card" style={{ padding: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Get in Touch</h2>
                <p className="text-muted" style={{ marginBottom: '2rem', lineHeight: '1.6' }}>We'd love to hear from you. Whether you have a question about our programs, ecosystem, or anything else, our team is ready to answer all your questions.</p>
                <form className="apply-form" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const msg = {
                    id: Date.now().toString(),
                    name: formData.get('name'),
                    email: formData.get('email'),
                    message: formData.get('message'),
                    date: new Date().toLocaleDateString(),
                    read: false
                  };
                  const inbox = JSON.parse(localStorage.getItem('mrhub_inbox') || '[]');
                  localStorage.setItem('mrhub_inbox', JSON.stringify([msg, ...inbox]));
                  alert('Message sent successfully! We will get back to you soon.');
                  e.target.reset();
                }} style={{ background: 'transparent', padding: 0, boxShadow: 'none' }}>
                  <div className="form-group">
                    <label>Your Name</label>
                    <input type="text" name="name" required className="form-control" placeholder="John Doe" />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" required className="form-control" placeholder="john@example.com" />
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea name="message" required className="form-control" rows="4" placeholder="How can we help?"></textarea>
                  </div>
                  <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Message</button>
                </form>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="glass-card" style={{ padding: '2rem' }}>
                  <h3 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>Visit Us</h3>
                  <p className="text-muted">Malla Reddy University Campus<br/>Maisammaguda, Dhulapally<br/>Hyderabad, Telangana 500100<br/>India</p>
                </div>
                <div className="glass-card" style={{ padding: '2rem' }}>
                  <h3 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>Contact Info</h3>
                  {(() => {
                    const settings = JSON.parse(localStorage.getItem('mrhub_settings') || '{"email":"hello@mrhub.com","phone":"+91 9876543210"}');
                    return (
                      <p className="text-muted">Email: {settings.email}<br/>Phone: {settings.phone}</p>
                    );
                  })()}
                </div>
              </div>
            </div>
          ) : pageName === 'careers' ? (
            <div>
              <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Join Our Mission</h2>
                <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>Help us build the most vibrant startup ecosystem in the country. We are always looking for passionate individuals to join our team.</p>
              </div>
              <div style={{ display: 'grid', gap: '2rem' }}>
                {listData.length > 0 ? listData.map((job) => (
                  <div key={job.id} className="glass-card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h3 style={{ color: 'var(--text-main)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>{job.title}</h3>
                      <p className="text-muted" style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                        <span>{job.subtitle || job.description}</span> {job.extra && <span>• {job.extra}</span>}
                      </p>
                    </div>
                    <button className="btn-secondary">Apply Now</button>
                  </div>
                )) : [
                  { title: "Venture Associate", dept: "Investments", location: "Hyderabad (On-site)", type: "Full-time" },
                  { title: "Program Manager - Incubator", dept: "Programs", location: "Hyderabad (On-site)", type: "Full-time" },
                  { title: "Community Lead", dept: "Marketing & Community", location: "Hybrid", type: "Full-time" }
                ].map((job, i) => (
                  <div key={i} className="glass-card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h3 style={{ color: 'var(--text-main)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>{job.title}</h3>
                      <p className="text-muted" style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                        <span>{job.dept}</span> • <span>{job.location}</span> • <span>{job.type}</span>
                      </p>
                    </div>
                    <button className="btn-secondary">Apply Now</button>
                  </div>
                ))}
              </div>
            </div>
          ) : pageName === 'startups' ? (
            <div style={{ display: 'grid', gap: '3rem' }}>
              <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>For Startups</h2>
                <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>We provide the ultimate launchpad for your startup journey. From ideation to IPO, our ecosystem is designed to accelerate your growth.</p>
              </div>
              <div className="card-grid">
                <div className="glass-card">
                  <h3 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>Incubation</h3>
                  <p className="text-muted">Early-stage support including workspace, mentorship, and initial prototyping grants.</p>
                </div>
                <div className="glass-card">
                  <h3 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>Acceleration</h3>
                  <p className="text-muted">Intensive 16-week program focusing on product-market fit and scale.</p>
                </div>
                <div className="glass-card">
                  <h3 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>Funding Access</h3>
                  <p className="text-muted">Direct introductions to our network of 250+ active angel investors and VCs.</p>
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: listData.length > 0 ? '4rem' : '0' }}>
                <Link to="/apply" className="btn-primary" style={{ display: 'inline-flex' }}>Submit Your Application</Link>
              </div>
              {listData.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-main)', textAlign: 'center' }}>Featured Startups</h3>
                  <div className="card-grid">
                    {listData.map(item => (
                       <div key={item.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                         {item.image ? <img src={item.image} style={{ width: '100%', height: '140px', borderRadius: '8px', objectFit: 'cover', marginBottom: '1rem' }} alt={item.title}/> : <div style={{ width: '100%', height: '140px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', marginBottom: '1rem' }}/>}
                         <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)', fontSize: '1.2rem' }}>{item.title}</h4>
                         <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: 'var(--accent-primary)' }}>{item.subtitle}</p>
                         {item.description && <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.description}</p>}
                         {item.extra && <span style={{ alignSelf: 'flex-start', color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold', background: 'rgba(16, 185, 129, 0.1)', padding: '0.3rem 0.8rem', borderRadius: '20px' }}>● {item.extra}</span>}
                       </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : pageName === 'investors' ? (
            <div style={{ display: 'grid', gap: '3rem' }}>
              <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>For Investors</h2>
                <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>Get exclusive access to pre-vetted, high-growth startups before they hit the broader market.</p>
              </div>
              <div className="glass-card" style={{ padding: '3rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
                  <div style={{ flex: 1, minWidth: '300px' }}>
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Join the MRHub Angel Network</h3>
                    <p className="text-muted" style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>Our dedicated investment syndicate pools capital to write meaningful checks into our top accelerating companies. As a member, you get:</p>
                    <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.5rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                      <li>Early access to deal flow and proprietary due diligence reports.</li>
                      <li>Invitations to exclusive closed-door Demo Days.</li>
                      <li>Co-investment opportunities with institutional VCs.</li>
                    </ul>
                    <button className="btn-primary">Apply as an Investor</button>
                  </div>
                  <div style={{ flex: 1, minWidth: '300px', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '12px' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>$50M+</span>
                      <p className="text-muted">Capital Deployed by Network</p>
                    </div>
                    <div>
                      <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>40+</span>
                      <p className="text-muted">Successful Exits & Follow-on Rounds</p>
                    </div>
                  </div>
                </div>
              </div>
              {listData.length > 0 && (
                <div style={{ marginTop: '2rem' }}>
                  <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-main)', textAlign: 'center' }}>Featured Investors</h3>
                  <div className="card-grid">
                    {listData.map(item => (
                       <div key={item.id} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
                         {item.image ? <img src={item.image} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} alt={item.title}/> : <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}/>}
                         <div>
                           <h4 style={{ margin: '0 0 0.3rem 0', color: 'var(--text-main)' }}>{item.title}</h4>
                           <p style={{ margin: '0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.subtitle} {item.extra && `• ${item.extra}`}</p>
                         </div>
                       </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : pageName === 'mentors' ? (
            <div style={{ display: 'grid', gap: '3rem' }}>
              <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Mentor Network</h2>
                <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>Learn from industry veterans, successful founders, and technical experts.</p>
              </div>
              <div className="card-grid">
                {listData.length > 0 ? listData.map(item => (
                  <div key={item.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', textAlign: 'center' }}>
                    {item.image ? (
                      <img src={item.image} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem', border: '2px solid rgba(255,255,255,0.1)' }} alt={item.title} />
                    ) : (
                      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', marginBottom: '1rem', border: '2px solid rgba(255,255,255,0.1)' }} />
                    )}
                    <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>{item.title}</h3>
                    <p style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{item.subtitle}</p>
                    {item.description && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{item.description}</p>}
                    <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}>Book Session</button>
                  </div>
                )) : [1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', marginBottom: '1rem', border: '2px solid rgba(255,255,255,0.1)' }} />
                    <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Expert Name {i}</h3>
                    <p style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Domain Specialist</p>
                    <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Book Session</button>
                  </div>
                ))}
              </div>
            </div>
          ) : pageName === 'corporate' ? (
            <div>
              <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center', marginBottom: listData.length > 0 ? '3rem' : '0' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Corporate Innovation</h2>
                <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
                  Partner with MRHub to solve your industry challenges by collaborating with top-tier startups. We facilitate pilot programs and strategic investments.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <button className="btn-primary">Become a Partner</button>
                  <button className="btn-secondary">View Case Studies</button>
                </div>
              </div>
              {listData.length > 0 && (
                <div className="card-grid">
                  {listData.map(item => (
                    <div key={item.id} className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      {item.image && <img src={item.image} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'contain', background: '#fff' }} alt={item.title} />}
                      <div>
                        <h3 style={{ color: 'var(--text-main)', marginBottom: '0.3rem', fontSize: '1.2rem' }}>{item.title}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{item.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : ['incubation', 'acceleration', 'academic', 'funding'].includes(pageName) ? (
            <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-main)', textTransform: 'capitalize' }}>{pageName} Track</h2>
              <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
                Explore the details of our {pageName} program. We provide tailored resources, mentorship, and capital to help you succeed at this specific stage of your journey.
              </p>
              <Link to="/apply" className="btn-primary" style={{ display: 'inline-flex' }}>Apply for {pageName}</Link>
            </div>
          ) : pageName === 'portfolio' ? (
            <div style={{ display: 'grid', gap: '3rem' }}>
              <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Hall of Fame</h2>
                <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>Discover the groundbreaking startups that have accelerated through MRHub.</p>
              </div>
              <div className="card-grid">
                {listData.length > 0 ? listData.map(item => (
                  <div key={item.id} className="glass-card" style={{ padding: '2rem' }}>
                    {item.image ? (
                      <img src={item.image} style={{ width: '50px', height: '50px', borderRadius: '12px', objectFit: 'cover', marginBottom: '1.5rem' }} alt={item.title} />
                    ) : (
                      <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--accent-gradient)', marginBottom: '1.5rem' }} />
                    )}
                    <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>{item.title}</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem', lineHeight: '1.6' }}>{item.description || item.subtitle}</p>
                    {item.extra && <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 'bold', background: 'rgba(16, 185, 129, 0.1)', padding: '0.3rem 0.8rem', borderRadius: '20px' }}>● {item.extra}</span>}
                  </div>
                )) : [1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="glass-card" style={{ padding: '2rem' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--accent-gradient)', marginBottom: '1.5rem' }} />
                    <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Startup Alpha {i}</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem', lineHeight: '1.6' }}>Disrupting the industry with AI-driven insights and scalable platforms for enterprise businesses.</p>
                    <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 'bold', background: 'rgba(16, 185, 129, 0.1)', padding: '0.3rem 0.8rem', borderRadius: '20px' }}>● Series A Funded</span>
                  </div>
                ))}
              </div>
            </div>
          ) : pageName === 'resources' ? (
            <div style={{ display: 'grid', gap: '3rem' }}>
              <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Founder Resources</h2>
                <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>Download templates and playbooks to accelerate your startup's growth.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                {listData.length > 0 ? listData.map((res) => (
                  <div key={res.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h4 style={{ color: 'var(--text-main)', marginBottom: '0.3rem', fontSize: '1.1rem' }}>{res.title}</h4>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{res.subtitle} {res.extra && `• ${res.extra}`}</span>
                      {res.description && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0.5rem 0 0 0' }}>{res.description}</p>}
                    </div>
                    <button className="btn-secondary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>Download</button>
                  </div>
                )) : [
                  { name: "Ultimate Pitch Deck Template", type: "PPTX", size: "2.4 MB" },
                  { name: "Standard Term Sheet (SAFE)", type: "PDF", size: "1.1 MB" },
                  { name: "Cap Table Calculator", type: "XLSX", size: "0.8 MB" },
                  { name: "Go-To-Market Playbook", type: "PDF", size: "3.5 MB" }
                ].map((res, i) => (
                  <div key={i} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h4 style={{ color: 'var(--text-main)', marginBottom: '0.3rem', fontSize: '1.1rem' }}>{res.name}</h4>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{res.type} • {res.size}</span>
                    </div>
                    <button className="btn-secondary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>Download</button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem 2rem' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  style={{ display: 'inline-block', marginBottom: '2rem', padding: '1.5rem', background: 'rgba(255, 77, 0, 0.1)', borderRadius: '50%', color: 'var(--accent-primary)' }}
                >
                  <Rocket size={48} />
                </motion.div>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '2.5rem' }}>Coming Soon</h2>
                <p className="text-muted" style={{ marginBottom: '3rem', fontSize: '1.1rem', lineHeight: '1.8' }}>
                  We are working hard to build out the most comprehensive portal for startups. 
                  The <strong>{title}</strong> page will be launching in our next major update. 
                  Stay tuned!
                </p>
                <Link to="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex' }}>
                  <ArrowLeft size={18} /> Return Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GenericPage;
