import React, { useState } from 'react';
import { 
  MessageSquare, Phone, RotateCcw, Star, Archive, 
  Settings, Edit, Search, Video, MoreVertical, 
  PlusCircle, Smile, Sparkles, Send, CheckCheck, Menu, ChevronLeft
} from 'lucide-react';
import MessageInput from '../components/MessageInput';

const ChatApp = () => {
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('chat'); // 'list' or 'chat' for mobile logic

  const chats = [
    { id: 1, name: "Sarah Miller", msg: "See you at the meeting!", time: "10:45 AM", img: "Aneka" },
    { id: 2, name: "Design Team", msg: "Alex: The new UI looks great.", time: "Yesterday", img: "Group" },
    { id: 3, name: "David Chen", msg: "Did you check the latest report?", time: "Tuesday", img: "Christopher" }
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f6f8f6] dark:bg-[#102216] font-sans text-[#0d1b12] dark:text-white transition-colors duration-200">
      
      {/* 1. NARROW SIDEBAR (Desktop Always, Mobile Drawer) */}
      <aside className={`
        fixed inset-y-0 left-0 z-[60] w-16 flex flex-col items-center py-6 bg-white dark:bg-[#0a150d] border-r border-[#e7f3eb] dark:border-[#1a2e21] transition-transform duration-300 md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="mb-8 text-[#13ec5b]">
          <MessageSquare size={28} fill="currentColor" />
        </div>
        <nav className="flex flex-col gap-6 flex-1">
          <button className="text-[#13ec5b]"><MessageSquare size={22} /></button>
          <button className="text-[#4c9a66] hover:text-[#13ec5b] transition-colors"><Phone size={22} /></button>
   
          <button className="text-[#4c9a66] hover:text-[#13ec5b] transition-colors"><Archive size={22} /></button>
        </nav>
        <button className="text-[#4c9a66] mb-4"><Settings size={22} /></button>
        <div className="size-10 rounded-full border-2 border-[#13ec5b] overflow-hidden bg-gray-200">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
        </div>
      </aside>

      {/* 2. CHAT LIST (Hidden on mobile when chat is active) */}
      <section className={`
        absolute inset-0 z-40 md:relative md:translate-x-0 w-full md:w-80 lg:w-md flex flex-col bg-white dark:bg-[#0d1b12] border-r border-[#e7f3eb] dark:border-[#1a2e21] transition-all duration-300
        ${currentView === 'list' ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <button className="md:hidden p-1 text-[#4c9a66]" onClick={() => setIsSidebarOpen(true)}>
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-bold">Chats</h1>
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Edit size={20} />
            </button>
          </div>
          
          <div className="relative">
            <div className="flex items-center rounded-lg bg-[#e7f3eb] dark:bg-[#1a2e21] px-3 border border-transparent focus-within:border-[#13ec5b]/50">
              <Search size={18} className="text-[#4c9a66]" />
              <input 
                className="w-full border-none bg-transparent focus:ring-0 text-sm py-2.5 px-2 outline-none" 
                placeholder="Search..."
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
          {/* AI Special Chat */}
          <div 
            onClick={() => setCurrentView('chat')}
            className="mb-2 rounded-xl bg-[#13ec5b]/10 dark:bg-[#13ec5b]/5 border border-[#13ec5b]/30 p-3 flex items-center gap-3 cursor-pointer"
          >
            <div className="relative flex-shrink-0">
              <div className="size-11 rounded-full border-2 border-[#13ec5b] bg-[#0d1b12] flex items-center justify-center">
                <Sparkles size={20} className="text-[#13ec5b]" />
              </div>
              <div className="absolute bottom-0 right-0 size-3 bg-[#13ec5b] rounded-full border-2 border-white dark:border-[#0d1b12]"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold truncate">AI Assistant</span>
                <span className="text-[#13ec5b] text-xs">Now</span>
              </div>
              <p className="text-[#13ec5b] text-xs truncate mt-0.5 font-medium">Generating response...</p>
            </div>
          </div>

          {chats.map((chat) => (
            <div 
              key={chat.id} 
              onClick={() => setCurrentView('chat')}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f6f8f6] dark:hover:bg-[#102216] cursor-pointer transition-colors"
            >
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.img}`} className="size-11 rounded-full bg-gray-200 flex-shrink-0" alt="" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="truncate">{chat.name}</span>
                  <span className="text-xs text-[#4c9a66] ml-2">{chat.time}</span>
                </div>
                <p className="text-xs text-[#4c9a66] truncate mt-0.5">{chat.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MAIN CONVERSATION (Full width on mobile) */}
      <main className={`
        flex-1 flex flex-col bg-[#f6f8f6] dark:bg-[#102216] w-full transition-all duration-300
        ${currentView === 'chat' ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        {/* Chat Header */}
        <header className="h-16 flex items-center justify-between px-3 md:px-6 bg-white dark:bg-[#0d1b12] border-b border-[#e7f3eb] dark:border-[#1a2e21] z-10">
          <div className="flex items-center gap-2 min-w-0">
            <button 
              className="md:hidden p-2 -ml-2 text-[#4c9a66]" 
              onClick={() => setCurrentView('list')}
            >
              <ChevronLeft size={24} />
            </button>
            <div className="size-9 md:size-10 rounded-full border-2 border-[#13ec5b] bg-[#1a2e21] flex items-center justify-center flex-shrink-0">
              <Sparkles size={18} className="text-[#13ec5b]" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm md:text-base font-bold truncate">AI Assistant</h2>
              <span className="text-[10px] md:text-xs text-[#13ec5b] font-medium block">Online</span>
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-3 text-[#4c9a66]">
            <button className="p-2 hover:text-[#13ec5b]"><Video size={20} /></button>
            <button className="p-2 hover:text-[#13ec5b]"><Phone size={20} /></button>
            <button className="p-2 hover:text-[#13ec5b]"><MoreVertical size={20} /></button>
          </div>
        </header>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="flex flex-col items-start max-w-[85%] md:max-w-[75%]">
            <div className="bg-white dark:bg-[#1a2e21] rounded-2xl rounded-tl-none p-3 shadow-sm border border-[#e7f3eb] dark:border-[#253a2b] text-sm leading-relaxed">
              Hi! I'm your assistant. How can I help you today?
              <span className="text-[9px] text-[#4c9a66] block text-right mt-1">10:00 AM</span>
            </div>
          </div>

          <div className="flex flex-col items-end w-full">
            <div className="max-w-[85%] md:max-w-[75%] bg-[#13ec5b] text-[#0d1b12] rounded-2xl rounded-tr-none p-3 shadow-sm font-medium text-sm">
              Summarize my last meeting notes.
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-[9px] opacity-70">10:02 AM</span>
                <CheckCheck size={12} />
              </div>
            </div>
          </div>
        </div>

        {/* Input Dock */}
 <MessageInput/>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ChatApp;