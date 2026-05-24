import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiArrowRight, FiCheckCircle, FiTrendingUp, FiGlobe, FiShare2, 
  FiMousePointer, FiMail, FiShield, FiPlus, FiMinus, FiFileText, 
  FiCpu, FiActivity, FiUsers, FiAward, FiTarget, FiChevronRight, FiSearch,
  FiZap, FiBriefcase, FiBarChart2, FiPieChart, FiLayout, FiSmartphone, FiMonitor,
  FiShoppingBag, FiLayers, FiSettings, FiHeart, FiBookOpen, FiHome
} from 'react-icons/fi'
import GlowingCard from '../components/GlowingCard'

export default function WebDesigning({ setActivePage }) {
  const [openFaq, setOpenFaq] = useState(null)

  React.useEffect(() => {
  }, [])

  const breadcrumbs = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Web Designing", id: "web-designing-development-company-hanumakonda" }
  ]

  const howWeWork = [
    {
      title: "Research & Strategy",
      desc: "Audit target audiences, analyze key competitors, and build clean layout blueprints.",
      icon: <FiSearch className="text-brand-indigo" size={22} />
    },
    {
      title: "UI/UX Planning",
      desc: "Construct high-fidelity wireframes and frictionless navigation path guides.",
      icon: <FiLayout className="text-brand-violet" size={22} />
    },
    {
      title: "Design & Prototyping",
      desc: "Synthesize responsive graphics and dynamic high-fidelity live prototypes.",
      icon: <FiMonitor className="text-brand-cyan" size={22} />
    },
    {
      title: "Responsive Development",
      desc: "Translate design blueprints into high-performance web structures using modern stacks.",
      icon: <FiCpu className="text-brand-rose" size={22} />
    },
    {
      title: "Testing & Optimization",
      desc: "Execute speed tests, multi-device audits, and performance tuning pipelines.",
      icon: <FiSettings className="text-brand-emerald" size={22} />
    },
    {
      title: "Launch & Support",
      desc: "Deploy site files, bypass hosting barriers, and configure continuous monitoring engines.",
      icon: <FiZap className="text-brand-indigo" size={22} />
    }
  ]

  const industries = [
    { title: "Health", desc: "Patient portals, custom clinic schedulers, and healthcare system sites.", icon: <FiHeart className="text-brand-rose" size={22} /> },
    { title: "Education", desc: "Interactive student portals, virtual e-learning platforms, and university directories.", icon: <FiBookOpen className="text-brand-indigo" size={22} /> },
    { title: "Real Estate", desc: "Visual housing listings, virtual video previews, and customer maps.", icon: <FiHome className="text-brand-cyan" size={22} /> },
    { title: "Construction", desc: "Robust commercial portfolios, proposal tools, and contractor directories.", icon: <FiLayers className="text-brand-violet" size={22} /> },
    { title: "Enterprises", desc: "High-scale custom sites, headless platforms, and secure databases.", icon: <FiBriefcase className="text-brand-emerald" size={22} /> },
    { title: "Ecommerce", desc: "High-speed storefront grids, shopping checkouts, and CRM connections.", icon: <FiShoppingBag className="text-brand-rose" size={22} /> }
  ]

  const services = [
    {
      title: "Responsive Website Design",
      desc: "Build websites optimized for desktop, tablet, and mobile devices.",
      icon: <FiSmartphone className="text-brand-indigo" size={22} />
    },
    {
      title: "UI/UX Design",
      desc: "Create user-focused interfaces with seamless navigation and engaging experiences.",
      icon: <FiLayout className="text-brand-violet" size={22} />
    },
    {
      title: "Business Website Design",
      desc: "Develop professional business websites that strengthen credibility and brand presence.",
      icon: <FiBriefcase className="text-brand-cyan" size={22} />
    },
    {
      title: "Ecommerce Website Design",
      desc: "Design modern ecommerce platforms focused on customer experience and conversions.",
      icon: <FiShoppingBag className="text-brand-rose" size={22} />
    },
    {
      title: "Landing Page Design",
      desc: "Create high-converting landing pages optimized for lead generation and marketing campaigns.",
      icon: <FiZap className="text-brand-emerald" size={22} />
    },
    {
      title: "Website Redesign",
      desc: "Modernize outdated websites with improved UI, performance, and responsiveness.",
      icon: <FiSettings className="text-brand-indigo" size={22} />
    }
  ]

  const whyChooseUs = [
    {
      title: "Creative Web Solutions",
      desc: "Artistic, modern layout design crafted precisely around conversion principles.",
      icon: <FiMonitor className="text-brand-indigo" size={22} />
    },
    {
      title: "Responsive Design Expertise",
      desc: "Flawless site rendering adjusted beautifully on all screens.",
      icon: <FiSmartphone className="text-brand-violet" size={22} />
    },
    {
      title: "User-Centered UI/UX",
      desc: "Laser-focused user journeys built to reduce bounce rates and spark engagement.",
      icon: <FiLayout className="text-brand-cyan" size={22} />
    },
    {
      title: "Performance Optimization",
      desc: "Lightning-fast page speeds achieving top Core Web Vitals rankings.",
      icon: <FiCpu className="text-brand-rose" size={22} />
    },
    {
      title: "SEO-Friendly Design",
      desc: "Structured schemas and semantic structures optimized for organic discovery.",
      icon: <FiGlobe className="text-brand-emerald" size={22} />
    },
    {
      title: "Business-Focused Development",
      desc: "High-value digital creations tuned explicitly to compound sales leads.",
      icon: <FiBriefcase className="text-brand-indigo" size={22} />
    }
  ]

  const benefits = [
    { title: "Strong Online Presence", desc: "Command top local and international discovery footprints beautifully." },
    { title: "Better User Experience", desc: "Construct intuitive client visual maps that facilitate checkout actions." },
    { title: "Improved Brand Credibility", desc: "Claim immediate market authority with a modern SaaS aesthetics format." },
    { title: "Higher Conversion Opportunities", desc: "Strategically convert web visitors into sales prospects easily." },
    { title: "Mobile Responsiveness", desc: "Ensure your layout scales perfectly on mobile viewports." },
    { title: "Faster Website Performance", desc: "Minimize customer abandonment drop-offs with clean code compiling." },
    { title: "SEO-Friendly Structure", desc: "Establish permanent visibility across competitive search categories." },
    { title: "Better Customer Engagement", desc: "Nurture customer loops with gorgeous interactive blocks." }
  ]

  const faqs = [
    {
      q: "1. Why is professional web design important?",
      a: "A professional web layout instantly improves brand credibility, establishes a trustworthy customer presence, reduces bounces, and lifts transaction rates."
    },
    {
      q: "2. Do you create responsive websites?",
      a: "Yes. Every single web system we build undergoes rigorous cross-viewport responsive audits to look gorgeous on mobile, tablet, and widescreen setups."
    },
    {
      q: "3. Can you redesign existing websites?",
      a: "Yes. We specialize in modernizing outdated corporate websites—improving UI speed, loading performance, indexing structures, and overall conversion layouts."
    },
    {
      q: "4. Do you provide ecommerce website design?",
      a: "Yes. We design high-speed ecommerce platforms equipped with interactive filters, cart tools, checkout fields, and secure CRM integrations."
    },
    {
      q: "5. Why choose TSquadron for web designing?",
      a: "We provide creative, data-backed, and business-focused web systems engineered specifically to transform visitors into paying customers."
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
                TSquadron Web Designing Solutions
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-slate-900 leading-[1.15]"
            >
              Best Web Designing <br className="hidden sm:inline" />
              Company <span className="bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-cyan bg-clip-text text-transparent">in Warangal</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 font-sans leading-relaxed max-w-2xl"
            >
              We create modern, responsive, and visually engaging websites designed to strengthen your online presence and drive real business growth.
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
              ✓ Helping businesses build impactful digital experiences with modern web design solutions.
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
                <span>Responsive Viewport Panel</span>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] text-brand-label font-sans block uppercase">Loading Speed</span>
                    <span className="text-base font-heading font-black text-brand-indigo block">0.8s</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] text-brand-label font-sans block uppercase">Core Web Score</span>
                    <span className="text-base font-heading font-black text-brand-violet block">99 / 100</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-brand-indigo/10 flex items-center justify-center text-brand-indigo shrink-0">
                    <FiLayout size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-heading font-bold text-slate-800 block truncate">Fluid Grid Framework</span>
                    <span className="text-[10px] text-brand-label block font-sans">Responsive rendering active</span>
                  </div>
                  <span className="text-xs font-sans font-bold text-brand-emerald shrink-0">+100%</span>
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
            WEB ARCHITECTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Our Web Designing Solutions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-slate-600 font-sans leading-relaxed text-base sm:text-lg text-left md:text-center">
            <p>
              At TSquadron, we design powerful online experiences and provide comprehensive web solutions tailored to business goals. Our web designing services combine creativity, user experience, responsiveness, and modern technologies to create websites that deliver measurable results.
            </p>
            <p>
              We focus on building visually appealing, fast, and user-friendly websites that help businesses establish strong digital presence and customer trust.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW WE WORK SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            WORKFLOW PROTOCOLS
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            How We Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {howWeWork.map((step, idx) => (
            <GlowingCard key={idx} delay={idx * 0.05} className="min-h-[220px]">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:border-brand-indigo/40 transition-colors">
                  {step.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-brand-indigo transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm font-sans leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </GlowingCard>
          ))}
        </div>
      </section>

      {/* 4. ASSISTING ALL BUSINESSES SECTION */}
      <section className="relative border-t border-slate-100 py-24 bg-slate-50/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6 mb-20">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
              SECTOR ADAPTATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
              Assisting All Businesses
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {industries.map((ind, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-100 flex flex-col justify-between space-y-4 shadow-premium hover:shadow-md hover:border-slate-200 transition-all duration-300 relative group"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-transparent via-brand-indigo to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  {ind.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-brand-indigo transition-colors block">
                  {ind.title}
                </h3>
                <p className="text-slate-600 text-sm font-sans leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR WEB DESIGN SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            CREATIVE DELIVERABLES
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Our Web Design Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {services.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-slate-100 flex flex-col justify-between space-y-6 shadow-premium hover:shadow-md hover:border-slate-200/80 transition-all duration-300 group"
            >
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
          ))}
        </div>
      </section>

      {/* 6. WHY CHOOSE TSQUADRON SECTION */}
      <section className="relative border-t border-slate-100 py-24 bg-slate-50/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6 mb-20">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
              OUR CREDENTIALS
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
              Why Businesses Choose TSquadron
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {whyChooseUs.map((reason, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-100 flex flex-col justify-between space-y-4 shadow-premium hover:shadow-md hover:border-slate-200 transition-all duration-300 relative group"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-transparent via-brand-indigo to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  {reason.icon}
                </div>
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

      {/* 7. BENEFITS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            BUSINESS VALUE
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Benefits of Professional Web Designing
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
      </section>

      {/* 8. CREATIVE AGENCY SHOWCASE SECTION */}
      <section className="py-24 bg-gradient-to-tr from-brand-indigo/10 via-brand-violet/5 to-brand-cyan/5 border-t border-b border-slate-100 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            LOCAL CREATIVE STUDIO
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            We Are A Creative Web Designing Agency <br className="hidden sm:inline" />
            in Warangal
          </h2>
          <p className="text-slate-700 text-lg sm:text-xl font-sans leading-relaxed max-w-3xl mx-auto">
            Partner with our creative web designing company in Warangal to create stunning websites that drive tangible results and leave a lasting impression online.
          </p>
          <button
            onClick={() => navigateTo('contact')}
            className="px-8 py-4 rounded-full font-heading font-semibold text-white bg-brand-indigo hover:bg-brand-indigo/90 shadow-lg hover:shadow-xl transition-all"
          >
            Start Project Conception
          </button>
        </div>
      </section>

      {/* 9. FLOATING BANNER STRIPS (Original Archive details preserved) */}
      <section className="py-12 bg-white relative z-10 border-t border-b border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1 */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-indigo uppercase tracking-wider block">
                Get A Quote
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Assisting all business types with comprehensive solutions to your needs.
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-violet uppercase tracking-wider block">
                Stunning Websites
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Create gorgeous platforms engineered to drive tangible growth results.
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

      {/* 10. BRAND STORY SECTION */}
      <section className="py-24 bg-slate-50/40 border-t border-b border-slate-100 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            OUR STORY
          </span>
          <p className="text-slate-700 text-lg sm:text-xl font-sans leading-relaxed max-w-3xl mx-auto">
            “TSquadron creates and defines brand identities, strategically expands businesses in digital markets, and ignites brand awareness, sales, and desire. With a strong global presence in Warangal, TSquadron’s expertise and passion fuel your brand’s remarkable digital journey.”
          </p>
        </div>
      </section>

      {/* 11. FAQ ACCORDION SECTION */}
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

      {/* 12. FINAL HIGH-CONVERSION CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 text-center">
        <div className="relative rounded-[32px] p-8 sm:p-16 bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-indigo/90 border border-white/10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white leading-tight">
              Ready To Build A Powerful Online Presence?
            </h2>
            <p className="text-indigo-100 font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Partner with TSquadron to create modern, responsive, and high-performing websites that elevate your brand and drive business growth.
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
