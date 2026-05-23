import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import QuickReplies from './QuickReplies';
import { FaRobot, FaTimes, FaPaperPlane, FaMagic } from 'react-icons/fa';

const WelcomeContent = () => (
  <div className="space-y-2">
    <h4 className="text-lg font-bold">👋 Welcome to TSquadron AI</h4>
    <p className="text-sm opacity-90">I can help you with:</p>
    <ul className="text-sm space-y-1 list-none pl-1">
      <li>• SEO services</li>
      <li>• Website development</li>
      <li>• Branding</li>
      <li>• Pricing</li>
      <li>• Digital marketing strategies</li>
      <li>• Consultation bookings</li>
    </ul>
    <p className="text-sm pt-2 font-medium">How can I assist your business today?</p>
  </div>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatbotState, setChatbotState] = useState('idle'); // idle, collecting_booking, booking_confirmed, general_chat
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: <WelcomeContent />,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isWelcome: true
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    let currentState = chatbotState;
    const lowerText = text.toLowerCase();
    
    // Intent detection
    if ((lowerText.includes('book') || lowerText.includes('schedule')) && 
        (lowerText.includes('appointment') || lowerText.includes('consultation') || lowerText.includes('call'))) {
      currentState = 'collecting_booking';
      setChatbotState('collecting_booking');
      console.log("Current chatbot state: collecting_booking");
    } else if (currentState === 'idle') {
      currentState = 'general_chat';
      setChatbotState('general_chat');
      console.log("Current chatbot state: general_chat");
    }

    const userMessage = {
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Create message history for the API call (mapping content string if welcome)
      const history = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.isWelcome ? "Welcome message displayed." : m.content
      }));

      // Call our InsForge backend endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: history })
      });

      const data = await response.json();
      
      let finalReply = data.reply;
      
      // Safe Parser Guard: Only execute IF message includes trigger AND state is collecting_booking
      if (finalReply?.includes('[BOOK_APPOINTMENT:') && currentState === 'collecting_booking') {
        const bookingMatch = finalReply.match(/\[BOOK_APPOINTMENT:\s*({[\s\S]*?})\s*\]/);
        if (bookingMatch) {
          try {
            const bookingData = JSON.parse(bookingMatch[1]);
            // Call Real API
            const bookingRes = await fetch('/api/appointments', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(bookingData)
            });
            const bookingResult = await bookingRes.json();
            
            if (bookingRes.ok) {
              console.log("BOOKING SAVED:", bookingResult.appointment);
              
              // Clear temporary booking variables and reset state
              setChatbotState('general_chat');
              console.log("Booking flow completed");
              console.log("Switching back to general chat mode");
              console.log("Current chatbot state: general_chat");
              
              // Render Success UI
              finalReply = (
                <div className="bg-gradient-to-br from-brand-indigo to-brand-violet text-white p-4 rounded-xl border border-brand-cyan/30 shadow-lg mt-1 mb-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-brand-indigo font-bold text-xs shadow-[0_0_10px_rgba(74,222,128,0.5)]">✓</div>
                    <h4 className="font-bold text-sm tracking-wide">Consultation Scheduled!</h4>
                  </div>
                  <div className="space-y-1.5 bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/10">
                    <p className="text-xs text-white/90"><strong>Service:</strong> {bookingData.service}</p>
                    <p className="text-xs text-white/90"><strong>Date:</strong> {bookingData.date}</p>
                    <p className="text-xs text-white/90"><strong>Time:</strong> {bookingData.time}</p>
                  </div>
                  <p className="text-xs text-brand-cyan font-medium mt-3 text-center">Our TSquadron team will contact you shortly.</p>
                </div>
              );
            } else {
               // Slot taken or error
               finalReply = `⚠️ ${bookingResult.error || 'Unable to complete booking right now. Please try again.'}`;
            }
          } catch (e) {
            console.error("Booking parsing error:", e);
            // Fallback: do not crash, strip JSON and continue normal AI conversation
            finalReply = finalReply.replace(/\[BOOK_APPOINTMENT:\s*({[\s\S]*?})\s*\]/, '').trim() || "Let me check our availability.";
          }
        }
      } else if (finalReply?.includes('[BOOK_APPOINTMENT:')) {
        // Safe parser guard prevents false triggers. Strip the raw JSON.
        finalReply = finalReply.replace(/\[BOOK_APPOINTMENT:\s*({[\s\S]*?})\s*\]/, '').trim();
        if (!finalReply) {
          finalReply = "I can certainly help you schedule that. When would you like to book a consultation?";
        }
      }

      setIsTyping(false);

      if (finalReply) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: finalReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } else {
        throw new Error('No reply from server');
      }

    } catch (error) {
      console.error("Chat error:", error);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, I encountered a temporary issue. Please try again later.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button 
          onClick={toggleChat}
          className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-brand-indigo to-brand-violet hover:from-brand-violet hover:to-brand-cyan text-white shadow-[0_8px_30px_rgba(22,60,140,0.4)] transition-all duration-300 hover:scale-105 z-50 flex items-center justify-center group"
          aria-label="Open Chat"
        >
          <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse"></div>
          <FaMagic className="absolute top-2 right-2 text-white/70 w-3 h-3 group-hover:animate-spin" />
          <FaRobot size={26} className="relative z-10" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[400px] bg-white/70 backdrop-blur-2xl rounded-[24px] shadow-premium border border-white z-50 flex flex-col overflow-hidden transition-all duration-400 ease-out transform origin-bottom-right" 
          style={{ maxHeight: '85vh', height: '680px', boxShadow: '0 20px 40px rgba(22, 60, 140, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5) inset' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-indigo to-brand-violet p-5 flex justify-between items-center text-white relative overflow-hidden shrink-0 shadow-sm">
            {/* Header ambient effects */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/20 rounded-full filter blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="flex items-center space-x-4 relative z-10">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-cyan to-white/20 p-[2px]">
                  <div className="w-full h-full bg-brand-indigo rounded-full flex items-center justify-center">
                    <FaRobot size={20} className="text-white" />
                  </div>
                </div>
                {/* Online Indicator */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-brand-indigo shadow-[0_0_8px_rgba(74,222,128,0.6)]">
                  <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">TSquadron AI Assistant</h3>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span className="text-xs text-brand-cyan font-medium">Online Now</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={toggleChat} 
              className="relative z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
              aria-label="Close Chat"
            >
              <FaTimes size={14} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-5 overflow-y-auto overscroll-contain bg-gradient-to-b from-transparent to-slate-50/50">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}
            {isTyping && <ChatMessage isTyping={true} />}
            {messages.length === 1 && (
              <QuickReplies onSelect={handleSend} />
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/80 backdrop-blur-lg border-t border-white shadow-[0_-10px_20px_rgba(0,0,0,0.02)] shrink-0 rounded-b-[24px]">
            <div className="relative flex items-center bg-white border border-slate-200/60 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300 focus-within:border-brand-cyan/50 focus-within:shadow-[0_0_0_4px_rgba(94,156,179,0.1)] p-1.5 pr-2">
              <div className="pl-3 pr-2 text-brand-cyan/70">
                <FaMagic size={14} />
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask TSquadron AI anything..."
                rows={1}
                className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-400 py-2.5 resize-none scrollbar-thin self-center"
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-brand-indigo hover:bg-brand-violet text-white disabled:bg-slate-100 disabled:text-slate-400 transition-all duration-300 transform active:scale-95"
              >
                <FaPaperPlane size={14} className={input.trim() ? "ml-1" : ""} />
              </button>
            </div>
            
            <div className="text-center mt-3">
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                Powered by TSquadron AI Engine
              </span>
            </div>
          </div>
          
        </div>
      )}
    </>
  );
};

export default Chatbot;
