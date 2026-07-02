"use client";

import React, { useState, useEffect } from "react";
import { 
  Zap, 
  Settings, 
  TrendingUp, 
  RefreshCw,
  AlertCircle,
  ShieldCheck,
  Activity
} from "lucide-react";

interface Milestone {
  id: string;
  name: string;
  date: string;
  status: "safe" | "warning" | "critical";
  cx: number;
  cy: number;
  description: string;
  workload: number;
}

const INITIAL_MILESTONES: Milestone[] = [
  { id: "m1", name: "Security Gate Lockout", date: "Aug 05", status: "safe", cx: 60, cy: 110, description: "Cryptographic secure handshakes audited and fully deployed.", workload: 35 },
  { id: "m2", name: "Cluster Sync", date: "Aug 12", status: "warning", cx: 160, cy: 30, description: "Local vector search database synchronizing with cloud endpoints.", workload: 68 },
  { id: "m3", name: "Command Dashboard", date: "Aug 19", status: "safe", cx: 280, cy: 130, description: "3D Glassmorphic layout directives completed and integrated.", workload: 40 },
  { id: "m4", name: "Resource Alignment", date: "Aug 26", status: "critical", cx: 400, cy: 40, description: "Critical path alignment for real-time WebSocket communication tracks.", workload: 92 },
  { id: "m5", name: "Operational Deck Deployment", date: "Aug 31", status: "safe", cx: 520, cy: 120, description: "Final environment build launched and optimized for production.", workload: 15 }
];

export default function TimelineProjection() {
  const [milestones, setMilestones] = useState<Milestone[]>(INITIAL_MILESTONES);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(INITIAL_MILESTONES[3]); // Default select critical milestone
  
  // Slider states for live updates
  const [scopeCreep, setScopeCreep] = useState(40);
  const [teamFatigue, setTeamFatigue] = useState(55);
  const [resourceCap, setResourceCap] = useState(80);
  
  // Live chart values based on sliders
  const [chartData, setChartData] = useState([
    { name: "Dev Ops", val: 65, color: "#1e5e5a" },
    { name: "Core Log", val: 82, color: "#e1573c" },
    { name: "UI & UX", val: 45, color: "#1e5e5a" },
    { name: "Sec Ops", val: 90, color: "#8c92ac" },
    { name: "API Sync", val: 70, color: "#1e5e5a" }
  ]);
  
  const [isBalancing, setIsBalancing] = useState(false);

  // Recalculate metrics when sliders change
  useEffect(() => {
    // Generate load based on factors
    const devOpsLoad = Math.min(100, Math.max(10, 40 + (scopeCreep * 0.4) - (resourceCap * 0.1)));
    const coreLogLoad = Math.min(100, Math.max(10, 50 + (scopeCreep * 0.6) + (teamFatigue * 0.2)));
    const uiUxLoad = Math.min(100, Math.max(10, 30 + (scopeCreep * 0.5) - (teamFatigue * 0.1)));
    const secOpsLoad = Math.min(100, Math.max(10, 60 + (teamFatigue * 0.5) - (resourceCap * 0.2)));
    const apiSyncLoad = Math.min(100, Math.max(10, 45 + (scopeCreep * 0.3) + (teamFatigue * 0.3)));

    setChartData([
      { name: "Dev Ops", val: Math.round(devOpsLoad), color: devOpsLoad > 85 ? "#8c92ac" : devOpsLoad > 65 ? "#e1573c" : "#1e5e5a" },
      { name: "Core Log", val: Math.round(coreLogLoad), color: coreLogLoad > 85 ? "#8c92ac" : coreLogLoad > 65 ? "#e1573c" : "#1e5e5a" },
      { name: "UI & UX", val: Math.round(uiUxLoad), color: uiUxLoad > 85 ? "#8c92ac" : uiUxLoad > 65 ? "#e1573c" : "#1e5e5a" },
      { name: "Sec Ops", val: Math.round(secOpsLoad), color: secOpsLoad > 85 ? "#8c92ac" : secOpsLoad > 65 ? "#e1573c" : "#1e5e5a" },
      { name: "API Sync", val: Math.round(apiSyncLoad), color: apiSyncLoad > 85 ? "#8c92ac" : apiSyncLoad > 65 ? "#e1573c" : "#1e5e5a" }
    ]);

    // Dynamically adjust milestone risk states based on load metrics
    const avgLoad = (devOpsLoad + coreLogLoad + uiUxLoad + secOpsLoad + apiSyncLoad) / 5;
    
    setMilestones(prev => 
      prev.map(m => {
        let status = m.status;
        if (m.id === "m2") { // Cluster Sync
          status = avgLoad > 75 ? "critical" : avgLoad > 55 ? "warning" : "safe";
        } else if (m.id === "m4") { // Resource Alignment
          status = avgLoad > 65 ? "critical" : avgLoad > 45 ? "warning" : "safe";
        }
        return { ...m, status };
      })
    );

    // Update selected milestone reference if it changed
    if (selectedMilestone) {
      const updated = milestones.find(m => m.id === selectedMilestone.id);
      if (updated) setSelectedMilestone(updated);
    }
  }, [scopeCreep, teamFatigue, resourceCap]);

  // Simulate automated balance run
  const triggerAutoBalance = () => {
    setIsBalancing(true);
    let counter = 0;
    const interval = setInterval(() => {
      setScopeCreep(prev => Math.max(10, Math.min(90, prev + (Math.random() > 0.5 ? 5 : -5))));
      setTeamFatigue(prev => Math.max(10, Math.min(90, prev + (Math.random() > 0.5 ? 4 : -4))));
      setResourceCap(prev => Math.max(40, Math.min(100, prev + (Math.random() > 0.5 ? 6 : -6))));
      
      counter++;
      if (counter >= 8) {
        clearInterval(interval);
        setIsBalancing(false);
      }
    }, 150);
  };

  return (
    <div className="space-y-7 animate-fade-in font-sans">
      
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
          Advanced Timeline & Risk Projection
        </h2>
        <span className="text-xs text-slate-400 font-medium font-sans">
          Tactical Timeline Modeling Dashboard
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side (Col 1-2): Clean Winding Pipeline Milestone Track */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-[10px] font-bold text-[#1e5e5a] tracking-wider uppercase block">
                  Project Critical Path
                </span>
                <h3 className="text-sm font-bold text-slate-700">
                  August 2024 - Winding Track Milestones
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                <span className="w-2 h-2 rounded-full bg-[#1e5e5a] animate-pulse" />
                <span>Analyzer Node Active</span>
              </div>
            </div>

            {/* Custom 3D Winding Pipe SVG Track */}
            <div className="relative min-h-[220px] bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center p-4 overflow-x-auto">
              <svg 
                viewBox="0 0 600 180" 
                className="w-full min-w-[500px] h-auto pointer-events-none overflow-visible select-none"
              >
                <defs>
                  {/* Clean gradient for the flat layout pipeline */}
                  <linearGradient id="pipeGradFlat" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#eaf4f7" />
                    <stop offset="50%" stopColor="#d3e5eb" />
                    <stop offset="100%" stopColor="#eaf4f7" />
                  </linearGradient>
                </defs>

                {/* The main winding S-shape tube */}
                <path 
                  d="M 20 110 C 120 110, 100 30, 200 30 C 300 30, 220 130, 320 130 C 420 130, 380 40, 480 40 C 580 40, 500 120, 580 120"
                  fill="none" 
                  stroke="url(#pipeGradFlat)" 
                  strokeWidth="28" 
                  strokeLinecap="round"
                  className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
                />
                
                {/* Thin core line */}
                <path 
                  d="M 20 110 C 120 110, 100 30, 200 30 C 300 30, 220 130, 320 130 C 420 130, 380 40, 480 40 C 580 40, 500 120, 580 120"
                  fill="none" 
                  stroke="#1e5e5a" 
                  strokeWidth="2.5" 
                  strokeOpacity="0.4"
                  strokeDasharray="6 8"
                />

                {/* Milestone Node Blocks on the track */}
                {milestones.map((m) => {
                  let colorClass = "#1e5e5a"; // safe
                  if (m.status === "warning") {
                    colorClass = "#e1573c";
                  } else if (m.status === "critical") {
                    colorClass = "#8c92ac";
                  }

                  const isSelected = selectedMilestone?.id === m.id;

                  return (
                    <g 
                      key={m.id} 
                      transform={`translate(${m.cx}, ${m.cy})`}
                      className="cursor-pointer pointer-events-auto"
                      onClick={() => setSelectedMilestone(m)}
                    >
                      {/* Node block box */}
                      <rect
                        x="-12"
                        y="-12"
                        width="24"
                        height="24"
                        rx="6"
                        fill="white"
                        stroke={colorClass}
                        strokeWidth={isSelected ? "3" : "2"}
                        className="transition-all duration-200 transform hover:scale-110 drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)]"
                      />
                      
                      {/* Inner dot */}
                      <circle
                        cx="0"
                        cy="0"
                        r="4"
                        fill={colorClass}
                      />
                      
                      {/* Title Tag */}
                      <text
                        y="24"
                        textAnchor="middle"
                        fill="#334155"
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                        className="pointer-events-none"
                      >
                        {m.name.split(" ")[0]}
                      </text>
                      
                      {/* Date label */}
                      <text
                        y="-20"
                        textAnchor="middle"
                        fill={colorClass}
                        fontSize="8"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                        className="pointer-events-none"
                      >
                        {m.date}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Selected Milestone Node Inspector Card */}
            {selectedMilestone && (
              <div className="mt-4 p-4 rounded-xl border border-slate-200 bg-slate-50 font-sans space-y-2">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs text-slate-800 font-bold">{selectedMilestone.name}</span>
                  <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${
                    selectedMilestone.status === "safe" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                    selectedMilestone.status === "warning" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                    "bg-slate-100 text-slate-600 border border-slate-200"
                  }`}>
                    {selectedMilestone.status} risk
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                  {selectedMilestone.description}
                </p>
                <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1">
                  <span>Target Completion: {selectedMilestone.date}, 2024</span>
                  <span>Resource Impact: <b className="text-slate-700">{selectedMilestone.workload}%</b></span>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Live Parameters Control Grid */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#e1573c] animate-pulse" />
              Operational Strain Controls
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
              <div className="space-y-2">
                <div className="flex justify-between font-medium">
                  <span>Scope Creep</span>
                  <span className="text-slate-800 font-bold">{scopeCreep}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={scopeCreep}
                  onChange={(e) => setScopeCreep(Number(e.target.value))}
                  className="w-full accent-[#1e5e5a] bg-slate-100 border border-slate-200 rounded-lg cursor-pointer h-1"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-medium">
                  <span>Team Fatigue</span>
                  <span className="text-slate-800 font-bold">{teamFatigue}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={teamFatigue}
                  onChange={(e) => setTeamFatigue(Number(e.target.value))}
                  className="w-full accent-[#e1573c] bg-slate-100 border border-slate-200 rounded-lg cursor-pointer h-1"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-medium">
                  <span>Resource Cap</span>
                  <span className="text-slate-800 font-bold">{resourceCap}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={resourceCap}
                  onChange={(e) => setResourceCap(Number(e.target.value))}
                  className="w-full accent-[#8c92ac] bg-slate-100 border border-slate-200 rounded-lg cursor-pointer h-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side (Col 3): Resource Balancer Live Chart */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-[10px] font-bold text-[#e1573c] tracking-wider uppercase block">
                    Resource Balancer
                  </span>
                  <h3 className="text-sm font-bold text-slate-800">
                    Live Updates Channel
                  </h3>
                </div>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e1573c] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e1573c]"></span>
                </span>
              </div>

              {/* Vertical Bar Chart Panel */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 h-[280px] flex flex-col justify-end shadow-inner">
                <div className="flex justify-around items-end h-[210px] pb-2 border-b border-slate-200">
                  {chartData.map((d, index) => (
                    <div key={index} className="flex flex-col items-center group w-1/5 relative">
                      {/* Value on Hover */}
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-[8px] font-mono text-white transition-opacity z-10">
                        {d.val}%
                      </span>

                      {/* Bar */}
                      <div 
                        className="w-3.5 rounded-t-md transition-all duration-300 ease-out"
                        style={{ 
                          height: `${d.val * 1.7}px`,
                          backgroundColor: d.color
                        }}
                      />
                    </div>
                  ))}
                </div>
                
                {/* X Axis Labels */}
                <div className="flex justify-around pt-3 font-medium text-[8px] text-slate-400 text-center uppercase tracking-wider">
                  {chartData.map((d, index) => (
                    <span key={index} className="w-1/5 truncate">{d.name}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              {/* Trigger */}
              <button
                disabled={isBalancing}
                onClick={triggerAutoBalance}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 shrink-0 ${isBalancing ? "animate-spin" : ""}`} />
                {isBalancing ? "Balancing Stress..." : "Run Resource Balancer"}
              </button>

              {/* Risk Warnings Panel */}
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-2 text-[10px] text-amber-700 font-sans leading-relaxed">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <div>
                  <span className="font-bold uppercase block mb-0.5">Critical Path Notification:</span>
                  Resource load exceeds 85% on <b>Sec Ops</b> node. Check authorization pipelines.
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
