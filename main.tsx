import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, X, Volume2, VolumeX, Sparkles, Coffee } from "lucide-react";

interface PomodoroTimerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 min default
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "shortBreak" | "longBreak">("work");
  const [ambientSound, setAmbientSound] = useState<"none" | "white" | "rain" | "waves">("none");

  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      // Play ding notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Pomodoro Complete! 🎉", {
          body: mode === "work" ? "Time for a 5-minute break!" : "Break is over! Ready to focus?"
        });
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  // Ambient sound synthesizer using Web Audio API
  useEffect(() => {
    if (ambientSound === "none") {
      if (noiseNodeRef.current) {
        try {
          (noiseNodeRef.current as any).stop?.();
          noiseNodeRef.current.disconnect();
        } catch (e) {}
        noiseNodeRef.current = null;
      }
      return;
    }

    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Stop previous
      if (noiseNodeRef.current) {
        try {
          (noiseNodeRef.current as any).stop?.();
          noiseNodeRef.current.disconnect();
        } catch (e) {}
      }

      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);

      if (ambientSound === "white") {
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * 0.05;
        }
      } else if (ambientSound === "rain") {
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 0.15; // Pink/brown noise softness
        }
      } else if (ambientSound === "waves") {
        for (let i = 0; i < bufferSize; i++) {
          const t = i / ctx.sampleRate;
          const sine = Math.sin(2 * Math.PI * 0.2 * t);
          output[i] = (Math.random() * 2 - 1) * 0.03 * (0.5 + 0.5 * sine);
        }
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      whiteNoise.loop = true;
      whiteNoise.connect(ctx.destination);
      whiteNoise.start();
      noiseNodeRef.current = whiteNoise;
    } catch (e) {
      console.warn("Audio synthesis error:", e);
    }
  }, [ambientSound]);

  if (!isOpen) return null;

  const handleSetMode = (m: "work" | "shortBreak" | "longBreak") => {
    setMode(m);
    setIsRunning(false);
    if (m === "work") setTimeLeft(25 * 60);
    if (m === "shortBreak") setTimeLeft(5 * 60);
    if (m === "longBreak") setTimeLeft(15 * 60);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent =
    mode === "work"
      ? ((25 * 60 - timeLeft) / (25 * 60)) * 100
      : mode === "shortBreak"
      ? ((5 * 60 - timeLeft) / (5 * 60)) * 100
      : ((15 * 60 - timeLeft) / (15 * 60)) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 text-center relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 blur-sm" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Pomodoro Focus Hub
          </h3>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center justify-center gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl mb-6">
          <button
            onClick={() => handleSetMode("work")}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition ${
              mode === "work"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Deep Study (25m)
          </button>
          <button
            onClick={() => handleSetMode("shortBreak")}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition ${
              mode === "shortBreak"
                ? "bg-purple-600 text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Short Break (5m)
          </button>
          <button
            onClick={() => handleSetMode("longBreak")}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition ${
              mode === "longBreak"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Long Break (15m)
          </button>
        </div>

        {/* Timer Circle Display */}
        <div className="relative my-6 w-48 h-48 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="84"
              className="stroke-slate-200 dark:stroke-slate-800"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="96"
              cy="96"
              r="84"
              className="stroke-indigo-500 transition-all duration-1000"
              strokeWidth="10"
              strokeDasharray={527}
              strokeDashoffset={527 - (527 * progressPercent) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold tracking-tight font-mono text-slate-900 dark:text-white">
              {formatTime(timeLeft)}
            </span>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-1 flex items-center gap-1">
              <Coffee className="w-3.5 h-3.5" />
              {mode === "work" ? "Stay Focused" : "Relax & Recharge"}
            </span>
          </div>
        </div>

        {/* Play / Pause / Reset Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={() => {
              setIsRunning(false);
              if (mode === "work") setTimeLeft(25 * 60);
              if (mode === "shortBreak") setTimeLeft(5 * 60);
              if (mode === "longBreak") setTimeLeft(15 * 60);
            }}
            className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 active:scale-95 transition flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-white" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-white" />
                <span>Start Session</span>
              </>
            )}
          </button>
        </div>

        {/* Ambient Sound Synthesizer Selector */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
            <span>Ambient Focus Audio (Web Synthesized)</span>
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { id: "none", label: "Off", icon: VolumeX },
              { id: "white", label: "White Noise" },
              { id: "rain", label: "Soft Rain" },
              { id: "waves", label: "Ocean Waves" }
            ].map((snd) => (
              <button
                key={snd.id}
                onClick={() => setAmbientSound(snd.id as any)}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-medium transition ${
                  ambientSound === snd.id
                    ? "bg-indigo-600 text-white font-bold"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {snd.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
