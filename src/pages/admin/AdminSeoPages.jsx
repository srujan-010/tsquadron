import React, { useState, useEffect } from 'react'
import { 
  FiSave, FiGlobe, FiLayers, FiImage, FiSearch, 
  FiFacebook, FiTwitter, FiGrid, FiCheck, FiX, FiPlus, FiLock 
} from 'react-icons/fi'
import { db } from '../../lib/db'

const PAGE_LIST = [
  { id: 'home', label: 'Home Page', path: 'pages/home.json' },
  { id: 'about-us', label: 'About Us Page', path: 'pages/about.json' },
  { id: 'contact', label: 'Contact Page', path: 'pages/contact.json' },
  { id: 'blog', label: 'Blog Index Page', path: 'pages/blog.json' },
  { id: 'services', label: 'Services Catalog Index', path: 'pages/services.json' },
  
  // Service Subpages
  { id: 'digital-marketing-agency-hanamkonda', label: 'Digital Marketing Capabilities', path: 'services/digital-marketing.json' },
  { id: 'seo-company-in-hanamkonda', label: 'Search Engine Optimization (SEO)', path: 'services/seo.json' },
  { id: 'social-media-marketing', label: 'Social Media Marketing (SMM)', path: 'services/social-media.json' },
  { id: 'ppc-services-in-hanamkonda', label: 'Pay Per Click Ads (PPC)', path: 'services/ppc.json' },
  { id: 'email-marketing-company-hanamkonda', label: 'Email Marketing', path: 'services/email-marketing.json' },
  { id: 'online-reputation-management-services-hanumakonda', label: 'Online Reputation Management (ORM)', path: 'services/orm.json' },
  { id: 'web-designing-development-company-hanumakonda', label: 'Web Design & Development', path: 'services/web-design.json' },
  { id: 'ui-ux-designing-company-hanamkonda', label: 'UI/UX Interactive Design', path: 'services/ui-ux.json' }
]

const DEFAULT_PAGE_FALLBACKS = {
  'home': {
    title: 'TSquadron | Performance Marketing & Digital Growth Agency',
    description: 'TSquadron is a leading digital marketing agency providing premium SEO, SMM, PPC, UI/UX, and web development services.',
    keywords: 'digital marketing agency, performance marketing, seo agency, warangal',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  },
  'about-us': {
    title: 'About TSquadron | Premium Digital Marketing Company',
    description: 'Learn about TSquadron, our elite squad of performance marketers, technical SEO experts, and conversion-focused web developers.',
    keywords: 'digital marketing company, about us, marketing experts, warangal',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  },
  'contact': {
    title: 'Contact TSquadron | Ignite Your Growth Platform',
    description: 'Book your free SEO audit and campaign strategy session. Get in touch with our digital specialists today.',
    keywords: 'contact agency, free seo audit, hire marketing agency, warangal',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  },
  'blog': {
    title: 'Digital Marketing Insights & SEO Blog | TSquadron',
    description: 'Stay ahead with the latest industry updates, technical search guides, conversion design trends, and email automation strategies.',
    keywords: 'marketing insights, seo blog, advertising tips, ui ux case studies',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  },
  'services': {
    title: 'High-Scale Growth Marketing Services | TSquadron',
    description: 'Explore our ROI-centric marketing services including Search Engine Optimization, Paid Ads (PPC), Social Media Marketing, and Headless Web Design.',
    keywords: 'marketing capabilities, ppc services, smm campaigns, headless web design',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  }
}

export default function AdminSeoPages() {
  const [selectedPage, setSelectedPage] = useState('home')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keywords: '',
    canonicalUrl: '',
    robotsIndex: 'index',
    robotsFollow: 'follow',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: ''
  })

  const [activePreviewTab, setActivePreviewTab] = useState('google')
  const [showSavedToast, setShowSavedToast] = useState(false)
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false)
  const [mediaPickerTarget, setMediaPickerTarget] = useState('') // 'ogImage' or 'twitterImage'
  const [mediaLibrary, setMediaLibrary] = useState([])

  // Load Media Library
  useEffect(() => {
    setMediaLibrary(db.getMedia())
  }, [isMediaPickerOpen])

  // Fetch / Sync settings when page changes
  useEffect(() => {
    const pageItem = PAGE_LIST.find(p => p.id === selectedPage)
    
    // Fetch global defaults for empty fallbacks
    const globalSeo = db.getSeoFile('global.json', {
      siteTitle: 'TSquadron | Performance Marketing & Digital Growth Agency',
      defaultMetaDescription: 'TSquadron is a premium performance digital agency in Warangal. We engineer aggressive, analytics-guided SEO, SMM, PPC, and UI/UX campaigns.',
      defaultKeywords: 'digital marketing, seo, ppc, social media marketing, reputation management, web design, ui ux design',
    })

    const rawFallback = DEFAULT_PAGE_FALLBACKS[selectedPage]
    const fallback = {
      title: (selectedPage === 'home' || !rawFallback?.title) ? globalSeo.siteTitle : rawFallback.title,
      description: (selectedPage === 'home' || !rawFallback?.description) ? globalSeo.defaultMetaDescription : rawFallback.description,
      keywords: (selectedPage === 'home' || !rawFallback?.keywords) ? globalSeo.defaultKeywords : rawFallback.keywords,
      robotsIndex: rawFallback?.robotsIndex || 'index',
      robotsFollow: rawFallback?.robotsFollow || 'follow'
    }

    const data = db.getSeoFile(pageItem.path, {
      ...fallback,
      canonicalUrl: `https://www.tsquadron.com/${selectedPage === 'home' ? '' : selectedPage + '/'}`,
      ogTitle: '',
      ogDescription: '',
      ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      twitterTitle: '',
      twitterDescription: '',
      twitterImage: ''
    })

    setFormData(data)
  }, [selectedPage])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleOpenMediaPicker = (target) => {
    setMediaPickerTarget(target)
    setIsMediaPickerOpen(true)
  }

  const handleSelectMedia = (url) => {
    setFormData(prev => ({ ...prev, [mediaPickerTarget]: url }))
    setIsMediaPickerOpen(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    const pageItem = PAGE_LIST.find(p => p.id === selectedPage)
    db.saveSeoFile(pageItem.path, formData)

    // Trigger toast notification
    setShowSavedToast(true)
    setTimeout(() => {
      setShowSavedToast(false)
    }, 3000)
  }

  return (
    <div className="space-y-8 text-left max-w-6xl">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-heading font-black text-slate-900 text-2xl tracking-tight uppercase">Page Meta Manager</h1>
          <p className="text-slate-500 text-xs mt-1">Select any static page or service subpage to customize metadata, crawler tags, and social cards.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 text-xs font-bold text-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo"
          >
            {PAGE_LIST.map((page) => (
              <option key={page.id} value={page.id}>{page.label}</option>
            ))}
          </select>

          <button
            onClick={handleSave}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-bold text-xs rounded-xl shadow-premium hover:shadow-hover-glow transition-all duration-300"
          >
            <FiSave size={14} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Form Panel: 3/5 width */}
        <form onSubmit={handleSave} className="lg:col-span-3 space-y-6">
          
          {/* Metadata Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-premium space-y-6">
            <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
              <FiLayers className="text-brand-indigo" size={16} /> Meta Tag Details
            </h3>

            {/* Title Tag */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">SEO Title Tag</label>
                <span className={`text-[10px] font-bold ${formData.title.length > 60 ? 'text-amber-500' : 'text-slate-400'}`}>
                  {formData.title.length} / 60 chars
                </span>
              </div>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Page Title tag..."
                className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
              />
              <span className="text-[10px] text-slate-400 font-medium block">Appears in Google search titles and browser tab titles.</span>
            </div>

            {/* Description Snippet */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Meta Description Tag</label>
                <span className={`text-[10px] font-bold ${formData.description.length > 160 ? 'text-amber-500' : 'text-slate-400'}`}>
                  {formData.description.length} / 160 chars
                </span>
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Write page-specific meta description snippet..."
                className="w-full px-4 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800 leading-relaxed"
              />
              <span className="text-[10px] text-slate-400 font-medium block">Search snippets under 160 characters maximize Google preview accuracy.</span>
            </div>

            {/* Keywords */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Meta Keywords</label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleChange}
                placeholder="keywords comma-separated..."
                className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
              />
            </div>

            {/* Canonical URL */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Canonical URL Link</label>
              <input
                type="text"
                name="canonicalUrl"
                value={formData.canonicalUrl}
                onChange={handleChange}
                placeholder="https://www.tsquadron.com/..."
                className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
              />
              <span className="text-[10px] text-slate-400 font-medium block">Forces crawler traffic into single preferred URL endpoints.</span>
            </div>

            {/* Robots Configuration */}
            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Search Engine Indexing</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="robotsIndex"
                      value="index"
                      checked={formData.robotsIndex !== 'noindex'}
                      onChange={handleChange}
                      className="text-brand-indigo focus:ring-brand-indigo"
                    />
                    <span>Index (Show page)</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="robotsIndex"
                      value="noindex"
                      checked={formData.robotsIndex === 'noindex'}
                      onChange={handleChange}
                      className="text-brand-indigo focus:ring-brand-indigo"
                    />
                    <span className="text-red-500 font-bold">No-Index (Hide page)</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Link Crawling</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="robotsFollow"
                      value="follow"
                      checked={formData.robotsFollow !== 'nofollow'}
                      onChange={handleChange}
                      className="text-brand-indigo focus:ring-brand-indigo"
                    />
                    <span>Follow (Crawl links)</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="robotsFollow"
                      value="nofollow"
                      checked={formData.robotsFollow === 'nofollow'}
                      onChange={handleChange}
                      className="text-brand-indigo focus:ring-brand-indigo"
                    />
                    <span className="text-red-500 font-bold">No-Follow (Block links)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Social Open Graph Overrides Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-premium space-y-6">
            <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
              <FiFacebook className="text-brand-indigo" size={16} /> Open Graph & Social Overrides
            </h3>

            {/* OG Title */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Open Graph Custom Title</label>
              <input
                type="text"
                name="ogTitle"
                value={formData.ogTitle || ''}
                onChange={handleChange}
                placeholder="Defaults to standard page title if empty..."
                className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
              />
            </div>

            {/* OG Description */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Open Graph Custom Description</label>
              <textarea
                name="ogDescription"
                value={formData.ogDescription || ''}
                onChange={handleChange}
                rows={2}
                placeholder="Defaults to standard page description if empty..."
                className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800 leading-relaxed"
              />
            </div>

            {/* OG Image */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Social Share / OG Image URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="ogImage"
                  value={formData.ogImage || ''}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-grow px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => handleOpenMediaPicker('ogImage')}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all"
                >
                  Browse Vault
                </button>
              </div>
              {formData.ogImage && (
                <img src={formData.ogImage} alt="OG Preview Thumb" className="w-40 h-24 rounded-2xl border object-cover mt-2 shadow-xs" />
              )}
            </div>

            {/* Twitter Overrides Separator */}
            <div className="border-t border-slate-100 pt-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
                <FiTwitter className="text-[#1DA1F2]" size={16} /> Twitter Cards Custom Settings
              </div>

              {/* Twitter Title */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Twitter Custom Title</label>
                <input
                  type="text"
                  name="twitterTitle"
                  value={formData.twitterTitle || ''}
                  onChange={handleChange}
                  placeholder="Defaults to OG Title if empty..."
                  className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
                />
              </div>

              {/* Twitter Image */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Twitter Card Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="twitterImage"
                    value={formData.twitterImage || ''}
                    onChange={handleChange}
                    placeholder="Defaults to OG Social Image if empty..."
                    className="flex-grow px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => handleOpenMediaPicker('twitterImage')}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all"
                  >
                    Browse Vault
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Right Preview Panel: 2/5 width */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl shadow-premium p-6 sm:p-8 space-y-6 sticky top-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2">
                <FiSearch className="text-brand-indigo" size={16} /> Real-Time Previews
              </h3>

              {/* Preview Selectors */}
              <div className="flex bg-slate-100 p-0.5 rounded-lg border">
                <button
                  onClick={() => setActivePreviewTab('google')}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all ${
                    activePreviewTab === 'google' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Google
                </button>
                <button
                  onClick={() => setActivePreviewTab('social')}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all ${
                    activePreviewTab === 'social' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Social Card
                </button>
              </div>
            </div>

            {/* PREVIEW CONTAINER */}
            <div className="min-h-[220px] flex items-center justify-center bg-slate-50 rounded-2xl p-4 border border-slate-100">
              
              {/* Google Search Result Preview */}
              {activePreviewTab === 'google' && (
                <div className="w-full space-y-1.5 font-sans">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-white shadow-xs border flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-black text-slate-800">T</span>
                    </div>
                    <div className="text-left leading-none">
                      <span className="text-[11px] font-medium text-slate-800 block">TSquadron</span>
                      <span className="text-[9px] text-slate-500 font-medium truncate max-w-[190px] block">
                        https://www.tsquadron.com{selectedPage === 'home' ? '' : `/${selectedPage}`}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-left font-sans font-semibold text-[#1a0dab] hover:underline cursor-pointer text-[15px] leading-snug truncate max-w-full">
                    {formData.title || 'TSquadron | Performance Marketing'}
                  </h4>
                  <p className="text-left text-xs text-[#4d5156] font-sans font-normal leading-relaxed line-clamp-2">
                    {formData.description || 'TSquadron is a premium performance digital agency in Warangal.'}
                  </p>
                </div>
              )}

              {/* Social share card preview (Facebook & LinkedIn standard share image format) */}
              {activePreviewTab === 'social' && (
                <div className="w-full border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-xs text-left">
                  <img
                    src={formData.ogImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'}
                    alt="Social Share Asset"
                    className="w-full h-36 object-cover border-b"
                  />
                  <div className="p-3 space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">www.tsquadron.com</span>
                    <h5 className="text-[11px] font-bold text-slate-800 leading-snug truncate">
                      {formData.ogTitle || formData.title || 'Page Title'}
                    </h5>
                    <p className="text-[10px] text-slate-500 leading-normal line-clamp-2 font-medium">
                      {formData.ogDescription || formData.description || 'Description'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 text-[10px] leading-relaxed flex gap-3 text-left">
              <FiCheck className="text-emerald-500 shrink-0 mt-0.5" size={16} />
              <div>
                <span className="font-bold text-slate-800 block mb-0.5">Instant Hydration</span>
                Updates made on the left are synchronized in real-time in the preview window above and saved dynamically to `seo/{PAGE_LIST.find(p => p.id === selectedPage)?.path}` configurations.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Picker Modal Overlay */}
      {isMediaPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" onClick={() => setIsMediaPickerOpen(false)} />
          <div className="bg-white rounded-3xl border shadow-2xl w-full max-w-2xl relative z-10 max-h-[85vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Vault Browser</span>
                <h3 className="font-heading font-black text-slate-900 text-lg uppercase tracking-tight">Select Social share image</h3>
              </div>
              <button
                onClick={() => setIsMediaPickerOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800"
              >
                <FiX size={16} />
              </button>
            </div>

            {/* Media Vault Grid */}
            <div className="p-6 overflow-y-auto flex-grow bg-slate-50">
              {mediaLibrary.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <FiImage className="mx-auto text-slate-300" size={48} />
                  <p className="text-xs text-slate-500 font-semibold">Your TSquadron media library is empty.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {mediaLibrary.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectMedia(item.url)}
                      className="group border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-premium hover:border-brand-indigo/60 cursor-pointer transition-all duration-300 relative text-left"
                    >
                      <img src={item.url} alt={item.name} className="w-full h-24 object-cover" />
                      <div className="p-2 border-t">
                        <span className="text-[10px] font-bold text-slate-800 block truncate group-hover:text-brand-indigo">{item.name}</span>
                        <span className="text-[9px] text-slate-400 font-semibold block uppercase">{item.size}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 text-right bg-white">
              <button
                onClick={() => setIsMediaPickerOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs rounded-xl transition-all"
              >
                Cancel Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Toast Notification */}
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white border border-slate-800 shadow-2xl px-5 py-3 rounded-2xl flex items-center gap-3 animate-slide-in">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <FiCheck size={12} />
          </div>
          <span className="text-xs font-bold font-sans">Page Metadata Saved Successfully!</span>
        </div>
      )}
    </div>
  )
}
