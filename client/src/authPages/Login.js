import React, { useState } from 'react';
import { LuMail, LuLock, LuEye, LuEyeOff, LuShieldCheck } from 'react-icons/lu';

const Login = ({ handleChange, submit, isLoggingIn, onForgotPassword, toggleAuth }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={submit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <label className="text-[#92c9a4] text-xs font-bold tracking-widest uppercase ml-1">Business Email</label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92c9a4] group-focus-within:text-[#13ec5b] transition-colors">
            <LuMail size={18} />
          </div>
          <input 
            type="email" 
            name="email"
            required
            onChange={handleChange}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-white/10 bg-[#0a110c]/50 focus:border-[#13ec5b] outline-none transition-all text-white font-medium" 
            placeholder="name@company.com" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[#92c9a4] text-xs font-bold tracking-widest uppercase ml-1">Password</label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92c9a4] group-focus-within:text-[#13ec5b] transition-colors">
            <LuLock size={18} />
          </div>
          <input 
            type={showPassword ? "text" : "password"}
            name="password"
            required
            onChange={handleChange}
            className="w-full pl-11 pr-12 py-2.5 rounded-xl border border-white/10 bg-[#0a110c]/50 focus:border-[#13ec5b] outline-none transition-all text-white font-medium" 
            placeholder="••••••••" 
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#92c9a4] hover:text-[#13ec5b]"
          >
            {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="checkbox" className="peer hidden" />
          <div className="size-5 rounded-lg border-2 border-white/10 peer-checked:bg-[#13ec5b] peer-checked:border-[#13ec5b] transition-all flex items-center justify-center">
            <div className="size-2 bg-[#0a110c] rounded-sm opacity-0 peer-checked:opacity-100" />
          </div>
          <span className="text-[#92c9a4] text-xs font-bold uppercase">Keep me signed in</span>
        </label>
        <button type="button" onClick={onForgotPassword} className="text-[#13ec5b] text-xs font-bold uppercase hover:underline">Forgot?</button>
      </div>

      <button 
        type='submit' 
        disabled={isLoggingIn} 
        className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 active:scale-[0.98] ${
          isLoggingIn ? "bg-white/10 cursor-not-allowed text-[#92c9a4]" : "bg-[#13ec5b] text-[#0a110c] hover:shadow-[#13ec5b]/20"
        }`}
      >
        {isLoggingIn ? "Initializing..." : "Secure Login"}
        {!isLoggingIn && <LuShieldCheck size={20} />}
      </button>
    </form>
  );
};

export default Login;