import React, { useState, useEffect } from "react";
import { UserProfile, StudyNote, ViewTab, AppNotification } from "./types";
import { initialSampleNotes, initialUserProfile, initialNotifications } from "./data/initialData";

import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { CommandPalette } from "./components/CommandPalette";
import { AuthModal } from "./components/AuthModal";
import { NotificationCenter } from "./components/NotificationCenter";
import { PomodoroTimer } from "./components/PomodoroTimer";

import { LandingPage } from "./views/LandingPage";
import { DashboardHome } from "./views/DashboardHome";
import { MyNotesView } from "./views/MyNotesView";
import { AIWorkspaceView } from "./views/AIWorkspaceView";
import { QuizCenterView } from "./views/QuizCenterView";
import { FlashcardsView } from "./views/FlashcardsView";
import { StudyPlannerView } from "./views/StudyPlannerView";
import { AnalyticsView } from "./views/AnalyticsView";
import { StudyRoomView } from "./views/StudyRoomView";
import { ProfileSettingsView } from "./views/ProfileSettingsView";

export function App() {
  const [user, setUser] = useState<UserProfile>(initialUserProfile);
  const [notes, setNotes] = useState<StudyNote[]>(initialSampleNotes);
  const [activeNote, setActiveNote] = useState<StudyNote | null>(initialSampleNotes[0]);
  const [currentTab, setCurrentTab] = useState<ViewTab>("dashboard");
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Keyboard shortcut Cmd+K / Ctrl+K for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Update HTML dark class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleSelectNote = (note: StudyNote, tab?: ViewTab) => {
    setActiveNote(note);
    if (tab) {
      setCurrentTab(tab);
    }
  };

  const handleAddNote = (newNote: StudyNote) => {
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    setCurrentTab("ai-workspace");
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    if (activeNote?.id === id) {
      setActiveNote(updated[0] || null);
    }
  };

  const handleSuccessLogin = (name: string, email: string) => {
    setUser({ ...user, name, email });
    setCurrentTab("dashboard");
  };

  // If on Landing Page, render full screen Landing view
  if (currentTab === "landing") {
    return (
      <LandingPage
        onGetStarted={() => {
          setIsAuthModalOpen(true);
        }}
        setCurrentTab={setCurrentTab}
      />
    );
  }

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white`}>
      {/* Navbar */}
      <Navbar
        theme={isDarkMode ? "dark" : "light"}
        setTheme={(t) => setIsDarkMode(t === "dark")}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        user={user}
        notifications={notifications}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenPomodoro={() => setIsPomodoroOpen(true)}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        toggleSidebarMobile={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          mobileOpen={mobileSidebarOpen}
          closeMobile={() => setMobileSidebarOpen(false)}
          noteCount={notes.length}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {currentTab === "dashboard" && (
            <DashboardHome
              user={user}
              notes={notes}
              onSelectNote={handleSelectNote}
              setCurrentTab={setCurrentTab}
              onOpenUploadModal={() => setIsUploadModalOpen(true)}
            />
          )}

          {currentTab === "notes" && (
            <MyNotesView
              notes={notes}
              onSelectNote={handleSelectNote}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
              isUploadOpen={isUploadModalOpen}
              onCloseUpload={() => setIsUploadModalOpen(false)}
              onOpenUpload={() => setIsUploadModalOpen(true)}
            />
          )}

          {currentTab === "ai-workspace" && (
            <AIWorkspaceView
              activeNote={activeNote}
              onSelectNote={(n) => setActiveNote(n)}
              allNotes={notes}
            />
          )}

          {currentTab === "quiz-center" && (
            <QuizCenterView
              activeNote={activeNote}
              allNotes={notes}
              onSelectNote={(n) => setActiveNote(n)}
            />
          )}

          {currentTab === "flashcards" && (
            <FlashcardsView
              activeNote={activeNote}
              allNotes={notes}
              onSelectNote={(n) => setActiveNote(n)}
            />
          )}

          {currentTab === "planner" && <StudyPlannerView />}

          {currentTab === "analytics" && <AnalyticsView user={user} />}

          {currentTab === "groups" && <StudyRoomView allNotes={notes} />}

          {currentTab === "profile" && (
            <ProfileSettingsView
              user={user}
              onUpdateUser={setUser}
              isDarkMode={isDarkMode}
              onToggleTheme={() => setIsDarkMode(!isDarkMode)}
            />
          )}
        </main>
      </div>

      {/* Global Command Palette Modal (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        notes={notes}
        onSelectNote={handleSelectNote}
        setCurrentTab={setCurrentTab}
      />

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccessLogin={handleSuccessLogin}
      />

      {/* Notification Center Drawer */}
      <NotificationCenter
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAllRead={() => {
          setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
        }}
      />

      {/* Pomodoro Timer Modal */}
      <PomodoroTimer
        isOpen={isPomodoroOpen}
        onClose={() => setIsPomodoroOpen(false)}
      />
    </div>
  );
}

export default App;
