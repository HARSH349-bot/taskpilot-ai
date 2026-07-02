"use client";

import React, { useState } from "react";
import { useAuth } from "../auth-context";
import { 
  Check, 
  MoreVertical, 
  Plus, 
  Trash2, 
  Search, 
  Sliders, 
  Calendar,
  Grid,
  Sparkles,
  ClipboardList
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  category: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed" | "on-hold";
}

const INITIAL_TASKS: Task[] = [
  { id: "1", title: "Optimize localized vector database search clusters", category: "Core Backend", priority: "high", status: "in-progress" },
  { id: "2", title: "Implement glassmorphic styling directives on command terminal", category: "UI/UX", priority: "medium", status: "completed" },
  { id: "3", title: "Resolve thread contention on task coordination engine", category: "Infrastructure", priority: "high", status: "todo" },
  { id: "4", title: "Map critical path for August 2024 milestone timelines", category: "Planning", priority: "medium", status: "todo" },
  { id: "5", title: "Upgrade WebSocket listener to handle parallel metrics updates", category: "Realtime API", priority: "low", status: "on-hold" },
  { id: "6", title: "Audit security tokens in onboarding handshake channels", category: "Security", priority: "high", status: "completed" }
];

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("UI/UX");
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const totalTasks = tasks.length;
  const inProgressCount = tasks.filter(t => t.status === "in-progress").length;
  const completedCount = tasks.filter(t => t.status === "completed").length;
  const onHoldCount = tasks.filter(t => t.status === "on-hold").length;
  const todoCount = tasks.filter(t => t.status === "todo").length;
  const highPriorityCount = tasks.filter(t => t.priority === "high").length;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      category: newTaskCategory,
      priority: "medium",
      status: "todo"
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
    setShowAddForm(false);
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const nextStatus: Task["status"] = t.status === "completed" ? "todo" : "completed";
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "todo") return matchesSearch && task.status === "todo";
    if (selectedFilter === "in-progress") return matchesSearch && task.status === "in-progress";
    if (selectedFilter === "on-hold") return matchesSearch && task.status === "on-hold";
    if (selectedFilter === "completed") return matchesSearch && task.status === "completed";
    return matchesSearch;
  });

  return (
    <div className="space-y-7 animate-fade-in font-sans">
      
      {/* Dashboard Top Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Hello, {user?.name || "James"}
          </h2>
          <span className="text-xs text-slate-400 font-medium font-sans">
            18 August 2024
          </span>
        </div>
        
        {/* Buttons (Add Task / Search Toggle) */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-flat-black px-4 py-2.5 rounded-xl font-sans text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm hover:shadow"
          >
            <Plus className="w-4 h-4" />
            Add New Task
          </button>
          
          <div className="relative">
            <input 
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-slate-200 pl-8 pr-3 py-2 rounded-xl text-xs focus:outline-none focus:border-[#1e5e5a] w-32 focus:w-48 transition-all"
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Slide-out dispatch task input form */}
      {showAddForm && (
        <form onSubmit={handleAddTask} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3 animate-slide-down">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter new upcoming task title..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1e5e5a] focus:bg-white transition-all"
              autoFocus
            />
            <select
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value)}
              className="px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none cursor-pointer"
            >
              <option value="UI/UX">UI/UX Dev</option>
              <option value="Core Backend">Core Logic</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Security">Security Audit</option>
              <option value="Realtime API">Realtime Dev</option>
              <option value="Planning">Timeline Plan</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 text-xs">
            <button 
              type="button" 
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-[#1e5e5a] hover:bg-[#164643] text-white px-3.5 py-1.5 rounded-lg font-bold cursor-pointer"
            >
              Dispatch Task
            </button>
          </div>
        </form>
      )}

      {/* Top 3 Progress Cards - matching layout in user image */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Teal Card */}
        <div 
          onClick={() => setSelectedFilter("all")}
          className={`bg-[#1e5e5a] text-white rounded-3xl p-5 relative overflow-hidden transition-all duration-300 cursor-pointer hover:translate-y-[-2px] shadow-md ${
            selectedFilter === "all" ? "ring-3 ring-teal-500 ring-offset-2" : ""
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-teal-200/70 font-semibold tracking-wider block uppercase mb-1">
                Awaiting Execution
              </span>
              <h3 className="text-sm font-bold tracking-tight">
                Lorem Ipsum Dolor
              </h3>
            </div>
            <button className="text-white/60 hover:text-white">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          
          {/* Avatar overlaps matching Image */}
          <div className="flex items-center gap-1 mt-6">
            <div className="flex -space-x-2">
              <span className="inline-block w-6 h-6 rounded-full bg-teal-400 border border-[#1e5e5a]" />
              <span className="inline-block w-6 h-6 rounded-full bg-teal-500 border border-[#1e5e5a]" />
              <span className="inline-block w-6 h-6 rounded-full bg-teal-300 border border-[#1e5e5a]" />
            </div>
            <span className="text-[9px] font-bold bg-[#143e3c]/80 border border-teal-500/25 px-1.5 py-0.5 rounded-full text-teal-100">
              +8
            </span>
          </div>

          <div className="mt-6 pt-3 border-t border-teal-600/35">
            <div className="flex justify-between text-[10px] text-teal-200/80 mb-1.5 font-sans font-medium">
              <span>{todoCount} tasks pending</span>
              <span>30%</span>
            </div>
            <div className="w-full h-1 bg-[#143e3c] rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full w-[30%]" />
            </div>
          </div>
        </div>

        {/* Card 2: Coral/Orange Card */}
        <div 
          onClick={() => setSelectedFilter("in-progress")}
          className={`bg-[#e1573c] text-white rounded-3xl p-5 relative overflow-hidden transition-all duration-300 cursor-pointer hover:translate-y-[-2px] shadow-md ${
            selectedFilter === "in-progress" ? "ring-3 ring-orange-400 ring-offset-2" : ""
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-orange-200/70 font-semibold tracking-wider block uppercase mb-1">
                Active Execution
              </span>
              <h3 className="text-sm font-bold tracking-tight">
                Lorem Ipsum Dolor
              </h3>
            </div>
            <button className="text-white/60 hover:text-white">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Avatars */}
          <div className="flex items-center gap-1 mt-6">
            <div className="flex -space-x-2">
              <span className="inline-block w-6 h-6 rounded-full bg-orange-400 border border-[#e1573c]" />
              <span className="inline-block w-6 h-6 rounded-full bg-orange-500 border border-[#e1573c]" />
              <span className="inline-block w-6 h-6 rounded-full bg-orange-300 border border-[#e1573c]" />
            </div>
            <span className="text-[9px] font-bold bg-[#9f3a25]/80 border border-orange-400/25 px-1.5 py-0.5 rounded-full text-orange-100">
              +12
            </span>
          </div>

          <div className="mt-6 pt-3 border-t border-orange-500/35">
            <div className="flex justify-between text-[10px] text-orange-200/80 mb-1.5 font-sans font-medium">
              <span>{inProgressCount} tasks processing</span>
              <span>55%</span>
            </div>
            <div className="w-full h-1 bg-[#9f3a25] rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full w-[55%]" />
            </div>
          </div>
        </div>

        {/* Card 3: Lavender Card */}
        <div 
          onClick={() => setSelectedFilter("on-hold")}
          className={`bg-[#8c92ac] text-white rounded-3xl p-5 relative overflow-hidden transition-all duration-300 cursor-pointer hover:translate-y-[-2px] shadow-md ${
            selectedFilter === "on-hold" ? "ring-3 ring-slate-400 ring-offset-2" : ""
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-slate-200/70 font-semibold tracking-wider block uppercase mb-1">
                Operational Hold
              </span>
              <h3 className="text-sm font-bold tracking-tight">
                Lorem Ipsum Dolor
              </h3>
            </div>
            <button className="text-white/60 hover:text-white">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Avatars */}
          <div className="flex items-center gap-1 mt-6">
            <div className="flex -space-x-2">
              <span className="inline-block w-6 h-6 rounded-full bg-slate-300 border border-[#8c92ac]" />
              <span className="inline-block w-6 h-6 rounded-full bg-slate-400 border border-[#8c92ac]" />
              <span className="inline-block w-6 h-6 rounded-full bg-slate-200 border border-[#8c92ac]" />
            </div>
            <span className="text-[9px] font-bold bg-[#60657b]/80 border border-slate-400/25 px-1.5 py-0.5 rounded-full text-slate-100">
              +5
            </span>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-400/35">
            <div className="flex justify-between text-[10px] text-slate-200/80 mb-1.5 font-sans font-medium">
              <span>{onHoldCount} tasks held</span>
              <span>15%</span>
            </div>
            <div className="w-full h-1 bg-[#60657b] rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full w-[15%]" />
            </div>
          </div>
        </div>

      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Column: Task Summary (2/5 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 tracking-wide font-sans">
            Task Summary
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            
            {/* Box 1: Total */}
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.01)]">
              <span className="text-[10px] font-bold text-slate-400 font-sans uppercase block mb-1">
                Total Nodes
              </span>
              <h4 className="text-2xl font-black text-slate-800 font-mono tracking-tighter">
                {totalTasks}
              </h4>
            </div>

            {/* Box 2: In Progress */}
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.01)]">
              <span className="text-[10px] font-bold text-slate-400 font-sans uppercase block mb-1">
                In Progress
              </span>
              <h4 className="text-2xl font-black text-slate-800 font-mono tracking-tighter">
                {inProgressCount}
              </h4>
            </div>

            {/* Box 3: Completed */}
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.01)]">
              <span className="text-[10px] font-bold text-slate-400 font-sans uppercase block mb-1">
                Completed
              </span>
              <h4 className="text-2xl font-black text-slate-800 font-mono tracking-tighter">
                {completedCount}
              </h4>
            </div>

            {/* Box 4: High Priority */}
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.01)]">
              <span className="text-[10px] font-bold text-slate-400 font-sans uppercase block mb-1">
                High Risk Nodes
              </span>
              <h4 className="text-2xl font-black text-slate-800 font-mono tracking-tighter">
                {highPriorityCount}
              </h4>
            </div>

            {/* Box 5: On Hold */}
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.01)]">
              <span className="text-[10px] font-bold text-slate-400 font-sans uppercase block mb-1">
                On Hold
              </span>
              <h4 className="text-2xl font-black text-slate-800 font-mono tracking-tighter">
                {onHoldCount}
              </h4>
            </div>

            {/* Box 6: Clickable Add Button ("New Data") */}
            <div 
              onClick={() => setShowAddForm(true)}
              className="bg-[#eaf4f7] border border-[#d3e5eb] hover:bg-[#dfedf0] p-5 rounded-2xl cursor-pointer flex flex-col justify-center transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-[#1e5e5a] text-white flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                <Plus className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-[#1e5e5a] font-sans block">
                New Data
              </span>
            </div>

          </div>
        </div>

        {/* Right Column: Upcoming Task List (3/5 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-800 tracking-wide font-sans">
              Upcoming Task
            </h3>
            
            {/* Small filter selectors */}
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="bg-transparent text-slate-500 font-sans text-[10px] font-bold uppercase tracking-wider cursor-pointer focus:outline-none border-b border-slate-300 pb-0.5"
            >
              <option value="all">All Statuses</option>
              <option value="todo">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="on-hold">On Hold</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
            {filteredTasks.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-xs text-slate-400 font-sans">
                No matching tasks found. Click "Add New Task" to create one.
              </div>
            ) : (
              filteredTasks.map((task) => {
                // Determine border color based on status
                let borderBarColor = "border-slate-300";
                if (task.status === "completed") borderBarColor = "border-[#1e5e5a]";
                else if (task.status === "in-progress") borderBarColor = "border-[#e1573c]";
                else if (task.status === "on-hold") borderBarColor = "border-[#8c92ac]";

                return (
                  <div 
                    key={task.id}
                    className={`bg-white border-t-4 ${borderBarColor} border-x border-b border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-[0_2px_4px_rgba(0,0,0,0.01)] hover:shadow-md transition-all duration-200`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold font-mono bg-slate-100 text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded">
                          {task.category}
                        </span>
                        {task.priority === "high" && (
                          <span className="text-[8px] font-bold bg-red-50 text-red-500 px-1 rounded uppercase tracking-wider">
                            High Risk
                          </span>
                        )}
                      </div>
                      <h4 className={`text-xs font-bold mt-2 font-sans ${
                        task.status === "completed" ? "text-slate-400 line-through" : "text-slate-800"
                      }`}>
                        {task.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Checkbox button */}
                      <button 
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                          task.status === "completed" 
                            ? "bg-[#1e5e5a] border-[#1e5e5a] text-white" 
                            : "border-slate-300 hover:border-[#1e5e5a] text-transparent hover:text-slate-300"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete button */}
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="p-1 text-slate-300 hover:text-red-500 transition-colors cursor-pointer"
                        title="Delete Task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
