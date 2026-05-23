import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiArrowRight, FiCheckCircle, FiTrendingUp, FiGlobe, FiShare2, 
  FiMousePointer, FiMail, FiShield, FiPlus, FiMinus, FiFileText, 
  FiCpu, FiActivity, FiUsers, FiAward, FiTarget, FiChevronRight, FiSearch,
  FiZap, FiBriefcase, FiBarChart2, FiPieChart, FiStar, FiHeart
} from 'react-icons/fi'
import GlowingCard from '../components/GlowingCard'

export default function OnlineReputationManagement({ setActivePage }) {
  const [openFaq, setOpenFaq] = useState(null)

  React.useEffect(() => {
    // [SEO Manager Override] document.title = "Online Reputation Management Services in Warangal | TSquadron"
    const metaDesc = document.querySelector('meta[name="description"]')
    const descText = "TSquadron provides professional Online Reputation Management services in Warangal including review management, brand monitoring, reputation protection, and search result optimization."
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
    { name: "Online Reputation Management", id: "online-reputation-management-services-hanumakonda" }
  ]

  const services = [
    {
      title: "Brand Reputation Monitoring",
      desc: "Monitor online mentions, reviews, and customer feedback across digital platforms.",
      icon: <FiSearch className="text-brand-indigo" size={22} />
    },
    {
      title: "Review Management",
      desc: "Improve ratings and manage customer reviews to strengthen public perception.",
      icon: <FiStar className="text-brand-violet" size={22} />
    },
    {
      title: "Search Result Optimization",
      desc: "Enhance brand visibility and optimize branded search results across search engines.",
      icon: <FiGlobe className="text-brand-cyan" size={22} />
    },
    {
      title: "Negative Content Management",
      desc: "Reduce the impact of harmful or misleading online content affecting your brand reputation.",
      icon: <FiShield className="text-brand-rose" size={22} />
    },
    {
      title: "Customer Engagement",
      desc: "Build stronger customer trust through responsive communication and engagement strategies.",
      icon: <FiUsers className="text-brand-emerald" size={22} />
    },
    {
      title: "Reputation Analytics",
      desc: "Track brand perception, sentiment analysis, and reputation performance metrics.",
      icon: <FiActivity className="text-brand-indigo" size={22} />
    }
  ]

  const benefits = [
    { title: "Improved Brand Trust", desc: "Showcase authentic rating profiles to win customer decisions instantly." },
    { title: "Better Customer Perception", desc: "Build healthy conversation pathways around your brand successes." },
    { title: "Increased Business Credibility", desc: "Cement your company authority across top online index networks." },
    { title: "Stronger Online Presence", desc: "Establish beautifully organized search page results for brand terms." },
    { title: "Improved Search Visibility", desc: "Ensure your highly rated products rank top during buyer research cycles." },
    { title: "Positive Customer Engagement", desc: "Re-engage review authors proactively to demonstrate top-tier customer care." },
    { title: "Protection Against Negative Content", desc: "Minimize the spread of harmful online mentions." },
    { title: "Long-Term Brand Growth", desc: "Generate scalable brand equity that keeps buyers choosing your team." }
  ]

  const processSteps = [
    { title: "Reputation Analysis", desc: "Audit search result lists, capture review histories, and calculate baseline scores.", icon: <FiSearch size={20} /> },
    { title: "Brand Monitoring", desc: "Deploy active listening grids tracking review websites, forums, and directories.", icon: <FiGlobe size={20} /> },
    { title: "Review Optimization", desc: "Generate fresh organic customer feedbacks to improve star indices.", icon: <FiStar size={20} /> },
    { title: "Search Result Management", desc: "Optimize high-authority profiles to push positive coverage onto page one.", icon: <FiTarget size={20} /> },
    { title: "Customer Engagement", desc: "Provide timely public responses to client stories and capture feedback.", icon: <FiUsers size={20} /> },
    { title: "Performance Tracking", desc: "Monitor daily keyword sentiments, rating metrics, and share indexes.", icon: <FiActivity size={20} /> },
    { title: "Reputation Growth", desc: "Expand brand advocacy channels to compound trust and scale business volume.", icon: <FiTrendingUp size={20} /> }
  ]

  const faqs = [
    {
      q: "1. What is Online Reputation Management?",
      a: "ORM is the systematic process of monitoring, improving, and protecting your brand's digital footprints across review networks, search queries, and directories."
    },
    {
      q: "2. Why is ORM important for businesses?",
      a: "Over 90% of buyers research star reviews before calling a company. Managing your reputation builds trust, credibility, and lifts customer conversion actions."
    },
    {
      q: "3. How does TSquadron manage online reputation?",
      a: "We deploy real-time listening tools, respond professionally to customer reviews, boost positive mentions, and implement search indexing to shield page one."
    },
    {
      q: "4. Can ORM improve customer trust?",
      a: "Yes. Displaying active, professionally managed reviews directly increases customer confidence and discovery conversion rates."
    },
    {
      q: "5. Do you manage negative reviews and harmful content?",
      a: "Yes. We execute strategies to address genuine issues proactively, report fake reviews, and suppress misleading digital stories."
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
                TSquadron ORM Solutions
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-slate-900 leading-[1.15]"
            >
              Online Reputation <br className="hidden sm:inline" />
              Management <span className="bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-cyan bg-clip-text text-transparent">in Warangal</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 font-sans leading-relaxed max-w-2xl"
            >
              Protect, improve, and strengthen your brand reputation with strategic online reputation management solutions designed to build customer trust and business credibility.
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
                Get A Quote <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-heading font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all duration-300"
              >
                Contact Us
              </button>
            </motion.div>

            {/* Small Trust Line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xs text-brand-label font-sans tracking-wide font-medium"
            >
              ✓ Helping businesses maintain a strong and positive digital presence across online platforms.
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
                <span>Brand Monitoring Panel</span>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] text-brand-label font-sans block uppercase">Trust Index</span>
                    <span className="text-base font-heading font-black text-brand-indigo block">4.9 / 5.0</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] text-brand-label font-sans block uppercase">Mentions Tracked</span>
                    <span className="text-base font-heading font-black text-brand-violet block">+2.8K</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100/70 border border-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0">
                    <FiStar size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-heading font-bold text-slate-800 block truncate">Google Review Monitor</span>
                    <span className="text-[10px] text-brand-label block font-sans">Rating improvement graph active</span>
                  </div>
                  <span className="text-xs font-sans font-bold text-brand-emerald shrink-0">+98%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION */}
      <section className="border-t border-slate-100 py-24 relative z-10 bg-slate-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
                TRUST BUILDERS
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
                Why Choose TSquadron For ORM?
              </h2>
              <div className="space-y-4 text-slate-600 font-sans leading-relaxed">
                <p>
                  Our dedicated ORM team specializes in improving ratings, managing customer reviews, and building positive public perception for brands.
                </p>
                <p>
                  We understand the importance of online reputation in today’s digital world and use strategic techniques to improve brand visibility, optimize search results, and strengthen customer trust.
                </p>
                <p>
                  At TSquadron, we also take proactive measures to minimize the spread of fake or harmful content that can negatively impact your business reputation.
                </p>
              </div>
            </div>

            {/* Right visuals */}
            <div className="lg:col-span-5 relative w-full flex justify-center">
              <div className="relative w-full max-w-[380px] p-6 rounded-3xl bg-white border border-slate-200/80 shadow-premium text-left space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-brand-indigo/10 flex items-center justify-center text-brand-indigo">
                    <FiShield size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-heading font-black text-slate-800 block">Fake Review Shield</span>
                    <span className="text-[10px] text-brand-label font-sans block">Real-time sentiment filters</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-sans text-slate-600">
                    <span>Branded Page One Protection</span>
                    <span className="font-bold text-brand-indigo">Active</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-indigo rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. ORM SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            REPUTATION CHANNELS
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Our Online Reputation Services
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

      {/* 4. BENEFITS SECTION */}
      <section className="relative border-t border-slate-100 py-24 bg-slate-50/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6 mb-20">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
              BUSINESS ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
              Benefits of Online Reputation Management
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

      {/* 5. WHY ORM MATTERS SECTION */}
      <section className="border-t border-slate-100 py-24 relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            DECISION CRITICALITY
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Why Online Reputation Matters
          </h2>
          <p className="max-w-3xl mx-auto text-slate-600 font-sans leading-relaxed text-base sm:text-lg">
            A strong online reputation influences customer decisions, builds trust, improves credibility, and directly impacts business growth. Positive brand perception helps businesses attract customers, improve loyalty, and strengthen their market position.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 text-left">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-2xl font-heading font-black text-brand-indigo">93%</span>
              <p className="text-xs text-slate-600 font-sans">Of buyers read online reviews before purchasing.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-2xl font-heading font-black text-brand-violet">4.8★</span>
              <p className="text-xs text-slate-600 font-sans">Average client target footprint managed by TSquadron.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-2xl font-heading font-black text-brand-cyan">100%</span>
              <p className="text-xs text-slate-600 font-sans">Shielding against fake review directories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR PROCESS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            HOW WE SHIELD
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Our ORM Process
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

      {/* 7. FLOATING BANNER STRIPS (Original Archive details preserved) */}
      <section className="py-12 bg-white relative z-10 border-t border-b border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1 */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-indigo uppercase tracking-wider block">
                Get A Quote
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Safeguard and enhance your brand reputation with targeted tools.
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-violet uppercase tracking-wider block">
                Igniting Brand Desire
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Igniting brand awareness, sales, and desire strategically in digital markets.
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-cyan uppercase tracking-wider block">
                Strong Global Presence
              </span>
              <p className="text-slate-600 text-xs font-sans">
                With a strong global presence in Warangal, fuel your brand’s digital journey.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 8. ORM COMPANY BANNER ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="p-8 sm:p-16 rounded-[32px] bg-slate-50 border border-slate-100 flex flex-col items-center space-y-6 max-w-4xl mx-auto shadow-premium">
          <h2 className="text-2xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Online Reputation Management Company in Warangal
          </h2>
          <p className="text-slate-600 font-sans leading-relaxed max-w-2xl">
            Contact TSquadron today to discover how our online reputation management services can safeguard and enhance your brand’s reputation while building stronger customer trust and long-term digital credibility.
          </p>
          <button
            onClick={() => navigateTo('contact')}
            className="px-8 py-4 rounded-full font-heading font-semibold text-white bg-brand-indigo hover:bg-brand-indigo/90 shadow-lg hover:shadow-xl transition-all"
          >
            Get Free Reputation Audit
          </button>
        </div>
      </section>

      {/* 9. BRAND STORY / COMPANY PROFILE SECTION */}
      <section className="py-24 bg-gradient-to-tr from-brand-indigo/10 via-brand-violet/5 to-brand-cyan/5 border-t border-b border-slate-100 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            OUR STORY
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            Fuelling Your Remarkable Digital Journey
          </h2>
          <p className="text-slate-700 text-lg sm:text-xl font-sans leading-relaxed max-w-3xl mx-auto">
            “TSquadron creates and defines brand identities, strategically expands businesses in digital markets, and ignites brand awareness, sales, and desire. With a strong global presence in Warangal, TSquadron’s expertise and passion fuel your brand’s remarkable digital journey.”
          </p>
        </div>
      </section>

      {/* 10. FAQ ACCORDION SECTION */}
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

      {/* 11. FINAL HIGH-CONVERSION CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 text-center">
        <div className="relative rounded-[32px] p-8 sm:p-16 bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-indigo/90 border border-white/10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white leading-tight">
              Ready To Strengthen Your Brand Reputation?
            </h2>
            <p className="text-indigo-100 font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Partner with TSquadron to build a positive online presence, improve customer trust, and protect your brand reputation with strategic ORM solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigateTo('contact')}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-semibold text-brand-indigo bg-white hover:bg-slate-100 transition-all duration-300 shadow-lg"
              >
                Schedule Consultation
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
