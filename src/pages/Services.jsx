import React from 'react'
import { motion } from 'framer-motion'
import { 
  FiTrendingUp, FiGlobe, FiShare2, FiMousePointer, FiMail, 
  FiShield, FiCpu, FiZap, FiArrowRight, FiCheckCircle 
} from 'react-icons/fi'

export default function Services({ setActivePage, selectedServiceId, setSelectedServiceId }) {
  React.useEffect(() => {
    if (selectedServiceId) {
      const element = document.getElementById(selectedServiceId)
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          setSelectedServiceId(null) // clear to prevent repeat triggers
        }, 300) // Delay to account for page-wipe transitions
        return () => clearTimeout(timer)
      }
    }
  }, [selectedServiceId, setSelectedServiceId])
  const servicesList = [
    {
      id: "digital-marketing",
      title: "Digital Marketing Strategy",
      icon: <FiTrendingUp size={28} className="text-brand-cyan" />,
      problem: "You are generating traffic, but your customer acquisition cost (CAC) remains high and organic conversions are stagnant.",
      solution: "We build 360° omnichannel growth systems that unify search intent, automated nurture workflows, and user psychology to compress your sales funnel.",
      benefits: ["Omnichannel campaigns", "Conversion audits", "High-converting copy blueprints", "Lead-scoring models"],
      gradient: "from-brand-cyan/10 to-brand-indigo/5"
    },
    {
      id: "seo",
      title: "Search Engine Optimization (SEO)",
      icon: <FiGlobe size={28} className="text-brand-indigo" />,
      problem: "Your company relies entirely on high-cost paid ads, leaving you vulnerable to sudden bid increases.",
      solution: "We design deep technical SEO frameworks—focusing on advanced index optimization, programmatic entities, and high-impact industry backlinks.",
      benefits: ["Programmatic keywords", "Schema structure audits", "High-authority editorial links", "Velocity speed indexing"],
      gradient: "from-brand-indigo/10 to-brand-violet/5"
    },
    {
      id: "social-media",
      title: "Social Media Marketing (SMM)",
      icon: <FiShare2 size={28} className="text-brand-violet" />,
      problem: "Your social feeds look inactive or generic, failing to capture user attention or construct real brand equity.",
      solution: "Our creative studio builds high-fidelity visual assets and structured social templates designed to spark viral interest, community engagement, and organic traffic.",
      benefits: ["High-impact visual creatives", "Automated social syndication", "UGC video templates", "Audience sentiment trackers"],
      gradient: "from-brand-violet/10 to-brand-rose/5"
    },
    {
      id: "ppc",
      title: "Pay-Per-Click Advertising (PPC)",
      icon: <FiMousePointer size={28} className="text-brand-rose" />,
      problem: "Ad spend leaks into unrelated search terms, and conversion rates do not justify the monthly budget.",
      solution: "We run precision bidding on Google Search, Meta Ads, and LinkedIn. Every dollar is monitored using custom bounds to target ready-to-buy users.",
      benefits: ["Smart-bid capping rules", "Custom landing dynamic copy", "Competitor ad spying", "Weekly ROI dashboards"],
      gradient: "from-brand-rose/10 to-brand-emerald/5"
    },
    {
      id: "email",
      title: "Email Marketing & Automation",
      icon: <FiMail size={28} className="text-brand-cyan" />,
      problem: "Subscribers lay dormant. Cart abandonment rates are high, and your weekly emails end up in spam folders.",
      solution: "We deploy automated email triggers linked to real-time user behavior. We design drip funnels, cart recovery sequences, and newsletter formats that generate revenue.",
      benefits: ["Active list scrubbing", "Behavioral trigger emails", "High-converting copy layouts", "Continuous A/B split tests"],
      gradient: "from-brand-cyan/10 to-brand-emerald/5"
    },
    {
      id: "orm",
      title: "Online Reputation Management (ORM)",
      icon: <FiShield size={28} className="text-brand-indigo" />,
      problem: "Negative search listings or outdated business reviews damage sales and lower user trust during checkout.",
      solution: "We proactively generate positive client testimonials, restructure search search indexes to emphasize success stories, and manage brand sentiment online.",
      benefits: ["Real-time review generators", "De-indexing request filings", "Brand sentiment analysis", "Proactive media alerts"],
      gradient: "from-brand-indigo/10 to-brand-cyan/5"
    },
    {
      id: "web-design",
      title: "Premium Web Design & Dev",
      icon: <FiCpu size={28} className="text-brand-violet" />,
      problem: "Outdated, slow-loading templates create high bounce rates and lower brand authority.",
      solution: "We build premium bespoke websites. Our creations load fast, utilize modern glassmorphism, and scale flawlessly across all responsive device sizes.",
      benefits: ["Lightning fast load speeds", "Immersive scroll dynamics", "Bespoke animations", "Highly secure hosting setups"],
      gradient: "from-brand-violet/10 to-brand-cyan/5"
    },
    {
      id: "ui-ux",
      title: "Conversion UI/UX Design",
      icon: <FiZap size={28} className="text-brand-emerald" />,
      problem: "Users visit your pricing page but drop out before starting a checkout, due to confusing navigation pathways.",
      solution: "We optimize the entire purchase flow. We redesign visual elements, test form layouts, and remove friction points to maximize customer conversions.",
      benefits: ["Bespoke wireframes", "User session video tracking", "Frictionless form maps", "Optimized micro-interactions"],
      gradient: "from-brand-emerald/10 to-brand-indigo/5"
    }
  ]

  return (
    <div className="relative pt-24 overflow-hidden">
      {/* Soft Pastel Background washes */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-violet/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Services Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/60 backdrop-blur-md"
          >
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans">
              TSQUADRON CAPABILITIES
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-heading font-extrabold text-slate-900 tracking-tight leading-none"
          >
            Capabilities Engineered <br />
            <span className="bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-cyan bg-clip-text text-transparent">
              To Scale Conversions
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 font-sans leading-relaxed max-w-xl mx-auto"
          >
            Explore our comprehensive digital systems engineered explicitly to eliminate customer bounce rates and drive organic cash revenue.
          </motion.p>
        </div>
      </section>

      {/* 8 Services Deep Dive Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative z-10 space-y-16">
        {servicesList.map((service, idx) => (
          <motion.div
            key={service.id}
            id={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`relative rounded-[32px] overflow-hidden border border-slate-200/80 bg-white p-8 sm:p-12 hover:border-slate-300 transition-colors shadow-premium`}
          >
            {/* Ambient Background Glow inside the card */}
            <div className={`absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br ${service.gradient} rounded-full blur-[80px] opacity-20 pointer-events-none`} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
              {/* Left Column: Heading and Icon */}
              <div className="lg:col-span-4 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                  {service.icon}
                </div>
                {(() => {
                  const getServiceRoute = (id) => {
                    if (id === 'digital-marketing') return 'digital-marketing-agency-hanamkonda'
                    if (id === 'seo') return 'seo-company-in-hanamkonda'
                    if (id === 'social-media') return 'social-media-marketing'
                    if (id === 'ppc') return 'ppc-services-in-hanamkonda'
                    if (id === 'email') return 'email-marketing-company-hanamkonda'
                    if (id === 'orm') return 'online-reputation-management-services-hanumakonda'
                    if (id === 'web-design') return 'web-designing-development-company-hanumakonda'
                    if (id === 'ui-ux') return 'ui-ux-designing-company-hanamkonda'
                    return null
                  }
                  const route = getServiceRoute(service.id)
                  return (
                    <>
                      <h2 
                        onClick={() => {
                          if (route) {
                            setActivePage(route)
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }
                        }}
                        className={`text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight ${route ? 'cursor-pointer hover:text-brand-indigo transition-colors duration-300' : ''}`}
                      >
                        {service.title}
                      </h2>
                      
                      {/* CTA inside each service */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        {route && (
                          <button
                            onClick={() => {
                              setActivePage(route)
                              window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}
                            className="group flex items-center justify-center gap-2 px-6 py-3 rounded-full font-heading font-semibold text-xs text-white bg-gradient-to-r from-brand-indigo to-brand-violet hover:shadow-[0_4px_12px_rgba(99,102,241,0.25)] transition-all duration-300"
                          >
                            Explore Service Details <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setActivePage('contact')
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }}
                          className="group flex items-center justify-center gap-2 px-6 py-3 rounded-full font-heading font-semibold text-xs text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all duration-300"
                        >
                          Book Strategy Session
                        </button>
                      </div>
                    </>
                  )
                })()}
              </div>

              {/* Middle Column: Problem vs Solution */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2">
                  <span className="text-[10px] font-semibold text-brand-rose uppercase tracking-widest block font-sans">
                    The Growth Barrier
                  </span>
                  <p className="text-slate-600 text-sm font-sans leading-relaxed">
                    {service.problem}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-indigo-50/40 border border-brand-indigo/10 space-y-2">
                  <span className="text-[10px] font-semibold text-brand-indigo uppercase tracking-widest block font-sans">
                    Our Redesign Blueprint
                  </span>
                  <p className="text-slate-700 text-sm font-sans leading-relaxed">
                    {service.solution}
                  </p>
                </div>
              </div>

              {/* Right Column: Key Deliverables/Benefits */}
              <div className="lg:col-span-3 space-y-4 text-left">
                <span className="text-[10px] font-semibold text-brand-label uppercase tracking-widest block font-sans">
                  Key Deliverables
                </span>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <FiCheckCircle className="text-brand-emerald shrink-0" size={16} />
                      <span className="text-slate-700 text-xs sm:text-sm font-sans">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  )
}
