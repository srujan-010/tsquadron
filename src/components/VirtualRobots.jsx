import React, { useEffect } from 'react'
import { FiFileText, FiDownload, FiCheckCircle } from 'react-icons/fi'
import { db } from '../lib/db'

export default function VirtualRobots() {
  // Read technical configuration
  const technicalConfig = db.getSeoFile('technical.json', {
    robotsTxt: 'User-agent: *\nAllow: /\n\nSitemap: https://www.tsquadron.com/sitemap.xml'
  })

  // Update visual browser tab title
  useEffect(() => {
    document.title = 'robots.txt | TSquadron Search Index'
  }, [])

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([technicalConfig.robotsTxt], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'robots.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-left font-sans">
      <div className="w-full max-w-2xl bg-white border border-slate-200/80 shadow-premium rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        
        {/* Dynamic header brand */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-indigo/5 text-brand-indigo rounded-xl flex items-center justify-center">
              <FiFileText size={20} />
            </div>
            <div>
              <span className="font-heading font-black text-slate-900 block text-base tracking-wide uppercase">TSQUADRON INDEX</span>
              <span className="text-[10px] text-brand-label block font-semibold">Virtual robots.txt Router</span>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-[10px] font-bold text-brand-emerald flex items-center gap-1">
            <FiCheckCircle size={10} /> Active Dynamic Mode
          </span>
        </div>

        {/* Short context warning */}
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 text-xs leading-relaxed space-y-1">
          <span className="font-bold text-slate-800 block">Crawler Directory Information</span>
          <p>
            This file tells search engine scrapers (such as Googlebot and Bingbot) which folders or pages on our server they are authorized to crawl. This file is dynamically managed by the TSquadron Admin SEO Manager.
          </p>
        </div>

        {/* Raw text display */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Raw robots.txt Content</label>
          <pre className="w-full p-4 bg-slate-950 text-slate-200 border border-slate-900 rounded-2xl text-[11px] font-mono whitespace-pre-wrap leading-relaxed select-all">
            {technicalConfig.robotsTxt}
          </pre>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-[10px] text-brand-label font-mono">Location: /robots.txt</span>
          <button
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-bold text-xs rounded-xl shadow-premium hover:shadow-hover-glow transition-all duration-300"
          >
            <FiDownload size={14} />
            <span>Download robots.txt</span>
          </button>
        </div>

      </div>
    </div>
  )
}
