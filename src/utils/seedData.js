export const seedSampleData = () => {
  if (localStorage.getItem('mrhub_seeded_lists')) return;

  const startups = [
    { id: 's1', title: 'AeroDrone Tech', subtitle: 'AgriTech', description: 'Autonomous drones for precision farming and crop health monitoring.', extra: 'Seed Stage' },
    { id: 's2', title: 'MediBlock', subtitle: 'HealthTech', description: 'Blockchain-based unified health records for multi-hospital systems.', extra: 'Pre-Series A' },
    { id: 's3', title: 'QuantumSecure', subtitle: 'Cybersecurity', description: 'Post-quantum cryptography protocols for enterprise networks.', extra: 'Series A' },
    { id: 's4', title: 'EcoPlast', subtitle: 'CleanTech', description: 'Biodegradable packaging solutions derived from agricultural waste.', extra: 'Early Stage' },
  ];

  const investors = [
    { id: 'i1', title: 'Sequoia Capital India', subtitle: 'Venture Capital', extra: 'Lead Investor' },
    { id: 'i2', title: 'Kalaari Capital', subtitle: 'Early-stage VC', extra: 'Co-Investor' },
    { id: 'i3', title: 'Nexus Venture Partners', subtitle: 'Venture Capital', extra: 'Active' },
    { id: 'i4', title: 'Ratan Tata Endowment', subtitle: 'Angel Network', extra: 'Strategic' },
    { id: 'i5', title: 'Blume Ventures', subtitle: 'Micro-VC', extra: 'Seed Fund' }
  ];

  const mentors = [
    { id: 'm1', title: 'Dr. Ramesh Kumar', subtitle: 'AI/ML Expert', description: 'Former VP of Engineering at Google. Specialized in scalable neural networks.' },
    { id: 'm2', title: 'Priya Sharma', subtitle: 'Growth Marketing', description: 'Scaled 3 unicorns from Series A to IPO. Expert in B2B SaaS GTM.' },
    { id: 'm3', title: 'Vikram Singh', subtitle: 'FinTech Founder', description: 'Built and sold PayTech to a major bank for $100M.' },
    { id: 'm4', title: 'Ananya Patel', subtitle: 'Legal Counsel', description: 'Specializes in IP law, term sheets, and cross-border structuring.' },
    { id: 'm5', title: 'Sanjay Reddy', subtitle: 'Operations Specialist', description: 'Helps startups streamline supply chain and logistics.' }
  ];

  const portfolio = [
    { id: 'p1', title: 'FinFlow', subtitle: 'SaaS Platform for SMEs', extra: 'Series B ($15M)' },
    { id: 'p2', title: 'UrbanMobility', subtitle: 'EV Battery Swapping Network', extra: 'Acquired' },
    { id: 'p3', title: 'AgriSense', subtitle: 'IoT Soil Sensors', extra: 'Series A ($5M)' }
  ];

  const resources = [
    { id: 'r1', title: 'Ultimate Pitch Deck Template', subtitle: 'PPTX', description: 'The exact slide structure used by our most successful startups.', extra: '2.4 MB' },
    { id: 'r2', title: 'Standard Term Sheet (SAFE)', subtitle: 'PDF', description: 'Founder-friendly Simple Agreement for Future Equity.', extra: '1.1 MB' },
    { id: 'r3', title: 'Cap Table Calculator', subtitle: 'XLSX', description: 'Model your dilution across multiple funding rounds.', extra: '0.8 MB' }
  ];

  const careers = [
    { id: 'c1', title: 'Venture Associate', subtitle: 'Investments', description: 'Source and evaluate early-stage deep-tech startups.', extra: 'Hyderabad (On-site)' },
    { id: 'c2', title: 'Program Manager - Incubator', subtitle: 'Programs', description: 'Run the day-to-day operations of our 16-week accelerator.', extra: 'Hyderabad (On-site)' },
    { id: 'c3', title: 'Community Lead', subtitle: 'Marketing & Community', description: 'Organize meetups, demo days, and founder mixers.', extra: 'Hybrid' },
    { id: 'c4', title: 'Entrepreneur in Residence', subtitle: 'Innovation', description: 'Build your next startup while advising our current cohort.', extra: 'Remote' }
  ];

  const corporate = [
    { id: 'corp1', title: 'Tech Mahindra', subtitle: 'Strategic IT Partner' },
    { id: 'corp2', title: 'T-Hub', subtitle: 'Ecosystem Partner' },
    { id: 'corp3', title: 'Microsoft for Startups', subtitle: 'Cloud Partner' },
    { id: 'corp4', title: 'AWS Activate', subtitle: 'Infrastructure Partner' }
  ];

  localStorage.setItem('mrhub_list_startups', JSON.stringify(startups));
  localStorage.setItem('mrhub_list_investors', JSON.stringify(investors));
  localStorage.setItem('mrhub_list_mentors', JSON.stringify(mentors));
  localStorage.setItem('mrhub_list_portfolio', JSON.stringify(portfolio));
  localStorage.setItem('mrhub_list_resources', JSON.stringify(resources));
  localStorage.setItem('mrhub_list_careers', JSON.stringify(careers));
  localStorage.setItem('mrhub_list_corporate', JSON.stringify(corporate));

  localStorage.setItem('mrhub_seeded_lists', 'true');
};
