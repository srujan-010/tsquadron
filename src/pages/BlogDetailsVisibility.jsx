import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiArrowRight, FiCheckCircle, FiTrendingUp, FiGlobe, FiShare2, 
  FiMousePointer, FiMail, FiShield, FiPlus, FiMinus, FiFileText, 
  FiCpu, FiActivity, FiUsers, FiAward, FiTarget, FiChevronRight, FiSearch,
  FiZap, FiBriefcase, FiBarChart2, FiPieChart, FiLayout, FiSmartphone, FiMonitor,
  FiShoppingBag, FiLayers, FiSettings, FiHeart, FiBookOpen, FiHome, FiMessageSquare,
  FiCheck, FiCalendar, FiUser, FiClock
} from 'react-icons/fi'

export default function BlogDetailsVisibility({ setActivePage }) {
  const [commentForm, setCommentForm] = useState({
    comment: '',
    name: '',
    email: '',
    website: '',
    saveInfo: false
  })
  const [commentsList, setCommentsList] = useState([])
  const [commentSubmitted, setCommentSubmitted] = useState(false)

  useEffect(() => {
    // [SEO Manager Override] document.title = "Types of Visibility in Digital Marketing | TSquadron"
    const metaDesc = document.querySelector('meta[name="description"]')
    const descText = "Learn about the different types of digital marketing visibility including SEO, social media, content marketing, influencer visibility, local search, and video marketing strategies."
    if (metaDesc) {
      metaDesc.setAttribute("content", descText)
    } else {
      const meta = document.createElement('meta')
      meta.name = "description"
      meta.content = descText
      document.getElementsByTagName('head')[0].appendChild(meta)
    }
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
    setCommentForm({ comment: '', name: '', email: '', website: '', saveInfo: false })
    setTimeout(() => setCommentSubmitted(false), 4000)
  }

  const navigateTo = (pageId) => {
    setActivePage(pageId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const tocItems = [
    { id: "exploring", label: "Exploring Digital Marketing Visibility" },
    { id: "what-is", label: "What is Visibility in Digital Marketing?" },
    { id: "search-engine", label: "Search Engine Visibility" },
    { id: "social-media", label: "Social Media Visibility" },
    { id: "influencer", label: "Influencer Visibility" },
    { id: "content-creation", label: "Visibility of Content Creation" },
    { id: "local-search", label: "Local Search Visibility" },
    { id: "video", label: "Video Visibility" },
    { id: "ultimate-guide", label: "Ultimate Guide to Maximize Visibility" },
    { id: "conversion", label: "User Conversion & Retention Strategies" }
  ]

  const relatedPosts = [
    {
      title: "The Impact of Online Reputation Management on SEO",
      route: "blog-details-reputation",
      desc: "A strong online reputation plays a major role in search engine optimization and customer trust.",
      glow: "from-brand-cyan/20 to-brand-indigo/10"
    },
    {
      title: "The Impact of UI/UX Design on User Engagement",
      route: "blog-details-uiux",
      desc: "UI/UX design significantly influences user engagement, usability, and digital experience quality.",
      glow: "from-brand-rose/20 to-brand-violet/10"
    },
    {
      title: "The Future of Email Marketing",
      route: "blog-details-email",
      desc: "Explore next-generation trends in automated email marketing workflows and personalization templates.",
      glow: "from-brand-emerald/20 to-brand-cyan/10"
    }
  ]

  return (
    <div className="relative pt-24 overflow-hidden">
      {/* Soft Pastel Background washes */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-brand-violet/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[800px] right-10 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-10">
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600 font-sans font-medium">
          <button onClick={() => navigateTo('home')} className="hover:text-brand-indigo transition-colors">Home</button>
          <FiChevronRight className="text-brand-label" size={14} />
          <button onClick={() => navigateTo('blog')} className="hover:text-brand-indigo transition-colors">Blog</button>
          <FiChevronRight className="text-brand-label" size={14} />
          <span className="text-slate-800 font-semibold truncate">Types of Visibility</span>
        </nav>
      </div>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 text-left">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/60 backdrop-blur-md">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans">
              Digital Marketing
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-6xl font-heading font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-5xl">
            Types of Visibility in Digital Marketing
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-600 font-sans border-b border-slate-100 pb-6">
            <span className="flex items-center gap-1.5"><FiCalendar /> May 28 2024</span>
            <span className="flex items-center gap-1.5"><FiUser /> By TSquadron</span>
            <span className="flex items-center gap-1.5"><FiClock /> 8 min read</span>
          </div>

          <p className="text-lg sm:text-xl text-slate-600 font-sans leading-relaxed max-w-4xl">
            Explore the different types of digital visibility and learn how businesses improve brand awareness, online reach, user engagement, and customer conversion through strategic digital marketing.
          </p>
        </div>
      </section>

      {/* ARTICLE INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 text-left">
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-premium max-w-4xl space-y-4">
          <p className="text-slate-700 text-lg font-sans font-medium leading-relaxed">
            “Digital marketing visibility refers to how often and how easily a brand can be seen online through search engines, social media platforms, websites, and digital channels.”
          </p>
          <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
            Deploying a multi-channel setup—incorporating organic SEO search layouts, pay-per-click PPC bidding campaigns, strategic social media marketing campaigns, high-converting content marketing funnels, and brand awareness programs—is the core engine that drives consistent website traffic, expands customer relationships, and increases total sales generation.
          </p>
        </div>
      </section>

      {/* MAIN CONTAINER: Sticky TOC on left, Content in center, Sidebar on right */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Sticky Table of Contents */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-28 p-6 rounded-2xl bg-white border border-slate-100 shadow-premium space-y-4">
              <h3 className="font-heading font-bold text-slate-900 text-sm uppercase tracking-wider">
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-xs font-sans text-slate-600 hover:text-brand-indigo transition-colors py-1 border-l-2 border-transparent hover:border-brand-indigo/40 pl-3"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Center Column: Detailed main article sections */}
          <div className="lg:col-span-6 space-y-16">
            
            {/* Section 1 */}
            <div id="exploring" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                Exploring Digital Marketing Visibility: Types, Impact on User Conversion, and Retention
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Online visibility defines a brand's capacity to command user mindshare. In a cluttered digital ecosystem, attracting high-intent customers requires positioning your services precisely where their search queries lead. By combining organic search visibility with social proof and structured customer retention strategies, businesses convert passing site visits into permanent consumer accounts.
              </p>
            </div>

            {/* Section 2 */}
            <div id="what-is" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                What is Visibility in Digital Marketing?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Visibility represents the dynamic sum of impressions and clicks your brand records across search engine indexes, active social networks, and authority web resources. Higher visibility builds immediate brand recognition, fuels long-term market growth, and keeps customers involved with your operational updates.
              </p>
            </div>

            {/* Section 3 */}
            <div id="search-engine" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                Search Engine Visibility
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Securing top SERP positions on Google, Bing, and Yahoo via comprehensive search engine optimization (SEO) is the single most valuable asset in modern digital marketing. Driving sustainable organic traffic requires optimizing your technical site structure, implementing structured metadata tags, and adhering to white-hat SEO best practices.
              </p>
              
              {/* Infographic card placeholder */}
              <div className="p-6 rounded-2xl bg-gradient-to-tr from-brand-indigo/10 to-brand-cyan/5 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-premium mt-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-brand-indigo font-sans uppercase font-bold block">SEO Analytics Preview</span>
                  <span className="text-base font-heading font-bold text-slate-900 block">Dynamic SERP CTR gains</span>
                </div>
                <div className="h-10 px-4 rounded-full bg-white flex items-center justify-center font-bold text-xs text-slate-700 shadow-sm border border-slate-200/40">
                  Organic Traffic: +240%
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div id="social-media" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                Social Media Visibility
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Maintaining a high-frequency presence on Facebook, Instagram, LinkedIn, and Twitter/X fosters daily customer interaction. Dynamic audience engagement templates and targeted social advertising campaigns build immediate brand awareness and maintain consistent communication channels.
              </p>
            </div>

            {/* Section 5 */}
            <div id="influencer" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                Influencer Visibility & Collaboration
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Strategic influencer partnerships and endorsed product reviews instantly transfer pre-existing community trust to your catalog. Co-created brand content drives substantial search volumes and increases consumer conversion rates.
              </p>
            </div>

            {/* Section 6 */}
            <div id="content-creation" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                Visibility of Content Creation
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Publishing informative blogs, instructional videos, targeted podcasts, and clear infographics positions your company as a trusted industry authority. A structured content distribution framework drives recurring referral traffic to your service pages.
              </p>
            </div>

            {/* Section 7 */}
            <div id="local-search" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                Local Search Visibility in Digital Marketing
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                For brick-and-mortar setups, maximizing local SEO is essential. Optimizing your Google Business profile, managing positive customer reviews, and listing accurate details across directories directs high-intent local foot traffic directly to your office doors in Warangal.
              </p>
            </div>

            {/* Section 8 */}
            <div id="video" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                Video Visibility: Engaging Audiences With Visual Content
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Leveraging visually rich platforms like YouTube and TikTok expands your reach to younger demographics. Creative storytelling videos generate strong brand recall and secure higher social sharing rates.
              </p>
            </div>

            {/* Section 9 */}
            <div id="ultimate-guide" className="space-y-6 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                The Ultimate Guide On How To Maximize Visibility In Digital Marketing
              </h2>
              <div className="grid grid-cols-1 gap-4">
                
                {/* Guide Card 1 */}
                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-premium flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center font-heading font-bold text-brand-indigo border border-slate-100 shrink-0">1</span>
                  <div className="space-y-1">
                    <h4 className="font-heading font-bold text-slate-800">Know Your Audience</h4>
                    <p className="text-slate-600 text-xs font-sans">Research visual search trends and catalog specific visitor pain points.</p>
                  </div>
                </div>

                {/* Guide Card 2 */}
                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-premium flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center font-heading font-bold text-brand-indigo border border-slate-100 shrink-0">2</span>
                  <div className="space-y-1">
                    <h4 className="font-heading font-bold text-slate-800">SEO Optimization</h4>
                    <p className="text-slate-600 text-xs font-sans">Maintain highly readable system markup, fast load speeds, and dense schema lists.</p>
                  </div>
                </div>

                {/* Guide Card 3 */}
                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-premium flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center font-heading font-bold text-brand-indigo border border-slate-100 shrink-0">3</span>
                  <div className="space-y-1">
                    <h4 className="font-heading font-bold text-slate-800">Great Content Creation</h4>
                    <p className="text-slate-600 text-xs font-sans">Draft comprehensive, high-value visual blueprints answering customer search intent.</p>
                  </div>
                </div>

                {/* Guide Card 4 */}
                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-premium flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center font-heading font-bold text-brand-indigo border border-slate-100 shrink-0">4</span>
                  <div className="space-y-1">
                    <h4 className="font-heading font-bold text-slate-800">Online Community Engagement</h4>
                    <p className="text-slate-600 text-xs font-sans">Moderate interactive discussion streams and answer review boards rapidly.</p>
                  </div>
                </div>

                {/* Guide Card 5 */}
                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-premium flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center font-heading font-bold text-brand-indigo border border-slate-100 shrink-0">5</span>
                  <div className="space-y-1">
                    <h4 className="font-heading font-bold text-slate-800">Mobile Responsiveness</h4>
                    <p className="text-slate-600 text-xs font-sans">Optimize visual spacing to appear clean on handheld viewport layouts.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Section 10 */}
            <div id="conversion" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                How Digital Visibility Transformed User Conversion And Retention Strategies
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Brand visibility directly influences trust. When searchers repeatedly discover your educational content during their purchase research, user friction is virtually eliminated. Combining high search ranking authority with customized social media campaigns fosters deep, long-term customer relationships and builds solid online trust.
              </p>
            </div>

            {/* Highlight quote box blocks */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100/60 shadow-premium space-y-4 text-left my-8">
              <span className="text-[10px] text-brand-indigo font-sans uppercase font-bold block">Refined Insights</span>
              <div className="space-y-3 font-heading font-bold text-sm text-slate-800">
                <p>“✓ Visibility is important in digital marketing.”</p>
                <p>“✓ Strong visibility improves customer trust.”</p>
                <p>“✓ Content creation is key to long-term visibility.”</p>
                <p>“✓ Digital visibility influences user conversion and retention.”</p>
              </div>
            </div>

            {/* COMMENTS SECTION ("Leave a Reply") */}
            <div className="pt-12 border-t border-slate-100 space-y-8">
              <h3 className="font-heading font-bold text-2xl text-slate-900">
                Leave a Reply
              </h3>
              <p className="text-xs text-brand-label font-sans">
                * Required fields are marked. Save my name, email, and website details.
              </p>

              {commentSubmitted && (
                <div className="p-4 rounded-xl bg-brand-emerald/10 border border-brand-emerald text-brand-emerald text-xs font-sans font-semibold">
                  ✓ Thank you! Your reply has been saved and is currently under review.
                </div>
              )}

              <form onSubmit={handleCommentSubmit} className="space-y-6">
                <div className="relative">
                  <textarea
                    rows={6}
                    placeholder="Enter your comment detail..."
                    value={commentForm.comment}
                    onChange={(e) => setCommentForm({ ...commentForm, comment: e.target.value })}
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-800 text-sm focus:outline-none focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo transition-all font-sans"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <input
                    type="text"
                    placeholder="Name *"
                    value={commentForm.name}
                    onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                    className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo transition-all font-sans"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={commentForm.email}
                    onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                    className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo transition-all font-sans"
                    required
                  />
                  <input
                    type="url"
                    placeholder="Website"
                    value={commentForm.website}
                    onChange={(e) => setCommentForm({ ...commentForm, website: e.target.value })}
                    className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo transition-all font-sans"
                  />
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600 font-sans">
                  <input
                    type="checkbox"
                    id="saveInfo"
                    checked={commentForm.saveInfo}
                    onChange={(e) => setCommentForm({ ...commentForm, saveInfo: e.target.checked })}
                    className="rounded border-slate-200 text-brand-indigo focus:ring-brand-indigo"
                  />
                  <label htmlFor="saveInfo" className="cursor-pointer">
                    Save my name, email, and website in this browser for the next time I comment.
                  </label>
                </div>

                <button
                  type="submit"
                  className="px-8 py-4 rounded-full font-heading font-semibold text-xs text-white bg-brand-indigo hover:bg-brand-indigo/90 shadow-md transition-all"
                >
                  Submit Comment
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
                          <span className="font-heading font-bold text-slate-800">{c.name}</span>
                          <span className="text-brand-label">{c.date}</span>
                        </div>
                        <p className="text-slate-600 text-xs font-sans leading-relaxed">{c.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Sticky Recent Posts Sidebar */}
          <div className="lg:col-span-3 text-left">
            <div className="sticky top-28 space-y-8">
              
              {/* Popular categories */}
              <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100 shadow-premium space-y-3">
                <h3 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Search
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-indigo transition-all font-sans"
                  />
                  <FiSearch className="absolute left-3 top-3 text-brand-label" size={12} />
                </div>
              </div>

              {/* Sidebar Recent posts */}
              <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100 shadow-premium space-y-4">
                <h3 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Recent Posts
                </h3>
                <div className="space-y-3">
                  <button onClick={() => navigateTo('blog-details-visibility')} className="text-xs font-heading font-semibold text-slate-700 hover:text-brand-indigo transition-colors block text-left leading-tight">
                    • Types of Visibility in Digital Marketing
                  </button>
                  <button onClick={() => navigateTo('blog-details-reputation')} className="text-xs font-heading font-semibold text-slate-700 hover:text-brand-indigo transition-colors block text-left leading-tight">
                    • The Impact of ORM on SEO
                  </button>
                  <button onClick={() => navigateTo('blog-details-uiux')} className="text-xs font-heading font-semibold text-slate-700 hover:text-brand-indigo transition-colors block text-left leading-tight">
                    • The Impact of UI/UX Design on Engagement
                  </button>
                  <button onClick={() => navigateTo('blog-details-email')} className="text-xs font-heading font-semibold text-slate-700 hover:text-brand-indigo transition-colors block text-left leading-tight">
                    • The Future of Email Marketing
                  </button>
                  <button onClick={() => navigateTo('blog-details-link')} className="text-xs font-heading font-semibold text-slate-700 hover:text-brand-indigo transition-colors block text-left leading-tight">
                    • Top 10 Link Building Strategies
                  </button>
                  <button onClick={() => navigateTo('blog-details-social')} className="text-xs font-heading font-semibold text-slate-700 hover:text-brand-indigo transition-colors block text-left leading-tight">
                    • Future of Social Media Marketing
                  </button>
                  <button onClick={() => navigateTo('blog-details-system')} className="text-xs font-heading font-semibold text-slate-700 hover:text-brand-indigo transition-colors block text-left leading-tight">
                    • Role of Design Systems in Web Dev
                  </button>
                  <button onClick={() => navigateTo('blog-details-fundamentals')} className="text-xs font-heading font-semibold text-slate-700 hover:text-brand-indigo transition-colors block text-left leading-tight">
                    • Fundamentals of UI/UX Design
                  </button>
                  <button onClick={() => navigateTo('blog-details-reputation-social')} className="text-xs font-heading font-semibold text-slate-700 hover:text-brand-indigo transition-colors block text-left leading-tight">
                    • Social Media in ORM
                  </button>
                  <button onClick={() => navigateTo('blog-details-email-ai')} className="text-xs font-heading font-semibold text-slate-700 hover:text-brand-indigo transition-colors block text-left leading-tight">
                    • AI in Email Marketing
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* RELATED POSTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 border-t border-slate-100 text-left">
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
              className="p-8 rounded-3xl bg-white border border-slate-100 shadow-premium hover:shadow-md hover:border-slate-200 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
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

      {/* SINGLE LINE CONTENT HIGHLIGHT BANNER */}
      <section className="py-12 bg-white relative z-10 border-t border-b border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-1">
              <span className="text-xs font-heading font-black text-brand-indigo uppercase tracking-wider block">
                Expand Globally
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Strong global presence in Warangal strategically expanding businesses in digital markets.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-1">
              <span className="text-xs font-heading font-black text-brand-violet uppercase tracking-wider block">
                Ignite Brand Demand
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Igniting brand awareness, sales, and desire using programmatic campaign models.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND STORY SECTION */}
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

      {/* FINAL HIGH-CONVERSION CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 text-center">
        <div className="relative rounded-[32px] p-8 sm:p-16 bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-indigo/90 border border-white/10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white leading-tight">
              Ready To Increase Your Digital Visibility?
            </h2>
            <p className="text-indigo-100 font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Partner with TSquadron to build powerful digital marketing strategies that improve visibility, increase engagement, and drive business growth.
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
                className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all"
              >
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Back To Top Floating button */}
      

    </div>
  )
}
