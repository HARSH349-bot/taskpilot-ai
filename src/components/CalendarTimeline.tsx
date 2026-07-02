"use client";

import React from "react";
import { Calendar, Clock, ChevronRight } from "lucide-react";

interface TimelineEvent {
  time: string;
  label: string;
  title: string;
  color: "teal" | "orange" | "purple";
}

interface DateGroup {
  date: string;
  events: TimelineEvent[];
}

const TIMELINE_DATA: DateGroup[] = [
  {
    date: "Aug 14, 2024",
    events: [
      { time: "10:00", label: "Lorem", title: "Lorem Ipsum Dolor", color: "teal" },
      { time: "14:50", label: "Lorem", title: "Lorem Ipsum Dolor", color: "orange" }
    ]
  },
  {
    date: "Aug 18, 2024",
    events: [
      { time: "08:00", label: "Lorem", title: "Lorem Ipsum Dolor", color: "teal" },
      { time: "13:30", label: "Lorem", title: "Lorem Ipsum Dolor", color: "orange" }
    ]
  },
  {
    date: "Aug 25, 2024",
    events: [
      { time: "09:45", label: "Lorem", title: "Lorem Ipsum Dolor", color: "orange" },
      { time: "11:25", label: "Lorem", title: "Lorem Ipsum Dolor", color: "teal" },
      { time: "15:00", label: "Lorem", title: "Lorem Ipsum Dolor", color: "purple" }
    ]
  }
];

export default function CalendarTimeline() {
  return (
    <div className="bg-[#eaf4f7] border-l border-[#d3e5eb] h-full flex flex-col font-sans select-none overflow-y-auto w-80 shrink-0">
      {/* Calendar Timeline Header */}
      <div className="p-6 border-b border-[#d3e5eb] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0f172a] rounded-xl flex items-center justify-center text-white shadow-md">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold text-slate-800 tracking-wide font-sans">
            August 2024
          </span>
        </div>
      </div>

      {/* Timeline Event Feed */}
      <div className="flex-1 p-6 space-y-6">
        {TIMELINE_DATA.map((group, gIdx) => (
          <div key={gIdx} className="space-y-3">
            {/* Date Header */}
            <div className="text-[11px] font-bold text-slate-400 font-sans tracking-wider">
              {group.date}
            </div>

            {/* Group Events list */}
            <div className="space-y-2.5">
              {group.events.map((event, eIdx) => (
                <div 
                  key={eIdx} 
                  className="bg-white border border-[#e2e8f0] rounded-xl p-3 flex items-center justify-between shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {/* Color side indicator strip */}
                    <div className={`w-1 h-8 rounded-full ${
                      event.color === "teal" ? "bg-[#1e5e5a]" :
                      event.color === "orange" ? "bg-[#e1573c]" : "bg-[#8c92ac]"
                    }`} />
                    
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800 font-sans">
                          {event.time}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium font-sans uppercase">
                          {event.label}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-sans mt-0.5">
                        {event.title}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Operational footer badge */}
      <div className="p-5 border-t border-[#d3e5eb] bg-[#dfedf0]/50 text-center font-mono text-[9px] text-slate-400 uppercase tracking-widest">
        Active Node Timeline Feed
      </div>
    </div>
  );
}
