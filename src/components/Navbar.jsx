import React, { useState, useEffect } from 'react'
import { 
  FiMenu, FiX, FiArrowRight, FiChevronDown, 
  FiTrendingUp, FiGlobe, FiShare2, FiMousePointer, 
  FiMail, FiShield, FiCpu, FiZap 
} from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar({ activePage, setActivePage, setSelectedServiceId }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isServicesHovered, setIsServicesHovered] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const services = [
    { name: "Digital Marketing", id: "digital-marketing", icon: <FiTrendingUp className="text-brand-cyan" size={16} />, desc: "Growth engines & funnels" },
    { name: "Search Engine Optimization", id: "seo", icon: <FiGlobe className="text-brand-indigo" size={16} />, desc: "Organic authority ranking" },
    { name: "Social Media Marketing", id: "social-media", icon: <FiShare2 className="text-brand-violet" size={16} />, desc: "Viral creative pipelines" },
    { name: "Pay-Per-Click", id: "ppc", icon: <FiMousePointer className="text-brand-rose" size={16} />, desc: "Targeted PPC lead campaigns" },
    { name: "Email Marketing", id: "email", icon: <FiMail className="text-brand-cyan" size={16} />, desc: "Lifecycle retentions" },
    { name: "Reputation Management", id: "orm", icon: <FiShield className="text-brand-indigo" size={16} />, desc: "Brand sentiment audits" },
    { name: "Web Design", id: "web-design", icon: <FiCpu className="text-brand-violet" size={16} />, desc: "Premium responsive web" },
    { name: "UI/UX Design", id: "ui-ux", icon: <FiZap className="text-brand-emerald" size={16} />, desc: "Frictionless conversions" }
  ]

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services', hasDropdown: true },
    { name: 'Blog', id: 'blog' },
    { name: 'About Us', id: 'about' },
    { name: 'Contact Us', id: 'contact' }
  ]

  const handleLinkClick = (id) => {
    setActivePage(id)
    setIsOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleServiceItemClick = (serviceId) => {
    if (serviceId === 'digital-marketing') {
      setActivePage('digital-marketing-agency-hanamkonda')
    } else if (serviceId === 'seo') {
      setActivePage('seo-company-in-hanamkonda')
    } else if (serviceId === 'social-media') {
      setActivePage('social-media-marketing')
    } else if (serviceId === 'ppc') {
      setActivePage('ppc-services-in-hanamkonda')
    } else if (serviceId === 'email') {
      setActivePage('email-marketing-company-hanamkonda')
    } else if (serviceId === 'orm') {
      setActivePage('online-reputation-management-services-hanumakonda')
    } else if (serviceId === 'web-design') {
      setActivePage('web-designing-development-company-hanumakonda')
    } else if (serviceId === 'ui-ux') {
      setActivePage('ui-ux-designing-company-hanamkonda')
    } else {
      setSelectedServiceId(serviceId)
      setActivePage('services')
    }
    setIsOpen(false)
    setIsServicesHovered(false)
  }

  return (
    <>
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${ scrolled ? 'py-3 bg-white/70 backdrop-blur-lg border-b border-slate-100 shadow-[0_4px_30px_rgba(15,23,42,0.03)]' : 'py-5 bg-transparent' }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-12">
            
            {/* Logo */}
            <div 
              onClick={() => handleLinkClick('home')}
              className="flex items-center cursor-pointer group"
            >
              <img src="/logo.png" alt="TSquadron Logo" className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 relative">
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.id}
                      className="py-4"
                      onMouseEnter={() => setIsServicesHovered(true)}
                      onMouseLeave={() => setIsServicesHovered(false)}
                    >
                      <button
                        onClick={(e) => { e.preventDefault(); setIsServicesHovered(prev => !prev); }}
                        className={`flex items-center gap-1 font-medium text-sm transition-colors duration-300 font-sans tracking-wide ${ activePage === 'services' ? 'text-brand-indigo font-semibold' : 'text-slate-600 hover:text-slate-900' }`}
                      >
                        {link.name}
                        <FiChevronDown 
                          size={14} 
                          className={`transition-transform duration-300 ${isServicesHovered ? 'rotate-180 text-brand-indigo' : 'text-brand-label'}`} 
                        />
                      </button>

                      {/* Premium 2-Column Desktop Dropdown Menu */}
                      <AnimatePresence>
                        {isServicesHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="absolute left-0 top-full mt-2 w-[540px] rounded-3xl p-6 bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_20px_50px_rgba(15,23,42,0.06)] z-50 text-left animate-fade-in"
                          >
                            {/* Inner glowing top-border */}
                            <div className="absolute top-0 inset-x-10 h-[1px] bg-gradient-to-r from-transparent via-brand-indigo to-transparent opacity-30" />

                            <div className="grid grid-cols-2 gap-3">
                              {services.map((svc) => (
                                <button
                                  key={svc.id}
                                  onClick={() => handleServiceItemClick(svc.id)}
                                  className="flex items-start gap-3.5 p-3 rounded-2xl bg-transparent hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300 group/item"
                                >
                                  <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover/item:border-brand-indigo/20 group-hover/item:bg-white transition-all">
                                    {svc.icon}
                                  </div>
                                  <div className="space-y-0.5">
                                    <span className="text-xs font-semibold text-slate-700 group-hover/item:text-slate-950 transition-colors block">
                                      {svc.name}
                                    </span>
                                    <span className="text-[10px] text-brand-label block leading-tight">
                                      {svc.desc}
                                    </span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative py-2 font-medium text-sm transition-colors duration-300 font-sans tracking-wide ${ activePage === link.id ? 'text-brand-indigo font-semibold' : 'text-slate-600 hover:text-slate-900' }`}
                  >
                    {link.name}
                    {activePage === link.id && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-indigo to-brand-cyan rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button
                onClick={() => handleLinkClick('contact')}
                className="relative overflow-hidden group px-6 py-2.5 rounded-full font-heading font-medium text-sm text-white bg-gradient-to-r from-brand-indigo to-brand-violet shadow-[0_4px_15px_rgba(99,102,241,0.2)] hover:shadow-[0_4px_25px_rgba(99,102,241,0.4)] transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-brand-cyan to-brand-indigo transition-transform duration-500 ease-out" />
              </button>
            </div>

            {/* Mobile Hamburger Trigger */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-all"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 md:hidden bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.05, duration: 0.4 }}
              className="fixed top-0 right-0 bottom-0 w-[290px] sm:w-[360px] z-50 md:hidden bg-white shadow-2xl border-l border-slate-100 flex flex-col h-screen overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="p-5 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
                <img src="/logo.png" alt="TSquadron Logo" className="h-8 w-auto object-contain" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-slate-100/80 transition-all flex items-center justify-center shrink-0 w-10 h-10"
                  aria-label="Close navigation menu"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="px-4 py-6 flex-grow space-y-2 flex flex-col items-stretch">
                {navLinks.map((link) => {
                  if (link.hasDropdown) {
                    return (
                      <div key={link.id} className="w-full flex flex-col items-stretch">
                        <button
                          onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                          className={`w-full min-h-[48px] py-3 px-4 rounded-2xl text-left font-medium flex items-center justify-between transition-all ${ activePage === 'services' ? 'bg-slate-50 text-brand-indigo font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/50' }`}
                        >
                          <span>{link.name}</span>
                          <FiChevronDown 
                            size={16} 
                            className={`transition-transform duration-300 text-brand-label ${isMobileServicesOpen ? 'rotate-180 text-brand-indigo' : ''}`} 
                          />
                        </button>

                        {/* Mobile Accordion Expand for Dropdown items */}
                        <AnimatePresence initial={false}>
                          {isMobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden bg-slate-50 border border-slate-100 rounded-2xl mt-1.5 mx-2"
                            >
                              <div className="p-2 grid grid-cols-1 gap-1">
                                {services.map((svc) => (
                                  <button
                                    key={svc.id}
                                    onClick={() => handleServiceItemClick(svc.id)}
                                    className="w-full min-h-[44px] py-3 px-4 rounded-xl text-left text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 flex items-center gap-3 transition-colors"
                                  >
                                    <div className="w-6.5 h-6.5 rounded-lg bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                                      {svc.icon}
                                    </div>
                                    <span>{svc.name}</span>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  }

                  return (
                    <button
                      key={link.id}
                      onClick={() => handleLinkClick(link.id)}
                      className={`w-full min-h-[48px] py-3 px-4 rounded-2xl text-left font-medium transition-all ${ activePage === link.id ? 'bg-gradient-to-r from-brand-indigo/10 to-brand-cyan/10 text-brand-indigo font-semibold border-l-2 border-brand-indigo' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/50' }`}
                    >
                      {link.name}
                    </button>
                  )
                })}

                <div className="pt-6 px-2 mt-auto">
                  <button
                    onClick={() => handleLinkClick('contact')}
                    className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3.5 rounded-full font-heading font-semibold text-white bg-gradient-to-r from-brand-indigo to-brand-violet hover:from-brand-cyan hover:to-brand-indigo shadow-md transition-all duration-300"
                  >
                    Get Started <FiArrowRight />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
