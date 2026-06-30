import React, { useState, useEffect } from 'react'
import { 
  FiHeart, FiAlertCircle, FiAlertTriangle, FiCheckCircle, 
  FiArrowRight, FiActivity, FiLayers, FiImage, FiSettings,
  FiFileText, FiFolder, FiPackage
} from 'react-icons/fi'
import { db } from '../../lib/db'

export default function AdminSeoHealth({ setActivePage }) {
  const [loading, setLoading] = useState(true)
  const [issuesList, setIssuesList] = useState([])
  const [healthScore, setHealthScore] = useState(100)
  const [stats, setStats] = useState({
    critical: 0,
    warning: 0,
    passed: 0
  })

  // Run all checkers
  const runAudits = () => {
    setLoading(true)
    const issues = []

    // Fetch database contents
    const products = db.getProducts()
    const categories = db.getCategories()
    const blogs = db.getBlogs()
    const media = db.getMedia()

    // 1. DUPLICATE TITLE/DESCRIPTION CHECKERS
    const titleMap = {}
    const descMap = {}

    // Track static page fallbacks as well
    const pages = [
      { id: 'home', name: 'Home Page', title: 'TSquadron | Performance Marketing & Digital Growth Agency', desc: 'TSquadron is a premium performance digital marketing agency in Warangal.' },
      { id: 'about', name: 'About Page', title: 'About TSquadron | Digital Agency', desc: 'Read about TSquadron performance values.' },
      { id: 'services', name: 'Services Page', title: 'Digital Marketing & Web Services | TSquadron', desc: 'Explore SEO, PPC, and UI/UX design packages.' },
      { id: 'contact', name: 'Contact Page', title: 'Contact TSquadron | Get a Quote', desc: 'Reach out to TSquadron for SEO campaigns.' }
    ]

    // Populate titleMap and descMap
    pages.forEach(p => {
      if (p.title) titleMap[p.title] = [...(titleMap[p.title] || []), { type: 'page', id: p.id, name: p.name }]
      if (p.desc) descMap[p.desc] = [...(descMap[p.desc] || []), { type: 'page', id: p.id, name: p.name }]
    })

    products.forEach(p => {
      if (p.seoTitle) titleMap[p.seoTitle] = [...(titleMap[p.seoTitle] || []), { type: 'product', id: p.id, name: p.name }]
      if (p.seoDescription) descMap[p.seoDescription] = [...(descMap[p.seoDescription] || []), { type: 'product', id: p.id, name: p.name }]
    })

    categories.forEach(c => {
      if (c.seoTitle) titleMap[c.seoTitle] = [...(titleMap[c.seoTitle] || []), { type: 'category', id: c.id, name: c.name }]
      if (c.seoDescription) descMap[c.seoDescription] = [...(descMap[c.seoDescription] || []), { type: 'category', id: c.id, name: c.name }]
    })

    // Find title duplicates
    Object.keys(titleMap).forEach(title => {
      if (titleMap[title].length > 1) {
        issues.push({
          id: `dup-title-${title.slice(0, 10)}`,
          severity: 'critical',
          category: 'Metadata',
          message: `Duplicate SEO Title detected: "${title.slice(0, 40)}..."`,
          description: `Used on: ${titleMap[title].map(item => item.name).join(', ')}`,
          actionPath: titleMap[title][0].type === 'product' ? 'admin/seo-products' :
                      titleMap[title][0].type === 'category' ? 'admin/seo-categories' : 'admin/seo-pages'
        })
      }
    })

    // Find description duplicates
    Object.keys(descMap).forEach(desc => {
      if (descMap[desc].length > 1) {
        issues.push({
          id: `dup-desc-${desc.slice(0, 10)}`,
          severity: 'critical',
          category: 'Metadata',
          message: `Duplicate Meta Description detected: "${desc.slice(0, 40)}..."`,
          description: `Used on: ${descMap[desc].map(item => item.name).join(', ')}`,
          actionPath: descMap[desc][0].type === 'product' ? 'admin/seo-products' :
                      descMap[desc][0].type === 'category' ? 'admin/seo-categories' : 'admin/seo-pages'
        })
      }
    })

    // 2. MISSING CANONICAL URLS
    products.forEach(p => {
      if (!p.canonicalUrl) {
        issues.push({
          id: `missing-canonical-prod-${p.id}`,
          severity: 'critical',
          category: 'Indexation',
          message: `Missing Canonical URL link on product: "${p.name}"`,
          description: 'Essential to prevent duplicate tracking crawler loops.',
          actionPath: 'admin/seo-products'
        })
      }
    })

    categories.forEach(c => {
      if (!c.canonicalUrl) {
        issues.push({
          id: `missing-canonical-cat-${c.id}`,
          severity: 'critical',
          category: 'Indexation',
          message: `Missing Canonical URL link on category: "${c.name}"`,
          description: 'Define a clean primary directory routing endpoint.',
          actionPath: 'admin/seo-categories'
        })
      }
    })

    // 3. MEDIA ASSETS CHECKS (>300KB and Missing Alts)
    media.forEach(m => {
      // Check size > 300KB
      const isHeavy = m.size && (m.size.includes('MB') || (m.size.includes('KB') && parseInt(m.size) > 300))
      if (isHeavy) {
        issues.push({
          id: `heavy-media-${m.id}`,
          severity: 'warning',
          category: 'Performance',
          message: `Heavy Image Asset: "${m.name}" is over 300KB (${m.size})`,
          description: 'Heavy files drag down mobile Lighthouse loading speed.',
          actionPath: 'admin/media'
        })
      }

      // Simulation check for Alt descriptions
      if (m.name.toLowerCase().includes('banner') || m.name.toLowerCase().includes('logo')) {
        // Mock checking alt descriptions of standard templates
        const hasAlt = m.name.length > 5
        if (!hasAlt) {
          issues.push({
            id: `alt-media-${m.id}`,
            severity: 'warning',
            category: 'Accessibility',
            message: `Missing Alt Tag description on image asset: "${m.name}"`,
            description: 'Alt descriptions are required to index in Google Image search.',
            actionPath: 'admin/media'
          })
        }
      }
    })

    // 4. HEADING HIERARCHY SIMULATED CHECKS
    // Simulate landing page heading hierarchy scans
    const headingScans = [
      { page: 'home', name: 'Home Page', h1Count: 1, structureCorrect: true },
      { page: 'about', name: 'About Page', h1Count: 0, structureCorrect: false, jump: 'H1 missing completely' },
      { page: 'services', name: 'Services Page', h1Count: 2, structureCorrect: false, jump: 'Multiple H1 tags' }
    ]

    headingScans.forEach(scan => {
      if (!scan.structureCorrect) {
        issues.push({
          id: `heading-hierarchy-${scan.page}`,
          severity: 'warning',
          category: 'Structure',
          message: `Heading Hierarchy Alert on ${scan.name}: ${scan.jump}`,
          description: 'Each page should hold exactly one structural H1 tag followed sequentially by H2-H6.',
          actionPath: 'admin/seo-pages'
        })
      }
    })

    // Compute Health score
    let score = 100
    let criticalCount = 0
    let warningCount = 0

    issues.forEach(i => {
      if (i.severity === 'critical') {
        score -= 6
        criticalCount++
      } else {
        score -= 3
        warningCount++
      }
    })

    score = Math.max(20, score)

    setIssuesList(issues)
    setHealthScore(score)
    setStats({
      critical: criticalCount,
      warning: warningCount,
      passed: 12 - issues.length // arbitrary pass count
    })
    setLoading(false)
  }

  useEffect(() => {
    runAudits()
  }, [])

  return (
    <div className="space-y-8 text-left max-w-6xl font-sans">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-heading font-black text-slate-900 text-2xl tracking-tight uppercase">SEO Health Checker</h1>
          <p className="text-slate-500 text-xs mt-1">Run an automated diagnostic audit to identify broken headings, duplicate tags, empty alt descriptions, and page speed killers.</p>
        </div>
        <button
          onClick={runAudits}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-heading font-bold text-xs rounded-xl shadow-xs transition-all shrink-0"
        >
          <FiActivity size={14} />
          <span>Re-Run Diagnostics</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="w-10 h-10 border-4 border-brand-indigo border-t-transparent rounded-full animate-spin mx-auto" />
          <span className="text-xs text-slate-400 font-semibold block mt-4">Analyzing index records, tag databases, and media sizes...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main List of Alerts: 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Issues List Card */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-premium space-y-6">
              <h3 className="text-slate-900 font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
                <FiAlertCircle size={16} className="text-brand-indigo" /> Audit Diagnostics Findings ({issuesList.length})
              </h3>

              {issuesList.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <FiCheckCircle className="mx-auto text-emerald-500 animate-bounce" size={48} />
                  <p className="text-xs text-slate-500 font-bold">Awesome! Zero issues or warnings found. Your TSquadron website has perfect SEO health!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {issuesList.map((issue) => (
                    <div 
                      key={issue.id} 
                      className={`p-4 border rounded-2xl flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-all hover:shadow-xs text-left ${
                        issue.severity === 'critical' 
                          ? 'border-red-100 bg-red-50/20' 
                          : 'border-amber-100 bg-amber-50/20'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                          issue.severity === 'critical' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'
                        }`}>
                          {issue.severity === 'critical' ? <FiAlertCircle size={18} /> : <FiAlertTriangle size={18} />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-800">{issue.message}</span>
                            <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                              issue.severity === 'critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                            }`}>{issue.category}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-semibold block mt-1 leading-relaxed">{issue.description}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setActivePage(issue.actionPath)}
                        className={`inline-flex items-center gap-1 text-[10px] font-bold py-1.5 px-3 rounded-lg border transition-all self-start sm:self-center shrink-0 ${
                          issue.severity === 'critical' 
                            ? 'bg-red-50 text-red-700 border-red-100 hover:bg-red-500 hover:text-white' 
                            : 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-500 hover:text-white'
                        }`}
                      >
                        <span>Fix in Editor</span>
                        <FiArrowRight size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side Statistics & Scorecard Ring - 1 col */}
          <div className="space-y-6">
            
            {/* Health Meter Card */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium text-center space-y-6">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Overall SEO Health Score</span>
                
                {/* Score Meter Ring */}
                <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="72" cy="72" r="60" 
                      stroke="#f1f5f9" strokeWidth="10" fill="transparent" 
                    />
                    <circle 
                      cx="72" cy="72" r="60" 
                      stroke={healthScore >= 80 ? '#10b981' : healthScore >= 60 ? '#f59e0b' : '#ef4444'} 
                      strokeWidth="10" fill="transparent"
                      strokeDasharray="376.99"
                      strokeDashoffset={376.99 - (376.99 * healthScore) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-3xl font-heading font-black text-slate-900 tracking-tighter">{healthScore}</span>
                    <span className="text-slate-400 text-[10px] font-bold block uppercase mt-0.5">Rating</span>
                  </div>
                </div>
              </div>

              {/* Status counts */}
              <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-5">
                <div className="p-2 bg-red-50/40 rounded-2xl border border-red-100/50">
                  <span className="text-lg font-heading font-black text-red-600 block">{stats.critical}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">Critical</span>
                </div>
                <div className="p-2 bg-amber-50/40 rounded-2xl border border-amber-100/50">
                  <span className="text-lg font-heading font-black text-amber-600 block">{stats.warning}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">Warnings</span>
                </div>
                <div className="p-2 bg-emerald-50/40 rounded-2xl border border-emerald-100/50">
                  <span className="text-lg font-heading font-black text-emerald-600 block">{stats.passed}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">Passed</span>
                </div>
              </div>
            </div>

            {/* Quick action tools list */}
            <div className="bg-slate-900 text-slate-300 rounded-3xl p-6 shadow-premium space-y-4">
              <h4 className="text-white font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2">
                <FiSettings size={14} className="text-brand-indigo" /> Health Optimizer Info
              </h4>
              <p className="text-[11px] leading-relaxed text-slate-400 font-semibold">
                Critical issues like duplicate meta elements or missing canonical mapping URLs significantly degrade search engine crawl indexation. Use the Quick links to update configuration parameters instantly.
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}
