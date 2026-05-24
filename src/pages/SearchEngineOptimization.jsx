import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiArrowRight, FiCheckCircle, FiTrendingUp, FiGlobe, FiShare2, 
  FiMousePointer, FiMail, FiShield, FiPlus, FiMinus, FiFileText, 
  FiCpu, FiActivity, FiUsers, FiAward, FiTarget, FiChevronRight, FiSearch,
  FiPieChart, FiBarChart2, FiLayers, FiZap, FiBriefcase
} from 'react-icons/fi'
import GlowingCard from '../components/GlowingCard'

export default function SearchEngineOptimization({ setActivePage }) {
  const [openFaq, setOpenFaq] = useState(null)

  React.useEffect(() => {
  }, [])

  const breadcrumbs = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Search Engine Optimization", id: "seo-company-in-hanamkonda" }
  ]

  const coreServices = [
    {
      title: "SEO Audit & Analysis",
      desc: "Identify technical issues, optimization gaps, and performance opportunities through in-depth SEO audits and competitor analysis.",
      icon: <FiSearch className="text-brand-indigo" size={22} />
    },
    {
      title: "On-Page SEO",
      desc: "Optimize website structure, metadata, content, internal linking, and user experience to improve search rankings.",
      icon: <FiFileText className="text-brand-violet" size={22} />
    },
    {
      title: "Off-Page SEO",
      desc: "Build authority and improve online credibility using strategic link-building and brand visibility techniques.",
      icon: <FiGlobe className="text-brand-cyan" size={22} />
    },
    {
      title: "Local SEO",
      desc: "Improve local visibility through Google Business optimization, local keyword targeting, and location-based SEO strategies.",
      icon: <FiTarget className="text-brand-rose" size={22} />
    },
    {
      title: "Technical SEO",
      desc: "Enhance website speed, crawlability, indexing, mobile responsiveness, and technical performance.",
      icon: <FiCpu className="text-brand-emerald" size={22} />
    },
    {
      title: "SEO Content Strategy",
      desc: "Create search-optimized content that improves engagement, visibility, and conversion opportunities.",
      icon: <FiActivity className="text-brand-indigo" size={22} />
    }
  ]

  const whyChooseUs = [
    {
      title: "Vast Experience",
      desc: "Our experienced SEO professionals develop customized strategies for different business industries and objectives.",
      icon: <FiAward className="text-brand-indigo" size={22} />
    },
    {
      title: "Goal-Oriented Results",
      desc: "We focus on measurable SEO growth including rankings, traffic, leads, and conversions.",
      icon: <FiTrendingUp className="text-brand-violet" size={22} />
    },
    {
      title: "Advanced SEO Techniques",
      desc: "We use modern SEO methodologies, technical optimization, competitor analysis, and strategic content planning.",
      icon: <FiZap className="text-brand-cyan" size={22} />
    },
    {
      title: "Transparent Reporting",
      desc: "Receive clear performance insights and SEO progress reports with measurable analytics.",
      icon: <FiBarChart2 className="text-brand-rose" size={22} />
    },
    {
      title: "Continuous Optimization",
      desc: "SEO campaigns are continuously monitored and improved to maximize long-term performance.",
      icon: <FiActivity className="text-brand-emerald" size={22} />
    },
    {
      title: "Business-Focused Strategies",
      desc: "We create SEO solutions aligned with your business goals and audience behavior.",
      icon: <FiBriefcase className="text-brand-indigo" size={22} />
    }
  ]

  const processSteps = [
    { title: "Website Analysis", desc: "Audit speed, core web vitals, indexation issues, and current rank statuses.", icon: <FiSearch size={20} /> },
    { title: "Keyword Research", desc: "Map commercial intent, competitor gaps, high-converting long tails, and search volumes.", icon: <FiTarget size={20} /> },
    { title: "Technical Optimization", desc: "Remediate canonical paths, robots files, XML indexes, schemas, and responsive nodes.", icon: <FiCpu size={20} /> },
    { title: "Content Optimization", desc: "Refine copy readability, contextual link flows, metadata tags, and heading systems.", icon: <FiFileText size={20} /> },
    { title: "Link Building", desc: "Acquire trusted contextual references, brand mentions, and organic backlinks.", icon: <FiGlobe size={20} /> },
    { title: "Performance Tracking", desc: "Monitor daily keyword elevations, impressions, organic CTRs, and conversion events.", icon: <FiActivity size={20} /> },
    { title: "Growth Scaling", desc: "Unlock new topical clusters, expand search volumes, and scale domain authority.", icon: <FiTrendingUp size={20} /> }
  ]

  const benefits = [
    { title: "Increased Organic Traffic", desc: "Drive consistent streams of targeted organic customers directly to your key landing products." },
    { title: "Better Search Rankings", desc: "Claim top page spots on Google for keywords representing active buyer searches." },
    { title: "Improved Brand Visibility", desc: "Secure authority and customer trust by maintaining top-of-mind digital footprints." },
    { title: "Higher Quality Leads", desc: "Engage active searchers already looking for your exact services and products." },
    { title: "Long-Term Business Growth", desc: "Create compound traffic values that continue driving bookings long after initial campaign setups." },
    { title: "Better User Experience", desc: "Construct clean, fast, and structured website journeys that delight site users." },
    { title: "Increased Conversion Opportunities", desc: "Direct incoming organic flows smoothly toward consultation bookings and sales forms." },
    { title: "Stronger Online Authority", desc: "Construct durable domain value and brand authority that deters competitor conquest." }
  ]

  const faqs = [
    {
      q: "1. What does SEO mean for a company?",
      a: "Search Engine Optimization helps improve website rankings on search engines and increases organic traffic visibility, making your brand discoverable by prospective buyers."
    },
    {
      q: "2. How important is local SEO?",
      a: "Local SEO helps businesses appear in local search results and attract nearby customers, driving direct footfalls and local service calls."
    },
    {
      q: "3. How quickly will I see results?",
      a: "SEO results vary depending on competition, website condition, and strategy, but measurable improvements typically take a few months to mature and compound."
    },
    {
      q: "4. Why should I choose TSquadron SEO services?",
      a: "We provide customized SEO strategies, transparent reporting, and long-term growth-focused optimization tailored exactly to your commercial bounds."
    },
    {
      q: "5. Do you provide SEO audits?",
      a: "Yes, we provide detailed SEO audits and performance analysis to identify improvement opportunities and technical indexing bugs."
    },
    {
      q: "6. Can SEO improve website traffic?",
      a: "Yes, effective SEO strategies increase organic visibility and drive quality traffic to your website by targeting precise intent search keys."
    }
  ]

  const navigateTo = (pageId) => {
    setActivePage(pageId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="relative pt-24 overflow-hidden">
      {/* Background radial glowing gradients */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-brand-violet/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[800px] right-10 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Breadcrumb Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-10">
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600 font-sans font-medium">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.id}>
              {idx > 0 && <FiChevronRight className="text-brand-label" size={14} />}
              {idx < breadcrumbs.length - 1 ? (
                <button 
                  onClick={() => navigateTo(crumb.id)} 
                  className="hover:text-brand-indigo transition-colors"
                >
                  {crumb.name}
                </button>
              ) : (
                <span className="text-slate-800 font-semibold">{crumb.name}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/60 backdrop-blur-md"
            >
              <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans">
                TSquadron SEO Solutions
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-slate-900 leading-[1.15]"
            >
              Best SEO Company <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-cyan bg-clip-text text-transparent">
                in Warangal
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 font-sans leading-relaxed max-w-2xl"
            >
              Improve your search visibility, increase organic traffic, and grow your business with data-driven SEO strategies designed for long-term success.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-start pt-2"
            >
              <button
                onClick={() => navigateTo('contact')}
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full font-heading font-semibold text-white bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-indigo shadow-[0_4px_15px_rgba(99,102,241,0.2)] hover:shadow-[0_4px_25px_rgba(99,102,241,0.4)] transition-all duration-300"
              >
                Get Free SEO Audit <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-heading font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all duration-300"
              >
                Talk To SEO Experts
              </button>
            </motion.div>

            {/* Small Trust Line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xs text-brand-label font-sans tracking-wide font-medium"
            >
              ✓ Helping businesses rank higher and attract quality traffic through modern SEO solutions.
            </motion.p>
          </div>

          {/* Right Hero Visual elements */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative w-full flex justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo to-brand-cyan opacity-5 blur-3xl rounded-full pointer-events-none" />

            <div className="relative w-full max-w-[450px] aspect-[4/3] rounded-3xl p-[1px] bg-gradient-to-tr from-slate-200 via-slate-100 to-slate-300/40 shadow-premium bg-white overflow-hidden border border-slate-100">
              <div className="w-full h-8 px-4 flex items-center justify-between border-b border-slate-100 bg-slate-50 text-[10px] text-slate-600 font-sans">
                <div className="flex gap-1.5 items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-rose" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#facc15]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald" />
                </div>
                <span>Google Search Console Mockup</span>
              </div>
              <div className="p-5 space-y-4">
                {/* Search Rank Grid Indicators */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] text-brand-label font-sans block uppercase">Avg Position</span>
                    <span className="text-sm font-heading font-black text-brand-indigo block">#1.4</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] text-brand-label font-sans block uppercase">CTR</span>
                    <span className="text-sm font-heading font-black text-brand-violet block">18.4%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] text-brand-label font-sans block uppercase">Impressions</span>
                    <span className="text-sm font-heading font-black text-brand-cyan block">1.8M</span>
                  </div>
                </div>

                {/* SVG Visual line chart representing keyword rankings */}
                <div className="w-full h-24 bg-slate-50 rounded-xl border border-slate-100 p-2 overflow-hidden flex items-end">
                  <svg viewBox="0 0 200 60" className="w-full h-20 overflow-visible text-brand-cyan">
                    <path 
                      d="M0,55 L20,50 L40,35 Q60,20 80,45 T120,25 T160,10 T200,3" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                    />
                    <circle cx="200" cy="3" r="3" fill="#5E9CB3" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION */}
      <section className="border-t border-slate-100 py-20 relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            SUSTAINABLE TRAFFIC ACQUISITION
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Comprehensive SEO Services Designed For Sustainable Growth
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-slate-600 font-sans leading-relaxed text-base sm:text-lg text-left md:text-center">
            <p>
              At TSquadron, we help businesses improve their online visibility and search engine rankings through strategic SEO services tailored to their goals. Our SEO solutions focus on driving quality organic traffic, improving user experience, and increasing long-term business growth.
            </p>
            <p>
              From technical optimization to content strategy and local SEO, we create complete search engine optimization systems that help businesses compete effectively in the digital landscape.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CORE SEO SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            SEARCH CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Core Search Engine Optimization Services
          </h2>
          <p className="text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
            Acquire top rank visibility across global search networks with technical precision, authority building, and content strategy.
          </p>
        </div>

        {/* Animated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {coreServices.map((item, idx) => (
            <GlowingCard key={idx} delay={idx * 0.05} className="min-h-[220px]">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:border-brand-indigo/40 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-brand-indigo transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </GlowingCard>
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE TSQUADRON SECTION */}
      <section className="relative border-t border-slate-100 py-24 bg-slate-50/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6 mb-20">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
              OUR CREDENTIALS
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
              Why Businesses Choose Our SEO Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {whyChooseUs.map((reason, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-100 flex flex-col justify-between space-y-4 shadow-premium hover:shadow-md hover:border-slate-200 transition-all duration-300 relative group animate-fade-in"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-transparent via-brand-indigo to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-brand-indigo transition-colors block">
                  {reason.title}
                </h3>
                <p className="text-slate-600 text-sm font-sans leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROCESS WORKFLOW TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            HOW WE RANK
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Our SEO Process
          </h2>
        </div>

        {/* Timeline representation */}
        <div className="relative max-w-4xl mx-auto w-full px-4 md:px-0">
          {/* Vertical connector line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-200 -translate-x-1/2" />

          {processSteps.map((step, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div 
                key={idx} 
                className={`mb-16 last:mb-0 relative flex flex-col md:flex-row items-start justify-between w-full ${ isEven ? 'md:flex-row-reverse' : '' }`}
              >
                {/* timeline bullet */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-1.5 md:top-[28px] w-3 h-3 rounded-full bg-white border-2 border-brand-indigo z-10 shadow-sm" />

                {/* Heading Column */}
                <div className={`pl-16 md:pl-0 w-full md:w-[calc(50%-32px)] md:pt-5 ${ isEven ? 'md:text-left md:pl-8' : 'md:text-right md:pr-8' }`}>
                  <span className="text-lg font-heading font-bold text-brand-indigo block">
                    0{idx + 1}. {step.title}
                  </span>
                </div>

                {/* Content Card Column */}
                <div className={`pl-16 md:pl-0 w-full md:w-[calc(50%-32px)] ${ isEven ? 'md:pr-8' : 'md:pl-8' } mt-3 md:mt-0`}>
                  <div className="p-6 rounded-2xl bg-white border border-slate-200/85 text-left shadow-premium hover:border-slate-300 transition-colors">
                    <p className="text-slate-600 text-sm font-sans leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. BENEFITS SECTION */}
      <section className="relative border-t border-slate-100 py-24 bg-slate-50/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6 mb-20">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
              BUSINESS ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
              Benefits of SEO Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-100 flex flex-col justify-between space-y-4 shadow-premium hover:shadow-md hover:border-slate-200 transition-all duration-300"
              >
                <h3 className="font-heading font-bold text-base text-slate-900 block">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 text-xs font-sans leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FLOATING SMALL INFORMATIONAL BANNER STRIPS (Original Archive details preserved) */}
      <section className="py-12 bg-white relative z-10 border-t border-b border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1: Ready to elevate */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-indigo uppercase tracking-wider block">
                Ready to elevate your business to new heights?
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Reach out to further discuss your SEO goals and discover high-intent keywords.
              </p>
            </div>

            {/* Box 2: Helping improve */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-violet uppercase tracking-wider block">
                Organic Visibility Engine
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Helping businesses improve search discoverability, organic index ranks, and growth.
              </p>
            </div>

            {/* Box 3: Customized setups */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-cyan uppercase tracking-wider block">
                Durable Custom Campaigns
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Tailor-made structural adjustments and optimized search content for every business.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-center">
        <div className="space-y-6 mb-16">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            ACCORDION INSIGHTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Frequently Answered Insights
          </h2>
        </div>

        {/* FAQs */}
        <div className="space-y-4 text-left">
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
                  <span className="text-brand-indigo ml-4">
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
                      <div className="px-6 pb-6 text-slate-600 text-sm font-sans leading-relaxed border-t border-slate-100 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>

      {/* 9. FINAL HIGH-CONVERSION CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 text-center">
        <div className="relative rounded-[32px] p-8 sm:p-16 bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-indigo/90 border border-white/10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white leading-tight">
              Ready To Rank Higher And Grow Faster?
            </h2>
            <p className="text-indigo-100 font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Partner with TSquadron to build powerful SEO strategies that improve visibility, attract quality traffic, and accelerate business growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigateTo('contact')}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-semibold text-brand-indigo bg-white hover:bg-slate-100 transition-all duration-300 shadow-lg"
              >
                Schedule SEO Consultation
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
              >
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
