import React from 'react'
import { motion } from 'framer-motion'

export default function GlowingCard({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: delay }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`relative rounded-3xl p-[1px] bg-gradient-to-tr from-slate-100 to-slate-200/60 hover:from-brand-indigo/30 hover:via-brand-violet/20 hover:to-brand-cyan/30 transition-all duration-500 overflow-hidden group shadow-premium hover:shadow-hover-glow ${className}`}
    >
      {/* Background glow backplate, floats on hover */}
      <div className="absolute -inset-10 bg-gradient-to-tr from-brand-indigo to-brand-cyan opacity-0 group-hover:opacity-5 transition-opacity duration-700 blur-3xl pointer-events-none" />

      {/* Actual inner card */}
      <div className="relative w-full h-full rounded-[23px] bg-white/95 backdrop-blur-xl p-8 flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  )
}
