import React, { useState } from "react";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  ArrowRight,
  Clock,
  Zap,
  Check,
  Volume2
} from "lucide-react";
import confetti from "canvas-confetti";
import { StudyNote, QuizQuestion } from "../types";
import { audioSynth } from "../lib/audioSynth";
import { AudioPlayerBar } from "../components/AudioPlayerBar";

interface QuizCenterViewProps {
  activeNote: StudyNote | null;
  allNotes: StudyNote[];
  onSelectNote: (note: StudyNote) => void;
}

export const QuizCenterView: React.FC<QuizCenterViewProps> = ({
  activeNote,
  allNotes,
  onSelectNote
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<"all" | "easy" | "medium" | "hard">("all");
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [shortAnswerInputs, setShortAnswerInputs] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [audioText, setAudioText] = useState<string | null>(null);

  const currentNote = activeNote || allNotes[0];
  const questions = (currentNote?.materials?.quizzes || []).filter((q) =>
    selectedDifficulty === "all" ? true : q.difficulty === selectedDifficulty
  );

  const handleAnswerSelect = (questionId: string, answer: string) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };

  const handleShortAnswerChange = (questionId: string, text: string) => {
    if (isSubmitted) return;
    setShortAnswerInputs({ ...shortAnswerInputs, [questionId]: text });
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (q.type === "short_answer") {
        const userAns = (shortAnswerInputs[q.id] || "").toLowerCase();
        if (userAns.trim().length > 3) {
          correctCount++; // Generous model evaluation
        }
      } else {
        const userAns = selectedAnswers[q.id];
        if (userAns === q.correctAnswer) {
          correctCount++;
        }
      }
    });

    const calculatedScore = Math.round((correctCount / Math.max(1, questions.length)) * 100);
    setScore(calculatedScore);
    setIsSubmitted(true);

    if (calculatedScore >= 70) {
      audioSynth.playSuccess();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    } else {
      audioSynth.playError();
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShortAnswerInputs({});
    setIsSubmitted(false);
    setScore(null);
    setCurrentQuizIndex(0);
  };

  if (!currentNote || questions.length === 0) {
    return (
      <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <HelpCircle className="w-12 h-12 text-indigo-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">No Quiz Questions Available</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Select another study set or generate a new note to play AI practice quizzes.
        </p>
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {allNotes.map((n) => (
            <button
              key={n.id}
              onClick={() => onSelectNote(n)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-indigo-600 hover:text-white transition"
            >
              {n.title}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuizIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              {currentNote.subject}
            </span>
            <span className="text-[10px] text-slate-400 font-mono uppercase">
              {questions.length} Diagnostic Questions
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Quiz Center: {currentNote.title}
          </h1>
        </div>

        {/* Difficulty selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Difficulty:</label>
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            {(["all", "easy", "medium", "hard"] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => {
                  setSelectedDifficulty(diff);
                  handleResetQuiz();
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg uppercase transition ${
                  selectedDifficulty === diff
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quiz Completion Banner */}
      {isSubmitted && score !== null && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border border-indigo-500/30 text-white shadow-xl space-y-4 text-center animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold">Quiz Complete!</h2>
            <p className="text-sm text-indigo-200 mt-1">
              Your Diagnostic Accuracy Score: <span className="text-cyan-300 font-bold font-mono text-xl">{score}%</span>
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleResetQuiz}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </button>
          </div>
        </div>
      )}

      {/* Quiz Progress Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center justify-between gap-4">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
          Question {currentQuizIndex + 1} of {questions.length}
        </span>
        <div className="flex-1 max-w-md h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300"
            style={{ width: `${((currentQuizIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-xs font-mono font-bold text-indigo-500">
          {Math.round(((currentQuizIndex + 1) / questions.length) * 100)}%
        </span>
      </div>

      {/* Question Card */}
      {currentQ && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-lg space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500">
                Type: {currentQ.type.replace("_", " ")}
              </span>
              <button
                onClick={() => {
                  const speakText = `Question: ${currentQ.question}. ${currentQ.options ? "Options are: " + currentQ.options.join(", ") : ""}`;
                  setAudioText(speakText);
                }}
                className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 flex items-center gap-1 transition"
                title="Read question aloud"
              >
                <Volume2 className="w-3 h-3 text-indigo-500" />
                <span>Listen</span>
              </button>
            </div>
            <span
              className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                currentQ.difficulty === "easy"
                  ? "bg-emerald-500/10 text-emerald-500"
                  : currentQ.difficulty === "medium"
                  ? "bg-amber-500/10 text-amber-500"
                  : "bg-rose-500/10 text-rose-500"
              }`}
            >
              {currentQ.difficulty}
            </span>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
            {currentQ.question}
          </h2>

          {/* Options for MCQ / True-False */}
          {(currentQ.type === "mcq" || currentQ.type === "true_false") && currentQ.options && (
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === opt;
                const isCorrect = opt === currentQ.correctAnswer;

                let optionStyle =
                  "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-500";

                if (isSubmitted) {
                  if (isCorrect) {
                    optionStyle = "bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold";
                  } else if (isSelected && !isCorrect) {
                    optionStyle = "bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400";
                  }
                } else if (isSelected) {
                  optionStyle = "bg-indigo-600 text-white border-indigo-600 font-bold shadow-md shadow-indigo-500/20";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(currentQ.id, opt)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{opt}</span>
                    {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                    {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Short Answer / Fill Blank Input */}
          {(currentQ.type === "short_answer" || currentQ.type === "fill_blank") && (
            <div className="space-y-3">
              <textarea
                rows={3}
                value={shortAnswerInputs[currentQ.id] || ""}
                onChange={(e) => handleShortAnswerChange(currentQ.id, e.target.value)}
                placeholder="Type your model answer here..."
                disabled={isSubmitted}
                className="w-full p-3 text-xs sm:text-sm rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
              {isSubmitted && (
                <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-700 dark:text-indigo-300">
                  <b>Model Answer Key:</b> {currentQ.correctAnswer}
                </div>
              )}
            </div>
          )}

          {/* Explanation Box */}
          {isSubmitted && currentQ.explanation && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <span className="font-bold text-indigo-500 uppercase block">AI Explanation & Context</span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Quiz Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setCurrentQuizIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQuizIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 disabled:opacity-40"
            >
              Previous
            </button>

            {!isSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleResetQuiz}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-bold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>
            )}

            <button
              onClick={() => setCurrentQuizIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              disabled={currentQuizIndex === questions.length - 1}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {audioText && (
        <AudioPlayerBar
          textToRead={audioText}
          title="Quiz Audio Reader"
          onClose={() => setAudioText(null)}
        />
      )}
    </div>
  );
};
