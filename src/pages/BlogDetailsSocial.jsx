import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiArrowRight, FiCheckCircle, FiTrendingUp, FiGlobe, FiShare2, 
  FiMousePointer, FiMail, FiShield, FiPlus, FiMinus, FiFileText, 
  FiCpu, FiActivity, FiUsers, FiAward, FiTarget, FiChevronRight, FiSearch,
  FiZap, FiBriefcase, FiBarChart2, FiPieChart, FiLayout, FiSmartphone, FiMonitor,
  FiShoppingBag, FiLayers, FiSettings, FiHeart, FiBookOpen, FiHome, FiMessageSquare,
  FiCheck, FiCalendar, FiUser, FiClock, FiSend, FiTag, FiEye
} from 'react-icons/fi'

export default function BlogDetailsSocial({ setActivePage }) {
  const [commentForm, setCommentForm] = useState({
    comment: '',
    name: '',
    email: '',
    website: '',
    saveInfo: false
  })
  const [commentsList, setCommentsList] = useState([
    {
      name: "Srinivas Rao",
      date: "January 4, 2024",
      text: "This is a masterpiece of a breakdown! The integration of social commerce and AI personalization is exactly what our ecommerce brand is scaling this year. Great insights, TSquadron!"
    },
    {
      name: "Sarah Jenkins",
      date: "December 28, 2023",
      text: "The future is definitely short-form video and AR. We launched a simple AR try-on filter last month and saw a 30% jump in click-through rates. Excellent article."
    }
  ])
  const [commentSubmitted, setCommentSubmitted] = useState(false)
  const [activeSection, setActiveSection] = useState('video')
  const [searchQuery, setSearchQuery] = useState('')

  // Section Refs for scroll spy
  const sectionRefs = {
    video: useRef(null),
    ai: useRef(null),
    ar: useRef(null),
    commerce: useRef(null),
    influencer: useRef(null),
    content: useRef(null),
    data: useRef(null),
    mgmt: useRef(null),
    campaigns: useRef(null),
    solutions: useRef(null)
  }

  useEffect(() => {
    // [SEO Manager Override] document.title = "The Future of Social Media Marketing | TSquadron"
    const metaDesc = document.querySelector('meta[name="description"]')
    const descText = "Explore the future of social media marketing including AI personalization, video content, AR experiences, influencer marketing, and social commerce strategies."
    if (metaDesc) {
      metaDesc.setAttribute("content", descText)
    } else {
      const meta = document.createElement('meta')
      meta.name = "description"
      meta.content = descText
      document.getElementsByTagName('head')[0].appendChild(meta)
    }

    // Scroll Spy Setup
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300
      for (const [sectionId, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const offsetTop = ref.current.offsetTop
          const offsetHeight = ref.current.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (!commentForm.comment || !commentForm.name || !commentForm.email) return

    const newComment = {
      name: commentForm.name,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      text: commentForm.comment
    }
    setCommentsList([newComment, ...commentsList])
    setCommentSubmitted(true)
    setCommentForm({ comment: '', name: '', email: '', website: '', saveInfo: commentForm.saveInfo })
    setTimeout(() => setCommentSubmitted(false), 4000)
  }

  const navigateTo = (pageId) => {
    setActivePage(pageId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const tocItems = [
    { id: "video", label: "1. Video Dominance" },
    { id: "ai", label: "2. AI-Powered Personalization" },
    { id: "ar", label: "3. Augmented Reality (AR)" },
    { id: "commerce", label: "4. Social Commerce Integration" },
    { id: "influencer", label: "5. Influencer Collaborations" },
    { id: "content", label: "6. Content Creation & Curation" },
    { id: "data", label: "7. Data-Driven Analytics" },
    { id: "mgmt", label: "8. Influencer Management" },
    { id: "campaigns", label: "9. AI-Powered Campaigns" },
    { id: "solutions", label: "10. Social Commerce Solutions" }
  ]

  const recentPosts = [
    { title: "Types of Visibility in Digital Marketing", route: "blog-details-visibility" },
    { title: "The Impact of Online Reputation Management on SEO", route: "blog-details-reputation" },
    { title: "The Impact of UI/UX Design on User Engagement", route: "blog-details-uiux" },
    { title: "The Future of Email Marketing", route: "blog-details-email" },
    { title: "Top 10 Link Building Strategies to Rank Higher", route: "blog-details-link" }
  ]

  const relatedPosts = [
    {
      title: "Types of Visibility in Digital Marketing",
      route: "blog-details-visibility",
      desc: "Unlock the strategic dimensions of digital footprint expansion. Learn how search presence, brand mentions, and continuous content maps secure ultimate digital authority.",
      glow: "from-brand-indigo/10 to-brand-violet/5",
      badge: "Visibility"
    },
    {
      title: "The Impact of Online Reputation Management on SEO",
      route: "blog-details-reputation",
      desc: "Explore how brand sentiment audits, Google reviews, and review pipelines drive powerful positive search rankings and build deep, unwavering customer loyalty.",
      glow: "from-brand-cyan/10 to-brand-indigo/5",
      badge: "Reputation"
    },
    {
      title: "The Impact of UI/UX Design on User Engagement",
      route: "blog-details-uiux",
      desc: "Delve into the engineering of high-conversion digital customer flows. Discover how premium friction-free design, micro-animations, and visual balance skyrocket retention.",
      glow: "from-brand-rose/10 to-brand-violet/5",
      badge: "UI/UX Design"
    }
  ]

  return (
    <div className="relative bg-white pt-24 pb-12 overflow-hidden text-left">
      {/* Decorative ambient gradients */}
      <div className="absolute top-20 left-[-10%] w-[45%] h-[45%] bg-brand-violet/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[800px] right-[-10%] w-[45%] h-[45%] bg-brand-cyan/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* Header Cover Image Grid (SaaS-Inspired Minimal Editorial Header) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 font-sans font-medium mb-8">
          <button onClick={() => navigateTo('home')} className="hover:text-brand-indigo transition-colors flex items-center gap-1"><FiHome className="text-slate-400" /> Home</button>
          <FiChevronRight className="text-brand-label" size={12} />
          <button onClick={() => navigateTo('blog')} className="hover:text-brand-indigo transition-colors">Blog</button>
          <FiChevronRight className="text-brand-label" size={12} />
          <span className="text-slate-800 font-semibold truncate">The Future of Social Media Marketing</span>
        </nav>

        {/* HERO TITLE BLOCK */}
        <div className="max-w-5xl space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/5 border border-brand-indigo/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo animate-pulse" />
            <span className="text-[10px] font-bold text-brand-indigo uppercase tracking-widest font-sans">
              Social Media Marketing
            </span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-heading font-extrabold text-slate-900 tracking-tight leading-[1.1] font-sans">
            The Future of <span className="bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-cyan bg-clip-text text-transparent">Social Media Marketing</span>
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-2 pb-6 border-b border-slate-100 text-xs text-slate-500 font-sans">
            <span className="flex items-center gap-2"><FiCalendar className="text-brand-indigo" /> December 26, 2023</span>
            <span className="flex items-center gap-2"><FiUser className="text-brand-violet" /> By TSquadron</span>
            <span className="flex items-center gap-2"><FiClock className="text-brand-cyan" /> 9 min read</span>
          </div>

          <p className="text-lg sm:text-xl text-slate-600 font-sans leading-relaxed max-w-4xl pt-2">
            Explore how AI, video content, AR experiences, social commerce, and influencer collaborations are transforming the future of social media marketing.
          </p>
        </div>

        {/* Dynamic Graphic Hero Banner Mockups */}
        <div className="w-full rounded-[32px] p-1 bg-gradient-to-tr from-brand-indigo/20 via-brand-violet/10 to-brand-cyan/20 overflow-hidden shadow-2xl mb-16">
          <div className="w-full rounded-[31px] bg-slate-900 overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative p-6 sm:p-12 gap-8 text-white min-h-[360px]">
            {/* Visual background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 opacity-90 z-0" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-cyan/10 rounded-full blur-[80px] z-0" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-violet/10 rounded-full blur-[80px] z-0" />
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6 relative z-10">
              <span className="text-[10px] font-bold tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 px-3 py-1 rounded-full w-max">
                Trend Watch 2026
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-black leading-tight text-white">
                Next-Gen Social Channels & Dynamic Content Systems
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Unlock the ultimate blueprint of audience engagement. Learn how AI-powered recommendation networks, direct interactive checkout funnels, and creators shape global corporate brand perception in Warangal, Hyderabad, and digital markets worldwide.
              </p>
              <div className="flex gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-brand-cyan">
                  <FiTrendingUp /> <span>Avg. Engagement Up +142%</span>
                </div>
                <div className="w-[1px] h-4 bg-slate-800" />
                <div className="flex items-center gap-1.5 text-xs text-brand-violet">
                  <FiUsers /> <span>Influencer Trust +89%</span>
                </div>
              </div>
            </div>

            {/* Right Interactive/Graphic UI Mockup Column */}
            <div className="lg:col-span-6 relative z-10 flex items-center justify-center">
              <div className="w-full max-w-md bg-[#13112b] border border-slate-800/80 rounded-2xl p-5 shadow-2xl relative overflow-hidden space-y-4">
                {/* Header of Mockup */}
                <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-rose" />
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-cyan" />
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-violet" />
                  </div>
                  <span className="text-[10px] font-sans font-semibold text-slate-400">Social Engine v4.2</span>
                </div>

                {/* Dashboard grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[9px] text-slate-400 font-sans block">AI Feed Matching</span>
                    <div className="flex items-baseline gap-1 text-slate-100 font-bold font-heading text-lg">
                      <span>98.4%</span>
                      <span className="text-[9px] text-brand-emerald">+2.3%</span>
                    </div>
                    <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
                      <div className="w-[98.4%] h-full bg-brand-cyan" />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[9px] text-slate-400 font-sans block">Short-Form Plays</span>
                    <div className="flex items-baseline gap-1 text-slate-100 font-bold font-heading text-lg">
                      <span>245.8K</span>
                      <span className="text-[9px] text-brand-emerald">+12.4%</span>
                    </div>
                    <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
                      <div className="w-[88%] h-full bg-brand-violet" />
                    </div>
                  </div>
                </div>

                {/* Live stream timeline mockup element */}
                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-indigo to-brand-cyan flex items-center justify-center font-black text-slate-900 text-xs">TS</div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-semibold text-slate-100 block leading-tight">Live Shopping Campaign</span>
                      <span className="text-[8px] text-slate-400 block leading-none">Checkout active • 1.2K viewers</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded-full uppercase">Active</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ARTICLE INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">
        <div className="p-8 sm:p-10 rounded-[32px] bg-slate-50 border border-slate-100 shadow-[0_4px_30px_rgba(15,23,42,0.02)] max-w-4xl space-y-6 relative overflow-hidden">
          {/* Inner ambient quote design element */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-indigo/5 rounded-full blur-[30px]" />
          
          <h3 className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans">
            Editorial Introduction
          </h3>

          <p className="text-slate-900 text-lg sm:text-xl font-sans font-medium leading-relaxed border-l-4 border-brand-indigo pl-6">
            “In the fast-evolving landscape of digital marketing, social media has emerged as a powerful force reshaping how businesses connect with their audiences.”
          </p>
          
          <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
            Leading the charge in the future of social media means unlocking massive audience engagement levels, initiating comprehensive digital transformation, engineering robust modern marketing strategies, and dynamically analyzing changing consumer behavior patterns. To build a robust brand presence, marketing leaders must integrate emerging technologies into their workflow to foster community and drive sales.
          </p>
        </div>
      </section>

      {/* THREE-COLUMN GRID: STICKY TOC (left), CENTRAL ARTICLE CONTENT (center), SEARCH/SIDEBAR (right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* 1. LEFT COLUMN: Sticky Table of Contents */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-28 p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_10px_40px_rgba(15,23,42,0.03)] space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <FiBookOpen className="text-brand-indigo" size={16} />
                <h3 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Table of Contents
                </h3>
              </div>
              <nav className="space-y-1.5">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left text-xs font-sans py-2 pl-3 border-l-2 transition-all block leading-tight ${
                      activeSection === item.id 
                        ? 'border-brand-indigo text-brand-indigo font-semibold bg-brand-indigo/[0.02] rounded-r-lg' 
                        : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-200 pl-3'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* 2. CENTER COLUMN: Deep-Dive Article Sections with Interactive Mockups */}
          <div className="lg:col-span-6 space-y-20">
            
            {/* Section 1: Video Dominance */}
            <div id="video" ref={sectionRefs.video} className="space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-brand-cyan"><FiSmartphone size={16} /></span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
                  1 — Video Dominance
                </h2>
              </div>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Platforms like TikTok, Instagram Reels, and YouTube have made short-form videos the primary channel to capture immediate audience attention. Building hyper-shareable visual items keeps audiences involved and maximizes organic brand discovery metrics. As viewer attention spans compress, creating concise, impactful, and visual short-form content drives retention and expands marketing footprints exponentially.
              </p>

              {/* Graphic Widget: TikTok/Reels Short Form Mockup */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm mt-4 space-y-4 text-left">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/50">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan animate-ping" />
                    <span className="text-[10px] text-slate-700 font-bold uppercase tracking-wider font-sans">Live Engagement Feed</span>
                  </div>
                  <span className="text-[9px] text-brand-indigo font-bold bg-brand-indigo/10 px-2 py-0.5 rounded-full">8.8x Conversion</span>
                </div>
                
                {/* Simulated TikTok Video Post Widget */}
                <div className="w-full rounded-xl bg-slate-900 p-4 border border-slate-800 relative overflow-hidden flex gap-4 text-white">
                  <div className="w-24 h-36 bg-gradient-to-b from-[#1c1a35] to-[#0d0a21] border border-slate-800 rounded-lg shrink-0 flex flex-col justify-between p-2 relative overflow-hidden">
                    <div className="w-max px-1 rounded bg-brand-cyan/20 border border-brand-cyan/30 text-[7px] font-bold text-brand-cyan font-sans uppercase">Reel Live</div>
                    {/* Visual play counts */}
                    <div className="space-y-0.5 text-left">
                      <span className="text-[8px] font-black flex items-center gap-0.5 text-white"><FiEye size={8} /> 48K Views</span>
                      <span className="text-[6px] text-slate-300 block">TikTok Delivery Pipeline</span>
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-1 text-left space-y-2">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-white block">Short-Form Video Performance</span>
                      <p className="text-[9px] text-slate-400 leading-tight">Hyper-shareable video formats captured 88% of immediate target customer attention compared to text layouts.</p>
                    </div>
                    {/* Analytics progress */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-sans font-semibold">
                        <span className="text-slate-400">Engagement Index</span>
                        <span className="text-brand-cyan font-bold">88.2%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="w-[88.2%] h-full bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-cyan" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: AI-Powered Personalization */}
            <div id="ai" ref={sectionRefs.ai} className="space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-indigo/10 flex items-center justify-center text-brand-indigo"><FiCpu size={16} /></span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
                  2 — AI-Powered Personalization
                </h2>
              </div>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Harnessing Artificial Intelligence capabilities to monitor user behavior patterns allows networks to refine feed algorithms and recommend highly custom content. Dynamic targeted advertising increases conversion rates while reinforcing absolute customer satisfaction levels. By predicting user desires, automated machine-learning assets align content instantly, making organic marketing feel like organic entertainment.
              </p>

              {/* Graphic Widget: AI Targeting Recommendation Hub */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm mt-4 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
                  <span className="text-[10px] font-bold text-slate-700 font-sans uppercase tracking-wider">AI Content Recommendation Engine</span>
                  <span className="text-[9px] text-brand-emerald bg-brand-emerald/10 px-2 py-0.5 rounded-full font-bold">+34.8% CTR</span>
                </div>
                
                <div className="space-y-2">
                  {/* Algorithmic matching item 1 */}
                  <div className="p-3 bg-white border border-slate-150 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FiSettings className="text-brand-indigo animate-spin" size={14} style={{ animationDuration: '6s' }} />
                      <span className="font-semibold text-slate-800">Dynamic Product Ad Slot</span>
                    </div>
                    <span className="text-brand-indigo font-bold">96.7% Match Probability</span>
                  </div>

                  {/* Algorithmic matching item 2 */}
                  <div className="p-3 bg-white border border-slate-150 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FiTarget className="text-brand-violet" size={14} />
                      <span className="font-semibold text-slate-800">Behavior-Mapped Feed Suggestion</span>
                    </div>
                    <span className="text-brand-violet font-bold">92.4% Affinity Score</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Augmented Reality (AR) Experiences */}
            <div id="ar" ref={sectionRefs.ar} className="space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-violet/10 flex items-center justify-center text-brand-violet"><FiMonitor size={16} /></span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
                  3 — Augmented Reality (AR) Experiences
                </h2>
              </div>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Custom AR filters and immersive virtual environments build immediate interactive customer engagement. Permitting seamless virtual product interaction before checkout establishes deep, memorable brand connections. AR experiences bridge the gap between digital convenience and tactile reality, driving brand loyalty and reducing return rates.
              </p>

              {/* Graphic Widget: Simulated AR try-on camera view */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm mt-4 space-y-4">
                <span className="text-[10px] text-slate-700 font-bold uppercase tracking-wider font-sans block pb-2 border-b border-slate-200/50">Virtual Product AR Lens</span>
                
                <div className="w-full rounded-xl bg-slate-900 p-4 relative overflow-hidden flex flex-col justify-between min-h-[160px] text-white">
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 opacity-90 z-0" />
                  
                  {/* Glowing camera scanning indicator grid */}
                  <div className="absolute inset-0 border-2 border-dashed border-brand-violet/30 rounded-xl m-2 pointer-events-none z-10 flex items-center justify-center">
                    <span className="w-4 h-4 border-2 border-brand-cyan rounded-full animate-ping" />
                  </div>

                  <div className="flex justify-between items-start relative z-10">
                    <span className="text-[9px] bg-brand-violet/20 border border-brand-violet/40 px-2 py-0.5 rounded uppercase font-semibold">AR Active</span>
                    <span className="text-[8px] text-slate-400">Interactive Face Filter</span>
                  </div>

                  <div className="flex justify-between items-end relative z-10">
                    <div className="space-y-0.5 text-left">
                      <span className="text-[10px] font-bold block">Smart Sunglasses Filter</span>
                      <span className="text-[8px] text-slate-400">Interactive virtual product try-on UI</span>
                    </div>
                    <span className="text-[10px] font-bold text-brand-cyan flex items-center gap-1">Live Preview <FiChevronRight /></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Social Commerce Integration */}
            <div id="commerce" ref={sectionRefs.commerce} className="space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-rose/10 flex items-center justify-center text-brand-rose"><FiShoppingBag size={16} /></span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
                  4 — Social Commerce Integration
                </h2>
              </div>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Unifying checkout pathways with in-app purchasing mechanics and shoppable posts reshapes modern marketplaces. Continuous social commerce growth ensures viewers purchase items instantly without ever leaving their favorite feeds. By reducing user click paths from discovery to purchase, social commerce transforms social networks into robust, transaction-ready storefronts.
              </p>

              {/* Graphic Widget: Instagram/Social Shop Hotspots Mockup */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm mt-4 space-y-4">
                <span className="text-[10px] text-slate-700 font-bold uppercase tracking-wider font-sans block pb-2 border-b border-slate-200/50">Shoppable Feed Hotspot UI</span>
                
                <div className="w-full rounded-xl bg-slate-100 p-4 border border-slate-200/60 relative overflow-hidden flex flex-col justify-between min-h-[140px] text-slate-800">
                  <div className="flex justify-between items-center text-[10px] text-slate-600">
                    <span>Shoppable Post Preview</span>
                    <span className="font-bold text-brand-indigo font-sans">Instagram Storefront</span>
                  </div>

                  {/* Mock Hotspot */}
                  <div className="flex justify-center items-center py-4">
                    <div className="relative p-2 rounded-xl bg-white border border-slate-200 shadow-md flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-indigo animate-pulse shrink-0" />
                      <div className="text-left">
                        <span className="text-[10px] font-bold block text-slate-900">TSquadron Premium Service</span>
                        <span className="text-[8px] text-slate-500 block">Buy Directly - In-App Checkout</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200/50 text-[10px]">
                    <span className="text-slate-500">In-app purchasing system integrated</span>
                    <button className="px-3 py-1 bg-brand-indigo text-white rounded-lg font-bold text-[8px] uppercase tracking-wider">Quick Checkout</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Influencer Collaborations */}
            <div id="influencer" ref={sectionRefs.influencer} className="space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-brand-cyan"><FiUsers size={16} /></span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
                  5 — Influencer Collaborations
                </h2>
              </div>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Partnering with micro and nano-influencers allows organizations to deploy highly authentic product recommendations. Sincere thought-leader associations foster stronger brand trust and drive outstanding community response rates. By prioritizing authentic connection over superficial celebrity endorsement, modern organizations establish relatable, highly high-converting social campaigns.
              </p>

              {/* Graphic Widget: Influencer collaboration card stats */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm mt-4 space-y-4">
                <span className="text-[10px] text-slate-700 font-bold uppercase tracking-wider font-sans block pb-2 border-b border-slate-200/50">Creator Partnership Pipeline</span>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-left space-y-1">
                    <span className="text-[9px] text-slate-500 font-sans uppercase tracking-widest block">Micro-Influencer</span>
                    <span className="text-xs font-bold text-slate-800 block">Aesthetic Creator</span>
                    <div className="flex justify-between text-[8px] pt-1">
                      <span className="text-slate-500">Reach: 45K</span>
                      <span className="text-brand-indigo font-bold">Engagement: 8.7%</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-left space-y-1">
                    <span className="text-[9px] text-slate-500 font-sans uppercase tracking-widest block">Nano-Influencer</span>
                    <span className="text-xs font-bold text-slate-800 block">Niche Tech Reviewer</span>
                    <div className="flex justify-between text-[8px] pt-1">
                      <span className="text-slate-500">Reach: 8.5K</span>
                      <span className="text-brand-violet font-bold">Engagement: 12.4%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6: Content Creation and Curation */}
            <div id="content" ref={sectionRefs.content} className="space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-indigo/10 flex items-center justify-center text-brand-indigo"><FiFileText size={16} /></span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
                  1 — Content Creation and Curation
                </h2>
              </div>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Publishing valuable shareable content that represents a defined corporate brand voice is vital. Consistent messaging across multiple platforms guarantees your stories achieve deep, meaningful audience resonance. A well-curated content pipeline aligns platform-specific features (like polls, stories, threads) while maintaining absolute uniformity of your brand's core corporate identity.
              </p>

              {/* Graphic Widget: Content calendar mockup */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm mt-4 space-y-4">
                <span className="text-[10px] text-slate-700 font-bold uppercase tracking-wider font-sans block pb-2 border-b border-slate-200/50">Consistent Brand Voice Content Calendar</span>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-left">
                    <span className="text-[8px] text-brand-indigo font-bold block uppercase">Monday</span>
                    <span className="text-[9px] font-semibold text-slate-800 block">Instagram Poll</span>
                    <span className="text-[7px] text-slate-500 block mt-1">Nurturing Audience Feedback</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-left">
                    <span className="text-[8px] text-brand-violet font-bold block uppercase">Wednesday</span>
                    <span className="text-[9px] font-semibold text-slate-800 block">YouTube Short</span>
                    <span className="text-[7px] text-slate-500 block mt-1">Video Dominance Launch</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-left">
                    <span className="text-[8px] text-brand-cyan font-bold block uppercase">Friday</span>
                    <span className="text-[9px] font-semibold text-slate-800 block">LinkedIn Pulse</span>
                    <span className="text-[7px] text-slate-500 block mt-1">Data-Driven Analytics</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 7: Data-Driven Analytics */}
            <div id="data" ref={sectionRefs.data} className="space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-violet/10 flex items-center justify-center text-brand-violet"><FiBarChart2 size={16} /></span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
                  2 — Data-Driven Analytics
                </h2>
              </div>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Extracting deep user behavior insights from advanced marketing panels allows marketers to monitor accurate campaign performance metrics. Factual performance tracking underpins strategic decision-making and continuous channel optimization. Transitioning away from superficial vanity metrics like likes, modern marketing systems evaluate actual conversion statistics and buyer retention factors to secure sustainable campaign ROI.
              </p>

              {/* Graphic Widget: Premium Analytics panel mockup */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm mt-4 space-y-4">
                <span className="text-[10px] text-slate-700 font-bold uppercase tracking-wider font-sans block pb-2 border-b border-slate-200/50">Advanced Performance Dashboard</span>
                
                <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Total Optimized Growth</span>
                    <span className="text-brand-cyan font-bold">+412.3% YTD</span>
                  </div>
                  
                  {/* Growth graph mock */}
                  <div className="flex items-end justify-between h-16 pt-2 px-4 border-b border-slate-800">
                    <div className="w-3 h-4 bg-slate-800 rounded-t" />
                    <div className="w-3 h-8 bg-slate-850 rounded-t" />
                    <div className="w-3 h-6 bg-brand-indigo/60 rounded-t" />
                    <div className="w-3 h-10 bg-brand-violet/85 rounded-t animate-pulse" />
                    <div className="w-3 h-14 bg-brand-cyan rounded-t" />
                  </div>
                  
                  <div className="flex justify-between text-[8px] text-slate-500">
                    <span>Q1</span>
                    <span>Q2</span>
                    <span>Q3</span>
                    <span>Q4</span>
                    <span>Current</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 8: Influencer Management */}
            <div id="mgmt" ref={sectionRefs.mgmt} className="space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-rose/10 flex items-center justify-center text-brand-rose"><FiLayers size={16} /></span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
                  3 — Influencer Management
                </h2>
              </div>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Running structured influencer outreach campaigns, coordinating logical negotiations, and managing creator collaborations on modern dashboards scales campaign efficiency. Professional creator tracking optimizes overall brand performance, tracking key aspects like asset delivery, usage rights contracts, and referral sales pipelines in one centralized workspace.
              </p>

              {/* Graphic Widget: Centralized Creator Workflow Panel */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm mt-4 space-y-4">
                <span className="text-[10px] text-slate-700 font-bold uppercase tracking-wider font-sans block pb-2 border-b border-slate-200/50">Centralized Collaboration CRM</span>
                
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-white border border-slate-150 rounded-lg flex items-center justify-between">
                    <span className="font-semibold text-slate-800">1. Discovery & Match</span>
                    <span className="text-brand-indigo font-bold bg-brand-indigo/10 px-2 py-0.5 rounded-full text-[8px]">98% Fit</span>
                  </div>
                  <div className="p-2.5 bg-white border border-slate-150 rounded-lg flex items-center justify-between">
                    <span className="font-semibold text-slate-800">2. Outreach & Terms</span>
                    <span className="text-brand-violet font-bold bg-brand-violet/10 px-2 py-0.5 rounded-full text-[8px]">In Review</span>
                  </div>
                  <div className="p-2.5 bg-white border border-slate-150 rounded-lg flex items-center justify-between">
                    <span className="font-semibold text-slate-800">3. Campaign Deployment</span>
                    <span className="text-brand-cyan font-bold bg-brand-cyan/10 px-2 py-0.5 rounded-full text-[8px]">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 9: AI-Powered Campaigns */}
            <div id="campaigns" ref={sectionRefs.campaigns} className="space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-brand-cyan"><FiZap size={16} /></span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
                  4 — AI-Powered Campaigns
                </h2>
              </div>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Leveraging machine learning optimization systems reduces the workload of manual ad placements. Autopilot audience targeting and programmatic bid refinements ensure maximum return on advertising spend. AI analyzes performance data in real-time, executing micro-optimizations that adjust targeting parameters to match changing customer behaviors instantly.
              </p>

              {/* Graphic Widget: AI Smart Optimization System */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm mt-4 space-y-4">
                <span className="text-[10px] text-slate-700 font-bold uppercase tracking-wider font-sans block pb-2 border-b border-slate-200/50">Programmatic Optimization Control</span>
                
                <div className="p-3.5 bg-white border border-slate-150 rounded-xl space-y-3 text-left">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-900">AI Bid Refinement</span>
                    <span className="text-xs text-brand-cyan font-semibold">Enabled</span>
                  </div>
                  <p className="text-[10px] text-slate-600 leading-normal">Smart machine learning algorithms optimized budget deployment by matching CTR thresholds across multi-channel campaigns automatically.</p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] font-bold text-slate-500 uppercase font-sans">
                    <span>Active Optimization</span>
                    <span className="text-brand-indigo flex items-center gap-1"><FiActivity className="animate-pulse" /> Live</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 10: Social Commerce Solutions */}
            <div id="solutions" ref={sectionRefs.solutions} className="space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-indigo/10 flex items-center justify-center text-brand-indigo"><FiShoppingBag size={16} /></span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
                  5 — Social Commerce Solutions
                </h2>
              </div>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Optimizing the entire customer discovery-to-purchase journey using modern platform extensions reduces transactional drop-off, providing high-performing shopping interfaces that raise customer conversion rates. By establishing native, secure, and intuitive in-app checkout funnels, social commerce solutions convert passive feed scrolling into immediate sales.
              </p>

              {/* Graphic Widget: Discovery-to-purchase funnel flow */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm mt-4 space-y-4">
                <span className="text-[10px] text-slate-700 font-bold uppercase tracking-wider font-sans block pb-2 border-b border-slate-200/50">Discovery-to-Purchase Funnel</span>
                
                <div className="space-y-2 font-sans">
                  {/* Funnel step 1 */}
                  <div className="p-3 bg-gradient-to-r from-brand-indigo to-brand-indigo/90 text-white rounded-lg flex justify-between items-center text-xs">
                    <span className="font-semibold">1. Feed Discovery</span>
                    <span className="font-bold">100% Scroll Rate</span>
                  </div>
                  {/* Funnel step 2 */}
                  <div className="p-3 bg-gradient-to-r from-brand-violet to-brand-violet/90 text-white rounded-lg flex justify-between items-center text-xs w-[85%]">
                    <span className="font-semibold">2. Product Click</span>
                    <span className="font-bold">85% View Rate</span>
                  </div>
                  {/* Funnel step 3 */}
                  <div className="p-3 bg-gradient-to-r from-brand-cyan to-brand-cyan/90 text-slate-900 rounded-lg flex justify-between items-center text-xs w-[60%]">
                    <span className="font-semibold">3. Seamless Checkout</span>
                    <span className="font-bold">60% Complete</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Highlight Insight Block */}
            <div className="p-8 rounded-3xl bg-gradient-to-tr from-brand-indigo/10 to-brand-violet/5 border border-slate-100/80 shadow-sm space-y-5 text-left my-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-[40px] pointer-events-none" />
              
              <span className="text-[10px] text-brand-indigo font-sans uppercase font-bold block tracking-widest">
                Final Insight
              </span>
              <p className="text-slate-900 text-base sm:text-lg font-sans leading-relaxed font-semibold">
                “The future of social media marketing is shaped by emerging technologies, evolving consumer behavior, and innovative engagement strategies.”
              </p>
              <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed border-t border-slate-200/60 pt-4">
                ✓ Balancing short-form video delivery, AI personalization filters, AR platforms, and native shopping engines guarantees sustainable online brand authority and high engagement. Marketers who master this integrated toolkit will forge authentic customer connections and scale sales exponentially.
              </p>
            </div>

            {/* Highlight quote box blocks */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm space-y-4 text-left my-8">
              <span className="text-[10px] text-brand-indigo font-sans uppercase font-bold block tracking-widest">
                Premium Highlight Quotes
              </span>
              <div className="space-y-4 font-heading font-bold text-sm text-slate-800">
                <p className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-brand-indigo shrink-0">“</span>
                  <span>Video content dominates social media.</span>
                </p>
                <p className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-brand-violet shrink-0">“</span>
                  <span>AI personalizes customer experiences.</span>
                </p>
                <p className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-brand-cyan shrink-0">“</span>
                  <span>Social commerce is transforming digital shopping.</span>
                </p>
                <p className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-brand-rose shrink-0">“</span>
                  <span>Influencer collaborations build authentic trust.</span>
                </p>
                <p className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-brand-indigo/80 shrink-0">“</span>
                  <span>AR creates immersive engagement.</span>
                </p>
              </div>
            </div>

            {/* COMMENTS SECTION ("Leave a Reply") */}
            <div className="pt-12 border-t border-slate-100 space-y-8 text-left">
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-2xl text-slate-900 font-sans tracking-tight">
                  Leave a Reply
                </h3>
                <p className="text-xs text-brand-label font-sans">
                  Your email address will not be published. Required fields are marked *
                </p>
              </div>

              {commentSubmitted && (
                <div className="p-4 rounded-xl bg-brand-emerald/10 border border-brand-emerald text-brand-emerald text-xs font-sans font-semibold">
                  ✓ Thank you! Your reply has been saved and is currently under review.
                </div>
              )}

              <form onSubmit={handleCommentSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 font-sans block">Comment *</label>
                  <textarea
                    rows={6}
                    placeholder="Enter your thoughts and comment details..."
                    value={commentForm.comment}
                    onChange={(e) => setCommentForm({ ...commentForm, comment: e.target.value })}
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo transition-all font-sans shadow-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 font-sans block">Name *</label>
                    <input
                      type="text"
                      placeholder="Name *"
                      value={commentForm.name}
                      onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                      className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo transition-all font-sans shadow-sm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 font-sans block">Email *</label>
                    <input
                      type="email"
                      placeholder="Email *"
                      value={commentForm.email}
                      onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                      className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo transition-all font-sans shadow-sm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 font-sans block">Website</label>
                    <input
                      type="url"
                      placeholder="Website"
                      value={commentForm.website}
                      onChange={(e) => setCommentForm({ ...commentForm, website: e.target.value })}
                      className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo transition-all font-sans shadow-sm"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-slate-600 font-sans">
                  <input
                    type="checkbox"
                    id="saveInfoCheckbox"
                    checked={commentForm.saveInfo}
                    onChange={(e) => setCommentForm({ ...commentForm, saveInfo: e.target.checked })}
                    className="rounded border-slate-200 text-brand-indigo focus:ring-brand-indigo mt-0.5"
                  />
                  <label htmlFor="saveInfoCheckbox" className="cursor-pointer leading-relaxed text-slate-600 select-none">
                    Save my name, email, and website in this browser for the next time I comment.
                  </label>
                </div>

                <button
                  type="submit"
                  className="px-8 py-4 rounded-full font-heading font-semibold text-xs text-white bg-brand-indigo hover:bg-brand-indigo/90 shadow-md transition-all flex items-center gap-2"
                >
                  <span>Submit Comment</span> <FiSend size={12} />
                </button>
              </form>

              {/* Comments list showcase */}
              {commentsList.length > 0 && (
                <div className="space-y-6 pt-8 border-t border-slate-100">
                  <h4 className="font-heading font-bold text-slate-800 text-lg">Comments ({commentsList.length})</h4>
                  <div className="space-y-4">
                    {commentsList.map((c, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-left space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-heading font-bold text-slate-850 font-sans">{c.name}</span>
                          <span className="text-brand-label">{c.date}</span>
                        </div>
                        <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">{c.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* 3. RIGHT COLUMN: Search, Categories & Recent Posts Sticky Sidebar */}
          <div className="lg:col-span-3 text-left">
            <div className="sticky top-28 space-y-8">
              
              {/* Search Widget */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100/60 shadow-[0_10px_35px_rgba(15,23,42,0.02)] space-y-3">
                <h3 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Search
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search blogs..."
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-indigo transition-all font-sans shadow-sm"
                  />
                  <FiSearch className="absolute left-3 top-3 text-brand-label" size={13} />
                </div>
              </div>

              {/* Sidebar Recent posts */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100/60 shadow-[0_10px_35px_rgba(15,23,42,0.02)] space-y-4">
                <h3 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-200/50 pb-2">
                  Recent Posts
                </h3>
                <div className="space-y-3.5">
                  {recentPosts.map((post, index) => (
                    <button 
                      key={index}
                      onClick={() => navigateTo(post.route)} 
                      className="w-full group text-left flex items-start gap-2.5 text-xs font-heading font-semibold text-slate-700 hover:text-brand-indigo transition-colors leading-relaxed"
                    >
                      <span className="text-brand-indigo mt-0.5">•</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">{post.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Info Strip */}
              <div className="p-5 rounded-2xl bg-gradient-to-tr from-brand-indigo/10 to-brand-violet/5 border border-slate-150 text-left space-y-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-brand-indigo block">Global Presence</span>
                <p className="text-[11px] text-slate-700 leading-normal">Igniting brand awareness, sales, and desire globally with operations in Warangal and Hyderabad.</p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* RELATED POSTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 border-t border-slate-100">
        <div className="space-y-2 mb-12">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            EXPLORE NEXT
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
            Related Blueprints
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((post, idx) => (
            <div
              key={idx}
              onClick={() => navigateTo(post.route)}
              className="p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_10px_35px_rgba(15,23,42,0.02)] hover:shadow-md hover:border-slate-200 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-brand-indigo uppercase tracking-wider bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">{post.badge}</span>
                <h3 className="font-heading font-bold text-slate-900 text-lg group-hover:text-brand-indigo transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
                  {post.desc}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end text-xs">
                <span className="text-brand-indigo font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore <FiArrowRight />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MULTI-UNIT HIGHLIGHT STRIP */}
      <section className="py-12 bg-white relative z-10 border-t border-b border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center space-y-1">
              <span className="text-xs font-heading font-black text-brand-indigo uppercase tracking-wider block">
                Corporate Core Expansion
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Strong global presence in Hyderabad strategically expanding businesses in digital markets.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center space-y-1">
              <span className="text-xs font-heading font-black text-brand-violet uppercase tracking-wider block">
                Brand Demand Ignite
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Igniting brand awareness, sales, and desire using programmatic campaign models.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND STORY STORYTELLING SECTION */}
      <section className="py-24 bg-slate-50/50 border-t border-b border-slate-100 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-indigo/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            OUR STORY
          </span>
          <p className="text-slate-900 text-lg sm:text-xl font-sans leading-relaxed max-w-3xl mx-auto font-medium">
            “TSquadron creates and defines brand identities, strategically expands businesses in digital markets, and ignites brand awareness, sales, and desire. With a strong global presence in Hyderabad, TSquadron’s expertise and passion fuel your brand’s remarkable digital journey.”
          </p>
        </div>
      </section>

      {/* HIGH-CONVERSION CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 text-center animate-fade-in">
        <div className="relative rounded-[32px] p-8 sm:p-16 bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-indigo/90 border border-white/10 overflow-hidden shadow-2xl">
          {/* Inner ambient glows */}
          <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white leading-tight font-sans">
              Ready To Grow Your Social Media Presence?
            </h2>
            <p className="text-indigo-100 font-sans text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Partner with TSquadron to create future-ready social media strategies powered by AI, creative content, influencer marketing, and customer-focused engagement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigateTo('contact')}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-semibold text-brand-indigo bg-white hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl text-xs sm:text-sm"
              >
                Schedule Consultation
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all text-xs sm:text-sm"
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
