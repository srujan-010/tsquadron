import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiCheck, FiX, FiMessageSquare, FiStar } from 'react-icons/fi'
import { db } from '../../lib/db'

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    company: '',
    rating: 5,
    text: '',
    photo: '',
    featured: false,
    approved: true
  })

  useEffect(() => {
    setTestimonials(db.getTestimonials())
  }, [])

  const handleEditClick = (t) => {
    setFormData({
      id: t.id,
      name: t.name,
      company: t.company,
      rating: t.rating || 5,
      text: t.text,
      photo: t.photo || '',
      featured: t.featured || false,
      approved: t.approved !== undefined ? t.approved : true
    })
    setIsEditing(true)
    setSuccessMsg('')
  }

  const handleCreateNewClick = () => {
    setFormData({
      id: null,
      name: '',
      company: '',
      rating: 5,
      text: '',
      photo: '',
      featured: false,
      approved: true
    })
    setIsEditing(true)
    setSuccessMsg('')
  }

  const handleDeleteClick = (id) => {
    if (window.confirm('Delete this client testimonial permanently?')) {
      const updated = db.deleteTestimonial(id)
      setTestimonials(updated)
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.text.trim()) {
      alert('Please input Reviewer Name and Testimony content.')
      return
    }

    const updated = db.saveTestimonial(formData)
    setTestimonials(updated)
    setIsEditing(false)
    setSuccessMsg('Testimonial database synchronized successfully!')
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-black text-slate-900 tracking-tight">Testimonials Manager</h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
            Approve reviews and edit scores displayed on the homepage.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={handleCreateNewClick}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-bold text-xs rounded-xl shadow-premium transition-all duration-300"
          >
            <FiPlus size={16} />
            <span>Add Testimonial</span>
          </button>
        )}
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold flex items-center gap-2 max-w-md">
          <FiCheck size={16} />
          <span>{successMsg}</span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {isEditing ? (
          /* Editor card */
          <motion.form
            key="edit-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            onSubmit={handleFormSubmit}
            className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-6 max-w-2xl text-left"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="font-heading font-bold text-slate-900 text-sm">
                {formData.id ? 'Modify Testimonial' : 'Register New Testimonial'}
              </span>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-xs text-brand-label hover:text-slate-600 font-semibold"
              >
                Cancel
              </button>
            </div>

            {/* Name & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Client Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Company / Designation</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Corp"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Rating Selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Star Rating</label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="p-1 text-slate-300 hover:text-yellow-500 transition-colors"
                  >
                    <FiStar 
                      size={22} 
                      className={star <= formData.rating ? 'fill-yellow-500 text-yellow-500' : 'text-slate-300'} 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Testimonial Text */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Review Text</label>
              <textarea
                rows={4}
                placeholder="Paste the details of client reviews, comments, or emails..."
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all leading-relaxed font-sans"
                required
              />
            </div>

            {/* Media Upload (Photo/Video URL) */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Profile Image / Video URL</label>
              <input
                type="text"
                placeholder="e.g. https://images.unsplash.com/... or YouTube link"
                value={formData.photo}
                onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all"
              />
            </div>

            {/* Approval Toggle */}
            <div className="flex items-center gap-6 border-t border-slate-100 pt-5">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="approved-checkbox"
                  checked={formData.approved}
                  onChange={(e) => setFormData({ ...formData, approved: e.target.checked })}
                  className="w-4.5 h-4.5 text-brand-indigo border border-slate-300 rounded focus:ring-0 focus:outline-none cursor-pointer"
                />
                <label htmlFor="approved-checkbox" className="text-xs text-slate-600 font-semibold cursor-pointer select-none">
                  Approve for live website display (Active)
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4.5 h-4.5 text-brand-indigo border border-slate-300 rounded focus:ring-0 focus:outline-none cursor-pointer"
                />
                <label htmlFor="featured-checkbox" className="text-xs text-slate-600 font-semibold cursor-pointer select-none">
                  Pin to top of carousel (Featured)
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-heading font-semibold text-xs rounded-xl transition-all"
              >
                Dismiss
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-semibold text-xs rounded-xl shadow-premium transition-all"
              >
                Sync Data
              </button>
            </div>
          </motion.form>
        ) : (
          /* List of testimonials */
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium"
          >
            <div className="overflow-x-auto w-full">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] text-brand-label uppercase font-bold text-left tracking-wider">
                    <th className="pb-3 pl-3">Client details</th>
                    <th className="pb-3">Testimony</th>
                    <th className="pb-3">Rating</th>
                    <th className="pb-3">Website Display</th>
                    <th className="pb-3 pr-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((t) => (
                    <tr key={t.id} className="border-b border-slate-100/50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 pl-3">
                        <span className="font-semibold text-slate-800 block text-sm">{t.name}</span>
                        <span className="text-brand-label font-sans">{t.company}</span>
                      </td>
                      <td className="py-4 text-slate-600 max-w-[280px] truncate font-sans">
                        “{t.text}”
                      </td>
                      <td className="py-4 font-sans text-yellow-500 font-bold">
                        {t.rating} ★
                      </td>
                      <td className="py-4">
                        <div className="flex flex-col gap-1 items-start">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold font-heading border ${ t.approved ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-brand-label border-slate-200' }`}>
                            {t.approved ? 'Approved' : 'Hidden'}
                          </span>
                          {t.featured && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold font-heading border bg-brand-indigo/10 text-brand-indigo border-brand-indigo/20">
                              Pinned
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 pr-3 text-right space-x-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleEditClick(t)}
                          className="p-2 text-slate-600 hover:text-brand-indigo hover:bg-slate-50 rounded-xl transition-all"
                          title="Edit Review"
                        >
                          <FiEdit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(t.id)}
                          className="p-2 text-brand-label hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          title="Delete Review"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {testimonials.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-12 text-brand-label">
                        No testimonials registered.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
