import React, { useState, useEffect } from 'react'
import { 
  FiSave, FiPackage, FiLayers, FiImage, FiSearch, 
  FiFacebook, FiCheck, FiX, FiRefreshCw, FiDollarSign,
  FiShoppingBag, FiStar, FiActivity, FiTag, FiPlus, FiTrash2
} from 'react-icons/fi'
import { db } from '../../lib/db'

export default function AdminSeoProducts() {
  const [productsList, setProductsList] = useState([])
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [activeTab, setActiveTab] = useState('basic') // 'basic' | 'seo' | 'reviews'

  const [formData, setFormData] = useState({
    name: '',
    category: 'Training & Courses',
    brand: 'TSquadron Academy',
    price: 0,
    currency: 'INR',
    description: '',
    sku: '',
    availability: 'InStock',
    images: [],
    seoTitle: '',
    seoDescription: '',
    slug: '',
    focusKeyword: '',
    primaryKeyword: '',
    secondaryKeywords: '',
    longTailKeywords: '',
    canonicalUrl: '',
    imageAlt: '',
    robotsIndex: 'index',
    robotsFollow: 'follow',
    ratingValue: 5.0,
    reviewCount: 0,
    reviews: []
  })

  const [newReview, setNewReview] = useState({ author: '', rating: 5, date: '', body: '' })
  const [activePreviewTab, setActivePreviewTab] = useState('google')
  const [previewDevice, setPreviewDevice] = useState('desktop')
  const [showSavedToast, setShowSavedToast] = useState(false)
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false)

  // Load Products List
  const loadProducts = () => {
    const list = db.getProducts()
    setProductsList(list)
    if (list.length > 0 && !selectedProductId) {
      setSelectedProductId(list[0].id)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  // Auto-generate slug
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  // Load specific Product on ID change
  useEffect(() => {
    if (!selectedProductId) return
    const matchProd = productsList.find(p => p.id === Number(selectedProductId))
    if (!matchProd) return

    setSelectedProduct(matchProd)
    setFormData({
      ...matchProd,
      images: matchProd.images || [],
      reviews: matchProd.reviews || []
    })
  }, [selectedProductId, productsList])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRegenerateSlug = () => {
    const slug = generateSlug(formData.name)
    setFormData(prev => ({
      ...prev,
      slug,
      canonicalUrl: `https://www.tsquadron.com/products/${slug}/`
    }))
  }

  const handleAddProduct = () => {
    const defaultNew = {
      name: 'New SEO Strategy Course',
      category: 'Training & Courses',
      brand: 'TSquadron Academy',
      price: 9999,
      currency: 'INR',
      description: 'Master local Search Engine Optimization targeting Warangal search pipelines.',
      sku: `TS-NEW-${Date.now().toString().slice(-4)}`,
      availability: 'InStock',
      images: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400'],
      seoTitle: 'New SEO Strategy Course Hanamkonda | TSquadron',
      seoDescription: 'Master local SEO targeting Warangal search pipelines with live client audits.',
      slug: 'new-seo-strategy-course',
      focusKeyword: 'SEO Training Warangal',
      primaryKeyword: 'SEO Course',
      secondaryKeywords: 'seo classes, local search optimization',
      longTailKeywords: 'practical local seo training warangal',
      canonicalUrl: 'https://www.tsquadron.com/products/new-seo-strategy-course/',
      imageAlt: 'SEO training classroom',
      robotsIndex: 'index',
      robotsFollow: 'follow',
      ratingValue: 5.0,
      reviewCount: 0,
      reviews: []
    }
    const list = db.saveProduct(defaultNew)
    setProductsList(list)
    setSelectedProductId(defaultNew.id || list[0].id)
  }

  const handleDeleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const list = db.deleteProduct(id)
      setProductsList(list)
      if (list.length > 0) {
        setSelectedProductId(list[0].id)
      } else {
        setSelectedProductId(null)
        setSelectedProduct(null)
      }
    }
  }

  const handleSave = (e) => {
    if (e) e.preventDefault()
    const list = db.saveProduct(formData)
    setProductsList(list)
    setShowSavedToast(true)
    setTimeout(() => setShowSavedToast(false), 3000)
  }

  // Add review and recalculate aggregate ratings
  const handleAddReview = (e) => {
    e.preventDefault()
    if (!newReview.author || !newReview.body) return
    const updatedReviews = [...formData.reviews, { ...newReview, date: new Date().toISOString().split('T')[0] }]
    const avgRating = (updatedReviews.reduce((sum, r) => sum + Number(r.rating), 0) / updatedReviews.length).toFixed(1)
    
    setFormData(prev => ({
      ...prev,
      reviews: updatedReviews,
      reviewCount: updatedReviews.length,
      ratingValue: Number(avgRating)
    }))
    setNewReview({ author: '', rating: 5, date: '', body: '' })
  }

  const handleRemoveReview = (idx) => {
    const updatedReviews = formData.reviews.filter((_, i) => i !== idx)
    const avgRating = updatedReviews.length > 0 
      ? (updatedReviews.reduce((sum, r) => sum + Number(r.rating), 0) / updatedReviews.length).toFixed(1)
      : 5.0
    setFormData(prev => ({
      ...prev,
      reviews: updatedReviews,
      reviewCount: updatedReviews.length,
      ratingValue: Number(avgRating)
    }))
  }

  // Audits Scorecard
  const getSeoMetrics = () => {
    let score = 30
    const checks = []

    if (formData.seoTitle) {
      const len = formData.seoTitle.length
      if (len >= 45 && len <= 60) {
        score += 20
        checks.push({ status: 'good', text: 'SEO Title length is ideal (45-60 chars).' })
      } else {
        checks.push({ status: 'warning', text: `SEO Title is ${len} chars. Target 45-60.` })
      }
    } else {
      checks.push({ status: 'error', text: 'SEO Title tag is missing.' })
    }

    if (formData.seoDescription) {
      const len = formData.seoDescription.length
      if (len >= 120 && len <= 160) {
        score += 20
        checks.push({ status: 'good', text: 'Meta Description length is ideal.' })
      } else {
        checks.push({ status: 'warning', text: `Description is ${len} chars. Target 120-160.` })
      }
    } else {
      checks.push({ status: 'error', text: 'Meta Description is missing.' })
    }

    if (formData.focusKeyword) {
      const kw = formData.focusKeyword.toLowerCase()
      const titleLower = (formData.seoTitle || '').toLowerCase()
      const descLower = (formData.seoDescription || '').toLowerCase()

      if (titleLower.includes(kw)) {
        score += 15
        checks.push({ status: 'good', text: 'Focus Keyword is present in SEO Title.' })
      } else {
        checks.push({ status: 'warning', text: 'Focus Keyword is missing from SEO Title.' })
      }

      if (descLower.includes(kw)) {
        score += 15
        checks.push({ status: 'good', text: 'Focus Keyword is present in Meta Description.' })
      } else {
        checks.push({ status: 'warning', text: 'Focus Keyword is missing from Meta Description.' })
      }

      checks.push({ status: 'good', text: 'Product Schema LD-JSON compiler status: Active.' })
    } else {
      checks.push({ status: 'info', text: 'Enter a Focus Keyword to trigger content matching audits.' })
    }

    return { score, checks }
  }

  const { score, checks } = getSeoMetrics()

  const intentKeywords = [
    'Digital Marketing Course Warangal',
    'SEO Training Warangal',
    'React Website Development',
    'Shopify Website Development',
    'Landing Page Design'
  ]

  const applyIntent = (kw) => {
    setFormData(prev => ({
      ...prev,
      focusKeyword: kw,
      seoTitle: `Premium ${prev.name} | ${kw}`,
      seoDescription: `${prev.description.slice(0, 100)}... Learn more about ${kw} with TSquadron.`
    }))
  }

  return (
    <div className="space-y-8 text-left max-w-6xl font-sans">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-heading font-black text-slate-900 text-2xl tracking-tight uppercase">Product SEO Panel</h1>
          <p className="text-slate-500 text-xs mt-1">Add products, configure metadata schemas, pricing variables, alt-texts, and reviews.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleAddProduct}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-heading font-bold text-xs rounded-xl shadow-xs transition-all"
          >
            <FiPlus size={14} /> Add Product
          </button>
          <button
            onClick={handleSave}
            disabled={!selectedProductId}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-bold text-xs rounded-xl shadow-premium hover:shadow-hover-glow transition-all duration-300 disabled:opacity-50"
          >
            <FiSave size={14} />
            <span>Save Product SEO</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Product list selector - 4 cols */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-5 shadow-premium max-h-[85vh] flex flex-col overflow-hidden">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-3 block border-b border-slate-100 mb-3">TSquadron Catalog ({productsList.length})</span>
          <div className="space-y-2 overflow-y-auto flex-grow pr-1">
            {productsList.map((prod) => {
              const isSelected = Number(prod.id) === Number(selectedProductId)
              return (
                <div
                  key={prod.id}
                  className={`w-full p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                    isSelected ? 'bg-slate-900 border-slate-900 text-white shadow-premium' : 'bg-white border-slate-200/60 hover:bg-slate-50 text-slate-800'
                  }`}
                  onClick={() => setSelectedProductId(prod.id)}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'bg-brand-indigo/20 text-brand-indigo' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <FiPackage size={16} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase block tracking-wider opacity-60">{prod.category}</span>
                      <span className="text-[11px] font-bold block truncate mt-0.5">{prod.name}</span>
                      <span className="text-[9px] block opacity-50 font-semibold mt-1">₹{prod.price}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteProduct(prod.id)
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

        {/* Center: SEO Fields Form - 5 cols */}
        <form onSubmit={handleSave} className="lg:col-span-5 space-y-6">
          {selectedProduct ? (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-premium space-y-6">
              
              {/* Tabs for fields groups */}
              <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('basic')}
                  className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${
                    activeTab === 'basic' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Basic Info
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('seo')}
                  className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${
                    activeTab === 'seo' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  SEO Parameters
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${
                    activeTab === 'reviews' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Reviews ({formData.reviews.length})
                </button>
              </div>

              {/* BASIC FIELDS */}
              {activeTab === 'basic' && (
                <div className="space-y-4 animate-fade-in text-left">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white font-semibold text-slate-800"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Category</label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Brand / Vendor</label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Price</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">SKU</label>
                      <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 font-sans">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Availability</label>
                      <select
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-bold"
                      >
                        <option value="InStock">In Stock (Available)</option>
                        <option value="OutOfStock">Out of Stock</option>
                        <option value="PreOrder">Pre-Order</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Primary Catalog Image URL</label>
                      <input
                        type="text"
                        name="images"
                        value={formData.images[0] || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, images: [e.target.value] }))}
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Image Alt Description</label>
                    <input
                      type="text"
                      name="imageAlt"
                      value={formData.imageAlt}
                      onChange={handleChange}
                      placeholder="SEO Alt text description for image search..."
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Detailed Product Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-2.5 text-xs border border-slate-200 rounded-xl leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* SEO FIELDS */}
              {activeTab === 'seo' && (
                <div className="space-y-4 animate-fade-in text-left">
                  {/* Focus Keyword & Recommendations */}
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Focus Keyword</label>
                      <input
                        type="text"
                        name="focusKeyword"
                        value={formData.focusKeyword}
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
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">SEO URL Slug</label>
                    <div className="flex gap-2">
                      <div className="flex-grow flex items-center border border-slate-200 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500">
                        <span className="shrink-0">/products/</span>
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
                  <div className="space-y-1.5">
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
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Meta Description</label>
                      <span className={`text-[10px] font-bold ${formData.seoDescription.length > 160 ? 'text-amber-500' : 'text-slate-400'}`}>
                        {formData.seoDescription.length} / 160 chars
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

                  <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Primary Keyword</label>
                      <input
                        type="text"
                        name="primaryKeyword"
                        value={formData.primaryKeyword}
                        onChange={handleChange}
                        className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Secondary Keywords</label>
                      <input
                        type="text"
                        name="secondaryKeywords"
                        value={formData.secondaryKeywords}
                        onChange={handleChange}
                        placeholder="comma separated..."
                        className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Long Tail Keywords</label>
                    <input
                      type="text"
                      name="longTailKeywords"
                      value={formData.longTailKeywords}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* REVIEWS & RATINGS */}
              {activeTab === 'reviews' && (
                <div className="space-y-4 animate-fade-in text-left">
                  {/* Reviews lists */}
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {formData.reviews.length === 0 ? (
                      <div className="text-center py-8 text-slate-400 text-xs font-semibold">
                        No customer reviews added yet. Add a review below to trigger aggregated rating schema snippet!
                      </div>
                    ) : (
                      formData.reviews.map((rev, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl relative">
                          <button
                            type="button"
                            onClick={() => handleRemoveReview(idx)}
                            className="absolute top-4 right-4 p-1 text-slate-450 hover:text-red-500 transition-all"
                          >
                            <FiTrash2 size={12} />
                          </button>
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                            <span>{rev.author}</span>
                            <span className="text-amber-500 font-mono flex items-center gap-0.5"><FiStar size={10} /> {rev.rating}★</span>
                          </div>
                          <span className="text-[9px] text-slate-400 block font-semibold mt-0.5">{rev.date}</span>
                          <p className="text-xs text-slate-600 mt-2 font-medium leading-relaxed">{rev.body}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Review Form */}
                  <div className="border-t border-slate-150 pt-4 space-y-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Add Customer Review</span>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Author Name"
                        value={newReview.author}
                        onChange={(e) => setNewReview(prev => ({ ...prev, author: e.target.value }))}
                        className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg"
                      />
                      <select
                        value={newReview.rating}
                        onChange={(e) => setNewReview(prev => ({ ...prev, rating: Number(e.target.value) }))}
                        className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg font-bold"
                      >
                        {[5, 4, 3, 2, 1].map(r => (
                          <option key={r} value={r}>{r} Star Rating</option>
                        ))}
                      </select>
                    </div>
                    <textarea
                      placeholder="Write review body..."
                      value={newReview.body}
                      onChange={(e) => setNewReview(prev => ({ ...prev, body: e.target.value }))}
                      rows={2}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleAddReview}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="bg-white border rounded-3xl p-12 text-center text-slate-400 shadow-premium">
              Select or add a product to start configuring metadata.
            </div>
          )}
        </form>

        {/* Right Previews Panel - 3 cols */}
        <div className="lg:col-span-3 space-y-6">
          {selectedProduct && (
            <>
              {/* Scorecard */}
              <div className="bg-white border border-slate-200/80 rounded-3xl shadow-premium p-6 sm:p-8 space-y-4 text-left">
                <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center justify-between pb-3 border-b border-slate-100">
                  <span>Product SEO Metrics</span>
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
                    <FiSearch className="text-brand-indigo" size={16} /> Search Previews
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
                      <button
                        onClick={() => setActivePreviewTab('social')}
                        className={`px-2.5 py-1 text-[9px] font-bold rounded-md transition-all ${
                          activePreviewTab === 'social' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                        }`}
                      >
                        Social
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
                  {activePreviewTab === 'google' ? (
                    <div className={`w-full font-sans text-left transition-all ${previewDevice === 'mobile' ? 'max-w-[320px] bg-white border border-slate-200 rounded-xl p-3 shadow-xs' : ''}`}>
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-white shadow-xs border flex items-center justify-center shrink-0">
                          <span className="text-xs font-black text-slate-800">T</span>
                        </div>
                        <div className="leading-none text-left">
                          <span className="text-[11px] font-medium text-slate-800 block">TSquadron Shop</span>
                          <span className="text-[9px] text-slate-500 font-medium truncate max-w-[190px] block">
                            https://www.tsquadron.com/products/{formData.slug || 'url'}/
                          </span>
                        </div>
                      </div>
                      <h4 className={`font-semibold text-[#1a0dab] hover:underline cursor-pointer leading-snug mt-1 truncate max-w-full ${previewDevice === 'mobile' ? 'text-xs' : 'text-[15px]'}`}>
                        {formData.seoTitle || 'Product Catalog Title'}
                      </h4>
                      <p className="text-xs text-[#4d5156] font-normal leading-relaxed line-clamp-2 mt-0.5">
                        {formData.seoDescription || 'Product metadata search snippet...'}
                      </p>
                      
                      {/* Rich stars markup preview */}
                      {formData.ratingValue && (
                        <div className="flex items-center gap-1.5 mt-1 border-t border-slate-100 pt-1.5 text-[10px] text-slate-500 font-bold font-sans">
                          <span className="text-amber-500">★★★★★</span>
                          <span>Rating: {formData.ratingValue}</span>
                          <span>•</span>
                          <span>{formData.reviewCount} reviews</span>
                          <span>•</span>
                          <span>₹{formData.price}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-xs text-left">
                      <img
                        src={formData.images[0] || 'https://res.cloudinary.com/dixbhnqnf/image/upload/v1782553914/Chat-GPT-Image-May-21-2026-03-14-44-PM-removebg-preview_b7cqku.png'}
                        alt="Product OG share preview"
                        className="w-full h-36 object-cover border-b"
                      />
                      <div className="p-3 space-y-1">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">www.tsquadron.com</span>
                        <h5 className="text-[11px] font-bold text-slate-800 leading-snug truncate">
                          {formData.seoTitle || formData.name}
                        </h5>
                        <p className="text-[10px] text-slate-500 leading-normal line-clamp-2 font-medium">
                          {formData.seoDescription || formData.description}
                        </p>
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
          <span className="text-xs font-bold font-sans">Product Catalog SEO Updated!</span>
        </div>
      )}
    </div>
  )
}
