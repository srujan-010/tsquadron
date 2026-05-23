import React from 'react';

const ChatMessage = ({ message, isTyping }) => {
  if (isTyping) {
    return (
      <div className="flex w-full mt-4 space-x-3 max-w-[85%] animate-fade-in-up">
        <div className="flex-shrink-0 h-9 w-9 rounded-full bg-gradient-to-br from-brand-indigo to-brand-cyan flex items-center justify-center shadow-lg relative">
          <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse"></div>
          <span className="text-white text-[10px] font-bold tracking-wider">AI</span>
        </div>
        <div className="bg-white/80 backdrop-blur-sm border border-white p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center justify-center">
          <div className="flex space-x-1.5 items-center h-4">
            <div className="w-2 h-2 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-brand-violet rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-brand-indigo rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mt-4 space-x-3 max-w-[85%] ${isUser ? 'ml-auto justify-end' : ''} animate-fade-in-up`}>
      {!isUser && (
        <div className="flex-shrink-0 h-9 w-9 rounded-full bg-gradient-to-br from-brand-indigo to-brand-cyan flex items-center justify-center shadow-lg relative">
          <div className="absolute inset-0 rounded-full border border-white/30"></div>
          <span className="text-white text-[10px] font-bold tracking-wider">AI</span>
        </div>
      )}
      <div className="flex flex-col">
        <div className={`${
          isUser 
            ? 'bg-white border border-brand-cyan/20 text-slate-800 rounded-2xl rounded-tr-sm shadow-sm' 
            : 'bg-gradient-to-br from-brand-indigo to-brand-violet text-white rounded-2xl rounded-tl-sm shadow-premium'
          } p-3.5 text-sm whitespace-pre-wrap leading-relaxed`}
        >
          {message.content}
        </div>
        <span className={`text-[10px] text-brand-label/70 font-medium mt-1.5 inline-block ${isUser ? 'text-right w-full' : 'ml-1'}`}>
          {message.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
