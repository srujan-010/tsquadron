import React, { useState, useEffect } from 'react'
import { 
  FiSave, FiFolder, FiLayers, FiSearch, 
  FiCheck, FiX, FiRefreshCw, FiPlus, FiTrash2,
  FiActivity, FiChevronRight, FiMapPin
} from 'react-icons/fi'
import { db } from '../../lib/db'

export default function AdminSeoCategories() {
  const [categoriesList, setCategoriesList] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    seoTitle: '',
    seoDescription: '',
    focusKeyword: '',
    canonicalUrl: '',
    robotsIndex: 'index',
    robotsFollow: 'follow',
    breadcrumbLabel: '',
    parentCategory: 'None'
  })

  const [activePreviewTab, setActivePreviewTab] = useState('google')
  const [previewDevice, setPreviewDevice] = useState('desktop')
  const [showSavedToast, setShowSavedToast] = useState(false)

  const loadCategories = () => {
    const list = db.getCategories()
    setCategoriesList(list)
    if (list.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(list[0].id)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  useEffect(() => {
    if (!selectedCategoryId) return
    const matchCat = categoriesList.find(c => c.id === Number(selectedCategoryId))
    if (!matchCat) return

    setSelectedCategory(matchCat)
    setFormData({
      ...matchCat,
      parentCategory: matchCat.parentCategory || 'None'
    })
  }, [selectedCategoryId, categoriesList])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRegenerateSlug = () => {
    const slug = generateSlug(formData.name)
    setFormData(prev => ({
      ...prev,
      slug,
      canonicalUrl: `https://www.tsquadron.com/categories/${slug}/`
    }))
  }

  const handleAddCategory = () => {
    const defaultNew = {
      name: 'New SEO Campaign Group',
      slug: 'new-seo-campaign-group',
      seoTitle: 'Local SEO Strategy Categories Hanamkonda | TSquadron',
      seoDescription: 'Explore digital marketing categories specializing in performance SEO audits, analytics, SMM, and course training.',
      focusKeyword: 'SEO Services Warangal',
      canonicalUrl: 'https://www.tsquadron.com/categories/new-seo-campaign-group/',
      robotsIndex: 'index',
      robotsFollow: 'follow',
      breadcrumbLabel: 'SEO Group',
      parentCategory: 'None'
    }
    const list = db.saveCategory(defaultNew)
    setCategoriesList(list)
    setSelectedCategoryId(defaultNew.id || list[0].id)
  }

  const handleDeleteCategory = (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      const list = db.deleteCategory(id)
      setCategoriesList(list)
      if (list.length > 0) {
        setSelectedCategoryId(list[0].id)
      } else {
        setSelectedCategoryId(null)
        setSelectedCategory(null)
      }
    }
  }

  const handleSave = (e) => {
    if (e) e.preventDefault()
    const list = db.saveCategory(formData)
    setCategoriesList(list)
    setShowSavedToast(true)
    setTimeout(() => setShowSavedToast(false), 3000)
  }

  const getSeoMetrics = () => {
    let score = 40
    const checks = []

    if (formData.seoTitle) {
      const len = formData.seoTitle.length
      if (len >= 40 && len <= 60) {
        score += 20
        checks.push({ status: 'good', text: 'SEO Title length is excellent.' })
      } else {
        checks.push({ status: 'warning', text: `SEO Title is ${len} chars. Target 40-60.` })
      }
    } else {
      checks.push({ status: 'error', text: 'SEO Title tag is missing.' })
    }

    if (formData.seoDescription) {
      const len = formData.seoDescription.length
      if (len >= 120 && len <= 165) {
        score += 20
        checks.push({ status: 'good', text: 'Meta Description length is ideal.' })
      } else {
        checks.push({ status: 'warning', text: `Description is ${len} chars. Target 120-165.` })
      }
    } else {
      checks.push({ status: 'error', text: 'Meta Description is missing.' })
    }

    if (formData.focusKeyword) {
      const kw = formData.focusKeyword.toLowerCase()
      const titleLower = (formData.seoTitle || '').toLowerCase()
      if (titleLower.includes(kw)) {
        score += 20
        checks.push({ status: 'good', text: 'Focus Keyword matches in Title.' })
      } else {
        checks.push({ status: 'warning', text: 'Focus Keyword not found in Title.' })
      }
    }

    return { score, checks }
  }

  const { score, checks } = getSeoMetrics()

  const intentKeywords = [
    'Best Digital Marketing Company in Warangal',
    'SEO Services Warangal',
    'Website Development Company Warangal',
    'Social Media Marketing Warangal'
  ]

  const applyIntent = (kw) => {
    setFormData(prev => ({
      ...prev,
      focusKeyword: kw,
      seoTitle: `${prev.name} | ${kw}`,
      seoDescription: `Hire TSquadron for ${prev.name}. Explore dynamic ${kw} strategies built for local ROI growth.`
    }))
  }

  return (
    <div className="space-y-8 text-left max-w-6xl font-sans">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-heading font-black text-slate-900 text-2xl tracking-tight uppercase">Category SEO Panel</h1>
          <p className="text-slate-500 text-xs mt-1">Configure category slugs, canonicals, breadcrumbs, search index settings, and focus keywords.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleAddCategory}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-heading font-bold text-xs rounded-xl shadow-xs transition-all"
          >
            <FiPlus size={14} /> Add Category
          </button>
          <button
            onClick={handleSave}
            disabled={!selectedCategoryId}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-bold text-xs rounded-xl shadow-premium hover:shadow-hover-glow transition-all duration-300 disabled:opacity-50"
          >
            <FiSave size={14} />
            <span>Save Category SEO</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left List - 4 cols */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-5 shadow-premium max-h-[85vh] flex flex-col overflow-hidden">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-3 block border-b border-slate-100 mb-3">TSquadron Categories ({categoriesList.length})</span>
          <div className="space-y-2 overflow-y-auto flex-grow pr-1">
            {categoriesList.map((cat) => {
              const isSelected = Number(cat.id) === Number(selectedCategoryId)
              return (
                <div
                  key={cat.id}
                  className={`w-full p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                    isSelected ? 'bg-slate-900 border-slate-900 text-white shadow-premium' : 'bg-white border-slate-200/60 hover:bg-slate-50 text-slate-800'
                  }`}
                  onClick={() => setSelectedCategoryId(cat.id)}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'bg-brand-indigo/20 text-brand-indigo' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <FiFolder size={16} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold block truncate mt-0.5">{cat.name}</span>
                      <span className="text-[9px] block opacity-50 font-semibold mt-1">/categories/{cat.slug}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteCategory(cat.id)
                    }}
                    className={`p-1.5 rounded-lg border transition-all hover:bg-red-500 hover:text-white ${
                      isSelected ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-400'
                    }`}
                  >
                    <FiTrash2 size={12} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Center: Editor Form - 5 cols */}
        <form onSubmit={handleSave} className="lg:col-span-5 space-y-6">
          {selectedCategory ? (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-premium space-y-6">
              <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
                <FiLayers className="text-brand-indigo" size={16} /> Category Metadata
              </h3>

              {/* Name */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Category Display Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white font-semibold text-slate-800"
                />
              </div>

              {/* Focus Keyword & Recommendations */}
              <div className="space-y-3 text-left">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Focus Keyword</label>
                  <input
                    type="text"
                    name="focusKeyword"
                    value={formData.focusKeyword || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl space-y-1.5">
                  <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase block">Suggested Queries (Click to Apply)</span>
                  <div className="flex flex-wrap gap-1">
                    {intentKeywords.map((kw, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => applyIntent(kw)}
                        className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[9px] text-slate-600 font-bold hover:text-brand-indigo"
                      >
                        + {kw}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Slug */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Category URL Slug</label>
                <div className="flex gap-2">
                  <div className="flex-grow flex items-center border border-slate-200 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500">
                    <span className="shrink-0">/categories/</span>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      className="w-full bg-transparent border-none focus:outline-none p-0 pl-1 text-slate-800"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleRegenerateSlug}
                    className="px-3.5 py-2 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl flex items-center justify-center"
                  >
                    <FiRefreshCw size={14} />
                  </button>
                </div>
              </div>

              {/* SEO Title */}
              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">SEO Title Tag</label>
                  <span className={`text-[10px] font-bold ${formData.seoTitle.length > 60 ? 'text-amber-500' : 'text-slate-400'}`}>
                    {formData.seoTitle.length} / 60 chars
                  </span>
                </div>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                />
              </div>

              {/* SEO Description */}
              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Meta Description</label>
                  <span className={`text-[10px] font-bold ${formData.seoDescription.length > 165 ? 'text-amber-500' : 'text-slate-400'}`}>
                    {formData.seoDescription.length} / 165 chars
                  </span>
                </div>
                <textarea
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                />
              </div>

              {/* Breadcrumb Label & parent category */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-left">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Breadcrumb Label</label>
                  <input
                    type="text"
                    name="breadcrumbLabel"
                    value={formData.breadcrumbLabel || ''}
                    onChange={handleChange}
                    placeholder="Short nav title..."
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Parent Category</label>
                  <select
                    name="parentCategory"
                    value={formData.parentCategory}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg font-bold"
                  >
                    <option value="None">None (Root Category)</option>
                    {categoriesList.filter(c => c.id !== selectedCategory.id).map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Canonical */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Canonical URL</label>
                <input
                  type="text"
                  name="canonicalUrl"
                  value={formData.canonicalUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                />
              </div>

            </div>
          ) : (
            <div className="bg-white border rounded-3xl p-12 text-center text-slate-400 shadow-premium">
              Select or add a category on the left to start configuring.
            </div>
          )}
        </form>

        {/* Right Preview & Scorecard - 3 cols */}
        <div className="lg:col-span-3 space-y-6">
          {selectedCategory && (
            <>
              {/* Scorecard */}
              <div className="bg-white border border-slate-200/80 rounded-3xl shadow-premium p-6 sm:p-8 space-y-4 text-left">
                <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center justify-between pb-3 border-b border-slate-100">
                  <span>Category SEO Score</span>
                  <span className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold ${
                    score >= 80 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {score} / 100
                  </span>
                </h3>

                <div className="space-y-2 text-xs font-semibold max-h-[140px] overflow-y-auto">
                  {checks.map((chk, i) => (
                    <div key={i} className="flex gap-2 items-start text-slate-600">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        chk.status === 'good' ? 'bg-emerald-500' :
                        chk.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                      }`} />
                      <span>{chk.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Previews */}
              <div className="bg-white border border-slate-200/80 rounded-3xl shadow-premium p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2">
                    <FiSearch className="text-brand-indigo" size={16} /> Previews
                  </h3>

                  <div className="flex gap-1 items-center">
                    <div className="flex bg-slate-100 p-0.5 rounded-lg border">
                      <button
                        onClick={() => setActivePreviewTab('google')}
                        className={`px-2.5 py-1 text-[9px] font-bold rounded-md transition-all ${
                          activePreviewTab === 'google' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                        }`}
                      >
                        Google
                      </button>
                    </div>

                    {activePreviewTab === 'google' && (
                      <div className="flex bg-slate-100 p-0.5 rounded-lg border">
                        <button
                          type="button"
                          onClick={() => setPreviewDevice('desktop')}
                          className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                            previewDevice === 'desktop' ? 'bg-white text-slate-900' : 'text-slate-500'
                          }`}
                        >
                          D
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewDevice('mobile')}
                          className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                            previewDevice === 'mobile' ? 'bg-white text-slate-900' : 'text-slate-500'
                          }`}
                        >
                          M
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="min-h-[220px] flex items-center justify-center bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  {activePreviewTab === 'google' && (
                    <div className={`w-full font-sans text-left transition-all ${previewDevice === 'mobile' ? 'max-w-[320px] bg-white border border-slate-200 rounded-xl p-3 shadow-xs' : ''}`}>
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-white shadow-xs border flex items-center justify-center shrink-0">
                          <span className="text-xs font-black text-slate-800">T</span>
                        </div>
                        <div className="leading-none text-left">
                          <span className="text-[11px] font-medium text-slate-800 block">TSquadron Category</span>
                          <span className="text-[9px] text-slate-500 font-medium truncate max-w-[190px] block">
                            https://www.tsquadron.com/categories/{formData.slug || 'url'}/
                          </span>
                        </div>
                      </div>
                      <h4 className={`font-semibold text-[#1a0dab] hover:underline cursor-pointer leading-snug mt-1 truncate max-w-full ${previewDevice === 'mobile' ? 'text-xs' : 'text-[15px]'}`}>
                        {formData.seoTitle || 'Category Search Title'}
                      </h4>
                      <p className="text-xs text-[#4d5156] font-normal leading-relaxed line-clamp-2 mt-0.5">
                        {formData.seoDescription || 'Category metadata search snippet...'}
                      </p>
                      
                      {/* Breadcrumbs visual schema checker preview */}
                      <div className="flex items-center gap-1 mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-bold">
                        <span>Home</span>
                        <FiChevronRight size={10} />
                        {formData.parentCategory !== 'None' && (
                          <>
                            <span className="truncate max-w-[100px]">{formData.parentCategory}</span>
                            <FiChevronRight size={10} />
                          </>
                        )}
                        <span className="text-slate-600 truncate max-w-[120px]">{formData.breadcrumbLabel || formData.name}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

      </div>

      {/* Floating toast */}
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white border border-slate-800 shadow-2xl px-5 py-3 rounded-2xl flex items-center gap-3 animate-slide-in">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <FiCheck size={12} />
          </div>
          <span className="text-xs font-bold font-sans">Category SEO Settings Saved!</span>
        </div>
      )}
    </div>
  )
}
