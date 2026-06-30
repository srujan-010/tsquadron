import React, { useState, useEffect } from 'react'
import { 
  FiSave, FiSettings, FiPlus, FiTrash2, 
  FiGlobe, FiCheck, FiInfo, FiCode, FiArrowRight,
  FiAlertTriangle, FiLink, FiActivity, FiXCircle
} from 'react-icons/fi'
import { db } from '../../lib/db'

export default function AdminSeoTechnical() {
  const [activeTab, setActiveTab] = useState('crawlers') // 'crawlers' | 'redirects' | 'logs'
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

  const [logs404, setLogs404] = useState([])
  const [showSavedToast, setShowSavedToast] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Load configuration and 404 logs on mount
  useEffect(() => {
    const data = db.getSeoFile('technical.json', {
      robotsTxt: 'User-agent: *\nAllow: /\n\nSitemap: https://www.tsquadron.in/sitemap.xml',
      trailingSlash: 'force',
      redirects: [
        { id: 1, source: '/services/seo-agency', destination: '/seo-company-in-hanamkonda/', type: '301' },
        { id: 2, source: '/old-about', destination: '/about-us/', type: '301' }
      ]
    })
    setFormData(data)
    setLogs404(db.get404Logs())
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Save changes helper
  const saveState = (updatedData) => {
    setFormData(updatedData)
    db.saveSeoFile('technical.json', updatedData)
  }

  // Add a redirect rule
  const handleAddRedirect = (e) => {
    if (e) e.preventDefault()
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

    saveState({ ...formData, redirects: updatedRedirects })

    // Reset input fields
    setNewRedirect({ source: '', destination: '', type: '301' })

    // Show saved toast
    setShowSavedToast(true)
    setTimeout(() => setShowSavedToast(false), 2000)
  }

  // Delete a redirect rule
  const handleDeleteRedirect = (id) => {
    const updatedRedirects = formData.redirects.filter(r => r.id !== id)
    saveState({ ...formData, redirects: updatedRedirects })

    setShowSavedToast(true)
    setTimeout(() => setShowSavedToast(false), 2000)
  }

  // Save robots & trailing slash config
  const handleSaveRobots = (e) => {
    if (e) e.preventDefault()
    db.saveSeoFile('technical.json', formData)
    
    setShowSavedToast(true)
    setTimeout(() => {
      setShowSavedToast(false)
    }, 3000)
  }

  // Clear 404 log list
  const handleClearLogs = () => {
    db.clear404Logs()
    setLogs404([])
  }

  // Quick fix: convert 404 path to redirect rule input
  const quickFix404 = (path) => {
    setNewRedirect({
      source: path,
      destination: '/',
      type: '301'
    })
    setActiveTab('redirects')
  }

  return (
    <div className="space-y-8 text-left max-w-5xl font-sans">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-heading font-black text-slate-900 text-2xl tracking-tight uppercase">Technical Console & Redirects</h1>
          <p className="text-slate-500 text-xs mt-1">Manage crawl budgets, robots directives, trailing slash formatting, redirect rules, and 404 logs.</p>
        </div>
        <button
          onClick={handleSaveRobots}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-bold text-xs rounded-xl shadow-premium hover:shadow-hover-glow transition-all duration-300 shrink-0"
        >
          <FiSave size={14} />
          <span>Save Console</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto whitespace-nowrap gap-1 pb-1">
        <button
          onClick={() => setActiveTab('crawlers')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
            activeTab === 'crawlers' ? 'border-brand-indigo text-slate-900 bg-white font-black' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FiGlobe size={14} />
          <span>Robots & Formatting</span>
        </button>
        <button
          onClick={() => setActiveTab('redirects')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
            activeTab === 'redirects' ? 'border-brand-indigo text-slate-900 bg-white font-black' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FiLink size={14} />
          <span>301 Redirect Rules ({formData.redirects.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
            activeTab === 'logs' ? 'border-brand-indigo text-slate-900 bg-white font-black' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FiAlertTriangle size={14} />
          <span>404 Crawler Error Logs ({logs404.length})</span>
        </button>
      </div>

      {/* TABS CONTAINER */}
      <div>
        
        {/* ROBOTS & FORMATTING TAB */}
        {activeTab === 'crawlers' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-premium space-y-6">
              <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
                <FiGlobe className="text-brand-indigo" size={16} /> Robots.txt Editor
              </h3>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Directives Payload</label>
                <textarea
                  name="robotsTxt"
                  value={formData.robotsTxt}
                  onChange={handleChange}
                  rows={8}
                  placeholder="User-agent: *..."
                  className="w-full p-4 bg-slate-950 text-slate-200 border border-slate-900 rounded-2xl text-[11px] font-mono leading-relaxed focus:outline-none"
                />
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
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-900 rounded-3xl p-6 text-slate-350 space-y-4 shadow-premium h-fit">
              <h4 className="font-heading font-black text-xs text-white uppercase tracking-wider flex items-center gap-2">
                <FiInfo size={14} className="text-brand-indigo" /> Crawler Directives
              </h4>
              <p className="text-[11px] leading-relaxed text-slate-400 font-semibold">
                Use the robots directives panel to whitelist specific SEO indexing paths, lock search crawlers from index directories, and supply the canonical sitemap route mappings.
              </p>
            </div>
          </div>
        )}

        {/* REDIRECT RULES TAB */}
        {activeTab === 'redirects' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-premium space-y-4">
                <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
                  <FiCode className="text-brand-indigo" size={16} /> Active Redirect Rules Map
                </h3>

                {formData.redirects.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs font-semibold">
                    No active redirect pathways mapped.
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-slate-100">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                          <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Source Path</th>
                          <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Target</th>
                          <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase text-center">Type</th>
                          <th className="px-4 py-3 text-[10px] font-bold text-slate-500 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.redirects.map((rule) => (
                          <tr key={rule.id} className="border-b last:border-0 hover:bg-slate-50 text-xs font-semibold text-slate-800">
                            <td className="px-4 py-3.5 font-mono text-[11px] text-slate-600 truncate max-w-[150px]" title={rule.source}>{rule.source}</td>
                            <td className="px-4 py-3.5 font-mono text-[11px] text-slate-650 truncate max-w-[150px]" title={rule.destination}>{rule.destination}</td>
                            <td className="px-4 py-3.5 text-center">
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-mono">{rule.type}</span>
                            </td>
                            <td className="px-4 py-3.5 text-center">
                              <button
                                onClick={() => handleDeleteRedirect(rule.id)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded"
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
            </div>

            {/* Add redirect sidebar form */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-4 h-fit">
              <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
                <FiPlus className="text-brand-indigo" size={16} /> Add Redirect Rule
              </h3>
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-[10px] font-bold text-red-500">
                  {errorMessage}
                </div>
              )}
              <div className="space-y-3">
                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-bold text-slate-500 uppercase block">Source Path</label>
                  <input
                    type="text"
                    value={newRedirect.source}
                    onChange={(e) => setNewRedirect(prev => ({ ...prev, source: e.target.value }))}
                    placeholder="e.g. /old-marketing-page"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-bold text-slate-500 uppercase block">Destination Path</label>
                  <input
                    type="text"
                    value={newRedirect.destination}
                    onChange={(e) => setNewRedirect(prev => ({ ...prev, destination: e.target.value }))}
                    placeholder="e.g. /digital-marketing-agency/"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-bold text-slate-500 uppercase block">Protocol</label>
                  <select
                    value={newRedirect.type}
                    onChange={(e) => setNewRedirect(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-bold"
                  >
                    <option value="301">301 - Permanent</option>
                    <option value="302">302 - Temporary</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={handleAddRedirect}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1"
                >
                  <FiPlus size={12} /> Add Rule
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 404 LOG TAB */}
        {activeTab === 'logs' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-premium space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <FiAlertTriangle className="text-brand-indigo" size={16} /> 404 Crawler Encounter Logs
                </h3>
                {logs404.length > 0 && (
                  <button
                    onClick={handleClearLogs}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 border border-red-100 hover:bg-red-100 rounded-lg text-[10px] font-bold transition-all"
                  >
                    <FiXCircle size={12} /> Clear Log Vault
                  </button>
                )}
              </div>

              {logs404.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs font-semibold">
                  Zero 404 error encounters reported! Crawling paths are clean.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-slate-100">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Broken Path Encountered</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Referrer Site</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase text-center">Hits</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Last Encountered</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-500 text-center uppercase">Resolve Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs404.map((log, idx) => (
                        <tr key={idx} className="border-b last:border-0 hover:bg-slate-50 text-xs font-semibold text-slate-800">
                          <td className="px-4 py-3.5 font-mono text-[11px] text-red-500 truncate max-w-[200px]" title={log.path}>{log.path}</td>
                          <td className="px-4 py-3.5 font-mono text-[10px] text-slate-450 truncate max-w-[150px]" title={log.referrer || 'Direct Traffic'}>{log.referrer || 'Direct Traffic'}</td>
                          <td className="px-4 py-3.5 text-center text-slate-600">{log.hitCount || 1}</td>
                          <td className="px-4 py-3.5 text-slate-500 text-[10px]">{log.lastHit || 'Just Now'}</td>
                          <td className="px-4 py-3.5 text-center">
                            <button
                              onClick={() => quickFix404(log.path)}
                              className="px-2.5 py-1 bg-brand-indigo/10 text-brand-indigo border border-brand-indigo/20 hover:bg-brand-indigo hover:text-white rounded-lg text-[10px] font-bold transition-all"
                            >
                              Fix with 301 Redirect
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Saved Toast Notification */}
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white border border-slate-800 shadow-2xl px-5 py-3 rounded-2xl flex items-center gap-3 animate-slide-in">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <FiCheck size={12} />
          </div>
          <span className="text-xs font-bold font-sans">Technical Rules Saved Successfully!</span>
        </div>
      )}
    </div>
  )
}
