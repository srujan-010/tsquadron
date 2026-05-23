import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiArrowRight, FiCheckCircle, FiTrendingUp, FiGlobe, FiShare2, 
  FiMousePointer, FiMail, FiShield, FiPlus, FiMinus, FiFileText, 
  FiCpu, FiActivity, FiUsers, FiAward, FiTarget, FiChevronRight, FiSearch,
  FiBriefcase, FiHeart, FiBookOpen, FiHome, FiLayers, FiMapPin
} from 'react-icons/fi'
import GlowingCard from '../components/GlowingCard'

export default function DigitalMarketing({ setActivePage }) {
  const [openFaq, setOpenFaq] = useState(null)

  React.useEffect(() => {
    // [SEO Manager Override] document.title = "Digital Marketing Agency in Warangal | TSquadron"
    const metaDesc = document.querySelector('meta[name="description"]')
    const descText = "TSquadron is a leading digital marketing agency in Warangal offering SEO, social media marketing, PPC, email marketing, ORM, and growth-focused digital solutions."
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
    { name: "Digital Marketing", id: "digital-marketing-agency-hanamkonda" }
  ]

  const benefits = [
    { 
      title: "Targeted Audience", 
      desc: "Businesses can increase conversion rates by reaching particular demographics interested in their products or services through precise targeting.",
      icon: <FiTarget className="text-brand-indigo" size={22} />
    },
    { 
      title: "Cost-Effective", 
      desc: "Thanks to online marketing more affordable strategies than traditional marketing, businesses are able to allocate their budgets more efficiently.",
      icon: <FiTrendingUp className="text-brand-violet" size={22} />
    },
    { 
      title: "Measurable Results", 
      desc: "Businesses are able to monitor the effectiveness of their campaigns and make data-driven decisions because it offers measurable outcomes in real-time.",
      icon: <FiActivity className="text-brand-cyan" size={22} />
    },
    { 
      title: "Brand Visibility", 
      desc: "It raises brand awareness and recognition among new customers by improving brand visibility across a range of digital platforms.",
      icon: <FiGlobe className="text-brand-rose" size={22} />
    },
    { 
      title: "Engagement and Interaction", 
      desc: "It improves customer relationships by promoting direct audience engagement, feedback, and interaction.",
      icon: <FiUsers className="text-brand-emerald" size={22} />
    },
    { 
      title: "Responding and Flexibility", 
      desc: "Since digital advertising techniques can be adjusted and improved in real-time, they provide the flexibility to react quickly to changes in the market.",
      icon: <FiCpu className="text-brand-indigo" size={22} />
    },
    { 
      title: "Competitive Advantage", 
      desc: "Businesses can differentiate themselves in the market by putting into action effective strategies.",
      icon: <FiAward className="text-brand-violet" size={22} />
    },
    { 
      title: "Understanding Client Needs", 
      desc: "Tsquadron likely begins by comprehensively understanding the client’s business, goals, target audience, and unique requirements.",
      icon: <FiSearch className="text-brand-cyan" size={22} />
    }
  ]

  const sectors = [
    { name: "Health", icon: <FiHeart size={20} className="text-rose-500" /> },
    { name: "Education", icon: <FiBookOpen size={20} className="text-blue-500" /> },
    { name: "Real Estate", icon: <FiHome size={20} className="text-amber-500" /> },
    { name: "Construction", icon: <FiLayers size={20} className="text-indigo-500" /> },
    { name: "Enterprises", icon: <FiBriefcase size={20} className="text-emerald-500" /> },
    { name: "Ecommerce", icon: <FiMousePointer size={20} className="text-violet-500" /> }
  ]

  const workflow = [
    {
      title: "Understanding Client Needs",
      desc: "Tsquadron likely begins by comprehensively understanding the client’s business, goals, target audience, and unique requirements."
    },
    {
      title: "Strategy Development",
      desc: "Using the data acquired, our agency creates a customised plan that includes a range of channels, including PPC, social media, SEO, and content marketing."
    },
    {
      title: "Implementation",
      desc: "We would start the execution phase after the strategy was decided upon, developing and putting into action campaigns on selected digital platforms."
    },
    {
      title: "Monitoring and Optimization",
      desc: "It’s critical to continuously monitor campaigns. Tsquadron probably closely monitors performance indicators and modifies campaigns as needed to maximise outcomes."
    },
    {
      title: "Local Market Understanding",
      desc: "Continuously analyze campaign performance for valuable insights and implement improvements to enhance overall effectiveness."
    },
    {
      title: "Frequent Reporting",
      desc: "It’s critical to provide regular updates on the success of campaigns. We may provide clients with in-depth reports that highlight key performance indicators (KPIs) and insights."
    }
  ]

  const faqs = [
    {
      q: "1. What exactly does a digital marketing agency do?",
      a: "In order to increase a brand’s online visibility, engage with its target audience, and promote conversions, a digital advertising company develops and implements online strategies across a variety of channels, including social media, SEO, content, and ads."
    },
    {
      q: "2. How can digital marketing services help your business?",
      a: "Digital advertising services can help your business grow by expanding your online audience reach, improving your interactions with that audience, and driving more conversions through a range of online channels and tactics."
    },
    {
      q: "3. What sets your digital marketing company apart from others in the industry?",
      a: "Our digital marketing Company in Warangal is distinguished by its creative methods, customized plans, and committed staff that strives to meet the specific needs of every customer with quantifiable outcomes."
    },
    {
      q: "4. What is SEO in digital marketing?",
      a: "SEO, or search engine optimization’s, is the process used in internet marketing to increase organic traffic by making websites and content more visible and highly ranked on search engine results pages."
    },
    {
      q: "5. Who uses digital marketing services?",
      a: "Digital marketing services are used by companies of all sizes and sectors, including startups, small businesses, multinational corporations, and non-profit organisations, to improve their online presence and successfully communicate with their target audiences."
    }
  ]

  const navigateTo = (pageId) => {
    setActivePage(pageId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="relative pt-24 overflow-hidden">
      {/* Soft Pastel Background washes */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-brand-violet/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[600px] right-10 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />

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
          
          {/* Hero Copy */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/60 backdrop-blur-md"
            >
              <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans">
                BEST Digital Marketing Agency in Warangal
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-slate-900 leading-[1.15]"
            >
              Our Specializations of <br className="hidden sm:inline" />
              Digital Marketing Services <br className="hidden sm:inline" />
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
              Partner with a top digital agency to out do your competitors. Get customer perspective.
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
                onClick={() => {
                  const element = document.getElementById("benefits-section")
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-heading font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all duration-300"
              >
                Explore Benefits
              </button>
            </motion.div>

            {/* Small Trust Line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xs text-brand-label font-sans tracking-wide font-medium"
            >
              ✓ Trusted by growing brands, startups, and local businesses across Warangal.
            </motion.p>
          </div>

          {/* Hero Visual Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative w-full flex justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo to-brand-cyan opacity-5 blur-3xl rounded-full pointer-events-none" />

            <div className="relative w-full max-w-[450px] aspect-[4/3] rounded-3xl p-[1px] bg-gradient-to-tr from-slate-200 via-slate-100 to-slate-300/40 shadow-premium bg-white overflow-hidden border border-slate-100">
              <div className="w-full h-8 px-4 flex items-center gap-1.5 border-b border-slate-100 bg-slate-50">
                <span className="w-2 h-2 rounded-full bg-brand-rose" />
                <span className="w-2 h-2 rounded-full bg-[#facc15]" />
                <span className="w-2 h-2 rounded-full bg-brand-emerald" />
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-50 pb-2">
                  <span className="font-heading font-bold text-slate-800">Warangal Analytics</span>
                  <span className="text-brand-indigo font-semibold">Active Engine</span>
                </div>
                
                {/* Simulated Lead Gen UI */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-brand-label">
                    <span>Leads Generated</span>
                    <span className="text-brand-emerald font-bold">+184% YoY</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[84%] h-full bg-gradient-to-r from-brand-indigo to-brand-cyan rounded-full" />
                  </div>
                </div>

                {/* SVG Visual line chart representing growth */}
                <div className="w-full h-24 bg-slate-50 rounded-xl border border-slate-100 p-2 overflow-hidden flex items-end">
                  <svg viewBox="0 0 200 60" className="w-full h-20 overflow-visible text-brand-indigo">
                    <path 
                      d="M0,50 L20,40 Q40,25 60,35 T100,15 T140,28 T180,5 T200,2" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                    />
                    <circle cx="200" cy="2" r="3" fill="#163C8C" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="border-t border-slate-100 py-20 relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            RESULT-ORIENTED STRATEGY
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Accelerate Your Business Growth With Strategic Digital Marketing
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-slate-600 font-sans leading-relaxed text-base sm:text-lg text-left md:text-center">
            <p>
              In today’s competitive digital landscape, having a strong online presence is essential for business success. At TSquadron, we create result-oriented digital marketing strategies that help businesses attract the right audience, increase conversions, and build long-term brand value.
            </p>
            <p>
              Our team combines creativity, market research, performance analytics, and modern marketing techniques to deliver measurable business outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS OF DIGITAL MARKETING */}
      <section id="benefits-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            BENEFITS & ROI
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            What benefits can digital marketing services offer your company?
          </h2>
          <p className="text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
            Outdo your competitors and acquire customers perspective with our robust performance frameworks.
          </p>
        </div>

        {/* Responsive Grid with 8 exact Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {benefits.map((item, idx) => (
            <GlowingCard key={idx} delay={idx * 0.05} className="min-h-[250px]">
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

      {/* 4. ASSISTING ALL BUSINESSES (Sector Badges) */}
      <section className="border-t border-slate-100 py-20 bg-slate-50/30 relative z-10 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6 mb-12">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
              VERTICALS WE EMPOWER
            </span>
            <h2 className="text-3xl font-heading font-bold text-slate-900">
              Assisting All Businesses
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {sectors.map((sector, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border border-slate-100 shadow-premium hover:shadow-md transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                  {sector.icon}
                </div>
                <span className="font-heading font-bold text-sm text-slate-800">{sector.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROCESS WORKFLOW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            OUR ROADMAP
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Our Digital Marketing Process
          </h2>
        </div>
        {/* Timeline representation */}
        <div className="relative max-w-4xl mx-auto w-full px-4 md:px-0">
          {/* Vertical connector line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-200 -translate-x-1/2" />

          {workflow.map((step, idx) => {
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

      {/* 6. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="space-y-6 mb-16">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            ACCORDION INSIGHTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Frequently Answered Insights
          </h2>
        </div>

        {/* Accordions */}
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

      {/* 7. FINAL HIGH-CONVERSION CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 text-center">
        <div className="relative rounded-[32px] p-8 sm:p-16 bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-indigo/90 border border-white/10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white leading-tight">
              Boost your online business today with a trusted digital marketing agency in Warangal!
            </h2>
            <p className="text-indigo-100 font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Are you discouraged that the potential of your online business remains unrealized? Want sales and traffic that actually match your efforts but with more of both? Look no further than Tsquadron
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigateTo('contact')}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-semibold text-brand-indigo bg-white hover:bg-slate-100 transition-all duration-300 shadow-lg"
              >
                Get A Quote
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
              >
                Contact us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
