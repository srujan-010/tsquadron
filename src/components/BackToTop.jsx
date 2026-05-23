import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 p-4 rounded-full bg-gradient-to-tr from-brand-indigo to-brand-violet text-white hover:shadow-lg hover:shadow-brand-indigo/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center shadow-md border border-white/10 group"
      aria-label="Back to Top"
    >
      <span className="text-xs font-heading font-bold uppercase tracking-wider max-w-0 overflow-hidden group-hover:max-w-[100px] group-hover:pr-2 transition-all duration-300 whitespace-nowrap leading-none">
        Back to Top
      </span>
      <FiArrowUp size={20} />
    </button>
  );
};

export default BackToTop;
