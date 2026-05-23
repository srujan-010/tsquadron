import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiArrowRight, FiCheckCircle, FiTrendingUp, FiGlobe, FiShare2, 
  FiMousePointer, FiMail, FiShield, FiPlus, FiMinus, FiAward, 
  FiCpu, FiActivity, FiUsers, FiTarget, FiChevronRight, FiSearch,
  FiBriefcase, FiBookOpen, FiHome, FiLayers, FiMapPin, FiMessageSquare,
  FiUser, FiSend, FiCheck, FiDownload, FiDollarSign, FiClock, FiCalendar,
  FiFileText, FiPhone
} from 'react-icons/fi'
import GlowingCard from '../components/GlowingCard'
import { db } from '../lib/db'

export default function DigitalMarketingTraining({ setActivePage }) {
  const [openFaq, setOpenFaq] = useState(null)
  const [activeTab, setActiveTab] = useState('seo')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Complete Digital Marketing Masterclass',
    enquiryType: 'Free Demo Session',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  // SEO & Breadcrumb lists
  const breadcrumbs = [
    { name: "Home", id: "home" },
    { name: "Academy", id: "services" },
    { name: "Digital Marketing Training Warangal", id: "digital-marketing-training-in-warangal" }
  ]

  const validateForm = () => {
    let tempErrors = {}
    if (!formData.name.trim()) tempErrors.name = "Full name is required."
    
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required."
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please input a valid email address."
    }
    
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required."
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.trim())) {
      tempErrors.phone = "Please input a valid phone number (10-15 digits)."
    }
    
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      
      // Save lead to local db via TSquadron framework integration
      db.saveLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: `Training: ${formData.interest} (${formData.enquiryType})`,
        company: 'Student/Inquirer',
        message: formData.message || `Lead submitted for ${formData.enquiryType} on Warangal Training page.`
      })

      // Simulate network request
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSuccess(true)
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          interest: 'Complete Digital Marketing Masterclass', 
          enquiryType: 'Free Demo Session', 
          message: '' 
        })
      }, 1500)
    }
  }

  // Schema Injection on mount
  React.useEffect(() => {
    const courseSchema = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Advanced Digital Marketing Training in Warangal",
      "description": "Learn professional digital marketing from industry experts. Master SEO, PPC, Google Ads, Meta Ads, and AI Tools with live projects and agency placement support.",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "TSquadron Digital Academy",
        "sameAs": "https://www.tsquadron.com"
      },
      "educationalCredentialAwarded": "Certified Digital Marketing Specialist",
      "offers": {
        "@type": "Offer",
        "category": "Paid",
        "priceCurrency": "INR",
        "eligibleRegion": {
          "@type": "Place",
          "name": "Warangal, Telangana"
        }
      }
    }

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "EducationCcsp",
      "name": "TSquadron Digital Academy & Marketing Agency",
      "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2nd Floor, V-Square Plaza, Naimnagar Main Road, Hanamkonda",
        "addressLocality": "Warangal",
        "addressRegion": "Telangana",
        "postalCode": "506001",
        "addressCountry": "IN"
      },
      "telephone": "+91 9346989817",
      "email": "info@tsquadron.com"
    }

    const script1 = document.createElement("script")
    script1.type = "application/ld+json"
    script1.innerHTML = JSON.stringify(courseSchema)
    document.head.appendChild(script1)

    const script2 = document.createElement("script")
    script2.type = "application/ld+json"
    script2.innerHTML = JSON.stringify(localBusinessSchema)
    document.head.appendChild(script2)

    return () => {
      document.head.removeChild(script1)
      document.head.removeChild(script2)
    }
  }, [])

  const navigateTo = (pageId) => {
    setActivePage(pageId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Cards & Configs
  const whyChooseStats = [
    { title: "Practical Exposure", desc: "Gain hands-on real-time training with actual advertising budgets rather than standard paper theories.", icon: <FiActivity className="text-brand-indigo" size={24} /> },
    { title: "Live Client Projects", desc: "Formulate active SEO campaigns, social calendars, and brand designs directly for live businesses.", icon: <FiGlobe className="text-brand-violet" size={24} /> },
    { title: "Paid Internships", desc: "Secure certified agency internship opportunities upon successful milestone completion.", icon: <FiAward className="text-brand-cyan" size={24} /> },
    { title: "Placement Help", desc: "Command active assistance with full mock interviews, resume design reviews, and portfolio setups.", icon: <FiUsers className="text-brand-emerald" size={24} /> },
    { title: "Industry Mentors", desc: "Learn straight from experienced agency professionals running campaigns for global brands daily.", icon: <FiUser className="text-brand-rose" size={24} /> },
    { title: "SEO Focus", desc: "Master deep technical and local search frameworks to command organic Google positions on demand.", icon: <FiSearch className="text-brand-indigo" size={24} /> },
    { title: "AI-Powered Tools", desc: "Incorporate modern automation scripts, generative copywriting, and automated graphics into your skillset.", icon: <FiCpu className="text-brand-violet" size={24} /> },
    { title: "Certifications Support", desc: "Ace global exams like Google Ads, Meta Certified Digital Marketing Associate, and HubSpot.", icon: <FiShield className="text-brand-cyan" size={24} /> },
    { title: "Portfolio Building", desc: "Compile a robust professional proof-of-work showcasing live URLs, ranking proofs, and brand layouts.", icon: <FiLayers className="text-brand-emerald" size={24} /> },
    { title: "Freelancing Guidance", desc: "Unlock step-by-step guidance on bidding platforms, client onboarding, pricing metrics, and global contract rules.", icon: <FiBriefcase className="text-brand-rose" size={24} /> }
  ]

  const courseModules = [
    { title: "Search Engine Optimization (SEO)", level: "Beginner to Advanced", duration: "25 Hours", tools: "SEMrush, Ahrefs, GSC, Screaming Frog", desc: "Dominate Google search engine result grids. Master keyword indexing, local maps optimization, high-yield backlink structures, and technical schema integrations.", outcome: "Perform enterprise SEO audits & rank commercial keywords organically." },
    { title: "Social Media Marketing (SMM)", level: "All Skill Levels", duration: "20 Hours", tools: "Meta Business Suite, Hootsuite, Canva", desc: "Build massive brand value and virality across Instagram, LinkedIn, and Facebook. Plan high-yield content calendars and execute organic follower campaigns.", outcome: "Scale brand engagement metrics, plan campaigns, and drive organic leads." },
    { title: "Google Ads / PPC Bidding", level: "Intermediate to Advanced", duration: "15 Hours", tools: "Google Keyword Planner, Google Ads Editor", desc: "Execute hyper-targeted search, display, shopping, and retargeting ads. Master auction bidding strategies, quality score boosts, and cost per lead optimization.", outcome: "Formulate paid traffic pipelines that generate immediate phone calls and sales." },
    { title: "Meta Ads Mastery", level: "Intermediate to Advanced", duration: "15 Hours", tools: "Meta Ads Manager, Meta Pixel, Conversion API", desc: "Create high-converting ad sets, custom audiences, and lookalikes across Instagram & Facebook. Harness retargeting systems to maximize ad spend return.", outcome: "Deploy scalable Meta lead-generation funnels and optimize ad ROI." },
    { title: "Content Marketing", level: "Beginner to Intermediate", duration: "10 Hours", tools: "ChatGPT, Copy.ai, Grammarly", desc: "Create high-converting copy, blog structures, scripts, and newsletters that build trust and convert prospects into loyal repeat customers.", outcome: "Write SEO-friendly copy, engage audiences, and build content architectures." },
    { title: "Email Marketing Flows", level: "Intermediate to Advanced", duration: "10 Hours", tools: "Mailchimp, Klaviyo, Brevo", desc: "Build highly segmented email subscriber lists and design conversion-focused automated newsletters and drip flows that nurture incoming inquiries.", outcome: "Structure automated sales loops and high-yield retention newsletters." },
    { title: "YouTube Marketing", level: "All Skill Levels", duration: "10 Hours", tools: "TubeBuddy, VidIQ, Premiere Pro basics", desc: "Create optimized video architectures, optimize SEO metadata titles, script content, build high-click-through thumbnails, and monetize YouTube channels.", outcome: "Scale channels organically and manage video-based company branding." },
    { title: "Affiliate Marketing", level: "Beginner to Advanced", duration: "10 Hours", tools: "Amazon Associates, ClickBank, ShareASale", desc: "Structure affiliate marketing networks, establish tracking links, and configure secondary passive income websites using programmatic content layouts.", outcome: "Launch secondary revenue nodes and understand affiliate marketing models." },
    { title: "Canva & Creative Branding", level: "Beginner to Intermediate", duration: "15 Hours", tools: "Canva Pro, Figma basics, Illustrator", desc: "Learn essential visual design principles. Create sleek typography hierarchies, harmonious brand colors, logo structures, and highly interactive social assets.", outcome: "Build complete visual identities and professional marketing templates." },
    { title: "Website Basics & CMS", level: "Beginner Friendly", duration: "15 Hours", tools: "WordPress, Elementor Pro, WooCommerce", desc: "Launch functional, fully optimized websites without writing lines of code. Configure domains, cloud hosting servers, page layouts, and complete checkout grids.", outcome: "Deploy SEO-optimized premium landing pages and business sites." },
    { title: "AI Tools for Marketing", level: "Cutting Edge", duration: "15 Hours", tools: "ChatGPT-4o, Gemini Advanced, Midjourney, Canva AI", desc: "Incorporate artificial intelligence to draft marketing frameworks, generate beautiful realistic illustrations, optimize SEO metadata, and automate daily tasks.", outcome: "Work 3x faster, automate campaigns, and prepare for modern tech careers." },
    { title: "Analytics & Conversion Tracking", level: "Advanced Track", duration: "10 Hours", tools: "Google Analytics 4, GTM, Hotjar", desc: "Set up behavioral event tracking pipelines, trace searcher conversions, read custom cohort metrics, and execute optimization reviews using Heatmaps.", outcome: "Analyze analytics data and perform conversion rate optimization." }
  ]

  const curriculumTabs = {
    seo: {
      title: "Search Engine Optimization (SEO) Syllabus",
      desc: "Learn our proprietary agency search optimization playbook. Master how to reverse-engineer search intent, satisfy crawler guidelines, and command top-three rankings for local and national keywords.",
      modules: [
        { name: "Keyword Research & Strategy", topics: ["Search intent mapping", "Search volume metrics", "SEMrush keyword gaps", "Competitor indexing audits", "Long-tail search opportunities"] },
        { name: "On-Page SEO Optimization", topics: ["Title & Meta tags crafting", "Heading hierarchies (H1-H6)", "URL slug structuring", "Image alt text optimization", "LSI & content density mapping"] },
        { name: "Technical SEO Frameworks", topics: ["Robots.txt configurations", "XML Sitemap mapping", "Schema markup integration", "Core Web Vitals acceleration", "Canonicalization & redirect rules"] },
        { name: "Google Webmaster Integrations", topics: ["Search Console verification", "Indexation audits", "Sitemap submission", "Analytics GA4 event tracking", "Search performance analytics reviews"] },
        { name: "Local SEO & Map Packs", topics: ["Google Business Profile setup", "Local citation building", "Review acquisition formulas", "Geo-targeted content writing", "Map rank tracking tools"] },
        { name: "White-Hat Link Building", topics: ["Skyscraper outreach templates", "Guest blogging placements", "Digital PR & brand mentions", "Resource page setups", "Toxic link audit & disavow tools"] }
      ]
    },
    smm: {
      title: "Social Media Marketing & Branding Syllabus",
      desc: "Master customer attention channels. Discover the psychological triggers that initiate viral sharing, build professional community loyalty, and turn casual followers into paid brand purchasers.",
      modules: [
        { name: "Instagram Organic Growth Strategy", topics: ["Reels algorithm mapping", "Clickable profile bio architecture", "High-retention video scripting", "Viral hashtag formulas", "Engagement triggers & stories loops"] },
        { name: "Meta Business Suite & Manager", topics: ["Pixel integration & validation", "Custom conversion event setup", "Audience targeting definitions", "Page administration & permission rules", "Budget optimization principles"] },
        { name: "LinkedIn Professional Branding", topics: ["Executive profile optimization", "Authority article publishing", "B2B client prospecting formulas", "Company page engagement loops", "LinkedIn networking blueprints"] },
        { name: "Content Calendars & Asset Planning", topics: ["Creative brainstorming templates", "Grid aesthetics layouts", "Copywriting for conversions", "Buffer / Hootsuite automation tools", "Trend monitoring and agile execution"] }
      ]
    },
    ppc: {
      title: "Google Ads & PPC Campaign Syllabus",
      desc: "Master the dynamics of paid digital bidding. Learn how to launch highly profitable campaigns on search grids, display networks, YouTube platforms, and social feeds to maximize ad budget ROI.",
      modules: [
        { name: "Google Ads Campaign Architecture", topics: ["Account setup & payment channels", "Search, Display, & Video tracks", "Keyword match type logic", "Negative keyword safeguards", "Ad group bidding hierarchies"] },
        { name: "Ad Creative & Copywriting", topics: ["Responsive search ads (RSA)", "Callout & Sitelink extensions", "Dynamic keyword insertion", "Click-through-rate optimization", "A/B copy testing blueprints"] },
        { name: "Conversion Event Tracking", topics: ["Google Tag Manager parameters", "Thank-you page event setups", "Form submission tracking", "Phone call track integrations", "Remarketing tag configurations"] },
        { name: "ROI Optimization Reviews", topics: ["Cost-per-click management", "Quality score enhancement", "Auction insights comparison", "Device & demographic bidding adjustments", "Conversion cost reductions"] }
      ]
    }
  }

  const whoCanJoinCards = [
    { title: "College Students", desc: "Unlock valuable, high-income agency skills alongside your academics. Build an outstanding resume that bypasses traditional entrance criteria.", icon: <FiBookOpen size={20} className="text-brand-indigo" /> },
    { title: "Fresh Graduates", desc: "Bridge the gap between theoretical college degrees and actual professional expectations. Gain agency credentials that secure fast job offers.", icon: <FiAward size={20} className="text-brand-violet" /> },
    { title: "Business Owners", desc: "Eliminate your dependence on expensive, sluggish agencies. Take direct control of your SEO rankings and digital customer pipelines.", icon: <FiTrendingUp size={20} className="text-brand-emerald" /> },
    { title: "Freelancers & Solopreneurs", desc: "Scale your remote services globally. Offer SEO, Social Ads, and Email Automation to local and international clients at top rates.", icon: <FiGlobe size={20} className="text-brand-cyan" /> },
    { title: "Job Seekers", desc: "Transition into one of the fastest-growing job domains. Command premium starting salaries as a certified performance marketer.", icon: <FiBriefcase size={20} className="text-brand-rose" /> },
    { title: "Career Switchers", desc: "Pivot easily from traditional fields like sales, retail, or operations into high-paying, creative, and analytics-driven tech workspaces.", icon: <FiActivity size={20} className="text-brand-indigo" /> }
  ]

  const faqs = [
    { q: "Do I need coding or technical knowledge to join this digital marketing course?", a: "No, prior coding or programming knowledge is absolutely NOT required. TSquadron's curriculum is built to accommodate complete beginners. We will guide you step-by-step through easy-to-use CMS tools like WordPress, drag-and-drop landing page builders, intuitive AI systems, and premium analytics dashboards." },
    { q: "Is placement assistance provided after graduation?", a: "Yes, we offer comprehensive 100% placement support. This includes curated resume building workshops, simulated mock technical interviews, LinkedIn profile optimization reviews, and direct hiring invitations with local, regional, and national partner firms." },
    { q: "What is the duration of the TSquadron digital marketing training program?", a: "Our complete masterclass spans 3 months (approximately 120 total hours of training). This includes structured face-to-face mentorship modules, practical live project tasks, and dedicated portfolio building sessions." },
    { q: "Will I work on live, real-world marketing campaigns?", a: "Absolutely! Hands-on practical implementation is the core foundation of TSquadron's philosophy. You will work with active domain names, construct fully compliant SEO structures, design creative social graphics, write ad copy, and monitor real search console impressions." },
    { q: "Are training classes available in online or offline formats?", a: "We provide both flexible online virtual classrooms and interactive offline training sessions at our Warangal Academy Center, ensuring high convenience for students, freelancers, and local business owners." },
    { q: "Do you provide accredited course completion and internship certificates?", a: "Yes. Upon completing the curriculum requirements, you will receive a professional Course Completion Certificate and a secondary certified Internship Achievement Certificate highlighting your live project contributions." }
  ]

  return (
    <div className="relative pt-24 bg-[#F8FAFC] overflow-hidden">
      {/* 1. HERO SECTION WITH GRADIENT BACKGROUND */}
      <section className="relative w-full py-20 sm:py-32 overflow-hidden bg-gradient-to-tr from-[#163C8C] via-[#2857A4] to-[#163C8C] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md"
              >
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-brand-rose">
                  ★ TSQUADRON ACADEMY &middot; WARANGAL ★
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-6xl font-heading font-black tracking-tight leading-[1.1] text-white"
              >
                Digital Marketing <br />
                Training in Warangal
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-xl text-slate-100 font-sans leading-relaxed max-w-2xl font-light"
              >
                Learn practical digital marketing skills from industry experts and build a successful career in SEO, Social Media, PPC, Content Marketing, and Branding.
              </motion.p>

              {/* Stat Pillars */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-3 gap-4 border-y border-white/10 py-6 max-w-lg text-slate-100"
              >
                <div className="space-y-1">
                  <span className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-rose block">500+</span>
                  <span className="text-[10px] sm:text-xs text-slate-200 uppercase font-sans tracking-wider block">Students Trained</span>
                </div>
                <div className="space-y-1">
                  <span className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-rose block">90%</span>
                  <span className="text-[10px] sm:text-xs text-slate-200 uppercase font-sans tracking-wider block">Practical Focus</span>
                </div>
                <div className="space-y-1">
                  <span className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-rose block">100+</span>
                  <span className="text-[10px] sm:text-xs text-slate-200 uppercase font-sans tracking-wider block">Live Projects</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4 pt-2 justify-start"
              >
                <button
                  onClick={() => {
                    const el = document.getElementById("lead-generation-form")
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-sm text-[#163C8C] bg-white hover:bg-slate-100 shadow-premium hover:scale-105 transition-all duration-300"
                >
                  Enroll Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById("lead-generation-form")
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-sm text-white bg-[#5E9CB3] hover:bg-[#5E9CB3]/90 hover:scale-105 transition-all duration-300"
                >
                  Book Free Demo
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById("lead-generation-form")
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:scale-105 transition-all duration-300"
                >
                  Download Curriculum <FiDownload size={15} />
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-2.5 text-xs text-slate-200 pt-2 font-sans font-medium"
              >
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400">✓</span>
                <span>Includes Professional Training, Internship Offer, and Job Placement Guidance</span>
              </motion.div>
            </div>

            {/* Right Column: Hero Visuals */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative w-full flex justify-center"
            >
              <div className="relative w-full max-w-[450px] aspect-[4/3] rounded-3xl p-[1px] bg-gradient-to-tr from-white/20 via-white/5 to-white/35 backdrop-blur-xl shadow-premium overflow-hidden border border-white/10">
                <div className="w-full h-8 px-4 flex items-center justify-between border-b border-white/10 bg-white/5">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-300">tsquadron_academy.log</span>
                </div>
                <div className="p-6 space-y-5 text-left text-xs font-mono">
                  <div className="space-y-1.5 border-b border-white/10 pb-4">
                    <span className="text-brand-rose block font-bold font-heading text-sm">Warangal SEO Success Core</span>
                    <span className="text-slate-300 text-[10px] block">Live Domain Audit active</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-300">Organic Traffic Growth</span>
                      <span className="text-emerald-400 font-bold">+340% Rank Boost</span>
                    </div>
                    <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[88%] h-full bg-gradient-to-r from-brand-rose to-brand-cyan rounded-full" />
                    </div>
                  </div>

                  <div className="w-full h-24 bg-white/5 rounded-xl border border-white/10 p-2 overflow-hidden flex items-end">
                    <svg viewBox="0 0 200 60" className="w-full h-20 overflow-visible text-brand-rose">
                      <path 
                        d="M0,50 L20,38 Q40,20 60,32 T100,12 T140,24 T180,6 T200,1" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <circle cx="200" cy="1" r="3.5" fill="#5E9CB3" />
                    </svg>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-slate-300 pt-2 border-t border-white/5">
                    <span>100% Practical Inbound</span>
                    <span className="text-emerald-400">System Ready ✓</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-10">
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 font-sans font-medium">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.id}>
              {idx > 0 && <FiChevronRight className="text-slate-400 font-bold" size={14} />}
              {idx < breadcrumbs.length - 1 ? (
                <button 
                  onClick={() => navigateTo(crumb.id)} 
                  className="hover:text-[#163C8C] transition-colors"
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

      {/* 2. WHY CHOOSE TSQUADRON ACADEMY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-[#163C8C] uppercase tracking-widest font-sans block">
            ELITE CAREER BOOTCAMP
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            Why Choose TSquadron Academy?
          </h2>
          <p className="text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
            Acquire real-time expertise, handle live advertisement accounts, compile agency portfolios, and secure placement support.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 text-left">
          {whyChooseStats.map((item, idx) => (
            <GlowingCard key={idx} delay={idx * 0.04} className="min-h-[260px] flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-slate-200/50 flex items-center justify-center text-[#163C8C]">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900 leading-tight">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </GlowingCard>
          ))}
        </div>
      </section>

      {/* 3. COURSES INCLUDED IN THE MASTERCLASS */}
      <section className="border-t border-slate-200/60 py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-[#163C8C] uppercase tracking-widest font-sans block">
              12 COMPREHENSIVE PATHWAYS
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
              Syllabus Modules Included
            </h2>
            <p className="text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
              Explore the detailed core segments configured to transform you into an authorized digital advertising specialist.
            </p>
          </div>

          {/* Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {courseModules.map((module, idx) => (
              <div 
                key={idx}
                className="relative rounded-3xl p-6 sm:p-8 bg-[#F8FAFC] border border-slate-200 hover:border-[#2857A4] hover:shadow-premium transition-all duration-300 group flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="px-2.5 py-1 bg-[#163C8C]/5 text-[#163C8C] rounded-full text-[10px] font-bold uppercase tracking-wider">
                      Module {idx + 1}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                      <FiClock size={11} /> {module.duration}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-slate-900 group-hover:text-[#163C8C] transition-colors leading-snug">
                    {module.title}
                  </h3>
                  
                  <p className="text-slate-600 text-xs font-sans leading-relaxed">
                    {module.desc}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block">Tools Learned:</span>
                    <span className="text-[11px] font-mono text-[#2857A4] font-semibold block">{module.tools}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block">Core Skills Earned:</span>
                    <span className="text-[11px] font-sans text-slate-700 block font-medium leading-relaxed">{module.outcome}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SYLLABUS DEEP-DIVE MODULES (SEO, SMM, PPC SPECIALIZATIONS TABS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-[#163C8C] uppercase tracking-widest font-sans block">
            INTERACTIVE CURRICULUM DASHBOARD
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            Detailed Course Syllabus Tracks
          </h2>
          <p className="text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
            Click the specialization tracks below to review the technical chapters, structures, and practical operations included in the training.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-3 md:gap-4 max-w-xl mx-auto p-1.5 bg-slate-200/80 rounded-2xl md:rounded-full mb-12 flex-wrap">
          {Object.keys(curriculumTabs).map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              className={`flex-grow md:flex-initial px-6 py-3 rounded-xl md:rounded-full font-heading font-bold text-xs transition-all tracking-wider ${
                activeTab === tabKey 
                  ? 'bg-[#163C8C] text-white shadow-premium' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/40'
              }`}
            >
              {tabKey === 'seo' ? '1. SEO Optimization' : tabKey === 'smm' ? '2. Social Media Branding' : '3. Google Ads / PPC'}
            </button>
          ))}
        </div>

        {/* Curriculum Content Panel */}
        <div className="relative rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-premium text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="max-w-3xl space-y-3 border-b border-slate-100 pb-6">
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
                  {curriculumTabs[activeTab].title}
                </h3>
                <p className="text-slate-600 text-sm font-sans leading-relaxed">
                  {curriculumTabs[activeTab].desc}
                </p>
              </div>

              {/* Submodules lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                {curriculumTabs[activeTab].modules.map((mod, idx) => (
                  <div key={idx} className="space-y-4 p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/60">
                    <span className="text-xs font-bold text-[#2857A4] uppercase tracking-wider block">
                      Track 0{idx + 1}: {mod.name}
                    </span>
                    <ul className="space-y-2">
                      {mod.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-slate-600 text-xs font-sans">
                          <FiCheckCircle size={14} className="text-brand-cyan shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 5. AI TOOLS TRAINING INCLUSION SPOTLIGHT */}
      <section className="relative w-full py-24 overflow-hidden bg-slate-900 text-white text-left">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2857A4]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5E9CB3]/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Visual AI grid */}
            <div className="lg:col-span-5 order-last lg:order-first relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "ChatGPT-4o", desc: "Automate dynamic copywriting & client reporting scripts.", logo: "AI Writing" },
                  { name: "Midjourney Basics", desc: "Formulate ultra-premium realistic advertising graphics.", logo: "AI Art" },
                  { name: "Gemini Advanced", desc: "Acquire rapid data analytics, competitor audits, and strategies.", logo: "AI Strategy" },
                  { name: "Canva AI Features", desc: "Generate instant visual templates and localized content variants.", logo: "AI Visuals" }
                ].map((aiTool, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#5E9CB3]/50 transition-colors space-y-3">
                    <span className="px-2.5 py-0.5 bg-[#5E9CB3]/10 text-brand-rose rounded-full text-[9px] font-bold uppercase tracking-wider">
                      {aiTool.logo}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-white">{aiTool.name}</h4>
                    <p className="text-slate-400 text-[10px] leading-relaxed font-sans">{aiTool.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Info Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-[#5E9CB3] uppercase tracking-widest font-sans block">
                ★ 2026 AI-READY CAREER PATHWAYS ★
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-black text-white leading-tight">
                AI Tools Integration in Marketing
              </h2>
              <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed font-light">
                Generative AI is transforming digital marketing. At TSquadron, we don't just teach traditional marketing—we empower you to work 3x faster using advanced AI tools. 
              </p>
              
              <div className="space-y-4 pt-2">
                {[
                  "Prompt Engineering: Master instructions that produce premium copy and strategies instantly.",
                  "AI Search SEO Optimization: Structure websites to rank on ChatGPT search engine layouts.",
                  "AI Visual Workflows: Generate high-click ads using generative graphics platforms."
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#3569B3]/20 flex items-center justify-center shrink-0 text-emerald-400 text-xs">✓</div>
                    <span className="text-slate-200 text-xs font-sans font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    const el = document.getElementById("lead-generation-form")
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className="px-8 py-4 rounded-full font-heading font-bold text-xs text-[#163C8C] bg-white hover:bg-slate-100 hover:scale-105 transition-all"
                >
                  Join AI Bootcamp Track
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. HANDS-ON LIVE PROJECTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center border-b border-slate-200/60">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-[#163C8C] uppercase tracking-widest font-sans block">
            HANDS-ON PRACTICAL IMPLEMENTATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            Work on Live Client Websites
          </h2>
          <p className="text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
            Gain genuine experience. At TSquadron, students collaborate on real marketing budgets, build live campaigns, and track real search rankings.
          </p>
        </div>

        {/* Project Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {[
            { title: "Live SEO Audit & Strategy", target: "Perform Screaming Frog indexation checks, identify keyword gaps, configure structured schema markup, and implement ranking fixes for active regional platforms.", icon: "01" },
            { title: "Active Ad Campaign Setup", target: "Setup actual Google Search PPC and Instagram social ad assets. Direct target bidding structures, configure conversion pixel events, and track metrics.", icon: "02" },
            { title: "Social Brand Operations", target: "Create complete high-retention social content grids, compile reels visual schedules, edit graphics assets in Canva, and optimize channel reach.", icon: "03" },
            { title: "GA4 Web Data Analytics", target: "Configure custom event tags in Google Tag Manager, trace active inquiry checkouts, monitor heatmaps, and compile Google Looker Studio reports.", icon: "04" }
          ].map((proj, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-premium hover:border-[#163C8C] transition-all duration-300 flex flex-col justify-between min-h-[250px]">
              <div>
                <span className="text-3xl font-heading font-black text-slate-300 block mb-4">
                  {proj.icon}
                </span>
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-2 leading-tight">
                  {proj.title}
                </h3>
                <p className="text-slate-600 text-xs font-sans leading-relaxed">
                  {proj.target}
                </p>
              </div>
              <span className="text-[10px] text-[#2857A4] font-mono font-bold block pt-4 border-t border-slate-100">
                ✓ Hands-on practical implementation
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. INTERNSHIP & CAREER SUPPORT SECTION */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-[#163C8C] uppercase tracking-widest font-sans block">
              100% PLACEMENT TRACK RECORD
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
              Agency Internship & Placements
            </h2>
            <p className="text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
              We empower our trainees with dedicated job preparedness pipelines. Transition smoothly into direct agency roles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Career details */}
            <div className="lg:col-span-6 space-y-8 text-left">
              {[
                { title: "Curated Resume Workshops", desc: "Build outstanding resumes highlighting actual campaign numbers, active SEO rankings, and verified Google certifications.", icon: <FiFileText className="text-brand-indigo" size={20} /> },
                { title: "LinkedIn Profile Optimization", desc: "Format your social profile to draw premium recruiters' attention, display portfolio milestones, and expand B2B networking.", icon: <FiUsers className="text-brand-violet" size={20} /> },
                { title: "Simulated Technical Mock Interviews", desc: "Face structured mock interview panels replicating major agency and corporate hiring assessments to build solid confidence.", icon: <FiShield className="text-brand-cyan" size={20} /> },
                { title: "Certified Agency Internship Positions", desc: "Upon graduating, transition into an active certified training internship with TSquadron’s digital marketing delivery department.", icon: <FiAward className="text-brand-emerald" size={20} /> }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 bg-[#F8FAFC] border border-slate-200/80 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-base text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 text-xs font-sans leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Statistics Dashboard Widget */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl border border-slate-200/80 bg-[#F8FAFC] p-6 sm:p-10 text-left shadow-premium">
                <span className="text-[9px] font-bold text-[#163C8C] uppercase tracking-widest block mb-1">TSQUADRON PLACEMENT MATRIX</span>
                <h3 className="font-heading font-black text-slate-900 text-xl mb-6">Trainee Career Progress Logs</h3>

                <div className="space-y-6 font-sans">
                  {[
                    { label: "Successful Course Completions", count: "500+ Trainees", percent: "98%" },
                    { label: "Secured Direct Placements / Internships", count: "420+ Placed", percent: "84%" },
                    { label: "Freelancing Remote Trainees Active", count: "60+ Global", percent: "75%" }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-700 font-medium">{stat.label}</span>
                        <span className="font-bold text-[#163C8C]">{stat.count} ({stat.percent})</span>
                      </div>
                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#163C8C] to-[#2857A4] rounded-full" 
                          style={{ width: stat.percent }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-white rounded-2xl border border-slate-200/60 text-slate-600 text-[11px] leading-relaxed flex gap-3 items-center">
                  <FiCheckCircle className="text-[#3569B3] shrink-0" size={18} />
                  <span>TSquadron Academy works directly with 40+ active technology & marketing hiring associates globally.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHO CAN JOIN THIS TRAINING SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-[#163C8C] uppercase tracking-widest font-sans block">
            ELITE ELIGIBILITY CLASSIFICATIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            Who Can Join TSquadron?
          </h2>
          <p className="text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
            Our curriculum is built to accommodate multiple profile classifications, catering to specific goals and needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {whoCanJoinCards.map((card, idx) => (
            <GlowingCard key={idx} delay={idx * 0.03} className="min-h-[220px]">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/50 flex items-center justify-center text-[#163C8C]">
                  {card.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900 leading-snug">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-xs font-sans leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </GlowingCard>
          ))}
        </div>
      </section>

      {/* 9. THE TRAINING STEP-BY-STEP PROCESS TIMELINE */}
      <section className="border-t border-slate-200/60 py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-bold text-[#163C8C] uppercase tracking-widest font-sans block">
            YOUR TRANSFORMATION PLAN
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            Our Structured Training Process
          </h2>
        </div>

        {/* Timeline representation */}
        <div className="relative max-w-4xl mx-auto w-full px-4 md:px-0">
          {/* Vertical connector line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-200 -translate-x-1/2" />

          {[
            { step: "01", title: "Free Consultation", desc: "Interact directly with our academic career counselor to outline your professional targets, review potential courses, and choose correct curricula." },
            { step: "02", title: "Live Demo Session", desc: "Attend an interactive, free preview classroom demo to audit TSquadron's training style, live project dashboards, and expert tutors." },
            { step: "03", title: "Course Enrollment", desc: "Enroll into the course and gain access to your LMS student account, tool directories, search auditing scripts, and databases." },
            { step: "04", title: "Live Practical Training", desc: "Immerse yourself in structured physical / online classrooms. Execute conceptual and live operations step-by-step alongside mentors." },
            { step: "05", title: "Assignments & Projects", desc: "Formulate complete keyword research documents, structural sitemaps, active ad templates, and analyze web events." },
            { step: "06", title: "Internship Exposure", desc: "Secure certified, agency internship credentials, performing digital marketing tasks directly under professional management." },
            { step: "07", title: "Acredited Certification", desc: "Attain professional certifications, compiled portfolio review validations, and global credentials like Google Ads." },
            { step: "08", title: "Placement Support", desc: "Face targeted technical mockup interviews, finalize resume formatting, and secure placement connections." }
          ].map((proc, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div 
                key={idx} 
                className={`mb-12 last:mb-0 relative flex flex-col md:flex-row items-start justify-between w-full ${ isEven ? 'md:flex-row-reverse' : '' }`}
              >
                {/* timeline bullet */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-1.5 md:top-[28px] w-3 h-3 rounded-full bg-white border-2 border-[#163C8C] z-10 shadow-sm" />

                {/* Heading Column */}
                <div className={`pl-16 md:pl-0 w-full md:w-[calc(50%-32px)] md:pt-5 ${ isEven ? 'md:text-left md:pl-8' : 'md:text-right md:pr-8' }`}>
                  <span className="text-lg font-heading font-black text-[#163C8C] block">
                    {proc.step}. {proc.title}
                  </span>
                </div>

                {/* Content Card Column */}
                <div className={`pl-16 md:pl-0 w-full md:w-[calc(50%-32px)] ${ isEven ? 'md:pr-8' : 'md:pl-8' } mt-2 md:mt-0`}>
                  <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-left hover:border-slate-300 transition-colors">
                    <p className="text-slate-600 text-xs font-sans leading-relaxed">
                      {proc.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. TOOLS COVERED SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-[#163C8C] uppercase tracking-widest font-sans block">
            INDUSTRY-STANDARD CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            Tools You Will Master
          </h2>
          <p className="text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
            Gain deep hands-on proficiency in the exact enterprise applications run by global digital marketing firms.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {[
            { name: "Google Analytics", desc: "Web Audience tracking", color: "border-amber-200 text-amber-700 bg-amber-50/50" },
            { name: "Search Console", desc: "Google index tracking", color: "border-blue-200 text-blue-700 bg-blue-50/50" },
            { name: "SEMrush Suite", desc: "Keyword & SEO audit", color: "border-orange-200 text-orange-700 bg-orange-50/50" },
            { name: "Ahrefs Engine", desc: "Backlinks & authority", color: "border-sky-200 text-sky-700 bg-sky-50/50" },
            { name: "Canva Pro", desc: "Visual advertising assets", color: "border-indigo-200 text-indigo-700 bg-indigo-50/50" },
            { name: "ChatGPT-4o / Gemini", desc: "AI Marketing automation", color: "border-emerald-200 text-emerald-700 bg-emerald-50/50" },
            { name: "Meta Ads Manager", desc: "Instagram & Facebook ads", color: "border-pink-200 text-pink-700 bg-pink-50/50" },
            { name: "Google Ads Editor", desc: "Paid search PPC bidding", color: "border-violet-200 text-violet-700 bg-violet-50/50" },
            { name: "WordPress Core", desc: "SASS & CMS configurations", color: "border-slate-300 text-slate-700 bg-slate-100/50" },
            { name: "Mailchimp / Klaviyo", desc: "Lifecycle drip flows", color: "border-yellow-300 text-yellow-800 bg-yellow-50/50" }
          ].map((tool, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-3xl border ${tool.color} text-center space-y-2 hover:scale-105 transition-all duration-300 shadow-premium`}
            >
              <h4 className="font-heading font-bold text-sm tracking-tight">{tool.name}</h4>
              <p className="text-[10px] opacity-75 font-sans leading-none">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 11. ACCREDITED CERTIFICATIONS */}
      <section className="bg-white py-24 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-[#163C8C] uppercase tracking-widest font-sans block">
              VALIDATE YOUR EXPERTISE
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
              Earn Dynamic Certifications
            </h2>
            <p className="text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
              Upon successful completion of the syllabus and your live audits, receive credentials that validate your skill set.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { title: "Course Completion Certificate", issuer: "TSquadron Digital Academy", desc: "Formally certifies your complete successful graduation across all 12 modules including SEO, PPC, and SMM.", icon: <FiAward size={26} className="text-brand-indigo" /> },
              { title: "Certified Agency Internship", issuer: "TSquadron Delivery Department", desc: "Documents your actual active professional internship, specifying your contribution to organic Google ranking improvements.", icon: <FiShield size={26} className="text-brand-violet" /> },
              { title: "Practical Live Project Certification", issuer: "TSquadron Corporate Partners", desc: "Recognizes your successful execution of a live promotional budget, outlining optimized CPLs and CTRs.", icon: <FiBriefcase size={26} className="text-brand-cyan" /> }
            ].map((cert, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 shadow-premium flex flex-col justify-between min-h-[250px] hover:border-[#163C8C] transition-colors"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#163C8C]">
                    {cert.icon}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 leading-tight">
                    {cert.title}
                  </h3>
                  <span className="text-[10px] text-[#2857A4] font-mono font-bold tracking-wider uppercase block">
                    Issued by: {cert.issuer}
                  </span>
                  <p className="text-slate-600 text-xs font-sans leading-relaxed">
                    {cert.desc}
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 block pt-4 border-t border-slate-100">
                  ★ Globally verifiable credential
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. STUDENT TESTIMONIALS & PLACEMENT STORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-[#163C8C] uppercase tracking-widest font-sans block">
            TRAINEE SUCCESS ARCHIVES
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            Trainee Success Stories
          </h2>
          <p className="text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
            Discover how TSquadron Academy has enabled students to transition into solid agency careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            { name: "Rahul Verma", role: "Digital Marketing Executive", comp: "Hired by KJ Labs", text: "TSquadron's offline Warangal course changed my entire career track. Designing Meta and Google ad sets with real budgets gave me massive confidence. I secured a job before even graduating!", rating: 5, pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
            { name: "Divya Reddy", role: "SEO Specialist", comp: "Stellar Web Designs", text: "Mastering GSC and SEMrush Gap Audits helped me understand actual search parameters. The practical local ranking mapping techniques enabled me to optimize small business search parameters easily.", rating: 5, pic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
            { name: "Suresh K.", role: "Independent Freelancer", comp: "Upwork & Fiverr", text: "I joined TSquadron as a business graduate to start freelancing. The detailed guidance on bidding frameworks and onboarding protocols helped me land my first $800 search optimization client.", rating: 5, pic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" }
          ].map((story, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-premium flex flex-col justify-between min-h-[300px]">
              <div className="space-y-4">
                {/* Simulated Star Ratings */}
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: story.rating }).map((_, idx) => (
                    <span key={idx} className="text-lg">★</span>
                  ))}
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-sans italic leading-relaxed">
                  "{story.text}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-slate-100 mt-6">
                <img 
                  src={story.pic} 
                  alt={story.name} 
                  className="w-12 h-12 rounded-full object-cover border border-slate-200" 
                />
                <div>
                  <span className="font-heading font-bold text-sm text-slate-900 block">{story.name}</span>
                  <span className="text-[10px] text-slate-500 block leading-tight">{story.role} &middot; <strong className="text-[#2857A4]">{story.comp}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 13. DETAILED FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center border-t border-slate-200/60">
        <div className="space-y-4 mb-16">
          <span className="text-xs font-bold text-[#163C8C] uppercase tracking-widest font-sans block">
            ACCORDION INSIGHTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            Frequently Answered Insights
          </h2>
        </div>

        {/* FAQ list */}
        <div className="space-y-4 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-premium transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-heading font-bold text-sm sm:text-base text-slate-800 hover:bg-slate-50 transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#163C8C] ml-4">
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
                      <div className="px-6 pb-6 text-slate-600 text-xs sm:text-sm font-sans leading-relaxed border-t border-slate-200 pt-4">
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

      {/* 14. HIGH-CONVERSION LEAD GENERATION CAPTURE CTA FORM */}
      <section id="lead-generation-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="relative rounded-[32px] p-6 sm:p-16 bg-gradient-to-tr from-[#163C8C] via-[#2857A4] to-[#163C8C] border border-white/10 overflow-hidden shadow-2xl text-left">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
            
            {/* Lead generation text block */}
            <div className="lg:col-span-5 space-y-6 text-white">
              <span className="text-xs font-bold text-brand-rose uppercase tracking-widest block">
                CONTACT COUNSELOR
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-black text-white leading-tight">
                Start Your Digital Marketing Career in Warangal
              </h2>
              <p className="text-slate-200 font-sans text-xs sm:text-sm max-w-md leading-relaxed font-light">
                Submit your details below to book your free classroom demo session, request consultation, or download the full detailed 3-month course syllabus PDF.
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-brand-rose">✓</div>
                  <span className="text-slate-100 text-xs font-sans">100% Free Demo Session Booking</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-brand-rose">✓</div>
                  <span className="text-slate-100 text-xs font-sans">Full PDF Syllabus via Email</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-brand-rose">✓</div>
                  <span className="text-slate-100 text-xs font-sans">In-Person Counseling Booking</span>
                </div>
              </div>
            </div>

            {/* Interactive Form Panel */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-10 shadow-premium">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Input */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Full Name *</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border ${errors.name ? 'border-red-400' : 'border-slate-200'} rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#163C8C] transition-all`}
                        />
                        <FiUser className="absolute left-3.5 top-3.5 text-slate-400" size={14} />
                      </div>
                      {errors.name && <span className="text-[10px] text-red-500 block font-sans">{errors.name}</span>}
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Email Address *</label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border ${errors.email ? 'border-red-400' : 'border-slate-200'} rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#163C8C] transition-all`}
                        />
                        <FiMail className="absolute left-3.5 top-3.5 text-slate-400" size={14} />
                      </div>
                      {errors.email && <span className="text-[10px] text-red-500 block font-sans">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Input */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Phone Number *</label>
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border ${errors.phone ? 'border-red-400' : 'border-slate-200'} rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#163C8C] transition-all`}
                        />
                        <FiPhone className="absolute left-3.5 top-3.5 text-slate-400" size={14} />
                      </div>
                      {errors.phone && <span className="text-[10px] text-red-500 block font-sans">{errors.phone}</span>}
                    </div>

                    {/* Enquiry Type selection */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Enquiry Type *</label>
                      <div className="relative">
                        <select
                          value={formData.enquiryType}
                          onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                          className="w-full pl-10 pr-8 py-3 bg-[#F8FAFC] border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#163C8C] transition-all appearance-none"
                        >
                          <option value="Free Demo Session">Book Free Demo Session</option>
                          <option value="Course Registration">Register For Course</option>
                          <option value="Career Consultation">Free Career Consultation</option>
                          <option value="Download Syllabus">Download Curriculum PDF</option>
                        </select>
                        <FiTarget className="absolute left-3.5 top-3.5 text-slate-400" size={14} />
                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Course selection */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Course Interest *</label>
                    <div className="relative">
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full pl-10 pr-8 py-3 bg-[#F8FAFC] border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#163C8C] transition-all appearance-none"
                      >
                        <option value="Complete Digital Marketing Masterclass">Complete Digital Marketing Masterclass (3 Months)</option>
                        <option value="Advanced SEO Specialization">Advanced SEO Specialization (1 Month)</option>
                        <option value="Paid Ads & PPC BootCamp">Paid Ads & PPC BootCamp (1 Month)</option>
                        <option value="Social Media & Creative Branding">Social Media & Creative Branding (1 Month)</option>
                      </select>
                      <FiBriefcase className="absolute left-3.5 top-3.5 text-slate-400" size={14} />
                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Add Message details (Optional)</label>
                    <div className="relative">
                      <textarea
                        rows={3}
                        placeholder="Share your goals or current background..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-[#163C8C] transition-all"
                      />
                      <FiMessageSquare className="absolute left-3.5 top-3.5 text-slate-400" size={14} />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#163C8C] to-[#2857A4] hover:from-[#5E9CB3] hover:to-[#163C8C] text-white font-heading font-bold rounded-xl shadow-premium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2 text-xs">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Securing Counselor Connection...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-xs uppercase tracking-wider font-extrabold">
                        Submit Enquiry Request <FiSend />
                      </span>
                    )}
                  </button>
                </form>

                {/* Success Animation Screen Overlay */}
                <AnimatePresence>
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-20 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-sm flex items-center justify-center p-6 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0.95, y: 8 }}
                        animate={{ scale: 1, y: 0 }}
                        className="max-w-md space-y-4"
                      >
                        <div className="mx-auto w-14 h-14 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-500">
                          <FiCheck size={26} />
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-heading font-black text-xl text-slate-900">Enquiry Submitted!</h3>
                          <p className="text-slate-600 text-xs font-sans leading-relaxed">
                            Your training objectives have reached TSquadron Academy counselor logs. We will contact you within 12 business hours to validate your classroom seat.
                          </p>
                        </div>

                        <button
                          onClick={() => setIsSuccess(false)}
                          className="px-6 py-2.5 rounded-full font-heading font-bold text-xs text-white bg-gradient-to-r from-[#163C8C] to-[#2857A4] hover:scale-105 transition-transform"
                        >
                          Back to Form
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 15. PHYSICAL TRAINING CENTER & GOOGLE MAPS EMBED */}
      <section className="border-t border-slate-200/60 py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-[#163C8C] uppercase tracking-widest font-sans block">
              VISIT OUR WARANGAL HQ
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
              Contact & Training Center
            </h2>
            <p className="text-slate-600 font-sans max-w-xl mx-auto leading-relaxed">
              Walk into our local academy campus to interact directly with mentors and audit active student campaigns.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left side: office details */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-4">
                <span className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-[10px] font-bold text-emerald-600 flex items-center gap-1 w-max">
                  ✓ Academy Center open: 9:00 AM - 7:00 PM
                </span>
                <h3 className="font-heading font-black text-slate-900 text-2xl">Direct Coordinates</h3>
                <p className="text-slate-600 text-xs font-sans leading-relaxed">
                  Connect with our program managers via call, mail, or instant WhatsApp.
                </p>
              </div>

              <div className="space-y-4 flex-grow pt-4">
                {[
                  { title: "Training Center Office", val: "2nd Floor, V-Square Plaza, Naimnagar Main Road, Hanamkonda, Warangal, Telangana 506001", icon: <FiMapPin /> },
                  { title: "Direct Helpline Support", val: "+91 9346989817", icon: <FiPhone className="text-brand-indigo" /> },
                  { title: "Email Academic Registrar", val: "info@tsquadron.com", icon: <FiMail /> }
                ].map((coord, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-[#163C8C]">
                      {coord.icon}
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[9px] text-[#2857A4] font-mono font-bold tracking-wider uppercase block">{coord.title}</span>
                      <span className="text-xs font-bold text-slate-800 block leading-relaxed">{coord.val}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Quick WhatsApp CTA */}
              <a 
                href="https://wa.me/919346989817?text=Hi%20TSquadron%20Academy%2C%20I%20am%20interested%20in%20the%20Digital%20Marketing%20Training%20in%20Warangal."
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-center gap-2.5 w-full py-4.5 rounded-2xl font-heading font-black text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-premium transition-all text-center"
              >
                MESSAGE ON WHATSAPP QUICKLY <FiSend />
              </a>
            </div>

            {/* Embedded Google Maps Location Widget */}
            <div className="lg:col-span-7 relative rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-premium min-h-[350px] h-full group">
              <iframe
                title="TSquadron Academy Hub Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.327406740927!2d79.5601415!3d18.0100029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3345825fc234f9%3A0x533cc629b53be878!2sDigital%20Marketing%20Training%20in%20Warangal%20%7C%20Tsquadron!5e0!3m2!1sen!2sin!4v1716275810000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full grayscale-[10%] contrast-[105%] group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute bottom-4 right-4 z-10">
                <a
                  href="https://maps.app.goo.gl/UpQux41aUVMsD8LZA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-xs font-heading font-black text-brand-indigo shadow-md hover:bg-white hover:scale-105 active:scale-95 transition-all"
                >
                  OPEN IN GOOGLE MAPS ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
