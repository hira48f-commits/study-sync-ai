import React, { useState } from "react";
import {
  FileText,
  Sparkles,
  Flame,
  Clock,
  HelpCircle,
  Layers,
  Upload,
  ArrowRight,
  TrendingUp,
  Brain,
  Calendar,
  CheckCircle2,
  BookOpen,
  Plus,
  Zap
} from "lucide-react";
import { StudyNote, UserProfile, ViewTab } from "../types";

interface DashboardHomeProps {
  user: UserProfile;
  notes: StudyNote[];
  onSelectNote: (note: StudyNote, tab: ViewTab) => void;
  setCurrentTab: (tab: ViewTab) => void;
  onOpenUploadModal: () => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  user,
  notes,
  onSelectNote,
  setCurrentTab,
  onOpenUploadModal
}) => {
  const [selectedQuickSubject, setSelectedQuickSubject] = useState("All");

  const filteredNotes =
    selectedQuickSubject === "All"
      ? (notes || [])
      : (notes || []).filter((n) => n.subject.toLowerCase() === selectedQuickSubject.toLowerCase());

  const subjects = ["All", ...Array.from(new Set((notes || []).map((n) => n.subject)))];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 border border-indigo-500/20 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
              <span>{user.streakDays}-Day Learning Streak Active!</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user.name.split(" ")[0]} 👋
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
              "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice."
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <button
              onClick={onOpenUploadModal}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 hover:from-indigo-400 hover:to-cyan-300 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 active:scale-95 transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Upload New Material</span>
            </button>
            <button
              onClick={() => setCurrentTab("planner")}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition flex items-center gap-2 backdrop-blur-md"
            >
              <Calendar className="w-4 h-4" />
              <span>View Study Plan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Study Time Today</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">2.5 hrs</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Study Sets Created</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">{notes.length} Sets</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500 shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Average Quiz Score</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">{user.averageQuizScore}%</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Cards Mastered</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">{user.flashcardsMastered}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Quick Dropzone & Recent Study Sets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols): Notes & Study Sets */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-500" />
                <span>My Active Study Materials</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click any note to open the AI Workspace, take quizzes, or review flashcards
              </p>
            </div>

            {/* Subject Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {subjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedQuickSubject(sub)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition whitespace-nowrap ${
                    selectedQuickSubject === sub
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-indigo-500/50 hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      {note.subject}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono uppercase">
                      {note.fileType || "PDF"}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-500 transition-colors mb-2">
                    {note.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {note.materials?.executiveSummary?.mainIdea || ""}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      <span>Concept Mastery</span>
                      <span>{note.progressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                        style={{ width: `${note.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Action launcher pills */}
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => onSelectNote(note, "ai-workspace")}
                      className="py-1.5 px-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-indigo-600 hover:text-white transition flex items-center justify-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Workspace</span>
                    </button>
                    <button
                      onClick={() => onSelectNote(note, "quiz-center")}
                      className="py-1.5 px-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-cyan-600 hover:text-white transition flex items-center justify-center gap-1"
                    >
                      <HelpCircle className="w-3 h-3" />
                      <span>Quiz</span>
                    </button>
                    <button
                      onClick={() => onSelectNote(note, "flashcards")}
                      className="py-1.5 px-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-purple-600 hover:text-white transition flex items-center justify-center gap-1"
                    >
                      <Layers className="w-3 h-3" />
                      <span>Cards</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1 col): Upload dropzone & Today's Revision */}
        <div className="space-y-6">
          {/* Quick Drag & Drop Upload Tile */}
          <div
            onClick={onOpenUploadModal}
            className="p-6 rounded-3xl bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-900 border-2 border-dashed border-indigo-500/30 hover:border-indigo-500 text-center cursor-pointer transition-all duration-300 group shadow-lg"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">
              Upload Notes / Slide Deck
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Drag & drop PDFs, Word docs, TXT notes or photos of handwritten slides
            </p>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold group-hover:bg-indigo-500 transition">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate AI Materials</span>
            </span>
          </div>

          {/* Today's Revision Tasks */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500" />
                <span>Today's Revision Queue</span>
              </h3>
              <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                3 Due
              </span>
            </div>

            <div className="space-y-3">
              {[
                { title: "Neurobiology 3-Day Spaced Review", type: "Flashcards", count: "15 cards" },
                { title: "Graph Algorithms Diagnostic Quiz", type: "Quiz", count: "5 questions" },
                { title: "Exam Night Cheat-Sheet Review", type: "Cram", count: "5 mins" }
              ].map((task, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition cursor-pointer"
                  onClick={() => setCurrentTab(task.type === "Quiz" ? "quiz-center" : "flashcards")}
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{task.title}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {task.type} • {task.count}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 hover:text-indigo-500" />
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentTab("planner")}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition flex items-center justify-center gap-1.5"
            >
              <span>Open Study Planner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
