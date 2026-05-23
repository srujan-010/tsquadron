import React, { useState, useEffect } from 'react'
import { 
  FiSave, FiFileText, FiLayers, FiImage, FiSearch, 
  FiFacebook, FiCheck, FiX, FiRefreshCw, FiBookOpen 
} from 'react-icons/fi'
import { db } from '../../lib/db'

export default function AdminSeoBlogs() {
  const [blogsList, setBlogsList] = useState([])
  const [selectedBlogId, setSelectedBlogId] = useState(null)
  const [selectedBlog, setSelectedBlog] = useState(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keywords: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    slug: '',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  })

  const [activePreviewTab, setActivePreviewTab] = useState('google')
  const [showSavedToast, setShowSavedToast] = useState(false)
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false)
  const [mediaLibrary, setMediaLibrary] = useState([])

  // Load Blogs list
  useEffect(() => {
    const list = db.getBlogs()
    setBlogsList(list)
    if (list.length > 0 && !selectedBlogId) {
      setSelectedBlogId(list[0].id)
    }
  }, [])

  // Auto-generate slug function
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric
      .replace(/\s+/g, '-') // spaces to dashes
      .replace(/-+/g, '-') // collapse consecutive dashes
      .trim()
  }

  // Map database blog posts to their specific json file path
  const getBlogPath = (blog) => {
    if (!blog) return 'blogs/default.json'
    const hardcodedPaths = {
      1: 'blogs/types-of-visibility-in-digital-marketing.json',
      2: 'blogs/impact-of-online-reputation-management-on-seo.json',
      3: 'blogs/impact-of-ui-ux-design-on-user-engagement.json',
      4: 'blogs/future-of-email-marketing.json',
      5: 'blogs/top-10-link-building-strategies.json',
      6: 'blogs/future-of-social-media-marketing.json',
      7: 'blogs/role-of-design-systems-in-web-development.json',
      8: 'blogs/fundamentals-of-ui-ux-design.json',
      9: 'blogs/role-of-social-media-in-online-reputation-management.json',
      10: 'blogs/role-of-ai-in-email-marketing.json'
    }
    return hardcodedPaths[blog.id] || `blogs/${generateSlug(blog.title)}.json`
  }

  // Load specific Blog SEO on ID change
  useEffect(() => {
    if (!selectedBlogId) return
    const matchBlog = blogsList.find(b => b.id === Number(selectedBlogId))
    if (!matchBlog) return

    setSelectedBlog(matchBlog)

    const filePath = getBlogPath(matchBlog)
    const activeSlug = generateSlug(matchBlog.title)

    const data = db.getSeoFile(filePath, {
      title: `${matchBlog.title} | TSquadron`,
      description: matchBlog.excerpt || 'Read this informative article from TSquadron experts.',
      keywords: `digital marketing, ${matchBlog.category.toLowerCase()}, blogs`,
      canonicalUrl: `https://www.tsquadron.com/blog/${activeSlug}/`,
      ogTitle: `${matchBlog.title} | TSquadron`,
      ogDescription: matchBlog.excerpt || 'Read this informative article.',
      ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      slug: activeSlug,
      robotsIndex: 'index',
      robotsFollow: 'follow'
    })

    setFormData(data)
  }, [selectedBlogId, blogsList])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Regenerate slug manually
  const handleRegenerateSlug = () => {
    if (!selectedBlog) return
    const newSlug = generateSlug(selectedBlog.title)
    setFormData(prev => ({ 
      ...prev, 
      slug: newSlug,
      canonicalUrl: `https://www.tsquadron.com/blog/${newSlug}/`
    }))
  }

  const handleSelectMedia = (url) => {
    setFormData(prev => ({ ...prev, ogImage: url }))
    setIsMediaPickerOpen(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (!selectedBlog) return

    const filePath = getBlogPath(selectedBlog)
    db.saveSeoFile(filePath, formData)

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
          <h1 className="font-heading font-black text-slate-900 text-2xl tracking-tight uppercase">Blog SEO Panel</h1>
          <p className="text-slate-500 text-xs mt-1">Configure individual search parameters, preview cards, and auto-generated slugs for blog posts.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={!selectedBlogId}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-bold text-xs rounded-xl shadow-premium hover:shadow-hover-glow transition-all duration-300 shrink-0 disabled:opacity-50"
        >
          <FiSave size={14} />
          <span>Save Blog SEO</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Article Selector list - 4 cols */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-5 shadow-premium max-h-[70vh] flex flex-col overflow-hidden">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-3 block border-b border-slate-100 mb-3">TSquadron Publications ({blogsList.length})</span>
          <div className="space-y-2 overflow-y-auto flex-grow pr-1">
            {blogsList.map((blog) => {
              const isSelected = Number(blog.id) === Number(selectedBlogId)
              return (
                <button
                  key={blog.id}
                  onClick={() => setSelectedBlogId(blog.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-slate-900 border-slate-900 text-white shadow-premium'
                      : 'bg-white border-slate-200/60 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? 'bg-brand-indigo/20 text-brand-indigo' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <FiBookOpen size={16} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase block tracking-wider opacity-60">{blog.category}</span>
                    <span className="text-[11px] font-bold block truncate mt-0.5">{blog.title}</span>
                    <span className="text-[9px] block opacity-50 font-semibold mt-1">{blog.date}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Center: SEO Fields Form - 5 cols */}
        <form onSubmit={handleSave} className="lg:col-span-5 space-y-6">
          {selectedBlog ? (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-premium space-y-6">
              <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
                <FiFileText className="text-brand-indigo" size={16} /> Meta Configuration
              </h3>

              {/* URL Slug & Generator */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Blog URL Slug</label>
                <div className="flex gap-2">
                  <div className="flex-grow flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500">
                    <span className="shrink-0 select-none">/blog/</span>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      placeholder="url-slug-text"
                      className="w-full bg-transparent border-none focus:outline-none focus:ring-0 p-0 pl-1 font-semibold text-slate-800"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleRegenerateSlug}
                    title="Auto-Generate Slug from Blog Title"
                    className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-250 border border-slate-200 text-slate-700 rounded-xl transition-all flex items-center justify-center shrink-0"
                  >
                    <FiRefreshCw size={14} />
                  </button>
                </div>
                <span className="text-[10px] text-slate-400 font-medium block">Changing the slug modifies the canonical search mapping url.</span>
              </div>

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
                  placeholder="Article SEO Title..."
                  className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
                />
              </div>

              {/* Meta Description */}
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
                  placeholder="Write description excerpt..."
                  className="w-full px-4 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800 leading-relaxed"
                />
              </div>

              {/* Social Featured Image */}
              <div className="space-y-2 border-t border-slate-100 pt-5">
                <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block font-heading">Social Share / OG Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="ogImage"
                    value={formData.ogImage || ''}
                    onChange={handleChange}
                    placeholder="Featured image URL..."
                    className="flex-grow px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-indigo focus:border-brand-indigo font-semibold text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setMediaLibrary(db.getMedia())
                      setIsMediaPickerOpen(true)
                    }}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all"
                  >
                    Browse Vault
                  </button>
                </div>
                {formData.ogImage && (
                  <img src={formData.ogImage} alt="Featured Preview" className="w-full h-32 rounded-2xl border object-cover mt-2 shadow-xs" />
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white border rounded-3xl p-12 text-center text-slate-400 shadow-premium">
              Select an article on the left to start configuring metadata.
            </div>
          )}
        </form>

        {/* Right: Live Previews - 3 cols */}
        <div className="lg:col-span-3 space-y-6">
          {selectedBlog && (
            <div className="bg-white border border-slate-200/80 rounded-3xl shadow-premium p-6 sm:p-8 space-y-6 sticky top-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <FiSearch className="text-brand-indigo" size={16} /> Live Previews
                </h3>

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

              {/* Preview Window */}
              <div className="min-h-[220px] flex items-center justify-center bg-slate-50 rounded-2xl p-4 border border-slate-100">
                {activePreviewTab === 'google' ? (
                  <div className="w-full space-y-1.5 font-sans text-left">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-white shadow-xs border flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-black text-slate-800">T</span>
                      </div>
                      <div className="leading-none">
                        <span className="text-[11px] font-medium text-slate-800 block">TSquadron Insights</span>
                        <span className="text-[9px] text-slate-500 font-medium truncate max-w-[190px] block">
                          https://www.tsquadron.com/blog/{formData.slug}/
                        </span>
                      </div>
                    </div>
                    <h4 className="font-semibold text-[#1a0dab] hover:underline cursor-pointer text-[15px] leading-snug truncate max-w-full">
                      {formData.title || 'Blog Article Title'}
                    </h4>
                    <p className="text-xs text-[#4d5156] font-normal leading-relaxed line-clamp-2">
                      {formData.description || 'Article meta description snippet...'}
                    </p>
                  </div>
                ) : (
                  <div className="w-full border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-xs text-left">
                    <img
                      src={formData.ogImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'}
                      alt="Featured share card Preview"
                      className="w-full h-36 object-cover border-b"
                    />
                    <div className="p-3 space-y-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-sans">www.tsquadron.com</span>
                      <h5 className="text-[11px] font-bold text-slate-800 leading-snug truncate font-sans">
                        {formData.ogTitle || formData.title || 'Blog Share Title'}
                      </h5>
                      <p className="text-[10px] text-slate-500 leading-normal line-clamp-2 font-medium font-sans">
                        {formData.ogDescription || formData.description || 'Snippet excerpt'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 text-[10px] leading-relaxed flex gap-3 text-left">
                <FiCheck className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                <div>
                  <span className="font-bold text-slate-800 block mb-0.5">Auto Slug Hook</span>
                  Custom slugs automatically bind onto router links, immediately aligning with search crawlers dynamically.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Media Vault Picker Modal */}
      {isMediaPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" onClick={() => setIsMediaPickerOpen(false)} />
          <div className="bg-white rounded-3xl border shadow-2xl w-full max-w-2xl relative z-10 max-h-[85vh] flex flex-col overflow-hidden">
            
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Vault Browser</span>
                <h3 className="font-heading font-black text-slate-900 text-lg uppercase tracking-tight">Select Blog featured image</h3>
              </div>
              <button
                onClick={() => setIsMediaPickerOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-grow bg-slate-50">
              {mediaLibrary.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <FiImage className="mx-auto text-slate-300" size={48} />
                  <p className="text-xs text-slate-500 font-semibold">Your TSquadron media vault is empty.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
                  {mediaLibrary.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectMedia(item.url)}
                      className="group border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-premium hover:border-brand-indigo/60 cursor-pointer transition-all duration-300 relative"
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
          <span className="text-xs font-bold font-sans">Blog SEO Configurations Saved!</span>
        </div>
      )}
    </div>
  )
}
