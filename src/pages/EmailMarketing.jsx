import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiArrowRight, FiCheckCircle, FiTrendingUp, FiGlobe, FiShare2, 
  FiMousePointer, FiMail, FiShield, FiPlus, FiMinus, FiFileText, 
  FiCpu, FiActivity, FiUsers, FiAward, FiTarget, FiChevronRight, FiSearch,
  FiZap, FiBriefcase, FiBarChart2, FiPieChart
} from 'react-icons/fi'
import GlowingCard from '../components/GlowingCard'

export default function EmailMarketing({ setActivePage }) {
  const [openFaq, setOpenFaq] = useState(null)

  React.useEffect(() => {
  }, [])

  const breadcrumbs = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Email Marketing", id: "email-marketing-company-hanamkonda" }
  ]

  const services = [
    {
      title: "Email Campaign Strategy",
      desc: "Develop comprehensive, data-driven email frameworks aligned with your business goals, target audience segments, and buyer behaviors to maximize long-term campaign ROI.",
      icon: <FiBriefcase className="text-brand-indigo" size={22} />
    },
    {
      title: "Newsletter Campaigns",
      desc: "Design engaging, editorial-grade newsletters that deliver consistent value, educate subscribers, and foster high brand affinity and top-of-mind awareness.",
      icon: <FiFileText className="text-brand-violet" size={22} />
    },
    {
      title: "Promotional Email Campaigns",
      desc: "Create high-converting promotional broadcasts and seasonal offers tailored to drive immediate sales velocity and elevate customer conversion rates.",
      icon: <FiZap className="text-brand-cyan" size={22} />
    },
    {
      title: "Email Automation",
      desc: "Deploy sophisticated behavior-triggered automation workflows—such as welcome streams and cart abandonment recovery—to generate passive revenue 24/7.",
      icon: <FiCpu className="text-brand-rose" size={22} />
    },
    {
      title: "Audience Segmentation",
      desc: "Perform dynamic list segmentation based on customer behaviors, preferences, and purchase frequency to deliver highly relevant and personalized messaging.",
      icon: <FiUsers className="text-brand-emerald" size={22} />
    },
    {
      title: "Performance Analytics",
      desc: "Track critical metrics including delivery rates, link clicks, open rates, revenue attribution, and overall campaign return on investment with detailed reporting.",
      icon: <FiActivity className="text-brand-indigo" size={22} />
    }
  ]

  const benefits = [
    { title: "Personalized Customer Communication", desc: "Build tailored conversation flows that match unique buyer behaviors and purchase history to drive higher personalization." },
    { title: "Increased Customer Engagement", desc: "Keep subscribers actively connected to your brand with strategic value drops, news updates, and custom promotions." },
    { title: "Higher Conversion Opportunities", desc: "Drive consistent organic repeat purchases directly from optimized, high-converting product and service call-to-actions." },
    { title: "Improved Customer Retention", desc: "Nurture client loyalty to minimize subscriber churn, building long-term customer relationships and business stability." },
    { title: "Better Brand Awareness", desc: "Establish a permanent, authoritative brand presence natively inside the client's direct mailbox, bypassing external ad algorithms." },
    { title: "Cost-Effective Marketing", desc: "Secure compounding organic customer acquisition and sales revenue at exceptionally high margins and low operational costs." },
    { title: "Automated Customer Journeys", desc: "Deploy smart, trigger-based lifecycle campaigns that guide prospects toward conversions automatically without manual effort." },
    { title: "Measurable Campaign Results", desc: "Monitor key performance data like click maps, revenue attribution per send, delivery logs, and positive list growth velocity." }
  ]

  const whyChooseUs = [
    {
      title: "Customized Campaign Strategies",
      desc: "We formulate bespoke marketing strategies tailored specifically to your industry, target audience personas, and key business goals.",
      icon: <FiBriefcase className="text-brand-indigo" size={22} />
    },
    {
      title: "Audience-Focused Communication",
      desc: "Our copywriters script emotionally resonant, persuasive value messages designed to earn long-term loyalty and conversion authority.",
      icon: <FiUsers className="text-brand-violet" size={22} />
    },
    {
      title: "Performance-Driven Campaigns",
      desc: "We prioritize actual revenue generation, client lifetime value amplification, and optimization of customer acquisition cost metrics.",
      icon: <FiTrendingUp className="text-brand-cyan" size={22} />
    },
    {
      title: "Modern Email Automation",
      desc: "We architect smart trigger-based workflows, CRM database integrations, and responsive customer journeys for hands-free conversions.",
      icon: <FiCpu className="text-brand-rose" size={22} />
    },
    {
      title: "Transparent Analytics",
      desc: "Access clear, comprehensive reporting dashboards that detail real-time list growth, click maps, and direct sales values.",
      icon: <FiBarChart2 className="text-brand-emerald" size={22} />
    },
    {
      title: "Long-Term Customer Engagement",
      desc: "Deploy consistent value nurture streams and re-engagement flows that systematically convert cold leads into active repeat buyers.",
      icon: <FiShield className="text-brand-indigo" size={22} />
    }
  ]

  const processSteps = [
    { title: "Audience Research", desc: "Audit existing list sizes, analyze demographic data, profile customer personas, and design comprehensive lifecycle mapping.", icon: <FiSearch size={20} /> },
    { title: "Campaign Planning", desc: "Establish structured marketing calendars, promotional hooks, content themes, and campaign goals to align with your sales targets.", icon: <FiTarget size={20} /> },
    { title: "Content & Design Creation", desc: "Write high-converting email copy, click-worthy subject headlines, and design premium responsive layouts optimized for all devices.", icon: <FiFileText size={20} /> },
    { title: "Email Automation Setup", desc: "Configure sophisticated trigger-based sequences, including welcome campaigns, browse recoveries, and abandoned cart reminders.", icon: <FiCpu size={20} /> },
    { title: "Campaign Launch", desc: "Conduct strict delivery tests, ensure spam filter compliance, verify domain authentications (SPF/DKIM/DMARC), and launch campaigns.", icon: <FiZap size={20} /> },
    { title: "Performance Monitoring", desc: "Monitor actual user interactions, tracking key analytics like open rates, click heatmaps, bounce logs, and direct sales revenue.", icon: <FiActivity size={20} /> },
    { title: "Optimization & Scaling", desc: "Implement continuous A/B split testing for copywriting styles and design layouts to systematically optimize overall list performance.", icon: <FiTrendingUp size={20} /> }
  ]

  const faqs = [
    {
      q: "1. What is email marketing?",
      a: "Email marketing is a highly targeted digital strategy used to nurture relationships and convert leads into buyers through personalized email campaigns."
    },
    {
      q: "2. How does email marketing help businesses?",
      a: "It directly improves customer engagement, strengthens brand awareness, compounds customer retention, and creates high-conversion opportunities."
    },
    {
      q: "3. Why should I choose TSquadron email marketing services?",
      a: "We provide customized copy strategies, high-performing email automation structures, list segmentation, and data-backed performance reports."
    },
    {
      q: "4. Can email marketing increase customer loyalty?",
      a: "Yes, sending consistent, personalized value builds customer relationships, trust, and repeat business over long durations."
    },
    {
      q: "5. Do you provide email automation services?",
      a: "Yes, we deploy sophisticated behavioral automation streams (welcome, abandonment, nurture drops) to scale conversions efficiently."
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
                TSquadron Email Marketing Solutions
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-slate-900 leading-[1.15]"
            >
              Email Marketing Services <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-cyan bg-clip-text text-transparent">
                in Warangal
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl"
            >
              Supercharge your retention rates and unlock consistent direct revenue with high-impact email marketing solutions. We design conversion-focused automation workflows, personalized campaigns, and data-backed subscriber journeys that nurture cold leads into brand advocates and maximize customer lifetime value.
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
              ✓ Helping businesses connect with audiences through targeted and personalized email campaigns.
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
                <span>Email Campaigns Dashboard</span>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] text-brand-label font-sans block uppercase">Open Rate</span>
                    <span className="text-base font-heading font-black text-brand-indigo block">42.8%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] text-brand-label font-sans block uppercase">Click Map CTR</span>
                    <span className="text-base font-heading font-black text-brand-violet block">18.2%</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-100/70 border border-brand-cyan/10 flex items-center justify-center text-brand-cyan shrink-0">
                    <FiMail size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-heading font-bold text-slate-800 block truncate">Cart Recovery Automation</span>
                    <span className="text-[10px] text-brand-label block font-sans">Triggered by checkout exit event</span>
                  </div>
                  <span className="text-xs font-sans font-bold text-brand-emerald shrink-0">+38%</span>
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
            RETENTION ENGINES
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Why Email Marketing Is Important For Your Business
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-slate-600 font-sans leading-relaxed text-base sm:text-lg text-left md:text-center">
            <p>
              Unlike traditional advertising channels subject to constant algorithm updates, email gives you direct ownership of your subscriber base. It represents a highly personalized communication channel that builds user trust, guides customer decisions, and delivers unmatched returns on marketing investment.
            </p>
            <p>
              At TSquadron, we program strategic email campaigns that align with customer buying patterns and brand aesthetics. By leveraging advanced segmentation and smart flow architectures, we consistently increase open rates, capture repeat orders, and secure reliable customer loyalty.
            </p>
          </div>
        </div>
      </section>

      {/* 3. REPUTABLE COMPANY SECTION */}
      <section className="border-t border-slate-100 py-24 relative z-10 bg-slate-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
                LOCAL MARKET AUTHORITY
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
                Reputable Email Marketing Company in Warangal
              </h2>
              <div className="space-y-4 text-slate-600 font-sans leading-relaxed text-sm sm:text-base">
                <p>
                  TSquadron is a premier digital marketing agency in Warangal, specializing in high-performance email solutions that drive transactional outcomes. We manage everything from deliverability monitoring and DKIM configuration to creative asset design and high-converting copy production.
                </p>
                <p>
                  By partnering with local enterprises and global brands alike, we design targeted systems that maximize subscriber lifetime value. Our data-backed approach ensures your campaigns achieve optimal inbox placement, bypass spam filters, and generate measurable revenue attribution with every broadcast.
                </p>
              </div>
            </div>

            {/* Right visuals */}
            <div className="lg:col-span-5 relative w-full flex justify-center">
              <div className="relative w-full max-w-[380px] p-6 rounded-3xl bg-white border border-slate-200/80 shadow-premium text-left space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-brand-indigo/10 flex items-center justify-center text-brand-indigo">
                    <FiTrendingUp size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-heading font-black text-slate-800 block">Deliverability Score</span>
                    <span className="text-[10px] text-brand-label font-sans block">Inbox vs Spam Folders</span>
                  </div>
                </div>
                {/* Visual bar chart */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-sans text-slate-600">
                    <span>TSquadron Campaigns</span>
                    <span className="font-bold text-brand-indigo">99.2%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-indigo rounded-full" style={{ width: '99%' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. EMAIL MARKETING SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            RETENTION SUITES
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Our Email Marketing Services
          </h2>
          <p className="text-slate-600 text-sm font-sans max-w-xl mx-auto leading-relaxed">
            From strategic flow blueprints and dynamic segmentations to responsive design assets and performance monitoring dashboards, we configure full-funnel retention systems tailored for your brand's growth.
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

      {/* 5. BENEFITS SECTION */}
      <section className="relative border-t border-slate-100 py-24 bg-slate-50/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6 mb-20">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
              BUSINESS ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
              Benefits of Email Marketing
            </h2>
            <p className="text-slate-600 text-sm font-sans max-w-xl mx-auto leading-relaxed">
              Unlock a highly efficient marketing channel that delivers predictable sales growth, builds brand equity, and keeps your audience continuously engaged with automated and personalized messaging systems.
            </p>
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

      {/* 6. WHY CHOOSE US SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            OUR CREDENTIALS
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Why Choose TSquadron For Email Marketing?
          </h2>
          <p className="text-slate-600 text-sm font-sans max-w-xl mx-auto leading-relaxed">
            We pair conversion-focused copywriting with surgical automation configurations to ensure every email you dispatch targets the right subscriber segment and secures maximum financial return.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {whyChooseUs.map((reason, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-slate-100 flex flex-col justify-between space-y-4 shadow-premium hover:shadow-md hover:border-slate-200 transition-all duration-300 relative group animate-fade-in"
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
      </section>

      {/* 7. PROCESS WORKFLOW TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            HOW WE ENGAGE
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Our Email Marketing Process
          </h2>
          <p className="text-slate-600 text-sm font-sans max-w-xl mx-auto leading-relaxed">
            Our systematic campaign blueprint guarantees deliverability compliance, high inbox visibility, and continuous improvement through rigorous data analysis and list performance audits.
          </p>
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

      {/* 8. FLOATING BANNER STRIPS (Original Archive details preserved) */}
      <section className="py-12 bg-white relative z-10 border-t border-b border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1 */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-indigo uppercase tracking-wider block">
                Get A Quote
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Helping businesses improve customer engagement and nurture retention.
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
              Ready To Build Stronger Customer Relationships?
            </h2>
            <p className="text-indigo-100 font-sans text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Unlock the full potential of your subscriber base and drive consistent retention growth. Partner with TSquadron to establish conversion-focused automation sequences and high-impact copywriting that converts passive readers into loyal brand advocates.
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
