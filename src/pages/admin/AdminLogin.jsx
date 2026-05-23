import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiArrowRight, FiShield, FiAlertCircle } from 'react-icons/fi'

export default function AdminLogin({ setActivePage }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.')
      return
    }

    setIsSubmitting(true)

    // Simulate authenticating admin against mock JWT/Session
    setTimeout(() => {
      setIsSubmitting(false)
      if (email === 'admin@tsquadron.com' && password === 'admin') {
        sessionStorage.setItem('tsquadron_admin_authenticated', 'true')
        
        // Redirect to intended dashboard or default
        const path = window.location.pathname.substring(1)
        if (path.startsWith('admin/') && path !== 'admin') {
          setActivePage(path)
        } else {
          setActivePage('admin/dashboard')
        }
      } else {
        setError('Invalid admin credentials. Please try again.')
      }
    }, 1200)
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white font-sans text-left">
      {/* Left panel - Decorative Branding */}
      <div className="hidden lg:flex lg:col-span-5 relative bg-gradient-to-tr from-brand-indigo via-brand-violet to-slate-900 overflow-hidden flex-col justify-between p-12 text-white">
        {/* Ambient drift glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-indigo/30 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <FiShield className="text-white" size={20} />
          </div>
          <span className="font-heading font-black text-xl tracking-wider uppercase">TSQUADRON</span>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold leading-tight">
            Central Administrative <br />
            Control Hub
          </h1>
          <p className="text-indigo-100/80 leading-relaxed text-sm max-w-md">
            Manage leads, edit SEO optimization tags, publish analytical blogs, approve reviews, and customize service directories instantly.
          </p>
        </div>

        <div className="relative z-10 text-[10px] text-indigo-200/50 uppercase tracking-widest">
          © 2026 TSquadron Digital Solutions. All Rights Reserved.
        </div>
      </div>

      {/* Right panel - Login form */}
      <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12 relative bg-slate-50/50">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-3">
            <div className="inline-flex lg:hidden items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-indigo flex items-center justify-center">
                <FiShield className="text-white" size={16} />
              </div>
              <span className="font-heading font-bold text-slate-800 tracking-wider">TSQUADRON</span>
            </div>
            
            <h2 className="text-3xl font-heading font-black text-slate-900">Admin Portal</h2>
            <p className="text-slate-600 text-sm">
              Authenticate your identity to access corporate CMS parameters.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-700 text-xs font-sans">
                <FiAlertCircle className="shrink-0" size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* Email field */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                Corporate Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="admin@tsquadron.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo/20 rounded-2xl text-slate-800 text-sm focus:outline-none transition-all font-sans"
                />
                <FiMail className="absolute left-4 top-[17px] text-brand-label" size={16} />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                  Access Key
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo/20 rounded-2xl text-slate-800 text-sm focus:outline-none transition-all font-sans"
                />
                <FiLock className="absolute left-4 top-[17px] text-brand-label" size={16} />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-4 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-semibold rounded-2xl shadow-premium hover:shadow-hover-glow transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Unlock Console <FiArrowRight />
                </span>
              )}
            </button>
          </form>

          {/* Credential Helper Badge */}
          <div className="p-4 rounded-2xl bg-brand-indigo/[0.03] border border-brand-indigo/10 text-slate-600 text-xs font-sans space-y-1">
            <span className="font-semibold text-brand-indigo block">Authorized Demo Credentials</span>
            <p className="text-slate-600 leading-normal">
              Use standard administrative login for sandbox validation:
            </p>
            <div className="font-mono text-[11px] text-slate-700 bg-white/70 border border-slate-100 p-2 rounded-lg mt-1 select-all">
              Email: admin@tsquadron.com<br />
              Password: admin
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
