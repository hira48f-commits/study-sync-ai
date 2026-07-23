import React, { useState } from "react";
import {
  FileText,
  Search,
  Plus,
  Sparkles,
  Grid,
  List,
  Upload,
  HelpCircle,
  Layers,
  Trash2,
  Download,
  CheckCircle2,
  X,
  FileUp,
  Image,
  Volume2
} from "lucide-react";
import { StudyNote, ViewTab } from "../types";
import { exportNoteAsText } from "../lib/exportUtils";
import { AudioPlayerBar } from "../components/AudioPlayerBar";

interface MyNotesViewProps {
  notes: StudyNote[];
  onSelectNote: (note: StudyNote, tab: ViewTab) => void;
  onAddNote: (newNote: StudyNote) => void;
  onDeleteNote: (id: string) => void;
  isUploadOpen: boolean;
  onCloseUpload: () => void;
  onOpenUpload: () => void;
}

export const MyNotesView: React.FC<MyNotesViewProps> = ({
  notes,
  onSelectNote,
  onAddNote,
  onDeleteNote,
  isUploadOpen,
  onCloseUpload,
  onOpenUpload
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [audioText, setAudioText] = useState<string | null>(null);
  const [audioTitle, setAudioTitle] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // New Note Modal State
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("General Study");
  const [newContent, setNewContent] = useState("");
  const [fileType, setFileType] = useState<"pdf" | "docx" | "txt" | "paste" | "ocr">("paste");
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const subjects = ["All", ...Array.from(new Set((notes || []).map((n) => n.subject)))];

  const filteredNotes = (notes || []).filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.rawText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "All" || n.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent || newContent.trim().length < 10) {
      setErrorMsg("Please enter or paste at least 10 characters of note text.");
      return;
    }
    setErrorMsg("");
    setIsGenerating(true);

    try {
      const res = await fetch("/api/ai/generate-study-materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle || "New Study Set",
          subject: newSubject || "General",
          content: newContent
        })
      });

      const data = await res.json();
      if (!data.success || !data.materials) {
        throw new Error(data.error || "Failed to generate AI study set.");
      }

      const created: StudyNote = {
        id: `note-${Date.now()}`,
        title: newTitle || "New Study Set",
        subject: newSubject || "General",
        fileType,
        createdAt: new Date().toISOString(),
        lastStudiedAt: new Date().toISOString(),
        progressPercent: 0,
        rawText: newContent,
        materials: data.materials
      };

      onAddNote(created);
      setIsGenerating(false);
      setNewTitle("");
      setNewContent("");
      onCloseUpload();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to parse study materials.");
      setIsGenerating(false);
    }
  };

  const handleSampleFileLoad = (sampleType: string) => {
    if (sampleType === "bio") {
      setNewTitle("Cellular Respiration & ATP Synthase Dynamics");
      setNewSubject("Biochemistry");
      setNewContent(
        "Cellular respiration is a set of metabolic reactions and processes that take place in the cells of organisms to convert biochemical energy from nutrients into adenosine triphosphate (ATP), and then release waste products. The reactions involved in respiration are catabolic reactions, which break large molecules into smaller ones, releasing energy because weak high-energy bonds, mainly in molecular oxygen, are replaced by stronger bonds in the products. Respiration is one of the key ways a cell gains useful energy to fuel cellular activity.\n\nGlycolysis occurs in the cytoplasm and breaks glucose into two pyruvate molecules, yielding 2 ATP and 2 NADH. The Krebs Cycle (Citric Acid Cycle) in the mitochondrial matrix produces NADH and FADH2. The Electron Transport Chain (ETC) across the inner mitochondrial membrane drives protons (H+) into the intermembrane space, creating a chemiosmotic electrochemical gradient. ATP Synthase rotates as protons flow back through its F0 channel, phosphorylating ADP into ATP via rotational catalysis."
      );
      setFileType("pdf");
    } else if (sampleType === "econ") {
      setNewTitle("Macroeconomics: Monetary Policy & Inflation Targets");
      setNewSubject("Economics");
      setNewContent(
        "Monetary policy consists of the actions taken by a central bank (such as the Federal Reserve) to manage the money supply, interest rates, and credit conditions in an economy. The primary dual mandate of the Federal Reserve is achieving maximum employment and maintaining price stability (typically targeted at 2% annual inflation).\n\nWhen the economy faces recessionary pressure, central banks implement expansionary monetary policy by lowering the Federal Funds Rate, purchasing government securities via Quantitative Easing (QE), and reducing reserve requirements. This increases liquidity and stimulates commercial bank lending. Conversely, during periods of demand-pull inflation, contractionary monetary policy raises policy rates and reduces the central bank balance sheet, slowing economic overheating."
      );
      setFileType("docx");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-indigo-500" />
            <span>My Study Notes & Sets</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage your uploaded study sets, generate flashcards, practice quizzes, and executive summaries
          </p>
        </div>

        <button
          onClick={onOpenUpload}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 active:scale-95 transition flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Upload / Create Note</span>
        </button>
      </div>

      {/* Filter & View Mode Controls */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by keyword or subject..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Subject Filter Pills & Grid/List view */}
        <div className="flex items-center gap-3 justify-between sm:justify-end">
          <div className="flex items-center gap-1 overflow-x-auto">
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                  selectedSubject === sub
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-slate-600 dark:text-slate-400 transition ${
                viewMode === "grid" ? "bg-white dark:bg-slate-700 text-indigo-500 shadow-sm" : ""
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg text-slate-600 dark:text-slate-400 transition ${
                viewMode === "list" ? "bg-white dark:bg-slate-700 text-indigo-500 shadow-sm" : ""
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Notes Grid or List */}
      {filteredNotes.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 space-y-3">
          <FileText className="w-12 h-12 text-slate-400 mx-auto opacity-50" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No Notes Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Try resetting your search query or upload a new study set to get started!
          </p>
          <button
            onClick={onOpenUpload}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition"
          >
            Upload Study Material
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-indigo-500/50 hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {note.subject}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="p-1 text-slate-400 hover:text-rose-500 transition rounded-lg"
                      title="Delete Note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-500 transition-colors mb-2">
                  {note.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {note.materials?.executiveSummary?.overview || note.materials?.executiveSummary?.mainIdea || ""}
                </p>

                <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-4 font-mono">
                  <span>{note.materials?.keyConcepts?.length || 0} Concepts</span>
                  <span>•</span>
                  <span>{note.materials?.quizzes?.length || 0} Quizzes</span>
                  <span>•</span>
                  <span>{note.materials?.flashcards?.length || 0} Cards</span>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <button
                  onClick={() => onSelectNote(note, "ai-workspace")}
                  className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch AI Workspace</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      const text = `${note.title}. ${note.materials?.executiveSummary?.mainIdea || ""}. ${note.materials?.executiveSummary?.overview || ""}`;
                      setAudioText(text);
                      setAudioTitle(note.title);
                    }}
                    className="py-1.5 px-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                    title="Listen to note summary"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Listen</span>
                  </button>

                  <button
                    onClick={() => exportNoteAsText(note)}
                    className="py-1.5 px-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                    title="Export note as TXT guide"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List Mode */
        <div className="space-y-3">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-indigo-500/50 transition"
            >
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                      {note.subject}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Created {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                    {note.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {note.materials?.executiveSummary?.mainIdea || ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onSelectNote(note, "ai-workspace")}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Workspace</span>
                </button>
                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="p-2 text-slate-400 hover:text-rose-500 transition rounded-xl bg-slate-100 dark:bg-slate-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload & Generate New Note Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={onCloseUpload}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Synthesize New AI Study Set
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Upload files or paste text. Gemini 3.6 Flash will generate summaries, quizzes & flashcards.
                </p>
              </div>
            </div>

            {/* Quick Demo Samples */}
            <div className="p-3 mb-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                ⚡ Want to test instantly? Load a sample:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleSampleFileLoad("bio")}
                  className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold text-[11px] hover:bg-indigo-500/20 transition"
                >
                  Load Sample: Biochemistry & ATP
                </button>
                <button
                  type="button"
                  onClick={() => handleSampleFileLoad("econ")}
                  className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold text-[11px] hover:bg-purple-500/20 transition"
                >
                  Load Sample: Macroeconomics & Fed Policy
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Study Set Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Organic Chemistry Reaction Mechanisms"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Subject / Category
                  </label>
                  <input
                    type="text"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="e.g. Chemistry, Computer Science, Law"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Note Content / Lecture Transcript / Book Excerpt
                </label>
                <textarea
                  rows={8}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Paste your study material, lecture notes, textbook chapters, or summary here..."
                  className="w-full p-3 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-xl shadow-indigo-500/25 transition flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    <span>Synthesizing Study Package with Gemini 3.6...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    <span>Generate AI Study Package</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {audioText && (
        <AudioPlayerBar
          textToRead={audioText}
          title={audioTitle || "Note Audio Reader"}
          onClose={() => setAudioText(null)}
        />
      )}
    </div>
  );
};
