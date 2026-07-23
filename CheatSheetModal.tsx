import React, { useState } from "react";
import {
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  BookOpen,
  Zap,
  Target,
  Plus,
  Trash2
} from "lucide-react";
import { StudySchedule } from "../types";

export const StudyPlannerView: React.FC = () => {
  const [examName, setExamName] = useState("Final Exam Season 2026");
  const [examDate, setExamDate] = useState("2026-08-15");
  const [dailyHours, setDailyHours] = useState(3);
  const [targetScore, setTargetScore] = useState("95%");
  const [isGenerating, setIsGenerating] = useState(false);

  const [schedule, setSchedule] = useState<StudySchedule>({
    examName: "Neurobiology & Macroeconomics Finals",
    examDate: "2026-08-15",
    dailyTargetHours: 3,
    weeklyPlan: [
      {
        day: "Monday",
        date: "2026-07-27",
        tasks: [
          { id: "t1", subject: "Neurobiology", topic: "NMDA & AMPA Synaptic Plasticity", durationMinutes: 60, isCompleted: true },
          { id: "t2", subject: "Neurobiology", topic: "15 Flashcards Spaced Review", durationMinutes: 30, isCompleted: true },
          { id: "t3", subject: "Economics", topic: "Federal Reserve Open Market Operations", durationMinutes: 45, isCompleted: false }
        ]
      },
      {
        day: "Tuesday",
        date: "2026-07-28",
        tasks: [
          { id: "t4", subject: "Economics", topic: "Inflation Targets & Dual Mandate Quiz", durationMinutes: 45, isCompleted: false },
          { id: "t5", subject: "Neurobiology", topic: "Long-Term Potentiation Concept Map", durationMinutes: 60, isCompleted: false }
        ]
      },
      {
        day: "Wednesday",
        date: "2026-07-29",
        tasks: [
          { id: "t6", subject: "Computer Science", topic: "Graph Algorithms Dijkstra vs A*", durationMinutes: 90, isCompleted: false }
        ]
      }
    ]
  });

  const handleToggleTask = (dayIdx: number, taskId: string) => {
    const updatedWeekly = [...schedule.weeklyPlan];
    const task = updatedWeekly[dayIdx].tasks.find((t) => t.id === taskId);
    if (task) {
      task.isCompleted = !task.isCompleted;
      setSchedule({ ...schedule, weeklyPlan: updatedWeekly });
    }
  };

  const handleGenerateAIPlanner = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/ai/generate-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examName,
          examDate,
          dailyHours,
          subjects: ["Biochemistry", "Economics", "Computer Science"]
        })
      });
      const data = await res.json();
      if (data.success && data.planner) {
        setSchedule(data.planner);
      }
      setIsGenerating(false);
    } catch (err) {
      setIsGenerating(false);
    }
  };

  // Calculate Countdown
  const daysLeft = Math.max(
    0,
    Math.ceil(
      (new Date(schedule.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    )
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border border-indigo-500/30 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
              Exam Countdown: {daysLeft} Days Remaining
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">{schedule.examName}</h1>
          <p className="text-xs text-indigo-200 mt-1">
            Target Exam Date: {new Date(schedule.examDate).toLocaleDateString()} • Daily Goal: {schedule.dailyTargetHours} hrs
          </p>
        </div>

        <button
          onClick={handleGenerateAIPlanner}
          disabled={isGenerating}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 hover:from-indigo-400 hover:to-cyan-300 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 transition shrink-0 flex items-center gap-2"
        >
          {isGenerating ? (
            <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Regenerate AI Plan</span>
            </>
          )}
        </button>
      </div>

      {/* Planner Configuration & Weekly Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: AI Plan Generator Wizard */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-500" />
            <span>AI Plan Generator Settings</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Target Exam Name
              </label>
              <input
                type="text"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Target Exam Date
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span>Daily Study Time</span>
                <span className="font-mono text-indigo-500">{dailyHours} Hours/day</span>
              </div>
              <input
                type="range"
                min={1}
                max={8}
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* Right Column (2 cols): Daily Task Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span>Weekly Study Schedule</span>
          </h3>

          <div className="space-y-4">
            {(schedule?.weeklyPlan || []).map((dayPlan, dayIdx) => (
              <div
                key={dayIdx}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {dayPlan.day} • {dayPlan.date}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {(dayPlan?.tasks || []).filter((t) => t.isCompleted).length} / {(dayPlan?.tasks || []).length} Completed
                  </span>
                </div>

                <div className="space-y-2">
                  {(dayPlan?.tasks || []).map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleToggleTask(dayIdx, task.id)}
                      className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                        task.isCompleted
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                          : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-500"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 ${
                            task.isCompleted ? "text-emerald-500 fill-emerald-500/20" : "text-slate-400"
                          }`}
                        />
                        <div>
                          <p className={`text-xs font-bold ${task.isCompleted ? "line-through opacity-70" : ""}`}>
                            {task.topic}
                          </p>
                          <p className="text-[10px] text-slate-400">{task.subject}</p>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700">
                        {task.durationMinutes}m
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
