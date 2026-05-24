import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck, FiMessageSquare, FiUser, FiBriefcase } from 'react-icons/fi'
import { db } from '../lib/db'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Search Engine Optimization',
    company: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    let tempErrors = {}
    if (!formData.name.trim()) tempErrors.name = "Full name is required."
    
    if (!formData.email.trim()) {
      tempErrors.email = "Business email is required."
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please input a valid email address."
    }
    
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required."
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.trim())) {
      tempErrors.phone = "Please input a valid phone number (10-15 digits)."
    }
    
    if (!formData.service.trim()) {
      tempErrors.service = "Please select a service."
    }
    
    if (!formData.message.trim()) tempErrors.message = "Message details are required."
    
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      
      // Save lead to local db
      db.saveLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        company: formData.company,
        message: formData.message
      })

      // Simulate API post duration
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSuccess(true)
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          service: 'Search Engine Optimization', 
          company: '', 
          message: '' 
        })
      }, 1500)
    }
  }

  return (
    <div className="relative pt-20 sm:pt-28 pb-12 overflow-hidden min-h-[90vh]">
      {/* Soft Pastel Background washes */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-violet/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Contact Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/60 backdrop-blur-md">
            <span className="text-xs font-semibold text-brand-indigo uppercase tracking-widest font-sans">
              GET IN TOUCH WITH US
            </span>
          </div>
          <h1 className="text-3xl sm:text-6xl font-heading font-extrabold text-slate-900 tracking-tight leading-none">
            Secure Your Free <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-cyan bg-clip-text text-transparent">
              Growth Audit Today
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-xl mx-auto">
            Ready to capture your market? Give us your business targets and our execution squad will formulate your conversion strategy.
          </p>
        </div>
      </section>

      {/* Main Two-Column Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Details and HQ Map */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 text-left">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl font-heading font-bold text-slate-900">Direct Contacts</h2>
              <p className="text-slate-600 text-sm font-sans leading-relaxed">
                Connect with our commercial partnerships managers directly, or visit our central headquarters. We respond to all audit submissions within 12 business hours.
              </p>
            </div>

            {/* Icon Info Badges */}
            <div className="space-y-4">
              {[
                { label: "Direct Support & Audit queries", value: "info@tsquadron.com", icon: <FiMail />, link: "mailto:info@tsquadron.com" },
                { label: "Call Our Execution Team", value: "+91 9346989817", icon: <FiPhone />, link: "tel:+919346989817" },
                { label: "Office Location (Warangal)", value: "1st Floor, Green Square Plaza, Kishanpura, Hanamkonda, Warangal", icon: <FiMapPin />, link: "https://maps.app.goo.gl/ebSTinBiFWneemTSA" }
              ].map((item, idx) => (
                <a key={idx} href={item.link} target={item.link.startsWith('http') ? "_blank" : undefined} rel={item.link.startsWith('http') ? "noopener noreferrer" : undefined} className="flex items-start sm:items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-100 shadow-premium hover:border-brand-indigo/30 hover:bg-slate-50 transition-all group cursor-pointer block w-full text-left">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-600 shrink-0 group-hover:bg-brand-indigo group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[10px] text-brand-label font-sans uppercase tracking-widest block">{item.label}</span>
                    <span className="text-sm font-semibold text-slate-900 block mt-0.5 break-words group-hover:text-brand-indigo transition-colors">{item.value}</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Embedded Google Maps Location Widget */}
            <div className="relative rounded-2xl sm:rounded-[32px] overflow-hidden border border-slate-200/60 bg-white shadow-premium h-56 sm:h-64 group">
              <iframe
                title="TSquadron Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.327406740927!2d79.5601415!3d18.0100029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3345825fc234f9%3A0x533cc629b53be878!2sDigital%20Marketing%20Training%20in%20Warangal%20%7C%20Tsquadron!5e0!3m2!1sen!2sin!4v1716275810000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full grayscale-[10%] contrast-[105%] group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute bottom-4 right-4 z-10">
                <a
                  href="https://maps.app.goo.gl/ebSTinBiFWneemTSA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-[10px] font-heading font-black text-brand-indigo shadow-md hover:bg-white hover:scale-105 active:scale-95 transition-all"
                >
                  OPEN IN GOOGLE MAPS ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Capture Form */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl sm:rounded-[32px] border border-slate-200/80 bg-white p-5 sm:p-10 shadow-premium text-left">
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest block">Full Name *</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 bg-white border ${errors.name ? 'border-brand-rose' : 'border-slate-200'} rounded-2xl text-slate-800 text-sm focus:outline-none focus:border-brand-indigo transition-all`}
                      />
                      <FiUser className="absolute left-3.5 top-3.5 text-brand-label" size={16} />
                    </div>
                    {errors.name && <span className="text-[11px] text-brand-rose block font-sans">{errors.name}</span>}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest block">Business Email *</label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 bg-white border ${errors.email ? 'border-brand-rose' : 'border-slate-200'} rounded-2xl text-slate-800 text-sm focus:outline-none focus:border-brand-indigo transition-all`}
                      />
                      <FiMail className="absolute left-3.5 top-3.5 text-brand-label" size={16} />
                    </div>
                    {errors.email && <span className="text-[11px] text-brand-rose block font-sans">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Phone Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest block">Phone Number *</label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 bg-white border ${errors.phone ? 'border-brand-rose' : 'border-slate-200'} rounded-2xl text-slate-800 text-sm focus:outline-none focus:border-brand-indigo transition-all`}
                      />
                      <FiPhone className="absolute left-3.5 top-3.5 text-brand-label" size={16} />
                    </div>
                    {errors.phone && <span className="text-[11px] text-brand-rose block font-sans">{errors.phone}</span>}
                  </div>

                  {/* Service Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest block">Service Focus *</label>
                    <div className="relative">
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className={`w-full pl-10 pr-8 py-3 bg-white border ${errors.service ? 'border-brand-rose' : 'border-slate-200'} rounded-2xl text-slate-800 text-sm focus:outline-none focus:border-brand-indigo transition-all appearance-none`}
                      >
                        <option value="Search Engine Optimization">Search Engine Optimization</option>
                        <option value="Social Media Marketing">Social Media Marketing</option>
                        <option value="PPC Services">PPC Services</option>
                        <option value="Web Designing">Web Designing</option>
                        <option value="UI/UX Designing">UI/UX Designing</option>
                        <option value="Online Reputation Management">Online Reputation Management</option>
                        <option value="Email Marketing">Email Marketing</option>
                      </select>
                      <FiBriefcase className="absolute left-3.5 top-3.5 text-brand-label" size={16} />
                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-brand-label">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                    {errors.service && <span className="text-[11px] text-brand-rose block font-sans">{errors.service}</span>}
                  </div>
                </div>

                {/* Company Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest block">Company Name (Optional)</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Company Inc."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-800 text-sm focus:outline-none focus:border-brand-indigo transition-all"
                    />
                    <FiBriefcase className="absolute left-3.5 top-3.5 text-brand-label" size={16} />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest block">Audit Objectives & Details *</label>
                  <div className="relative">
                    <textarea
                      rows={5}
                      placeholder="Detail your growth goals, target channels, or current bottlenecks..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 bg-white border ${errors.message ? 'border-brand-rose' : 'border-slate-200'} rounded-2xl text-slate-800 text-sm focus:outline-none focus:border-brand-indigo transition-all`}
                    />
                    <FiMessageSquare className="absolute left-3.5 top-3.5 text-brand-label" size={16} />
                  </div>
                  {errors.message && <span className="text-[11px] text-brand-rose block font-sans">{errors.message}</span>}
                </div>

                {/* Form submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-brand-indigo to-brand-violet hover:from-brand-cyan hover:to-brand-indigo text-white font-heading font-bold rounded-2xl shadow-[0_4px_15px_rgba(99,102,241,0.2)] hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing Audit Details...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Submit Growth Audit Request <FiSend />
                    </span>
                  )}
                </button>
              </form>

              {/* Validation/Success animation screen */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 rounded-2xl sm:rounded-[32px] bg-white/95 backdrop-blur-sm flex items-center justify-center p-5 sm:p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 10 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="max-w-md space-y-4 sm:space-y-6"
                    >
                      {/* Success Circular checkmark */}
                      <div className="mx-auto w-16 h-16 rounded-full bg-brand-emerald/10 border border-brand-emerald flex items-center justify-center text-brand-emerald">
                        <FiCheck size={28} />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-heading font-bold text-2xl text-slate-900">Audit Request Deployed!</h3>
                        <p className="text-slate-600 text-sm font-sans leading-relaxed">
                          Your business objectives have reached our direct integrations channel. Our senior execution director will review your profiles and contact you within 12 business hours.
                        </p>
                      </div>

                      <button
                        onClick={() => setIsSuccess(false)}
                        className="px-6 py-2.5 rounded-full font-heading font-semibold text-xs text-white bg-gradient-to-r from-brand-indigo to-brand-violet hover:from-brand-cyan hover:to-brand-indigo transition-all duration-300"
                      >
                        Back to Form
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
