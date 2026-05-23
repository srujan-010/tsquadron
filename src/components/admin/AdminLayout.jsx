import React, { useState, useEffect } from 'react'
import { 
  FiGrid, FiUsers, FiFileText, FiLayers, FiMessageSquare, 
  FiImage, FiSettings, FiExternalLink, FiLogOut, FiMenu, FiX, FiShield,
  FiChevronDown, FiChevronUp, FiLock, FiAlertTriangle, FiGlobe, FiCode, FiCalendar
} from 'react-icons/fi'

export default function AdminLayout({ children, activeTab, setActivePage }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isSeoOpen, setIsSeoOpen] = useState(true)
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false)
  const [activeRole, setActiveRole] = useState(() => {
    return sessionStorage.getItem('tsquadron_admin_role') || 'Super Admin'
  })

  // Synchronize role updates across layouts and state
  const handleRoleChange = (role) => {
    setActiveRole(role)
    sessionStorage.setItem('tsquadron_admin_role', role)
    // Dispatch storage event to alert other components if needed
    window.dispatchEvent(new Event('storage'))
  }

  // Monitor session storage dynamically
  useEffect(() => {
    const handleStorageChange = () => {
      const role = sessionStorage.getItem('tsquadron_admin_role') || 'Super Admin'
      setActiveRole(role)
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: <FiGrid size={18} />, path: 'admin/dashboard' },
    { id: 'appointments', label: 'Appointments', icon: <FiCalendar size={18} />, path: 'admin/appointments' },
    { id: 'leads', label: 'Leads Inbox', icon: <FiUsers size={18} />, path: 'admin/leads' },
    { id: 'blogs', label: 'Blog Manager', icon: <FiFileText size={18} />, path: 'admin/blogs' },
    { id: 'services', label: 'Services Editor', icon: <FiLayers size={18} />, path: 'admin/services' },
    { id: 'testimonials', label: 'Testimonials', icon: <FiMessageSquare size={18} />, path: 'admin/testimonials' },
    { id: 'media', label: 'Media Library', icon: <FiImage size={18} />, path: 'admin/media' },
    { id: 'settings', label: 'Global Settings', icon: <FiSettings size={18} />, path: 'admin/settings' },
  ]

  const seoSubItems = [
    { id: 'seo-global', label: 'Global Defaults', icon: <FiGlobe size={14} />, path: 'admin/seo-global' },
    { id: 'seo-pages', label: 'Page Meta Manager', icon: <FiLayers size={14} />, path: 'admin/seo-pages' },
    { id: 'seo-blogs', label: 'Blog SEO Panel', icon: <FiFileText size={14} />, path: 'admin/seo-blogs' },
    { id: 'seo-technical', label: 'Technical SEO', icon: <FiSettings size={14} />, path: 'admin/seo-technical' },
    { id: 'seo-sitemap', label: 'Sitemap Manager', icon: <FiExternalLink size={14} />, path: 'admin/seo-sitemap' },
    { id: 'seo-schema', label: 'Schema Builder', icon: <FiCode size={14} />, path: 'admin/seo-schema' }
  ]

  const handleLogout = () => {
    sessionStorage.removeItem('tsquadron_admin_authenticated')
    sessionStorage.removeItem('tsquadron_admin_role')
    setActivePage('admin')
  }

  const navigateToTab = (path) => {
    setActivePage(path)
    setIsMobileOpen(false)
  }

  // Strict Role Protection
  // Content Editors can ONLY access Page SEO (seo-pages) and Blog SEO (seo-blogs) within the SEO Suite.
  const isSeoTab = activeTab.startsWith('seo-')
  const isRestrictedSeo = activeRole === 'Content Editor' && isSeoTab && activeTab !== 'seo-pages' && activeTab !== 'seo-blogs'

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex text-left relative">
      {/* 1. Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-950 text-slate-300 border-r border-slate-900 shrink-0 select-none">
        {/* Header Branding */}
        <div className="p-6 border-b border-slate-900 flex items-center justify-center">
          <img src="/logo.png" alt="TSquadron Logo" className="h-8 w-auto object-contain" />
        </div>

        {/* Navigation list */}
        <nav className="flex-grow p-4 space-y-5 overflow-y-auto max-h-[calc(100vh-140px)]">
          {/* Main Console Group */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 block mb-2">Main Menu</span>
            {navItems.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => navigateToTab(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-indigo text-white shadow-premium shadow-brand-indigo/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>

          {/* Separator / SEO Suite Group */}
          <div className="space-y-1.5 border-t border-slate-900 pt-4">
            <button
              onClick={() => setIsSeoOpen(!isSeoOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-slate-200 transition-all"
            >
              <span>SEO Suite</span>
              <span className="text-slate-400">
                {isSeoOpen ? <FiChevronDown size={14} /> : <FiChevronUp size={14} />}
              </span>
            </button>
            {isSeoOpen && (
              <div className="pl-2 space-y-1 mt-1 border-l border-slate-900 ml-4">
                {seoSubItems.map((subItem) => {
                  const isActive = activeTab === subItem.id
                  const isLocked = activeRole === 'Content Editor' && subItem.id !== 'seo-pages' && subItem.id !== 'seo-blogs'
                  return (
                    <button
                      key={subItem.id}
                      onClick={() => navigateToTab(subItem.path)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-brand-indigo text-white shadow-premium shadow-brand-indigo/10'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {subItem.icon}
                        <span>{subItem.label}</span>
                      </div>
                      {isLocked && <FiLock className="text-slate-600" size={12} />}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Footer controls */}
        <div className="p-4 border-t border-slate-900 space-y-1">
          <button
            onClick={() => setActivePage('home')}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 transition-all"
          >
            <FiExternalLink size={14} />
            <span>Public Website</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-all"
          >
            <FiLogOut size={14} />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* 2. Mobile Drawer Navigation Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
          />

          {/* Drawer content */}
          <aside className="relative flex flex-col w-64 max-w-[80vw] bg-slate-950 text-slate-300 h-full border-r border-slate-900 z-10 p-5 space-y-6 select-none overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-900 pb-4">
              <img src="/logo.png" alt="TSquadron Logo" className="h-8 w-auto object-contain" />
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <FiX size={16} />
              </button>
            </div>

            <nav className="flex-grow space-y-5 overflow-y-auto">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 block">Main Menu</span>
                {navItems.map((item) => {
                  const isActive = activeTab === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigateToTab(item.path)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-brand-indigo text-white'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>

              <div className="space-y-1.5 border-t border-slate-900 pt-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 block">SEO Suite</span>
                <div className="space-y-1 pl-2">
                  {seoSubItems.map((subItem) => {
                    const isActive = activeTab === subItem.id
                    const isLocked = activeRole === 'Content Editor' && subItem.id !== 'seo-pages' && subItem.id !== 'seo-blogs'
                    return (
                      <button
                        key={subItem.id}
                        onClick={() => navigateToTab(subItem.path)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-brand-indigo text-white'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {subItem.icon}
                          <span>{subItem.label}</span>
                        </div>
                        {isLocked && <FiLock className="text-slate-600" size={12} />}
                      </button>
                    )
                  })}
                </div>
              </div>
            </nav>

            <div className="border-t border-slate-900 pt-4 space-y-1.5">
              <button
                onClick={() => navigateToTab('home')}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200"
              >
                <FiExternalLink size={14} />
                <span>Public Website</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300"
              >
                <FiLogOut size={14} />
                <span>Terminate Session</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* 3. Main Dashboard Wrapper Content */}
      <div className="flex-grow flex flex-col min-w-0 overflow-x-hidden">
        {/* Header Area */}
        <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-6 shrink-0 relative z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
            >
              <FiMenu size={18} />
            </button>
            <span className="font-heading font-black text-slate-800 text-sm hidden sm:inline uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-lg">
              TSQUADRON CONSOLE
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Interactive Sandbox Role Selector Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className={`px-3.5 py-1.5 border rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs ${
                  activeRole === 'Super Admin' ? 'text-indigo-700 bg-indigo-50 border-indigo-200 hover:bg-indigo-100' :
                  activeRole === 'SEO Manager' ? 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100' :
                  'text-amber-700 bg-amber-50 border-amber-200 hover:bg-amber-100'
                }`}
              >
                <FiShield size={13} />
                <span>{activeRole}</span>
                <FiChevronDown size={12} className={`transition-transform duration-200 ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isRoleDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsRoleDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200/80 rounded-2xl shadow-xl z-40 p-2 space-y-1 text-left">
                    <span className="text-[10px] font-bold text-slate-400 px-3 py-1.5 block uppercase tracking-wider">Switch Sandbox Role</span>
                    {['Super Admin', 'SEO Manager', 'Content Editor'].map((role) => (
                      <button
                        key={role}
                        onClick={() => {
                          handleRoleChange(role)
                          setIsRoleDropdownOpen(false)
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                          activeRole === role 
                            ? 'bg-slate-100 text-slate-900 font-bold' 
                            : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                        }`}
                      >
                        <span>{role}</span>
                        {activeRole === role && <div className="w-1.5 h-1.5 rounded-full bg-brand-indigo" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <span className="text-xs font-semibold text-slate-900 block leading-tight">Corporate Admin</span>
                <span className="text-[10px] text-brand-label font-sans block">TSquadron Digital</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80"
                alt="Admin Profile"
                className="w-9 h-9 rounded-xl border border-slate-200 object-cover"
              />
            </div>
          </div>
        </header>

        {/* Content area injection with strict layout lockout screen */}
        <main className="flex-grow p-6 md:p-8 relative z-10 overflow-y-auto">
          {isRestrictedSeo ? (
            <div className="min-h-[60vh] flex items-center justify-center p-4">
              <div className="w-full max-w-lg bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 text-center shadow-premium space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-500" />
                
                <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                  <FiLock size={28} />
                </div>
                
                <div className="space-y-2">
                  <h2 className="font-heading font-black text-slate-900 text-xl tracking-tight uppercase">Access Denied</h2>
                  <p className="text-slate-500 text-xs font-semibold tracking-wide uppercase">Permissions Level Insufficient</p>
                </div>
                
                <p className="text-slate-600 text-xs leading-relaxed max-w-sm mx-auto">
                  You are currently logged in with the <strong className="text-slate-800">{activeRole}</strong> sandbox role. 
                  This profile only has access to configure page-level metadata and blog SEO values inside the SEO Suite.
                </p>
                
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 text-[11px] leading-relaxed flex gap-3 text-left">
                  <FiAlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="font-bold text-slate-800 block mb-0.5">Need full access?</span>
                    Use the role dropdown in the header to switch to <strong className="text-slate-900">Super Admin</strong> or <strong className="text-slate-900">SEO Manager</strong> for the sandbox demo.
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
                  <button
                    onClick={() => setActivePage('admin/seo-pages')}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-850 text-white font-heading font-bold text-xs rounded-xl shadow-premium transition-all"
                  >
                    Go to Page Meta Manager
                  </button>
                  <button
                    onClick={() => handleRoleChange('SEO Manager')}
                    className="px-5 py-2.5 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-bold text-xs rounded-xl shadow-premium transition-all"
                  >
                    Switch to SEO Manager
                  </button>
                </div>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  )
}
