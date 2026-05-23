import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiArrowRight, FiCheckCircle, FiTrendingUp, FiGlobe, FiShare2, 
  FiMousePointer, FiMail, FiShield, FiPlus, FiMinus, FiFileText, 
  FiCpu, FiActivity, FiUsers, FiAward, FiTarget, FiChevronRight, FiSearch,
  FiZap, FiBriefcase, FiBarChart2, FiPieChart
} from 'react-icons/fi'
import GlowingCard from '../components/GlowingCard'

export default function PpcServices({ setActivePage }) {
  const [openFaq, setOpenFaq] = useState(null)

  React.useEffect(() => {
    // [SEO Manager Override] document.title = "Top PPC Services in Warangal | TSquadron"
    const metaDesc = document.querySelector('meta[name="description"]')
    const descText = "TSquadron provides professional PPC advertising services in Warangal including Google Ads, paid campaigns, remarketing, social media advertising, and conversion-focused PPC strategies."
    if (metaDesc) {
      metaDesc.setAttribute("content", descText)
    } else {
      const meta = document.createElement('meta')
      meta.name = "description"
      meta.content = descText
      document.getElementsByTagName('head')[0].appendChild(meta)
    }
  }, [])

  const breadcrumbs = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "PPC Advertising", id: "ppc-services-in-hanamkonda" }
  ]

  const services = [
    {
      title: "Google Ads Campaigns",
      desc: "Create and manage targeted Google Ads campaigns to drive quality traffic and conversions.",
      icon: <FiZap className="text-brand-indigo" size={22} />
    },
    {
      title: "Search Advertising",
      desc: "Appear in front of customers actively searching for products and services related to your business.",
      icon: <FiSearch className="text-brand-violet" size={22} />
    },
    {
      title: "Display Advertising",
      desc: "Build brand visibility through visually engaging display advertising campaigns.",
      icon: <FiGlobe className="text-brand-cyan" size={22} />
    },
    {
      title: "Remarketing Campaigns",
      desc: "Reconnect with previous visitors and improve conversion opportunities through remarketing strategies.",
      icon: <FiCpu className="text-brand-rose" size={22} />
    },
    {
      title: "Social Media Advertising",
      desc: "Run paid campaigns across Facebook, Instagram, LinkedIn, and other leading social platforms.",
      icon: <FiShare2 className="text-brand-emerald" size={22} />
    },
    {
      title: "PPC Performance Optimization",
      desc: "Continuously monitor and optimize ad campaigns to maximize ROI and campaign performance.",
      icon: <FiActivity className="text-brand-indigo" size={22} />
    }
  ]

  const whyChooseUs = [
    {
      title: "ROI-Focused Campaigns",
      desc: "We create advertising campaigns focused on measurable business growth and conversions.",
      icon: <FiTrendingUp className="text-brand-indigo" size={22} />
    },
    {
      title: "Strategic Audience Targeting",
      desc: "Reach the right audience using detailed targeting and keyword strategies.",
      icon: <FiTarget className="text-brand-violet" size={22} />
    },
    {
      title: "Real-Time Optimization",
      desc: "Campaigns are continuously monitored and optimized for better performance.",
      icon: <FiCpu className="text-brand-cyan" size={22} />
    },
    {
      title: "Transparent Reporting",
      desc: "Receive detailed campaign reports and analytics insights.",
      icon: <FiBarChart2 className="text-brand-rose" size={22} />
    },
    {
      title: "Multi-Platform Advertising",
      desc: "We manage campaigns across Google, Facebook, Instagram, LinkedIn, and other platforms.",
      icon: <FiGlobe className="text-brand-emerald" size={22} />
    },
    {
      title: "Experienced PPC Specialists",
      desc: "Our team develops high-performing advertising strategies tailored to business goals.",
      icon: <FiAward className="text-brand-indigo" size={22} />
    }
  ]

  const processSteps = [
    { title: "Business Research", desc: "Understand commercial models, margin structures, target locations, and competitors.", icon: <FiSearch size={20} /> },
    { title: "Keyword Analysis", desc: "Identify transactional keys, buyer intents, negative matches, and search volumes.", icon: <FiTarget size={20} /> },
    { title: "Audience Targeting", desc: "Segment active buyer profiles, geographic boundaries, schedules, and device preferences.", icon: <FiUsers size={20} /> },
    { title: "Campaign Setup", desc: "Configure conversion tags, tracking, auction settings, and budget systems.", icon: <FiCpu size={20} /> },
    { title: "Ad Creative Development", desc: "Write ad copy, build design assets, write headlines, and configure site links.", icon: <FiFileText size={20} /> },
    { title: "Campaign Launch", desc: "Publish ads across search and display channels, and monitor bids.", icon: <FiZap size={20} /> },
    { title: "Performance Optimization", desc: "Refine landing quality scores, filter search terms, and test creatives.", icon: <FiActivity size={20} /> },
    { title: "Growth Scaling", desc: "Expand budgets, target new search categories, and optimize conversions.", icon: <FiTrendingUp size={20} /> }
  ]

  const benefits = [
    { title: "Instant Traffic Generation", desc: "Drive consistent streams of targeted organic customers directly to your key landing products." },
    { title: "Better Lead Quality", desc: "Engage active searchers already looking for your exact services and products." },
    { title: "Increased Conversion Opportunities", desc: "Direct incoming paid flows smoothly toward consultation bookings and sales forms." },
    { title: "Faster Business Visibility", desc: "Ensure your brand appears at the top of search networks immediately." },
    { title: "Improved Brand Awareness", desc: "Secure authority and customer trust by maintaining top-of-mind digital footprints." },
    { title: "Measurable Campaign Results", desc: "Track every dollar spent, view impressions, CTR, conversion events, and ROI." },
    { title: "Flexible Budget Control", desc: "Easily adjust ad spends based on seasonality, performance, and goals." },
    { title: "High ROI Potential", desc: "Maximize return on investment using strategic targeting and optimization." }
  ]

  const originalWhatWeOffer = [
    { title: "Targeted advertising campaigns", desc: "Laser-focused ads tailored exactly to intent keys." },
    { title: "Real-time performance tracking", desc: "Detailed metric consoles showcasing lead origins." },
    { title: "Audience segmentation", desc: "Bespoke target clusters focused on ready-to-buy users." },
    { title: "Budget optimization", desc: "Intelligent bidding capping strategies to save waste." },
    { title: "Search and display advertising", desc: "Complete search page and visual network visibility." },
    { title: "Conversion-focused strategies", desc: "Direct response systems crafted for optimal actions." },
    { title: "Lead generation campaigns", desc: "Automated acquisition paths tailored for growth." },
    { title: "Data-driven ad optimization", desc: "Continuous iteration based on performance telemetry." }
  ]

  const faqs = [
    {
      q: "1. What are PPC services?",
      a: "PPC (Pay-Per-Click) services involve paid advertising campaigns where businesses pay only when a user actively clicks on their ads to visit the website."
    },
    {
      q: "2. How does PPC advertising help businesses?",
      a: "PPC advertising increases instant search visibility, generates quality business leads, and drives targeted buyer traffic quickly."
    },
    {
      q: "3. Why should I choose TSquadron PPC services?",
      a: "We provide customized PPC strategies, comprehensive performance tracking, continuous optimization, and ROI-focused paid marketing solutions."
    },
    {
      q: "4. Can PPC generate leads quickly?",
      a: "Yes, unlike organic search optimization, PPC campaigns go live instantly, driving immediate search visibility and lead opportunities."
    },
    {
      q: "5. Which platforms do you use for PPC advertising?",
      a: "We manage paid campaigns across Google Ads, Facebook, Instagram, LinkedIn, and other top display and social advertising networks."
    },
    {
      q: "6. Do you optimize PPC campaigns regularly?",
      a: "Yes, our PPC specialists monitor campaigns daily and optimize bids, keywords, and copy to maximize performance and ROI."
    }
  ]

  const navigateTo = (pageId) => {
    setActivePage(pageId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="relative pt-24 overflow-hidden">
      {/* Background gradients */}
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
                TSquadron PPC Advertising Solutions
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-slate-900 leading-[1.15]"
            >
              Top PPC Services <br className="hidden sm:inline" />
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
              Drive instant traffic, generate quality leads, and maximize ROI with performance-driven PPC advertising strategies tailored for business growth.
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
                Get Free PPC Audit <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-heading font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all duration-300"
              >
                Talk To PPC Experts
              </button>
            </motion.div>

            {/* Small Trust Line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xs text-brand-label font-sans tracking-wide font-medium"
            >
              ✓ Helping businesses generate measurable results through strategic paid advertising campaigns.
            </motion.p>
          </div>

          {/* Right Hero Visuals */}
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
                <span>Google Ads Dashboard Mockup</span>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] text-brand-label font-sans block uppercase">CPA Cost</span>
                    <span className="text-xs font-heading font-black text-brand-indigo block">$8.40</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] text-brand-label font-sans block uppercase">Ad ROAS</span>
                    <span className="text-xs font-heading font-black text-brand-violet block">4.8x</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] text-brand-label font-sans block uppercase">Conversions</span>
                    <span className="text-xs font-heading font-black text-brand-cyan block">+1.2K</span>
                  </div>
                </div>

                {/* SVG Visual line chart representing keyword rankings */}
                <div className="w-full h-24 bg-slate-50 rounded-xl border border-slate-100 p-2 overflow-hidden flex items-end">
                  <svg viewBox="0 0 200 60" className="w-full h-20 overflow-visible text-brand-indigo">
                    <path 
                      d="M0,45 L20,30 L40,48 Q60,15 80,35 T120,15 T160,5 T200,1" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                    />
                    <circle cx="200" cy="1" r="3" fill="#163C8C" />
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
            ACCELERATED VISIBILITY
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Performance-Focused PPC Advertising Solutions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-slate-600 font-sans leading-relaxed text-base sm:text-lg text-left md:text-center">
            <p>
              At TSquadron, we create result-oriented PPC campaigns designed to increase visibility, attract qualified traffic, and improve conversion opportunities. Our PPC services focus on maximizing return on investment through strategic targeting, campaign optimization, and performance analysis.
            </p>
            <p>
              From Google Ads to social media advertising campaigns, we help businesses achieve faster visibility and measurable digital growth.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CORE PPC SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            ADVERTISING SUITES
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Core Pay-Per-Click Advertising Services
          </h2>
        </div>

        {/* Animated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {services.map((item, idx) => (
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

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="relative border-t border-slate-100 py-24 bg-slate-50/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6 mb-20">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
              ADVERTISING CREDENTIALS
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
              Why Choose TSquadron PPC Services?
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

      {/* 5. OUR PPC PROCESS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            HOW WE CONVERT
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Our PPC Campaign Process
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
              ADVERTISING ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
              Benefits of PPC Advertising
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

      {/* 7. WHAT WE OFFER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            PPC CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            What We Offer
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {originalWhatWeOffer.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-150 flex flex-col justify-between space-y-3 shadow-premium hover:border-slate-300 transition-all duration-300 relative"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                <FiCheckCircle className="text-brand-emerald" size={16} />
              </div>
              <h3 className="font-heading font-bold text-sm text-slate-900 block">
                {item.title}
              </h3>
              <p className="text-slate-600 text-xs font-sans leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FLOATING BANNER STRIPS (Original Archive details preserved) */}
      <section className="py-12 bg-white relative z-10 border-t border-b border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1 */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-indigo uppercase tracking-wider block">
                Assisting All Businesses
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Take your business to new heights and reach your ideal customers online.
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-violet uppercase tracking-wider block">
                PPC Account Orchestration
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Helping brands grow with premium PPC management and performance-focused paid campaigns.
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-cyan uppercase tracking-wider block">
                Customized Paid Campaigns
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Customized advertising strategies that align exactly with target demographics.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
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

      {/* 10. FINAL HIGH-CONVERSION CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 text-center">
        <div className="relative rounded-[32px] p-8 sm:p-16 bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-indigo/90 border border-white/10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white leading-tight">
              Ready To Scale Your Business With PPC?
            </h2>
            <p className="text-indigo-100 font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Partner with TSquadron to launch powerful PPC campaigns that drive traffic, increase leads, and maximize business growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigateTo('contact')}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-semibold text-brand-indigo bg-white hover:bg-slate-100 transition-all duration-300 shadow-lg"
              >
                Schedule PPC Consultation
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
