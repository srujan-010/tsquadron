import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiCheck, FiUsers, FiAward, FiTarget, FiCompass, FiTwitter, FiLinkedin, FiMail,
  FiArrowRight, FiShield, FiHeart, FiCpu, FiZap, FiMousePointer, FiTrendingUp,
  FiActivity, FiGlobe, FiLayers, FiMapPin, FiPhone, FiChevronRight
} from 'react-icons/fi'

export default function About({ setActivePage }) {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    // 1. Dynamic SEO Metadata Update
    // [SEO Manager Override] document.title = "About TSquadron | Premium Digital Marketing Company"
    
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = "description"
      document.head.appendChild(metaDescription)
    }
    metaDescription.content = "Learn about TSquadron — a Hyderabad & Warangal-based digital marketing and web solutions company helping brands grow through SEO, UI/UX, web development, and performance marketing."

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Floating Pills stats data
  const floatingStats = [
    { label: "Successful Campaigns", count: "100+" },
    { label: "Brands Scaled", count: "50+" },
    { label: "Client Satisfaction", count: "95%" }
  ]

  // Pillars Story data
  const pillars = [
    { title: "Brand Strategy", desc: "Forging clear definitions of authority to ignite sales.", color: "from-brand-indigo/10 to-brand-indigo/5", border: "hover:border-brand-indigo/30", text: "text-brand-indigo", icon: <FiTarget size={20} /> },
    { title: "Digital Growth", desc: "Expanding operational search reach aggressively.", color: "from-brand-violet/10 to-brand-violet/5", border: "hover:border-brand-violet/30", text: "text-brand-violet", icon: <FiTrendingUp size={20} /> },
    { title: "UI/UX Innovation", desc: "Frictionless blueprints built for scalable design.", color: "from-brand-cyan/10 to-brand-cyan/5", border: "hover:border-brand-cyan/30", text: "text-brand-cyan", icon: <FiLayers size={20} /> },
    { title: "Performance Marketing", desc: "Converting traffic lists through behavioral flows.", color: "from-brand-rose/10 to-brand-rose/5", border: "hover:border-brand-rose/30", text: "text-brand-rose", icon: <FiZap size={20} /> }
  ]

  // Why choose details
  const whyChooseUs = [
    { title: "Strategic Brand Positioning", desc: "We structure brand blueprints that establish clear commercial category authority from day one.", icon: <FiTarget size={24} />, color: "text-brand-indigo" },
    { title: "SEO-Focused Growth", desc: "Aggressive keyword indexing, entity semantic trees, and custom schemas designed to drive search clicks.", icon: <FiTrendingUp size={24} />, color: "text-brand-violet" },
    { title: "High-Converting UI/UX", desc: "Responsive visual environments designed meticulously using Figma system kits and custom front-ends.", icon: <FiLayers size={24} />, color: "text-brand-cyan" },
    { title: "Creative Marketing Campaigns", desc: "Igniting user desires via dynamic content cycles, custom videos, and tailored social channels.", icon: <FiHeart size={24} />, color: "text-brand-rose" },
    { title: "Performance-Driven Approach", desc: "We monitor actual lead flows and return on ad spend, rather than useless vanity counts.", icon: <FiActivity size={24} />, color: "text-brand-emerald" },
    { title: "Modern Web Experiences", desc: "High-speed front-ends built with robust frameworks for frictionless loading on all devices.", icon: <FiCpu size={24} />, color: "text-brand-indigo" }
  ]

  // Services list mapping
  const servicesList = [
    { title: "Search Engine Optimization (SEO)", id: "seo-company-in-hanamkonda", desc: "Climb keyword ladders, build backlinks, and capture ready-to-buy organic intent traffic.", icon: <FiTrendingUp size={24} />, color: "from-brand-indigo to-brand-violet" },
    { title: "Pay-Per-Click (PPC)", id: "ppc-services-in-hanamkonda", desc: "Frictionless direct response PPC setups optimized for conversion volume and low acquisition costs.", icon: <FiMousePointer size={24} />, color: "from-brand-violet to-brand-rose" },
    { title: "Social Media Marketing", id: "social-media-marketing", desc: "Ignite awareness, engagement, and audience desire across key organic networks.", icon: <FiHeart size={24} />, color: "from-brand-rose to-brand-cyan" },
    { title: "Email Marketing", id: "email-marketing-company-hanamkonda", desc: "Personalized subject lines, automation maps, and behavioral flows designed to multiply retention.", icon: <FiMail size={24} />, color: "from-brand-cyan to-brand-indigo" },
    { title: "Online Reputation Management", id: "online-reputation-management-services-hanumakonda", desc: "Audit search sentiment, address negative comments, and establish absolute corporate trust.", icon: <FiShield size={24} />, color: "from-brand-emerald to-brand-indigo" },
    { title: "Web Designing & Web Development", id: "web-designing-development-company-hanumakonda", desc: "Agile page architectures, lightning-fast React systems, and premium design standards.", icon: <FiCpu size={24} />, color: "from-brand-indigo to-brand-cyan" },
    { title: "UI/UX Designing", id: "ui-ux-designing-company-hanamkonda", desc: "Conversion layouts, wireframe maps, and state-of-the-art interactive component suites.", icon: <FiLayers size={24} />, color: "from-brand-cyan to-brand-rose" }
  ]

  // Steps in process
  const steps = [
    { title: "Research & Strategy", desc: "Analyzing competitor keywords, audience targets, and current brand visibility gaps." },
    { title: "Brand Positioning", desc: "Structuring unique messaging vectors that establish authoritative category leadership." },
    { title: "Design & Development", desc: "Coding responsive, lightweight interfaces backed by custom design system tokens." },
    { title: "Marketing & Optimization", desc: "Launching paid channels, SEO blueprints, and real-time bid audits for high performance." },
    { title: "Growth & Scaling", desc: "Analyzing actual analytics models to continuously multiply monthly conversions." }
  ]

  // Testimonials
  const testimonials = [
    { text: "TSquadron completely rebuilt our search visibility. Their SEO and UI/UX solutions transformed our organic conversion rate in a matter of weeks.", client: "VP of Product, SaaS Hub", metric: "+180% Organic Traffic" },
    { text: "Their performance campaigns deliver real growth metrics. We've scaled our brand globally while maintaining positive client acquisition metrics.", client: "Founder, Fintech Direct", metric: "3.8x ROI Managed" },
    { text: "Outstanding design system blueprints! Our web front-end is insanely fast and has significantly resolved mobile check-out friction.", client: "CTO, Retail Global", metric: "95% Customer NPS" }
  ]

  return (
    <div className="relative pt-24 overflow-hidden bg-white text-slate-800">
      
      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 z-10">
        
        {/* Soft floating background visual elements */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-brand-indigo/10 to-brand-violet/5 rounded-full blur-[140px] -z-10 pointer-events-none animate-pulse" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Heading and description */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/60 backdrop-blur-md">
              <span className="text-[10px] font-bold text-brand-indigo uppercase tracking-widest font-sans">
                ABOUT TSQUADRON
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-slate-900 leading-tight tracking-tight">
              Building Digital Brands <br />
              <span className="bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-cyan bg-clip-text text-transparent">
                That Create Impact
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl">
              TSquadron creates and defines powerful brand identities, strategically expands businesses in digital markets, and drives measurable online growth through innovative digital experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button 
                onClick={() => {
                  if (setActivePage) setActivePage('contact')
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-semibold text-white bg-gradient-to-tr from-brand-indigo to-brand-violet hover:shadow-lg hover:shadow-brand-indigo/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Get Started <FiArrowRight />
              </button>
              <button 
                onClick={() => {
                  if (setActivePage) setActivePage('contact')
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/60 border border-slate-200/80 transition-all flex items-center justify-center gap-2"
              >
                Contact Our Team
              </button>
            </div>
          </div>

          {/* Right Column: Layered Premium Agency Workspace Visualizations */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Main Premium Card Visual representation */}
            <div className="w-full aspect-[4/3] rounded-3xl bg-slate-50 border border-slate-100/80 shadow-premium p-6 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo/5 via-transparent to-brand-violet/5 group-hover:scale-105 transition-transform duration-500" />
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[10px] font-sans font-semibold text-brand-label uppercase tracking-widest">
                  WORKSPACE INTEGRATION
                </span>
              </div>

              {/* Graphic element simulation of collaboration dashboards */}
              <div className="space-y-4 my-6 relative z-10 flex-grow flex flex-col justify-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center text-brand-indigo shadow-sm">
                    <FiLayers size={18} />
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="h-2 bg-slate-200 rounded w-2/3" />
                    <div className="h-1.5 bg-slate-100 rounded w-1/2" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center text-brand-cyan shadow-sm">
                    <FiCpu size={18} />
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="h-2 bg-slate-200 rounded w-3/4" />
                    <div className="h-1.5 bg-slate-100 rounded w-1/3" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center text-brand-rose shadow-sm">
                    <FiTrendingUp size={18} />
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="h-2 bg-slate-200 rounded w-1/2" />
                    <div className="h-1.5 bg-slate-100 rounded w-2/3" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4 relative z-10 text-[10px] text-brand-label font-sans">
                <span>TSQUADRON DIGITAL blueprits</span>
                <span>Active Campaign Metrics</span>
              </div>
            </div>

            {/* Layered Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 p-4 rounded-2xl bg-white border border-slate-100 shadow-xl flex items-center gap-3 z-20 hover:scale-105 transition-transform duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center text-brand-emerald">
                <FiCheck size={18} />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-slate-900 block leading-none">95% Satisfaction</span>
                <span className="text-[10px] text-brand-label font-sans">Client Success Index</span>
              </div>
            </div>

            {/* Another Layered Floating Card */}
            <div className="absolute -top-6 -right-6 p-4 rounded-2xl bg-white border border-slate-100 shadow-xl flex items-center gap-3 z-20 hover:scale-105 transition-transform duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-indigo/10 border border-brand-indigo/20 flex items-center justify-center text-brand-indigo">
                <FiAward size={18} />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-slate-900 block leading-none">50+ Brands Scaled</span>
                <span className="text-[10px] text-brand-label font-sans">Global Category Leaders</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. COMPANY STORY SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-100 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Brand Story content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
              OUR BRAND BIOGRAPHY
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
              Igniting Brand Desire <br />
              <span className="bg-gradient-to-r from-brand-indigo to-brand-violet bg-clip-text text-transparent">
                & Organic Lead Flow
              </span>
            </h2>
            
            <div className="space-y-4 text-slate-600 font-sans leading-relaxed text-sm sm:text-base">
              <p className="font-semibold text-slate-900">
                “Tsquadron creates and defines brand identities, strategically expands businesses in digital markets, and ignites brand awareness, sales, and desire.”
              </p>
              <p>
                With a strong global presence in Warangal, Tsquadron’s expertise and passion fuel your brand’s remarkable digital journey. We map conversational search indexes, formulate bulletproof pay-per-click scripts, and program elegant design system blueprints that elevate products from commodities to essential consumer necessities.
              </p>
              <p>
                Our team is fundamentally obsessed with client execution velocity and commercial results. We discard old vanity traffic indexes in favor of actual customer cash yields, conversion-focused wireframes, and scalable search visibility metrics that outrank competitors indefinitely.
              </p>
            </div>
          </div>

          {/* Right Column: Visual Pillars Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {pillars.map((p, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-3xl bg-gradient-to-tr ${p.color} border border-slate-100 ${p.border} transition-all duration-300 group shadow-sm`}
              >
                <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm mb-4 ${p.text}`}>
                  {p.icon}
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-sm mb-1">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. MISSION & VISION SECTION */}
      <section className="relative py-20 bg-slate-50/40 border-t border-slate-100 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            
            {/* Mission Card */}
            <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-premium hover:border-brand-indigo/20 transition-all duration-300 group flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-indigo/5 border border-brand-indigo/10 flex items-center justify-center text-brand-indigo">
                  <FiTarget size={24} />
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900">
                  Our Mission
                </h3>
                <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                  “To empower businesses with strategic digital solutions that drive visibility, engagement, conversions, and long-term growth.”
                </p>
              </div>
              <div className="h-1 bg-gradient-to-r from-brand-indigo to-transparent rounded-full w-20 group-hover:w-full transition-all duration-500" />
            </div>

            {/* Vision Card */}
            <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-premium hover:border-brand-violet/20 transition-all duration-300 group flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-violet/5 border border-brand-violet/10 flex items-center justify-center text-brand-violet">
                  <FiCompass size={24} />
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900">
                  Our Vision
                </h3>
                <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                  “To become a leading digital transformation partner helping brands create meaningful and scalable online experiences.”
                </p>
              </div>
              <div className="h-1 bg-gradient-to-r from-brand-violet to-transparent rounded-full w-20 group-hover:w-full transition-all duration-500" />
            </div>

          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE TSQUADRON */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-100 z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            THE TSQUADRON EDGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
            Designed for Category Authority
          </h2>
          <p className="text-slate-600 text-sm font-sans max-w-xl mx-auto">
            We merge high-velocity creative campaigns with surgical technical schema coding to establish absolute digital visibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {whyChooseUs.map((w, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-3xl bg-white border border-slate-100 hover:border-slate-200 hover:-translate-y-1.5 transition-all duration-300 shadow-premium hover:shadow-md flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm relative group-hover:-translate-y-1 transition-transform ${w.color}`}>
                  {w.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-slate-900 leading-tight">
                  {w.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
                  {w.desc}
                </p>
              </div>
              <div className="text-[10px] text-brand-label font-sans tracking-widest uppercase">
                Blueprints & Optimization
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SERVICES SECTION */}
      <section className="relative py-20 bg-slate-50/40 border-t border-slate-100 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
              OUR EXPERTISE Blueprints
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
              Preserved Comprehensive Services
            </h2>
            <p className="text-slate-600 text-sm font-sans max-w-xl mx-auto">
              Click any service catalog item to explore our comprehensive growth blueprints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {servicesList.map((s, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  if (setActivePage) setActivePage(s.id)
                }}
                className="p-8 rounded-3xl bg-white border border-slate-100/80 hover:border-slate-200/80 hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-premium hover:shadow-md flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${s.color} flex items-center justify-center text-white shadow-sm relative`}>
                    {s.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 leading-tight group-hover:text-brand-indigo transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-semibold text-brand-indigo">
                  <span>Explore Blueprint</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read More <FiArrowRight />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WORK PROCESS SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-100 z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            OUR EXECUTION Blueprints
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
            Methodical Growth Workflows
          </h2>
          <p className="text-slate-600 text-sm font-sans max-w-xl mx-auto">
            Our step-by-step collaboration workflow designed to ensure maximum ROAS and index dominance.
          </p>
        </div>

        {/* Timeline interface */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 text-left relative z-10">
          {steps.map((st, idx) => (
            <div 
              key={idx}
              onMouseEnter={() => setActiveStep(idx)}
              className={`p-6 rounded-3xl border transition-all duration-300 relative group cursor-pointer ${ activeStep === idx ? 'bg-gradient-to-tr from-brand-indigo/5 to-transparent border-brand-indigo/30 shadow-md' : 'bg-white border-slate-100 shadow-sm' }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xl font-heading font-black ${activeStep === idx ? 'text-brand-indigo' : 'text-slate-300'}`}>
                  0{idx + 1}
                </span>
                <div className={`w-2.5 h-2.5 rounded-full ${activeStep === idx ? 'bg-brand-indigo animate-ping' : 'bg-slate-200'}`} />
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-sm mb-2">
                {st.title}
              </h3>
              <p className="text-slate-600 text-xs font-sans leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. STATISTICS SECTION */}
      <section className="relative py-16 bg-gradient-to-tr from-brand-indigo to-brand-violet text-white z-10 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-heading font-black tracking-tight">100+</span>
              <p className="text-white/80 text-xs sm:text-sm font-sans">Successful Campaigns</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-heading font-black tracking-tight">50+</span>
              <p className="text-white/80 text-xs sm:text-sm font-sans">Brands Scaled</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-heading font-black tracking-tight">95%</span>
              <p className="text-white/80 text-xs sm:text-sm font-sans">Client Satisfaction</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-5xl font-heading font-black tracking-tight">Multi-Industry</span>
              <p className="text-white/80 text-xs sm:text-sm font-sans">Execution Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CLIENT TRUST SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-100 z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            CLIENT TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
            Trusted By Growing Businesses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {testimonials.map((te, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-3xl bg-slate-50/50 border border-slate-100/80 shadow-premium hover:border-slate-200 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <span className="text-xs font-heading font-bold text-brand-indigo uppercase tracking-widest block">
                  {te.metric}
                </span>
                <p className="text-slate-600 text-xs sm:text-sm font-sans italic leading-relaxed">
                  “{te.text}”
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100/80 text-xs text-slate-600 font-sans">
                {te.client}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. OFFICE LOCATIONS SECTION */}
      <section id="locations" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-100 z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            OUR OPERATIONS CENTER
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
            Office Location & Contact
          </h2>
          <p className="text-slate-600 text-sm font-sans max-w-xl mx-auto">
            Operating in Warangal. Reach out to schedule a consulting audit.
          </p>
        </div>

        <div className="max-w-2xl mx-auto text-left">
          
          {/* Hanamkonda Office Card */}
          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-premium flex flex-col justify-between space-y-6">
            <a href="https://maps.app.goo.gl/ebSTinBiFWneemTSA" target="_blank" rel="noopener noreferrer" className="space-y-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-brand-violet/5 border border-brand-violet/10 flex items-center justify-center text-brand-violet shadow-sm group-hover:bg-brand-violet group-hover:text-white transition-colors">
                <FiMapPin size={22} />
              </div>
              <h3 className="text-lg font-heading font-bold text-slate-900 group-hover:text-brand-violet transition-colors">
                Hanamkonda Operational Hub
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed group-hover:text-slate-900 transition-colors">
                1st Floor, Green Square Plaza, opp public garden, Kishanpura, Hanamkonda, Warangal, Telangana 506001
              </p>
            </a>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-premium group">
              <iframe
                title="TSquadron Hanamkonda Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.327406740927!2d79.5601415!3d18.0100029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3345825fc234f9%3A0x533cc629b53be878!2sDigital%20Marketing%20Training%20in%20Warangal%20%7C%20Tsquadron!5e0!3m2!1sen!2sin!4v1716275810000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full grayscale-[10%] contrast-[105%] group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute bottom-3 right-3 z-10">
                <a
                  href="https://maps.app.goo.gl/ebSTinBiFWneemTSA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[10px] font-heading font-black text-brand-indigo shadow-md hover:bg-white hover:scale-105 active:scale-95 transition-all"
                >
                  OPEN IN GOOGLE MAPS ↗
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Global Contact Info Strip */}
        <div className="mt-8 p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-6 max-w-2xl mx-auto relative z-10 shadow-sm">
          <div className="flex items-center gap-3 text-slate-700">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand-indigo shadow-sm">
              <FiPhone size={16} />
            </div>
            <div className="text-left">
              <span className="text-[10px] text-brand-label uppercase tracking-widest font-sans font-semibold block leading-none">HOTLINE CONTACT</span>
              <span className="text-sm font-heading font-bold text-slate-800">+91 9346989817</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-700">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand-indigo shadow-sm">
              <FiMail size={16} />
            </div>
            <div className="text-left">
              <span className="text-[10px] text-brand-label uppercase tracking-widest font-sans font-semibold block leading-none">EMAIL CORRESPONDENCE</span>
              <span className="text-sm font-heading font-bold text-slate-800">growth@tsquadron.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL HIGH-CONVERSION CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 text-center">
        
        {/* Soft background shape */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-brand-indigo/15 to-brand-cyan/15 rounded-full blur-[140px] -z-10 pointer-events-none animate-pulse" />
        
        <div className="p-8 sm:p-16 rounded-3xl bg-gradient-to-br from-[#163C8C] via-[#2857A4] to-[#3569B3] text-white border border-white/15 shadow-hover-glow relative overflow-hidden text-center space-y-8 group">
          {/* Subtle grid patterns */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          
          {/* Ambient light glow */}
          <div className="absolute -top-24 -left-24 w-[350px] h-[350px] bg-white/5 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-[350px] h-[350px] bg-brand-cyan/20 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white glow-text-blue">
              Ready To Build Your Digital Presence?
            </h2>
            <p className="text-slate-100/90 text-sm sm:text-base font-sans max-w-xl mx-auto leading-relaxed">
              Partner with TSquadron to create impactful digital experiences, scalable marketing strategies, and growth-focused brand solutions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 max-w-md mx-auto">
            <button 
              onClick={() => {
                if (setActivePage) setActivePage('contact')
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-semibold text-brand-indigo bg-white hover:bg-slate-50 transition-all duration-300 shadow-premium hover:scale-[1.03] active:scale-[0.98]"
            >
              Start Your Project
            </button>
            <button 
              onClick={() => {
                if (setActivePage) setActivePage('contact')
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:scale-[1.03] active:scale-[0.98]"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      



    </div>
  )
}
