import React, { useState } from 'react';
import { LuMail, LuLock, LuUser, LuEye, LuEyeOff, LuShieldCheck } from 'react-icons/lu';

const Signup = ({ handleChange, submit, isLoggingIn }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form 
      onSubmit={submit} 
      className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      {/* Full Name Field */}
      <div className="space-y-2">
        <label className="text-[#92c9a4] text-xs font-bold tracking-widest uppercase ml-1">
          Full Name
        </label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92c9a4] group-focus-within:text-[#13ec5b] transition-colors">
            <LuUser size={18} />
          </div>
          <input 
            type="text" 
            name="fullName" 
            onChange={handleChange}
            placeholder="Jane Doe" 
            required 
            className="w-full bg-[#0a110c]/50 border border-white/10 focus:border-[#13ec5b] rounded-xl py-2.5 pl-12 pr-4 text-white placeholder:text-[#92c9a4]/30 outline-none transition-all text-sm font-medium"
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label className="text-[#92c9a4] text-xs font-bold tracking-widest uppercase ml-1">
          Work Email
        </label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92c9a4] group-focus-within:text-[#13ec5b] transition-colors">
            <LuMail size={18} />
          </div>
          <input 
            type="email" 
            name="email" 
            onChange={handleChange}
            placeholder="jane@future.com" 
            required 
            className="w-full bg-[#0a110c]/50 border border-white/10 focus:border-[#13ec5b] rounded-xl py-2.5 pl-12 pr-4 text-white placeholder:text-[#92c9a4]/30 outline-none transition-all text-sm font-medium"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label className="text-[#92c9a4] text-xs font-bold tracking-widest uppercase ml-1">
          Set Password
        </label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92c9a4] group-focus-within:text-[#13ec5b] transition-colors">
            <LuLock size={18} />
          </div>
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            onChange={handleChange}
            placeholder="Min. 8 characters" 
            required 
            className="w-full bg-[#0a110c]/50 border border-white/10 focus:border-[#13ec5b] rounded-xl py-2.5 pl-12 pr-12 text-white placeholder:text-[#92c9a4]/30 outline-none transition-all text-sm font-medium"
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#92c9a4] hover:text-[#13ec5b] transition-colors"
          >
            {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isLoggingIn}
        className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 group active:scale-[0.98] mt-2 
          ${isLoggingIn 
            ? "bg-white/10 cursor-not-allowed text-[#92c9a4]" 
            : "bg-[#13ec5b] text-[#0a110c] hover:bg-[#13ec5b]/90 shadow-[#13ec5b]/20"
          }`}
      >
        <span>{isLoggingIn ? "Processing..." : "Create Account"}</span>
        {!isLoggingIn && <LuShieldCheck size={20} className="group-hover:rotate-12 transition-transform" />}
      </button>
    </form>
  );
};

export default Signup;