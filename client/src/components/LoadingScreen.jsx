import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquare, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

const LoadingScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => { if (onFinish) onFinish(); }, 500);
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(oldProgress + diff, 100);
      });
    }, 400);
    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    /* 1. Added overflow-y-auto and min-h-screen for short devices */
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-y-auto overflow-x-hidden bg-[#f6f8f6] dark:bg-[#102216] font-sans transition-colors duration-300 px-6 py-8">
      
      {/* Background Blurs - Adjusted for better mobile performance */}
      <div className="fixed top-[-10%] left-[-10%] -z-10 h-[50vw] w-[50vw] max-w-[300px] bg-[#13ec5b]/10 blur-[60px] md:blur-[100px] rounded-full" />
      <div className="fixed bottom-[-10%] right-[-10%] -z-10 h-[50vw] w-[50vw] max-w-[300px] bg-[#13ec5b]/10 blur-[60px] md:blur-[100px] rounded-full" />

      {/* 2. Main Wrapper - Uses 'my-auto' to center vertically only if space allows */}
      <div className="my-auto flex w-full max-w-[360px] flex-col items-center">
        
        {/* Central Logo Container */}
        <div className="mb-8 md:mb-12 flex flex-col items-center">
          <div className="relative">
            <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-[24%] bg-white dark:bg-[#0d1b12] shadow-2xl shadow-[#13ec5b]/20 border border-[#e7f3eb] dark:border-[#1a2e21]">
              <MessageSquare 
                className="text-[#13ec5b] w-10 h-10 sm:w-12 sm:h-12" 
                fill="currentColor" 
              />
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#13ec5b] text-[#0d1b12] shadow-lg animate-bounce">
                <Sparkles size={16} className="sm:hidden" />
                <Sparkles size={20} className="hidden sm:block" />
              </div>
            </div>
          </div>
          
          {/* 3. Fluid Typography: text sizes that scale perfectly */}
          <h1 className="mt-6 text-xl sm:text-2xl font-black tracking-tight text-[#0d1b12] dark:text-white text-center">
            AI Messenger
          </h1>
        </div>

        {/* Progress Bar Section */}
        <div className="w-full space-y-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 min-w-0">
                <RefreshCw size={14} className="animate-spin text-[#13ec5b] flex-shrink-0" />
                <p className="text-[#4c9a66] text-[11px] sm:text-xs font-bold truncate">
                  {progress < 40 ? 'Initializing AI' : progress < 80 ? 'Optimizing' : 'Connecting'}
                </p>
              </div>
              <span className="text-[11px] sm:text-xs font-black text-[#13ec5b] tabular-nums ml-2">
                {Math.round(progress)}%
              </span>
            </div>

            {/* Track */}
            <div className="rounded-full bg-gray-200 dark:bg-[#1a2e21] h-2 w-full overflow-hidden shadow-inner relative">
              <div 
                className="h-full rounded-full bg-[#13ec5b] shadow-[0_0_15px_rgba(19,236,91,0.4)] transition-all duration-500 ease-out relative overflow-hidden" 
                style={{ width: `${progress}%` }}
              >
                {/* Animated Shine */}
                <div className="absolute inset-0 bg-white/30 skew-x-[-20deg] animate-[shimmer_2.5s_infinite]" />
              </div>
            </div>
            
            <p className="text-[#4c9a66]/60 dark:text-gray-500 text-[10px] font-bold tracking-wide text-center uppercase">
              Secure Cloud Session
            </p>
          </div>
        </div>
      </div>

      {/* 4. Footer Section - mt-12 ensures it doesn't overlap logo on tiny screens */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-[#4c9a66] text-[10px] sm:text-xs font-semibold">
          <ShieldCheck size={14} className="flex-shrink-0" />
          <span className="text-center">End-to-end encrypted</span>
        </div>

        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#13ec5b]/10 border border-[#13ec5b]/20">
          <Zap size={10} className="text-[#13ec5b] fill-[#13ec5b]" />
          <p className="text-[#13ec5b] text-[9px] font-black uppercase tracking-[0.2em]">
            Powered by AI
          </p>
        </div>
      </div>

      {/* Shimmer Animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%); }
          50% { transform: translateX(150%); }
          100% { transform: translateX(150%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;