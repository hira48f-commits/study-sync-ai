import { StudyNote, UserProfile, StudyPlan, StudyGroup, AppNotification } from "../types";

export const initialUserProfile: UserProfile = {
  name: "Alex Rivera",
  email: "alex.rivera@stanford.edu",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  institution: "Stanford University — Computer Science & Bioengineering",
  targetExam: "Fall Semester Finals & MCAT Prep",
  dailyGoalHours: 4,
  streakDays: 12,
  totalNotesCreated: 8,
  quizzesTaken: 14,
  averageQuizScore: 92,
  flashcardsMastered: 86,
};

export const initialSampleNotes: StudyNote[] = [
  {
    id: "note-1",
    title: "Neuroscience: Synaptic Plasticity & Memory Encoding",
    subject: "Neurobiology",
    fileType: "pdf",
    createdAt: "2026-07-20T14:30:00Z",
    lastStudiedAt: "2026-07-22T09:15:00Z",
    progressPercent: 88,
    rawText: `Synaptic plasticity is the biological capacity of synapses to strengthen or weaken over time, in response to increases or decreases in their activity. Long-Term Potentiation (LTP) is a persistent strengthening of synapses based on recent patterns of activity. These are patterns of synaptic activity that produce a long-lasting increase in signal transmission between two neurons.

Glutamate receptors play a pivotal role in LTP, specifically NMDA and AMPA receptors. At resting membrane potential (-70mV), NMDA receptor channels are blocked by magnesium ions (Mg2+). When membrane depolarization occurs via repeated AMPA receptor activation, the Mg2+ block is repelled. Calcium ions (Ca2+) then influx through NMDA channels, triggering intracellular signaling cascades (CaMKII and PKC). This leads to insertion of additional AMPA receptors into the postsynaptic membrane, strengthening synaptic efficacy.

Conversely, Long-Term Depression (LTD) involves low-frequency stimulation causing low Ca2+ influx, activating protein phosphatases (calcineurin), leading to endocytosis of AMPA receptors and synaptic weakening. Memory consolidation relies on structural synaptic changes, including dendritic spine remodeling and gene expression regulated by CREB (cAMP response element-binding protein).`,
    materials: {
      executiveSummary: {
        mainIdea: "Synaptic plasticity via LTP and LTD forms the cellular substrate of learning and memory consolidation.",
        overview: "Long-Term Potentiation (LTP) permanently strengthens synaptic connections through NMDA and AMPA glutamate receptor activity and calcium-dependent signaling cascades, whereas Long-Term Depression (LTD) weakens unused pathways.",
        keyTopics: [
          "NMDA vs AMPA Glutamate Receptors",
          "Calcium Influx & CaMKII Pathway",
          "LTP vs LTD Mechanisms",
          "Dendritic Spine Remodeling & CREB Regulation"
        ]
      },
      keyConcepts: [
        {
          id: "c1",
          title: "Long-Term Potentiation (LTP)",
          definition: "A persistent strengthening of synapses based on high-frequency stimulation, increasing signal transmission efficacy between neurons.",
          example: "Repeated tetanic stimulation of hippocampal Schaeffer collateral pathways leads to enlarged EPSPs lasting hours or days.",
          formula: "EPSP_post = EPSP_baseline × (1 + ΔLTP)",
          difficulty: "medium"
        },
        {
          id: "c2",
          title: "NMDA Receptor Mg2+ Unblocking",
          definition: "Voltage-dependent removal of magnesium block from NMDA channel pore requiring postsynaptic membrane depolarization.",
          example: "AMPA receptor Na+ influx depolarizes membrane from -70mV to -30mV, expelling Mg2+.",
          difficulty: "hard"
        },
        {
          id: "c3",
          title: "CaMKII Enzyme Activation",
          definition: "Calcium/calmodulin-dependent protein kinase II responsible for phosphorylating AMPA receptors and recruiting them to the postsynaptic density.",
          example: "Autophosphorylation at Thr286 allows CaMKII to remain autonomously active even after Ca2+ levels drop.",
          difficulty: "hard"
        }
      ],
      bulletNotes: [
        {
          category: "Glutamate Receptor Dynamics",
          items: [
            "AMPA Receptors: Permeable to Na+/K+; mediate fast excitatory synaptic transmission.",
            "NMDA Receptors: Coincidence detectors permeable to Ca2+; requires both glutamate binding AND depolarization.",
            "Metabotropic Receptors (mGluRs): G-protein coupled; regulate intracellular second messengers."
          ]
        },
        {
          category: "High-Yield Exam Triggers",
          items: [
            "High Ca2+ influx → Kinase activation (CaMKII/PKC) → LTP (AMPA insertion).",
            "Low sustained Ca2+ influx → Phosphatase activation (Calcineurin) → LTD (AMPA internalization).",
            "CREB activation in nucleus is MANDATORY for late-phase LTP (protein synthesis dependent)."
          ]
        }
      ],
      studyGuide: [
        {
          chapter: "Chapter 1: Synaptic Transmission",
          topics: ["Neurotransmitter release", "Postsynaptic potentials", "Temporal and Spatial Summation"],
          examTips: ["Differentiate AMPA fast response vs NMDA coincidence detection."]
        },
        {
          chapter: "Chapter 2: Molecular Cascades of Memory",
          topics: ["Retrograde messengers (Nitric Oxide)", "Structural spine remodeling", "Late-phase LTP"],
          examTips: ["Late LTP requires protein synthesis inhibitors to block in lab experiments."]
        }
      ],
      quizzes: [
        {
          id: "q1",
          question: "Which ion acts as the critical second messenger entering through NMDA receptors to initiate Long-Term Potentiation?",
          type: "mcq",
          options: ["Sodium (Na+)", "Calcium (Ca2+)", "Potassium (K+)", "Magnesium (Mg2+)"],
          correctAnswer: "Calcium (Ca2+)",
          explanation: "Calcium influx through unblocked NMDA receptors triggers intracellular kinases like CaMKII and PKC.",
          difficulty: "easy"
        },
        {
          id: "q2",
          question: "True or False: At resting membrane potential (-70mV), NMDA receptor pores are physically blocked by magnesium ions (Mg2+).",
          type: "true_false",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "Magnesium blocks NMDA channels at resting potential and requires depolarization to be driven out.",
          difficulty: "easy"
        },
        {
          id: "q3",
          question: "Explain why Late-Phase LTP differs from Early-Phase LTP regarding protein synthesis.",
          type: "short_answer",
          correctAnswer: "Late-phase LTP requires gene transcription regulated by CREB and new protein synthesis to structurally alter dendritic spines for long-term storage.",
          explanation: "Early-phase LTP relies on existing proteins, whereas late-phase requires nuclear gene expression.",
          difficulty: "hard"
        },
        {
          id: "q4",
          question: "Low sustained levels of calcium influx activate protein phosphatases such as _____, inducing Long-Term Depression (LTD).",
          type: "fill_blank",
          correctAnswer: "calcineurin",
          explanation: "Calcineurin (PP2B) dephosphorylates target proteins, causing AMPA receptor endocytosis.",
          difficulty: "medium"
        }
      ],
      flashcards: [
        {
          id: "f1",
          front: "What blocks the NMDA receptor channel pore at resting membrane potential?",
          back: "Magnesium ion (Mg2+)",
          question: "What blocks the NMDA receptor channel pore at resting membrane potential?",
          answer: "Magnesium ion (Mg2+)",
          topic: "Receptor Biology",
          difficulty: "easy",
          isBookmarked: true
        },
        {
          id: "f2",
          front: "Which protein kinase maintains autonomous activity via Thr286 autophosphorylation during LTP?",
          back: "CaMKII (Calcium/calmodulin-dependent protein kinase II)",
          question: "Which protein kinase maintains autonomous activity via Thr286 autophosphorylation during LTP?",
          answer: "CaMKII (Calcium/calmodulin-dependent protein kinase II)",
          topic: "Molecular Cascades",
          difficulty: "hard"
        },
        {
          id: "f3",
          front: "What nuclear transcription factor is required for Late-Phase LTP and structural memory consolidation?",
          back: "CREB (cAMP response element-binding protein)",
          question: "What nuclear transcription factor is required for Late-Phase LTP and structural memory consolidation?",
          answer: "CREB (cAMP response element-binding protein)",
          topic: "Gene Expression",
          difficulty: "medium"
        }
      ],
      revisionPlan: {
        oneDay: "Review NMDA vs AMPA unblocking diagram and active recall 3 key enzymes (CaMKII, PKC, Calcineurin).",
        threeDay: "Complete Quiz Center module on Synaptic Transmission and write out the early vs late LTP cascade.",
        sevenDay: "Diagram NMDA receptor kinetics from memory and explain LTD calcineurin pathway.",
        examNightSummary: "1. NMDA requires Glutamate + Depolarization. 2. Ca2+ influx activates CaMKII for LTP. 3. Calcineurin causes LTD. 4. CREB needed for late LTP."
      },
      conceptMap: {
        nodes: [
          { id: "n1", label: "Synaptic Plasticity", category: "Core Concept" },
          { id: "n2", label: "Long-Term Potentiation (LTP)", category: "Strengthening" },
          { id: "n3", label: "Long-Term Depression (LTD)", category: "Weakening" },
          { id: "n4", label: "NMDA & AMPA Receptors", category: "Glutamate Receptors" },
          { id: "n5", label: "Ca2+ Influx & CaMKII", category: "Signaling Cascade" },
          { id: "n6", label: "CREB & Gene Expression", category: "Consolidation" }
        ],
        edges: [
          { from: "n1", to: "n2", relation: "manifests as" },
          { from: "n1", to: "n3", relation: "manifests as" },
          { from: "n2", to: "n4", relation: "driven by" },
          { from: "n4", to: "n5", relation: "triggers" },
          { from: "n5", to: "n6", relation: "activates" }
        ]
      }
    }
  },
  {
    id: "note-2",
    title: "Graph Algorithms: Dijkstra, A* Search & Dynamic Programming",
    subject: "Computer Science",
    fileType: "docx",
    createdAt: "2026-07-21T10:00:00Z",
    lastStudiedAt: "2026-07-22T08:00:00Z",
    progressPercent: 75,
    rawText: `Graph theory algorithms solve connectivity, shortest-path, and flow problems. Dijkstra's Algorithm finds the shortest path from a single source node to all other nodes in a weighted graph with non-negative edge weights. It employs a Priority Queue (min-heap) to greedily select the unvisited vertex with the minimal tentative distance. Time complexity with a binary min-heap is O((V + E) log V).

A* Search Algorithm extends Dijkstra by introducing a heuristic function h(n) that estimates the cost from current node n to the target. Evaluation function f(n) = g(n) + h(n), where g(n) is exact cost from start to n. If h(n) is admissible (never overestimates remaining cost) and consistent (monotonic), A* is guaranteed to find the optimal path while exploring significantly fewer nodes.

Dynamic Programming (DP) solves complex optimization problems by breaking them into overlapping subproblems and optimal substructure. Bellman-Ford algorithm uses DP to handle graphs with negative edge weights in O(V · E) time by relaxing all edges V-1 times. Floyd-Warshall computes all-pairs shortest paths in O(V^3) using DP adjacency matrices.`,
    materials: {
      executiveSummary: {
        mainIdea: "Dijkstra, A* Search, and Dynamic Programming provide algorithmic solutions for graph traversal, shortest path calculation, and optimization under varying constraints.",
        overview: "Dijkstra uses greedy min-heap relaxation for non-negative graphs. A* incorporates admissible heuristics for guided pathfinding. DP approaches like Bellman-Ford and Floyd-Warshall handle negative edges and all-pairs shortest path matrices.",
        keyTopics: [
          "Dijkstra Min-Heap Implementation O((V+E) log V)",
          "A* Heuristic Admissibility f(n) = g(n) + h(n)",
          "Bellman-Ford Edge Relaxation & Negative Cycles",
          "Floyd-Warshall All-Pairs DP Matrix O(V^3)"
        ]
      },
      keyConcepts: [
        {
          id: "c10",
          title: "Dijkstra's Shortest Path",
          definition: "A greedy graph search algorithm that finds the shortest path from a starting node to all other nodes in a graph with non-negative edge weights.",
          example: "Navigating road networks where edge weights represent distance or travel duration.",
          formula: "Time: O((V + E) log V) with Min-Heap",
          difficulty: "medium"
        },
        {
          id: "c11",
          title: "Admissible Heuristic in A*",
          definition: "A heuristic function h(n) that never overestimates the actual minimal cost to reach the goal node from n.",
          example: "Euclidean distance or Manhattan distance on a 2D grid map.",
          formula: "h(n) ≤ h*(n)",
          difficulty: "hard"
        }
      ],
      bulletNotes: [
        {
          category: "Algorithm Comparison Matrix",
          items: [
            "Dijkstra: Single-source, non-negative weights only, Min-Heap O((V+E)log V).",
            "A*: Single-pair guided search, requires admissible h(n), optimal and fast.",
            "Bellman-Ford: Handles negative weights, detects negative cycles, O(V·E).",
            "Floyd-Warshall: All-pairs shortest path DP, 3 nested loops O(V^3)."
          ]
        }
      ],
      studyGuide: [
        {
          chapter: "Shortest Path Fundamentals",
          topics: ["Priority Queues", "Relaxation Step", "Graph Representations (Adjacency List)"],
          examTips: ["Remember Dijkstra fails with negative edge weights! Use Bellman-Ford instead."]
        }
      ],
      quizzes: [
        {
          id: "q10",
          question: "What is the time complexity of Dijkstra's algorithm implemented with a binary min-heap?",
          type: "mcq",
          options: ["O(V^2)", "O((V + E) log V)", "O(V · E)", "O(V^3)"],
          correctAnswer: "O((V + E) log V)",
          explanation: "Extract-min takes log V and each edge relaxation updates the heap in log V time.",
          difficulty: "easy"
        }
      ],
      flashcards: [
        {
          id: "f10",
          front: "What formula governs node evaluation in A* Search?",
          back: "f(n) = g(n) + h(n), where g(n) is path cost from start and h(n) is heuristic estimate to goal.",
          question: "What formula governs node evaluation in A* Search?",
          answer: "f(n) = g(n) + h(n), where g(n) is path cost from start and h(n) is heuristic estimate to goal.",
          topic: "AI Pathfinding",
          difficulty: "easy"
        }
      ],
      revisionPlan: {
        oneDay: "Review Dijkstra pseudocode and Min-Heap operations.",
        threeDay: "Practice A* trace on a 5x5 grid with Manhattan distance.",
        sevenDay: "Implement Bellman-Ford negative cycle detector.",
        examNightSummary: "Dijkstra: no negative edges. A*: f=g+h admissible. Bellman-Ford: O(VE) handles negative edges. Floyd-Warshall: O(V^3) all pairs."
      },
      conceptMap: {
        nodes: [
          { id: "n10", label: "Graph Algorithms", category: "Theory" },
          { id: "n11", label: "Dijkstra's Algorithm", category: "Greedy" },
          { id: "n12", label: "A* Search", category: "Heuristic AI" },
          { id: "n13", label: "Bellman-Ford & DP", category: "Dynamic Programming" }
        ],
        edges: [
          { from: "n10", to: "n11", relation: "includes" },
          { from: "n11", to: "n12", relation: "extended into" },
          { from: "n10", to: "n13", relation: "includes" }
        ]
      }
    }
  }
];

export const initialStudyPlan: StudyPlan = {
  examDate: "2026-08-10",
  weeklyGoals: [
    "Complete deep-dive review on Neurobiology synaptic transmission and receptor dynamics.",
    "Solve 50 graph algorithm practice problems and achieve 90%+ in Quiz Center.",
    "Maintain a 14-day study streak with daily flashcard spaced repetition."
  ],
  dailySchedule: [
    {
      day: "Today (Wed)",
      focusSubject: "Neurobiology & Memory",
      allocatedHours: 4,
      tasks: [
        "Review NMDA receptor Mg2+ unblocking mechanism",
        "Complete 15 Synaptic Plasticity flashcards",
        "Solve Diagnostic Quiz in Quiz Center"
      ],
      intensity: "high"
    },
    {
      day: "Tomorrow (Thu)",
      focusSubject: "Graph Algorithms",
      allocatedHours: 3.5,
      tasks: [
        "Study A* Search heuristic admissibility proof",
        "Implement Dijkstra min-heap algorithm",
        "Ask AI Doubt Solver on negative edge constraints"
      ],
      intensity: "high"
    },
    {
      day: "Friday",
      focusSubject: "Organic Chemistry / Prep",
      allocatedHours: 3,
      tasks: [
        "Synthesize new uploaded lecture notes",
        "Review 20 bookmarked flashcards",
        "Group study session with Stanford Study Circle"
      ],
      intensity: "medium"
    }
  ],
  examCountdownStrategy: "For final 48 hours: 1. Review 1-page Exam Night summaries only. 2. Practice active recall on bookmarked flashcards. 3. Avoid learning brand-new topics."
};

export const initialStudyGroups: StudyGroup[] = [
  {
    id: "group-1",
    name: "Stanford BioEng & Neuro Scholars",
    description: "Collaborative study group focusing on cellular neuroscience, MCAT bio, and neural engineering.",
    subject: "Neurobiology",
    code: "STANFORD-NEURO-2026",
    inviteCode: "STANFORD-NEURO-2026",
    membersCount: 3,
    sharedNotesCount: 14,
    chatMessages: [
      { id: "cm1", sender: "Elena Rostova", text: "The AI summary on NMDA receptor voltage dependence was super helpful for today's lab quiz!", timestamp: "2 hours ago" },
      { id: "cm2", sender: "Alex Rivera", text: "I've uploaded the new graph algorithms notes. Feel free to try the generated practice quiz!", timestamp: "1 hour ago" }
    ],
    sharedNoteCount: 14,
    members: [
      { id: "m1", name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", role: "admin", streakDays: 12 },
      { id: "m2", name: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", role: "member", streakDays: 18 },
      { id: "m3", name: "Marcus Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", role: "member", streakDays: 9 }
    ]
  }
];

export const initialNotifications: AppNotification[] = [
  {
    id: "notif-1",
    title: "12-Day Study Streak Active! 🔥",
    message: "Keep up the momentum! Complete 10 flashcards today to extend your streak.",
    type: "streak",
    timestamp: "10 mins ago",
    isRead: false
  },
  {
    id: "notif-2",
    title: "Upcoming Revision Alert 📅",
    message: "Scheduled 3-Day revision for 'Neuroscience: Synaptic Plasticity'.",
    type: "revision",
    timestamp: "1 hour ago",
    isRead: false
  },
  {
    id: "notif-3",
    title: "Quiz Challenge Ready 🧠",
    message: "AI generated 4 new practice questions based on your recent notes.",
    type: "quiz",
    timestamp: "3 hours ago",
    isRead: true
  }
];

export const initialBadges = [
  {
    id: "b1",
    title: "10-Day Streak Titan",
    description: "Maintained a continuous daily study streak for 10 consecutive days.",
    icon: "🔥",
    unlocked: true,
    unlockedAt: "3 days ago",
    category: "streak" as const
  },
  {
    id: "b2",
    title: "Quiz Grandmaster",
    description: "Achieved over 90% score across 10 practice quizzes.",
    icon: "🏆",
    unlocked: true,
    unlockedAt: "Yesterday",
    category: "quiz" as const
  },
  {
    id: "b3",
    title: "Synapse Architect",
    description: "Generated and mastered 50+ AI Flashcards in Active Recall mode.",
    icon: "🧠",
    unlocked: true,
    unlockedAt: "5 days ago",
    category: "mastery" as const
  },
  {
    id: "b4",
    title: "Deep Focus Monk",
    description: "Completed 20 Pomodoro focus sessions with zero distractions.",
    icon: "⚡",
    unlocked: true,
    unlockedAt: "Today",
    category: "focus" as const
  },
  {
    id: "b5",
    title: "Exam Night Conqueror",
    description: "Generated 5 Exam Night 1-Page Cheat Sheets before final exams.",
    icon: "📜",
    unlocked: false,
    category: "mastery" as const
  },
  {
    id: "b6",
    title: "Study Group Captain",
    description: "Created and hosted a live group study session with 3+ peers.",
    icon: "👑",
    unlocked: false,
    category: "streak" as const
  }
];

export const initialSubjectMasteries = [
  {
    subject: "Neurobiology",
    totalNotes: 4,
    averageQuizScore: 94,
    masteryPercent: 88,
    color: "#6366f1"
  },
  {
    subject: "Computer Science",
    totalNotes: 2,
    averageQuizScore: 89,
    masteryPercent: 82,
    color: "#06b6d4"
  },
  {
    subject: "Organic Chemistry",
    totalNotes: 1,
    averageQuizScore: 78,
    masteryPercent: 74,
    color: "#ec4899"
  },
  {
    subject: "Economics & Finance",
    totalNotes: 1,
    averageQuizScore: 85,
    masteryPercent: 79,
    color: "#10b981"
  }
];

export const initialDailyStudyLogs = [
  { day: "Mon", date: "2026-07-16", studyMinutes: 180, quizzesTaken: 2, flashcardsMastered: 15 },
  { day: "Tue", date: "2026-07-17", studyMinutes: 240, quizzesTaken: 3, flashcardsMastered: 22 },
  { day: "Wed", date: "2026-07-18", studyMinutes: 150, quizzesTaken: 1, flashcardsMastered: 10 },
  { day: "Thu", date: "2026-07-19", studyMinutes: 270, quizzesTaken: 4, flashcardsMastered: 28 },
  { day: "Fri", date: "2026-07-20", studyMinutes: 210, quizzesTaken: 2, flashcardsMastered: 18 },
  { day: "Sat", date: "2026-07-21", studyMinutes: 300, quizzesTaken: 5, flashcardsMastered: 35 },
  { day: "Sun", date: "2026-07-22", studyMinutes: 225, quizzesTaken: 3, flashcardsMastered: 20 }
];

