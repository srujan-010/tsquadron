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

export default function BlogDetailsEmail({ setActivePage }) {
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
    { id: "evolution", label: "The Evolution of Email Marketing" },
    { id: "companies", label: "Companies Leading the Charge" },
    { id: "interactive", label: "The Rise of Interactive Emails" },
    { id: "ai", label: "Artificial Intelligence in Email" },
    { id: "automation", label: "Automation & Behavioral Triggers" },
    { id: "security", label: "Data Security and Privacy" },
    { id: "predictive", label: "Unlocking Predictive Analytics" },
    { id: "personalization", label: "Hyper-Personalization" },
    { id: "mobile", label: "Mobile-First Email Experiences" },
    { id: "ecommerce", label: "Integration with E-commerce" }
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
          <span className="text-slate-800 font-semibold truncate">Future of Email Marketing</span>
        </nav>
      </div>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 text-left">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/60 backdrop-blur-md">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans">
              Email Marketing
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-6xl font-heading font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-5xl">
            The Future of Email Marketing
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-600 font-sans border-b border-slate-100 pb-6">
            <span className="flex items-center gap-1.5"><FiCalendar /> December 28 2023</span>
            <span className="flex items-center gap-1.5"><FiUser /> By TSquadron</span>
            <span className="flex items-center gap-1.5"><FiClock /> 10 min read</span>
          </div>

          <p className="text-lg sm:text-xl text-slate-600 font-sans leading-relaxed max-w-4xl">
            Explore how AI, automation, predictive analytics, personalization, and interactive experiences are transforming the future of email marketing.
          </p>
        </div>
      </section>

      {/* ARTICLE INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 text-left">
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-premium max-w-4xl space-y-4">
          <p className="text-slate-700 text-lg font-sans font-medium leading-relaxed">
            “In the ever-evolving landscape of digital marketing, email marketing continues to remain one of the most powerful tools for audience engagement and conversion.”
          </p>
          <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
            Transformations powered by AI, machine learning predictive models, customer segmentation layouts, and automated drip sequences represent the core triggers required to secure higher open rates, lower bounce rates, and consistent digital revenue channels.
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
            <div id="evolution" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                The Evolution of Email Marketing
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                The shift from plain text messages to visually beautiful templates has fundamentally changed customer communication models. Harnessing AI analytics, behavioral workflows, and deep machine learning segments permits true hyper-personalization, predicting buying choices before they even happen.
              </p>
              
              {/* Evolution preview chart */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-premium mt-4 space-y-3">
                <span className="text-[10px] text-brand-indigo font-sans uppercase font-bold block">AI Personalization Pipeline</span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-white rounded-lg border border-slate-100 font-semibold">1. Gather Data</div>
                  <div className="p-2 bg-white rounded-lg border border-slate-100 font-semibold">2. Analyze Behavior</div>
                  <div className="p-2 bg-white rounded-lg border border-slate-100 font-semibold">3. Send Hyper-Targeted</div>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div id="companies" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                Companies Leading the Charge
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                SaaS enterprise providers like **SendGrid** and **Mailchimp** are standardizing advanced automation features, audience segmentation models, automated campaigns, real-time campaign testing grids, and massive deliverability scalability.
              </p>
            </div>

            {/* Section 3 */}
            <div id="interactive" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                The Rise of Interactive Emails
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Deploying interactive elements such as image carousels, customer feedback forms, embedded mini quizzes, shopping carts, and dynamic templates via **Liveclicker** keeps subscribers highly involved. Providing friction-free user experiences inside the inbox prevents conversion drop-off.
              </p>
            </div>

            {/* Section 4 */}
            <div id="ai" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                Artificial Intelligence in Email Marketing
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Utilizing smart frameworks like **Phrasee** enables immediate, high-converting subject line generation and AI-driven content variations. Programmatic platforms leverage algorithmic send timing predictions, ensuring your newsletter hits the inbox at the exact millisecond when the user is most active.
              </p>
            </div>

            {/* Section 5 */}
            <div id="automation" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                Automation and Behavioral Triggers
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Modern tools like **ActiveCampaign** structure complex, multi-tiered behavioral trigger matrices and drip sequences that adjust naturally. If a customer ignores a message, clicks a link, or abandons a shopping cart, the system reacts immediately to nurture the buyer journey.
              </p>
            </div>

            {/* Section 6 */}
            <div id="security" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                Data Security and Privacy
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Meeting critical data compliance systems like **GDPR** and **CCPA** is vital to secure positive consumer trust. Standard providers like **Constant Contact** maintain strong compliance schemas, protecting consumer lists and guarding against data leaks.
              </p>
            </div>

            {/* Section 7 */}
            <div id="predictive" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                Unlocking the Potential of Predictive Analytics
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Predictive engines such as **SAS Customer Intelligence 360** analyze past transactional data to model future buying intents. Segmenting leads based on predictive lifetime value (LTV) or churn danger scores helps brands trigger high-ROI customer rescue campaigns.
              </p>
            </div>

            {/* Section 8 */}
            <div id="personalization" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                Personalization Beyond the First Name
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Real-time personalization frameworks like **Dynamic Yield** allow systems to populate emails dynamically. Displaying personalized item cards, nearby weather updates, or real-time catalog pricing elements improves email click-through metrics dramatically.
              </p>
            </div>

            {/* Section 9 */}
            <div id="mobile" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                Mobile-First Email Experiences
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                With a massive share of users opening newsletters on phones, validating responsive layouts via **Litmus** is critical. Writing concise, highly readable body copy and structuring large, clickable buttons secures frictionless mobile conversions.
              </p>
            </div>

            {/* Section 10 */}
            <div id="ecommerce" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                Integration with E-commerce Platforms
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Robust integrations combining **Klaviyo** with **Shopify** and **WooCommerce** power high-performing sequences. Cart abandonment reminders, automated receipts, post-purchase feedback loops, and customized discount codes keep e-commerce pipelines flowing smoothly.
              </p>
            </div>

            {/* Final Highlight Insight Block */}
            <div className="p-8 rounded-3xl bg-gradient-to-tr from-brand-indigo/10 to-brand-violet/5 border border-slate-100 shadow-premium space-y-4 text-left my-8">
              <span className="text-[10px] text-brand-indigo font-sans uppercase font-bold block">Final Insight</span>
              <p className="text-slate-700 text-base sm:text-lg font-sans leading-relaxed">
                “The future of email marketing is driven by continuous innovation, personalization, predictive analytics, automation, and seamless integration with emerging technologies.”
              </p>
              <p className="text-slate-600 text-xs font-sans">
                ✓ Connecting dynamic tools with verified subscriber compliance constructs guarantees maximum brand exposure, stronger authority, and long-term email marketing return on investment.
              </p>
            </div>

            {/* Highlight quote box blocks */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100/60 shadow-premium space-y-4 text-left my-8">
              <span className="text-[10px] text-brand-indigo font-sans uppercase font-bold block">Refined Insights</span>
              <div className="space-y-3 font-heading font-bold text-sm text-slate-800">
                <p>“✓ AI is transforming email marketing.”</p>
                <p>“✓ Personalization increases engagement.”</p>
                <p>“✓ Interactive emails improve user experience.”</p>
                <p>“✓ Automation creates smarter customer journeys.”</p>
                <p>“✓ Mobile-first experiences are essential.”</p>
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
              Ready To Modernize Your Email Marketing Strategy?
            </h2>
            <p className="text-indigo-100 font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Partner with TSquadron to create intelligent, personalized, and high-performing email marketing campaigns powered by modern technologies and customer-focused strategies.
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
