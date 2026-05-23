import React, { useState, useEffect } from 'react'
import { 
  FiSave, FiCode, FiLayers, FiInfo, FiCheck, FiPlus, FiTrash2, FiToggleLeft 
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

export default function AdminSeoSchema() {
  const [selectedPage, setSelectedPage] = useState('home')
  const [schemaEnabled, setSchemaEnabled] = useState(true)
  const [editorMode, setEditorMode] = useState('guided') // 'guided' | 'raw'
  const [rawJsonLd, setRawJsonLd] = useState('')

  // Guided state blocks
  const [schemaType, setSchemaType] = useState('Organization') // 'Organization' | 'LocalBusiness' | 'FAQPage'
  
  // Organization state
  const [orgData, setOrgData] = useState({
    name: 'TSquadron Digital Solutions',
    url: 'https://www.tsquadron.com',
    logo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80',
    phone: '+91 98765 43210'
  })

  // LocalBusiness state
  const [localData, setLocalData] = useState({
    name: 'TSquadron Warangal',
    street: '2nd Floor, V-Square Plaza, Naimnagar Main Road',
    city: 'Warangal, Warangal',
    postalCode: '506001',
    state: 'Telangana',
    country: 'IN',
    lat: '18.0054',
    lng: '79.5638'
  })

  // FAQ state
  const [faqs, setFaqs] = useState([
    { q: 'What digital services does TSquadron provide?', a: 'TSquadron provides Search Engine Optimization, PPC ad campaigns, Social Media Marketing, ORM, UI/UX, and Web Development.' },
    { q: 'How long does SEO take to rank?', a: 'Standard white-hat search engine optimization takes approximately 3 to 6 months to mature and yield stable results.' }
  ])

  const [showSavedToast, setShowSavedToast] = useState(false)
  const [validationError, setValidationError] = useState('')

  // Fetch page settings on select changes
  useEffect(() => {
    const pageItem = PAGE_LIST.find(p => p.id === selectedPage)
    const storedSeo = db.getSeoFile(pageItem.path, {})

    const enabled = storedSeo.schemaEnabled !== false
    setSchemaEnabled(enabled)

    const storedSchema = storedSeo.schema || ''
    
    // Attempt to parse schema to load into guided state or default to raw
    if (storedSchema) {
      try {
        const parsed = JSON.parse(storedSchema)
        if (parsed['@type'] === 'Organization') {
          setSchemaType('Organization')
          setOrgData({
            name: parsed.name || '',
            url: parsed.url || '',
            logo: parsed.logo || '',
            phone: parsed.contactPoint?.telephone || ''
          })
          setEditorMode('guided')
        } else if (parsed['@type'] === 'LocalBusiness') {
          setSchemaType('LocalBusiness')
          setLocalData({
            name: parsed.name || '',
            street: parsed.address?.streetAddress || '',
            city: parsed.address?.addressLocality || '',
            postalCode: parsed.address?.postalCode || '',
            state: parsed.address?.addressRegion || '',
            country: parsed.address?.addressCountry || '',
            lat: parsed.geo?.latitude || '',
            lng: parsed.geo?.longitude || ''
          })
          setEditorMode('guided')
        } else if (parsed['@type'] === 'FAQPage') {
          setSchemaType('FAQPage')
          const mappedFaqs = (parsed.mainEntity || []).map(f => ({
            q: f.name || '',
            a: f.acceptedAnswer?.text || ''
          }))
          setFaqs(mappedFaqs)
          setEditorMode('guided')
        } else {
          // Custom / unsupported type -> load as raw
          setRawJsonLd(storedSchema)
          setEditorMode('raw')
        }
      } catch (err) {
        // Corrupted JSON -> read as raw text
        setRawJsonLd(storedSchema)
        setEditorMode('raw')
      }
    } else {
      // Empty Schema: clear and set default guided Organization
      setEditorMode('guided')
      setSchemaType('Organization')
      setRawJsonLd('')
    }
  }, [selectedPage])

  // Automatically compile guided schemas into RAW JSON string whenever parameters change
  useEffect(() => {
    if (editorMode !== 'guided') return

    let compiledJson = {}

    if (schemaType === 'Organization') {
      compiledJson = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': orgData.name,
        'url': orgData.url,
        'logo': orgData.logo,
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': orgData.phone,
          'contactType': 'customer service'
        }
      }
    } else if (schemaType === 'LocalBusiness') {
      compiledJson = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': localData.name,
        'image': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': localData.street,
          'addressLocality': localData.city,
          'postalCode': localData.postalCode,
          'addressRegion': localData.state,
          'addressCountry': localData.country
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': localData.lat,
          'longitude': localData.lng
        },
        'url': 'https://www.tsquadron.com'
      }
    } else if (schemaType === 'FAQPage') {
      compiledJson = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.a
          }
        }))
      }
    }

    setRawJsonLd(JSON.stringify(compiledJson, null, 2))
  }, [schemaType, orgData, localData, faqs, editorMode])

  const handleAddFaq = () => {
    setFaqs(prev => [...prev, { q: '', a: '' }])
  }

  const handleRemoveFaq = (index) => {
    setFaqs(prev => prev.filter((_, i) => i !== index))
  }

  const handleFaqChange = (index, field, value) => {
    const updated = [...faqs]
    updated[index][field] = value
    setFaqs(updated)
  }

  const handleSave = (e) => {
    e.preventDefault()
    setValidationError('')

    // Validate raw JSON markup
    try {
      if (rawJsonLd) {
        JSON.parse(rawJsonLd)
      }
    } catch (err) {
      setValidationError('Invalid JSON: Please check syntax brackets and commas in raw script editor.')
      return
    }

    const pageItem = PAGE_LIST.find(p => p.id === selectedPage)
    const storedSeo = db.getSeoFile(pageItem.path, {})
    
    db.saveSeoFile(pageItem.path, {
      ...storedSeo,
      schemaEnabled: schemaEnabled,
      schema: schemaEnabled ? rawJsonLd : ''
    })

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
          <h1 className="font-heading font-black text-slate-900 text-2xl tracking-tight uppercase">Schema Builder</h1>
          <p className="text-slate-500 text-xs mt-1">Configure structured JSON-LD schemas (Organization, Local Business, FAQs) to capture rich snippets on Google search results.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 text-xs font-bold text-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-sans"
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
            <span>Save Schema</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Form parameters - 7 cols */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Switcher & Toggle Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-premium space-y-6">
            
            {/* Global toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-slate-900 text-sm font-bold flex items-center gap-2">
                  <FiToggleLeft className="text-brand-indigo" size={16} /> Enable LD-JSON Schema
                </h4>
                <p className="text-[10px] text-slate-400 font-medium">Toggle schema structured scripts inside HTML header dynamically.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={schemaEnabled}
                  onChange={(e) => setSchemaEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-indigo" />
              </label>
            </div>

            {schemaEnabled && (
              <div className="border-t border-slate-100 pt-5 space-y-4">
                {/* Editor Mode buttons */}
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Builder Interface</label>
                  
                  <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                    <button
                      onClick={() => setEditorMode('guided')}
                      className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${
                        editorMode === 'guided' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Guided Form
                    </button>
                    <button
                      onClick={() => setEditorMode('raw')}
                      className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${
                        editorMode === 'raw' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Raw JSON-LD
                    </button>
                  </div>
                </div>

                {editorMode === 'guided' && (
                  <div className="space-y-4 border-t border-slate-50 pt-4">
                    {/* Schema Type Select */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Schema Template</label>
                      <select
                        value={schemaType}
                        onChange={(e) => setSchemaType(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-bold text-slate-800"
                      >
                        <option value="Organization">Organization Template (Brand Identity)</option>
                        <option value="LocalBusiness">Local Business Template (Physical Office)</option>
                        <option value="FAQPage">FAQ Q&A Sets Template (Search Accordions)</option>
                      </select>
                    </div>

                    {/* GUIDED ORG FIELDS */}
                    {schemaType === 'Organization' && (
                      <div className="space-y-4 bg-slate-50 p-4 border border-slate-100 rounded-2xl animate-fade-in">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Company Name</label>
                          <input
                            type="text"
                            value={orgData.name}
                            onChange={(e) => setOrgData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Website URL</label>
                          <input
                            type="text"
                            value={orgData.url}
                            onChange={(e) => setOrgData(prev => ({ ...prev, url: e.target.value }))}
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Company Logo URL</label>
                          <input
                            type="text"
                            value={orgData.logo}
                            onChange={(e) => setOrgData(prev => ({ ...prev, logo: e.target.value }))}
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Support Phone Number</label>
                          <input
                            type="text"
                            value={orgData.phone}
                            onChange={(e) => setOrgData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1"
                          />
                        </div>
                      </div>
                    )}

                    {/* GUIDED LOCAL BIZ FIELDS */}
                    {schemaType === 'LocalBusiness' && (
                      <div className="space-y-4 bg-slate-50 p-4 border border-slate-100 rounded-2xl animate-fade-in">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Business / Branch Name</label>
                          <input
                            type="text"
                            value={localData.name}
                            onChange={(e) => setLocalData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Street Address</label>
                          <input
                            type="text"
                            value={localData.street}
                            onChange={(e) => setLocalData(prev => ({ ...prev, street: e.target.value }))}
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">City / Locality</label>
                            <input
                              type="text"
                              value={localData.city}
                              onChange={(e) => setLocalData(prev => ({ ...prev, city: e.target.value }))}
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Postal / Zip Code</label>
                            <input
                              type="text"
                              value={localData.postalCode}
                              onChange={(e) => setLocalData(prev => ({ ...prev, postalCode: e.target.value }))}
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 font-sans">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Latitude Coordinate</label>
                            <input
                              type="text"
                              value={localData.lat}
                              onChange={(e) => setLocalData(prev => ({ ...prev, lat: e.target.value }))}
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Longitude Coordinate</label>
                            <input
                              type="text"
                              value={localData.lng}
                              onChange={(e) => setLocalData(prev => ({ ...prev, lng: e.target.value }))}
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-1"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* GUIDED FAQ BUILDER */}
                    {schemaType === 'FAQPage' && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2">
                          <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Q&A Sets ({faqs.length})</label>
                          <button
                            type="button"
                            onClick={handleAddFaq}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] rounded-lg shadow-xs transition-all"
                          >
                            <FiPlus size={12} /> Add QA Row
                          </button>
                        </div>

                        <div className="space-y-4 overflow-y-auto max-h-[320px] pr-1">
                          {faqs.map((faq, index) => (
                            <div key={index} className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl relative text-left space-y-3">
                              <button
                                type="button"
                                onClick={() => handleRemoveFaq(index)}
                                className="absolute top-4 right-4 p-1 text-slate-400 hover:text-red-500 rounded transition-all"
                                title="Delete Question Set"
                              >
                                <FiTrash2 size={13} />
                              </button>
                              
                              <div className="space-y-1 pr-6 text-left">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Question #{index + 1}</label>
                                <input
                                  type="text"
                                  value={faq.q}
                                  onChange={(e) => handleFaqChange(index, 'q', e.target.value)}
                                  placeholder="Enter search user question..."
                                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none"
                                />
                              </div>
                              <div className="space-y-1 text-left">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Answer #{index + 1}</label>
                                <textarea
                                  value={faq.a}
                                  onChange={(e) => handleFaqChange(index, 'a', e.target.value)}
                                  placeholder="Enter detailed schema answer snippet..."
                                  rows={2}
                                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* RAW DIRECT TEXTAREA */}
                {editorMode === 'raw' && (
                  <div className="space-y-2 border-t border-slate-50 pt-4">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Raw JSON-LD Script</label>
                    <textarea
                      value={rawJsonLd}
                      onChange={(e) => setRawJsonLd(e.target.value)}
                      rows={14}
                      placeholder="Paste raw script schema: { ... }"
                      className="w-full p-4 bg-slate-950 text-slate-200 rounded-2xl text-[10px] font-mono leading-relaxed focus:outline-none border border-slate-900 outline-none resize-none"
                    />
                    <span className="text-[10px] text-slate-400 font-medium block">Must be valid standard JSON. Avoid adding HTML script tag wraps here.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Compiled Script Preview - 5 cols */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-premium space-y-6 max-h-[70vh] flex flex-col overflow-hidden">
            <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100 shrink-0">
              <FiCode className="text-brand-indigo" size={16} /> Generated Structured Schema
            </h3>

            {validationError && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-[10px] font-bold text-red-500 shrink-0">
                {validationError}
              </div>
            )}

            {/* Compiled Script View */}
            <div className="flex-grow flex flex-col min-h-[300px]">
              <textarea
                value={schemaEnabled && rawJsonLd ? `<script type="application/ld+json">\n${rawJsonLd}\n</script>` : '<!-- Structured schema injection disabled or empty -->'}
                readOnly
                className="w-full h-full flex-grow p-4 bg-slate-950 text-slate-200 rounded-2xl text-[10px] font-mono leading-relaxed select-all border border-slate-900 outline-none resize-none"
              />
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 text-[10px] leading-relaxed flex gap-3 text-left shrink-0">
              <FiInfo className="text-brand-indigo shrink-0 mt-0.5" size={16} />
              <div>
                <span className="font-bold text-slate-800 block mb-0.5">Google Rich Snippets Hook</span>
                Search engines discover structured scripts, rendering search page reviews, maps, and dynamic FAQs directly inside search page blocks!
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
          <span className="text-xs font-bold font-sans">Schema Markup Configuration Saved!</span>
        </div>
      )}
    </div>
  )
}
