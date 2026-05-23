import React, { useState, useEffect } from 'react'
import { FiSave, FiInfo, FiCheck, FiLayers, FiImage, FiSettings } from 'react-icons/fi'
import { db } from '../../lib/db'

export default function AdminSeoGlobal() {
  const [formData, setFormData] = useState({
    siteTitle: '',
    defaultMetaDescription: '',
    defaultKeywords: '',
    defaultOgImage: '',
    favicon: '',
    brandName: '',
    twitterHandle: '',
    defaultRobotsRule: 'index, follow',
    googleSearchConsole: '',
    googleAnalyticsId: '',
    facebookPixelId: ''
  })
  const [showSavedToast, setShowSavedToast] = useState(false)

  // 1. Fetch current global SEO settings on mount
  useEffect(() => {
    const data = db.getSeoFile('global.json', {
      siteTitle: 'TSquadron | Performance Marketing & Digital Growth Agency',
      defaultMetaDescription: 'TSquadron is a premium performance digital agency in Warangal. We engineer aggressive, analytics-guided SEO, SMM, PPC, and UI/UX campaigns.',
      defaultKeywords: 'digital marketing, seo, ppc, social media marketing, reputation management, web design, ui ux design',
      defaultOgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      favicon: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80',
      brandName: 'TSquadron',
      twitterHandle: '@tsquadron',
      defaultRobotsRule: 'index, follow',
      googleSearchConsole: '',
      googleAnalyticsId: '',
      facebookPixelId: ''
    })
    setFormData(data)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    db.saveSeoFile('global.json', formData)
    
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
          <h1 className="font-heading font-black text-slate-900 text-2xl tracking-tight uppercase">Global SEO Defaults</h1>
          <p className="text-slate-500 text-xs mt-1">Configure site-wide fallback search rules, brand profiles, favicons, and tracking hooks.</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-bold text-xs rounded-xl shadow-premium hover:shadow-hover-glow transition-all duration-300 shrink-0"
        >
          <FiSave size={14} />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Form Grid */}
      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Core Metadata Configuration Card */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-premium space-y-6">
            <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
              <FiLayers className="text-brand-indigo" size={16} /> Core Search Identifiers
            </h3>

            {/* Site Name & Brand */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Brand Name</label>
                <input
                  type="text"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  placeholder="e.g. TSquadron"
                  className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Twitter Brand Account</label>
                <input
                  type="text"
                  name="twitterHandle"
                  value={formData.twitterHandle}
                  onChange={handleChange}
                  placeholder="e.g. @tsquadron"
                  className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
                />
              </div>
            </div>

            {/* Default Site Title */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Default Site Title</label>
              <input
                type="text"
                name="siteTitle"
                value={formData.siteTitle}
                onChange={handleChange}
                placeholder="e.g. TSquadron Digital | Performance Marketing Agency"
                className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
              />
              <span className="text-[10px] text-slate-400 font-medium block">Used when individual pages do not specify a unique title tag.</span>
            </div>

            {/* Default Site Description */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Default Meta Description</label>
                <span className={`text-[10px] font-bold ${formData.defaultMetaDescription.length > 160 ? 'text-amber-500' : 'text-slate-400'}`}>
                  {formData.defaultMetaDescription.length} / 160 chars
                </span>
              </div>
              <textarea
                name="defaultMetaDescription"
                value={formData.defaultMetaDescription}
                onChange={handleChange}
                rows={3}
                placeholder="Write a concise site summary description..."
                className="w-full px-4 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800 leading-relaxed"
              />
              <span className="text-[10px] text-slate-400 font-medium block">Search engines recommend keeping description snippets under 160 characters.</span>
            </div>

            {/* Default Keywords */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Default Keywords</label>
              <input
                type="text"
                name="defaultKeywords"
                value={formData.defaultKeywords}
                onChange={handleChange}
                placeholder="seo, performance marketing, agency"
                className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
              />
              <span className="text-[10px] text-slate-400 font-medium block">Comma-separated keyword list.</span>
            </div>
          </div>

          {/* Webmaster Scripts and Injections Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-premium space-y-6">
            <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
              <FiSettings className="text-brand-indigo" size={16} /> Webmaster & Analytics Injections
            </h3>

            {/* GSC Verification Key */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Google Search Console Verification Tag</label>
              <input
                type="text"
                name="googleSearchConsole"
                value={formData.googleSearchConsole || ''}
                onChange={handleChange}
                placeholder="e.g. zX3t9R2K_..."
                className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
              />
              <span className="text-[10px] text-slate-400 font-medium block">Injects GSC verification metadata: `&lt;meta name="google-site-verification" content="..." /&gt;`</span>
            </div>

            {/* Analytics IDs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Google Analytics G-ID</label>
                <input
                  type="text"
                  name="googleAnalyticsId"
                  value={formData.googleAnalyticsId || ''}
                  onChange={handleChange}
                  placeholder="e.g. G-XXXXXXX"
                  className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
                />
                <span className="text-[10px] text-slate-400 font-medium block">Global Site Tag Google Analytics hook.</span>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Facebook Pixel ID</label>
                <input
                  type="text"
                  name="facebookPixelId"
                  value={formData.facebookPixelId || ''}
                  onChange={handleChange}
                  placeholder="e.g. 1234567890"
                  className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
                />
                <span className="text-[10px] text-slate-400 font-medium block">Standard Meta Pixel script injection tracking code.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Assets & Visual Previews Card */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-6">
            <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
              <FiImage className="text-brand-indigo" size={16} /> Asset Library Anchors
            </h3>

            {/* Favicon URL */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Favicon Asset URL</label>
              <input
                type="text"
                name="favicon"
                value={formData.favicon}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
              />
              {formData.favicon && (
                <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                  <img src={formData.favicon} alt="Favicon Preview" className="w-10 h-10 rounded-lg border object-cover shrink-0" />
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Active Tab Icon</span>
                    <span className="text-[10px] text-slate-700 font-semibold block truncate max-w-[160px]">favicon.ico</span>
                  </div>
                </div>
              )}
            </div>

            {/* Default Social Open Graph Image */}
            <div className="space-y-2 border-t border-slate-100 pt-4">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Default Social OG Image</label>
              <input
                type="text"
                name="defaultOgImage"
                value={formData.defaultOgImage}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
              />
              {formData.defaultOgImage && (
                <div className="space-y-1.5">
                  <img src={formData.defaultOgImage} alt="OG Default Preview" className="w-full h-32 rounded-2xl border object-cover" />
                  <span className="text-[9px] text-slate-400 font-medium block">Resolution: 1200 x 630 recommended for crisp social previews.</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Context Card */}
          <div className="bg-slate-900 border border-slate-900 rounded-3xl p-6 text-slate-300 space-y-4 shadow-premium">
            <h4 className="font-heading font-black text-xs text-white uppercase tracking-wider flex items-center gap-2">
              <FiInfo size={14} className="text-brand-indigo" /> Sandbox Scope
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-400 font-semibold">
              Global defaults are active dynamically. If an individual page doesn't have an active SEO record, these fields serve as the dynamic head tag injection parameters immediately.
            </p>
          </div>
        </div>
      </form>

      {/* Floating Saved Toast Notification */}
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white border border-slate-800 shadow-2xl px-5 py-3 rounded-2xl flex items-center gap-3 animate-slide-in">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <FiCheck size={12} />
          </div>
          <span className="text-xs font-bold font-sans">Global SEO Defaults Saved Successfully!</span>
        </div>
      )}
    </div>
  )
}
