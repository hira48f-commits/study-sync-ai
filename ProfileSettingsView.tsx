import React, { useState, useEffect } from "react";
import {
  Layers,
  RotateCw,
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2,
  CheckCircle2,
  Flame,
  X,
  Volume2,
  Download
} from "lucide-react";
import { StudyNote, Flashcard } from "../types";
import { audioSynth } from "../lib/audioSynth";
import { exportFlashcardsCSV } from "../lib/exportUtils";
import { AudioPlayerBar } from "../components/AudioPlayerBar";

interface FlashcardsViewProps {
  activeNote: StudyNote | null;
  allNotes: StudyNote[];
  onSelectNote: (note: StudyNote) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  activeNote,
  allNotes,
  onSelectNote
}) => {
  const currentNote = activeNote || allNotes[0];
  const [cards, setCards] = useState<Flashcard[]>(currentNote?.materials?.flashcards || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBookmarkedOnly, setIsBookmarkedOnly] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [audioText, setAudioText] = useState<string | null>(null);

  useEffect(() => {
    if (currentNote) {
      setCards(currentNote.materials?.flashcards || []);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [currentNote]);

  const displayedCards = isBookmarkedOnly ? cards.filter((c) => c.isBookmarked) : cards;
  const currentCard = displayedCards[currentIndex];

  const handleRateCard = (rating: "easy" | "medium" | "hard") => {
    if (!currentCard) return;
    if (rating === "easy") {
      audioSynth.playSuccess();
    }
    const updated = cards.map((c) =>
      c.id === currentCard.id ? { ...c, masteryRating: rating } : c
    );
    setCards(updated);
    setIsFlipped(false);
    if (currentIndex < displayedCards.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentCard) return;
    const updated = cards.map((c) =>
      c.id === currentCard.id ? { ...c, isBookmarked: !c.isBookmarked } : c
    );
    setCards(updated);
  };

  if (!currentNote || displayedCards.length === 0) {
    return (
      <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <Layers className="w-12 h-12 text-indigo-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {isBookmarkedOnly ? "No Starred Cards Found" : "No Flashcards Available"}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          {isBookmarkedOnly
            ? "Star cards during review to build a custom cram set!"
            : "Select another study set or generate a new note to start review."}
        </p>
        {isBookmarkedOnly && (
          <button
            onClick={() => setIsBookmarkedOnly(false)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
          >
            Show All Flashcards
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              {currentNote.subject}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Spaced Repetition Review
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
            3D Flashcards: {currentNote.title}
          </h1>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {currentCard && (
            <button
              onClick={() => {
                const speech = `Question: ${currentCard.front || currentCard.question}. Answer: ${currentCard.back || currentCard.answer}`;
                setAudioText(speech);
              }}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 transition flex items-center gap-1.5"
              title="Speak current card aloud"
            >
              <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
              <span>Listen</span>
            </button>
          )}

          <button
            onClick={() => exportFlashcardsCSV(currentNote)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition flex items-center gap-1.5"
            title="Download Flashcards as CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={() => setIsBookmarkedOnly(!isBookmarkedOnly)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              isBookmarkedOnly
                ? "bg-amber-500 text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isBookmarkedOnly ? "fill-white" : ""}`} />
            <span>{isBookmarkedOnly ? "Starred Only" : "All Cards"}</span>
          </button>

          <button
            onClick={() => setIsFullscreen(true)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-500 transition"
            title="Fullscreen Focus Mode"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress & Counter */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
        <span>
          Card {currentIndex + 1} of {displayedCards.length}
        </span>
        <span className="font-mono text-indigo-500">
          Tip: Click card or press Space to flip
        </span>
      </div>

      {/* 3D Flip Card Container */}
      {currentCard && (
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative w-full h-[320px] sm:h-[380px] cursor-pointer perspective-1000 group"
        >
          <div
            className={`w-full h-full duration-500 transition-transform transform-style-3d relative rounded-3xl shadow-xl ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            {/* FRONT OF CARD */}
            <div className="absolute inset-0 backface-hidden p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-indigo-500/50 transition">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 bg-indigo-500/10 px-2.5 py-0.5 rounded-full">
                  Question / Prompt
                </span>
                <button
                  onClick={toggleBookmark}
                  className="p-1.5 rounded-lg text-amber-400 hover:scale-110 transition"
                >
                  <Star className={`w-5 h-5 ${currentCard.isBookmarked ? "fill-amber-400" : ""}`} />
                </button>
              </div>

              <div className="text-center my-auto">
                <p className="text-base sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
                  {currentCard.front}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-3 border-t border-slate-100 dark:border-slate-800">
                <span>Click to reveal answer</span>
                <RotateCw className="w-4 h-4 text-indigo-500 animate-spin-slow" />
              </div>
            </div>

            {/* BACK OF CARD */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 border-2 border-indigo-500/50 text-white flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full">
                  Answer / Key Explanation
                </span>
                <button
                  onClick={toggleBookmark}
                  className="p-1.5 rounded-lg text-amber-400 hover:scale-110 transition"
                >
                  <Star className={`w-5 h-5 ${currentCard.isBookmarked ? "fill-amber-400" : ""}`} />
                </button>
              </div>

              <div className="text-center my-auto">
                <p className="text-sm sm:text-lg font-bold text-white leading-relaxed">
                  {currentCard.back}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-3 border-t border-slate-800">
                <span>Spaced Repetition Active</span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spaced Repetition Rating Buttons */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center justify-center gap-3">
        <button
          onClick={() => handleRateCard("hard")}
          className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white dark:text-rose-400 font-bold text-xs transition flex items-center gap-1.5"
        >
          <Flame className="w-4 h-4" />
          <span>Hard (Again Soon)</span>
        </button>

        <button
          onClick={() => handleRateCard("medium")}
          className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-600 hover:text-white dark:text-amber-400 font-bold text-xs transition flex items-center gap-1.5"
        >
          <span>Medium (Review 3d)</span>
        </button>

        <button
          onClick={() => handleRateCard("easy")}
          className="px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white dark:text-emerald-400 font-bold text-xs transition flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Easy (Mastered)</span>
        </button>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setIsFlipped(false);
            setCurrentIndex((i) => Math.max(0, i - 1));
          }}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-xs disabled:opacity-40 flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={() => {
            setIsFlipped(false);
            setCurrentIndex((i) => Math.min(displayedCards.length - 1, i + 1));
          }}
          disabled={currentIndex === displayedCards.length - 1}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-xs disabled:opacity-40 flex items-center gap-1"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-6">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-full max-w-2xl text-center space-y-6">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="p-12 rounded-3xl bg-slate-900 border-2 border-indigo-500/50 shadow-2xl cursor-pointer min-h-[300px] flex items-center justify-center text-white text-xl font-bold"
            >
              {isFlipped ? currentCard?.back : currentCard?.front}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleRateCard("easy")}
                className="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs"
              >
                Mastered
              </button>
            </div>
          </div>
        </div>
      )}

      {audioText && (
        <AudioPlayerBar
          textToRead={audioText}
          title="Flashcard Reader"
          onClose={() => setAudioText(null)}
        />
      )}
    </div>
  );
};
