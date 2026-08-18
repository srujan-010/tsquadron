import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiPlus, FiEdit2, FiTrash2, FiCheck, FiX, FiImage, 
  FiArrowUp, FiArrowDown, FiSearch, FiUploadCloud, FiEye, FiEyeOff, FiLayers
} from 'react-icons/fi'
import { db } from '../../lib/db'

export default function AdminClients() {
  const [clients, setClients] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [isUploading, setIsUploading] = useState(false)

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    logoUrl: '',
    displayOrder: 1,
    isActive: true
  })

  const loadClients = () => {
    setClients(db.getClients())
  }

  useEffect(() => {
    loadClients()
    window.addEventListener('clients-updated', loadClients)
    return () => window.removeEventListener('clients-updated', loadClients)
  }, [])

  const handleCreateNewClick = () => {
    const maxOrder = clients.length > 0 ? Math.max(...clients.map(c => c.displayOrder || 0)) : 0
    setFormData({
      id: null,
      name: '',
      logoUrl: '',
      displayOrder: maxOrder + 1,
      isActive: true
    })
    setIsEditing(true)
    setSuccessMsg('')
    setErrorMsg('')
  }

  const handleEditClick = (client) => {
    setFormData({
      id: client.id,
      name: client.name,
      logoUrl: client.logoUrl || '',
      displayOrder: client.displayOrder || 1,
      isActive: client.isActive !== false
    })
    setIsEditing(true)
    setSuccessMsg('')
    setErrorMsg('')
  }

  const handleDeleteClick = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      db.deleteClient(id)
      setSuccessMsg(`Client "${name}" deleted successfully.`)
      setTimeout(() => setSuccessMsg(''), 3000)
    }
  }

  const handleToggleActive = (id) => {
    db.toggleClientActive(id)
  }

  const handleMoveOrder = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= clients.length) return

    const reordered = [...clients]
    const temp = reordered[index]
    reordered[index] = reordered[newIndex]
    reordered[newIndex] = temp

    db.reorderClients(reordered)
  }

  // Handle image upload and convert to base64 Data URL (supports PNG, JPG, JPEG, WEBP, SVG)
  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validations: file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('File size exceeds 5MB limit. Please upload a smaller image.')
      return
    }

    const acceptedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml']
    if (!acceptedTypes.includes(file.type)) {
      setErrorMsg('Unsupported format. Please upload PNG, JPG, JPEG, WebP, or SVG.')
      return
    }

    setErrorMsg('')
    setIsUploading(true)

    const reader = new FileReader()
    reader.onload = () => {
      setFormData(prev => ({
        ...prev,
        logoUrl: reader.result
      }))
      setIsUploading(false)
    }
    reader.onerror = () => {
      setErrorMsg('Failed to process image file.')
      setIsUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      setErrorMsg('Client Name is required.')
      return
    }

    // Check duplicate name
    const existing = clients.find(c => 
      c.name.toLowerCase() === formData.name.trim().toLowerCase() && 
      c.id !== formData.id
    )
    if (existing) {
      setErrorMsg('A client with this name already exists.')
      return
    }

    db.saveClient({
      id: formData.id,
      name: formData.name.trim(),
      logoUrl: formData.logoUrl.trim(),
      displayOrder: Number(formData.displayOrder) || 1,
      isActive: formData.isActive
    })

    setIsEditing(false)
    setSuccessMsg(formData.id ? 'Client updated successfully!' : 'New client registered successfully!')
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || 
      (statusFilter === 'Active' && c.isActive !== false) || 
      (statusFilter === 'Inactive' && c.isActive === false)
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-8 font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-slate-900 tracking-tight">Client Logos Manager</h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
            Manage the verified client brand logos displayed on the Home page showcase.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={handleCreateNewClick}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-bold text-xs rounded-xl shadow-premium transition-all duration-300 cursor-pointer self-start sm:self-auto"
          >
            <FiPlus size={16} />
            <span>Add Client Logo</span>
          </button>
        )}
      </div>

      {/* Notifications */}
      {successMsg && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold flex items-center gap-2 max-w-md shadow-xs"
        >
          <FiCheck size={16} />
          <span>{successMsg}</span>
        </motion.div>
      )}

      {errorMsg && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-2 max-w-md shadow-xs"
        >
          <FiX size={16} />
          <span>{errorMsg}</span>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {isEditing ? (
          /* Client Form Modal / Card */
          <motion.form
            key="edit-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            onSubmit={handleFormSubmit}
            className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-premium space-y-6 max-w-2xl text-left"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-heading font-bold text-slate-900 text-base block">
                  {formData.id ? 'Modify Client Record' : 'Register New Client'}
                </span>
                <span className="text-[11px] text-slate-500 font-sans">
                  Configure client logo asset and visibility on the public showcase
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Client Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                Client Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Sai Chandar Child Neuro Care"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all font-medium"
                required
              />
            </div>

            {/* Logo Upload Section */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                Client Logo
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* Upload Zone */}
                <div className="sm:col-span-8">
                  <label className="border-2 border-dashed border-slate-200 hover:border-brand-indigo/50 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-slate-50/50 hover:bg-slate-50 relative group">
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                      onChange={handleLogoUpload} 
                      className="hidden" 
                      disabled={isUploading}
                    />
                    {isUploading ? (
                      <div className="space-y-2 py-2">
                        <div className="w-6 h-6 border-2 border-brand-indigo border-t-transparent rounded-full animate-spin mx-auto" />
                        <span className="text-xs text-slate-600 font-medium block">Encoding logo...</span>
                      </div>
                    ) : (
                      <div className="space-y-2 py-1">
                        <div className="w-9 h-9 bg-white border border-slate-100 shadow-xs rounded-xl flex items-center justify-center text-slate-400 group-hover:text-brand-indigo mx-auto transition-all">
                          <FiUploadCloud size={18} />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-slate-700 block">Click to upload logo file</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">PNG, JPG, WebP, SVG (Max 5MB)</span>
                        </div>
                      </div>
                    )}
                  </label>
                </div>

                {/* Logo Preview Container */}
                <div className="sm:col-span-4 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
                    Live Preview
                  </span>
                  <div className="w-full h-28 bg-white border border-slate-200/80 rounded-2xl p-3 flex items-center justify-center shadow-xs overflow-hidden relative group">
                    {formData.logoUrl ? (
                      <>
                        <img 
                          src={formData.logoUrl} 
                          alt="Preview" 
                          className="max-h-20 w-auto max-w-[90%] object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, logoUrl: '' }))}
                          className="absolute top-1 right-1 p-1 bg-rose-50 text-rose-600 rounded-md hover:bg-rose-100 transition-colors"
                          title="Remove logo"
                        >
                          <FiTrash2 size={12} />
                        </button>
                      </>
                    ) : (
                      <div className="text-center p-2">
                        <FiImage size={24} className="text-slate-300 mx-auto mb-1" />
                        <span className="text-[10px] text-slate-400 font-sans block">No logo set</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Or manual URL input */}
              <div className="pt-1">
                <span className="text-[10px] text-slate-400 font-medium block mb-1">Or paste direct Image / Cloudinary URL:</span>
                <input
                  type="text"
                  placeholder="https://res.cloudinary.com/... or /logo.png"
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all font-mono"
                />
              </div>
            </div>

            {/* Display Order & Status Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                  Display Order Sequence
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-brand-indigo focus:bg-white transition-all font-medium"
                />
                <span className="text-[10px] text-slate-400 block">Lowest numbers appear first on the Home page.</span>
              </div>

              <div className="space-y-1.5 flex flex-col justify-center">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                  Visibility Status
                </label>
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="client-active-checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4.5 h-4.5 text-brand-indigo border border-slate-300 rounded focus:ring-0 focus:outline-none cursor-pointer"
                  />
                  <label htmlFor="client-active-checkbox" className="text-xs text-slate-700 font-semibold cursor-pointer select-none">
                    Active (Showcase on Home Page)
                  </label>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-heading font-semibold text-xs rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-brand-indigo hover:bg-brand-violet text-white font-heading font-semibold text-xs rounded-xl shadow-premium transition-all"
              >
                Save Client
              </button>
            </div>
          </motion.form>
        ) : (
          /* Client List Table */
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-5"
          >
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-slate-100">
              <div className="relative w-full sm:w-72">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-indigo focus:bg-white transition-all"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-slate-500 font-semibold hidden sm:inline">Status:</span>
                <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                  {['All', 'Active', 'Inactive'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setStatusFilter(filter)}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        statusFilter === filter 
                          ? 'bg-white text-slate-900 shadow-xs' 
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto w-full">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] text-slate-400 uppercase font-bold text-left tracking-wider">
                    <th className="pb-3 pl-3 w-16">Order</th>
                    <th className="pb-3 w-28">Logo</th>
                    <th className="pb-3">Client Name</th>
                    <th className="pb-3 w-32">Status</th>
                    <th className="pb-3 pr-3 text-right w-36">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/70">
                  {filteredClients.map((client, idx) => {
                    const isFirst = idx === 0
                    const isLast = idx === filteredClients.length - 1
                    return (
                      <tr key={client.id} className="hover:bg-slate-50/60 transition-colors group">
                        {/* Order & Reorder Controls */}
                        <td className="py-3.5 pl-3">
                          <div className="flex items-center gap-1">
                            <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px] flex items-center justify-center font-mono">
                              {client.displayOrder}
                            </span>
                            <div className="flex flex-col">
                              <button
                                onClick={() => handleMoveOrder(idx, 'up')}
                                disabled={isFirst}
                                className={`p-0.5 text-slate-400 hover:text-slate-700 transition-colors ${isFirst ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}`}
                                title="Move Up"
                              >
                                <FiArrowUp size={10} />
                              </button>
                              <button
                                onClick={() => handleMoveOrder(idx, 'down')}
                                disabled={isLast}
                                className={`p-0.5 text-slate-400 hover:text-slate-700 transition-colors ${isLast ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}`}
                                title="Move Down"
                              >
                                <FiArrowDown size={10} />
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Logo Thumbnail */}
                        <td className="py-3.5">
                          <div className="w-20 h-12 rounded-xl bg-white border border-slate-200/80 p-1.5 flex items-center justify-center shadow-2xs overflow-hidden">
                            {client.logoUrl ? (
                              <img 
                                src={client.logoUrl} 
                                alt={client.name} 
                                className="max-h-full max-w-full object-contain"
                              />
                            ) : (
                              <span className="text-[9px] text-slate-400 font-sans italic">No logo</span>
                            )}
                          </div>
                        </td>

                        {/* Client Name */}
                        <td className="py-3.5 font-medium text-slate-800">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900 text-sm block">{client.name}</span>
                          </div>
                        </td>

                        {/* Status Toggle Badge */}
                        <td className="py-3.5">
                          <button
                            onClick={() => handleToggleActive(client.id)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold font-heading border transition-all cursor-pointer ${
                              client.isActive !== false
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
                                : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200/70'
                            }`}
                            title="Click to toggle visibility"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${client.isActive !== false ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                            <span>{client.isActive !== false ? 'Active' : 'Inactive'}</span>
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 pr-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleEditClick(client)}
                              className="p-2 text-slate-600 hover:text-brand-indigo hover:bg-slate-100 rounded-xl transition-all"
                              title="Edit Client"
                            >
                              <FiEdit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(client.id, client.name)}
                              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                              title="Delete Client"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}

                  {filteredClients.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-12 text-slate-400">
                        {searchTerm ? 'No clients match your search criteria.' : 'No clients registered yet.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer summary */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
              <span>Total: <strong>{clients.length}</strong> clients ({clients.filter(c => c.isActive !== false).length} active)</span>
              <span>Changes reflect automatically on the Home page.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
