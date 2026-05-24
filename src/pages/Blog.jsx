import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiSearch, FiCalendar, FiUser, FiClock, FiX, FiArrowRight, 
  FiChevronRight, FiChevronLeft, FiHeart, FiShare2, FiBookmark,
  FiZap, FiAward, FiActivity, FiGlobe, FiLayers, FiCpu, FiTrendingUp
} from 'react-icons/fi'
import visibilityImg from '../assets/visibility.png'
import reputationImg from '../assets/reputation.png'
import uiuxImg from '../assets/uiux.png'
import emailImg from '../assets/email.png'

import { db } from '../lib/db'

export default function Blog({ setActivePage }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedPost, setSelectedPost] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const blogGridRef = useRef(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    setPosts(db.getBlogs())
  }, [])

  const getPostImage = (post) => {
    if (post.id === 1) return visibilityImg
    if (post.id === 2) return reputationImg
    if (post.id === 3) return uiuxImg
    if (post.id === 4) return emailImg
    return post.image || null
  }

  const categories = [
    'All', 
    'Digital Marketing', 
    'SEO', 
    'Social Media Marketing', 
    'Email Marketing', 
    'ORM', 
    'UI/UX', 
    'Web Development'
  ]

  // Filter posts by Category AND Search Input
  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Pagination bounds: 4 items per page
  const itemsPerPage = 4
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage)
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum)
    if (blogGridRef.current) {
      const topOffset = blogGridRef.current.getBoundingClientRect().top + window.scrollY - 120
      // Intelligent offset detection: bypass scrolling if already close to the grid area
      if (Math.abs(window.scrollY - topOffset) > 50) {
        window.scrollTo({
          top: topOffset,
          behavior: 'smooth'
        })
      }
    }
  }

  const handlePostClick = (post) => {
    if (post.id === 1 && setActivePage) {
      setActivePage('blog-details-visibility')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (post.id === 2 && setActivePage) {
      setActivePage('blog-details-reputation')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (post.id === 3 && setActivePage) {
      setActivePage('blog-details-uiux')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (post.id === 4 && setActivePage) {
      setActivePage('blog-details-email')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (post.id === 5 && setActivePage) {
      setActivePage('blog-details-link')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (post.id === 6 && setActivePage) {
      setActivePage('blog-details-social')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (post.id === 7 && setActivePage) {
      setActivePage('blog-details-system')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (post.id === 8 && setActivePage) {
      setActivePage('blog-details-fundamentals')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (post.id === 9 && setActivePage) {
      setActivePage('blog-details-reputation-social')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (post.id === 10 && setActivePage) {
      setActivePage('blog-details-email-ai')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setSelectedPost(post)
    }
  }

  const bentoInsights = [
    { title: "SEO Strategies", desc: "Command top organic Google placements with entity mapping.", icon: <FiTrendingUp className="text-brand-indigo" size={20} /> },
    { title: "Social Media Marketing", desc: "Build viral video formats that lower user acquisition costs.", icon: <FiShare2 className="text-brand-violet" size={20} /> },
    { title: "UI/UX Trends", desc: "Sleek layouts and elegant typography to scale conversions.", icon: <FiLayers className="text-brand-cyan" size={20} /> },
    { title: "Email Marketing", desc: "Automate behavioral email sequences for consistent revenue.", icon: <FiZap className="text-brand-rose" size={20} /> },
    { title: "Online Reputation Management", desc: "Manage online reviews to secure positive client trust.", icon: <FiAward className="text-brand-emerald" size={20} /> },
    { title: "Web Development", desc: "Fast headless page speeds optimized for Google Core Web Vitals.", icon: <FiCpu className="text-brand-indigo" size={20} /> }
  ]

  return (
    <div className="relative pt-24 overflow-hidden">
      {/* Soft Pastel Background Plate Glows */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-brand-violet/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[900px] right-10 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Hero copy */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/60 backdrop-blur-md">
              <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans">
                TSquadron Insights & Resources
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Digital Marketing <br />
              <span className="bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-cyan bg-clip-text text-transparent">
                Insights, Trends & Strategies
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-sans leading-relaxed max-w-3xl">
              Explore expert insights, digital marketing strategies, SEO techniques, UI/UX trends, social media updates, and growth-focused content designed to help businesses succeed online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#articles-list"
                className="px-8 py-4 rounded-full font-heading font-semibold text-white bg-brand-indigo hover:bg-brand-indigo/90 shadow-lg text-center transition-all"
              >
                Explore Articles
              </a>
              <a
                href="#contact-cta"
                className="px-8 py-4 rounded-full font-heading font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/60 text-center transition-all"
              >
                Contact Us
              </a>
            </div>
            {/* Small trust line */}
            <p className="text-xs text-brand-label font-sans tracking-wide">
              ✓ Helping businesses stay ahead with modern digital insights and marketing expertise.
            </p>
          </div>

          {/* Right Hero visualization panels */}
          <div className="lg:col-span-4 relative hidden lg:flex justify-center">
            <div className="w-full max-w-[340px] aspect-square rounded-3xl p-6 bg-white border border-slate-100 shadow-premium relative overflow-hidden space-y-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-indigo/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-heading font-bold text-slate-800">Content Performance</span>
                <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-2 w-3/4 bg-slate-100 rounded" />
                <div className="h-2 w-full bg-slate-100 rounded" />
                <div className="h-2 w-1/2 bg-slate-100 rounded" />
              </div>
              <div className="pt-4 flex items-center justify-between text-xs text-slate-600 font-sans">
                <span>Impressions</span>
                <span className="font-bold text-brand-indigo font-sans">+185.3%</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. FEATURED ARTICLE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 border-t border-slate-100">
        <div className="max-w-3xl space-y-2 mb-12 text-left">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            FEATURED SELECTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
            Latest Featured Editorials
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {posts.filter(p => p.featured).map((post) => (
            <div
              key={post.id}
              onClick={() => handlePostClick(post)}
              className="p-8 rounded-3xl bg-white border border-slate-100 shadow-premium hover:shadow-md hover:border-slate-200 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6 text-left group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="px-3.5 py-1 py-1.5 rounded-full bg-brand-indigo/5 text-brand-indigo font-bold tracking-wider uppercase text-[10px]">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 font-sans">{post.date}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-brand-indigo transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-sm font-sans leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-brand-label font-sans">By {post.author}</span>
                <span className="text-brand-indigo font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article <FiArrowRight />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SEARCH, FILTERS & MAIN ARTICLE CONTAINER SECTION */}
      <section id="articles-list" ref={blogGridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 border-t border-slate-100">
        
        {/* Category filter bar */}
        <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-slate-100 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat)
                setCurrentPage(1)
              }}
              className={`px-5 py-2.5 rounded-full font-heading font-semibold text-xs tracking-wide transition-all duration-300 ${ activeCategory === cat ? 'bg-brand-indigo text-white shadow-md shadow-brand-indigo/10' : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/50' }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Grid: Articles on left (70%), sidebar on right (30%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Grid articles (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-12">
            {paginatedPosts.length === 0 ? (
              <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl p-8 shadow-premium">
                <span className="text-lg text-slate-600 font-sans block mb-2">No matching growth articles found.</span>
                <span className="text-xs text-brand-label">Try adjusting your filters or search criteria.</span>
              </div>
            ) : (
              <div className="relative min-h-[600px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage + '-' + activeCategory + '-' + searchTerm}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    {paginatedPosts.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => handlePostClick(post)}
                        className="flex flex-col h-full rounded-3xl border border-slate-100 bg-white hover:border-brand-indigo/20 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer shadow-premium hover:shadow-md group text-left p-6 space-y-4"
                      >
                        {/* Premium Visual Image Slot based on Category */}
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-50 border border-slate-100/80 flex items-center justify-center group-hover:border-brand-indigo/30 transition-all duration-300">
                          {getPostImage(post) ? (
                            <div className="absolute inset-0 w-full h-full overflow-hidden">
                              <img
                                src={getPostImage(post)}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              {/* subtle overlay gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />
                              
                              {/* soft blue glow / overlay */}
                              <div className="absolute inset-0 bg-brand-indigo/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-screen" />
                              <div className="absolute inset-0 shadow-[inset_0_0_24px_rgba(22,60,140,0.2)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </div>
                          ) : (
                            <>
                              {/* Modern gradient scale overlay */}
                              <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo/5 via-transparent to-brand-violet/5 group-hover:scale-105 transition-transform duration-500" />
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-brand-indigo/10 via-brand-violet/5 to-transparent transition-opacity duration-300" />
                              
                              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100/50 flex items-center justify-center shadow-sm relative z-10 group-hover:-translate-y-1 transition-transform duration-300">
                                {post.category === 'SEO' && <FiTrendingUp className="text-brand-indigo" size={24} />}
                                {post.category === 'Social Media Marketing' && <FiShare2 className="text-brand-violet" size={24} />}
                                {post.category === 'UI/UX' && <FiLayers className="text-brand-cyan" size={24} />}
                                {post.category === 'Email Marketing' && <FiZap className="text-brand-rose" size={24} />}
                                {post.category === 'ORM' && <FiAward className="text-brand-emerald" size={24} />}
                                {post.category === 'Web Development' && <FiCpu className="text-brand-indigo" size={24} />}
                                {post.category === 'Digital Marketing' && <FiGlobe className="text-brand-indigo" size={24} />}
                              </div>
                            </>
                          )}
                        </div>

                        {/* Content area with flex-grow to ensure absolute equal heights */}
                        <div className="flex flex-col justify-between flex-grow space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs text-slate-600">
                              <span className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
                                {post.category}
                              </span>
                              <span className="flex items-center gap-1 font-sans">{post.date}</span>
                            </div>
                            <h3 className="text-lg font-heading font-bold text-slate-900 group-hover:text-brand-indigo transition-colors duration-300 leading-tight">
                              {post.title}
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
                              {post.excerpt}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                            <span className="text-brand-label font-sans">By {post.author}</span>
                            <span className="text-brand-indigo font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              Read More <FiArrowRight />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {/* Pagination Controls with Gradient highlights */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-8">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 bg-white hover:border-brand-indigo hover:text-brand-indigo disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-brand-label text-slate-600 transition-all duration-300"
                >
                  <FiChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-full font-heading font-bold text-xs transition-all duration-300 relative ${ currentPage === pageNum ? 'bg-gradient-to-tr from-brand-indigo to-brand-violet text-white shadow-md shadow-brand-indigo/20' : 'border border-slate-200 bg-white hover:border-brand-indigo hover:text-brand-indigo text-slate-600' }`}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 bg-white hover:border-brand-indigo hover:text-brand-indigo disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-brand-label text-slate-600 transition-all duration-300"
                >
                  <FiChevronRight size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Sidebar (lg:col-span-4) */}
          <div className="lg:col-span-4 text-left lg:sticky lg:top-24 space-y-8">
            
            {/* Search Box inside Sidebar */}
            <div className="p-6 rounded-3xl bg-slate-50/60 border border-slate-100 shadow-premium space-y-3">
              <h3 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider">
                Search Articles
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search growth articles..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo transition-all font-sans"
                />
                <FiSearch className="absolute left-3.5 top-3.5 text-brand-label" size={14} />
              </div>
            </div>

            {/* Popular Topics Box */}
            <div className="p-6 rounded-3xl bg-slate-50/60 border border-slate-100 shadow-premium space-y-4">
              <h3 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider">
                Popular Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {['SEO', 'PPC', 'UI/UX', 'ORM', 'Growth'].map((topic) => (
                  <span
                    key={topic}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-600 font-sans hover:border-brand-indigo hover:text-brand-indigo cursor-pointer transition-all duration-300"
                    onClick={() => {
                      setSearchTerm(topic)
                      setCurrentPage(1)
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Posts sidebar list */}
            <div className="p-6 rounded-3xl bg-slate-50/60 border border-slate-100 shadow-premium space-y-6">
              <h3 className="font-heading font-bold text-slate-900 text-sm uppercase tracking-wider">
                Recent Posts
              </h3>
              <div className="space-y-4">
                {posts.slice(0, 5).map((post) => (
                  <div
                    key={post.id}
                    onClick={() => handlePostClick(post)}
                    className="cursor-pointer group flex flex-col space-y-1 border-b border-slate-100/50 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-[9px] text-brand-indigo font-sans uppercase font-bold tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-xs font-heading font-semibold text-slate-700 group-hover:text-brand-indigo transition-colors leading-tight">
                      {post.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Back to Top inside sticky sidebar */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full py-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-heading font-semibold text-xs text-slate-700 hover:text-brand-indigo transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
            >
              Back to Top ↑
            </button>

          </div>

        </div>
      </section>

      {/* 4. CONTENT HIGHLIGHT BENTO SECTION */}
      <section className="relative border-t border-slate-100 py-24 bg-slate-50/40 overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
              BENTO INSIGHTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
              Premium Content Highlights
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {bentoInsights.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-100 shadow-premium hover:shadow-md hover:border-slate-200 transition-all duration-300 space-y-4"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-lg block">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. SMALL SINGLE-LINE CONTENT BANNER STRIP (Original Archive details preserved) */}
      <section className="py-12 bg-white relative z-10 border-t border-b border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1 */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-indigo uppercase tracking-wider block">
                More
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Helping businesses grow with strategically customized campaign models.
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-violet uppercase tracking-wider block">
                Search
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Igniting brand awareness, sales, and desire via high-authority content directories.
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100/80 shadow-premium flex flex-col justify-center items-center text-center space-y-2">
              <span className="text-xs font-heading font-black text-brand-cyan uppercase tracking-wider block">
                Expand Globally
              </span>
              <p className="text-slate-600 text-xs font-sans">
                Strong global presence in Warangal strategically expanding businesses in digital markets.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. BRAND STORY SECTION */}
      <section className="py-24 bg-slate-50/40 border-t border-b border-slate-100 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans block">
            OUR BRAND MISSION
          </span>
          <p className="text-slate-700 text-lg sm:text-xl font-sans leading-relaxed max-w-3xl mx-auto">
            “TSquadron creates and defines brand identities, strategically expands businesses in digital markets, and ignites brand awareness, sales, and desire. With a strong global presence in Warangal, TSquadron’s expertise and passion fuel your brand’s remarkable digital journey.”
          </p>
        </div>
      </section>

      {/* 7. FINAL HIGH-CONVERSION CTA SECTION */}
      <section id="contact-cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 text-center">
        <div className="relative rounded-[32px] p-8 sm:p-16 bg-gradient-to-tr from-brand-indigo via-brand-violet to-brand-indigo/90 border border-white/10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white leading-tight">
              Ready To Grow Your Digital Presence?
            </h2>
            <p className="text-indigo-100 font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Partner with TSquadron to explore modern digital marketing strategies, creative solutions, and growth-focused online experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-semibold text-brand-indigo bg-white hover:bg-slate-100 transition-all duration-300 shadow-lg"
              >
                Schedule Consultation
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-heading font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
              >
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Full Article Overlay Reader Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-10 max-h-[85vh] overflow-y-auto z-10 text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-800 transition-colors"
                aria-label="Close article modal"
              >
                <FiX size={18} />
              </button>

              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                  <span className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-brand-indigo font-semibold uppercase tracking-wider text-[10px]">
                    {selectedPost.category}
                  </span>
                  <span className="flex items-center gap-1.5 font-sans"><FiCalendar /> {selectedPost.date}</span>
                  <span className="flex items-center gap-1.5 font-sans"><FiUser /> By {selectedPost.author}</span>
                  <span className="flex items-center gap-1.5 font-sans"><FiClock /> {selectedPost.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 leading-tight">
                  {selectedPost.title}
                </h2>

                <div className="border-t border-slate-100 pt-6">
                  {/* Article content */}
                  <div className="text-slate-700 text-sm sm:text-base font-sans leading-relaxed space-y-6 whitespace-pre-line">
                    {selectedPost.content}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-end">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-6 py-3 rounded-full font-heading font-semibold text-xs text-white bg-brand-indigo hover:bg-brand-indigo/90 transition-all duration-300"
                  >
                    Done Reading
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Back To Top Floating button at bottom-right */}
      

    </div>
  )
}
