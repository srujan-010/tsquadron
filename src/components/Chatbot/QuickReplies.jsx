import React from 'react';
import { FaSearch, FaDesktop, FaChartLine, FaPhone, FaRocket } from 'react-icons/fa';

const QuickReplies = ({ onSelect }) => {
  const replies = [
    { text: "SEO Services", icon: <FaSearch className="text-brand-cyan" /> },
    { text: "Website Design", icon: <FaDesktop className="text-brand-violet" /> },
    { text: "Pricing Plans", icon: <FaChartLine className="text-brand-emerald" /> },
    { text: "Contact Team", icon: <FaPhone className="text-brand-indigo" /> },
    { text: "Book Consultation", icon: <FaRocket className="text-brand-rose" /> }
  ];

  return (
    <div className="flex flex-col gap-2 mt-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
      <p className="text-xs font-semibold text-brand-label mb-1 px-1">Popular Actions</p>
      <div className="flex flex-wrap gap-2">
        {replies.map((reply, index) => (
          <button
            key={index}
            onClick={() => onSelect(reply.text)}
            className="flex items-center space-x-2 text-xs bg-white/60 hover:bg-white backdrop-blur-md text-brand-indigo border border-white/50 shadow-sm hover:shadow-hover-glow px-4 py-2 rounded-full transition-all duration-300 ease-out font-medium hover:-translate-y-0.5 group"
          >
            <span className="group-hover:scale-110 transition-transform duration-300">{reply.icon}</span>
            <span>{reply.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickReplies;
