import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiSearch, FiFilter, FiDownload, FiCheck, 
  FiMail, FiPhone, FiTrash2, FiClock, FiCheckSquare, FiAlertCircle 
} from 'react-icons/fi'
import { db } from '../../lib/db'

export default function AdminLeads() {
  const [leads, setLeads] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedLead, setSelectedLead] = useState(null)

  useEffect(() => {
    setLeads(db.getLeads())

    const handleStorageChange = (e) => {
      if (e.key === 'tsquadron_leads') {
        setLeads(db.getLeads())
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Filter logic
  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (id, status) => {
    const updated = db.updateLeadStatus(id, status)
    setLeads(updated)
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(prev => ({ ...prev, status }))
    }
  }

  const handleDeleteLead = (id) => {
    if (window.confirm('Are you sure you want to permanently delete this lead?')) {
      const updated = db.deleteLead(id)
      setLeads(updated)
      setSelectedLead(null)
    }
  }

  // Export leads to CSV file format
  const exportToCSV = () => {
    const headers = ['Date', 'Name', 'Email', 'Phone', 'ServiceRequested', 'Company', 'Message', 'Status']
    const rows = filteredLeads.map(l => [
      new Date(l.date).toLocaleDateString(),
      `"${l.name.replace(/"/g, '""')}"`,
      l.email,
      `"${l.phone || ''}"`,
      `"${l.service}"`,
      `"${l.company || ''}"`,
      `"${l.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      l.status
    ])

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `tsquadron_leads_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Page Title & CSV Exporter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-3xl font-heading font-black text-slate-900 tracking-tight">Leads Inbox</h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Manage, filter, and track inquiries submitted by prospective clients.
          </p>
        </div>
        <button
          onClick={exportToCSV}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-bold text-xs rounded-xl shadow-premium hover:shadow-hover-glow transition-all duration-300 shrink-0"
        >
          <FiDownload size={14} />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Filter and Search Panel */}
      <div className="bg-slate-50/50 border border-slate-200/60 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search leads by name, email, service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 focus:border-brand-indigo focus:ring-2 focus:ring-brand-indigo/10 rounded-xl text-slate-800 text-xs focus:outline-none transition-all"
          />
          <FiSearch className="absolute left-3.5 top-3.5 text-brand-label" size={14} />
        </div>

        {/* Status filters */}
        <div className="flex flex-wrap items-center gap-1">
          {['All', 'New', 'Contacted', 'Converted', 'Closed'].map((status) => {
            const count = status === 'All' 
              ? leads.length 
              : leads.filter(l => l.status === status).length;
            
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${ statusFilter === status ? 'bg-brand-indigo text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200/80 hover:text-slate-700 hover:bg-slate-50' }`}
              >
                <span>{status}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${ statusFilter === status ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600' }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Leads Table & Detail View Container */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Table list */}
        <div className={`${selectedLead ? 'xl:col-span-7' : 'xl:col-span-12'} bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium overflow-hidden transition-all duration-300`}>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] text-brand-label uppercase font-bold text-left tracking-wider">
                  <th className="pb-3 pl-3">Contact</th>
                  <th className="pb-3">Service Focus</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 pr-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr 
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`border-b border-slate-100/50 hover:bg-slate-50/40 cursor-pointer transition-colors ${ selectedLead && selectedLead.id === lead.id ? 'bg-brand-indigo/[0.02]' : '' }`}
                  >
                    <td className="py-4 pl-3">
                      <span className="font-semibold text-slate-800 block text-sm">{lead.name}</span>
                      <span className="text-brand-label font-sans">{lead.email}</span>
                    </td>
                    <td className="py-4">
                      <span className="text-slate-600 font-medium font-sans">{lead.service}</span>
                      {lead.company && <span className="text-[10px] text-brand-label font-sans block">{lead.company}</span>}
                    </td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold font-heading ${ lead.status === 'New' ? 'bg-orange-50 text-orange-600 border border-orange-100' : lead.status === 'Contacted' ? 'bg-brand-indigo/5 text-brand-indigo border border-brand-indigo/10' : lead.status === 'Converted' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-600 border border-slate-200' }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-4 text-brand-label font-sans">
                      {new Date(lead.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="py-4 pr-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-2 text-brand-label hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        title="Delete Lead"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-brand-label">
                      No matching leads found in repository.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Lead Side-drawer Panel */}
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-6 sticky top-6"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-indigo animate-pulse"></span>
                <h3 className="font-heading font-bold text-slate-950 text-base">Inquiry Details</h3>
              </div>
              <button 
                onClick={() => setSelectedLead(null)} 
                className="text-xs text-brand-label hover:text-slate-600 font-semibold border border-slate-200 rounded-lg px-2.5 py-1 transition-colors"
              >
                Close
              </button>
            </div>

            {/* Profile badge details */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-brand-indigo/10 flex items-center justify-center font-heading font-bold text-brand-indigo text-lg shrink-0">
                {selectedLead.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
              </div>
              <div className="min-w-0 space-y-1">
                <p className="text-base font-bold text-slate-900 leading-tight">{selectedLead.name}</p>
                {selectedLead.company && (
                  <p className="text-xs font-semibold text-slate-600 leading-none">{selectedLead.company}</p>
                )}
                <span className="text-[10px] text-brand-label font-sans block">
                  Received {new Date(selectedLead.date).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50/30 border border-slate-200/60 p-3.5 rounded-xl space-y-1">
                  <span className="text-[9px] text-brand-label uppercase font-bold font-sans block">Email Address</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-xs text-brand-indigo font-bold hover:underline block truncate font-sans">
                    {selectedLead.email}
                  </a>
                </div>
                <div className="bg-slate-50/30 border border-slate-200/60 p-3.5 rounded-xl space-y-1">
                  <span className="text-[9px] text-brand-label uppercase font-bold font-sans block">Phone Line</span>
                  {selectedLead.phone ? (
                    <a href={`tel:${selectedLead.phone}`} className="text-xs text-slate-700 font-semibold hover:underline block font-sans">
                      {selectedLead.phone}
                    </a>
                  ) : (
                    <span className="text-xs text-brand-label font-sans block">Not provided</span>
                  )}
                </div>
              </div>

              <div className="bg-slate-50/30 border border-slate-200/60 p-4 rounded-xl space-y-1">
                <span className="text-[9px] text-brand-label uppercase font-bold font-sans block">Requested Service</span>
                <span className="text-xs text-slate-800 font-bold block">{selectedLead.service}</span>
              </div>

              {/* Message Details */}
              <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-2">
                <span className="text-[9px] text-brand-label uppercase font-bold font-sans block">Message Context</span>
                <p className="text-xs text-slate-700 font-sans leading-relaxed whitespace-pre-line">
                  {selectedLead.message}
                </p>
              </div>
            </div>

            {/* Status change actions */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <span className="text-[9px] text-brand-label uppercase font-bold font-sans block">Set Lead Status</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { status: 'Contacted', label: 'Contacted', activeColor: 'bg-brand-indigo text-white border-brand-indigo', hoverColor: 'border-slate-200 text-slate-600 hover:bg-slate-50' },
                  { status: 'Converted', label: 'Converted', activeColor: 'bg-emerald-600 text-white border-emerald-600', hoverColor: 'border-slate-200 text-slate-600 hover:bg-slate-50' },
                  { status: 'Closed', label: 'Closed', activeColor: 'bg-slate-600 text-white border-slate-600', hoverColor: 'border-slate-200 text-slate-600 hover:bg-slate-50' }
                ].map((action) => {
                  const isCurrent = selectedLead.status === action.status;
                  return (
                    <button
                      key={action.status}
                      onClick={() => handleStatusChange(selectedLead.id, action.status)}
                      className={`border text-[11px] font-bold py-2 rounded-lg transition-all text-center ${ isCurrent ? action.activeColor : action.hoverColor }`}
                    >
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
