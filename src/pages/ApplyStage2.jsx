import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, ChevronRight, ChevronLeft, CheckCircle, Search, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Pages.css';

const ApplyStage2 = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState('');
  const [verifyError, setVerifyError] = useState('');
  const [verifyLoading, setVerifyLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Massive state object for all 6 sections
  const [formData, setFormData] = useState({
    // Step 1: Founder Info
    education: '', workExperience: '', previousVentures: '', coFounders: '', linkedin: '',
    // Step 2: Business Info
    registrationType: '', incorporationDate: '', businessModel: '', productDescription: '', problemSolved: '', uniqueProposition: '', competitors: '',
    // Step 3: Financials
    revenue: '', profitLoss: '', margins: '', burnRate: '', unitEconomics: '', cac: '', ltv: '', fundingHistory: '',
    // Step 4: Traction
    userNumbers: '', orders: '', growthMetrics: '', partnerships: '', appDownloads: '', repeatCustomers: '',
    // Step 5: Investment Details
    amountRaising: '', equityOffered: '', currentValuation: '', existingInvestors: '',
    // Step 6: Legal
    lawsuits: '', bankruptcy: '', ipOwnership: '', patents: '', legalDisclosures: ''
  });

  const totalSteps = 6;

  const handleVerify = (e) => {
    e.preventDefault();
    setVerifyLoading(true);
    setVerifyError('');

    setTimeout(() => {
      const level1Submissions = JSON.parse(localStorage.getItem('mrhub_submissions') || '[]');
      const userSub = level1Submissions.find(sub => sub.email.toLowerCase() === verifyEmail.toLowerCase());

      if (!userSub) {
        setVerifyError("No Level 1 application found with this email address.");
      } else if (userSub.status === 'Accepted') {
        setIsVerified(true);
        // Pre-fill email so they don't have to retype it later if we add an email field to Stage 2
      } else if (userSub.status === 'Denied') {
        setVerifyError("We're sorry, but your Level 1 application was not selected to proceed.");
      } else {
        setVerifyError("Your Level 1 application is still under review. You will be notified once a decision is made.");
      }
      setVerifyLoading(false);
    }, 800);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const existingSubmissions = JSON.parse(localStorage.getItem('mrhub_submissions_stage2') || '[]');
      const newSubmission = { 
        ...formData, 
        email: verifyEmail, // link it to their email
        id: Date.now(), 
        date: new Date().toLocaleDateString() 
      };
      localStorage.setItem('mrhub_submissions_stage2', JSON.stringify([newSubmission, ...existingSubmissions]));
      
      setSubmitted(true);
      setIsSubmitting(false);
    }, 2000);
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  };

  const renderStepIndicator = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '0.5rem' }}>
      {[...Array(totalSteps)].map((_, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;
        
        return (
          <React.Fragment key={index}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold', fontSize: '0.9rem',
              background: isActive ? 'var(--accent-gradient)' : isCompleted ? '#10b981' : '#f1f5f9',
              color: isActive || isCompleted ? 'white' : '#94a3b8',
              boxShadow: isActive ? '0 4px 10px rgba(255, 77, 0, 0.3)' : 'none',
              transition: 'all 0.3s'
            }}>
              {isCompleted ? <CheckCircle size={20} /> : stepNum}
            </div>
            {stepNum < totalSteps && (
              <div style={{
                width: '40px', height: '4px',
                background: isCompleted ? '#10b981' : '#f1f5f9',
                borderRadius: '2px', transition: 'background 0.3s'
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div className="page-wrapper">
      <header className="page-header" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <motion.h1 
            className="page-title gradient-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: '3rem' }}
          >
            Stage 2: Due Diligence
          </motion.h1>
          <motion.p 
            className="page-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {!isVerified 
              ? "Verify your acceptance to access the Stage 2 application." 
              : "Please provide comprehensive business, financial, and legal information for final evaluation."}
          </motion.p>
        </div>
      </header>

      <section className="content-section" style={{ paddingTop: '0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          
          {!isVerified ? (
            <motion.div 
              className="apply-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem 2rem', textAlign: 'center' }}
            >
              <div style={{ background: 'rgba(255, 77, 0, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--accent-primary)' }}>
                <Lock size={40} />
              </div>
              <h2 className="gradient-text mb-4" style={{ fontSize: '2rem' }}>Verify Eligibility</h2>
              <p className="text-muted mb-4">Enter the email address you used for your Level 1 application to check your status.</p>
              
              <form onSubmit={handleVerify}>
                <div className="form-group">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="founder@startup.com" 
                    value={verifyEmail}
                    onChange={(e) => setVerifyEmail(e.target.value)}
                    required
                    style={{ textAlign: 'center' }}
                  />
                </div>
                {verifyError && <p style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '1rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>{verifyError}</p>}
                
                <button type="submit" className="btn-primary" disabled={verifyLoading} style={{ width: '100%', justifyContent: 'center', opacity: verifyLoading ? 0.7 : 1 }}>
                  {verifyLoading ? <Loader2 size={20} className="spin" /> : <><Search size={20} style={{ marginRight: '0.5rem' }} /> Check Status</>}
                </button>
              </form>
            </motion.div>
          ) : submitted ? (
            <motion.div 
              className="apply-form" 
              style={{ textAlign: 'center', padding: '5rem 3rem' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle size={80} color="#10b981" style={{ margin: '0 auto 1.5rem' }} />
              <h2 className="gradient-text mb-4" style={{ fontSize: '2.5rem' }}>Application Under Review!</h2>
              <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                Your comprehensive Stage 2 application has been securely submitted. Our investment committee will review your traction and financials and reach out to you to schedule an interview.
              </p>
              <Link to="/" className="btn-primary">Return to Home</Link>
            </motion.div>
          ) : (
            <motion.div 
              className="apply-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ maxWidth: '100%', padding: '3rem 2rem' }}
            >
              {renderStepIndicator()}
              
              <form onSubmit={(e) => { e.preventDefault(); if(currentStep === totalSteps) handleSubmit(e); else nextStep(); }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    
                    {/* STEP 1 */}
                    {currentStep === 1 && (
                      <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>1. Founder Information</h3>
                        <div style={gridStyle}>
                          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Educational Background</label>
                            <input type="text" name="education" value={formData.education} onChange={handleChange} className="form-control" required placeholder="e.g. B.Tech from IIT Delhi" />
                          </div>
                          <div className="form-group">
                            <label>Work Experience</label>
                            <input type="text" name="workExperience" value={formData.workExperience} onChange={handleChange} className="form-control" required placeholder="Years and domains" />
                          </div>
                          <div className="form-group">
                            <label>Previous Ventures (if any)</label>
                            <input type="text" name="previousVentures" value={formData.previousVentures} onChange={handleChange} className="form-control" placeholder="Names of past startups" />
                          </div>
                          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Co-founder Details</label>
                            <textarea name="coFounders" value={formData.coFounders} onChange={handleChange} className="form-control" rows="2" placeholder="Names, roles, and backgrounds of co-founders"></textarea>
                          </div>
                          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>LinkedIn Profiles (Comma separated)</label>
                            <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} className="form-control" required placeholder="https://linkedin.com/in/founder" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2 */}
                    {currentStep === 2 && (
                      <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>2. Business Information</h3>
                        <div style={gridStyle}>
                          <div className="form-group">
                            <label>Registration Type</label>
                            <select name="registrationType" value={formData.registrationType} onChange={handleChange} className="form-control" required>
                              <option value="">Select...</option>
                              <option value="Private Limited">Private Limited</option>
                              <option value="LLP">LLP</option>
                              <option value="Sole Proprietorship">Sole Proprietorship</option>
                              <option value="Unregistered">Not yet registered</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Incorporation Date</label>
                            <input type="date" name="incorporationDate" value={formData.incorporationDate} onChange={handleChange} className="form-control" />
                          </div>
                          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Business Model (How do you make money?)</label>
                            <input type="text" name="businessModel" value={formData.businessModel} onChange={handleChange} className="form-control" required placeholder="e.g. B2B SaaS subscription" />
                          </div>
                          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Product/Service Description</label>
                            <textarea name="productDescription" value={formData.productDescription} onChange={handleChange} className="form-control" rows="3" required></textarea>
                          </div>
                          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Problem Being Solved</label>
                            <textarea name="problemSolved" value={formData.problemSolved} onChange={handleChange} className="form-control" rows="2" required></textarea>
                          </div>
                          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Why is your business unique?</label>
                            <textarea name="uniqueProposition" value={formData.uniqueProposition} onChange={handleChange} className="form-control" rows="2" required></textarea>
                          </div>
                          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Competitor Analysis</label>
                            <input type="text" name="competitors" value={formData.competitors} onChange={handleChange} className="form-control" required placeholder="Who are your top 3 competitors?" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 3 */}
                    {currentStep === 3 && (
                      <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>3. Financials</h3>
                        <div style={gridStyle}>
                          <div className="form-group">
                            <label>Current ARR / Revenue</label>
                            <input type="text" name="revenue" value={formData.revenue} onChange={handleChange} className="form-control" required placeholder="e.g. $10,000 MRR" />
                          </div>
                          <div className="form-group">
                            <label>Profit/Loss Status</label>
                            <input type="text" name="profitLoss" value={formData.profitLoss} onChange={handleChange} className="form-control" required placeholder="e.g. Pre-profit, burning $5k/mo" />
                          </div>
                          <div className="form-group">
                            <label>Gross Margins (%)</label>
                            <input type="text" name="margins" value={formData.margins} onChange={handleChange} className="form-control" required placeholder="e.g. 65%" />
                          </div>
                          <div className="form-group">
                            <label>Monthly Burn Rate</label>
                            <input type="text" name="burnRate" value={formData.burnRate} onChange={handleChange} className="form-control" required placeholder="e.g. $8,000" />
                          </div>
                          <div className="form-group">
                            <label>Unit Economics (CM1/CM2)</label>
                            <input type="text" name="unitEconomics" value={formData.unitEconomics} onChange={handleChange} className="form-control" required />
                          </div>
                          <div className="form-group">
                            <label>Customer Acquisition Cost (CAC)</label>
                            <input type="text" name="cac" value={formData.cac} onChange={handleChange} className="form-control" required placeholder="e.g. $50" />
                          </div>
                          <div className="form-group">
                            <label>Lifetime Value (LTV)</label>
                            <input type="text" name="ltv" value={formData.ltv} onChange={handleChange} className="form-control" required placeholder="e.g. $500" />
                          </div>
                          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Funding History</label>
                            <textarea name="fundingHistory" value={formData.fundingHistory} onChange={handleChange} className="form-control" rows="2" placeholder="List past rounds, amounts, and investors if any (or write Bootstrapped)"></textarea>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 4 */}
                    {currentStep === 4 && (
                      <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>4. Traction</h3>
                        <div style={gridStyle}>
                          <div className="form-group">
                            <label>Total Active Users/Customers</label>
                            <input type="text" name="userNumbers" value={formData.userNumbers} onChange={handleChange} className="form-control" required />
                          </div>
                          <div className="form-group">
                            <label>Total Orders/Transactions</label>
                            <input type="text" name="orders" value={formData.orders} onChange={handleChange} className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Month-over-Month Growth (%)</label>
                            <input type="text" name="growthMetrics" value={formData.growthMetrics} onChange={handleChange} className="form-control" required />
                          </div>
                          <div className="form-group">
                            <label>App Downloads (if applicable)</label>
                            <input type="text" name="appDownloads" value={formData.appDownloads} onChange={handleChange} className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Repeat Customer Rate (%)</label>
                            <input type="text" name="repeatCustomers" value={formData.repeatCustomers} onChange={handleChange} className="form-control" required />
                          </div>
                          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Key Partnerships / B2B Contracts</label>
                            <textarea name="partnerships" value={formData.partnerships} onChange={handleChange} className="form-control" rows="2" placeholder="List any notable partnerships or enterprise clients"></textarea>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 5 */}
                    {currentStep === 5 && (
                      <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>5. Investment Details</h3>
                        <div style={gridStyle}>
                          <div className="form-group">
                            <label>Total Amount Raising</label>
                            <input type="text" name="amountRaising" value={formData.amountRaising} onChange={handleChange} className="form-control" required placeholder="e.g. $500,000" />
                          </div>
                          <div className="form-group">
                            <label>Equity Offered</label>
                            <input type="text" name="equityOffered" value={formData.equityOffered} onChange={handleChange} className="form-control" required placeholder="e.g. 10%" />
                          </div>
                          <div className="form-group">
                            <label>Current Valuation (Pre-money)</label>
                            <input type="text" name="currentValuation" value={formData.currentValuation} onChange={handleChange} className="form-control" required placeholder="e.g. $5,000,000" />
                          </div>
                          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Existing Investors in this round (if any)</label>
                            <textarea name="existingInvestors" value={formData.existingInvestors} onChange={handleChange} className="form-control" rows="2" placeholder="Names of lead investors or syndicates already committed"></textarea>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 6 */}
                    {currentStep === 6 && (
                      <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>6. Legal & Disclosures</h3>
                        <div style={gridStyle}>
                          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Pending Lawsuits or Litigations?</label>
                            <select name="lawsuits" value={formData.lawsuits} onChange={handleChange} className="form-control" required>
                              <option value="">Select...</option>
                              <option value="No">No</option>
                              <option value="Yes">Yes (Provide details below)</option>
                            </select>
                          </div>
                          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Bankruptcy History?</label>
                            <select name="bankruptcy" value={formData.bankruptcy} onChange={handleChange} className="form-control" required>
                              <option value="">Select...</option>
                              <option value="No">No</option>
                              <option value="Yes">Yes</option>
                            </select>
                          </div>
                          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>IP Ownership (Is all IP owned by the company?)</label>
                            <select name="ipOwnership" value={formData.ipOwnership} onChange={handleChange} className="form-control" required>
                              <option value="">Select...</option>
                              <option value="Yes">Yes, fully owned by company</option>
                              <option value="No">No, owned by founders/third-party</option>
                            </select>
                          </div>
                          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Patents & Trademarks</label>
                            <input type="text" name="patents" value={formData.patents} onChange={handleChange} className="form-control" placeholder="List any granted or pending patents/trademarks" />
                          </div>
                          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Additional Legal / Criminal Disclosures</label>
                            <textarea name="legalDisclosures" value={formData.legalDisclosures} onChange={handleChange} className="form-control" rows="3" placeholder="Declare any other relevant legal information here. Write 'None' if NA." required></textarea>
                          </div>
                        </div>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
                  {currentStep > 1 ? (
                    <button type="button" onClick={prevStep} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <ChevronLeft size={18} /> Previous
                    </button>
                  ) : <div></div>}

                  {currentStep < totalSteps ? (
                    <button type="button" onClick={nextStep} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      Next Section <ChevronRight size={18} />
                    </button>
                  ) : (
                    <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: isSubmitting ? 0.7 : 1 }}>
                      {isSubmitting ? <><Loader2 size={18} className="spin" /> Submitting...</> : <><Send size={18} /> Final Submit</>}
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ApplyStage2;
