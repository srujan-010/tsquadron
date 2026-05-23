import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FiUsers, FiFileText, FiStar, FiMessageSquare, 
  FiTrendingUp, FiArrowUpRight, FiCheckCircle, FiTrash2 
} from 'react-icons/fi'
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  Tooltip, BarChart, Bar, Cell 
} from 'recharts'
import { db } from '../../lib/db'

export default function AdminDashboard() {
  const [leads, setLeads] = useState([])
  const [blogs, setBlogs] = useState([])
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    setLeads(db.getLeads())
    setBlogs(db.getBlogs())
    setTestimonials(db.getTestimonials())

    const handleStorageChange = (e) => {
      if (e.key === 'tsquadron_leads') {
        setLeads(db.getLeads())
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const totalLeads = leads.length
  const newLeads = leads.filter(l => l.status === 'New').length
  const totalBlogs = blogs.length
  
  const avgRating = testimonials.length > 0 
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : '0.0'

  // Stat Card Config
  const stats = [
    { 
      title: 'Total Inquiries', 
      value: totalLeads, 
      desc: 'All submitted audit requests', 
      icon: <FiUsers className="text-brand-indigo" size={20} />,
      bg: 'bg-brand-indigo/5'
    },
    { 
      title: 'Actionable Leads', 
      value: newLeads, 
      desc: 'New leads awaiting review', 
      icon: <FiTrendingUp className="text-orange-500" size={20} />,
      bg: 'bg-orange-50'
    },
    { 
      title: 'Blog Articles', 
      value: totalBlogs, 
      desc: 'Published insights pages', 
      icon: <FiFileText className="text-brand-violet" size={20} />,
      bg: 'bg-brand-violet/5'
    },
    { 
      title: 'Client Rating', 
      value: `${avgRating} ★`, 
      desc: 'Average review score rating', 
      icon: <FiStar className="text-yellow-500" size={20} />,
      bg: 'bg-yellow-50'
    }
  ]

  // Chart Data 1: Inquiries Timeline (Mock aggregated by date)
  const chartData = [
    { name: 'May 10', leads: 2 },
    { name: 'May 12', leads: 4 },
    { name: 'May 14', leads: 3 },
    { name: 'May 16', leads: 5 },
    { name: 'May 18', leads: 8 },
    { name: 'May 20', leads: totalLeads } // Dynamically connect current total
  ]

  // Chart Data 2: Services Inquiries Distribution
  const serviceDistribution = [
    { name: 'SEO', value: leads.filter(l => l.service.toLowerCase().includes('seo')).length || 1 },
    { name: 'UI/UX', value: leads.filter(l => l.service.toLowerCase().includes('ui/ux')).length || 2 },
    { name: 'SMM', value: leads.filter(l => l.service.toLowerCase().includes('social')).length || 1 },
    { name: 'Other', value: leads.filter(l => !l.service.toLowerCase().includes('seo') && !l.service.toLowerCase().includes('ui/ux') && !l.service.toLowerCase().includes('social')).length || 1 }
  ]

  const COLORS = ['#163C8C', '#2857A4', '#5E9CB3', '#7FB6C5']

  const handleMarkContacted = (id) => {
    const updated = db.updateLeadStatus(id, 'Contacted')
    setLeads(updated)
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-black text-slate-900 tracking-tight">Overview Dashboard</h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
            Operational telemetry and lead analytics for TSquadron.
          </p>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-premium flex items-start justify-between"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-brand-label uppercase tracking-widest block">{stat.title}</span>
              <span className="text-2xl sm:text-3xl font-heading font-black text-slate-900 block leading-none">{stat.value}</span>
              <span className="text-slate-600 text-xs block">{stat.desc}</span>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${stat.bg}`}>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Lead Trends Area Chart */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-sm">Lead Conversion Inquiries</h3>
              <p className="text-brand-label text-[11px]">Submitted requests over last 10 days.</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-indigo font-heading">
              Weekly telemetry <FiArrowUpRight size={14} />
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="leadGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#163C8C" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#163C8C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#0f172a', 
                    borderRadius: '16px', 
                    border: 'none', 
                    color: '#fff',
                    fontFamily: 'sans-serif',
                    fontSize: '11px'
                  }} 
                />
                <Area type="monotone" dataKey="leads" stroke="#163C8C" strokeWidth={2} fillOpacity={1} fill="url(#leadGlow)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Services breakdown Bar Chart */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-sm">Service Inquiries</h3>
              <p className="text-brand-label text-[11px]">Subservice request distribution.</p>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceDistribution} margin={{ top: 10, right: 0, left: -30, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ 
                    background: '#0f172a', 
                    borderRadius: '16px', 
                    border: 'none', 
                    color: '#fff',
                    fontSize: '11px'
                  }} 
                  cursor={{ fill: 'rgba(15, 23, 42, 0.02)' }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {serviceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom recent leads table widget */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-heading font-bold text-slate-900 text-sm">Active Incoming Leads</h3>
            <p className="text-brand-label text-[11px]">Latest submissions needing attention.</p>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] text-brand-label uppercase font-bold text-left tracking-wider">
                <th className="pb-3 pl-3">Contact</th>
                <th className="pb-3">Service Focus</th>
                <th className="pb-3">Message Snippet</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 3).map((lead) => (
                <tr key={lead.id} className="border-b border-slate-100/50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 pl-3">
                    <span className="font-semibold text-slate-800 block text-sm">{lead.name}</span>
                    <span className="text-brand-label font-sans">{lead.email}</span>
                  </td>
                  <td className="py-4 text-slate-600 font-medium font-sans">{lead.service}</td>
                  <td className="py-4 text-slate-600 max-w-[200px] truncate font-sans">{lead.message}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold font-heading ${ lead.status === 'New' ? 'bg-orange-50 text-orange-600 border border-orange-100' : lead.status === 'Contacted' ? 'bg-brand-indigo/5 text-brand-indigo border border-brand-indigo/10' : 'bg-emerald-50 text-emerald-600 border border-emerald-100' }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 pr-3 text-right">
                    {lead.status === 'New' && (
                      <button
                        onClick={() => handleMarkContacted(lead.id)}
                        className="p-2 text-brand-indigo hover:bg-brand-indigo/5 rounded-xl transition-all"
                        title="Mark as Contacted"
                      >
                        <FiCheckCircle size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
