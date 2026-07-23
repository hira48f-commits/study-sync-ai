import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  FileText,
  Brain,
  HelpCircle,
  Layers,
  Calendar,
  BarChart3,
  Users,
  Upload,
  Search,
  BookOpen,
  Star,
  ChevronDown,
  Zap,
  Globe,
  Lock,
  X
} from "lucide-react";
import { ViewTab } from "../types";

interface LandingPageProps {
  onGetStarted: () => void;
  setCurrentTab: (tab: ViewTab) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, setCurrentTab }) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [demoVideoOpen, setDemoVideoOpen] = useState(false);

  const features = [
    { icon: FileText, title: "AI Note Summarizer", desc: "Transforms long lectures, PDFs, and textbook chapters into executive summaries in seconds.", color: "text-indigo-500" },
    { icon: Brain, title: "AI Concept Synthesizer", desc: "Extracts core definitions, real-world examples, and math/science formulas automatically.", color: "text-purple-500" },
    { icon: HelpCircle, title: "Quiz Generator", desc: "Generates custom MCQs, True/False, and short-answer questions with instant grading & explanations.", color: "text-cyan-500" },
    { icon: Layers, title: "Flashcard Builder", desc: "Creates interactive 3D flip cards supporting Spaced Repetition algorithms for maximum retention.", color: "text-emerald-500" },
    { icon: Calendar, title: "Study Planner", desc: "Generates tailored daily study schedules based on your target exam date and daily available hours.", color: "text-amber-500" },
    { icon: BarChart3, title: "Progress Analytics", desc: "Visualizes weekly study time, topic mastery, learning streaks, and identifies weak areas.", color: "text-rose-500" },
    { icon: Users, title: "Study Groups", desc: "Share notes, flashcard sets, and practice quizzes with classmates in real-time collaborative hubs.", color: "text-blue-500" },
    { icon: Upload, title: "PDF & Doc Upload", desc: "Drag & drop PDFs, Word documents, text notes, or OCR handwritten notes effortlessly.", color: "text-teal-500" },
    { icon: Search, title: "Smart Search", desc: "Instant command palette search across all your notes, flashcards, quizzes, and concept maps.", color: "text-indigo-400" },
    { icon: BookOpen, title: "Revision Hub", desc: "Specialized 1-day, 3-day, 7-day, and Exam Night cheat-sheet summaries for last-minute cramming.", color: "text-violet-500" }
  ];

  const testimonials = [
    {
      name: "Sophia Martinez",
      role: "Pre-Med Student",
      university: "Stanford University",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      text: "StudySync AI cut my MCAT preparation time in half. Generating flashcards and taking instant quizzes directly from my neurobiology PDFs made memorization effortless!"
    },
    {
      name: "David Kim",
      role: "Computer Science Major",
      university: "MIT",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      text: "The AI Concept Map feature is mind-blowing. It visually connected graph algorithms with dynamic programming concepts I was struggling with."
    },
    {
      name: "Emma Watson",
      role: "Law Candidate",
      university: "Harvard Law",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      text: "The AI Doubt Solver is like having a 24/7 law professor. Asking questions against 200-page case briefs with exact citations saved my semester."
    }
  ];

  const faqs = [
    { q: "How does StudySync AI generate summaries and quizzes?", a: "StudySync AI uses Google's state-of-the-art Gemini 3.6 Flash model server-side to analyze your uploaded PDFs, documents, or typed notes. It synthesizes executive summaries, key terms, 3D flashcards, and adaptive quizzes in seconds." },
    { q: "Can I upload handwritten notes or images?", a: "Yes! StudySync AI features built-in Multimodal OCR that transcribes photographed or handwritten lecture slides and notebook pages into clean digital notes." },
    { q: "What is Spaced Repetition in the Flashcards view?", a: "Spaced repetition is a proven learning technique where flashcards are resurfaced right before you forget them. Rating cards as Easy, Medium, or Hard automatically schedules future review intervals." },
    { q: "Is StudySync AI suitable for university exams and competitive tests?", a: "Absolutely. StudySync AI is designed for college students, medical/law candidates, bootcamp learners, and competitive exam aspirants (MCAT, GRE, LSAT, SAT, Coding Interviews)." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Animated Mesh Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-8 backdrop-blur-md shadow-lg shadow-indigo-500/10 animate-in fade-in">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "6s" }} />
          <span>Next-Gen AI Learning Engine • Powered by Gemini 3.6</span>
          <span className="bg-indigo-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">New</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
          Study Smarter. Learn Faster. <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            Powered by AI.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          Upload your lecture notes, slides, PDFs, or recordings. Let StudySync AI instantly generate executive summaries, practice quizzes, 3D flashcards, revision plans, and concept maps within seconds.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 active:scale-95 transition flex items-center justify-center gap-2 group"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setDemoVideoOpen(true)}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/80 font-bold text-sm transition flex items-center justify-center gap-2.5 backdrop-blur-md"
          >
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Play className="w-3 h-3 fill-indigo-400" />
            </div>
            <span>Watch Demo (1 min)</span>
          </button>
        </div>

        {/* Interactive App Mockup Preview */}
        <div className="relative max-w-5xl mx-auto rounded-3xl border border-slate-800 bg-slate-900/80 p-2 sm:p-4 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-11 bg-slate-950/80 border-b border-slate-800/80 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[11px] font-mono text-slate-500">app.studysync.ai/dashboard</span>
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Active</span>
            </div>
          </div>

          <div className="pt-12 pb-4 px-2 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {/* Mock Card 1 */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400">Executive Summary</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 font-mono">PDF Parsed</span>
              </div>
              <p className="text-xs font-semibold text-white">Neuroscience: Synaptic Plasticity</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                LTP persistent strengthening via Ca2+ influx through NMDA glutamate receptors...
              </p>
            </div>

            {/* Mock Card 2 */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-indigo-500/30 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-bold rounded-bl-lg">
                Interactive Flashcard
              </div>
              <span className="text-xs font-bold text-cyan-400">Flashcard #14</span>
              <p className="text-xs font-semibold text-white">What unblocks NMDA receptors?</p>
              <div className="p-2.5 rounded-xl bg-indigo-950/50 border border-indigo-800/50 text-[11px] text-indigo-200">
                Membrane depolarization drives out Mg2+ ions at -30mV.
              </div>
            </div>

            {/* Mock Card 3 */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">Quiz Center</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Score: 95%</span>
              </div>
              <p className="text-xs font-semibold text-white">Graph Algorithms Diagnostic</p>
              <div className="space-y-1.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Dijkstra: O((V+E) log V)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* University Logos Trust Banner */}
      <section className="py-10 border-y border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
            Trusted by top scholars at world-class institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-14 opacity-60 text-slate-400 font-bold text-sm sm:text-base">
            <span className="tracking-widest font-serif">STANFORD</span>
            <span className="tracking-widest font-mono">M.I.T.</span>
            <span className="tracking-widest font-serif">HARVARD</span>
            <span className="tracking-widest font-serif">OXFORD</span>
            <span className="tracking-widest font-mono">BERKELEY</span>
            <span className="tracking-widest font-serif">CAMBRIDGE</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 mb-3">
            Powerful Feature Suite
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Everything you need to master your exams in one dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all duration-300 group shadow-lg"
              >
                <div className={`w-12 h-12 rounded-2xl bg-slate-800/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${feat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 mb-3">
            Simple 4-Step Pipeline
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">
            From raw notes to exam mastery in 30 seconds
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {[
            { step: "01", title: "Upload Notes", desc: "PDFs, DOCX, handwritten notes, or raw copy-pasted lecture text." },
            { step: "02", title: "AI Understands", desc: "Gemini 3.6 Flash analyzes definitions, formulas, and structural themes." },
            { step: "03", title: "Generates Materials", desc: "Creates summaries, 3D flashcards, practice quizzes, and concept maps." },
            { step: "04", title: "Master Exams", desc: "Review with spaced repetition and score 90%+ on exam day." }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 relative">
              <span className="text-4xl font-black font-mono text-indigo-500/30 block mb-2">
                {item.step}
              </span>
              <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-3">
            Student Success Stories
          </h2>
          <p className="text-3xl font-extrabold text-white">Loved by students nationwide</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">"{t.text}"</p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30" />
                <div>
                  <p className="text-xs font-bold text-white">{t.name}</p>
                  <p className="text-[11px] text-slate-400">{t.role} • {t.university}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 mb-3">
            Transparent SaaS Pricing
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Invest in your academic success
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-xl transition ${billingCycle === "monthly" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400"}`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${billingCycle === "annual" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400"}`}
            >
              <span>Annual Billing</span>
              <span className="bg-emerald-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Free Starter</h3>
              <p className="text-xs text-slate-400 mb-4">Perfect for trying out StudySync AI</p>
              <div className="text-3xl font-black text-white mb-6">$0</div>

              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> 3 Notes / PDF Uploads per month</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> Basic AI Summaries & Flashcards</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> 1 Diagnostic Quiz per note</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" /> Standard Search</li>
              </ul>
            </div>

            <button
              onClick={onGetStarted}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
            >
              Start For Free
            </button>
          </div>

          {/* Pro Plan (Highlighted) */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20 relative flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white text-[10px] font-extrabold rounded-full uppercase tracking-wider">
              Most Popular
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-1">Pro Scholar</h3>
              <p className="text-xs text-indigo-200 mb-4">Unlimited power for serious students</p>
              <div className="text-3xl font-black text-white mb-6">
                {billingCycle === "annual" ? "$12" : "$15"}{" "}
                <span className="text-xs font-normal text-slate-400">/ month</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-200 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> <b>Unlimited</b> PDF & Document Uploads</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Gemini 3.6 Flash AI Engine</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Interactive AI Concept Maps</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> AI Doubt Solver with Citations</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Spaced Repetition Flashcard Engine</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Personalized AI Study Planner</li>
              </ul>
            </div>

            <button
              onClick={onGetStarted}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 transition"
            >
              Get Pro Access
            </button>
          </div>

          {/* Premium Plan */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Campus & Group</h3>
              <p className="text-xs text-slate-400 mb-4">For study groups & research teams</p>
              <div className="text-3xl font-black text-white mb-6">
                {billingCycle === "annual" ? "$24" : "$29"}{" "}
                <span className="text-xs font-normal text-slate-400">/ month</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Everything in Pro Plan</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Up to 5 Study Group Members</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Real-time Collaborative Notes</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Priority AI Response Speed</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> OCR Handwritten Note Transcriber</li>
              </ul>
            </div>

            <button
              onClick={onGetStarted}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
            >
              Choose Campus
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-900">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm text-white flex justify-between items-center hover:text-indigo-400 transition"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span className="font-bold text-white">StudySync AI</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentTab("landing")} className="hover:text-white transition">Privacy Policy</button>
            <button onClick={() => setCurrentTab("landing")} className="hover:text-white transition">Terms of Service</button>
            <button onClick={() => setCurrentTab("landing")} className="hover:text-white transition">Contact Support</button>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition">GitHub</a>
          </div>
        </div>
      </footer>

      {/* Demo Video Modal */}
      {demoVideoOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setDemoVideoOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center">
                <Play className="w-8 h-8 fill-indigo-400 ml-1" />
              </div>
              <h3 className="text-xl font-extrabold text-white">StudySync AI Feature Walkthrough</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Watch how StudySync AI transforms a 20-page Neuroscience PDF into summaries, 3D flashcards, an AI Concept Map, and interactive practice quizzes in under 20 seconds.
              </p>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs text-indigo-300 space-y-2">
                <p>✨ <b>1. Upload:</b> Drop your PDF, DOCX, or handwritten note image.</p>
                <p>⚡ <b>2. Gemini Synthesis:</b> AI extracts key concepts, formulas, and definitions.</p>
                <p>🧠 <b>3. Learn & Review:</b> Spaced repetition flashcards & instant diagnostic quiz evaluation.</p>
              </div>

              <button
                onClick={() => {
                  setDemoVideoOpen(false);
                  onGetStarted();
                }}
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition"
              >
                Launch App Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
