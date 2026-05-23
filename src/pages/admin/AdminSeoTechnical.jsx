import React, { useState, useEffect } from 'react'
import { 
  FiSave, FiSettings, FiPlus, FiTrash2, 
  FiGlobe, FiCheck, FiInfo, FiCode, FiArrowRight 
} from 'react-icons/fi'
import { db } from '../../lib/db'

export default function AdminSeoTechnical() {
  const [formData, setFormData] = useState({
    robotsTxt: '',
    trailingSlash: 'force', // 'force' | 'remove' | 'ignore'
    redirects: []
  })

  // Redirect rule fields
  const [newRedirect, setNewRedirect] = useState({
    source: '',
    destination: '',
    type: '301'
  })

  const [showSavedToast, setShowSavedToast] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // 1. Fetch current technical configurations on mount
  useEffect(() => {
    const data = db.getSeoFile('technical.json', {
      robotsTxt: 'User-agent: *\nAllow: /\n\nSitemap: https://www.tsquadron.com/sitemap.xml',
      trailingSlash: 'force',
      redirects: [
        { id: 1, source: '/services/seo-agency', destination: '/seo-company-in-hanamkonda/', type: '301' },
        { id: 2, source: '/old-about', destination: '/about-us/', type: '301' }
      ]
    })
    setFormData(data)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Add a redirect rule
  const handleAddRedirect = (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!newRedirect.source || !newRedirect.destination) {
      setErrorMessage('Both Source and Destination paths are required.')
      return
    }

    if (!newRedirect.source.startsWith('/')) {
      setErrorMessage('Source path must start with a slash (e.g., /old-page).')
      return
    }

    // Check for duplicate source path
    if (formData.redirects.some(r => r.source === newRedirect.source)) {
      setErrorMessage('A redirect rule for this source path already exists.')
      return
    }

    const updatedRedirects = [
      ...formData.redirects,
      {
        id: Date.now(),
        ...newRedirect
      }
    ]

    setFormData(prev => ({ ...prev, redirects: updatedRedirects }))
    db.saveSeoFile('technical.json', { ...formData, redirects: updatedRedirects })

    // Reset input fields
    setNewRedirect({ source: '', destination: '', type: '301' })

    // Show saved toast
    setShowSavedToast(true)
    setTimeout(() => setShowSavedToast(false), 2000)
  }

  // Delete a redirect rule
  const handleDeleteRedirect = (id) => {
    const updatedRedirects = formData.redirects.filter(r => r.id !== id)
    setFormData(prev => ({ ...prev, redirects: updatedRedirects }))
    db.saveSeoFile('technical.json', { ...formData, redirects: updatedRedirects })

    // Show saved toast
    setShowSavedToast(true)
    setTimeout(() => setShowSavedToast(false), 2000)
  }

  const handleSaveRobots = (e) => {
    e.preventDefault()
    db.saveSeoFile('technical.json', formData)
    
    // Trigger toast notification
    setShowSavedToast(true)
    setTimeout(() => {
      setShowSavedToast(false)
    }, 3000)
  }

  return (
    <div className="space-y-8 text-left max-w-5xl">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-heading font-black text-slate-900 text-2xl tracking-tight uppercase">Technical SEO</h1>
          <p className="text-slate-500 text-xs mt-1">Manage indexing crawlers, force trailing slash structures, and register permanent 301/302 redirects.</p>
        </div>
        <button
          onClick={handleSaveRobots}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-bold text-xs rounded-xl shadow-premium hover:shadow-hover-glow transition-all duration-300 shrink-0"
        >
          <FiSave size={14} />
          <span>Save Configurations</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Robots.txt Card Editor: 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Robots.txt Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-premium space-y-6">
            <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
              <FiGlobe className="text-brand-indigo" size={16} /> Robots.txt Builder
            </h3>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">File Content</label>
              <textarea
                name="robotsTxt"
                value={formData.robotsTxt}
                onChange={handleChange}
                rows={8}
                placeholder="User-agent: *..."
                className="w-full p-4 bg-slate-950 text-slate-200 border border-slate-900 rounded-2xl text-[11px] font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo"
              />
              <span className="text-[10px] text-slate-400 font-medium block">Serves dynamically to crawler bots requesting `/robots.txt`.</span>
            </div>

            {/* Trailing slash radio settings */}
            <div className="border-t border-slate-100 pt-5 space-y-3">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Trailing Slash Enforcement</label>
              
              <div className="space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs font-semibold text-slate-800">
                  <input
                    type="radio"
                    name="trailingSlash"
                    value="force"
                    checked={formData.trailingSlash === 'force'}
                    onChange={handleChange}
                    className="mt-0.5 text-brand-indigo focus:ring-brand-indigo"
                  />
                  <div>
                    <span>Force trailing slash (Recommended)</span>
                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Redirects `/about` to `/about/` to prevent duplicate directory indexing.</span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-xs font-semibold text-slate-800">
                  <input
                    type="radio"
                    name="trailingSlash"
                    value="remove"
                    checked={formData.trailingSlash === 'remove'}
                    onChange={handleChange}
                    className="mt-0.5 text-brand-indigo focus:ring-brand-indigo"
                  />
                  <div>
                    <span>Remove trailing slash</span>
                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Redirects `/about/` to `/about`.</span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-xs font-semibold text-slate-800">
                  <input
                    type="radio"
                    name="trailingSlash"
                    value="ignore"
                    checked={formData.trailingSlash === 'ignore'}
                    onChange={handleChange}
                    className="mt-0.5 text-brand-indigo focus:ring-brand-indigo"
                  />
                  <div>
                    <span>Ignore rules</span>
                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5 font-sans">Allows both forms without throwing server redirects.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Redirect Engine: 1 col */}
        <div className="space-y-6">
          
          {/* Add Redirect Form */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-4">
            <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
              <FiPlus className="text-brand-indigo" size={16} /> Add Redirect Rule
            </h3>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-[10px] font-bold text-red-500">
                {errorMessage}
              </div>
            )}

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Source URL Path</label>
              <input
                type="text"
                value={newRedirect.source}
                onChange={(e) => setNewRedirect(prev => ({ ...prev, source: e.target.value }))}
                placeholder="e.g. /services/seo-agency"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Destination URL Path</label>
              <input
                type="text"
                value={newRedirect.destination}
                onChange={(e) => setNewRedirect(prev => ({ ...prev, destination: e.target.value }))}
                placeholder="e.g. /seo-company-in-hanamkonda/"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Redirect Protocol Code</label>
              <select
                value={newRedirect.type}
                onChange={(e) => setNewRedirect(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-bold text-slate-800"
              >
                <option value="301">301 - Permanent Redirect</option>
                <option value="302">302 - Temporary Redirect</option>
              </select>
            </div>

            <button
              onClick={handleAddRedirect}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
            >
              <FiPlus size={14} /> Add Rule
            </button>
          </div>

          {/* Quick Technical Help Context */}
          <div className="bg-slate-900 border border-slate-900 rounded-3xl p-6 text-slate-300 space-y-4 shadow-premium text-left">
            <h4 className="font-heading font-black text-xs text-white uppercase tracking-wider flex items-center gap-2">
              <FiInfo size={14} className="text-brand-indigo" /> 301 vs 302 Redirection
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-400 font-semibold">
              <strong>301 Permanent:</strong> Recommends search bots update their index index, passing 100% link juices safely. Use for permanent directory changes.
            </p>
            <p className="text-[11px] leading-relaxed text-slate-400 font-semibold">
              <strong>302 Temporary:</strong> Retains active listing page, forwarding only browser requests momentarily. Useful for ongoing campaign tests or site maintenance.
            </p>
          </div>
        </div>
      </div>

      {/* Redirects Table - Full Width below */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-premium space-y-4">
        <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
          <FiCode className="text-brand-indigo" size={16} /> Active Redirect Map Matrix
        </h3>

        {formData.redirects.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs font-semibold">
            No redirects mapped currently. Add a rule above to secure redirection lanes.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-5 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Source Path</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Direction Anchor</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Destination Path</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status Code</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold text-slate-500 text-center uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.redirects.map((rule) => (
                  <tr key={rule.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-all font-semibold text-xs text-slate-800">
                    <td className="px-5 py-4 font-mono text-[11px] text-slate-600">{rule.source}</td>
                    <td className="px-5 py-4 text-brand-indigo">
                      <FiArrowRight size={14} />
                    </td>
                    <td className="px-5 py-4 font-mono text-[11px] text-slate-600">{rule.destination}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                        rule.type === '301' ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' : 'text-amber-700 bg-amber-50 border border-amber-100'
                      }`}>
                        {rule.type === '301' ? '301 - Permanent' : '302 - Temporary'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => handleDeleteRedirect(rule.id)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Redirect Rule"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Saved Toast Notification */}
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white border border-slate-800 shadow-2xl px-5 py-3 rounded-2xl flex items-center gap-3 animate-slide-in">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <FiCheck size={12} />
          </div>
          <span className="text-xs font-bold font-sans">Technical Settings Saved!</span>
        </div>
      )}
    </div>
  )
}
