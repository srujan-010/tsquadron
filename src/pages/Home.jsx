import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiArrowRight, FiCheckCircle, FiActivity, FiGlobe, FiShare2, 
  FiMousePointer, FiMail, FiShield, FiCpu, FiTrendingUp, 
  FiPlus, FiMinus, FiDollarSign, FiZap, FiStar, FiHeart, FiBriefcase,
  FiBookOpen, FiShoppingBag, FiLayers, FiAward, FiUsers, FiChevronRight
} from 'react-icons/fi'
import GoogleReviews from '../components/GoogleReviews'

export default function Home({ setActivePage }) {
  // Process step active state
  const [activeStep, setActiveStep] = useState(0)
  
  // FAQ state
  const [openFaq, setOpenFaq] = useState(null)
  
  // Interactive Dashboard Tab State
  const [dashboardTab, setDashboardTab] = useState('seo') // 'seo' | 'ppc' | 'ux'


  const steps = [
    { title: "Research & Audit", desc: "We deep-dive into your competitors, market keywords, search patterns, and current system performance to locate immediate growth gaps.", icon: <FiGlobe size={24} /> },
    { title: "Custom Strategy", desc: "No generic templates. We build an ROI-centric marketing blueprint mapped directly to your commercial metrics and budget structure.", icon: <FiTrendingUp size={24} /> },
    { title: "Agile Execution", desc: "Our squad deploys landing pages, high-converting ad copy, and search authority frameworks with rapid, flawless precision.", icon: <FiZap size={24} /> },
    { title: "Continuous Audit", desc: "A/B testing, landing page optimizations, and bid revisions happen on a daily schedule to keep cost-per-lead low.", icon: <FiActivity size={24} /> },
    { title: "Scale & Growth", desc: "With established high-converting paths, we double-down on high-ROI channels to exponentially amplify traffic and sales.", icon: <FiDollarSign size={24} /> }
  ]

  const faqs = [
    { q: "How long does it take to see positive ROI on campaigns?", a: "PPC, Google Ads, and Paid Social campaigns typically generate sales and hot leads within 24 to 48 hours of launch. Search Engine Optimization (SEO) and organic authority building is an investment that matures progressively, typically delivering exponential organic returns between 3 to 6 months." },
    { q: "Do you integrate with our in-house sales and product teams?", a: "Absolutely. We function as a natural extension of your team. We align our dashboards with your CRMs (HubSpot, Salesforce, etc.) and hold weekly syncs to keep branding and pricing strategies perfectly synchronized." },
    { q: "What primary industries do you service?", a: "TSquadron specializes in high-scale SaaS products, elite service enterprises, high-volume e-commerce, and venture-backed startups looking to grow aggressively." },
    { q: "Do you work with fixed monthly budgets or performance percentages?", a: "We offer flexible models tailored to your business maturity: including fixed monthly retainers for foundational services, and performance-incentivized partnerships for mature scaling budgets." }
  ]

  // Upgraded Service Cards data with exact pre-calculated metrics overlays
  const services = [
    { 
      name: "Digital Marketing", 
      icon: <FiTrendingUp className="text-brand-indigo" size={26} />, 
      desc: "Complete 360° digital growth framework encompassing traffic generation, landing optimization, and email funnels.", 
      metric: "Complete 360° Funnels",
      glowColor: "group-hover:border-brand-indigo/30",
      delay: 0 
    },
    { 
      name: "Search Engine Optimization", 
      icon: <FiGlobe className="text-brand-violet" size={26} />, 
      desc: "Technical schema configurations, content syndication, and high-impact local authority building for high organic ranking.", 
      metric: "+240% Organic Traffic Growth",
      glowColor: "group-hover:border-brand-violet/30",
      delay: 0.1 
    },
    { 
      name: "Social Media Marketing", 
      icon: <FiShare2 className="text-brand-rose" size={26} />, 
      desc: "Viral organic assets, community management, and high-converting creative ad banners targeting active buyers.", 
      metric: "3.2M+ Audience Reach Generated",
      glowColor: "group-hover:border-brand-rose/30",
      delay: 0.2 
    },
    { 
      name: "Pay-Per-Click Advertising", 
      icon: <FiMousePointer className="text-brand-cyan" size={26} />, 
      desc: "High-yield bidding on Google Search, Meta Ads, and LinkedIn Campaign Managers to secure hot, ready-to-convert leads.", 
      metric: "Reduced CAC by 38%",
      glowColor: "group-hover:border-brand-cyan/30",
      delay: 0.3 
    },
    { 
      name: "Email Marketing Funnels", 
      icon: <FiMail className="text-brand-emerald" size={26} />, 
      desc: "Automated sequence flows, cart recovery schedules, and targeted lifecycle retention lists mapping directly to your CRM.", 
      metric: "Boosted Retention Campaigns",
      glowColor: "group-hover:border-brand-emerald/30",
      delay: 0.4 
    },
    { 
      name: "Reputation Management (ORM)", 
      icon: <FiShield className="text-brand-indigo" size={26} />, 
      desc: "Proactive review generation, search result monitoring, and positive brand sentiment amplification to build absolute trust.", 
      metric: "Enhanced Sentiment Index",
      glowColor: "group-hover:border-brand-indigo/30",
      delay: 0.5 
    },
    { 
      name: "Premium Web Design", 
      icon: <FiCpu className="text-brand-violet" size={26} />, 
      desc: "Ultra-fast headless architectures, premium animations, and sleek layouts engineered for lightning speed and stability.", 
      metric: "High-Converting Experiences",
      glowColor: "group-hover:border-brand-violet/30",
      delay: 0.6 
    },
    { 
      name: "Conversion UI/UX Design", 
      icon: <FiZap className="text-brand-rose" size={26} />, 
      desc: "Premium interface design and user flow blueprints mapped to capture intent, reduce friction, and maximize signups.", 
      metric: "Frictionless UI Frameworks",
      glowColor: "group-hover:border-brand-rose/30",
      delay: 0.7 
    }
  ]

  // Industries We Help Scale data
  const industries = [
    { title: "Healthcare", desc: "Patient acquisition pipelines mapping local intent signals.", icon: <FiActivity size={22} />, color: "text-brand-indigo", bg: "bg-brand-indigo/5" },
    { title: "Education", desc: "Scaling enrollment frameworks through authoritative lead funnels.", icon: <FiBookOpen size={22} />, color: "text-brand-violet", bg: "bg-brand-violet/5" },
    { title: "Ecommerce", desc: "Instant conversion checkouts, dynamic retargeting, and cart retention.", icon: <FiShoppingBag size={22} />, color: "text-brand-rose", bg: "bg-brand-rose/5" },
    { title: "Real Estate", desc: "High-ticket investor targeting and geotargeted local search capture.", icon: <FiGlobe size={22} />, color: "text-brand-cyan", bg: "bg-brand-cyan/5" },
    { title: "Restaurants", desc: "Igniting neighborhood foot traffic through viral social awareness.", icon: <FiHeart size={22} />, color: "text-brand-emerald", bg: "bg-brand-emerald/5" },
    { title: "Startups", desc: "Venture-backed growth bidding, user loops, and fast organic scales.", icon: <FiZap size={22} />, color: "text-brand-indigo", bg: "bg-brand-indigo/5" },
    { title: "Corporate Businesses", desc: "Absolute Online Reputation Management and brand authority.", icon: <FiBriefcase size={22} />, color: "text-brand-violet", bg: "bg-brand-violet/5" },
    { title: "Local Retail", desc: "Hyperlocal search schemas capturing instant shopping traffic.", icon: <FiLayers size={22} />, color: "text-brand-rose", bg: "bg-brand-rose/5" }
  ]



  return (
    <div className="relative pt-24 overflow-hidden bg-white text-slate-800">
      
      {/* Dynamic glow overlays */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-brand-violet/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[600px] right-10 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />

      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 z-10">
        
        {/* Soft grid background simulation for depth */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 opacity-60" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side Copy */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/60 backdrop-blur-md"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-indigo opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-indigo"></span>
              </span>
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest font-sans">
                Next-Gen Digital Dominance
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-heading font-extrabold tracking-[-0.04em] text-slate-900 leading-[0.98]"
            >
              We Build <br />
              <span className="bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-cyan bg-clip-text text-transparent">
                Growth Systems
              </span> <br />
              That Drive Real Revenue
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-xl"
            >
              TSquadron is a premium, performance-driven digital agency. We construct aggressive, analytics-guided campaign pipelines that secure search rankings, optimize conversion design, and multiply outbound cash yields.
            </motion.p>

            {/* Mini trust badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-center">
                <span className="text-xs text-brand-label font-sans">Campaigns</span>
                <span className="text-sm font-heading font-bold text-slate-900">100+ Live</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-center">
                <span className="text-xs text-brand-label font-sans">Satisfaction</span>
                <span className="text-sm font-heading font-bold text-slate-900">95% Client</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-center">
                <span className="text-xs text-brand-label font-sans">Strategies</span>
                <span className="text-sm font-heading font-bold text-slate-900">ROI-Focused</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-center">
                <span className="text-xs text-brand-label font-sans">Expertise</span>
                <span className="text-sm font-heading font-bold text-slate-900">Multi-Sector</span>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-start pt-2"
            >
              <button
                onClick={() => {
                  setActivePage('contact')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full font-heading font-semibold text-white bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-indigo shadow-[0_4px_15px_rgba(99,102,241,0.2)] hover:shadow-[0_4px_25px_rgba(99,102,241,0.4)] transition-all duration-300"
              >
                Book Strategy Call <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => {
                  setActivePage('services')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-heading font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/60 border border-slate-200 hover:border-slate-300 transition-all duration-300"
              >
                Explore Services
              </button>
            </motion.div>
          </div>

          {/* Right Side: Animated Premium Dashboard with Tabs */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative w-full flex justify-center z-10"
          >
            {/* Ambient decorative glowing backplates */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo/10 to-brand-cyan/15 blur-3xl rounded-full pointer-events-none -z-10" />

            <div className="relative w-full max-w-[450px] aspect-[4/4.2] rounded-3xl p-[1px] bg-gradient-to-tr from-slate-200/80 via-slate-100 to-slate-300/40 shadow-premium bg-white overflow-hidden border border-slate-100">
              
              {/* Browser control header */}
              <div className="w-full h-10 px-4 flex items-center justify-between border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#facc15]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="w-48 h-4.5 bg-slate-100 rounded flex items-center justify-center">
                  <span className="text-[9px] text-brand-label font-sans tracking-wide">tsquadron.com/metrics</span>
                </div>
                <div className="w-3" />
              </div>

              {/* Dashboard tabs selectors */}
              <div className="flex items-center justify-around border-b border-slate-100 bg-slate-50/40 py-2.5 px-4 text-xs font-heading">
                <button 
                  onClick={() => setDashboardTab('seo')}
                  className={`px-3 py-1 rounded-full transition-all ${dashboardTab === 'seo' ? 'bg-brand-indigo text-white shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}
                >
                  Organic SEO
                </button>
                <button 
                  onClick={() => setDashboardTab('ppc')}
                  className={`px-3 py-1 rounded-full transition-all ${dashboardTab === 'ppc' ? 'bg-brand-violet text-white shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}
                >
                  Paid PPC
                </button>
                <button 
                  onClick={() => setDashboardTab('ux')}
                  className={`px-3 py-1 rounded-full transition-all ${dashboardTab === 'ux' ? 'bg-brand-cyan text-white shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}
                >
                  User Experience
                </button>
              </div>

              {/* Graphic Body */}
              <div className="p-5 space-y-5">
                
                {/* Metric grid depending on active tab */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={dashboardTab}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 gap-3 text-left"
                  >
                    {dashboardTab === 'seo' && (
                      <>
                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm relative overflow-hidden group">
                          <span className="text-[9px] text-brand-label font-sans uppercase tracking-wider block mb-0.5">Organic Search Clicks</span>
                          <span className="text-xl font-heading font-black text-slate-900 block">+240%</span>
                          <span className="text-[9px] text-brand-emerald font-sans font-medium">+14.2% MoM</span>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm relative overflow-hidden group">
                          <span className="text-[9px] text-brand-label font-sans uppercase tracking-wider block mb-0.5">Active Entities Indexed</span>
                          <span className="text-xl font-heading font-black text-slate-900 block">15.4K</span>
                          <span className="text-[9px] text-brand-indigo font-sans font-medium">Authority Pillar</span>
                        </div>
                      </>
                    )}
                    {dashboardTab === 'ppc' && (
                      <>
                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm relative overflow-hidden group">
                          <span className="text-[9px] text-brand-label font-sans uppercase tracking-wider block mb-0.5">Direct Ad Conversion</span>
                          <span className="text-xl font-heading font-black text-slate-900 block">3.8x ROAS</span>
                          <span className="text-[9px] text-brand-emerald font-sans font-medium">Daily Bid Limit Audit</span>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm relative overflow-hidden group">
                          <span className="text-[9px] text-brand-label font-sans uppercase tracking-wider block mb-0.5">Target Acquisition Cost</span>
                          <span className="text-xl font-heading font-black text-slate-900 block">-38% CAC</span>
                          <span className="text-[9px] text-brand-violet font-sans font-medium">ROAS Optimized</span>
                        </div>
                      </>
                    )}
                    {dashboardTab === 'ux' && (
                      <>
                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm relative overflow-hidden group">
                          <span className="text-[9px] text-brand-label font-sans uppercase tracking-wider block mb-0.5">Average Page Load</span>
                          <span className="text-xl font-heading font-black text-slate-900 block">0.42s</span>
                          <span className="text-[9px] text-brand-emerald font-sans font-medium">99.8% Core Web Vitals</span>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm relative overflow-hidden group">
                          <span className="text-[9px] text-brand-label font-sans uppercase tracking-wider block mb-0.5">Lead Funnel Bounce Rate</span>
                          <span className="text-xl font-heading font-black text-slate-900 block">12.5%</span>
                          <span className="text-[9px] text-brand-cyan font-sans font-medium">Frictionless blueprit</span>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* SVG Visual Chart with active data */}
                <div className="w-full h-36 bg-slate-50 rounded-2xl border border-slate-100 p-4 flex flex-col justify-between overflow-hidden relative shadow-sm">
                  <div className="flex items-center justify-between text-[11px] font-heading text-slate-600">
                    <span>Performance Analytics Waveform</span>
                    <span className="text-brand-indigo font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-ping" /> Real-time
                    </span>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    <motion.svg 
                      key={dashboardTab}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      viewBox="0 0 300 100" 
                      className="w-full h-20 overflow-visible"
                    >
                      <defs>
                        <linearGradient id="dashboardGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#163C8C" stopOpacity="0.18"/>
                          <stop offset="100%" stopColor="#5E9CB3" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(15,23,42,0.03)" strokeWidth="1" />
                      <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(15,23,42,0.03)" strokeWidth="1" />
                      <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(15,23,42,0.03)" strokeWidth="1" />
                      
                      {dashboardTab === 'seo' && (
                        <>
                          <path d="M0,80 Q30,60 60,70 T120,40 T180,50 T240,25 T300,10 L300,100 L0,100 Z" fill="url(#dashboardGradient)" />
                          <path d="M0,80 Q30,60 60,70 T120,40 T180,50 T240,25 T300,10" fill="none" stroke="#163C8C" strokeWidth="3" strokeLinecap="round" />
                          <circle cx="300" cy="10" r="5" fill="#163C8C" />
                        </>
                      )}
                      {dashboardTab === 'ppc' && (
                        <>
                          <path d="M0,85 Q30,55 60,45 T120,50 T180,25 T240,30 T300,5 L300,100 L0,100 Z" fill="url(#dashboardGradient)" />
                          <path d="M0,85 Q30,55 60,45 T120,50 T180,25 T240,30 T300,5" fill="none" stroke="#2857A4" strokeWidth="3" strokeLinecap="round" />
                          <circle cx="300" cy="5" r="5" fill="#2857A4" />
                        </>
                      )}
                      {dashboardTab === 'ux' && (
                        <>
                          <path d="M0,75 Q30,65 60,50 T120,55 T180,30 T240,20 T300,12 L300,100 L0,100 Z" fill="url(#dashboardGradient)" />
                          <path d="M0,75 Q30,65 60,50 T120,55 T180,30 T240,20 T300,12" fill="none" stroke="#5E9CB3" strokeWidth="3" strokeLinecap="round" />
                          <circle cx="300" cy="12" r="5" fill="#5E9CB3" />
                        </>
                      )}
                    </motion.svg>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST / CLIENT LOGO MARQUEE */}
      <section className="border-y border-slate-100 bg-slate-50/50 py-10 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
          <span className="text-[11px] font-semibold text-brand-label uppercase tracking-widest font-sans">
            Trusted by growth-focused brands across modern industries
          </span>
        </div>

        {/* Infinite Auto-scrolling Strip */}
        <div className="flex w-[200%] gap-12 overflow-hidden select-none relative">
          <div className="flex justify-around items-center min-w-full shrink-0 gap-16 py-3 animate-marquee">
            {["Quantum Labs", "Veritas Health", "Apex E-com", "Sync Systems", "Spectra SaaS", "Aether Tech", "Nova Media"].map((logo, idx) => (
              <span key={idx} className="text-lg sm:text-xl font-heading font-semibold text-brand-label tracking-wider hover:text-slate-800 transition-colors duration-300">
                {logo}
              </span>
            ))}
          </div>
          <div className="flex justify-around items-center min-w-full shrink-0 gap-16 py-3 animate-marquee" aria-hidden="true">
            {["Quantum Labs", "Veritas Health", "Apex E-com", "Sync Systems", "Spectra SaaS", "Aether Tech", "Nova Media"].map((logo, idx) => (
              <span key={idx+10} className="text-lg sm:text-xl font-heading font-semibold text-brand-label tracking-wider hover:text-slate-800 transition-colors duration-300">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-center">
        
        {/* Soft background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-brand-indigo/5 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            GROWTH PORTFOLIOS
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Comprehensive Scaling Capabilities
          </h2>
          <p className="text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
            We cover the entire consumer lifecycle—from the click that grabs user attention to the optimized transaction pipeline that secures retention.
          </p>
        </div>

        {/* Upgraded Bento Service Cards Grid with results metrics overlays */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {services.map((item, idx) => {
            const getPageRoute = (name) => {
              if (name === "Digital Marketing") return "digital-marketing-agency-hanamkonda"
              if (name === "Search Engine Optimization") return "seo-company-in-hanamkonda"
              if (name === "Social Media Marketing") return "social-media-marketing"
              if (name === "Pay-Per-Click Advertising") return "ppc-services-in-hanamkonda"
              if (name === "Email Marketing Funnels") return "email-marketing-company-hanamkonda"
              if (name === "Reputation Management (ORM)") return "online-reputation-management-services-hanumakonda"
              if (name === "Premium Web Design") return "web-designing-development-company-hanumakonda"
              if (name === "Conversion UI/UX Design") return "ui-ux-designing-company-hanamkonda"
              return null
            }
            const route = getPageRoute(item.name)
            return (
              <div
                key={idx}
                onClick={() => {
                  if (route) {
                    setActivePage(route)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  } else {
                    setActivePage('services')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
                className="group cursor-pointer"
              >
                {/* Custom elevated glass card with top-border accent and metric result */}
                <div 
                  className={`min-h-[290px] h-full p-8 rounded-3xl bg-white border border-slate-100 group-hover:border-slate-200/80 shadow-premium hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden`}
                >
                  {/* Glowing Top-Border Line */}
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 group-hover:text-brand-indigo transition-colors duration-200">
                      {item.name}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Pre-calculated dynamic result metric overlay */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs font-heading font-bold text-brand-indigo block">
                      {item.metric}
                    </span>
                    <span className="text-[10px] font-sans font-semibold text-brand-label group-hover:text-slate-600 transition-colors flex items-center gap-1">
                      Read <FiChevronRight />
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16">
          <button
            onClick={() => {
              setActivePage('services')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-heading font-medium tracking-wide border-b border-slate-300 hover:border-slate-800 pb-1 transition-all duration-300"
          >
            Explore Services Breakdown <FiArrowRight />
          </button>
        </div>
      </section>

      {/* 4. NEW SECTION: INDUSTRIES WE HELP SCALE */}
      <section className="relative border-t border-slate-100 py-24 bg-slate-50/40 overflow-hidden">
        
        {/* Soft floating blur shape */}
        <div className="absolute right-0 top-1/3 w-96 h-96 bg-brand-violet/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
              OPERATIONAL HORIZONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
              Industries We Help Scale
            </h2>
            <p className="text-slate-600 text-sm font-sans max-w-xl mx-auto leading-relaxed">
              We translate direct marketing pipelines and complex conversion blueprints into major growth vectors across diverse markets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-100 hover:border-slate-200/80 shadow-premium hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 text-left group"
              >
                <div className={`w-10 h-10 rounded-xl ${ind.bg} flex items-center justify-center shrink-0 shadow-sm relative group-hover:scale-105 transition-transform duration-300 ${ind.color}`}>
                  {ind.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-slate-900 text-sm">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* 6. WHY CHOOSE US & STATS SECTION */}
      <section className="relative border-t border-slate-100 py-24 bg-slate-50/40 overflow-hidden z-10">
        
        {/* Glowing background */}
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-brand-indigo/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Why Choose Copy */}
            <div className="lg:col-span-6 text-left space-y-6">
              <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans">
                ROI FRAMEWORKS
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
                Designed for Absolute Market Capture
              </h2>
              <p className="text-slate-600 font-sans leading-relaxed">
                Most agencies focus on raw traffic numbers. TSquadron focuses on cash revenue. We run our organization on data metrics that matter directly to your executive suite.
              </p>
              <div className="space-y-4 pt-4">
                {[
                  "100% Campaign Performance Accountability",
                  "Agile & Fast Execution Protocols",
                  "Analytics-Guided Bid Bounding Rules",
                  "Expert Copywriters & Conversion Optimizers"
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FiCheckCircle className="text-brand-emerald shrink-0" size={18} />
                    <span className="text-sm text-slate-700 font-sans">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Counter Grid */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "350+", label: "Successful Projects Deployments", color: "from-brand-indigo to-brand-violet" },
                  { value: "99%", label: "Verified Customer Satisfaction Rate", color: "from-brand-indigo to-brand-cyan" },
                  { value: "100%", label: "Average Growth in Search ROI", color: "from-brand-violet to-brand-rose" },
                  { value: "8+", label: "Years Combined Elite Marketing Experience", color: "from-brand-rose to-brand-emerald" }
                ].map((stat, idx) => (
                  <div 
                    key={idx}
                    className="p-4 sm:p-8 rounded-3xl bg-white border border-slate-100 text-left relative overflow-hidden group shadow-premium hover:shadow-md transition-all duration-300"
                  >
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-transparent via-brand-indigo to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className={`text-3xl sm:text-5xl font-heading font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent block mb-2`}>
                      {stat.value}
                    </span>
                    <span className="text-slate-600 text-xs sm:text-sm font-sans tracking-wide leading-relaxed block">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. PROCESS PIPELINE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-center border-t border-slate-100">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            CAMPAIGN LIFECYCLES
          </span>
          <p className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            The TSquadron Growth Pipeline
          </p>
          <p className="text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
            Our systematic, continuous optimization framework guarantees clean pipeline transitions and constant campaign growth.
          </p>
        </div>

        {/* Process Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-heading font-medium text-sm transition-all duration-300 ${ activeStep === idx ? 'bg-gradient-to-r from-brand-indigo to-brand-violet text-white shadow-md shadow-indigo-950/10' : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60' }`}
            >
              <span className="text-xs opacity-75">0{idx + 1}.</span> {step.title}
            </button>
          ))}
        </div>

        {/* Tab content wrapper */}
        <div className="max-w-4xl mx-auto min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="p-6 sm:p-12 rounded-3xl bg-white border border-slate-100 text-left flex flex-col md:flex-row items-start md:items-center gap-8 relative overflow-hidden shadow-premium"
            >
              {/* Floating ambient glow in container */}
              <div className="absolute right-0 top-0 w-60 h-60 bg-brand-cyan/5 rounded-full blur-[60px] pointer-events-none" />

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-indigo to-brand-cyan p-[1px] shrink-0">
                <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center text-brand-indigo">
                  {steps[activeStep].icon}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900">
                  {steps[activeStep].title}
                </h3>
                <p className="text-slate-600 font-sans leading-relaxed text-base sm:text-lg">
                  {steps[activeStep].desc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>



      {/* 9. FAQ ACCORDION & LEFT SUPPORT CARD SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10 border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Premium Support Illustrative Info card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col justify-between space-y-8 relative overflow-hidden shadow-inner text-left">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-indigo/5 rounded-full blur-[60px] pointer-events-none" />
            
            <div className="space-y-4">
              <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
                DIRECT CHANNELS
              </span>
              <h3 className="text-2xl font-heading font-extrabold text-slate-900 leading-tight">
                Looking for Specific Campaign Answers?
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
                Contact our Warangal operational team to discuss exact schema codes, local indexes, or conversion bluepriting custom timelines.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-white border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-indigo/5 text-brand-indigo flex items-center justify-center">
                  <FiUsers size={16} />
                </div>
                <span className="text-xs text-slate-600 font-sans">Average response: under 2 hours</span>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-violet/5 text-brand-violet flex items-center justify-center">
                  <FiAward size={16} />
                </div>
                <span className="text-xs text-slate-600 font-sans">Full project strategy blueprint in 24h</span>
              </div>
            </div>

            <button 
              onClick={() => {
                setActivePage('contact')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="w-full py-4 rounded-full font-heading font-semibold text-white bg-gradient-to-tr from-brand-indigo to-brand-violet hover:shadow-lg hover:shadow-brand-indigo/10 transition-all duration-300"
            >
              Get Free Consulting Audit
            </button>
          </div>

          {/* Right Column: Custom FAQ Accordion */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
                YOUR INQUIRIES ANSWERED
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
                Frequently Answered Insights
              </h2>
            </div>

            <div className="space-y-4 pt-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx
                return (
                  <div 
                    key={idx}
                    className="rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-premium transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left font-heading font-semibold text-sm sm:text-base text-slate-800 hover:bg-slate-50 transition-colors focus:outline-none"
                    >
                      <span>{faq.q}</span>
                      <span className="text-brand-indigo ml-4 shrink-0 transition-transform duration-300">
                        {isOpen ? <FiMinus size={18} /> : <FiPlus size={18} />}
                      </span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-6 text-slate-600 text-xs sm:text-sm font-sans leading-relaxed border-t border-slate-100 pt-4">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 9.5 GOOGLE REVIEWS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-t border-slate-100 bg-slate-50/20">
        <GoogleReviews />
      </section>

      {/* 10. FINAL HIGH-CONVERSION CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 text-center">
        
        {/* Soft background shape */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-brand-indigo/15 to-brand-cyan/15 rounded-full blur-[140px] -z-10 pointer-events-none animate-pulse" />
        
        <div className="p-8 sm:p-16 rounded-[32px] bg-gradient-to-br from-[#163C8C] via-[#2857A4] to-[#3569B3] text-white border border-white/15 shadow-hover-glow relative overflow-hidden text-center space-y-8 group">
          {/* Subtle grid patterns */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          
          {/* Ambient light glow */}
          <div className="absolute -top-24 -left-24 w-[350px] h-[350px] bg-white/5 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-[350px] h-[350px] bg-brand-cyan/20 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white glow-text-blue">
              Ready To Turn Your Brand Into A Growth Machine?
            </h2>
            <p className="text-slate-100/90 text-sm sm:text-base font-sans max-w-xl mx-auto leading-relaxed">
              Partner with TSquadron to build scalable digital systems that increase visibility, conversions, and long-term business growth.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 max-w-md mx-auto">
            <button 
              onClick={() => {
                setActivePage('contact')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-semibold text-brand-indigo bg-white hover:bg-slate-50 transition-all duration-300 shadow-premium hover:scale-[1.03] active:scale-[0.98]"
            >
              Book Strategy Call
            </button>
            <button 
              onClick={() => {
                setActivePage('services')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:scale-[1.03] active:scale-[0.98]"
            >
              Explore Services
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
