import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiArrowRight, FiCheckCircle, FiTrendingUp, FiGlobe, FiShare2, 
  FiMousePointer, FiMail, FiShield, FiPlus, FiMinus, FiFileText, 
  FiCpu, FiActivity, FiUsers, FiAward, FiTarget, FiChevronRight, FiSearch,
  FiZap, FiBriefcase, FiBarChart2, FiPieChart, FiLayout, FiSmartphone, FiMonitor,
  FiShoppingBag, FiLayers, FiSettings, FiHeart, FiBookOpen, FiHome, FiCheck
} from 'react-icons/fi'
import GlowingCard from '../components/GlowingCard'

export default function UiUxDesigning({ setActivePage }) {
  const [openFaq, setOpenFaq] = useState(null)

  React.useEffect(() => {
    // [SEO Manager Override] document.title = "UI/UX Designing Company in Warangal | TSquadron"
    const metaDesc = document.querySelector('meta[name="description"]')
    const descText = "TSquadron provides professional UI/UX designing services in Warangal including responsive interfaces, user experience design, wireframing, prototyping, and modern digital experiences."
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
    { name: "UI/UX Design", id: "ui-ux-designing-company-hyderabad" }
  ]

  const services = [
    {
      title: "User Interface Design",
      desc: "Design modern and visually appealing interfaces focused on usability and engagement.",
      icon: <FiMonitor className="text-brand-indigo" size={22} />
    },
    {
      title: "User Experience Design",
      desc: "Create seamless user journeys that improve interaction and customer satisfaction.",
      icon: <FiActivity className="text-brand-violet" size={22} />
    },
    {
      title: "Wireframing & Prototyping",
      desc: "Build structured wireframes and interactive prototypes for better product visualization.",
      icon: <FiLayout className="text-brand-cyan" size={22} />
    },
    {
      title: "Mobile App UI/UX",
      desc: "Design intuitive and responsive mobile application interfaces for modern users.",
      icon: <FiSmartphone className="text-brand-rose" size={22} />
    },
    {
      title: "Website UI/UX Design",
      desc: "Develop user-focused website experiences optimized for usability and conversions.",
      icon: <FiGlobe className="text-brand-emerald" size={22} />
    },
    {
      title: "Design Systems",
      desc: "Create scalable design systems for consistency, efficiency, and better user experience.",
      icon: <FiSettings className="text-brand-indigo" size={22} />
    }
  ]

  const whyChooseUs = [
    {
      title: "User-Centered Design",
      desc: "We prioritize user behavior patterns to minimize friction points.",
      icon: <FiUsers className="text-brand-indigo" size={22} />
    },
    {
      title: "Creative Design Thinking",
      desc: "Strategic, artistic design crafted uniquely for competitive brand presence.",
      icon: <FiZap className="text-brand-violet" size={22} />
    },
    {
      title: "Modern UI Standards",
      desc: "Stunning visual elements leveraging modern glassmorphism and spacious layouts.",
      icon: <FiMonitor className="text-brand-cyan" size={22} />
    },
    {
      title: "Intuitive User Experiences",
      desc: "Seamless transition paths that make product flows logical and straightforward.",
      icon: <FiActivity className="text-brand-rose" size={22} />
    },
    {
      title: "Responsive Design Expertise",
      desc: "Clean layout scale optimized perfectly across desktop, mobile, and tablet screens.",
      icon: <FiSmartphone className="text-brand-emerald" size={22} />
    },
    {
      title: "Business-Focused Solutions",
      desc: "Designs engineered directly to drive click actions and compound leads.",
      icon: <FiBriefcase className="text-brand-indigo" size={22} />
    }
  ]

  const processTimeline = [
    { step: "01", title: "User Research", desc: "Audit target behaviors, interview product users, and build key client personas.", icon: <FiSearch size={18} /> },
    { step: "02", title: "Information Architecture", desc: "Construct structured visual flows, catalog content files, and map primary click actions.", icon: <FiLayers size={18} /> },
    { step: "03", title: "Wireframing", desc: "Produce visual blueprint mockups outlining interactive screen layouts.", icon: <FiLayout size={18} /> },
    { step: "04", title: "UI Design", desc: "Draft premium aesthetics with beautiful typography, tailored color grids, and soft shadows.", icon: <FiMonitor size={18} /> },
    { step: "05", title: "Interactive Prototyping", desc: "Compile mockups into live clickable transitions for visual verification.", icon: <FiCpu size={18} /> },
    { step: "06", title: "Usability Testing", desc: "Perform structured screen tests with real users to isolate performance gaps.", icon: <FiActivity size={18} /> },
    { step: "07", title: "Design Optimization", desc: "Fine-tune UI micro-interactions based on target test statistics to lock in growth.", icon: <FiSettings size={18} /> }
  ]

  const benefits = [
    { title: "Better User Experience", desc: "Construct visual pathways that facilitate checkout and lead collection." },
    { title: "Improved Customer Engagement", desc: "Dramatically lower site bounce rates with beautifully balanced UI segments." },
    { title: "Higher Conversion Opportunities", desc: "Convert casual web traffic into solid paying customers easily." },
    { title: "Strong Brand Identity", desc: "Formulate uniform aesthetics that define premium market authority." },
    { title: "Improved Product Usability", desc: "Ensure complex system features feel intuitive and clean to navigate." },
    { title: "Better Customer Satisfaction", desc: "Ignite positive brand experiences during customer checkouts." },
    { title: "Modern Responsive Experiences", desc: "Render gorgeous, spacious pages optimized on any size viewport." },
    { title: "Increased User Retention", desc: "Encourage repeated visual loyalty with smooth user flows." }
  ]

  const faqs = [
    {
      q: "1. What is UI/UX design?",
      a: "UI (User Interface) design maps the visual components—typography, colors, and layout blocks. UX (User Experience) design constructs the underlying interactive flow and logical transition paths to ensure absolute usability."
    },
    {
      q: "2. Why is UI/UX important for businesses?",
      a: "A professional UI/UX setup minimizes client friction, increases click retention, improves conversion rates, and claims immediate market authority."
    },
    {
      q: "3. Do you design responsive interfaces?",
      a: "Yes. All interfaces undergo rigorous cross-device audits to look stunning on mobile, tablet, and widescreen viewports."
    },
    {
      q: "4. Can you redesign existing products or websites?",
      a: "Yes. We rebuild outdated platforms—modernizing graphics, optimizing performance speed, and restructuring checkouts to maximize ROI."
    },
    {
      q: "5. Why choose TSquadron for UI/UX design?",
      a: "We deploy premium, data-backed visual design systems that merge elegant creative art with scientific usability principles to scale business cash volumes."
    }
  ]

  const navigateTo = (pageId) => {
    setActivePage(pageId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="relative pt-24 overflow-hidden">
      {/* Background soft pastel backplates */}
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
                TSquadron UI/UX Solutions
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-slate-900 leading-[1.15]"
            >
              UI/UX Designing <br className="hidden sm:inline" />
              Company <span className="bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-cyan bg-clip-text text-transparent">in Warangal</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 font-sans leading-relaxed max-w-2xl"
            >
              Create seamless digital experiences with modern UI/UX design solutions focused on usability, engagement, and customer satisfaction.
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
              ✓ Designing intuitive digital experiences that combine creativity, functionality, and user-focused innovation.
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

            <div className="relative w-full max-w-[400px] aspect-[10/16] rounded-3xl p-[1px] bg-gradient-to-tr from-slate-200 via-slate-100 to-slate-300/40 shadow-premium bg-white overflow-hidden border border-slate-100">
              <div className="w-full h-8 px-4 flex items-center justify-between border-b border-slate-100 bg-slate-50 text-[10px] text-slate-600 font-sans">
                <div className="flex gap-1.5 items-center">
                  <span className="w-2 h-2 rounded-full bg-brand-rose" />
                  <span className="w-2 h-2 rounded-full bg-[#facc15]" />
                  <span className="w-2 h-2 rounded-full bg-brand-emerald" />
                </div>
                <span>Frictionless Mobile Mockup</span>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <span className="text-[10px] text-brand-label font-sans uppercase block">Interactive Usability</span>
                    <span className="text-base font-heading font-black text-slate-900 block">System Visualizer</span>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-brand-indigo font-bold text-xs">A</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-heading font-bold text-slate-700">Conversion Growth</span>
                    <span className="text-[10px] font-bold text-brand-emerald font-sans">+48.2%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200/60 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-brand-indigo rounded-full" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                  <span className="text-[9px] text-brand-label font-sans block uppercase">Active Task Flow</span>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <FiCheck className="text-brand-emerald shrink-0" size={14} />
                    <span>Reduce form inputs by 50%</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <FiCheck className="text-brand-emerald shrink-0" size={14} />
                    <span>Smooth Micro-transitions</span>
                  </div>
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
            VISUAL PLANNING
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            UI/UX Development Process
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-slate-600 font-sans leading-relaxed text-base sm:text-lg text-left md:text-center">
            <p>
              At TSquadron, we create visually engaging and user-friendly digital experiences that improve customer interaction and business performance.
            </p>
            <p>
              Our UI/UX design approach combines creativity, usability research, modern design systems, and intuitive navigation to build experiences that users love.
            </p>
          </div>
        </div>
      </section>

      {/* 3. UI/UX SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            CORE SERVICES
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            UI/UX Services
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

      {/* 4. WHY CHOOSE TSQUADRON SECTION */}
      <section className="relative border-t border-slate-100 py-24 bg-slate-50/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6 mb-20">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
              DESIGN CREDENTIALS
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
              Why Choose TSquadron For UI/UX Design?
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

      {/* 5. UI/UX DEVELOPMENT PROCESS TIMELINE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            WORKFLOW PIPELINE
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Our UI/UX Development Process
          </h2>
        </div>

        {/* Vertical connected timeline */}
        <div className="max-w-3xl mx-auto relative border-l border-slate-200 pl-8 space-y-12 text-left">
          {processTimeline.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              {/* Connected node dot */}
              <div className="absolute -left-[45px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-brand-indigo flex items-center justify-center font-heading font-bold text-xs text-brand-indigo shadow-sm">
                {step.step}
              </div>
              <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-premium hover:shadow-md transition-all duration-300">
                <h3 className="font-heading font-bold text-lg text-slate-900 block mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm font-sans leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. BENEFITS SECTION */}
      <section className="relative border-t border-slate-100 py-24 bg-slate-50/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6 mb-20">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
              BUSINESS VALUE
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
              Benefits of Professional UI/UX Design
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

      {/* 7. REPUTABLE COMPANY SHOWCASE SECTION */}
      <section className="py-24 bg-gradient-to-tr from-brand-indigo/10 via-brand-violet/5 to-brand-cyan/5 border-t border-b border-slate-100 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            LOCAL REPUTABLE PARTNER
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            If You're Looking For A UI/UX Design Company <br className="hidden sm:inline" />
            in Warangal
          </h2>
          <p className="text-slate-700 text-lg sm:text-xl font-sans leading-relaxed max-w-3xl mx-auto">
            TSquadron is a reputable UI/UX designing company in Warangal focused on creating captivating digital experiences with intuitive interfaces and modern user-centered solutions.
          </p>
          <button
            onClick={() => navigateTo('contact')}
            className="px-8 py-4 rounded-full font-heading font-semibold text-white bg-brand-indigo hover:bg-brand-indigo/90 shadow-lg hover:shadow-xl transition-all"
          >
            Schedule Strategy Audit
          </button>
        </div>
      </section>

      {/* 8. SMALL SINGLE-LINE HIGHLIGHT STRIPS (Original Archive details preserved) */}
      <section className="py-12 bg-white relative z-10 border-t border-b border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1 */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-indigo uppercase tracking-wider block">
                Get A Quote
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Creating captivating digital experiences with highly intuitive user interfaces.
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-violet uppercase tracking-wider block">
                Expand Globally
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Strategically expanding businesses in digital markets to drive sales growth.
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-cyan uppercase tracking-wider block">
                Market Intent
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Strong global presence in Warangal to ignite brand awareness and conversion desire.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 9. BRAND STORY SECTION */}
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

      {/* 10. FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-center">
        <div className="space-y-6 mb-16">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            FAQ ACCORDIONS
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
              Ready To Create Better Digital Experiences?
            </h2>
            <p className="text-indigo-100 font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Partner with TSquadron to design modern, engaging, and user-focused digital experiences that improve customer satisfaction and business growth.
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
