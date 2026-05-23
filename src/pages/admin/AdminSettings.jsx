import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCheck, FiSettings, FiMail, FiPhone, FiGlobe, FiMapPin, FiTwitter, FiInstagram, FiFacebook, FiLinkedin } from 'react-icons/fi'
import { db } from '../../lib/db'

export default function AdminSettings() {
  const [settings, setSettings] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    setSettings(db.getSettings())
  }, [])

  const handleFieldChange = (section, field, value) => {
    setSettings(prev => {
      if (section) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value
          }
        }
      } else {
        return {
          ...prev,
          [field]: value
        }
      }
    })
  }

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...settings.addresses]
    updatedAddresses[index][field] = value
    setSettings(prev => ({
      ...prev,
      addresses: updatedAddresses
    }))
  }

  const handleSaveSettings = (e) => {
    e.preventDefault()
    if (!settings) return

    db.saveSettings(settings)
    setSuccessMsg('Global settings saved successfully!')
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  if (!settings) return null

  return (
    <div className="space-y-8 font-sans">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-heading font-black text-slate-900 tracking-tight">Global Settings</h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
          Configure website metadata, corporate handles, and branch contact info.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold flex items-center gap-2 max-w-md">
          <FiCheck size={16} />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        {/* Left Column: Config forms */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* General settings card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-4">
            <h3 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-50 pb-2 flex items-center gap-2">
              <FiSettings size={14} className="text-brand-label" />
              <span>General Info</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Company Name</label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => handleFieldChange(null, 'companyName', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Logo Text</label>
                <input
                  type="text"
                  value={settings.logoText}
                  onChange={(e) => handleFieldChange(null, 'logoText', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all font-semibold"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Contact Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleFieldChange(null, 'contactEmail', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all font-sans"
                    required
                  />
                  <FiMail className="absolute left-3.5 top-3.5 text-brand-label" size={14} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Phone Line</label>
                <div className="relative">
                  <input
                    type="text"
                    value={settings.contactPhone}
                    onChange={(e) => handleFieldChange(null, 'contactPhone', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all font-sans"
                  />
                  <FiPhone className="absolute left-3.5 top-3.5 text-brand-label" size={14} />
                </div>
              </div>
            </div>
          </div>

          {/* Google API Integration Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-4">
            <h3 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-50 pb-2 flex items-center gap-2">
              <FiSettings size={14} className="text-brand-label" />
              <span>Google APIs Integration</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Google Place ID</label>
                <input
                  type="text"
                  value={settings.googlePlaceId || ''}
                  onChange={(e) => handleFieldChange(null, 'googlePlaceId', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all"
                  placeholder="e.g. ChIJN1t_tDeuEmsRUsoyG83frY4"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Google Places API Key</label>
                <input
                  type="password"
                  value={settings.googleApiKey || ''}
                  onChange={(e) => handleFieldChange(null, 'googleApiKey', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all"
                  placeholder="AIzaSyB..."
                />
              </div>
            </div>
            <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
              These credentials are required to fetch live Google Business reviews on the homepage. If left empty, the site will automatically fallback to locally cached manual testimonials.
            </p>
          </div>

          {/* Branch addresses card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-4">
            <h3 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-50 pb-2 flex items-center gap-2">
              <FiMapPin size={14} className="text-brand-label" />
              <span>Office Address Details</span>
            </h3>

            {settings.addresses.map((addr, idx) => (
              <div key={idx} className="p-4 border border-slate-150 rounded-2xl bg-slate-50/20 space-y-3">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-brand-label uppercase tracking-wider block">Office Title / Branch Label</label>
                  <input
                    type="text"
                    value={addr.title}
                    onChange={(e) => handleAddressChange(idx, 'title', e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-none focus:border-brand-indigo transition-all font-semibold"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-brand-label uppercase tracking-wider block">Address Line 1</label>
                    <input
                      type="text"
                      value={addr.line1}
                      onChange={(e) => handleAddressChange(idx, 'line1', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-none focus:border-brand-indigo transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-brand-label uppercase tracking-wider block">Address Line 2</label>
                    <input
                      type="text"
                      value={addr.line2}
                      onChange={(e) => handleAddressChange(idx, 'line2', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-none focus:border-brand-indigo transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-brand-label uppercase tracking-wider block">State & ZIP Code</label>
                    <input
                      type="text"
                      value={addr.state}
                      onChange={(e) => handleAddressChange(idx, 'state', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-none focus:border-brand-indigo transition-all"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: SEO default tags & Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Action Box */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-4">
            <h4 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-50 pb-2">Actions</h4>
            <button
              type="submit"
              className="w-full py-3 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-semibold text-xs rounded-xl shadow-premium transition-all duration-300 text-center block"
            >
              Save All Changes
            </button>
          </div>

          {/* Social Links Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-4">
            <h3 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-50 pb-2">Social Channels</h3>
            
            <div className="space-y-3">
              {[
                { icon: <FiFacebook className="text-blue-600" />, field: 'facebook', placeholder: 'https://facebook.com/...' },
                { icon: <FiInstagram className="text-pink-600" />, field: 'instagram', placeholder: 'https://instagram.com/...' },
                { icon: <FiLinkedin className="text-blue-700" />, field: 'linkedin', placeholder: 'https://linkedin.com/...' },
                { icon: <FiTwitter className="text-slate-700" />, field: 'twitter', placeholder: 'https://twitter.com/...' }
              ].map((social) => (
                <div key={social.field} className="relative flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center shrink-0 bg-slate-50">
                    {social.icon}
                  </div>
                  <input
                    type="text"
                    value={settings.socialLinks[social.field] || ''}
                    placeholder={social.placeholder}
                    onChange={(e) => handleFieldChange('socialLinks', social.field, e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-[11px] focus:outline-none focus:border-brand-indigo focus:bg-white transition-all font-sans"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SEO Defaults Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-4">
            <h3 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-50 pb-2 flex items-center gap-2">
              <FiGlobe size={14} className="text-brand-label" />
              <span>SEO Meta Standards</span>
            </h3>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Default Title Tag</label>
                <input
                  type="text"
                  value={settings.seoDefaults.title}
                  onChange={(e) => handleFieldChange('seoDefaults', 'title', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Default Meta Description</label>
                <textarea
                  rows={3}
                  value={settings.seoDefaults.description}
                  onChange={(e) => handleFieldChange('seoDefaults', 'description', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all leading-normal"
                  required
                />
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  )
}
