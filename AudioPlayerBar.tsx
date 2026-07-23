import React, { useState } from "react";
import {
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  Brain,
  Sparkles,
  Zap,
  Flame,
  Target,
  BarChart3,
  Calendar,
  Lock,
  ChevronRight
} from "lucide-react";
import { UserProfile, SubjectMastery, AchievementBadge, DailyStudyLog } from "../types";
import { initialBadges, initialSubjectMasteries, initialDailyStudyLogs } from "../data/initialData";

interface AnalyticsViewProps {
  user: UserProfile;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ user }) => {
  const [badges] = useState<AchievementBadge[]>(initialBadges);
  const [subjectMasteries] = useState<SubjectMastery[]>(initialSubjectMasteries);
  const [dailyLogs] = useState<DailyStudyLog[]>(initialDailyStudyLogs);
  const [activeMetric, setActiveMetric] = useState<"time" | "quiz" | "flashcards">("time");

  const totalMinutes = dailyLogs.reduce((acc, curr) => acc + curr.studyMinutes, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);
  const averageDailyMinutes = Math.round(totalMinutes / dailyLogs.length);
  const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;

  // Max value for chart scaling
  const maxVal = Math.max(...dailyLogs.map((l) => (activeMetric === "time" ? l.studyMinutes : activeMetric === "quiz" ? l.quizzesTaken : l.flashcardsMastered))) || 1;

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>AI Learning Analytics & Mastery Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Study Performance & Retention Overview
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200/80">
            Track your cognitive retention rate, daily study focus hours, and unlock achievement milestones as you master your coursework.
          </p>
        </div>

        {/* User Level Badge */}
        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 text-center shrink-0 w-full md:w-auto relative z-10">
          <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">Current Rank</span>
          <div className="text-xl font-black text-amber-400 flex items-center justify-center gap-1.5 mt-0.5">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Level 4 Master</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden border border-white/10">
            <div className="bg-gradient-to-r from-amber-400 to-indigo-400 h-full w-[72%]" />
          </div>
          <span className="text-[10px] text-slate-300 font-mono mt-1 block">1,450 / 2,000 XP</span>
        </div>
      </div>

      {/* Top 4 KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-md space-y-2">
          <div className="flex items-center justify-between text-indigo-500">
            <Clock className="w-5 h-5" />
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">+18% vs last week</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {totalHours} hrs
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Study Time (7 Days)</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-md space-y-2">
          <div className="flex items-center justify-between text-amber-500">
            <Flame className="w-5 h-5" />
            <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">Active Streak</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {user.streakDays} Days
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Daily Study Streak</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-md space-y-2">
          <div className="flex items-center justify-between text-cyan-500">
            <Brain className="w-5 h-5" />
            <span className="text-xs font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full">Retention Rate</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {user.averageQuizScore}%
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Average Quiz Score</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-md space-y-2">
          <div className="flex items-center justify-between text-emerald-500">
            <Award className="w-5 h-5" />
            <span className="text-xs font-bold text-slate-400">Badges</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {unlockedBadgesCount} / {badges.length}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Achievements Unlocked</p>
        </div>
      </div>

      {/* Main Study Log Visual Chart */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              Weekly Cognitive Performance & Study Hours
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Daily study focus distribution across the current 7-day period
            </p>
          </div>

          {/* Metric Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl self-start sm:self-auto">
            <button
              onClick={() => setActiveMetric("time")}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                activeMetric === "time" ? "bg-indigo-600 text-white shadow" : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Study Minutes
            </button>
            <button
              onClick={() => setActiveMetric("quiz")}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                activeMetric === "quiz" ? "bg-indigo-600 text-white shadow" : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Quizzes Taken
            </button>
            <button
              onClick={() => setActiveMetric("flashcards")}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                activeMetric === "flashcards" ? "bg-indigo-600 text-white shadow" : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Flashcards Mastered
            </button>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="pt-6 pb-2">
          <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 border-b border-slate-200 dark:border-slate-800 px-2 sm:px-6">
            {dailyLogs.map((log, idx) => {
              const val = activeMetric === "time" ? log.studyMinutes : activeMetric === "quiz" ? log.quizzesTaken : log.flashcardsMastered;
              const heightPercent = Math.round((val / maxVal) * 100);

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  {/* Tooltip on Hover */}
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-900 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mb-1 font-mono">
                    {val} {activeMetric === "time" ? "m" : ""}
                  </span>

                  {/* Bar Element */}
                  <div className="w-full max-w-[42px] bg-indigo-100 dark:bg-slate-800/80 rounded-t-2xl relative overflow-hidden flex items-end transition-all duration-300 group-hover:bg-indigo-200 dark:group-hover:bg-slate-700">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-indigo-600 to-cyan-400 rounded-t-2xl transition-all duration-500 shadow-lg shadow-indigo-500/20"
                    />
                  </div>

                  {/* Day Label */}
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-2">
                    {log.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-xs text-slate-400 mt-4 px-2">
            <span>Daily Target: 3.5 hrs (210 mins)</span>
            <span className="font-semibold text-indigo-500">Average Daily Focus: {averageDailyMinutes} mins/day</span>
          </div>
        </div>
      </div>

      {/* Grid: Subject Mastery & Achievement Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Subject Mastery Breakdown */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-lg space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-500" />
              Subject Mastery Breakdown
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cognitive mastery calculated from quiz scores, flashcards, and note density
            </p>
          </div>

          <div className="space-y-4">
            {subjectMasteries.map((sub, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sub.color }} />
                    {sub.subject}
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400">{sub.masteryPercent}% Mastery</span>
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${sub.masteryPercent}%`, backgroundColor: sub.color }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  <span>{sub.totalNotes} Active Notes</span>
                  <span>Avg Quiz Score: {sub.averageQuizScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gamified Achievements Badges */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-lg space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Achievement Milestones
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Unlock badges by maintaining streaks, mastering quizzes, and generating cheat sheets
              </p>
            </div>
            <span className="text-xs font-extrabold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
              {unlockedBadgesCount} / {badges.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-3.5 rounded-2xl border transition flex items-start gap-3 ${
                  b.unlocked
                    ? "bg-slate-50 dark:bg-slate-800/60 border-amber-500/30"
                    : "bg-slate-100/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60"
                }`}
              >
                <div className="text-2xl p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
                  {b.unlocked ? b.icon : <Lock className="w-5 h-5 text-slate-400" />}
                </div>

                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {b.title}
                    </h5>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                    {b.description}
                  </p>
                  {b.unlocked && b.unlockedAt && (
                    <span className="text-[9px] text-amber-600 dark:text-amber-400 font-medium block pt-1">
                      Unlocked {b.unlockedAt}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
