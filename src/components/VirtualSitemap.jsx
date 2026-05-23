import React, { useEffect, useState } from 'react'
import { FiGlobe, FiDownload, FiCheckCircle, FiCheck, FiInfo } from 'react-icons/fi'
import { db } from '../lib/db'

export default function VirtualSitemap() {
  const [xmlContent, setXmlContent] = useState('')
  const [urlsList, setUrlsList] = useState([])

  useEffect(() => {
    document.title = 'sitemap.xml | TSquadron Search Index'

    // 1. Fetch Sitemap configs
    const sitemapConfig = db.getSeoFile('sitemap.json', {
      includeServices: true,
      includeBlogs: true,
      changefreq: 'weekly',
      priorityHome: '1.0',
      priorityServices: '0.8',
      priorityBlogs: '0.6'
    })

    const domain = 'https://www.tsquadron.com'
    const today = new Date().toISOString().split('T')[0]

    // 2. Compile URL arrays
    const list = []

    // Static pages
    list.push({ loc: `${domain}/`, changefreq: 'daily', priority: sitemapConfig.priorityHome })
    list.push({ loc: `${domain}/about-us/`, changefreq: sitemapConfig.changefreq, priority: '0.8' })
    list.push({ loc: `${domain}/contact/`, changefreq: sitemapConfig.changefreq, priority: '0.8' })
    list.push({ loc: `${domain}/blog/`, changefreq: 'daily', priority: '0.8' })
    list.push({ loc: `${domain}/services/`, changefreq: sitemapConfig.changefreq, priority: '0.8' })
    list.push({ loc: `${domain}/privacy-policy/`, changefreq: sitemapConfig.changefreq, priority: '0.5' })

    // Services
    if (sitemapConfig.includeServices !== false) {
      const services = [
        'digital-marketing-agency-hanamkonda',
        'seo-company-in-hanamkonda',
        'social-media-marketing',
        'ppc-services-in-hanamkonda',
        'email-marketing-company-hanamkonda',
        'online-reputation-management-services-hanumakonda',
        'web-designing-development-company-hanumakonda',
        'ui-ux-designing-company-hanamkonda',
        'digital-marketing-training-in-warangal'
      ]
      services.forEach(s => {
        list.push({ loc: `${domain}/${s}/`, changefreq: sitemapConfig.changefreq, priority: sitemapConfig.priorityServices })
      })
    }

    // Blogs
    if (sitemapConfig.includeBlogs !== false) {
      const blogs = [
        'types-of-visibility-in-digital-marketing',
        'impact-of-online-reputation-management-on-seo',
        'impact-of-ui-ux-design-on-user-engagement',
        'future-of-email-marketing',
        'top-10-link-building-strategies',
        'future-of-social-media-marketing',
        'role-of-design-systems-in-web-development',
        'fundamentals-of-ui-ux-design',
        'role-of-social-media-in-online-reputation-management',
        'role-of-ai-in-email-marketing'
      ]
      blogs.forEach(b => {
        list.push({ loc: `${domain}/blog/${b}/`, changefreq: sitemapConfig.changefreq, priority: sitemapConfig.priorityBlogs })
      })
    }

    setUrlsList(list)

    // 3. Construct raw compliant XML schema string
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    list.forEach(item => {
      xml += '  <url>\n'
      xml += `    <loc>${item.loc}</loc>\n`
      xml += `    <lastmod>${today}</lastmod>\n`
      xml += `    <changefreq>${item.changefreq}</changefreq>\n`
      xml += `    <priority>${item.priority}</priority>\n`
      xml += '  </url>\n'
    })

    xml += '</urlset>'
    setXmlContent(xml)
  }, [])

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([xmlContent], { type: 'text/xml' })
    element.href = URL.createObjectURL(file)
    element.download = 'sitemap.xml'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-left font-sans">
      <div className="w-full max-w-3xl bg-white border border-slate-200/80 shadow-premium rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        
        {/* Dynamic header brand */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-indigo/5 text-brand-indigo rounded-xl flex items-center justify-center">
              <FiGlobe size={20} />
            </div>
            <div>
              <span className="font-heading font-black text-slate-900 block text-base tracking-wide uppercase">TSQUADRON MAPS</span>
              <span className="text-[10px] text-brand-label block font-semibold">Virtual sitemap.xml Compiler</span>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-[10px] font-bold text-brand-emerald flex items-center gap-1">
            <FiCheckCircle size={10} /> Active Dynamic Mode
          </span>
        </div>

        {/* Short context warning */}
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 text-xs leading-relaxed flex gap-3 items-start">
          <FiInfo className="text-brand-indigo shrink-0 mt-0.5" size={16} />
          <div className="space-y-1">
            <span className="font-bold text-slate-800 block">Sitemap XML Details</span>
            <p>
              A sitemap lists all of TSquadron\'s public website routes, helping Google and other search engines crawl and discover every single service and article. This sitemap compiles <strong>{urlsList.length} total URLs</strong> dynamically.
            </p>
          </div>
        </div>

        {/* Index Details summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
            <span className="text-[9px] text-brand-label uppercase font-semibold block">Total Indexed</span>
            <span className="text-lg font-heading font-black text-slate-900 block">{urlsList.length} pages</span>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
            <span className="text-[9px] text-brand-label uppercase font-semibold block">Format</span>
            <span className="text-lg font-heading font-black text-slate-900 block">XML 0.9</span>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
            <span className="text-[9px] text-brand-label uppercase font-semibold block">Services Schema</span>
            <span className="text-lg font-heading font-black text-brand-indigo block">Enabled ✓</span>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
            <span className="text-[9px] text-brand-label uppercase font-semibold block">Blogs Schema</span>
            <span className="text-lg font-heading font-black text-brand-indigo block">Enabled ✓</span>
          </div>
        </div>

        {/* Raw XML pre block */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Generated XML Schema Source</label>
          <pre className="w-full p-4 bg-slate-950 text-slate-200 border border-slate-900 rounded-2xl text-[11px] font-mono whitespace-pre overflow-x-auto max-h-[220px] leading-relaxed select-all">
            {xmlContent}
          </pre>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-[10px] text-brand-label font-mono">Location: /sitemap.xml</span>
          <button
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-bold text-xs rounded-xl shadow-premium hover:shadow-hover-glow transition-all duration-300"
          >
            <FiDownload size={14} />
            <span>Download sitemap.xml</span>
          </button>
        </div>

      </div>
    </div>
  )
}
