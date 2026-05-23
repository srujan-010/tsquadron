import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiPlus, FiEdit2, FiTrash2, FiSearch, FiGlobe, 
  FiFileText, FiCheck, FiX, FiBold, FiItalic, FiLink, FiList, FiEye 
} from 'react-icons/fi'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { db } from '../../lib/db'

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    slug: '',
    category: 'SEO',
    excerpt: '',
    content: '',
    featured: false,
    readTime: '5 min read',
  })

  useEffect(() => {
    setBlogs(db.getBlogs())
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false })
    ],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, content: editor.getHTML() }))
    }
  })

  useEffect(() => {
    if (editor && isEditing) {
      editor.commands.setContent(formData.content || '')
    }
  }, [formData.id, isEditing, editor])

  // Auto-generate URL slug from title
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  const handleTitleChange = (e) => {
    const title = e.target.value
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }))
  }

  const handleEditClick = (blog) => {
    setFormData({
      id: blog.id,
      title: blog.title,
      slug: blog.slug || generateSlug(blog.title),
      category: blog.category,
      excerpt: blog.excerpt,
      content: blog.content,
      featured: blog.featured || false,
      readTime: blog.readTime || '5 min read'
    })
    setIsEditing(true)
  }

  const handleCreateNewClick = () => {
    setFormData({
      id: null,
      title: '',
      slug: '',
      category: 'SEO',
      excerpt: '',
      content: '',
      featured: false,
      readTime: '5 min read'
    })
    setIsEditing(true)
  }

  const handleDeleteClick = (id) => {
    if (window.confirm('Delete this article from the website index?')) {
      const updated = db.deleteBlog(id)
      setBlogs(updated)
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in Title and Content details.')
      return
    }

    const updated = db.saveBlog(formData)
    setBlogs(updated)
    setIsEditing(false)
  }

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8 font-sans">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-black text-slate-900 tracking-tight">Blog Manager</h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
            Create and edit articles that display on the public insights page.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={handleCreateNewClick}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-bold text-xs rounded-xl shadow-premium transition-all duration-300"
          >
            <FiPlus size={16} />
            <span>Create Article</span>
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isEditing ? (
          /* Create / Edit Form View */
          <motion.form
            key="edit-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            onSubmit={handleFormSubmit}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left"
          >
            {/* Left Fields Column */}
            <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="font-heading font-bold text-slate-900 text-sm">
                  {formData.id ? 'Modify Existing Article' : 'Draft New Article'}
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-brand-label hover:text-slate-600 font-semibold"
                >
                  Cancel
                </button>
              </div>

              {/* Title input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Article Title</label>
                <input
                  type="text"
                  placeholder="e.g. 5 SEO strategies that convert"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all"
                  required
                />
              </div>

              {/* Slug / Read Time Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">URL Slug</label>
                  <input
                    type="text"
                    placeholder="url-slug-format"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: generateSlug(e.target.value) })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all font-mono"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Reading Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 min read"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Excerpt details */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Excerpt / Meta Description</label>
                <textarea
                  rows={2}
                  placeholder="Short marketing hook summary for cards and search indexes..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all"
                />
              </div>

              {/* Rich-text content container */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Body Content</label>
                  
                  {/* Styled Formatting Toolbar helpers */}
                  <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                    <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} className={`p-1.5 rounded transition-colors ${editor?.isActive('bold') ? 'text-brand-indigo bg-brand-indigo/10' : 'text-slate-600 hover:text-brand-indigo hover:bg-white'}`} title="Bold"><FiBold size={13} /></button>
                    <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} className={`p-1.5 rounded transition-colors ${editor?.isActive('italic') ? 'text-brand-indigo bg-brand-indigo/10' : 'text-slate-600 hover:text-brand-indigo hover:bg-white'}`} title="Italic"><FiItalic size={13} /></button>
                    <button type="button" onClick={toggleLink} className={`p-1.5 rounded transition-colors ${editor?.isActive('link') ? 'text-brand-indigo bg-brand-indigo/10' : 'text-slate-600 hover:text-brand-indigo hover:bg-white'}`} title="Hyperlink"><FiLink size={13} /></button>
                    <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} className={`p-1.5 rounded transition-colors ${editor?.isActive('bulletList') ? 'text-brand-indigo bg-brand-indigo/10' : 'text-slate-600 hover:text-brand-indigo hover:bg-white'}`} title="Bullet List"><FiList size={13} /></button>
                  </div>
                </div>

                <div className="w-full bg-slate-50 border border-slate-200 rounded-xl focus-within:border-brand-indigo focus-within:bg-white transition-all overflow-hidden min-h-[300px]">
                  <EditorContent 
                    editor={editor} 
                    className="prose prose-sm prose-slate max-w-none p-4 focus:outline-none h-full"
                  />
                </div>
              </div>
            </div>

            {/* Right Meta Settings Column */}
            <div className="lg:col-span-4 space-y-6">
              {/* Category, Status & Action Card */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-5">
                <h4 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-50 pb-2">Publish Settings</h4>
                
                {/* Category select dropdown */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Category Segment</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all"
                  >
                    <option>Digital Marketing</option>
                    <option>SEO</option>
                    <option>Social Media Marketing</option>
                    <option>Email Marketing</option>
                    <option>ORM</option>
                    <option>UI/UX</option>
                    <option>Web Development</option>
                  </select>
                </div>

                {/* Featured checkbox toggle */}
                <div className="flex items-center gap-3 py-2">
                  <input
                    type="checkbox"
                    id="featured-checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4.5 h-4.5 border border-slate-300 rounded focus:ring-0 focus:outline-none text-brand-indigo cursor-pointer"
                  />
                  <label htmlFor="featured-checkbox" className="text-xs text-slate-600 font-semibold cursor-pointer select-none">
                    Feature on Homepage Carousel
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-heading font-semibold text-xs rounded-xl transition-all text-center"
                  >
                    Dismiss
                  </button>
                  <button
                    type="submit"
                    className="py-3 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-semibold text-xs rounded-xl shadow-premium transition-all text-center"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              {/* SEO Search snippet preview box */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
                  <FiGlobe size={14} className="text-brand-label" />
                  <span className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider">SEO Snippet Preview</span>
                </div>
                <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-1 font-sans">
                  <span className="text-[10px] text-brand-label block truncate">https://tsquadron.com/blog/{formData.slug || 'slug-url'}</span>
                  <span className="text-sm font-semibold text-blue-800 block leading-tight hover:underline cursor-pointer truncate">
                    {formData.title || 'Draft Article Title'}
                  </span>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {formData.excerpt || 'Excerpt description text will show up here to summarize search queries.'}
                  </p>
                </div>
              </div>
            </div>
          </motion.form>
        ) : (
          /* Blogs List View */
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Search Box filter panel */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-premium">
              <div className="relative max-w-md">
                <input
                  type="text"
                  placeholder="Filter by title, tag..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo/15 rounded-xl text-slate-800 text-xs focus:outline-none transition-all"
                />
                <FiSearch className="absolute left-3.5 top-3.5 text-brand-label" size={14} />
              </div>
            </div>

            {/* List Grid */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] text-brand-label uppercase font-bold text-left tracking-wider">
                      <th className="pb-3 pl-3">Article Title</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Publish Date</th>
                      <th className="pb-3">Homepage Feature</th>
                      <th className="pb-3 pr-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBlogs.map((blog) => (
                      <tr key={blog.id} className="border-b border-slate-100/50 hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 pl-3">
                          <span className="font-semibold text-slate-800 block text-sm">{blog.title}</span>
                          <span className="text-brand-label font-mono text-[10px]">/blog/{blog.slug || generateSlug(blog.title)}</span>
                        </td>
                        <td className="py-4">
                          <span className="px-2.5 py-1 rounded-full text-[9px] font-bold font-heading bg-brand-indigo/5 text-brand-indigo border border-brand-indigo/10">
                            {blog.category}
                          </span>
                        </td>
                        <td className="py-4 text-slate-600 font-sans">{blog.date}</td>
                        <td className="py-4">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${blog.featured ? 'text-brand-indigo' : 'text-brand-label'}`}>
                            {blog.featured ? 'Featured ★' : 'Standard'}
                          </span>
                        </td>
                        <td className="py-4 pr-3 text-right space-x-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleEditClick(blog)}
                            className="p-2 text-slate-600 hover:text-brand-indigo hover:bg-slate-50 rounded-xl transition-all"
                            title="Edit Article"
                          >
                            <FiEdit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(blog.id)}
                            className="p-2 text-brand-label hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            title="Delete Article"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {filteredBlogs.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-12 text-brand-label">
                          No matching blog articles found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
