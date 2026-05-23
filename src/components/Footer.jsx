import React, { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiFacebook, FiInstagram } from 'react-icons/fi'

export default function Footer({ setActivePage }) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  const navigateTo = (pageId) => {
    setActivePage(pageId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gradient-to-b from-[#eef4ff] via-[#eef4ff] to-[#f6f9ff] pt-24 pb-12 overflow-hidden">
      {/* Soft Pastel Background Glows */}
      <div className="absolute top-[-100px] left-[10%] w-[400px] h-[400px] rounded-full bg-brand-cyan/10 blur-[110px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-100px] right-[10%] w-[450px] h-[450px] rounded-full bg-brand-violet/8 blur-[120px] pointer-events-none animate-pulse-slow" />

      {/* Multi-layered Glowing Top Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2857A4]/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 md:w-1/2 h-[2px] bg-gradient-to-r from-transparent via-brand-indigo/40 to-transparent blur-[1px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20 text-left">
          {/* Column 1: Agency Brand */}
          <div className="space-y-6 lg:col-span-2 flex flex-col items-start">
            <div 
              onClick={() => navigateTo('home')}
              className="flex items-center cursor-pointer group"
            >
              <img src="/logo.png" alt="TSquadron Logo" className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            </div>
            <p className="text-slate-700 text-sm/relaxed max-w-md font-medium">
              Tsquadron creates and defines brand identities, strategically expands businesses in digital markets, and ignites brand awareness, sales, and desire. With a strong global presence in Warangal, Tsquadron’s expertise and passion fuel your brand’s remarkable digital journey.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://www.linkedin.com/company/tsquadron-tech/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 rounded-full bg-white/80 border border-brand-cyan/20 flex items-center justify-center text-[#163C8C] shadow-sm hover:shadow-md hover:shadow-[#163c8c]/15 hover:bg-white hover:text-brand-indigo hover:border-brand-indigo hover:-translate-y-1 transition-all duration-300"
              >
                <FiLinkedin size={18} />
              </a>
              <a 
                href="https://www.facebook.com/TSQUADRONN/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 rounded-full bg-white/80 border border-brand-cyan/20 flex items-center justify-center text-[#2857A4] shadow-sm hover:shadow-md hover:shadow-[#2857a4]/15 hover:bg-white hover:text-brand-violet hover:border-brand-violet hover:-translate-y-1 transition-all duration-300"
              >
                <FiFacebook size={18} />
              </a>
              <a 
                href="https://www.instagram.com/tsquadron_/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 rounded-full bg-white/80 border border-brand-cyan/20 flex items-center justify-center text-[#7FB6C5] shadow-sm hover:shadow-md hover:shadow-[#7fb6c5]/15 hover:bg-white hover:text-brand-rose hover:border-brand-rose hover:-translate-y-1 transition-all duration-300"
              >
                <FiInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col items-start">
            <h4 className="text-brand-indigo font-heading font-bold text-sm tracking-wider uppercase mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
              Useful Links
            </h4>
            <ul className="space-y-4 text-sm font-medium text-slate-600 flex flex-col items-start w-full">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Our Services', id: 'services' },
                { label: 'Blog', id: 'blog' },
                { label: 'About Us', id: 'about' },
                { label: 'Contact Us', id: 'contact' }
              ].map((link) => (
                <li key={link.id} className="w-full">
                  <button 
                    onClick={() => navigateTo(link.id)} 
                    className="flex items-center gap-2 hover:text-brand-indigo transition-all duration-300 group/link text-left w-full"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-cyan opacity-0 scale-0 -ml-2 group-hover/link:opacity-100 group-hover/link:scale-100 group-hover/link:ml-0 transition-all duration-300" />
                    <span className="group-hover/link:translate-x-1.5 transition-transform duration-300">
                      {link.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Newsletter Submission */}
          <div className="flex flex-col items-start w-full max-w-sm">
            <h4 className="text-brand-indigo font-heading font-bold text-sm tracking-wider uppercase mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
              Growth Newsletter
            </h4>
            <p className="text-slate-700 text-sm mb-6 leading-relaxed">
              Get the latest marketing insights, algorithm hacks, and business growth advice sent weekly.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3.5 w-full">
              <div className="relative shadow-sm rounded-xl">
                <input
                  type="email"
                  required
                  placeholder="Your business email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 bg-white border border-brand-cyan/20 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-brand-indigo focus:ring-4 focus:ring-brand-indigo/10 transition-all shadow-sm duration-300 font-medium placeholder-slate-400"
                />
                <FiMail className="absolute left-3.5 top-4 text-brand-label" size={16} />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-brand-indigo via-brand-emerald to-brand-violet hover:shadow-lg hover:shadow-brand-indigo/15 hover:scale-[1.01] active:scale-[0.99] text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-sm"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="mt-3 text-xs text-brand-emerald animate-fade-in font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-ping" />
                Thank you! You have joined our list successfully.
              </p>
            )}
          </div>
        </div>

        {/* Middle Offices Address / Contact Section */}
        <div className="border-t border-[#2857A4]/10 pt-12 pb-10 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-sm text-slate-700">
            {/* Card 1: Office Location */}
            <div className="lg:col-span-7 bg-white/40 border border-white/60 rounded-2xl p-6 backdrop-blur-sm shadow-sm hover:shadow-md hover:bg-white/60 transition-all duration-300 flex flex-col sm:flex-row items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-brand-cyan/20 flex items-center justify-center text-brand-indigo shrink-0 shadow-sm">
                <FiMapPin size={20} className="text-brand-indigo" />
              </div>
              <div className="space-y-1.5">
                <span className="font-heading font-bold text-[#163C8C] uppercase tracking-wider text-xs block">
                  Office Location (Warangal)
                </span>
                <p className="text-slate-700 font-medium leading-relaxed">
                  1st Floor, Green Square Plaza, opp public garden, Kishanpura, Hanamkonda, Warangal, Telangana 506001
                </p>
              </div>
            </div>

            {/* Card 2: Contact info */}
            <div className="lg:col-span-5 bg-white/40 border border-white/60 rounded-2xl p-6 backdrop-blur-sm shadow-sm hover:shadow-md hover:bg-white/60 transition-all duration-300 flex flex-col sm:flex-row items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-brand-cyan/20 flex items-center justify-center text-brand-indigo shrink-0 shadow-sm">
                <FiPhone size={18} className="text-brand-indigo" />
              </div>
              <div className="space-y-2 w-full">
                <span className="font-heading font-bold text-[#163C8C] uppercase tracking-wider text-xs block">
                  Direct Contact
                </span>
                <div className="space-y-1.5 font-medium">
                  <a href="tel:+919346989817" className="flex items-center gap-1.5 hover:text-brand-indigo transition-colors">
                    <span>+91 9346989817</span>
                  </a>
                  <a href="mailto:info@tsquadron.com" className="flex items-center gap-1.5 hover:text-brand-indigo transition-colors">
                    <FiMail size={14} className="text-slate-400" />
                    <span>info@tsquadron.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Legal Links */}
          <div className="border-t border-[#2857A4]/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-semibold text-brand-label gap-4">
            <div>
              © 2022 All Rights Reserved by Tsquadron
            </div>
            <div className="flex gap-6">
              <button 
                onClick={() => navigateTo('privacy-policy')} 
                className="hover:text-brand-indigo transition-colors font-semibold text-xs text-brand-label bg-transparent border-0 p-0 cursor-pointer"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
