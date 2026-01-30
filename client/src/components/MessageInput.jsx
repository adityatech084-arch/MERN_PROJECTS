import React, { useState } from 'react';
import { PlusCircle, Smile, Sparkles, Send } from 'lucide-react';

const MessageInput = () => {
  const [message, setMessage] = useState("");

  return (
    <footer className="p-4 bg-white dark:bg-[#0d1b12] border-t border-[#e7f3eb] dark:border-[#1a2e21]">
      <div className="flex items-end gap-3 max-w-5xl mx-auto">
        
        {/* Left Actions: Add and Emoji */}
        <div className="flex gap-1 pb-1">
          <button className="p-2 text-[#4c9a66] hover:text-[#13ec5b] transition-colors">
            <PlusCircle size={24} />
          </button>
          <button className="p-2 text-[#4c9a66] hover:text-[#13ec5b] transition-colors">
            <Smile size={24} />
          </button>
        </div>

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea 
            rows="1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-[#f6f8f6] dark:bg-[#1a2e21] border-none focus:ring-2 focus:ring-[#13ec5b]/50 rounded-xl px-4 py-3 text-sm resize-none outline-none custom-scrollbar transition-all" 
            placeholder="Type a message..."
          />
        </div>

        {/* Right Actions: AI Spark and Send */}
        <div className="flex items-center gap-2 pb-1">
          
          {/* AI Spark Button - Matching your HTML exactly */}
          <button className="flex items-center gap-2 bg-[#13ec5b]/20 hover:bg-[#13ec5b]/30 text-[#0d1b12] dark:text-[#13ec5b] px-4 h-10 rounded-xl transition-all border border-[#13ec5b]/50 group">
            <Sparkles 
              size={20} 
              className="group-hover:rotate-12 transition-transform fill-current md:fill-none" 
            />
            <span className="text-sm font-bold hidden sm:inline">Spark</span>
          </button>

          {/* Send Button */}
          <button className="size-10 bg-[#13ec5b] text-[#0d1b12] rounded-xl flex items-center justify-center shadow-lg shadow-[#13ec5b]/20 hover:scale-105 active:scale-95 transition-transform flex-shrink-0">
            <Send size={20} className="ml-0.5 fill-current" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default MessageInput;