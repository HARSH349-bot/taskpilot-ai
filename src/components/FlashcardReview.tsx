"use client";

import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  CheckCircle, 
  XCircle, 
  Plus, 
  Bookmark, 
  Trash2,
  HelpCircle,
  Sparkles
} from "lucide-react";

interface Flashcard {
  id: string;
  category: "Security" | "DevOps" | "UI/UX" | "Backend" | "General";
  question: string;
  answer: string;
  status: "new" | "learned" | "review";
}

const DEFAULT_CARDS: Flashcard[] = [
  {
    id: "fc-1",
    category: "Security",
    question: "What is AES-256-GCM and why is it preferred for payload encryption?",
    answer: "AES-256 in Galois/Counter Mode (GCM) is an authenticated encryption algorithm that provides both confidentiality and data integrity (preventing tamper attempts) with hardware acceleration.",
    status: "new"
  },
  {
    id: "fc-2",
    category: "DevOps",
    question: "What is the primary difference between Continuous Delivery and Continuous Deployment?",
    answer: "Continuous Delivery automatically prepares the code for release to staging/production, requiring manual approval to deploy. Continuous Deployment pushes changes to production automatically without manual intervention.",
    status: "new"
  },
  {
    id: "fc-3",
    category: "UI/UX",
    question: "What is the Glassmorphism visual design style characterized by?",
    answer: "Characterized by frosted-glass effects (using backdrop-filter: blur), multi-layered translucent card surfaces, glowing border treatments, and vibrant background gradients reflecting through the pane.",
    status: "new"
  },
  {
    id: "fc-4",
    category: "Backend",
    question: "How does a Vector Database optimize LLM semantic searches?",
    answer: "It stores text as high-dimensional mathematical coordinates (embeddings) and utilizes distance formulas (like Cosine Similarity) to quickly find and retrieve contextually similar entries.",
    status: "new"
  },
  {
    id: "fc-5",
    category: "Security",
    question: "How should secrets be handled in next.js deployments?",
    answer: "Secrets must be stored in `.env.local` files and referenced on the server-side. They must never be prefixed with `NEXT_PUBLIC_` to avoid leaking them to client-side JS bundles.",
    status: "new"
  }
];

export default function FlashcardReview() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  // Custom Card Form states
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newCategory, setNewCategory] = useState<Flashcard["category"]>("General");
  const [showAddForm, setShowAddForm] = useState(false);

  // Load cards from localStorage or use defaults
  useEffect(() => {
    const saved = localStorage.getItem("tp_flashcards");
    if (saved) {
      try {
        setCards(JSON.parse(saved));
      } catch (e) {
        setCards(DEFAULT_CARDS);
      }
    } else {
      setCards(DEFAULT_CARDS);
      localStorage.setItem("tp_flashcards", JSON.stringify(DEFAULT_CARDS));
    }
  }, []);

  // Save helper
  const saveCards = (updated: Flashcard[]) => {
    setCards(updated);
    localStorage.setItem("tp_flashcards", JSON.stringify(updated));
  };

  // Filter cards
  const filteredCards = cards.filter(
    (c) => selectedCategory === "All" || c.category === selectedCategory
  );

  // Card flipping helper
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Navigation helpers
  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? filteredCards.length - 1 : prev - 1));
    }, 150);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === filteredCards.length - 1 ? 0 : prev + 1));
    }, 150);
  };

  // Status updates
  const markStatus = (id: string, status: Flashcard["status"]) => {
    const updated = cards.map((c) => (c.id === id ? { ...c, status } : c));
    saveCards(updated);
    // Auto advance after short delay
    setTimeout(() => {
      handleNext();
    }, 300);
  };

  // Add Card
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    const newCard: Flashcard = {
      id: "fc-" + Date.now(),
      category: newCategory,
      question: newQuestion,
      answer: newAnswer,
      status: "new"
    };

    const updated = [...cards, newCard];
    saveCards(updated);
    setNewQuestion("");
    setNewAnswer("");
    setShowAddForm(false);
    
    // Jump to the new card
    setSelectedCategory("All");
    setCurrentIndex(updated.length - 1);
  };

  // Delete Card
  const handleDeleteCard = (id: string) => {
    const updated = cards.filter((c) => c.id !== id);
    saveCards(updated);
    if (currentIndex >= updated.length && currentIndex > 0) {
      setCurrentIndex(updated.length - 1);
    }
    setIsFlipped(false);
  };

  // Stats
  const totalCount = filteredCards.length;
  const learnedCount = filteredCards.filter((c) => c.status === "learned").length;
  const reviewCount = filteredCards.filter((c) => c.status === "review").length;

  const activeCard = filteredCards[currentIndex];

  return (
    <div className="space-y-7 animate-fade-in font-sans">
      
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Flashcard Review Center
          </h2>
          <span className="text-xs text-slate-400 font-medium font-sans">
            Review command deck protocols and development key terms
          </span>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-flat-black px-4 py-2.5 rounded-xl font-sans text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm hover:shadow"
        >
          <Plus className="w-4 h-4" />
          Add Custom Card
        </button>
      </div>

      {/* Add Custom Card slide-out form */}
      {showAddForm && (
        <form onSubmit={handleAddCard} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 animate-slide-down">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Create Custom Review Card
          </h3>
          
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Question / Term</label>
                <input
                  type="text"
                  placeholder="e.g. What is CORS?"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1e5e5a] focus:bg-white"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as Flashcard["category"])}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none cursor-pointer"
                >
                  <option value="General">General</option>
                  <option value="Security">Security</option>
                  <option value="DevOps">DevOps</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Backend">Backend</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">Answer / Definition</label>
              <textarea
                placeholder="Enter the explanation or system procedure..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1e5e5a] focus:bg-white h-20 resize-none"
                required
              />
            </div>
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
              className="bg-[#1e5e5a] hover:bg-[#164643] text-white px-4 py-1.5 rounded-lg font-bold cursor-pointer"
            >
              Create Card
            </button>
          </div>
        </form>
      )}

      {/* Main Flashcard Cockpit */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Side: Stats and Category filters (2/5 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card Category Filters */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Study Categories
            </h3>
            
            <div className="flex flex-col gap-1.5 font-sans text-xs">
              {["All", "Security", "DevOps", "UI/UX", "Backend", "General"].map((cat) => {
                const count = cards.filter((c) => cat === "All" || c.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentIndex(0);
                      setIsFlipped(false);
                    }}
                    className={`flex justify-between items-center px-3.5 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-[#eaf4f7] text-[#1e5e5a] font-bold"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      selectedCategory === cat ? "bg-[#1e5e5a] text-white" : "bg-slate-100 text-slate-400"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Review Stats */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
              Review Progress
            </h3>

            <div className="grid grid-cols-3 gap-3 text-center font-mono">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[9px] text-slate-400 block mb-1">TOTAL</span>
                <span className="text-lg font-black text-slate-800">{totalCount}</span>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl">
                <span className="text-[9px] text-slate-400 block mb-1">LEARNED</span>
                <span className="text-lg font-black">{learnedCount}</span>
              </div>
              <div className="p-3 bg-amber-50 text-amber-700 rounded-2xl">
                <span className="text-[9px] text-slate-400 block mb-1">REVIEW</span>
                <span className="text-lg font-black">{reviewCount}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Interactive 3D Flip Card (3/5 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {totalCount === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-400 font-sans shadow-sm flex flex-col items-center justify-center">
              <HelpCircle className="w-12 h-12 text-slate-300 mb-3" />
              <p className="text-sm font-semibold">No flashcards found in this category.</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="mt-4 text-[#1e5e5a] hover:text-[#164643] text-xs font-bold underline cursor-pointer"
              >
                Create a card to start
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Flippable Card Container */}
              <div 
                onClick={handleFlip}
                className="perspective-1000 w-full h-72 cursor-pointer select-none relative"
              >
                {/* Inner card with transform rules */}
                <div 
                  className={`w-full h-full transition-transform duration-500 transform-style-3d relative rounded-3xl border border-slate-200 shadow-md ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  
                  {/* FRONT SIDE (Term / Question) */}
                  <div className="absolute inset-0 backface-hidden bg-white rounded-3xl p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <span className="text-[10px] font-bold text-[#1e5e5a] tracking-wider uppercase flex items-center gap-1.5">
                        <Bookmark className="w-3.5 h-3.5 text-[#1e5e5a]" />
                        {activeCard.category}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">
                        Card {currentIndex + 1} of {totalCount}
                      </span>
                    </div>

                    <div className="flex-1 flex items-center justify-center text-center">
                      <h4 className="text-base font-extrabold text-slate-800 max-w-sm leading-relaxed">
                        {activeCard.question}
                      </h4>
                    </div>

                    <div className="text-center font-mono text-[9px] text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1">
                      <RotateCw className="w-3 h-3 text-[#1e5e5a] animate-spin-slow" />
                      Click to reveal definition
                    </div>
                  </div>

                  {/* BACK SIDE (Definition / Answer) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-50 rounded-3xl p-8 flex flex-col justify-between border-t-4 border-[#1e5e5a]">
                    <div className="flex justify-between items-center border-b border-slate-200/60 pb-3">
                      <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase font-mono">
                        System Definition
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // prevent flip back
                          handleDeleteCard(activeCard.id);
                        }}
                        className="text-slate-300 hover:text-red-500 p-1 rounded transition-colors"
                        title="Delete Card"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex-1 flex items-center justify-center text-center">
                      <p className="text-xs font-semibold text-slate-600 max-w-sm leading-relaxed">
                        {activeCard.answer}
                      </p>
                    </div>

                    <div className="flex justify-center gap-3 pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markStatus(activeCard.id, "review");
                        }}
                        className="bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all"
                      >
                        <XCircle className="w-4 h-4 text-amber-500" />
                        Needs Review
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markStatus(activeCard.id, "learned");
                        }}
                        className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        Mark Learned
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Slider Pagination Controls */}
              <div className="flex items-center justify-between px-2 font-mono">
                <button
                  onClick={handlePrev}
                  className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 p-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                  <span>Card {currentIndex + 1} / {totalCount}</span>
                </div>

                <button
                  onClick={handleNext}
                  className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 p-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
