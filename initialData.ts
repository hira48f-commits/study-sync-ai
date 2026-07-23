import React, { useState } from "react";
import {
  Search,
  Moon,
  Sun,
  Bell,
  Clock,
  Sparkles,
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Flame,
  Plus
} from "lucide-react";
import { ThemeMode, ViewTab, UserProfile, AppNotification } from "../types";

interface NavbarProps {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  currentTab: ViewTab;
  setCurrentTab: (tab: ViewTab) => void;
  user: UserProfile;
  notifications: AppNotification[];
  onOpenCommandPalette: () => void;
  onOpenPomodoro: () => void;
  onOpenNotifications: () => void;
  onOpenUploadModal: () => void;
  onOpenAuth: () => void;
  toggleSidebarMobile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  setTheme,
  currentTab,
  setCurrentTab,
  user,
  notifications,
  onOpenCommandPalette,
  onOpenPomodoro,
  onOpenNotifications,
  onOpenUploadModal,
  onOpenAuth,
  toggleSidebarMobile
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile menu & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebarMobile}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => setCurrentTab("landing")}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                StudySync <span className="bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent font-extrabold">AI</span>
              </span>
              <span className="hidden sm:block text-[10px] font-semibold text-slate-500 dark:text-slate-400 -mt-1 tracking-wider uppercase">
                Intelligent Study Suite
              </span>
            </div>
          </button>
        </div>

        {/* Center: Search Command Bar */}
        <div className="hidden md:flex flex-1 max-w-md items-center">
          <button
            onClick={onOpenCommandPalette}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-sm bg-slate-100 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition duration-150 group"
          >
            <span className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
              <span>Search notes, quizzes, flashcards...</span>
            </span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Actions & User Info */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Create Button */}
          {currentTab !== "landing" && (
            <button
              onClick={onOpenUploadModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-md shadow-indigo-500/20 active:scale-95 transition"
            >
              <Plus className="w-4 h-4" />
              <span>New Note</span>
            </button>
          )}

          {/* Streak pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-bounce" />
            <span>{user.streakDays} Days</span>
          </div>

          {/* Pomodoro Timer button */}
          <button
            onClick={onOpenPomodoro}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition relative"
            title="Pomodoro Focus Timer & Ambient Sounds"
          >
            <Clock className="w-4 h-4" />
          </button>

          {/* Notifications bell */}
          <button
            onClick={onOpenNotifications}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition relative"
            title="Notification Center"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-slate-900 animate-ping" />
            )}
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
            )}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500/30"
              />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {profileOpen && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
                onMouseLeave={() => setProfileOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    setCurrentTab("profile");
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl transition"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Profile & Goals</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTab("profile");
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl transition"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Account Settings</span>
                </button>
                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Switch Account / Auth</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
