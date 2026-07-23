import React from "react";
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Layers,
  HelpCircle,
  Calendar,
  BarChart3,
  Users,
  UserCheck,
  Globe,
  ChevronLeft,
  ChevronRight,
  Flame,
  Zap
} from "lucide-react";
import { ViewTab } from "../types";

interface SidebarProps {
  currentTab: ViewTab;
  setCurrentTab: (tab: ViewTab) => void;
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
  mobileOpen: boolean;
  closeMobile: () => void;
  noteCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  collapsed,
  setCollapsed,
  mobileOpen,
  closeMobile,
  noteCount
}) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "notes", label: "My Notes", icon: FileText, badge: noteCount },
    { id: "ai-workspace", label: "AI Workspace", icon: Sparkles, highlight: true },
    { id: "flashcards", label: "Flashcards", icon: Layers },
    { id: "quiz-center", label: "Quiz Center", icon: HelpCircle },
    { id: "planner", label: "Study Planner", icon: Calendar },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "groups", label: "Study Groups", icon: Users },
    { id: "profile", label: "Profile & Settings", icon: UserCheck },
    { id: "landing", label: "SaaS Landing", icon: Globe }
  ];

  const handleSelect = (id: ViewTab) => {
    setCurrentTab(id);
    closeMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:static top-16 bottom-0 left-0 z-40 bg-slate-50 dark:bg-slate-900/90 border-r border-slate-200 dark:border-slate-800/80 transition-all duration-300 flex flex-col justify-between ${
          collapsed ? "w-20" : "w-64"
        } ${
          mobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Navigation list */}
        <div className="p-3 space-y-1.5 overflow-y-auto flex-1">
          <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden lg:block">
            {!collapsed && "Main Navigation"}
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id as ViewTab)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 group relative ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 font-semibold"
                    : item.highlight
                    ? "text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    isActive ? "scale-110" : "group-hover:scale-110"
                  }`}
                />
                {(!collapsed || mobileOpen) && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}

                {item.badge !== undefined && (!collapsed || mobileOpen) && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {item.highlight && (!collapsed || mobileOpen) && !isActive && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Pro Banner or AI Status */}
        {(!collapsed || mobileOpen) && (
          <div className="p-3 m-3 rounded-2xl bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/20 text-white relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1.5">
              <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-xs font-bold bg-gradient-to-r from-cyan-400 to-indigo-300 bg-clip-text text-transparent">
                Gemini 3.6 Active
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-tight">
              Unlimited AI Summaries, Flashcards & Quiz Synthesis enabled.
            </p>
          </div>
        )}

        {/* Bottom Desktop Collapse Toggle */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 hidden lg:flex items-center justify-between">
          {!collapsed && (
            <span className="text-[11px] font-medium text-slate-400">
              StudySync AI v2.4
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 transition"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  );
};
