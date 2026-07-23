export type ThemeMode = "dark" | "light";

export type ViewTab =
  | "landing"
  | "dashboard"
  | "notes"
  | "ai-workspace"
  | "flashcards"
  | "quiz-center"
  | "planner"
  | "analytics"
  | "groups"
  | "profile";

export interface KeyConcept {
  id: string;
  title: string;
  definition: string;
  example?: string;
  formula?: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface BulletNoteCategory {
  category: string;
  items: string[];
}

export interface StudyGuideModule {
  chapter: string;
  topics: string[];
  examTips: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: "mcq" | "true_false" | "short_answer" | "fill_blank" | "scenario";
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  question?: string;
  answer?: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  isBookmarked?: boolean;
  masteryRating?: "easy" | "medium" | "hard";
  lastReviewed?: string;
  nextReviewDate?: string;
}

export interface StudyScheduleTaskItem {
  id: string;
  subject: string;
  topic: string;
  durationMinutes: number;
  isCompleted: boolean;
}

export interface StudyScheduleDay {
  day: string;
  date: string;
  tasks: StudyScheduleTaskItem[];
}

export interface StudySchedule {
  examName: string;
  examDate: string;
  dailyTargetHours: number;
  weeklyPlan: StudyScheduleDay[];
}

export interface RevisionPlan {
  oneDay: string;
  threeDay: string;
  sevenDay: string;
  examNightSummary: string;
}

export interface ConceptNode {
  id: string;
  label: string;
  category: string;
  description?: string;
}

export interface ConceptEdge {
  from: string;
  to: string;
  relation: string;
}

export interface ConceptMap {
  nodes: ConceptNode[];
  edges: ConceptEdge[];
}

export interface ExecutiveSummary {
  mainIdea: string;
  overview: string;
  keyTopics: string[];
}

export interface StudyMaterials {
  executiveSummary: ExecutiveSummary;
  keyConcepts: KeyConcept[];
  bulletNotes: BulletNoteCategory[];
  studyGuide: StudyGuideModule[];
  quizzes: QuizQuestion[];
  flashcards: Flashcard[];
  revisionPlan: RevisionPlan;
  conceptMap: ConceptMap;
}

export interface StudyNote {
  id: string;
  title: string;
  subject: string;
  rawText: string;
  fileType?: "pdf" | "docx" | "txt" | "paste" | "ocr";
  createdAt: string;
  lastStudiedAt: string;
  progressPercent: number;
  materials: StudyMaterials;
}

export interface DailyScheduleTask {
  day: string;
  focusSubject: string;
  allocatedHours: number;
  tasks: string[];
  intensity: "high" | "medium" | "low";
}

export interface StudyPlan {
  examDate: string;
  weeklyGoals: string[];
  dailySchedule: DailyScheduleTask[];
  examCountdownStrategy: string;
}

export interface StudyGroupMember {
  id: string;
  name: string;
  avatar: string;
  role: "admin" | "member";
  streakDays: number;
}

export interface StudyGroupComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  timestamp: string;
  text: string;
}

export interface StudyGroupChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  description?: string;
  subject: string;
  code?: string;
  inviteCode: string;
  membersCount: number;
  sharedNotesCount: number;
  chatMessages: StudyGroupChatMessage[];
  members?: StudyGroupMember[];
  comments?: StudyGroupComment[];
  sharedNoteCount?: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  institution: string;
  targetExam: string;
  dailyGoalHours: number;
  streakDays: number;
  totalNotesCreated: number;
  quizzesTaken: number;
  averageQuizScore: number;
  flashcardsMastered: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: "revision" | "quiz" | "streak" | "achievement";
  timestamp: string;
  isRead: boolean;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: "streak" | "mastery" | "quiz" | "focus";
}

export interface SubjectMastery {
  subject: string;
  totalNotes: number;
  averageQuizScore: number;
  masteryPercent: number;
  color: string;
}

export interface DailyStudyLog {
  day: string;
  date: string;
  studyMinutes: number;
  quizzesTaken: number;
  flashcardsMastered: number;
}
