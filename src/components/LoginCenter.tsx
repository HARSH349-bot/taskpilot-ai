"use client";

import React, { useState } from "react";
import { useAuth } from "../auth-context";
import { Lock, User, Terminal, Settings, ShieldAlert, Cpu } from "lucide-react";

export default function LoginCenter() {
  const { login, isLoading, loginLogs, securityStatus } = useAuth();
  const [username, setUsername] = useState("James Smith");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Operator username required.");
      return;
    }
    setError("");
    await login(username, password);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-12">
      {/* Redesigned clean, flat card matching the flat dashboard style */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.05)] relative overflow-hidden">
        
        {/* Header Indicator */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-5">
          <div>
            <span className="text-[9px] tracking-[0.2em] text-[#1e5e5a] font-bold uppercase block mb-1">
              Command Gate
            </span>
            <h2 className="text-lg font-bold text-slate-800">
              Operator Onboarding
            </h2>
          </div>
          <div className="flex items-center gap-1.5 bg-[#eaf4f7] px-2.5 py-1 rounded-full border border-[#d3e5eb]">
            <span className={`w-2 h-2 rounded-full ${
              securityStatus === "secure" ? "bg-[#1e5e5a] animate-pulse" : "bg-amber-500 animate-pulse"
            }`} />
            <span className="text-[10px] font-bold text-[#1e5e5a] uppercase">
              {securityStatus}
            </span>
          </div>
        </div>

        {/* Central Emblem */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-[#1e5e5a] rounded-2xl flex items-center justify-center text-white shadow-lg relative group">
            <span className="text-xl font-black font-mono tracking-tighter">
              TP
            </span>
            <span className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1 border-2 border-white shadow-sm">
              <Cpu className="w-3 h-3 text-white" />
            </span>
          </div>
        </div>

        {!isLoading ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-xs">
                <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
                <span className="font-semibold">{error}</span>
              </div>
            )}

            <div className="space-y-3.5">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">
                  Operator Identity
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-medium focus:outline-none focus:border-[#1e5e5a] focus:bg-white transition-all"
                    placeholder="e.g. James Smith"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 ml-1">
                  Security Passkey
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-medium focus:outline-none focus:border-[#1e5e5a] focus:bg-white transition-all"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-[#1e5e5a] hover:bg-[#164643] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 animate-spin-slow" />
              Initialize Command Center
            </button>
          </form>
        ) : (
          /* Futuristic loading output customized for flat card */
          <div className="space-y-5">
            <div className="bg-slate-900 rounded-2xl p-4 font-mono text-[10px] text-emerald-400 leading-normal h-[180px] overflow-y-auto flex flex-col justify-end space-y-1 shadow-inner">
              {loginLogs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <Terminal className="w-3 h-3 mt-0.5 text-amber-500 shrink-0" />
                  <span>{log}</span>
                </div>
              ))}
              <div className="flex items-center gap-1 text-slate-400">
                <span className="w-1.5 h-3 bg-emerald-400 animate-pulse" />
                <span className="text-[8px] opacity-70">CONNECTING...</span>
              </div>
            </div>
            
            <div className="text-center text-xs text-amber-600 font-bold uppercase animate-pulse flex items-center justify-center gap-1.5">
              <Settings className="w-3.5 h-3.5 animate-spin" />
              Preparing Command Console
            </div>
          </div>
        )}
      </div>

      {!isLoading && (
        <div className="mt-4 text-center">
          <button 
            onClick={() => { setUsername("James Smith"); setPassword("password"); }}
            className="text-xs font-medium text-[#1e5e5a] hover:text-[#164643] transition-colors underline cursor-pointer"
          >
            Pre-fill demo operator credentials
          </button>
        </div>
      )}
    </div>
  );
}
