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

export default function BlogDetailsFundamentals({ setActivePage }) {
  const [commentForm, setCommentForm] = useState({
    comment: '',
    name: '',
    email: '',
    website: '',
    saveInfo: false
  })
  const [commentsList, setCommentsList] = useState([])
  const [commentSubmitted, setCommentSubmitted] = useState(false)

  // Interactive UI Demos States
  const [demoTheme, setDemoTheme] = useState('light')
  const [spacingValue, setSpacingValue] = useState(16)
  const [buttonRoundness, setButtonRoundness] = useState('rounded-xl')
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    // [SEO Manager Override] document.title = "The Fundamentals of UI/UX Design | TSquadron"
    const metaDesc = document.querySelector('meta[name="description"]')
    const descText = "Learn the fundamentals of UI/UX design including user-centered design, responsive design, usability, accessibility, prototyping, and visual hierarchy."
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
    { id: "ucd", label: "1. User-Centered Design" },
    { id: "consistency", label: "2. Consistency" },
    { id: "simplicity", label: "3. Simplicity" },
    { id: "navigation", label: "4. Navigation" },
    { id: "responsive", label: "5. Responsive Design" },
    { id: "visual", label: "6. Visual Hierarchy" },
    { id: "feedback", label: "7. Feedback & Interactivity" },
    { id: "wireframing", label: "8. Wireframing & Prototyping" },
    { id: "research", label: "9. User Research & Testing" },
    { id: "visual-design", label: "10. Visual Design" },
    { id: "usability", label: "11. Usability Testing" },
    { id: "ia", label: "12. Information Architecture" },
    { id: "accessibility", label: "13. Accessibility Design" },
    { id: "iterative", label: "14. Prototyping & Iteration" }
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
          <span className="text-slate-800 font-semibold truncate">Fundamentals of UI/UX Design</span>
        </nav>
      </div>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 text-left">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/60 backdrop-blur-md">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans">
              UI/UX Design
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-6xl font-heading font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-5xl">
            The Fundamentals of UI/UX Design
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-600 font-sans border-b border-slate-100 pb-6">
            <span className="flex items-center gap-1.5"><FiCalendar /> December 22 2023</span>
            <span className="flex items-center gap-1.5"><FiUser /> By TSquadron</span>
            <span className="flex items-center gap-1.5"><FiClock /> 10 min read</span>
          </div>

          <p className="text-lg sm:text-xl text-slate-600 font-sans leading-relaxed max-w-4xl">
            Explore the core principles of UI/UX design including usability, accessibility, responsive design, visual hierarchy, user research, and interaction design.
          </p>

          {/* Interactive Mobile & Design System Mockups */}
          <div className="mt-8 p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-premium grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-[10px] text-brand-indigo font-sans uppercase font-bold block">Interactive Design System Visualizer</span>
              <h4 className="font-heading font-bold text-slate-800 text-lg">Tune UI parameters in real-time</h4>
              <p className="text-xs text-slate-600 font-sans">
                Adjust the widgets on the right to see how spacing, rounded corners, and background modes immediately transform interface aesthetics.
              </p>
              
              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-xs text-slate-600 font-sans flex justify-between">
                    <span>Card Padding ({spacingValue}px)</span>
                    <span className="font-bold">{spacingValue}px</span>
                  </label>
                  <input 
                    type="range" min="8" max="32" step="4" 
                    value={spacingValue} 
                    onChange={(e) => setSpacingValue(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-indigo"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-600 font-sans block mb-1">Button Roundness</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['rounded-none', 'rounded-xl', 'rounded-full'].map((r) => (
                      <button 
                        key={r}
                        onClick={() => setButtonRoundness(r)}
                        className={`text-[10px] py-1.5 px-3 rounded-lg border font-heading font-semibold transition-all ${ buttonRoundness === r ? 'bg-brand-indigo text-white border-brand-indigo' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50' }`}
                      >
                        {r === 'rounded-none' ? 'Sharp' : r === 'rounded-xl' ? 'Slight' : 'Fully Round'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-600 font-sans block mb-1">Theme Preview</label>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setDemoTheme('light')} 
                      className={`text-xs py-1.5 px-4 rounded-full border transition-all ${ demoTheme === 'light' ? 'bg-white border-brand-indigo text-brand-indigo font-bold' : 'text-slate-600 border-transparent' }`}
                    >
                      ☀ Light Mode
                    </button>
                    <button 
                      onClick={() => setDemoTheme('dark')} 
                      className={`text-xs py-1.5 px-4 rounded-full border transition-all ${ demoTheme === 'dark' ? 'bg-slate-900 border-slate-800 text-white font-bold' : 'text-slate-600 border-transparent' }`}
                    >
                      🌙 Dark Mode
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic UI Render Preview */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 ${ demoTheme === 'light' ? 'bg-white border-slate-100 shadow-premium' : 'bg-slate-950 border-slate-900 text-white shadow-2xl' }`} style={{ padding: `${spacingValue}px` }}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-indigo to-brand-violet flex items-center justify-center text-white font-bold text-xs">
                    TS
                  </div>
                  <div>
                    <h5 className={`text-sm font-heading font-bold ${demoTheme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
                      Creative Dashboard
                    </h5>
                    <span className="text-[10px] text-brand-label font-sans">Active User Research Panel</span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl ${demoTheme === 'light' ? 'bg-slate-50' : 'bg-slate-900/60'} border ${demoTheme === 'light' ? 'border-slate-100' : 'border-slate-800'}`}>
                  <p className="text-xs font-sans text-brand-label leading-normal">
                    Wireframe previews and user-centered interaction design systems scale overall team delivery speeds by 42%.
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] text-brand-label font-sans">Updated Just Now</span>
                  <button className={`px-4 py-2 text-[10px] font-heading font-bold text-white bg-brand-indigo hover:bg-brand-indigo/90 shadow-md transition-all ${buttonRoundness}`}>
                    Launch Component
                  </button>
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
            “In today’s evolving digital ecosystem, UI and UX design play a critical role in shaping engaging and memorable digital experiences.”
          </p>
          <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
            Unlocking user expectations means developing high-performing, tailored systems. Modern digital products demand clean strategic design rather than simple aesthetic wrappers to maximize brand online presence and trigger sustained user engagement.
          </p>
        </div>
      </section>

      {/* SECTION: UNDERSTANDING UI AND UX DESIGN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-slate-900 leading-tight">
              Understanding UI and UX Design
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
              While commonly used interchangeably, User Interface (UI) and User Experience (UX) represent distinct layers of digital product strategy:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-slate-600 text-sm font-sans">
                <FiCheckCircle className="text-brand-indigo mt-0.5 shrink-0" size={16} />
                <span><strong>UI focuses on visual elements:</strong> Page layout architectures, unified color schemes, modern typography, grid alignment, and highly responsive interactive components.</span>
              </li>
              <li className="flex items-start gap-2.5 text-slate-600 text-sm font-sans">
                <FiCheckCircle className="text-brand-violet mt-0.5 shrink-0" size={16} />
                <span><strong>UX optimizes usability:</strong> Fluid accessibility pathways, user research mapping, and emotional connections that make the user's digital journey painless.</span>
              </li>
            </ul>
          </div>
          
          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-premium space-y-6">
              <h4 className="font-heading font-bold text-slate-800 text-sm">UI vs UX Core Alignment</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-indigo/10 text-brand-indigo flex items-center justify-center shrink-0">
                    <FiLayout size={14} />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-sans font-bold text-brand-label block">User Interface (UI)</span>
                    <span className="text-xs font-sans text-slate-700">Typography, Buttons, Panels, Motion States</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-violet/10 text-brand-violet flex items-center justify-center shrink-0">
                    <FiUsers size={14} />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-sans font-bold text-brand-label block">User Experience (UX)</span>
                    <span className="text-xs font-sans text-slate-700">Wireframes, Personas, Usability Tests, Flowcharts</span>
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
            <div id="ucd" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                1 — User-Centered Design (UCD)
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                UCD establishes an absolute focus on end-user needs, personal preferences, and behavioral research. Prioritizing custom interactive structures rather than generic UI wrappers delivers tailored digital experiences.
              </p>
              
              {/* Persona mini widget */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 mt-4 space-y-4">
                <span className="text-[10px] text-brand-indigo font-sans uppercase font-bold block">User Persona Visualizer</span>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-indigo/20 flex items-center justify-center text-brand-indigo font-bold text-sm">
                    UX
                  </div>
                  <div>
                    <h5 className="text-xs font-heading font-bold text-slate-800">Persona Profile: Active Tech Professional</h5>
                    <p className="text-[10px] text-brand-label font-sans">Goal: Complete checkouts in under 3 taps</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-[10px] text-slate-600 font-sans">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-100">
                    <span className="font-bold text-brand-indigo block mb-1">Pain Point</span>
                    Multi-level form steps
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-100">
                    <span className="font-bold text-brand-indigo block mb-1">Design Fix</span>
                    Autofill & single-page checkout
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div id="consistency" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                2 — Consistency
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Adopting a unified, consistent design language across layout architectures, typefaces, buttons, and component frameworks creates immediate user familiarity. Consistent patterns reinforce user trust and ensure navigation remains highly intuitive.
              </p>
              
              {/* Consistency Visualizer */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 mt-4">
                <span className="text-[10px] text-brand-violet font-sans uppercase font-bold block mb-3">UI Token Consistency Example</span>
                <div className="flex flex-wrap gap-4 items-center">
                  <button className="px-4 py-2 text-xs font-heading font-semibold text-white bg-brand-indigo rounded-xl shadow-sm">
                    Primary Button
                  </button>
                  <button className="px-4 py-2 text-xs font-heading font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl">
                    Secondary Button
                  </button>
                  <button className="px-4 py-2 text-xs font-heading font-semibold text-brand-indigo bg-brand-indigo/10 rounded-xl">
                    Alternative Button
                  </button>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div id="simplicity" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                3 — Simplicity
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Developing clean minimalist interfaces, stripping away unnecessary visual clutter, and maximizing whitespace creates better usability. Prioritizing layout clarity guarantees immediate user satisfaction.
              </p>
            </div>

            {/* Section 4 */}
            <div id="navigation" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                4 — Navigation
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Structuring clean logical navigation, breadcrumb systems, and user flows reduces online frustration. Giving users simple pathways to discover information boosts session conversion metrics.
              </p>
            </div>

            {/* Section 5 */}
            <div id="responsive" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                5 — Responsive Design
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Adapting fluid layouts seamlessly across mobile, tablet, and desktop monitors ensures cross-device consistency. Excellent mobile optimization handles changing screen viewports without visual degradation.
              </p>
            </div>

            {/* Section 6 */}
            <div id="visual" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                6 — Visual Hierarchy
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Utilizing contrast scaling, variable font sizes, and structural color prioritization guides user attention to critical page elements. Creating defined hierarchy triggers immediate action.
              </p>
            </div>

            {/* Section 7 */}
            <div id="feedback" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                7 — Feedback and Interactivity
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                Integrating lively interactive components, micro-animations, and hover states signals system responsiveness. Interactive feedback systems build pleasant, memorable client journeys.
              </p>
            </div>

            {/* SECTION: UI/UX DESIGNING SERVICES */}
            <div className="pt-12 border-t border-slate-100 space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
                  SERVICE SUITE
                </span>
                <h3 className="font-heading font-bold text-3xl text-slate-900">
                  UI/UX Designing Services
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-xl">
                  Discover how our comprehensive design capabilities turn complex operational requirements into fluid interfaces.
                </p>
              </div>

              {/* Subsection 1 */}
              <div id="wireframing" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-premium space-y-4 scroll-mt-28">
                <span className="text-[10px] text-brand-indigo font-sans uppercase font-bold block">01 / Structural Blueprinting</span>
                <h4 className="font-heading font-bold text-slate-800 text-xl">Wireframing and Prototyping</h4>
                <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
                  Drafting high-fidelity wireframes and functional interactive prototypes visualizes end-product requirements, planning development cycles before coding begins.
                </p>
              </div>

              {/* Subsection 2 */}
              <div id="research" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-premium space-y-4 scroll-mt-28">
                <span className="text-[10px] text-brand-violet font-sans uppercase font-bold block">02 / Deep Diagnostics</span>
                <h4 className="font-heading font-bold text-slate-800 text-xl">User Research and Testing</h4>
                <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
                  Analyzing real-world user behaviors, diagnostic session recordings, and core friction points guarantees every design decision is backed by solid empirical data.
                </p>
              </div>

              {/* Subsection 3 */}
              <div id="visual-design" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-premium space-y-4 scroll-mt-28">
                <span className="text-[10px] text-brand-cyan font-sans uppercase font-bold block">03 / Artistry & Brand Systems</span>
                <h4 className="font-heading font-bold text-slate-800 text-xl">Visual Design</h4>
                <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
                  Blending balanced color theory, modern typography layouts, and sleek imagery systems creates powerful brand messaging and builds memorable company identities.
                </p>
              </div>

              {/* Subsection 4 */}
              <div id="usability" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-premium space-y-4 scroll-mt-28">
                <span className="text-[10px] text-brand-rose font-sans uppercase font-bold block">04 / Performance Validation</span>
                <h4 className="font-heading font-bold text-slate-800 text-xl">Usability Testing</h4>
                <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
                  Analyzing user feedback loops and diagnostic metrics validates interface quality, ensuring continuous iterative improvement.
                </p>
              </div>

              {/* Subsection 5 */}
              <div id="ia" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-premium space-y-4 scroll-mt-28">
                <span className="text-[10px] text-brand-indigo font-sans uppercase font-bold block">05 / Taxonomy & Navigation Map</span>
                <h4 className="font-heading font-bold text-slate-800 text-xl">Information Architecture</h4>
                <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
                  Structuring sitemaps and content taxonomy maps guides users to target content paths smoothly and quickly.
                </p>
              </div>

              {/* Subsection 6 */}
              <div id="accessibility" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-premium space-y-4 scroll-mt-28">
                <span className="text-[10px] text-brand-violet font-sans uppercase font-bold block">06 / Universal Inclusion</span>
                <h4 className="font-heading font-bold text-slate-800 text-xl">Accessibility Design</h4>
                <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
                  Building inclusive, WCAG compliant contrast standards, alt-tag architectures, and fluid screen reader pathways allows everyone to interact with your brand.
                </p>
              </div>

              {/* Subsection 7 */}
              <div id="iterative" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-premium space-y-4 scroll-mt-28">
                <span className="text-[10px] text-brand-cyan font-sans uppercase font-bold block">07 / Constant Optimization</span>
                <h4 className="font-heading font-bold text-slate-800 text-xl">Prototyping and Iterative Design</h4>
                <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
                  Iterating design systems continuously against changing market scenarios and technological advancements keeps digital platforms highly competitive.
                </p>
              </div>
            </div>

            {/* FINAL INSIGHT SECTION */}
            <div className="p-8 rounded-3xl bg-gradient-to-tr from-brand-indigo/10 to-brand-violet/5 border border-slate-100 shadow-premium space-y-4 text-left my-8">
              <span className="text-[10px] text-brand-indigo font-sans uppercase font-bold block">Final Insight</span>
              <p className="text-slate-700 text-base sm:text-lg font-sans leading-relaxed">
                “Mastering the fundamentals of UI/UX design is essential for delivering engaging, user-focused, and memorable digital experiences.”
              </p>
              <p className="text-slate-600 text-xs font-sans">
                ✓ Prioritizing user-centered design, consistency, and responsive layouts inside digital products ensures maximum customer satisfaction and triggers sustainable online success in a competitive market.
              </p>
            </div>

            {/* Highlight quote box blocks */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100/60 shadow-premium space-y-4 text-left my-8">
              <span className="text-[10px] text-brand-indigo font-sans uppercase font-bold block">Refined Insights</span>
              <div className="space-y-3 font-heading font-bold text-sm text-slate-800">
                <p>“✓ User-centered design improves engagement.”</p>
                <p>“✓ Responsive design enhances accessibility.”</p>
                <p>“✓ Consistency creates familiarity.”</p>
                <p>“Logically, good UI/UX builds memorable experiences.”</p>
                <p>“✓ Simplicity improves usability.”</p>
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
              Ready To Create Better Digital Experiences?
            </h2>
            <p className="text-indigo-100 font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Partner with TSquadron to build intuitive, visually engaging, and user-focused digital experiences powered by modern UI/UX design strategies.
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
