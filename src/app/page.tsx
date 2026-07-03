"use client";

import React, { useState } from "react";
import { AuthProvider, useAuth } from "../auth-context";
import LoginCenter from "../components/LoginCenter";
import Dashboard from "../components/Dashboard";
import TimelineProjection from "../components/TimelineProjection";
import CalendarTimeline from "../components/CalendarTimeline";
import FlashcardReview from "../components/FlashcardReview";
import { 
  CheckSquare, 
  Terminal, 
  LayoutDashboard, 
  GitCommit, 
  LogOut, 
  Lock, 
  Compass,
  UserCheck2,
  BookOpen
} from "lucide-react";

function CommandCenterContent() {
  const { isAuthenticated, user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"onboarding" | "dashboard" | "timeline" | "flashcard">("onboarding");

  // Navigation Sidebar tabs
  const tabs = [
    { id: "onboarding" as const, label: "Onboarding & Auth", icon: Terminal },
    { id: "dashboard" as const, label: "Task Dashboard", icon: LayoutDashboard },
    { id: "timeline" as const, label: "Timeline & Risk", icon: GitCommit },
    { id: "flashcard" as const, label: "Flashcards", icon: BookOpen }
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden text-slate-800">
      
      {/* 1. Left Sidebar Navigation - matching user's image */}
      <aside className="w-64 bg-[#1e5e5a] text-white flex flex-col justify-between shrink-0 h-full select-none">
        
        <div className="p-6 space-y-8">
          {/* Logo brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white text-[#1e5e5a] flex items-center justify-center shadow-md">
              <CheckSquare className="w-5 h-5" />
            </div>
            <span className="text-md font-bold tracking-wider font-sans">
              MyTask
            </span>
          </div>

          {/* User profile section */}
          <div className="text-center space-y-3 py-4 border-b border-teal-600/30">
            <div className="relative w-20 h-20 mx-auto rounded-full bg-slate-200 border-2 border-white/60 shadow-md flex items-center justify-center overflow-hidden">
              {isAuthenticated ? (
                /* Simulated initials or avatar */
                <span className="text-[#1e5e5a] text-2xl font-black font-mono">JS</span>
              ) : (
                <Lock className="w-8 h-8 text-slate-400" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wide font-sans text-white">
                {isAuthenticated ? user?.name : "Operator Auth"}
              </h3>
              <span className="text-[10px] text-teal-100/70 font-sans tracking-wide block">
                {isAuthenticated ? "jamesm@mail.com" : "Awaiting credentials"}
              </span>
            </div>
          </div>

          {/* Sidebar Menu Links */}
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-sans text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? "bg-white/10 text-white font-bold"
                      : "text-teal-100/75 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-teal-200/50"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="p-6 border-t border-teal-600/20">
          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                setActiveTab("onboarding");
              }}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-teal-800/40 hover:bg-red-500/10 text-teal-100 hover:text-red-300 border border-teal-600/35 hover:border-red-500/30 rounded-xl font-sans text-xs font-semibold tracking-wide transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Disconnect Deck</span>
            </button>
          ) : (
            <div className="text-center font-mono text-[8px] text-teal-200/40 uppercase tracking-widest">
              Security Gate Locked
            </div>
          )}
        </div>
      </aside>

      {/* 2. Central Viewport Area */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-[#f8fafc] p-8 md:p-10">
        
        {activeTab === "onboarding" ? (
          isAuthenticated ? (
            /* Logged in Welcome details in clean dashboard style */
            <div className="max-w-md mx-auto text-center space-y-6 py-12 animate-scale-up">
              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm relative">
                <div className="w-16 h-16 bg-[#eaf4f7] border border-[#d3e5eb] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <UserCheck2 className="w-8 h-8 text-[#1e5e5a]" />
                </div>
                
                <span className="text-[9px] tracking-[0.2em] text-[#1e5e5a] font-bold uppercase block mb-1">
                  Secure Access Established
                </span>
                
                <h2 className="text-xl font-bold text-slate-800 mb-2">
                  Welcome Back, {user?.name}
                </h2>
                
                <p className="text-xs text-slate-400 font-sans mb-8">
                  UUID Token verified: level-4-operator
                </p>

                <div className="space-y-4">
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className="w-full bg-[#1e5e5a] hover:bg-[#164643] text-white py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    Enter Task Dashboard
                  </button>
                  
                  <button
                    onClick={logout}
                    className="w-full border border-slate-200 hover:border-red-200 text-slate-500 hover:text-red-500 py-3 rounded-xl font-sans text-xs uppercase tracking-wider hover:bg-red-50/50 transition-all cursor-pointer"
                  >
                    Log Out Operator
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <LoginCenter />
          )
        ) : (
          /* Secure gates for dashboard/timeline views */
          isAuthenticated ? (
            activeTab === "dashboard" ? (
              <Dashboard />
            ) : activeTab === "timeline" ? (
              <TimelineProjection />
            ) : (
              <FlashcardReview />
            )
          ) : (
            /* Restricted Gate access prompt */
            <div className="max-w-md mx-auto text-center space-y-6 py-12 animate-shake">
              <div className="bg-white border border-amber-200 rounded-3xl p-8 shadow-sm">
                <div className="w-16 h-16 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-8 h-8 text-amber-600 animate-pulse" />
                </div>
                
                <span className="text-[9px] tracking-[0.2em] text-amber-600 font-bold uppercase block mb-1">
                  Access Blocked
                </span>
                
                <h2 className="text-lg font-bold text-slate-800 mb-3">
                  Authorization Required
                </h2>
                
                <p className="text-xs text-slate-400 leading-relaxed mb-8">
                  Tac-Console credentials have not been authorized. Please complete operator onboarding gate to unlock metrics stream.
                </p>

                <button
                  onClick={() => setActiveTab("onboarding")}
                  className="w-full bg-[#1e5e5a] hover:bg-[#164643] text-white py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  <Compass className="w-4 h-4 inline shrink-0 mr-1.5" />
                  Operator Onboarding
                </button>
              </div>
            </div>
          )
        )}
      </main>

      {/* 3. Right Sidebar Calendar Timeline - matches layout in user's image */}
      {isAuthenticated && activeTab !== "onboarding" && (
        <CalendarTimeline />
      )}

    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <CommandCenterContent />
    </AuthProvider>
  );
}
