import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiImage, FiPlus, FiTrash2, FiCopy, FiCheck, FiUploadCloud } from 'react-icons/fi'
import { db } from '../../lib/db'

export default function AdminMedia() {
  const [mediaList, setMediaList] = useState([])
  const [copiedId, setCopiedId] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    setMediaList(db.getMedia())
  }, [])

  // Clipboard copy URL utility
  const handleCopyLink = (item) => {
    navigator.clipboard.writeText(item.url)
    setCopiedId(item.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDeleteMedia = (id) => {
    if (window.confirm('Remove this media asset from directory?')) {
      const updated = db.deleteMedia(id)
      setMediaList(updated)
    }
  }

  // Simulated file upload convert to mock object
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsUploading(true)

    const reader = new FileReader()
    reader.onload = () => {
      // Simulate file upload latency
      setTimeout(() => {
        const newItem = {
          name: file.name,
          url: reader.result, // base64 representation of the uploaded file
          size: `${(file.size / 1024).toFixed(0)} KB`
        }
        db.addMedia(newItem)
        setMediaList(db.getMedia())
        setIsUploading(false)
      }, 1000)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-heading font-black text-slate-900 tracking-tight">Media Library</h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
          Manage graphics assets, photos, and copy source paths for pages/blogs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        {/* Left Upload Dragzone */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-4">
          <h3 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-50 pb-2">Upload Asset</h3>
          
          <label className="border-2 border-dashed border-slate-200 hover:border-brand-indigo/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-slate-50/50 hover:bg-slate-50 relative group">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileUpload} 
              className="hidden" 
              disabled={isUploading}
            />
            {isUploading ? (
              <div className="space-y-3">
                <div className="w-8 h-8 border-3 border-brand-indigo border-t-transparent rounded-full animate-spin mx-auto" />
                <span className="text-xs text-slate-600 font-medium block">Compiling asset details...</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-10 h-10 bg-white border border-slate-100 shadow-sm rounded-xl flex items-center justify-center text-brand-label group-hover:text-brand-indigo group-hover:border-brand-indigo/20 mx-auto transition-all">
                  <FiUploadCloud size={20} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-700 block">Select Image File</span>
                  <span className="text-[10px] text-brand-label block mt-0.5">Supports JPG, PNG, WEBP (Max 5MB)</span>
                </div>
              </div>
            )}
          </label>
        </div>

        {/* Right Gallery Grid */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-premium space-y-6">
          <h3 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-50 pb-2">Assets Vault</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {mediaList.map((item) => {
              const isCopied = copiedId === item.id
              return (
                <div key={item.id} className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/30 flex flex-col justify-between group hover:shadow-premium hover:border-slate-200/80 transition-all">
                  
                  {/* Thumbnail */}
                  <div className="aspect-video w-full relative bg-slate-100 border-b border-slate-100 flex items-center justify-center overflow-hidden">
                    {item.url ? (
                      <img 
                        src={item.url} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <FiImage size={24} className="text-brand-label" />
                    )}
                  </div>

                  {/* Meta and actions info */}
                  <div className="p-3 space-y-2 text-left">
                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-slate-700 block truncate" title={item.name}>{item.name}</span>
                      <span className="text-[9px] text-brand-label block font-mono mt-0.5">{item.size || 'Unknown Size'}</span>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1.5 border-t border-slate-50">
                      <button
                        onClick={() => handleCopyLink(item)}
                        className={`flex-grow flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${ isCopied ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-white border-slate-200 text-slate-600 hover:text-brand-indigo hover:border-brand-indigo/35' }`}
                      >
                        {isCopied ? <FiCheck size={11} /> : <FiCopy size={11} />}
                        <span>{isCopied ? 'Copied' : 'Copy link'}</span>
                      </button>
                      <button
                        onClick={() => handleDeleteMedia(item.id)}
                        className="p-1.5 text-brand-label hover:text-red-500 border border-slate-200 hover:border-red-100 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete asset"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    </div>
                  </div>

                </div>
              )
            })}

            {mediaList.length === 0 && (
              <div className="col-span-full py-12 text-center text-brand-label text-xs">
                No media assets uploaded yet.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
