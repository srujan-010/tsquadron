import React, { useState, useEffect } from 'react'
import { 
  FiSave, FiInfo, FiCheck, FiLayers, FiImage, FiSettings, 
  FiMapPin, FiActivity, FiGlobe, FiShare2 
} from 'react-icons/fi'
import { db } from '../../lib/db'

export default function AdminSeoGlobal() {
  const [activeTab, setActiveTab] = useState('identity')
  const [formData, setFormData] = useState({
    siteTitle: '',
    defaultMetaDescription: '',
    defaultKeywords: '',
    defaultOgImage: '',
    favicon: '',
    brandName: '',
    websiteName: '',
    twitterHandle: '',
    defaultRobotsRule: 'index, follow',
    googleSearchConsole: '',
    bingWebmaster: '',
    googleAnalyticsId: '',
    googleTagManager: '',
    facebookPixelId: '',
    canonicalDomain: '',
    businessAddress: '',
    city: '',
    state: '',
    country: '',
    phoneNumber: '',
    whatsAppNumber: '',
    email: '',
    facebookLink: '',
    instagramLink: '',
    linkedinLink: '',
    twitterLink: '',
    latitude: '',
    longitude: '',
    companyLogo: ''
  })
  
  const [showSavedToast, setShowSavedToast] = useState(false)

  // Fetch current global SEO settings on mount
  useEffect(() => {
    // 1. Load local client cache values as immediate default
    const localData = db.getSeoFile('global.json', {
      siteTitle: 'TSquadron | Performance Marketing & Digital Growth Agency',
      defaultMetaDescription: 'TSquadron is a premium performance digital marketing agency in Warangal. We engineer aggressive, analytics-guided SEO, SMM, PPC, and UI/UX campaigns.',
      defaultKeywords: 'digital marketing, seo, ppc, social media marketing, reputation management, web design, ui ux design',
      defaultOgImage: 'https://res.cloudinary.com/dixbhnqnf/image/upload/v1782553914/Chat-GPT-Image-May-21-2026-03-14-44-PM-removebg-preview_b7cqku.png',
      favicon: 'https://res.cloudinary.com/dixbhnqnf/image/upload/v1782553914/Chat-GPT-Image-May-21-2026-03-14-44-PM-removebg-preview_b7cqku.png',
      brandName: 'TSquadron',
      websiteName: 'TSquadron Digital Solutions',
      twitterHandle: '@tsquadron',
      defaultRobotsRule: 'index, follow',
      googleSearchConsole: '',
      bingWebmaster: '',
      googleAnalyticsId: '',
      googleTagManager: '',
      facebookPixelId: '',
      canonicalDomain: 'https://www.tsquadron.com',
      businessAddress: '2nd Floor, V-Square Plaza, Naimnagar Main Road, Hanamkonda',
      city: 'Warangal',
      state: 'Telangana',
      country: 'India',
      phoneNumber: '+91 98765 43210',
      whatsAppNumber: '+91 98765 43210',
      email: 'info@tsquadron.com',
      facebookLink: 'https://facebook.com/tsquadron',
      instagramLink: 'https://instagram.com/tsquadron',
      linkedinLink: 'https://linkedin.com/company/tsquadron',
      twitterLink: 'https://twitter.com/tsquadron',
      latitude: '18.0054',
      longitude: '79.5638',
      companyLogo: 'https://res.cloudinary.com/dixbhnqnf/image/upload/v1782826521/og-image-Photoroom_oawp5v.png'
    })
    setFormData(localData)

    // 2. Fetch the true database settings from backend API
    fetch('/api/seo/global')
      .then(res => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then(serverData => {
        if (serverData && Object.keys(serverData).length > 0) {
          setFormData(serverData)
          db.saveSeoFile('global.json', serverData)
        }
      })
      .catch(err => console.log('Using local fallback for Global SEO settings', err))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = (e) => {
    if (e) e.preventDefault()
    
    // Save to local cache first
    db.saveSeoFile('global.json', formData)
    
    // Dispatch instant local custom update event for layout header logo refresh
    window.dispatchEvent(new CustomEvent('seo-updated'))

    // Sync to backend JSON database and rewrite index.html
    fetch('/api/seo/global', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => {
      if (!res.ok) throw new Error('Sync failed');
      return res.json();
    })
    .then(() => {
      console.log('Successfully synced settings to backend database.')
    })
    .catch(err => {
      console.error('Failed syncing settings to backend database:', err)
    })
    
    // Trigger toast notification
    setShowSavedToast(true)
    setTimeout(() => {
      setShowSavedToast(false)
    }, 3000)
  }

  const tabs = [
    { id: 'identity', label: 'Brand & Identity', icon: <FiLayers size={14} /> },
    { id: 'contact', label: 'Local SEO & Contact', icon: <FiMapPin size={14} /> },
    { id: 'analytics', label: 'Webmaster & Pixels', icon: <FiActivity size={14} /> },
    { id: 'crawlers', label: 'Fallback Policies', icon: <FiGlobe size={14} /> }
  ]

  return (
    <div className="space-y-8 text-left max-w-5xl font-sans">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-heading font-black text-slate-900 text-2xl tracking-tight uppercase">Global SEO Settings</h1>
          <p className="text-slate-500 text-xs mt-1">Configure company identity, structured data coordinates, tracking integrations, and crawlers site-wide.</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-bold text-xs rounded-xl shadow-premium hover:shadow-hover-glow transition-all duration-300 shrink-0"
        >
          <FiSave size={14} />
          <span>Save Global SEO</span>
        </button>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-slate-200 overflow-x-auto whitespace-nowrap gap-1 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
              activeTab === tab.id
                ? 'border-brand-indigo text-slate-900 bg-white font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Form parameters - 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-premium space-y-6">
            
            {/* BRAND & IDENTITY TAB */}
            {activeTab === 'identity' && (
              <div className="space-y-6">
                <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
                  <FiLayers className="text-brand-indigo" size={16} /> Brand & Metadata defaults
                </h3>

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
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Website Name</label>
                    <input
                      type="text"
                      name="websiteName"
                      value={formData.websiteName}
                      onChange={handleChange}
                      placeholder="e.g. TSquadron Digital Solutions"
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Default Canonical Domain</label>
                  <input
                    type="text"
                    name="canonicalDomain"
                    value={formData.canonicalDomain}
                    onChange={handleChange}
                    placeholder="https://www.tsquadron.com"
                    className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400 font-medium block">Used to generate fallback canonical URLs.</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Default Page Title Tag</label>
                  <input
                    type="text"
                    name="siteTitle"
                    value={formData.siteTitle}
                    onChange={handleChange}
                    placeholder="TSquadron | Performance Marketing & Digital Agency"
                    className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
                  />
                </div>

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
                    className="w-full px-4 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800 leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Default Keywords</label>
                  <input
                    type="text"
                    name="defaultKeywords"
                    value={formData.defaultKeywords}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1"
                  />
                </div>
              </div>
            )}

            {/* LOCAL SEO & CONTACT TAB */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
                  <FiMapPin className="text-brand-indigo" size={16} /> Physical Coordinates & Contact
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Support Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="info@tsquadron.com"
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">WhatsApp Contact Number</label>
                    <input
                      type="text"
                      name="whatsAppNumber"
                      value={formData.whatsAppNumber}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Twitter Brand Handle</label>
                    <input
                      type="text"
                      name="twitterHandle"
                      value={formData.twitterHandle}
                      onChange={handleChange}
                      placeholder="@tsquadron"
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Office Street Address</label>
                  <input
                    type="text"
                    name="businessAddress"
                    value={formData.businessAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Latitude Coordinate</label>
                    <input
                      type="text"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleChange}
                      placeholder="e.g. 18.0054"
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Longitude Coordinate</label>
                    <input
                      type="text"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleChange}
                      placeholder="e.g. 79.5638"
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                {/* Social links */}
                <div className="border-t border-slate-100 pt-5 space-y-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Structured Data SameAs Social Links</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-600">Facebook URL</label>
                      <input
                        type="text"
                        name="facebookLink"
                        value={formData.facebookLink}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-600">Instagram URL</label>
                      <input
                        type="text"
                        name="instagramLink"
                        value={formData.instagramLink}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-600">LinkedIn URL</label>
                      <input
                        type="text"
                        name="linkedinLink"
                        value={formData.linkedinLink}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-600">Twitter Link</label>
                      <input
                        type="text"
                        name="twitterLink"
                        value={formData.twitterLink}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ANALYTICS & PIXELS TAB */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
                  <FiActivity className="text-brand-indigo" size={16} /> Tracking Injections & Webmaster Tools
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Google Analytics ID (GA4)</label>
                    <input
                      type="text"
                      name="googleAnalyticsId"
                      value={formData.googleAnalyticsId}
                      onChange={handleChange}
                      placeholder="G-XXXXXXXXXX"
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Google Tag Manager ID (GTM)</label>
                    <input
                      type="text"
                      name="googleTagManager"
                      value={formData.googleTagManager}
                      onChange={handleChange}
                      placeholder="GTM-XXXXXXX"
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Google Search Console Verification</label>
                    <input
                      type="text"
                      name="googleSearchConsole"
                      value={formData.googleSearchConsole}
                      onChange={handleChange}
                      placeholder="Verification token..."
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Bing Webmaster Verification</label>
                    <input
                      type="text"
                      name="bingWebmaster"
                      value={formData.bingWebmaster}
                      onChange={handleChange}
                      placeholder="Bing XML/meta token..."
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Facebook Meta Pixel ID</label>
                  <input
                    type="text"
                    name="facebookPixelId"
                    value={formData.facebookPixelId}
                    onChange={handleChange}
                    placeholder="e.g. 123456789"
                    className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
            )}

            {/* FALLBACK POLICIES TAB */}
            {activeTab === 'crawlers' && (
              <div className="space-y-6">
                <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
                  <FiGlobe className="text-brand-indigo" size={16} /> Fallback Crawler Directives
                </h3>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Default Crawler Indexing Rule</label>
                  <select
                    name="defaultRobotsRule"
                    value={formData.defaultRobotsRule}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-xs border border-slate-200 rounded-xl font-bold text-slate-800"
                  >
                    <option value="index, follow">index, follow (Standard SEO Indexing)</option>
                    <option value="noindex, follow">noindex, follow (Hide site, follow links)</option>
                    <option value="index, nofollow">index, nofollow (Index site, lock out link crawl)</option>
                    <option value="noindex, nofollow">noindex, nofollow (Lock out crawlers entirely)</option>
                  </select>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Side: Assets Previews & Info Card - 1 col */}
        <div className="space-y-6">
          
          {/* Logo & Favicon Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-6">
            <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
              <FiImage className="text-brand-indigo" size={16} /> Branding Media Vaults
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

            {/* Company Logo URL */}
            <div className="space-y-2 border-t border-slate-100 pt-4">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Company Logo URL</label>
              <input
                type="text"
                name="companyLogo"
                value={formData.companyLogo || ''}
                onChange={handleChange}
                placeholder="https://res.cloudinary.com/..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
              />
              {formData.companyLogo && (
                <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                  <img src={formData.companyLogo} alt="Logo Preview" className="h-10 object-contain shrink-0" />
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Active Brand Logo</span>
                    <span className="text-[10px] text-slate-700 font-semibold block truncate max-w-[160px]">logo.png</span>
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
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
              />
              {formData.defaultOgImage && (
                <div className="space-y-1.5">
                  <img src={formData.defaultOgImage} alt="OG Default Preview" className="w-full h-32 rounded-2xl border object-cover" />
                  <span className="text-[9px] text-slate-400 font-medium block">Resolution: 1200 x 630 recommended.</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Context Card */}
          <div className="bg-slate-900 border border-slate-900 rounded-3xl p-6 text-slate-350 space-y-4 shadow-premium">
            <h4 className="font-heading font-black text-xs text-white uppercase tracking-wider flex items-center gap-2">
              <FiInfo size={14} className="text-brand-indigo" /> Enterprise Ingestion
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-400 font-semibold">
              These global default variables dynamically seed JSON-LD tags, sitemaps, pixel event managers, and standard fallback page tags. Changes reflect instantly across the entire corporate router footprint.
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

