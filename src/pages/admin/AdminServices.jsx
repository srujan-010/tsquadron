import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiLayers, FiCheck, FiPlus, FiTrash2, FiAlertCircle } from 'react-icons/fi'
import { db } from '../../lib/db'

export default function AdminServices() {
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    const list = db.getServices()
    setServices(list)
    if (list.length > 0) {
      setSelectedService(list[0])
    }
  }, [])

  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setSuccessMsg('')
  }

  const handleFieldChange = (field, value) => {
    setSelectedService(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFAQChange = (index, field, value) => {
    const updatedFaqs = [...selectedService.faqs]
    updatedFaqs[index][field] = value
    setSelectedService(prev => ({
      ...prev,
      faqs: updatedFaqs
    }))
  }

  const handleAddFAQ = () => {
    const updatedFaqs = [...(selectedService.faqs || [])]
    updatedFaqs.push({ q: 'New FAQ Question', a: 'New FAQ Answer Details' })
    setSelectedService(prev => ({
      ...prev,
      faqs: updatedFaqs
    }))
  }

  const handleRemoveFAQ = (index) => {
    const updatedFaqs = selectedService.faqs.filter((_, i) => i !== index)
    setSelectedService(prev => ({
      ...prev,
      faqs: updatedFaqs
    }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!selectedService) return

    const updated = db.saveService(selectedService)
    setServices(updated)
    setSuccessMsg('Service details updated successfully!')
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-heading font-black text-slate-900 tracking-tight">Services Editor</h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
          Modify core service lines, marketing copy, and FAQ components.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        {/* Left Column: Services list selector */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-4">
          <h3 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-50 pb-2">Service Lines</h3>
          <div className="space-y-2">
            {services.map((s) => {
              const isSelected = selectedService && selectedService.id === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => handleServiceSelect(s)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-semibold tracking-wide transition-all border ${ isSelected ? 'bg-slate-900 border-slate-950 text-white shadow-premium' : 'bg-white border-slate-100 hover:border-slate-200 text-slate-600' }`}
                >
                  <FiLayers size={14} className={isSelected ? 'text-brand-cyan' : 'text-brand-label'} />
                  <span className="truncate">{s.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Column: Edit form */}
        {selectedService ? (
          <form
            onSubmit={handleFormSubmit}
            className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="font-heading font-bold text-slate-900 text-sm">
                Configure {selectedService.title}
              </span>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-bold text-xs rounded-xl shadow-premium transition-all duration-300"
              >
                <FiCheck size={14} />
                <span>Save Config</span>
              </button>
            </div>

            {successMsg && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold flex items-center gap-2">
                <FiCheck size={16} />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Title & Tagline Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Service Title</label>
                <input
                  type="text"
                  value={selectedService.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all font-sans"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Marketing Tagline</label>
                <input
                  type="text"
                  value={selectedService.tagline}
                  onChange={(e) => handleFieldChange('tagline', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all font-sans"
                />
              </div>
            </div>

            {/* Description & CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Service Description Summary</label>
                <textarea
                  rows={3}
                  value={selectedService.desc}
                  onChange={(e) => handleFieldChange('desc', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all font-sans leading-relaxed"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">CTA Button Copy</label>
                <input
                  type="text"
                  value={selectedService.cta || ''}
                  onChange={(e) => handleFieldChange('cta', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all font-sans"
                />
              </div>
            </div>

            {/* FAQs Sub-editor */}
            <div className="space-y-4 border-t border-slate-100 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider">Service FAQ Component</h4>
                  <p className="text-brand-label text-[10px] mt-0.5">Toggle questions and descriptive answers for users.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddFAQ}
                  className="inline-flex items-center justify-center gap-1 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-heading font-semibold text-[10px] rounded-lg transition-all"
                >
                  <FiPlus size={12} />
                  <span>Add FAQ</span>
                </button>
              </div>

              {/* FAQs Listing */}
              <div className="space-y-4">
                {(selectedService.faqs || []).map((faq, index) => (
                  <div key={index} className="p-4 border border-slate-150 rounded-2xl bg-slate-50/40 relative space-y-3">
                    <button
                      type="button"
                      onClick={() => handleRemoveFAQ(index)}
                      className="absolute top-3 right-3 p-1.5 text-brand-label hover:text-red-500 hover:bg-white border border-transparent hover:border-slate-100 rounded-lg transition-all"
                      title="Remove FAQ"
                    >
                      <FiTrash2 size={12} />
                    </button>
                    
                    <div className="space-y-2 pr-6">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-brand-label uppercase tracking-wider block">Question</label>
                        <input
                          type="text"
                          value={faq.q}
                          onChange={(e) => handleFAQChange(index, 'q', e.target.value)}
                          className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-none focus:border-brand-indigo transition-all font-sans font-semibold"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-brand-label uppercase tracking-wider block">Answer Details</label>
                        <textarea
                          rows={2}
                          value={faq.a}
                          onChange={(e) => handleFAQChange(index, 'a', e.target.value)}
                          className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-none focus:border-brand-indigo transition-all font-sans leading-relaxed"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {(selectedService.faqs || []).length === 0 && (
                  <div className="text-center p-6 border border-dashed border-slate-200 rounded-2xl text-brand-label text-xs">
                    No FAQs added to this service directory yet.
                  </div>
                )}
              </div>
            </div>

          </form>
        ) : (
          <div className="lg:col-span-8 text-center py-12 text-brand-label">
            No service selected to customize.
          </div>
        )}
      </div>
    </div>
  )
}
