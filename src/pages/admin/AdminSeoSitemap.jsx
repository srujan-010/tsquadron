import React, { useState, useEffect } from 'react'
import { 
  FiSave, FiGlobe, FiInfo, FiCheck, FiCopy, FiLayers, FiFileText 
} from 'react-icons/fi'
import { db } from '../../lib/db'

export default function AdminSeoSitemap() {
  const [formData, setFormData] = useState({
    includeServices: true,
    includeBlogs: true,
    changefreq: 'weekly',
    priorityHome: '1.0',
    priorityServices: '0.8',
    priorityBlogs: '0.6'
  })

  const [xmlPreview, setXmlPreview] = useState('')
  const [urlCount, setUrlCount] = useState(0)
  const [showSavedToast, setShowSavedToast] = useState(false)
  const [showCopiedToast, setShowCopiedToast] = useState(false)

  // 1. Fetch current sitemap settings
  useEffect(() => {
    const data = db.getSeoFile('sitemap.json', {
      includeServices: true,
      includeBlogs: true,
      changefreq: 'weekly',
      priorityHome: '1.0',
      priorityServices: '0.8',
      priorityBlogs: '0.6'
    })
    setFormData(data)
  }, [])

  // 2. Generate XML preview dynamically whenever formData changes
  useEffect(() => {
    const domain = 'https://www.tsquadron.com'
    const today = new Date().toISOString().split('T')[0]
    const list = []

    // Static pages
    list.push({ loc: `${domain}/`, changefreq: 'daily', priority: formData.priorityHome })
    list.push({ loc: `${domain}/about-us/`, changefreq: formData.changefreq, priority: '0.8' })
    list.push({ loc: `${domain}/contact/`, changefreq: formData.changefreq, priority: '0.8' })
    list.push({ loc: `${domain}/blog/`, changefreq: 'daily', priority: '0.8' })
    list.push({ loc: `${domain}/services/`, changefreq: formData.changefreq, priority: '0.8' })

    // Services
    if (formData.includeServices !== false) {
      const services = [
        'digital-marketing-agency-hanamkonda',
        'seo-company-in-hanamkonda',
        'social-media-marketing',
        'ppc-services-in-hanamkonda',
        'email-marketing-company-hanamkonda',
        'online-reputation-management-services-hanumakonda',
        'web-designing-development-company-hanumakonda',
        'ui-ux-designing-company-hanamkonda'
      ]
      services.forEach(s => {
        list.push({ loc: `${domain}/${s}/`, changefreq: formData.changefreq, priority: formData.priorityServices })
      })
    }

    // Blogs
    if (formData.includeBlogs !== false) {
      const blogs = [
        'types-of-visibility-in-digital-marketing',
        'impact-of-online-reputation-management-on-seo',
        'impact-of-ui-ux-design-on-user-engagement',
        'future-of-email-marketing',
        'top-10-link-building-strategies',
        'future-of-social-media-marketing',
        'role-of-design-systems-in-web-development',
        'fundamentals-of-ui-ux-design',
        'role-of-social-media-in-online-reputation-management',
        'role-of-ai-in-email-marketing'
      ]
      blogs.forEach(b => {
        list.push({ loc: `${domain}/blog/${b}/`, changefreq: formData.changefreq, priority: formData.priorityBlogs })
      })
    }

    setUrlCount(list.length)

    // Build raw XML string
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    list.forEach(item => {
      xml += '  <url>\n'
      xml += `    <loc>${item.loc}</loc>\n`
      xml += `    <lastmod>${today}</lastmod>\n`
      xml += `    <changefreq>${item.changefreq}</changefreq>\n`
      xml += `    <priority>${item.priority}</priority>\n`
      xml += '  </url>\n'
    })
    xml += '</urlset>'

    setXmlPreview(xml)
  }, [formData])

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    db.saveSeoFile('sitemap.json', formData)

    // Trigger toast notification
    setShowSavedToast(true)
    setTimeout(() => {
      setShowSavedToast(false)
    }, 3000)
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(xmlPreview)
    setShowCopiedToast(true)
    setTimeout(() => setShowCopiedToast(false), 2000)
  }

  return (
    <div className="space-y-8 text-left max-w-5xl">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-heading font-black text-slate-900 text-2xl tracking-tight uppercase">Sitemap Manager</h1>
          <p className="text-slate-500 text-xs mt-1">Configure XML sitemap index weights, crawler frequency guidelines, and view dynamic XML generation.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleCopyToClipboard}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
          >
            <FiCopy size={13} />
            <span>Copy XML</span>
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-bold text-xs rounded-xl shadow-premium hover:shadow-hover-glow transition-all duration-300"
          >
            <FiSave size={14} />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sitemap Form Configurations - 5 cols */}
        <form onSubmit={handleSave} className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-premium space-y-6">
            <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
              <FiLayers className="text-brand-indigo" size={16} /> Directory Parameters
            </h3>

            {/* Inclusions */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Indexed Resource Layers</label>
              
              <div className="space-y-2.5">
                <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    name="includeServices"
                    checked={formData.includeServices}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 rounded text-brand-indigo focus:ring-brand-indigo border-slate-300"
                  />
                  <div>
                    <span>Include Service Subpages</span>
                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Appends all 8 TSquadron service capabilities dynamically.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    name="includeBlogs"
                    checked={formData.includeBlogs}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 rounded text-brand-indigo focus:ring-brand-indigo border-slate-300"
                  />
                  <div>
                    <span>Include Blog Articles</span>
                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Appends all active educational publications dynamically.</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Sitemap Priority Adjustments */}
            <div className="border-t border-slate-100 pt-5 space-y-4">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Crawler Priority Weights (0.0 - 1.0)</label>

              {/* Home Priority */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span>Homepage Priority</span>
                  <span className="font-mono text-brand-indigo">{formData.priorityHome}</span>
                </div>
                <select
                  name="priorityHome"
                  value={formData.priorityHome}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-bold text-slate-800"
                >
                  {['1.0', '0.9', '0.8', '0.7', '0.6', '0.5'].map(val => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
              </div>

              {/* Services Priority */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span>Services Directory Priority</span>
                  <span className="font-mono text-brand-indigo">{formData.priorityServices}</span>
                </div>
                <select
                  name="priorityServices"
                  value={formData.priorityServices}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-bold text-slate-800"
                >
                  {['0.9', '0.8', '0.7', '0.6', '0.5', '0.4'].map(val => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
              </div>

              {/* Blogs Priority */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span>Blog Articles Priority</span>
                  <span className="font-mono text-brand-indigo">{formData.priorityBlogs}</span>
                </div>
                <select
                  name="priorityBlogs"
                  value={formData.priorityBlogs}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-bold text-slate-800"
                >
                  {['0.8', '0.7', '0.6', '0.5', '0.4', '0.3'].map(val => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sitemap Change Frequency */}
            <div className="border-t border-slate-100 pt-5 space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Crawler Changefreq Directive</label>
              <select
                name="changefreq"
                value={formData.changefreq}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-bold text-slate-800"
              >
                {['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'].map(freq => (
                  <option key={freq} value={freq}>{freq.toUpperCase()}</option>
                ))}
              </select>
              <span className="text-[10px] text-slate-400 font-medium block">Tells crawlers how frequently content changes are published.</span>
            </div>

          </div>
        </form>

        {/* Real-time Dynamic XML View - 7 cols */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-premium space-y-6 max-h-[70vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
              <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2">
                <FiGlobe className="text-brand-indigo" size={16} /> Compiled XML Index
              </h3>
              
              <div className="flex gap-4 text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1"><FiGlobe className="text-slate-400" size={13} /> {urlCount} active URLs</span>
              </div>
            </div>

            {/* XML Textarea display */}
            <div className="flex-grow flex flex-col min-h-[300px]">
              <textarea
                value={xmlPreview}
                readOnly
                className="w-full h-full flex-grow p-4 bg-slate-950 text-slate-200 rounded-2xl text-[10px] font-mono leading-relaxed select-all border border-slate-900 outline-none resize-none"
              />
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 text-[10px] leading-relaxed flex gap-3 text-left shrink-0">
              <FiInfo className="text-brand-indigo shrink-0 mt-0.5" size={16} />
              <div>
                <span className="font-bold text-slate-800 block mb-0.5">Visual Crawler Compliance</span>
                This sitemap updates in real-time. Navigate to `/sitemap.xml` on the public pages to view the dynamic XML validator rendering.
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Saved Toast Notification */}
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white border border-slate-800 shadow-2xl px-5 py-3 rounded-2xl flex items-center gap-3 animate-slide-in">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <FiCheck size={12} />
          </div>
          <span className="text-xs font-bold font-sans">Sitemap Configurations Saved!</span>
        </div>
      )}

      {/* Copy Clipboard Toast Notification */}
      {showCopiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white border border-slate-800 shadow-2xl px-5 py-3 rounded-2xl flex items-center gap-3 animate-slide-in">
          <div className="w-5 h-5 rounded-full bg-brand-indigo text-white flex items-center justify-center">
            <FiCheck size={12} />
          </div>
          <span className="text-xs font-bold font-sans">Copied Sitemap XML to Clipboard!</span>
        </div>
      )}
    </div>
  )
}
