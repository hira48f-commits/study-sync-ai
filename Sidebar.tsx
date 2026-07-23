import React, { useState, useEffect } from "react";
import { Search, FileText, HelpCircle, Layers, Sparkles, X, ArrowRight } from "lucide-react";
import { StudyNote, ViewTab } from "../types";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  notes: StudyNote[];
  onSelectNote: (note: StudyNote, tab: ViewTab) => void;
  setCurrentTab: (tab: ViewTab) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  notes,
  onSelectNote,
  setCurrentTab
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent if needed, or window event
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredNotes = (notes || []).filter((n) =>
    n.title.toLowerCase().includes(query.toLowerCase()) ||
    n.subject.toLowerCase().includes(query.toLowerCase()) ||
    n.rawText.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search notes, flashcards, quizzes..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="p-3 overflow-y-auto space-y-2 flex-1">
          {/* Quick Views Navigation */}
          <div className="mb-3">
            <p className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Quick Actions
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
              <button
                onClick={() => {
                  setCurrentTab("ai-workspace");
                  onClose();
                }}
                className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex items-center gap-2 hover:bg-indigo-100 transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI Workspace</span>
              </button>
              <button
                onClick={() => {
                  setCurrentTab("flashcards");
                  onClose();
                }}
                className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 text-xs font-semibold flex items-center gap-2 hover:bg-purple-100 transition"
              >
                <Layers className="w-4 h-4" />
                <span>Flashcards</span>
              </button>
              <button
                onClick={() => {
                  setCurrentTab("quiz-center");
                  onClose();
                }}
                className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 text-xs font-semibold flex items-center gap-2 hover:bg-cyan-100 transition"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Quiz Center</span>
              </button>
              <button
                onClick={() => {
                  setCurrentTab("planner");
                  onClose();
                }}
                className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2 hover:bg-emerald-100 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Study Planner</span>
              </button>
            </div>
          </div>

          {/* Notes list */}
          <div>
            <p className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Matching Notes & Study Sets ({filteredNotes.length})
            </p>
            {filteredNotes.length === 0 ? (
              <p className="px-3 py-6 text-center text-xs text-slate-400">
                No study materials found for "{query}". Try creating a new note!
              </p>
            ) : (
              <div className="space-y-1 mt-1">
                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition flex items-center justify-between group cursor-pointer"
                    onClick={() => {
                      onSelectNote(note, "ai-workspace");
                      onClose();
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-xs">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                          {note.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {note.subject} • {note.materials?.keyConcepts?.length || 0} Concepts • {note.materials?.quizzes?.length || 0} Quizzes
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex justify-between items-center">
          <span>Navigate with <b>Esc</b> to exit</span>
          <span>StudySync AI Instant Search</span>
        </div>
      </div>
    </div>
  );
};
