import React, { useState } from "react";
import {
  Sparkles,
  Brain,
  FileText,
  Layers,
  HelpCircle,
  MessageSquare,
  Search,
  Send,
  BookOpen,
  Calendar,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Zap,
  Volume2,
  Download,
  Mic,
  MicOff,
  Printer
} from "lucide-react";
import { StudyNote, KeyConcept } from "../types";
import { AudioPlayerBar } from "../components/AudioPlayerBar";
import { exportNoteAsText } from "../lib/exportUtils";
import { CheatSheetModal } from "../components/CheatSheetModal";

interface AIWorkspaceViewProps {
  activeNote: StudyNote | null;
  onSelectNote: (note: StudyNote) => void;
  allNotes: StudyNote[];
}

export const AIWorkspaceView: React.FC<AIWorkspaceViewProps> = ({
  activeNote,
  onSelectNote,
  allNotes
}) => {
  const [activeTab, setActiveTab] = useState<
    "summary" | "concepts" | "notes" | "concept-map" | "revision" | "doubt-solver" | "chat"
  >("summary");

  // Audio Reader State
  const [audioText, setAudioText] = useState<string | null>(null);
  const [audioTitle, setAudioTitle] = useState<string>("");
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);

  // Speech Recognition State
  const [isListeningDoubt, setIsListeningDoubt] = useState(false);
  const [isListeningChat, setIsListeningChat] = useState(false);

  // Doubt Solver State
  const [doubtQuestion, setDoubtQuestion] = useState("");
  const [doubtLoading, setDoubtLoading] = useState(false);
  const [doubtResult, setDoubtResult] = useState<any>(null);

  // Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "ai"; content: string }>>([
    {
      role: "ai",
      content: "Hello! I am your AI Study Assistant. Ask me anything about this note, request concept simplifications, or ask for mnemonic tricks!"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  // Concept Map Zoom State
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Copy state
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Toggle Speech Recognition
  const startSpeechRecognition = (type: "doubt" | "chat") => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    if (type === "doubt") setIsListeningDoubt(true);
    if (type === "chat") setIsListeningChat(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (type === "doubt") setDoubtQuestion((prev) => (prev ? prev + " " + transcript : transcript));
      if (type === "chat") setChatInput((prev) => (prev ? prev + " " + transcript : transcript));
    };

    recognition.onend = () => {
      setIsListeningDoubt(false);
      setIsListeningChat(false);
    };

    recognition.onerror = () => {
      setIsListeningDoubt(false);
      setIsListeningChat(false);
    };

    recognition.start();
  };

  if (!activeNote) {
    return (
      <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <Sparkles className="w-12 h-12 text-indigo-500 mx-auto animate-bounce" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">No Note Selected</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Select a note from your collection below to launch the AI Workspace
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto pt-4">
          {allNotes.map((n) => (
            <button
              key={n.id}
              onClick={() => onSelectNote(n)}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-left border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition"
            >
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{n.title}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{n.subject}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const mat = activeNote.materials;

  const handleCopy = (text: string, sec: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sec);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleAskDoubt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtQuestion.trim()) return;

    setDoubtLoading(true);
    try {
      const res = await fetch("/api/ai/doubt-solver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          noteTitle: activeNote.title,
          noteContent: activeNote.rawText,
          userQuestion: doubtQuestion
        })
      });
      const data = await res.json();
      setDoubtResult(data.result);
      setDoubtLoading(false);
    } catch (err) {
      setDoubtLoading(false);
    }
  };

  const handleSendChat = async (promptMsg?: string) => {
    const msgToSend = promptMsg || chatInput;
    if (!msgToSend.trim()) return;

    const newMsgs = [...chatMessages, { role: "user" as const, content: msgToSend }];
    setChatMessages(newMsgs);
    if (!promptMsg) setChatInput("");
    setChatLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMsgs,
          noteContext: activeNote.rawText
        })
      });
      const data = await res.json();
      setChatMessages([...newMsgs, { role: "ai", content: data.reply }]);
      setChatLoading(false);
    } catch (err) {
      setChatMessages([
        ...newMsgs,
        {
          role: "ai",
          content: "To master this concept, focus on the fundamental mechanisms and test yourself using active recall!"
        }
      ]);
      setChatLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Active Note Header Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              {activeNote.subject}
            </span>
            <span className="text-[10px] text-slate-400 font-mono uppercase">
              {activeNote.fileType || "PDF"} Parsed
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            {activeNote.title}
          </h1>
        </div>

        {/* Note Switcher & Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              const fullText = `${activeNote.title}. ${mat?.executiveSummary?.mainIdea || ""}. ${mat?.executiveSummary?.overview || ""}`;
              setAudioText(fullText);
              setAudioTitle(activeNote.title);
            }}
            className="px-3 py-2 text-xs font-bold rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/60 transition flex items-center gap-1.5"
            title="Read summary aloud with AI voice"
          >
            <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
            <span>Listen Audio</span>
          </button>

          <button
            onClick={() => setIsCheatSheetOpen(true)}
            className="px-3 py-2 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            title="Generate & print 1-Page Exam Night Cheat Sheet"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>1-Page Cheat Sheet</span>
          </button>

          <button
            onClick={() => exportNoteAsText(activeNote)}
            className="px-3 py-2 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1.5"
            title="Download formatted Study Guide TXT"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Export Guide</span>
          </button>

          <select
            value={activeNote.id}
            onChange={(e) => {
              const found = allNotes.find((n) => n.id === e.target.value);
              if (found) onSelectNote(found);
            }}
            className="px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium"
          >
            {allNotes.map((n) => (
              <option key={n.id} value={n.id}>
                {n.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {[
          { id: "summary", label: "Executive Summary", icon: FileText },
          { id: "concepts", label: "Key Concepts", icon: Brain },
          { id: "notes", label: "Bullet Notes", icon: BookOpen },
          { id: "concept-map", label: "Concept Map", icon: Sparkles },
          { id: "revision", label: "Revision Guide", icon: Calendar },
          { id: "doubt-solver", label: "Doubt Solver", icon: Search },
          { id: "chat", label: "AI Tutor Chat", icon: MessageSquare }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: Executive Summary */}
      {activeTab === "summary" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Core Takeaway & Main Idea</span>
              </h3>
              <button
                onClick={() => handleCopy(mat?.executiveSummary?.mainIdea || "", "main")}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition"
              >
                {copiedSection === "main" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-base font-semibold text-slate-900 dark:text-white leading-relaxed bg-indigo-50/50 dark:bg-indigo-950/20 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/40">
              "{mat?.executiveSummary?.mainIdea || "No core takeaway available."}"
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Comprehensive Summary</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {mat?.executiveSummary?.overview || "No overview available."}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Primary Topics Covered</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(mat?.executiveSummary?.keyTopics || []).map((top, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{top}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: Key Concepts */}
      {activeTab === "concepts" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(mat?.keyConcepts || []).map((kc) => (
            <div
              key={kc.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4 hover:border-indigo-500/40 transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{kc.title}</h3>
                <span
                  className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                    kc.difficulty === "easy"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : kc.difficulty === "medium"
                      ? "bg-amber-500/10 text-amber-500"
                      : "bg-rose-500/10 text-rose-500"
                  }`}
                >
                  {kc.difficulty}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Definition
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {kc.definition}
                </p>
              </div>

              {kc.example && (
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block mb-1">
                    Real-World Example
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{kc.example}</p>
                </div>
              )}

              {kc.formula && (
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-400">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Formula / Rule</span>
                  {kc.formula}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT 3: Bullet Notes */}
      {activeTab === "notes" && (
        <div className="space-y-6">
          {(mat?.bulletNotes || []).map((cat, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-3"
            >
              <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                {cat.category}
              </h3>
              <ul className="space-y-2">
                {(cat.items || []).map((item, j) => (
                  <li
                    key={j}
                    className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5 leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT 4: Interactive Concept Map */}
      {activeTab === "concept-map" && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Interactive AI Concept Map
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click nodes to inspect concept relationships and connections
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold">{Math.round(zoomLevel * 100)}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.1))}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Canvas container */}
          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto min-h-[350px] flex items-center justify-center relative">
            <div
              className="transition-transform duration-300 flex flex-wrap items-center justify-center gap-8 max-w-2xl"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {(mat?.conceptMap?.nodes || []).map((node) => {
                const isSelected = selectedNode === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node.id)}
                    className={`p-4 rounded-2xl border transition-all text-left max-w-xs ${
                      isSelected
                        ? "bg-indigo-600 text-white border-cyan-400 shadow-xl shadow-indigo-500/30 scale-105"
                        : "bg-slate-900 text-slate-200 border-slate-800 hover:border-indigo-500/50"
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase font-bold text-indigo-300 block mb-1">
                      {node.category}
                    </span>
                    <p className="text-xs font-bold">{node.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedNode && (
            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-xs">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">Node Relationship Info:</span>
              <p className="text-slate-700 dark:text-slate-300 mt-1">
                Connected edges:{" "}
                {(mat?.conceptMap?.edges || [])
                  .filter((e) => e.from === selectedNode || e.to === selectedNode)
                  .map((e) => `${e.from} → [${e.relation}] → ${e.to}`)
                  .join(" | ")}
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 5: Revision Assistant */}
      {activeTab === "revision" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-3">
            <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">
              1-Day Active Recall Review
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {mat?.revisionPlan?.oneDay || "N/A"}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-3">
            <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">
              3-Day Reinforcement Cycle
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {mat?.revisionPlan?.threeDay || "N/A"}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-3">
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">
              7-Day Mastery Benchmark
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {mat?.revisionPlan?.sevenDay || "N/A"}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 border border-indigo-500/30 text-white space-y-3 shadow-xl">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Exam Night Cheat-Sheet Summary</span>
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {mat?.revisionPlan?.examNightSummary || "N/A"}
            </p>
          </div>
        </div>
      )}

      {/* TAB CONTENT 6: AI Doubt Solver */}
      {activeTab === "doubt-solver" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                AI Doubt Solver (Strict Note Grounding)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ask any question about "{activeNote.title}". Answers are generated strictly from the uploaded note text with direct citations.
              </p>
            </div>

            <form onSubmit={handleAskDoubt} className="flex gap-2">
              <div className="flex-1 relative flex items-center">
                <input
                  type="text"
                  value={doubtQuestion}
                  onChange={(e) => setDoubtQuestion(e.target.value)}
                  placeholder="Ask a question or speak using mic..."
                  className="w-full px-4 pr-10 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => startSpeechRecognition("doubt")}
                  className={`absolute right-2 p-1.5 rounded-lg transition ${
                    isListeningDoubt ? "bg-red-500 text-white animate-pulse" : "text-slate-400 hover:text-indigo-500"
                  }`}
                  title="Speak to input question"
                >
                  {isListeningDoubt ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
              <button
                type="submit"
                disabled={doubtLoading}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shrink-0 flex items-center gap-2"
              >
                {doubtLoading ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <span>Resolve Doubt</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {doubtResult && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-indigo-500/30 shadow-lg space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  AI Answer
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                  Confidence: {doubtResult.confidenceScore}%
                </span>
              </div>

              <p className="text-sm font-medium text-slate-900 dark:text-white leading-relaxed">
                {doubtResult.answer}
              </p>

              {doubtResult.citations?.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Direct Quote Citations</span>
                  {doubtResult.citations.map((c: string, idx: number) => (
                    <p key={idx} className="text-xs text-indigo-600 dark:text-indigo-300 italic">
                      "{c}"
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 7: AI Tutor Chat */}
      {activeTab === "chat" && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col h-[500px]">
          {/* Quick Prompt Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-2 border-b border-slate-100 dark:border-slate-800 shrink-0">
            {[
              "Simplify this concept in plain language",
              "Give me a real-world analogy",
              "Generate 3 mnemonic tricks to memorize this",
              "What are top 3 exam traps for this topic?"
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendChat(chip)}
                className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-semibold whitespace-nowrap hover:bg-indigo-100 transition shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Message History */}
          <div className="flex-1 overflow-y-auto space-y-3 p-2">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-lg p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs flex items-center gap-2">
                  <span className="animate-spin w-3.5 h-3.5 border-2 border-indigo-500 border-t-transparent rounded-full" />
                  <span>AI Tutor is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 shrink-0 flex gap-2">
            <div className="flex-1 relative flex items-center">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                placeholder="Type your question or speak using mic..."
                className="w-full px-4 pr-10 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => startSpeechRecognition("chat")}
                className={`absolute right-2 p-1.5 rounded-lg transition ${
                  isListeningChat ? "bg-red-500 text-white animate-pulse" : "text-slate-400 hover:text-indigo-500"
                }`}
                title="Speak to input question"
              >
                {isListeningChat ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>
            <button
              onClick={() => handleSendChat()}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Audio Reader Component */}
      {audioText && (
        <AudioPlayerBar
          textToRead={audioText}
          title={audioTitle || "AI Audio Study Reader"}
          onClose={() => setAudioText(null)}
        />
      )}

      {/* 1-Page Printable Cheat Sheet Modal */}
      <CheatSheetModal
        note={activeNote}
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
      />
    </div>
  );
};
