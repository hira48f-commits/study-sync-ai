import React, { useState } from "react";
import { User, Settings, Shield, Download, Sparkles, Check, Trash2, Globe, Moon, Sun } from "lucide-react";
import { UserProfile } from "../types";

interface ProfileSettingsViewProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({
  user,
  onUpdateUser,
  isDarkMode,
  onToggleTheme
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ ...user, name, email });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(user, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `StudySync_Export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-indigo-500" />
            <span>Profile & Application Settings</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage your scholar profile, theme preferences, Gemini AI model parameters & data exports
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSave} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-500" />
          <span>Scholar Profile Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition"
          >
            Save Profile
          </button>
        </div>
      </form>

      {/* AI Model Preferences */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Gemini 3.6 AI Engine Configuration</span>
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Selected AI Model</p>
              <p className="text-[10px] text-slate-400">Server-side proxy active with process.env.GEMINI_API_KEY</p>
            </div>
            <span className="font-mono font-bold text-xs text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full">
              Gemini 3.6 Flash
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Appearance Theme</p>
              <p className="text-[10px] text-slate-400">Toggle between dark mode and clean light theme</p>
            </div>
            <button
              onClick={onToggleTheme}
              type="button"
              className="p-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Export & Reset */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Data Portability</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Export your study stats and notes into JSON format</p>
        </div>

        <button
          onClick={handleExportData}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white transition font-bold text-xs flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          <span>Export JSON</span>
        </button>
      </div>
    </div>
  );
};
