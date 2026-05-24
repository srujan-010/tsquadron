import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiArrowRight, FiCheckCircle, FiTrendingUp, FiGlobe, FiShare2, 
  FiMousePointer, FiMail, FiShield, FiPlus, FiMinus, FiFileText, 
  FiCpu, FiActivity, FiUsers, FiAward, FiTarget, FiChevronRight, FiSearch,
  FiZap, FiBriefcase
} from 'react-icons/fi'
import GlowingCard from '../components/GlowingCard'

export default function SocialMediaMarketing({ setActivePage }) {
  const [openFaq, setOpenFaq] = useState(null)

  React.useEffect(() => {
  }, [])

  const breadcrumbs = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Social Media Marketing", id: "social-media-marketing" }
  ]

  const services = [
    {
      title: "Social Media Strategy",
      desc: "Develop customized social media strategies aligned with business goals and audience behavior.",
      icon: <FiBriefcase className="text-brand-indigo" size={22} />
    },
    {
      title: "Content Creation",
      desc: "Create engaging creatives, captions, reels, graphics, and visual content for multiple social platforms.",
      icon: <FiFileText className="text-brand-violet" size={22} />
    },
    {
      title: "Brand Engagement",
      desc: "Improve customer interaction and strengthen brand communication through consistent engagement.",
      icon: <FiUsers className="text-brand-cyan" size={22} />
    },
    {
      title: "Campaign Management",
      desc: "Plan, manage, and optimize social media campaigns for improved reach and performance.",
      icon: <FiActivity className="text-brand-rose" size={22} />
    },
    {
      title: "Analytics & Insights",
      desc: "Track audience behavior, engagement metrics, and campaign performance using detailed analytics.",
      icon: <FiCpu className="text-brand-emerald" size={22} />
    },
    {
      title: "Paid Social Advertising",
      desc: "Run targeted social media advertising campaigns to generate leads, sales, and conversions.",
      icon: <FiZap className="text-brand-indigo" size={22} />
    }
  ]

  const originalPoints = [
    "Create highly effective creative social media packages.",
    "Create images and content for Facebook and Instagram.",
    "Manage social media accounts professionally.",
    "Build brand awareness and audience engagement.",
    "Create promotional campaigns and advertisements.",
    "Design visual content including graphics, videos, banners, and social creatives.",
    "Optimize campaigns using analytics and audience insights.",
    "Improve online visibility and customer interaction."
  ]

  const whyChooseUs = [
    {
      title: "Creative Brand Strategy",
      desc: "We create modern social media strategies tailored to business goals and target audiences.",
      icon: <FiAward className="text-brand-indigo" size={22} />
    },
    {
      title: "Platform Expertise",
      desc: "Our team manages campaigns across Instagram, Facebook, LinkedIn, YouTube, Twitter/X, and other major platforms.",
      icon: <FiGlobe className="text-brand-violet" size={22} />
    },
    {
      title: "Audience Engagement Focus",
      desc: "We help brands build meaningful customer relationships through strategic content and interaction.",
      icon: <FiUsers className="text-brand-cyan" size={22} />
    },
    {
      title: "Data-Driven Optimization",
      desc: "We continuously monitor campaign performance and optimize strategies using real-time analytics.",
      icon: <FiActivity className="text-brand-rose" size={22} />
    },
    {
      title: "Consistent Brand Presence",
      desc: "Maintain a strong and professional digital presence across all social platforms.",
      icon: <FiShield className="text-brand-emerald" size={22} />
    },
    {
      title: "Conversion-Oriented Campaigns",
      desc: "Generate leads, traffic, and customer actions through performance-focused campaigns.",
      icon: <FiTarget className="text-brand-indigo" size={22} />
    }
  ]

  const strategyTimeline = [
    { title: "Audience Research", desc: "Map customer interest clusters, competitor brand campaigns, and visual content trends.", icon: <FiSearch size={20} /> },
    { title: "Brand Positioning", desc: "Define direct messaging pillars, editorial brand voices, and responsive communication guides.", icon: <FiTarget size={20} /> },
    { title: "Content Planning", desc: "Establish multi-platform calendars, reel formats, dynamic copy maps, and campaign outlines.", icon: <FiFileText size={20} /> },
    { title: "Creative Design", desc: "Design interactive visual assets, UGC layouts, reels, graphics, and high-converting banners.", icon: <FiCpu size={20} /> },
    { title: "Campaign Launch", desc: "Schedule organic streams, target active commercial segments, and sync paid promotion budgets.", icon: <FiZap size={20} /> },
    { title: "Performance Monitoring", desc: "Track impressions, organic saves, share signals, lead signups, and ROI indexes.", icon: <FiActivity size={20} /> },
    { title: "Growth Optimization", desc: "Iterate creative angles, expand reach bounds, scale audience pools, and compound brand value.", icon: <FiTrendingUp size={20} /> }
  ]

  const benefits = [
    { title: "Improved Brand Awareness", desc: "Scale positive brand mentions and organic reach across all leading platforms." },
    { title: "Better Customer Engagement", desc: "Nurture consistent conversation pathways with fans and active buyer groups." },
    { title: "Increased Website Traffic", desc: "Direct massive, high-intent social audiences straight to your target sales funnels." },
    { title: "Higher Conversion Opportunities", desc: "Generate sales signups and discovery calls through optimized creative pipelines." },
    { title: "Stronger Brand Identity", desc: "Preserve beautiful and unified brand layouts that generate direct trust." },
    { title: "Audience Growth", desc: "Grow a scalable community of dedicated, organic advocates." },
    { title: "Better Online Visibility", desc: "Ensure your company ranks top-of-mind during product discovery cycles." },
    { title: "Increased Customer Trust", desc: "Define industry authority by sharing consistent client successes." }
  ]

  const faqs = [
    {
      q: "1. How does social media marketing help businesses?",
      a: "Social media marketing helps businesses increase brand awareness, engage customers, and generate leads through digital platforms by positioning content where buyers spend active daily cycles."
    },
    {
      q: "2. Which social media platforms should businesses use?",
      a: "The right platform depends on your target business audience and goals, including Instagram, Facebook, LinkedIn, YouTube, and Twitter/X."
    },
    {
      q: "3. Why should I choose TSquadron for social media marketing?",
      a: "We provide customized strategies, creative high-fidelity content, active audience engagement, and performance-focused, metrics-backed paid campaigns."
    },
    {
      q: "4. Can social media marketing increase sales?",
      a: "Yes, strategic paid social campaigns and organic syndications directly improve visibility, customer trust, and organic conversion opportunities."
    },
    {
      q: "5. Do you create content for social media platforms?",
      a: "Yes, we handle the complete process: graphics, reels, videos, banners, promotional creatives, copy captions, and ad sets."
    }
  ]

  const navigateTo = (pageId) => {
    setActivePage(pageId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="relative pt-24 overflow-hidden">
      {/* Radial soft drifting backgrounds */}
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
                TSquadron Social Media Solutions
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-slate-900 leading-[1.15]"
            >
              Social Media Marketing <br className="hidden sm:inline" />
              Company <span className="bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-cyan bg-clip-text text-transparent">in Warangal</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 font-sans leading-relaxed max-w-2xl"
            >
              Build brand awareness, increase audience engagement, and grow your business with strategic social media marketing solutions designed for modern digital platforms.
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
                Get Free Consultation <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-heading font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all duration-300"
              >
                Start Growing Online
              </button>
            </motion.div>

            {/* Small Trust Line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xs text-brand-label font-sans tracking-wide font-medium"
            >
              ✓ Helping businesses connect with audiences across leading social media platforms.
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
                <span>Social Analytics Console</span>
              </div>
              <div className="p-5 space-y-4">
                {/* Stats row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] text-brand-label font-sans block uppercase">Followers Gained</span>
                    <span className="text-base font-heading font-black text-brand-indigo block">+48.2K</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] text-brand-label font-sans block uppercase">Engagement Rate</span>
                    <span className="text-base font-heading font-black text-brand-violet block">12.4%</span>
                  </div>
                </div>

                {/* Simulated post mockup */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100/70 border border-brand-indigo/10 flex items-center justify-center text-brand-indigo shrink-0">
                    <FiShare2 size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-heading font-bold text-slate-800 block truncate">Viral Content Launch</span>
                    <span className="text-[10px] text-brand-label block font-sans">984 Shares • 8.4K Saves</span>
                  </div>
                  <span className="text-xs font-sans font-bold text-brand-emerald shrink-0">+148%</span>
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
            ORGANIC BRAND BUILDING
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Strategic Social Media Marketing For Business Growth
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-slate-600 font-sans leading-relaxed text-base sm:text-lg text-left md:text-center">
            <p>
              At TSquadron, we help businesses create impactful social media strategies that improve online presence, increase customer engagement, and generate meaningful business growth.
            </p>
            <p>
              Our social media marketing solutions are designed to build strong brand identity, improve audience relationships, and maximize visibility across modern social platforms.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            CAMPAIGN CHANNELS
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Our Social Marketing Services
          </h2>
          <p className="text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
            From strategic account orchestration to conversion-focused paid social ad networks.
          </p>
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

      {/* 4. WHAT WE DO SECTION (Checklists preserved from old page) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            CAMPAIGN PLAYBOOKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            What We Do
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
          {originalPoints.map((point, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-150 flex items-start gap-4 shadow-premium hover:border-slate-300 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                <FiCheckCircle className="text-brand-emerald" size={16} />
              </div>
              <p className="text-slate-700 text-sm sm:text-base font-sans leading-relaxed pt-0.5">
                {point}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHY CHOOSE US SECTION */}
      <section className="relative border-t border-slate-100 py-24 bg-slate-50/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6 mb-20">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
              OUR CREDENTIALS
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
              Why Choose TSquadron For Social Media Marketing?
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

      {/* 6. SOCIAL MEDIA STRATEGY WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            TIMELINE WORKFLOWS
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Our Social Media Marketing Strategy
          </h2>
        </div>

        {/* Timeline representation */}
        <div className="relative max-w-4xl mx-auto w-full px-4 md:px-0">
          {/* Vertical connector line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-200 -translate-x-1/2" />

          {strategyTimeline.map((step, idx) => {
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

      {/* 7. BENEFITS SECTION */}
      <section className="relative border-t border-slate-100 py-24 bg-slate-50/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6 mb-20">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
              BUSINESS ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
              Benefits of Social Media Marketing
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

      {/* 8. FLOATING BANNER STRIPS (Original Archive details preserved) */}
      <section className="py-12 bg-white relative z-10 border-t border-b border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1: Let's discuss */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-indigo uppercase tracking-wider block">
                Let’s discuss SMM needs
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Let’s discuss your social media marketing requirements based on your specific business goals.
              </p>
            </div>

            {/* Box 2: Free consultation */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-violet uppercase tracking-wider block">
                Assisting All Businesses
              </span>
              <p className="text-slate-600 text-xs font-sans">
                We provide free consultations based on your company requirements, organic size, and targets.
              </p>
            </div>

            {/* Box 3: Helping businesses */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-cyan uppercase tracking-wider block">
                Platform Growth Engine
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Helping businesses grow through social platforms with creative solutions for modern digital audiences.
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
              Ready To Build Your Brand Online?
            </h2>
            <p className="text-indigo-100 font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Partner with TSquadron to create powerful social media strategies that increase visibility, engagement, and business growth.
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
