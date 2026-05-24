import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiArrowRight, FiCheckCircle, FiTrendingUp, FiGlobe, FiShare2, 
  FiMousePointer, FiMail, FiShield, FiPlus, FiMinus, FiFileText, 
  FiCpu, FiActivity, FiUsers, FiAward, FiTarget, FiChevronRight, FiSearch,
  FiZap, FiBriefcase, FiBarChart2, FiPieChart, FiLayout, FiSmartphone, FiMonitor,
  FiShoppingBag, FiLayers, FiSettings, FiHeart, FiBookOpen, FiHome, FiMessageSquare,
  FiCheck, FiCalendar, FiUser, FiClock, FiStar, FiAlertTriangle
} from 'react-icons/fi'

export default function BlogDetailsReputationSocial({ setActivePage }) {
  const [commentForm, setCommentForm] = useState({
    comment: '',
    name: '',
    email: '',
    website: '',
    saveInfo: false
  })
  const [commentsList, setCommentsList] = useState([])
  const [commentSubmitted, setCommentSubmitted] = useState(false)

  // Interactive Brand Sentiment Tracker simulation states
  const [sentimentScore, setSentimentScore] = useState(88)
  const [activeAlerts, setActiveAlerts] = useState(1)
  const [selectedScenario, setSelectedScenario] = useState('positive')

  useEffect(() => {
  }, [])

  const handleScenarioChange = (scenario) => {
    setSelectedScenario(scenario)
    if (scenario === 'positive') {
      setSentimentScore(94)
      setActiveAlerts(0)
    } else if (scenario === 'neutral') {
      setSentimentScore(72)
      setActiveAlerts(2)
    } else {
      setSentimentScore(41)
      setActiveAlerts(5)
    }
  }

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
    { id: "feedback", label: "1. Real-time Feedback & Engagement" },
    { id: "transparency", label: "2. Building Credibility & Transparency" },
    { id: "safeguarding", label: "3. ORM Companies & Services" },
    { id: "content", label: "4. Content Creation & Promotion" },
    { id: "monitoring", label: "5. Monitoring & Analysis" },
    { id: "strategic", label: "6. Strategic Engagement" },
    { id: "presence", label: "7. Active Presence on Key Platforms" },
    { id: "influencers", label: "8. Utilizing Influencers & Advocates" },
    { id: "crisis", label: "9. Crisis Management" },
    { id: "evolving", label: "10. Evolving Landscape of ORM" },
    { id: "storytelling", label: "11. Embracing Visual Storytelling" },
    { id: "data-analytics", label: "12. Utilizing Data Analytics" },
    { id: "negative", label: "13. Addressing Negative Feedback" },
    { id: "attacks", label: "14. Preventing Online Attacks" }
  ]

  const relatedPosts = [
    {
      title: "Types of Visibility in Digital Marketing",
      route: "blog-details-visibility",
      desc: "Digital marketing visibility is how many times and how easily a brand can be seen online across various digital channels.",
      glow: "from-brand-indigo/20 to-brand-violet/10"
    },
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
          <span className="text-slate-800 font-semibold truncate">Social Media in ORM</span>
        </nav>
      </div>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 text-left">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/60 backdrop-blur-md">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans">
              Online Reputation Management
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-6xl font-heading font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-5xl">
            The Role of Social Media in Online Reputation Management
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-600 font-sans border-b border-slate-100 pb-6">
            <span className="flex items-center gap-1.5"><FiCalendar /> December 21 2023</span>
            <span className="flex items-center gap-1.5"><FiUser /> By TSquadron</span>
            <span className="flex items-center gap-1.5"><FiClock /> 10 min read</span>
          </div>

          <p className="text-lg sm:text-xl text-slate-600 font-sans leading-relaxed max-w-4xl">
            Explore how social media influences online reputation management, customer trust, brand transparency, crisis management, and long-term digital credibility.
          </p>

          {/* Interactive Social Sentiment Simulation Dashboard */}
          <div className="mt-8 p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-premium grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-[10px] text-brand-indigo font-sans uppercase font-bold block">Interactive ORM Sentiment Dashboard</span>
              <h4 className="font-heading font-bold text-slate-800 text-lg">Simulate Live Social Scenarios</h4>
              <p className="text-xs text-slate-600 font-sans">
                Toggle below to analyze how different public scenarios (viral praise vs. negative feedback attacks) immediately impact digital sentiment markers.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'positive', label: '🌟 Viral Praise', color: 'border-emerald-200' },
                    { key: 'neutral', label: '💬 Mixed Feedback', color: 'border-amber-200' },
                    { key: 'negative', label: '⚠️ Smear Campaign', color: 'border-rose-200' }
                  ].map((s) => (
                    <button 
                      key={s.key}
                      onClick={() => handleScenarioChange(s.key)}
                      className={`text-[10px] py-2 px-3 rounded-xl border font-heading font-semibold transition-all ${ selectedScenario === s.key ? 'bg-brand-indigo text-white border-brand-indigo shadow-sm' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50' }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-100 space-y-2">
                  <span className="text-[10px] font-sans font-bold text-brand-label block">Current Counters</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-slate-600 block">Sentiment Score</span>
                      <span className={`text-xl font-heading font-black ${ sentimentScore > 80 ? 'text-brand-emerald' : sentimentScore > 60 ? 'text-amber-500' : 'text-rose-500' }`}>{sentimentScore}%</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-600 block">Threat Alerts</span>
                      <span className="text-xl font-heading font-black text-slate-800">{activeAlerts}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Live Analytics Monitor */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-premium space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-xs font-heading font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-indigo animate-pulse" />
                  Live Listening Monitor
                </span>
                <span className="text-[10px] text-brand-label font-sans">15s update rate</span>
              </div>

              <div className="space-y-3">
                {selectedScenario === 'positive' && (
                  <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100 space-y-1">
                    <span className="text-[10px] font-sans font-bold text-emerald-600">✓ Positive Mention Amplification</span>
                    <p className="text-[11px] font-sans text-slate-600">
                      "Absolutely loving the new UI platform designed by TSquadron. Our engagement scores scaled 4x overnight!"
                    </p>
                  </div>
                )}

                {selectedScenario === 'neutral' && (
                  <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-100 space-y-1">
                    <span className="text-[10px] font-sans font-bold text-amber-600">💬 System Alert - Address Immediately</span>
                    <p className="text-[11px] font-sans text-slate-600">
                      "The checkout works beautifully, but support responses are taking 2 hours. Hoping for a quick upgrade."
                    </p>
                  </div>
                )}

                {selectedScenario === 'negative' && (
                  <div className="p-3 rounded-lg bg-rose-50/50 border border-rose-100 space-y-1">
                    <span className="text-[10px] font-sans font-bold text-rose-600">⚠️ Crisis Mitigation Protocol Active</span>
                    <p className="text-[11px] font-sans text-slate-600">
                      "False claims of data leak spreading from a mock competitor account. Implementing safe response guidelines."
                    </p>
                  </div>
                )}

                <div className="pt-2 flex justify-between items-center text-[10px] text-brand-label font-sans">
                  <span>Mentions volume: 1,420/hr</span>
                  <span className="text-brand-indigo font-bold">Auto-Triage Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 text-left">
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-premium max-w-4xl space-y-4">
          <p className="text-slate-700 text-lg font-sans font-medium leading-relaxed">
            “In today’s digital age, where information spreads instantly, online reputation management has become essential for businesses and individuals.”
          </p>
          <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
            Unlocking social media influence ensures robust positive image management across channels. Counteracting brand reputation risks, mitigating user reviews, and neutralizing false misinformation are key requirements to secure long-term digital credibility and shape positive online perception.
          </p>
        </div>
      </section>

      {/* SECTION: THE POWER OF SOCIAL MEDIA IN SHAPING REPUTATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-slate-900 leading-tight">
              The Power of Social Media in Shaping Reputations
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
              With immediate global communication channels, social media reach holds enormous sway over public perceptions. While these ecosystems build powerful organic connection points, they also contain structural negative publicity risks:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-slate-600 text-sm font-sans">
                <FiCheckCircle className="text-brand-indigo mt-0.5 shrink-0" size={16} />
                <span><strong>Instant Review Mechanisms:</strong> A single customer review or false comment chain can go viral, significantly shaping corporate reputation indices.</span>
              </li>
              <li className="flex items-start gap-2.5 text-slate-600 text-sm font-sans">
                <FiCheckCircle className="text-brand-violet mt-0.5 shrink-0" size={16} />
                <span><strong>Amplified Misinformation:</strong> False claim campaigns distribute quickly, requiring robust crisis protocols and strategic ORM listening structures to safeguard your brand.</span>
              </li>
            </ul>
          </div>
          
          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-premium space-y-6">
              <h4 className="font-heading font-bold text-slate-800 text-sm">Crisis Resolution Velocity</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-brand-emerald flex items-center justify-center shrink-0">
                    <FiActivity size={14} />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-sans font-bold text-brand-label block">Proactive ORM (With Listening Tools)</span>
                    <span className="text-xs font-sans text-slate-700">Crisis Resolved in &lt; 30 minutes</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-brand-rose flex items-center justify-center shrink-0">
                    <FiAlertTriangle size={14} />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-sans font-bold text-brand-label block">Reactive ORM (No Monitoring tools)</span>
                    <span className="text-xs font-sans text-slate-700">Mitigation delayed over 48 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              <nav className="space-y-1.5 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
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
            <div id="feedback" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                1 — Real-time Feedback and Engagement
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Social media platforms act as direct lines to customer opinions. Responding to positive and negative customer reviews quickly builds trust and stops minor issues from turning into major public relations challenges.
              </p>
            </div>

            {/* Section 2 */}
            <div id="transparency" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                2 — Building Credibility through Transparency
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Authenticity is a key component of brand credibility. Sharing behind-the-scenes moments and engaging in open, transparent conversations with your audience builds customer trust and loyalty.
              </p>
            </div>

            {/* Section 3 */}
            <div id="safeguarding" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                3 — ORM Companies and Services: Safeguarding Reputations
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Professional reputation management services offer robust monitoring and active brand protection. Expert ORM strategies systematically protect your brand image, ensuring your digital assets remain strong and secure.
              </p>
            </div>

            {/* Section 4 */}
            <div id="content" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                4 — Content Creation and Promotion
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Publishing high-quality positive content on social media helps suppress unfavorable reviews and articles in search results. Strategically promoting brand stories improves visibility and highlights positive customer experiences.
              </p>
            </div>

            {/* Section 5 */}
            <div id="monitoring" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                5 — Monitoring and Analysis
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Social listening tools help track brand mentions and analyze customer sentiment in real time. Proactively monitoring online conversations allows teams to identify potential threats early and respond quickly.
              </p>
            </div>

            {/* Section 6 */}
            <div id="strategic" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                6 — Strategic Engagement
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Replying professionally to customer queries and feedback establishes your brand as attentive and reliable. Consistent, polite, and helpful engagement reinforces client relationships and prevents misunderstandings.
              </p>
            </div>

            {/* Section 7 */}
            <div id="presence" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                7 — Active Presence on Key Platforms
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Maintaining an active presence and posting regularly on channels where your target audience hangs out is essential. Consistent posting and active conversations help build a highly engaged, loyal, and supportive community.
              </p>
            </div>

            {/* Section 8 */}
            <div id="influencers" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                8 — Utilizing Influencers and Advocates
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Partnering with trusted influencers and active brand advocates helps share positive stories about your brand. Collaborating with creators increases organic reach and improves brand credibility.
              </p>
            </div>

            {/* Section 9 */}
            <div id="crisis" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                9 — Crisis Management
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Handling PR crises requires fast, transparent public communication. Addressing criticisms directly and sharing actionable solutions rebuilds customer trust and protects your brand's reputation.
              </p>
            </div>

            {/* Section 10 */}
            <div id="evolving" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                10 — The Evolving Landscape of Social Media for ORM
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Social media platforms and algorithms change constantly. Keeping your reputation management strategies updated and adapting to new digital channels ensures long-term reputation safety.
              </p>
            </div>

            {/* Section 11 */}
            <div id="storytelling" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                11 — Embracing Visual Storytelling
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Using visual content like infographics, stories, and videos makes your brand stories highly memorable. Visual communication increases engagement and builds stronger emotional connections with your audience.
              </p>
            </div>

            {/* Section 12 */}
            <div id="data-analytics" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                12 — Utilizing Data Analytics
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Analyzing audience metrics, sentiment data, and engagement trends is essential. Using data-driven insights helps optimize your ORM strategies and supports smart business decisions.
              </p>
            </div>

            {/* Section 13 */}
            <div id="negative" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                13 — Addressing Negative Feedback
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Treating criticism constructively and resolving customer complaints professionally is key. Turning negative experiences into positive solutions helps rebuild trust and demonstrates your dedication to customer care.
              </p>
            </div>

            {/* Section 14 */}
            <div id="attacks" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                14 — Preventing and Managing Online Attacks
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Smear campaigns and false statements require quick countermeasures. Implementing legal safety protocols and using targeted communication tools safeguards your brand against external digital threats.
              </p>
            </div>

            {/* FINAL INSIGHT SECTION */}
            <div className="p-8 rounded-3xl bg-gradient-to-tr from-brand-indigo/10 to-brand-violet/5 border border-slate-100 shadow-premium space-y-4 text-left my-8">
              <span className="text-[10px] text-brand-indigo font-sans uppercase font-bold block">Final Insight</span>
              <p className="text-slate-700 text-base sm:text-lg font-sans leading-relaxed">
                “Social media presents both challenges and opportunities for building and managing online reputations.”
              </p>
              <p className="text-slate-600 text-xs font-sans">
                ✓ Prioritizing transparent brand messaging, active public listening, and investing in professional ORM programs helps companies secure sustained trust and long-term digital success.
              </p>
            </div>

            {/* Highlight quote box blocks */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100/60 shadow-premium space-y-4 text-left my-8">
              <span className="text-[10px] text-brand-indigo font-sans uppercase font-bold block">Refined Insights</span>
              <div className="space-y-3 font-heading font-bold text-sm text-slate-800">
                <p>“✓ Transparency builds trust.”</p>
                <p>“✓ Social media shapes online reputations.”</p>
                <p>“✓ Real-time engagement strengthens credibility.”</p>
                <p>“✓ ORM protects brand identity.”</p>
                <p>“✓ Visual storytelling enhances reputation.”</p>
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
              
              {/* Search Box */}
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

      {/* SMALL SINGLE-LINE CONTENT HIGHLIGHT BANNER */}
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
              Ready To Strengthen Your Online Reputation?
            </h2>
            <p className="text-indigo-100 font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Partner with TSquadron to build trust, improve brand perception, and create strong digital reputations through strategic social media-driven ORM solutions.
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
