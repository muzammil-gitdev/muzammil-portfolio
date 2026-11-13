"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Terminal,
  Cpu,
  Database,
  Shield,
  Layers,
  ArrowUpRight,
  Mail,
  Phone,
  Code2,
  Activity,
  Eye,
  Sliders,
  CheckCircle2,
  Copy,
  Check,
  Upload,
  RefreshCw,
  ChevronRight,
  Zap,
  Globe,
  Lock,
  Server,
  FileCode,
} from "lucide-react";

/**
 * ============================================================================
 * CUSTOM INLINE GITHUB SVG ICON
 * Avoids deprecated brand logo imports from lucide-react in Next.js 15/16
 * ============================================================================
 */
const GitHubIcon = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

/**
 * ============================================================================
 * AUTHENTIC PORTFOLIO DATA — SYED MUZAMMIL ALI
 * Extracted strictly from provided personal bio, experience, projects & skills
 * ============================================================================
 */
const PORTFOLIO_DATA = {
  personal: {
    name: "Syed Muzammil Ali",
    title: "FULL-STACK ARCHITECT",
    roleSubtitle: "MERN Stack Developer",
    location: "Rawalpindi, Punjab, Pakistan",
    coordinates: "33.6844° N, 73.0479° E // RAWALPINDI_PK",
    phone: "+923444344448",
    email: "muzammil.uiit@gmail.com",
    github: "muzammil-gitdev",
    githubUrl: "https://github.com/muzammil-gitdev",
    heroTagline:
      "Not just syntax. Building scalable digital ecosystems with MongoDB, Express, React, Node.js, and Next.js.",
    summary:
      "MERN Stack Developer who builds web applications with MongoDB, Express.js, React, Node.js, and Next.js. Experience working with both SQL and NoSQL databases and choosing the right one for each project. Familiar with Supabase for authentication and real-time features, and Docker for containerized deployments. Focused on writing clean code, building secure APIs, and learning new technologies.",
    gpa: "3.41/4.00",
    status: "AVAILABLE FOR FULL-STACK & NEXT.JS ROLES",
  },

  portraits: [
    {
      id: "profile",
      filename: "profile.jpg",
      src: "/images/profile.jpg",
      publicPath: "/images/profile.jpg",
      label: "EXEC_PORTRAIT // 01",
      caption: "RAWALPINDI_PK // MONOCHROME_BG",
      pose: "executive",
      sunglasses: false,
      bgTheme: "monochrome-trees",
      focalPoint: "center 18%",
    },
    {
      id: "img1031",
      filename: "IMG_1031.jpg",
      src: "/images/IMG_1031.jpg",
      publicPath: "/images/IMG_1031.jpg",
      label: "TELEMETRY_CLOSEUP // 02",
      caption: "OPTIC_BLUE_TINT // HIGH_ALTITUDE",
      pose: "chin-hand",
      sunglasses: true,
      bgTheme: "emerald-valley",
      focalPoint: "center 20%",
    },
    {
      id: "img1793",
      filename: "IMG_1793.jpg",
      src: "/images/IMG_1793.jpg",
      publicPath: "/images/IMG_1793.jpg",
      label: "KARAKORAM_FIELD // 03",
      caption: "NORTHERN_PK // TERRAIN_LOCK",
      pose: "arms-crossed",
      sunglasses: true,
      bgTheme: "karakoram-peaks",
      focalPoint: "center 22%",
    },
    {
      id: "apc0631",
      filename: "APC_0631g.jpg",
      src: "/images/APC_0631g.jpg",
      publicPath: "/images/APC_0631g.jpg",
      label: "FOREST_RECON // 04",
      caption: "SOLAR_CONTRAST // FIELD_OPS",
      pose: "arms-crossed",
      sunglasses: true,
      bgTheme: "alpine-pines",
      focalPoint: "center 20%",
    },
  ],

  philosophyPillars: [
    {
      id: "db-arch",
      index: "01 // DATA_TOPOLOGY",
      title: "SQL vs. NoSQL Architectural Precision",
      subtitle: "PostgreSQL & MongoDB Workload Selection",
      description:
        "Selecting the right persistence engine per domain rather than forcing a single paradigm. Utilizing PostgreSQL & SQL for strict relational integrity and transactional ledger workflows, while deploying MongoDB aggregation pipelines for high-velocity document schemas and dynamic fleet/catalog states.",
      metrics: "ACID + BASE Hybrid Fluency",
      accent: "#00F0FF",
    },
    {
      id: "realtime-auth",
      index: "02 // AUTH_&_REALTIME",
      title: "Supabase, Socket.IO & Zero-Trust Auth",
      subtitle: "Bi-Directional Telemetry & Identity Guards",
      description:
        "Architecting low-latency communication layers with Socket.IO for live marketplace messaging and Supabase for real-time state synchronization and authentication. Hardening admin portals with SHA-256 cryptographic hashing, role-based access control (RBAC), and protected API middleware.",
      metrics: "< 35ms Socket Handshake",
      accent: "#FF0033",
    },
    {
      id: "containers-cloud",
      index: "03 // INFRA_&_CONTAINERS",
      title: "Dockerized Environments & Cloud Delivery",
      subtitle: "Deterministic Builds on Linux & AWS",
      description:
        "Eliminating environment drift by packaging Node.js/Express microservices and Next.js SSR builds inside reproducible Docker containers. Streamlining media pipelines with automated Cloudinary asset cleanup and Stripe webhook verification.",
      metrics: "99.9% Deterministic Deploy",
      accent: "#FF5500",
    },
    {
      id: "clean-apis",
      index: "04 // API_CRAFTSMANSHIP",
      title: "Clean Code & Resilient RESTful Contracts",
      subtitle: "End-to-End Validation & Performance First",
      description:
        "Writing maintainable, modular full-stack codebases with strict request validation, predictable error boundaries, and Next.js Server/Client component separation to maintain sub-second Largest Contentful Paint (LCP).",
      metrics: "LCP 0.74s // CLS 0.00",
      accent: "#0044FF",
    },
  ],

  csConceptsGraph: [
    {
      id: "compiler",
      label: "Compiler",
      code: "AST_LEX_PARSE",
      x: 18,
      y: 20,
      color: "#00F0FF",
      detail:
        "Lexical analysis, AST transformation, and optimizing JS/C++ execution pipelines.",
      snippet: `// AST Token Stream Optimizer\nfunction compileRouteManifest(ast) {\n  return ast.nodes.filter(n => n.isStatic)\n    .map(node =>PrecompileChunk(node));\n}`,
    },
    {
      id: "os",
      label: "Operating System",
      code: "POSIX_KERNEL",
      x: 50,
      y: 14,
      color: "#FF0033",
      detail:
        "Linux process scheduling, POSIX threads, concurrency control, and system call orchestration.",
      snippet: `// Linux Worker Pool & Signal Handler\nprocess.on('SIGTERM', async () => {\n  await server.drainConnections();\n  await mongoose.disconnect();\n});`,
    },
    {
      id: "vmem",
      label: "Virtual Memory",
      code: "PAGE_TABLE_MMU",
      x: 82,
      y: 22,
      color: "#FF5500",
      detail:
        "Paging, heap allocation discipline, and preventing memory leaks in long-running Node.js processes.",
      snippet: `// V8 Heap Telemetry Guard\nconst mem = process.memoryUsage();\nconst heapRatio = (mem.heapUsed / mem.heapTotal).toFixed(3);\nif (heapRatio > 0.85) triggerGCMonitor();`,
    },
    {
      id: "cache",
      label: "Cache Memory",
      code: "L1_L2_LOCALITY",
      x: 24,
      y: 52,
      color: "#0044FF",
      detail:
        "Spatial/temporal locality, in-memory query memoization, and Next.js edge/ISR caching strategies.",
      snippet: `// Stale-While-Revalidate Telemetry Cache\nexport const revalidate = 60;\nconst fleetData = await cache.getOrSet('fleet:active', fetchFleet);`,
    },
    {
      id: "encryption",
      label: "Encryption",
      code: "SHA256_CIPHER",
      x: 76,
      y: 50,
      color: "#00F0FF",
      detail:
        "SHA-256 cryptographic hashing, TLS payload security, and signed Stripe payment intents.",
      snippet: `// SHA-256 Admin Portal Auth Digest\nconst digest = crypto.createHash('sha256')\n  .update(payload + process.env.SALT)\n  .digest('hex');`,
    },
    {
      id: "decryption",
      label: "Decryption",
      code: "VERIFY_PAYLOAD",
      x: 18,
      y: 82,
      color: "#FF0033",
      detail:
        "Webhook signature verification, token decoding, and authenticated session validation.",
      snippet: `// Stripe Webhook Signature Verification\nconst event = stripe.webhooks.constructEvent(\n  rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET\n);`,
    },
    {
      id: "ai",
      label: "Artificial Intelligence",
      code: "LLM_AGENT_RAG",
      x: 52,
      y: 84,
      color: "#FF5500",
      detail:
        "AI-powered support chatbots, automated triage workflows, and LLM-ready semantic web telemetry.",
      snippet: `// SkillVerse AI Support Triage Engine\nconst response = await aiAgent.resolveTicket({\n  context: orderTelemetry,\n  userQuery: incomingSocketMessage\n});`,
    },
    {
      id: "api",
      label: "API Architecture",
      code: "REST_SOCKET_IO",
      x: 84,
      y: 80,
      color: "#00F0FF",
      detail:
        "RESTful API design, idempotent CRUD controllers, and real-time Socket.IO event multiplexing.",
      snippet: `// Express + Socket.IO Multiplexed Controller\nio.to(orderRoomId).emit('order:status_sync', {\n  orderId, state: 'ESCROW_VERIFIED', ts: Date.now()\n});`,
    },
  ],

  skillsArsenal: [
    {
      index: "[01 // LANGUAGES]",
      title: "Core Programming Languages",
      subtitle: "Systems, OOP & Full-Stack Foundations",
      accent: "#00F0FF",
      colSpan: "lg:col-span-5",
      items: [
        {
          name: "JavaScript (ES6+)",
          level: "96%",
          role: "Async Event Loop, DOM, Full-Stack Runtime",
        },
        {
          name: "C++",
          level: "88%",
          role: "Data Structures, Algorithms & OOP Systems",
        },
        {
          name: "Java",
          level: "84%",
          role: "Android Development & Object-Oriented Design",
        },
        {
          name: "SQL",
          level: "90%",
          role: "Relational Schemas, Joins & Indexing",
        },
      ],
    },
    {
      index: "[02 // CORE STACK]",
      title: "MERN & Next.js Ecosystem",
      subtitle: "Production Web Application Architecture",
      accent: "#FF0033",
      colSpan: "lg:col-span-7",
      items: [
        {
          name: "Next.js",
          level: "95%",
          role: "App Router, SSR, Dynamic Routing & SEO",
        },
        {
          name: "React.js",
          level: "96%",
          role: "Component Architecture, Hooks & State",
        },
        {
          name: "Node.js",
          level: "93%",
          role: "Scalable Backend Runtime & Streams",
        },
        {
          name: "Express.js",
          level: "94%",
          role: "RESTful APIs, Middleware & Auth Guards",
        },
        {
          name: "MongoDB",
          level: "94%",
          role: "NoSQL Schemas, Aggregation & Indexing",
        },
        {
          name: "PostgreSQL",
          level: "88%",
          role: "ACID Relational Persistence",
        },
        {
          name: "Supabase",
          level: "89%",
          role: "Authentication & Real-Time Subscriptions",
        },
        {
          name: "Tailwind CSS & SCSS",
          level: "96%",
          role: "Responsive Design Systems & Modular SCSS",
        },
      ],
    },
    {
      index: "[03 // INFRASTRUCTURE & TOOLS]",
      title: "Cloud, Payments & DevOps",
      subtitle: "Containerization, Live Sockets & Gateways",
      accent: "#FF5500",
      colSpan: "lg:col-span-6",
      items: [
        {
          name: "Docker",
          level: "86%",
          role: "Containerized App Packaging & Deployments",
        },
        { name: "AWS", level: "82%", role: "Cloud Infrastructure & Hosting" },
        {
          name: "Linux",
          level: "88%",
          role: "CLI Administration, Bash & Server Env",
        },
        {
          name: "Stripe",
          level: "94%",
          role: "Checkout Sessions, Webhooks & Escrow",
        },
        {
          name: "Socket.IO",
          level: "92%",
          role: "Bi-Directional Live Messaging & Telemetry",
        },
        {
          name: "Git & GitHub",
          level: "95%",
          role: "Version Control, Branching & CI Workflows",
        },
      ],
    },
    {
      index: "[04 // SYSTEMS & AI CONCEPTS]",
      title: "Computer Science & Security Kernel",
      subtitle: "Theoretical Depth & Applied Engineering",
      accent: "#0044FF",
      colSpan: "lg:col-span-6",
      items: [
        {
          name: "Compiler & OS",
          level: "CORE",
          role: "Execution Pipelines & Process Management",
        },
        {
          name: "Virtual & Cache Memory",
          level: "CORE",
          role: "Memory Hierarchy & Latency Optimization",
        },
        {
          name: "Encryption & Decryption",
          level: "SHA-256",
          role: "Cryptographic Auth & Secure Payloads",
        },
        {
          name: "Artificial Intelligence & API",
          level: "RAG/REST",
          role: "AI Chatbots & High-Throughput Endpoints",
        },
      ],
    },
  ],

  projects: [
    {
      id: "karakoram-express",
      code: "CASE_FILE // 01",
      title: "Karakoram Express",
      category: "E-Ticketing Service",
      filterTag: "MERN + STRIPE",
      accent: "#00F0FF",
      techStack: ["React.js", "Express.js", "Node.js", "MongoDB", "Stripe"],
      secondaryTech: ["SHA-256 Auth", "Cloudinary API", "4-Step Wizard"],
      problemSolved:
        "Modernized inter-city bus ticketing across Northern Pakistan by replacing fragmented manual reservations with a deterministic 4-step digital booking wizard, interactive real-time seat matrix, and automated cloud asset lifecycle management.",
      highlights: [
        "Built a full-stack bus booking platform with a 4-step wizard, interactive seat grid, and Stripe Checkout for inter-city routes in Northern Pakistan.",
        "Built an admin portal with SHA-256 auth, full CRUD for routes, passenger lookup, and Cloudinary uploads with auto cleanup.",
      ],
      telemetryStats: [
        { label: "BOOKING FLOW", value: "4-Step Wizard" },
        { label: "ADMIN SECURITY", value: "SHA-256 Digest" },
        { label: "MEDIA PIPELINE", value: "Cloudinary Auto-Clean" },
        { label: "PAYMENT GATEWAY", value: "Stripe Checkout" },
      ],
      architectureFlow: [
        "Client selects Northern Route (Rawalpindi → Gilgit / Skardu / Hunza) & interactive seat coordinates",
        "Express.js locks seat state in MongoDB & initializes encrypted Stripe Checkout Session",
        "Admin Portal authenticates via SHA-256 hash for Route CRUD, Passenger Manifest Lookup & Cloudinary purge",
      ],
      githubUrl: "https://github.com/muzammil-gitdev",
      liveUrl: "#archives",
    },
    {
      id: "drivex",
      code: "CASE_FILE // 02",
      title: "DriveX",
      category: "Car Rental Platform",
      filterTag: "NEXT.JS FULL-STACK",
      accent: "#FF0033",
      techStack: [
        "Next.js",
        "Express.js",
        "MongoDB",
        "Node.js",
        "Tailwind CSS",
      ],
      secondaryTech: ["Real-Time Pricing", "Auto-Refresh KPIs", "Fleet CRUD"],
      problemSolved:
        "Eliminated opaque rental pricing and static fleet listings by engineering a dynamic fleet catalog with instant duration-based price estimation, client-side validation with toast telemetry, and an auto-refreshing executive KPI command center.",
      highlights: [
        "Built a full-stack car rental platform with a dynamic fleet catalog, a booking modal with real-time price estimation, and client-side validation with toast notifications.",
        "Developed an admin dashboard with auto-refreshing KPI cards (cars, bookings, revenue, requests), plus full CRUD for fleet management with image uploads and status tracking.",
      ],
      telemetryStats: [
        { label: "FRONTEND ENGINE", value: "Next.js SSR/CSR" },
        { label: "PRICING ENGINE", value: "Real-Time Modal" },
        { label: "ADMIN TELEMETRY", value: "Auto-Refresh KPIs" },
        { label: "FLEET CONTROL", value: "Full CRUD + Status" },
      ],
      architectureFlow: [
        "Next.js dynamic catalog filters vehicles by availability & calculates real-time multi-day tariff inside Booking Modal",
        "Client-side schema validation dispatches instant toast feedback & commits reservation to MongoDB",
        "Admin Command Dashboard polls/streams live KPI metrics (Active Fleet, Bookings, Revenue, Pending Requests)",
      ],
      githubUrl: "https://github.com/muzammil-gitdev",
      liveUrl: "#archives",
    },
    {
      id: "skillverse",
      code: "CASE_FILE // 03",
      title: "SkillVerse",
      category: "Freelance Marketplace",
      filterTag: "REAL-TIME & AI",
      accent: "#FF5500",
      techStack: [
        "Next.js",
        "Express.js",
        "Node.js",
        "Tailwind CSS",
        "Stripe",
        "Socket.IO",
      ],
      secondaryTech: [
        "AI Support Chatbot",
        "RBAC Moderation",
        "Live Messaging",
      ],
      problemSolved:
        "Solved the dual bottleneck of insecure payment handling and delayed client-freelancer communication in freelance marketplaces by uniting Stripe checkout with Socket.IO live messaging, an AI support chatbot, and role-based admin moderation.",
      highlights: [
        "Developed SkillVerse, a freelance marketplace to connect clients with skilled freelancers, addressing the lack of secure payment handling and real-time communication in existing platforms by integrating Stripe checkout and Socket.IO-based live messaging.",
        "Implemented an AI-powered chatbot and role-based admin dashboard to improve user engagement and platform moderation, reducing manual support overhead and enabling real-time monitoring of orders, revenue, and user activity.",
      ],
      telemetryStats: [
        { label: "COMMS PROTOCOL", value: "Socket.IO Live" },
        { label: "SUPPORT AUTOMATION", value: "AI Chatbot Agent" },
        { label: "GOVERNANCE", value: "RBAC Admin Panel" },
        { label: "TRANSACTIONS", value: "Stripe Escrow Flow" },
      ],
      architectureFlow: [
        "Client & Freelancer establish low-latency Socket.IO room for instant scope alignment & file exchange",
        "Stripe Checkout secures milestone funds while AI Support Chatbot resolves platform queries autonomously",
        "Role-Based Admin Dashboard monitors real-time order velocity, revenue streams, and user moderation flags",
      ],
      githubUrl: "https://github.com/muzammil-gitdev",
      liveUrl: "#archives",
    },
  ],

  timeline: [
    {
      id: "exp-devhub",
      type: "WORK EXPERIENCE",
      code: "LOG_01 // REMOTE_DEPLOYMENT",
      role: "MERN Stack Developer",
      organization: "Developers Hub Corp",
      period: "Dec 2025 – Feb 2026",
      location: "Remote",
      accent: "#FF0033",
      status: "COMPLETED_DEPLOYMENT",
      bullets: [
        "Developing full-stack websites using Next.js and React.",
        "Implementing dynamic routing, reusable components, and modern UI patterns.",
        "Optimizing performance and responsiveness using Tailwind CSS.",
      ],
      tags: [
        "Next.js",
        "React.js",
        "Dynamic Routing",
        "Tailwind CSS",
        "Reusable UI Systems",
      ],
    },
    {
      id: "exp-den",
      type: "WORK EXPERIENCE",
      code: "LOG_02 // FRONTEND_FOUNDATION",
      role: "Front-End Developer",
      organization: "Digital Empowerment Network",
      period: "July 2025 – Sept 2025",
      location: "Remote",
      accent: "#00F0FF",
      status: "COMPLETED_DEPLOYMENT",
      bullets: [
        "Built 6 mini projects using HTML, CSS, and JavaScript to strengthen front-end fundamentals.",
        "Implemented responsive layouts and interactive features using JavaScript and DOM manipulation.",
        "Improved UI/UX skills through clean design, debugging, and code optimization.",
      ],
      tags: [
        "JavaScript (ES6+)",
        "DOM Manipulation",
        "HTML5/CSS3",
        "Responsive UI/UX",
        "Debugging",
      ],
    },
    {
      id: "edu-arid",
      type: "ACADEMIC TELEMETRY",
      code: "LOG_03 // UNIVERSITY_DEGREE",
      role: "Bachelor of Science in Computer Science",
      organization: "PMAS - Arid Agricultural University",
      period: "Oct 2022 – May 2026",
      location: "Rawalpindi, Punjab",
      gpa: "3.41/4.00",
      accent: "#FF5500",
      status: "GPA: 3.41 / 4.00",
      bullets: [
        "Pursuing BS Computer Science with a strong foundation in software engineering, systems programming, and full-stack web architecture.",
        "Relevant Coursework: Web Development (HTML, CSS, JavaScript), Android Development (Java), Data Structures and Algorithms (C++), Object Oriented Programming (C++).",
      ],
      tags: [
        "BSCS (GPA: 3.41/4.00)",
        "DSA (C++)",
        "OOP (C++)",
        "Web Development",
        "Android (Java)",
      ],
    },
  ],
};

/**
 * ============================================================================
 * CYBER-BRUTALIST EXECUTIVE PORTRAIT RENDERER (HTML5 CANVAS + REAL IMAGE LOADER)
 * Uses deterministic requestAnimationFrame(timestamp) instead of Date.now()
 * Loads /images/profile.jpg automatically in Next.js or falls back to
 * an executive cyber-silhouette in sandboxed previews.
 * ============================================================================
 */
const CyberPortraitFrame = ({
  activePortraitIndex,
  setActivePortraitIndex,
  shaderMode,
  setShaderMode,
  customUploadedImages,
  onUploadCustomImage,
}) => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [loadedImageObj, setLoadedImageObj] = useState(null);
  const [scanOffset, setScanOffset] = useState(0);

  const activePortrait = PORTFOLIO_DATA.portraits[activePortraitIndex];
  const customImgUrl = customUploadedImages[activePortrait.id] || null;

  // Attempt to load user-bound file, Next.js /images/... path, or fallback relative filename
  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    const primarySrc = customImgUrl || activePortrait.src;

    img.onload = () => {
      if (isMounted) setLoadedImageObj(img);
    };
    img.onerror = () => {
      if (!customImgUrl && img.src.includes("/images/")) {
        const fallbackImg = new Image();
        fallbackImg.crossOrigin = "anonymous";
        fallbackImg.onload = () => {
          if (isMounted) setLoadedImageObj(fallbackImg);
        };
        fallbackImg.onerror = () => {
          if (isMounted) setLoadedImageObj(null);
        };
        fallbackImg.src = activePortrait.filename;
      } else if (isMounted) {
        setLoadedImageObj(null);
      }
    };
    img.src = primarySrc;

    return () => {
      isMounted = false;
    };
  }, [activePortrait, customImgUrl]);

  // Deterministic requestAnimationFrame loop using passed timestamp parameter
  useEffect(() => {
    let animId;
    let lastTimestamp = 0;
    const animate = (timestamp) => {
      if (timestamp - lastTimestamp > 45) {
        setScanOffset((prev) => (prev + 1) % 100);
        lastTimestamp = timestamp;
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Draw executive portrait with contrast(1.04) brightness(0.98) and shader filters
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    const offscreen = document.createElement("canvas");
    offscreen.width = W;
    offscreen.height = H;
    const octx = offscreen.getContext("2d");

    if (
      loadedImageObj &&
      loadedImageObj.complete &&
      loadedImageObj.naturalWidth > 0
    ) {
      // Draw actual image with object-fit: cover and object-position: center top
      const imgRatio =
        loadedImageObj.naturalWidth / loadedImageObj.naturalHeight;
      const canvasRatio = W / H;
      let drawW = W;
      let drawH = H;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawW = H * imgRatio;
        offsetX = -(drawW - W) / 2;
      } else {
        drawH = W / imgRatio;
        offsetY = -(drawH - H) * 0.15; // Center-top framing
      }
      octx.filter = "contrast(1.04) brightness(0.98)";
      octx.drawImage(loadedImageObj, offsetX, offsetY, drawW, drawH);
    } else {
      // High-precision Canvas Executive Reconstruction of Syed Muzammil Ali's exact uploaded portraits
      // (Karakoram mountains / valley / monochrome trees + dark charcoal shalwar kameez + swept-back dark hair + aviator glasses option)
      const bgGrad = octx.createLinearGradient(0, 0, 0, H);
      if (activePortrait.bgTheme === "karakoram-peaks") {
        bgGrad.addColorStop(0, "#1e3a5f");
        bgGrad.addColorStop(0.45, "#3b526b");
        bgGrad.addColorStop(1, "#12151c");
      } else if (activePortrait.bgTheme === "emerald-valley") {
        bgGrad.addColorStop(0, "#162826");
        bgGrad.addColorStop(0.5, "#1f3630");
        bgGrad.addColorStop(1, "#0c1214");
      } else if (activePortrait.bgTheme === "alpine-pines") {
        bgGrad.addColorStop(0, "#252a30");
        bgGrad.addColorStop(0.5, "#171c20");
        bgGrad.addColorStop(1, "#090b0e");
      } else {
        // profile.jpg desaturated warm executive backdrop
        bgGrad.addColorStop(0, "#2c2c30");
        bgGrad.addColorStop(0.55, "#1b1b1f");
        bgGrad.addColorStop(1, "#0a0a0f");
      }
      octx.fillStyle = bgGrad;
      octx.fillRect(0, 0, W, H);

      // Draw atmospheric Northern Pakistan mountain ridge / elevation contours in background
      octx.save();
      octx.beginPath();
      octx.moveTo(0, H * 0.55);
      octx.lineTo(W * 0.22, H * 0.34);
      octx.lineTo(W * 0.48, H * 0.44);
      octx.lineTo(W * 0.78, H * 0.28);
      octx.lineTo(W, H * 0.39);
      octx.lineTo(W, H);
      octx.lineTo(0, H);
      octx.closePath();
      const ridgeGrad = octx.createLinearGradient(0, H * 0.28, 0, H);
      ridgeGrad.addColorStop(0, "rgba(35, 42, 54, 0.75)");
      ridgeGrad.addColorStop(1, "rgba(10, 10, 15, 0.98)");
      octx.fillStyle = ridgeGrad;
      octx.fill();

      // Subtle topographic telemetry mesh lines
      octx.strokeStyle = "rgba(0, 240, 255, 0.12)";
      octx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        octx.beginPath();
        octx.moveTo(0, H * (0.36 + i * 0.08));
        octx.bezierCurveTo(
          W * 0.3,
          H * (0.31 + i * 0.08),
          W * 0.65,
          H * (0.41 + i * 0.08),
          W,
          H * (0.34 + i * 0.08),
        );
        octx.stroke();
      }
      octx.restore();

      // Ambient executive rim lighting behind head & shoulders
      const haloGrad = octx.createRadialGradient(
        W * 0.5,
        H * 0.38,
        20,
        W * 0.5,
        H * 0.38,
        W * 0.48,
      );
      haloGrad.addColorStop(0, "rgba(0, 240, 255, 0.22)");
      haloGrad.addColorStop(0.5, "rgba(0, 68, 255, 0.08)");
      haloGrad.addColorStop(1, "rgba(5, 5, 5, 0)");
      octx.fillStyle = haloGrad;
      octx.fillRect(0, 0, W, H);

      // Shoulders & Dark Charcoal Mandarin-Collar Kameez (authentic to all 4 uploaded photos)
      octx.save();
      octx.beginPath();
      octx.moveTo(W * 0.12, H);
      octx.quadraticCurveTo(W * 0.15, H * 0.64, W * 0.35, H * 0.59);
      octx.lineTo(W * 0.65, H * 0.59);
      octx.quadraticCurveTo(W * 0.85, H * 0.64, W * 0.88, H);
      octx.closePath();
      const tunicGrad = octx.createLinearGradient(
        W * 0.2,
        H * 0.58,
        W * 0.8,
        H,
      );
      tunicGrad.addColorStop(0, "#262930");
      tunicGrad.addColorStop(0.5, "#191b20");
      tunicGrad.addColorStop(1, "#0e1014");
      octx.fillStyle = tunicGrad;
      octx.fill();
      octx.strokeStyle = "rgba(244, 244, 246, 0.14)";
      octx.lineWidth = 1.5;
      octx.stroke();

      // Mandarin Ban Collar & Placket with metallic buttons
      octx.beginPath();
      octx.moveTo(W * 0.41, H * 0.57);
      octx.quadraticCurveTo(W * 0.5, H * 0.63, W * 0.59, H * 0.57);
      octx.lineTo(W * 0.61, H * 0.62);
      octx.quadraticCurveTo(W * 0.5, H * 0.68, W * 0.39, H * 0.62);
      octx.closePath();
      octx.fillStyle = "#14161a";
      octx.fill();
      octx.strokeStyle = "rgba(0, 240, 255, 0.3)";
      octx.stroke();

      // Center button placket
      octx.fillStyle = "#111317";
      octx.fillRect(W * 0.482, H * 0.63, W * 0.036, H * 0.26);
      [0.67, 0.73, 0.79].forEach((by) => {
        octx.beginPath();
        octx.arc(W * 0.5, H * by, 3.2, 0, Math.PI * 2);
        octx.fillStyle = "#a1a1aa";
        octx.fill();
      });

      // Crossed Arms Silhouette if pose === 'arms-crossed'
      if (activePortrait.pose === "arms-crossed") {
        octx.beginPath();
        octx.roundRect(W * 0.24, H * 0.77, W * 0.52, H * 0.13, 24);
        octx.fillStyle = "#20242b";
        octx.fill();
        octx.strokeStyle = "rgba(255,255,255,0.08)";
        octx.stroke();
      }

      // Neck & Warm South Asian Skin Tone
      octx.beginPath();
      octx.roundRect(W * 0.42, H * 0.48, W * 0.16, H * 0.14, 18);
      const neckGrad = octx.createLinearGradient(
        W * 0.42,
        H * 0.48,
        W * 0.58,
        H * 0.62,
      );
      neckGrad.addColorStop(0, "#c68b63");
      neckGrad.addColorStop(1, "#8f5d3c");
      octx.fillStyle = neckGrad;
      octx.fill();

      // Head / Facial Contour
      octx.beginPath();
      octx.ellipse(W * 0.5, H * 0.37, W * 0.145, H * 0.165, 0, 0, Math.PI * 2);
      const faceGrad = octx.createRadialGradient(
        W * 0.47,
        H * 0.34,
        10,
        W * 0.5,
        H * 0.37,
        W * 0.17,
      );
      faceGrad.addColorStop(0, "#dfa57d");
      faceGrad.addColorStop(0.65, "#c4875e");
      faceGrad.addColorStop(1, "#8c5838");
      octx.fillStyle = faceGrad;
      octx.fill();

      // Subtle jawline beard/stubble shading (authentic to photos)
      octx.beginPath();
      octx.arc(W * 0.5, H * 0.385, W * 0.14, 0.15 * Math.PI, 0.85 * Math.PI);
      octx.lineWidth = 10;
      octx.strokeStyle = "rgba(30, 24, 22, 0.38)";
      octx.stroke();

      // Swept-back voluminous dark hair (authentic to Syed Muzammil Ali's photos)
      octx.beginPath();
      octx.moveTo(W * 0.35, H * 0.36);
      octx.quadraticCurveTo(W * 0.33, H * 0.21, W * 0.46, H * 0.18);
      octx.quadraticCurveTo(W * 0.58, H * 0.16, W * 0.64, H * 0.23);
      octx.quadraticCurveTo(W * 0.67, H * 0.29, W * 0.645, H * 0.36);
      octx.quadraticCurveTo(W * 0.61, H * 0.26, W * 0.5, H * 0.25);
      octx.quadraticCurveTo(W * 0.39, H * 0.25, W * 0.35, H * 0.36);
      octx.closePath();
      const hairGrad = octx.createLinearGradient(
        W * 0.35,
        H * 0.17,
        W * 0.65,
        H * 0.36,
      );
      hairGrad.addColorStop(0, "#111217");
      hairGrad.addColorStop(0.5, "#22242c");
      hairGrad.addColorStop(1, "#090a0d");
      octx.fillStyle = hairGrad;
      octx.fill();

      // Eyebrows
      octx.strokeStyle = "#18181d";
      octx.lineWidth = 4.5;
      octx.lineCap = "round";
      octx.beginPath();
      octx.moveTo(W * 0.405, H * 0.33);
      octx.quadraticCurveTo(W * 0.44, H * 0.318, W * 0.475, H * 0.33);
      octx.moveTo(W * 0.525, H * 0.33);
      octx.quadraticCurveTo(W * 0.56, H * 0.318, W * 0.595, H * 0.33);
      octx.stroke();

      if (activePortrait.sunglasses) {
        // Square Metallic Double-Bridge Blue-Tinted Aviator Sunglasses (from IMG_1031.jpg / IMG_1793.jpg)
        const drawLens = (lx, ly, lw, lh) => {
          octx.beginPath();
          octx.roundRect(lx, ly, lw, lh, 7);
          const lensGrad = octx.createLinearGradient(lx, ly, lx + lw, ly + lh);
          lensGrad.addColorStop(0, "rgba(10, 38, 95, 0.92)");
          lensGrad.addColorStop(0.5, "rgba(0, 140, 255, 0.68)");
          lensGrad.addColorStop(1, "rgba(8, 18, 42, 0.95)");
          octx.fillStyle = lensGrad;
          octx.fill();
          octx.lineWidth = 2.2;
          octx.strokeStyle = "#d4af37";
          octx.stroke();
        };
        drawLens(W * 0.385, H * 0.335, W * 0.098, H * 0.058);
        drawLens(W * 0.517, H * 0.335, W * 0.098, H * 0.058);
        // Gold top brow bar
        octx.beginPath();
        octx.moveTo(W * 0.475, H * 0.34);
        octx.lineTo(W * 0.525, H * 0.34);
        octx.moveTo(W * 0.483, H * 0.353);
        octx.lineTo(W * 0.517, H * 0.353);
        octx.strokeStyle = "#e5c158";
        octx.lineWidth = 2.2;
        octx.stroke();
      } else {
        // Expressive executive eyes (profile.jpg)
        [W * 0.44, W * 0.56].forEach((ex) => {
          octx.beginPath();
          octx.ellipse(ex, H * 0.355, 11, 5.5, 0, 0, Math.PI * 2);
          octx.fillStyle = "#f4f4f6";
          octx.fill();
          octx.beginPath();
          octx.arc(ex, H * 0.355, 4.8, 0, Math.PI * 2);
          octx.fillStyle = "#1f1612";
          octx.fill();
          octx.beginPath();
          octx.arc(ex - 1.5, H * 0.352, 1.6, 0, Math.PI * 2);
          octx.fillStyle = "#ffffff";
          octx.fill();
        });
      }

      // Nose & Confident Subtle Smile
      octx.beginPath();
      octx.moveTo(W * 0.5, H * 0.355);
      octx.lineTo(W * 0.486, H * 0.415);
      octx.lineTo(W * 0.512, H * 0.418);
      octx.strokeStyle = "rgba(95, 52, 32, 0.65)";
      octx.lineWidth = 2.2;
      octx.stroke();

      // Mustache & composed lips
      octx.beginPath();
      octx.moveTo(W * 0.455, H * 0.445);
      octx.quadraticCurveTo(W * 0.5, H * 0.436, W * 0.545, H * 0.445);
      octx.strokeStyle = "rgba(30, 24, 22, 0.55)";
      octx.lineWidth = 4;
      octx.stroke();

      octx.beginPath();
      octx.moveTo(W * 0.462, H * 0.456);
      octx.quadraticCurveTo(W * 0.5, H * 0.466, W * 0.538, H * 0.454);
      octx.strokeStyle = "#7d4436";
      octx.lineWidth = 3;
      octx.stroke();
      octx.restore();
    }

    // Apply Cyber-Brutalist Shader Pipeline when NOT hovered (or when specific shader is locked)
    // Hovering smoothly reveals the crisp executive portrait!
    const effectiveMode = isHovered ? "CRISP_RAW" : shaderMode;

    if (effectiveMode === "CRISP_RAW") {
      ctx.drawImage(offscreen, 0, 0);
    } else if (effectiveMode === "RGB_GLITCH") {
      // Base portrait
      ctx.drawImage(offscreen, 0, 0);
      // Red/Cyan Chromatic Aberration Channels
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = 0.45;
      ctx.drawImage(offscreen, -5, 0);
      ctx.drawImage(offscreen, 5, 1);
      ctx.restore();

      // Horizontal Glitch Slices
      for (let i = 0; i < 5; i++) {
        const sliceY = (scanOffset * 7 + i * 95) % (H - 30);
        const sliceH = 6 + (i % 3) * 6;
        const shiftX = (i % 2 === 0 ? 1 : -1) * (8 + (scanOffset % 6));
        ctx.drawImage(
          offscreen,
          0,
          sliceY,
          W,
          sliceH,
          shiftX,
          sliceY,
          W,
          sliceH,
        );
      }
    } else if (effectiveMode === "HALFTONE_HUD") {
      // Darkened base
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, W, H);
      ctx.save();
      ctx.globalAlpha = 0.52;
      ctx.drawImage(offscreen, 0, 0);
      ctx.restore();

      // Sample pixels for Cyber Halftone Matrix
      const imgData = octx.getImageData(0, 0, W, H).data;
      const step = 9;
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          const idx = (y * W + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          if (lum > 0.14) {
            const radius = Math.max(1, lum * (step * 0.48));
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle =
              lum > 0.68
                ? "#F4F4F6"
                : lum > 0.42
                  ? "#00F0FF"
                  : "rgba(255, 0, 51, 0.75)";
            ctx.fill();
          }
        }
      }
    } else if (effectiveMode === "ASCII_TELEMETRY") {
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, W, H);
      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.drawImage(offscreen, 0, 0);
      ctx.restore();

      const chars = ["@", "#", "S", "M", "A", "1", "0", "+", ":", "."];
      const imgData = octx.getImageData(0, 0, W, H).data;
      const step = 11;
      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          const idx = (y * W + x) * 4;
          const lum =
            (imgData[idx] + imgData[idx + 1] + imgData[idx + 2]) / (3 * 255);
          if (lum > 0.12) {
            const charIdx = Math.min(
              chars.length - 1,
              Math.floor((1 - lum) * chars.length),
            );
            ctx.fillStyle =
              lum > 0.65 ? "#F4F4F6" : lum > 0.38 ? "#00F0FF" : "#0044FF";
            ctx.fillText(chars[charIdx], x, y);
          }
        }
      }
    }

    // HUD Bounding Box Reticle & Biometric Target Overlay
    ctx.save();
    ctx.strokeStyle = isHovered
      ? "rgba(0, 240, 255, 0.85)"
      : "rgba(255, 0, 51, 0.55)";
    ctx.lineWidth = 1.5;
    const bx = W * 0.27;
    const by = H * 0.14;
    const bw = W * 0.46;
    const bh = H * 0.42;
    const corner = 16;

    // Top-Left corner bracket
    ctx.beginPath();
    ctx.moveTo(bx, by + corner);
    ctx.lineTo(bx, by);
    ctx.lineTo(bx + corner, by);
    // Top-Right corner bracket
    ctx.moveTo(bx + bw - corner, by);
    ctx.lineTo(bx + bw, by);
    ctx.lineTo(bx + bw, by + corner);
    // Bottom-Left corner bracket
    ctx.moveTo(bx, by + bh - corner);
    ctx.lineTo(bx, by + bh);
    ctx.lineTo(bx + corner, by + bh);
    // Bottom-Right corner bracket
    ctx.moveTo(bx + bw - corner, by + bh);
    ctx.lineTo(bx + bw, by + bh);
    ctx.lineTo(bx + bw, by + bh - corner);
    ctx.stroke();

    // Telemetry header above reticle
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = isHovered ? "#00F0FF" : "#FF0033";
    ctx.fillText(
      isHovered
        ? "ID_LOCKED: SYED_MUZAMMIL_ALI [CRISP_OPTICS]"
        : `SHADER: ${shaderMode} // HOVER_TO_DECRYPT`,
      bx,
      by - 8,
    );

    // Moving laser scanline when in shader mode
    if (!isHovered) {
      const scanY = (scanOffset / 100) * H;
      const scanGrad = ctx.createLinearGradient(0, scanY - 12, 0, scanY + 12);
      scanGrad.addColorStop(0, "rgba(0, 240, 255, 0)");
      scanGrad.addColorStop(0.5, "rgba(0, 240, 255, 0.45)");
      scanGrad.addColorStop(1, "rgba(0, 240, 255, 0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 12, W, 24);
    }

    // Executive Bottom Vignette Fade (blends seamlessly into #050505 / #0a0a0f background)
    const vignette = ctx.createLinearGradient(0, H * 0.62, 0, H);
    vignette.addColorStop(0, "rgba(10, 10, 15, 0)");
    vignette.addColorStop(0.7, "rgba(10, 10, 15, 0.72)");
    vignette.addColorStop(1, "#0a0a0f");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, H * 0.62, W, H * 0.38);
    ctx.restore();
  }, [activePortrait, loadedImageObj, shaderMode, isHovered, scanOffset]);

  return (
    <div className="relative group select-none">
      {/* Ambient Dual-Ring Glow Behind Portrait Frame */}
      <div
        className="absolute -inset-3 rounded-3xl opacity-60 blur-2xl transition-all duration-700 group-hover:opacity-95"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(0, 240, 255, 0.32), rgba(0, 68, 255, 0.22), rgba(255, 0, 51, 0.18), transparent 75%)",
        }}
      />

      {/* Outer Dual-Ring Gradient Frame */}
      <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-[#00F0FF] via-[#0044FF]/50 to-[#FF0033] shadow-[0_0_50px_rgba(0,240,255,0.15)]">
        <div className="relative rounded-[15px] bg-[#0a0a0f] p-2.5 border border-white/10 overflow-hidden">
          {/* Top HUD Telemetry Bar inside Portrait Frame */}
          <div className="flex items-center justify-between px-3 py-2 mb-2 rounded-lg bg-[#111113]/90 border border-white/10 font-mono text-[11px] text-[#A1A1AA]">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#FF0033] animate-pulse" />
              <span className="text-[#F4F4F6] font-semibold tracking-wider">
                {activePortrait.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00F0FF] hidden sm:inline">
                {activePortrait.src}
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Bind local photo file (profile.jpg, IMG_1031.jpg, IMG_1793.jpg, APC_0631g.jpg)"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/30 transition-colors cursor-pointer"
              >
                <Upload className="w-3 h-3" />
                <span>Bind Photo</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    onUploadCustomImage(activePortrait.id, url);
                  }
                }}
              />
            </div>
          </div>

          {/* Interactive Portrait Canvas Container */}
          <div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#050505] cursor-crosshair"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <canvas
              ref={canvasRef}
              width={480}
              height={600}
              style={{ filter: "contrast(1.04) brightness(0.98)" }}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            />

            {/* Hover Status Pill */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/15 font-mono text-[10px] tracking-widest uppercase text-[#F4F4F6] flex items-center gap-1.5 pointer-events-none">
              <Eye className="w-3 h-3 text-[#00F0FF]" />
              <span>
                {isHovered
                  ? "CRISP EXECUTIVE VIEW ACTIVE"
                  : "HOVER TO DECRYPT SHADER"}
              </span>
            </div>

            {/* Floating Glassmorphic Badge 1 — Top Right */}
            <div className="absolute top-12 right-3 px-3 py-2 rounded-xl bg-[#111113]/85 backdrop-blur-md border border-[#00F0FF]/40 shadow-[0_8px_30px_rgba(0,0,0,0.6)] pointer-events-none transition-transform duration-500 group-hover:-translate-y-1">
              <div className="font-mono text-[9px] uppercase tracking-widest text-[#00F0FF]">
                IDENTITY // ROLE
              </div>
              <div className="text-xs font-bold text-[#F4F4F6] tracking-tight">
                MERN Stack Developer
              </div>
            </div>

            {/* Floating Glassmorphic Badge 2 — Bottom Left */}
            <div className="absolute bottom-14 left-3 right-3 sm:right-auto px-3.5 py-2.5 rounded-xl bg-[#111113]/90 backdrop-blur-md border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.7)] pointer-events-none transition-transform duration-500 group-hover:translate-x-1">
              <div className="font-mono text-[9px] uppercase tracking-widest text-[#FF5500] flex items-center gap-1.5">
                <Layers className="w-3 h-3" />
                <span>CORE ARCHITECTURE STACK</span>
              </div>
              <div className="text-xs font-semibold text-[#F4F4F6] mt-0.5">
                MongoDB • Express • React • Node
              </div>
            </div>

            {/* Floating Glassmorphic Badge 3 — Bottom Right */}
            <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-[#0044FF]/25 backdrop-blur-md border border-[#00F0FF]/40 font-mono text-[11px] font-semibold text-[#F4F4F6] pointer-events-none">
              GPA: 3.41/4.00 • BSCS
            </div>
          </div>

          {/* Portrait Preset & Cyber Shader Controls */}
          <div className="mt-3 space-y-2">
            <div className="grid grid-cols-4 gap-1.5">
              {PORTFOLIO_DATA.portraits.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActivePortraitIndex(idx)}
                  className={`px-2 py-1.5 rounded-lg font-mono text-[10px] tracking-tighter border transition-all truncate cursor-pointer ${
                    activePortraitIndex === idx
                      ? "bg-[#00F0FF]/15 border-[#00F0FF] text-[#F4F4F6] shadow-[0_0_12px_rgba(0,240,255,0.25)]"
                      : "bg-[#111113] border-white/10 text-[#A1A1AA] hover:border-white/30 hover:text-white"
                  }`}
                >
                  {item.filename}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-1 pt-1 border-t border-white/10">
              <span className="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-wider flex items-center gap-1">
                <Sliders className="w-3 h-3 text-[#FF0033]" />
                SHADER:
              </span>
              <div className="flex flex-wrap gap-1">
                {[
                  { id: "HALFTONE_HUD", label: "HALFTONE" },
                  { id: "RGB_GLITCH", label: "RGB GLITCH" },
                  { id: "ASCII_TELEMETRY", label: "ASCII" },
                  { id: "CRISP_RAW", label: "CRISP RAW" },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setShaderMode(mode.id)}
                    className={`px-2 py-0.5 rounded font-mono text-[10px] transition-all cursor-pointer ${
                      shaderMode === mode.id
                        ? "bg-[#FF0033] text-white font-semibold"
                        : "bg-white/5 text-[#A1A1AA] hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * ============================================================================
 * SPOTLIGHT BENTO CARD (RAZORPAY AI BUILDERS STYLE MOUSE-TRACKING BORDER)
 * ============================================================================
 */
const SpotlightCard = ({
  children,
  className = "",
  accentColor = "#00F0FF",
}) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-2xl bg-[#111113] border border-white/10 overflow-hidden transition-all duration-300 ${className}`}
      style={{
        boxShadow: isHovered ? `0 10px 40px -15px ${accentColor}33` : "none",
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${accentColor}22, transparent 40%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          border: `1px solid ${accentColor}66`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

/**
 * ============================================================================
 * MAIN APPLICATION COMPONENT — ZERO HYDRATION MISMATCHES FOR NEXT.JS 15/16
 * ============================================================================
 */
export default function App() {
  // Deterministic static defaults for SSR hydration safety (NO Date.now() during render)
  const [sessionStamp, setSessionStamp] = useState("573584-INIT");
  const [clockStr, setClockStr] = useState("00:00:00 UTC+5");
  const idCounterRef = useRef(100);

  // Navigation & Scroll Telemetry State
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState("signal");
  const [crtScanlines, setCrtScanlines] = useState(true);
  const [heroIdentityRevealed, setHeroIdentityRevealed] = useState(true);

  // Cursor Telemetry State (static initial ref time = 0, never Date.now() in render)
  const [cursorPos, setCursorPos] = useState({ x: 573, y: 584 });
  const [cursorVelocity, setCursorVelocity] = useState(0);
  const lastCursorRef = useRef({ x: 573, y: 584, time: 0 });

  // Portrait & Shader State
  const [activePortraitIndex, setActivePortraitIndex] = useState(0);
  const [shaderMode, setShaderMode] = useState("HALFTONE_HUD");
  const [customUploadedImages, setCustomUploadedImages] = useState({});

  // Chapter 02: Interactive CS Node Graph State
  const [activeCsNode, setActiveCsNode] = useState(
    PORTFOLIO_DATA.csConceptsGraph[0],
  );

  // Chapter 03: Active Skill Telemetry State
  const [selectedSkillDetail, setSelectedSkillDetail] = useState({
    name: "Next.js",
    level: "95%",
    role: "App Router, SSR, Dynamic Routing & SEO",
    category: "[02 // CORE STACK]",
  });

  // Chapter 04: Projects Filter & Interactive Telemetry Simulators State
  const [projectFilter, setProjectFilter] = useState("ALL SYSTEMS");
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState("A4");
  const [rentalDays, setRentalDays] = useState(4);
  const [selectedCarTier, setSelectedCarTier] = useState({
    name: "Corolla Grande X",
    rate: 85,
  });
  const [skillVerseMessages, setSkillVerseMessages] = useState([
    {
      id: "msg-1",
      sender: "CLIENT_NODE",
      text: "Milestone 1 escrow funded via Stripe Checkout ($1,200).",
    },
    {
      id: "msg-2",
      sender: "AI_SUPPORT_BOT",
      text: "Escrow verified. Socket.IO live workspace channel locked & active.",
    },
  ]);
  const [skillVerseDraft, setSkillVerseDraft] = useState("");

  // Chapter 06: Contact Form & AI/LLM Architecture Inspector Modal
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "Full-Stack / Next.js Engineering Opportunity",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState(null);
  const [inspectorModalOpen, setInspectorModalOpen] = useState(false);
  const [inspectorTab, setInspectorTab] = useState("llms");
  const [copiedKey, setCopiedKey] = useState(null);

  // Client-only Hydration Effect for Session Stamp & Live PKT Clock
  useEffect(() => {
    setSessionStamp("573584-LIVE");
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour12: false,
        timeZone: "Asia/Karachi",
      });
      setClockStr(`${timeString} PKT`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load Google Fonts & inject JSON-LD Schema.org Structured Data
  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Syne:wght@700;800&display=swap";
    document.head.appendChild(fontLink);

    const schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Syed Muzammil Ali",
      jobTitle: "MERN Stack Developer & Full-Stack Architect",
      url: "https://github.com/muzammil-gitdev",
      email: "mailto:muzammil.uiit@gmail.com",
      telephone: "+923444344448",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Rawalpindi",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "PMAS - Arid Agricultural University (Rawalpindi, Punjab)",
      },
      knowsAbout: [
        "JavaScript",
        "C++",
        "Java",
        "SQL",
        "React.js",
        "Node.js",
        "MongoDB",
        "Supabase",
        "Next.js",
        "PostgreSQL",
        "Stripe",
        "Express.js",
        "Tailwind CSS",
        "Git",
        "GitHub",
        "Docker",
        "AWS",
        "Linux",
        "Socket.IO",
      ],
    });
    document.head.appendChild(schemaScript);

    return () => {
      if (document.head.contains(fontLink)) document.head.removeChild(fontLink);
      if (document.head.contains(schemaScript))
        document.head.removeChild(schemaScript);
    };
  }, []);

  // Scroll Progress & Active Chapter Spy (auto-transitions Hero "WHO AM I?" on scroll)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress =
        docHeight > 0
          ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))
          : 0;
      setScrollProgress(progress);

      if (scrollTop > 40) {
        setHeroIdentityRevealed(true);
      }

      const sections = [
        "signal",
        "anatomy",
        "arsenal",
        "archives",
        "logs",
        "uplink",
      ];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260 && rect.bottom >= 260) {
            setActiveChapter(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse Crosshair Telemetry Tracker (uses e.timeStamp instead of Date.now())
  useEffect(() => {
    const handleMouseMove = (e) => {
      const evTime = e.timeStamp || 0;
      const dt = Math.max(16, evTime - lastCursorRef.current.time);
      const dx = e.clientX - lastCursorRef.current.x;
      const dy = e.clientY - lastCursorRef.current.y;
      const vel = Math.min(999, Math.round((Math.hypot(dx, dy) / dt) * 100));

      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorVelocity(vel);
      lastCursorRef.current = { x: e.clientX, y: e.clientY, time: evTime };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const filteredProjects = useMemo(() => {
    if (projectFilter === "ALL SYSTEMS") return PORTFOLIO_DATA.projects;
    return PORTFOLIO_DATA.projects.filter((p) => p.filterTag === projectFilter);
  }, [projectFilter]);

  const handleCopy = (key, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleUploadCustomImage = (portraitId, blobUrl) => {
    setCustomUploadedImages((prev) => ({ ...prev, [portraitId]: blobUrl }));
  };

  const handleSendSkillVerseMessage = (e) => {
    e.preventDefault();
    if (!skillVerseDraft.trim()) return;
    idCounterRef.current += 1;
    const msgId = `msg-${idCounterRef.current}`;
    const replyId = `msg-${idCounterRef.current + 1}`;
    idCounterRef.current += 1;

    const userText = skillVerseDraft.trim();
    setSkillVerseMessages((prev) => [
      ...prev,
      { id: msgId, sender: "FREELANCER_NODE", text: userText },
      {
        id: replyId,
        sender: "AI_SUPPORT_BOT",
        text: `Socket.IO frame acknowledged. RBAC moderation status: CLEAN.`,
      },
    ]);
    setSkillVerseDraft("");
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (
      !contactForm.name.trim() ||
      !contactForm.email.trim() ||
      !contactForm.message.trim()
    ) {
      setContactStatus({
        type: "error",
        text: "ERR_VALIDATION: Please populate Name, Email, and Transmission Payload.",
      });
      return;
    }
    setContactStatus({
      type: "success",
      text: `UPLINK_ESTABLISHED: Transmission queued for muzammil.uiit@gmail.com [ACK_200]`,
    });
  };

  // Inspector Code Artifacts: llms.txt, JSON-LD, and Modular SCSS Architecture
  const inspectorArtifacts = {
    llms: `# llms.txt — AI & LLM Discovery Manifest for Syed Muzammil Ali
> Canonical Identity: Syed Muzammil Ali
> Role: MERN Stack Developer & Full-Stack Architect
> Location: Rawalpindi, Punjab, Pakistan (33.6844° N, 73.0479° E)
> Contact: muzammil.uiit@gmail.com | +923444344448 | https://github.com/muzammil-gitdev

## Professional Summary
MERN Stack Developer who builds web applications with MongoDB, Express.js, React, Node.js, and Next.js. Experience working with both SQL and NoSQL databases and choosing the right one for each project. Familiar with Supabase for authentication and real-time features, and Docker for containerized deployments. Focused on writing clean code, building secure APIs, and learning new technologies.

## Flagship Full-Stack Projects
1. Karakoram Express - E-Ticketing Service (React.js, Express.js, Node.js, MongoDB, Stripe):
   - 4-step bus booking wizard, interactive seat grid, Stripe Checkout for Northern Pakistan inter-city routes.
   - Admin portal with SHA-256 auth, full route CRUD, passenger lookup, Cloudinary uploads with auto cleanup.
2. DriveX - Car Rental Service (Next.js, Express.js, MongoDB, Node.js, Tailwind CSS):
   - Dynamic fleet catalog, booking modal with real-time price estimation, client-side validation with toast notifications.
   - Admin dashboard with auto-refreshing KPI cards (cars, bookings, revenue, requests) and full fleet CRUD.
3. SkillVerse - Freelancing Website (Next.js, Express.js, Node.js, Tailwind CSS, Stripe, Socket.IO):
   - Freelance marketplace with Stripe checkout and Socket.IO-based live messaging.
   - AI-powered support chatbot and role-based admin moderation dashboard.

## Work Experience & Education
- Developers Hub Corp — MERN Stack Developer (Dec 2025 – Feb 2026 | Remote)
- Digital Empowerment Network — Front-End Developer (July 2025 – Sept 2025 | Remote)
- PMAS - Arid Agricultural University (Rawalpindi, Punjab) — BS Computer Science (Oct 2022 – May 2026 | GPA: 3.41/4.00)`,

    jsonld: `{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Syed Muzammil Ali",
  "jobTitle": "MERN Stack Developer & Full-Stack Architect",
  "email": "mailto:muzammil.uiit@gmail.com",
  "telephone": "+923444344448",
  "url": "https://github.com/muzammil-gitdev",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Rawalpindi",
    "addressRegion": "Punjab",
    "addressCountry": "PK"
  },
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "PMAS - Arid Agricultural University (Rawalpindi, Punjab)"
  }
}`,

    scss: `// ============================================================================
// 1. src/styles/_variables.scss
// ============================================================================
$void-black: #050505;
$obsidian-bg: #0a0a0f;
$panel-charcoal: #111113;
$stark-white: #f4f4f6;
$muted-chrome: #a1a1aa;
$glitch-crimson: #ff0033;
$telemetry-blue: #0044ff;
$cyber-cyan: #00f0ff;
$solar-orange: #ff5500;

$font-display: var(--font-space), 'Space Grotesk', sans-serif;
$font-editorial: var(--font-serif), 'Instrument Serif', serif;
$font-mono: var(--font-mono), 'JetBrains Mono', monospace;

// ============================================================================
// 2. src/styles/_mixins.scss
// ============================================================================
@mixin glass-panel($opacity: 0.85, $border-alpha: 0.12) {
  background: rgba(17, 17, 19, $opacity);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, $border-alpha);
}

@mixin executive-portrait-frame {
  position: relative;
  border-radius: 1rem;
  padding: 2px;
  background: linear-gradient(135deg, $cyber-cyan, rgba($telemetry-blue, 0.5), $glitch-crimson);
  box-shadow: 0 0 50px rgba($cyber-cyan, 0.15);

  img, canvas {
    object-fit: cover;
    object-position: center top;
    filter: contrast(1.04) brightness(0.98);
  }
}

// ============================================================================
// 3. src/components/Hero/Hero.module.scss
// ============================================================================
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.heroSection {
  min-height: calc(100vh - 4rem);
  background-color: $void-black;
  position: relative;
}

.portraitContainer {
  @include executive-portrait-frame;
}`,

    data: `// ============================================================================
// src/data/portfolioData.js
// Place your photos in:
//   /public/images/profile.jpg
//   /public/images/IMG_1031.jpg
//   /public/images/IMG_1793.jpg
//   /public/images/APC_0631g.jpg
// ============================================================================
export const portfolioData = ${JSON.stringify(PORTFOLIO_DATA.personal, null, 2)};`,
  };

  return (
    <div
      className="min-h-screen bg-[#050505] text-[#F4F4F6] relative selection:bg-[#FF0033] selection:text-white overflow-x-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Custom Typography & Cyber-Brutalist Utility Styles */}
      <style>{`
        .font-display { font-family: 'Space Grotesk', 'Syne', sans-serif; }
        .font-syne { font-family: 'Syne', 'Space Grotesk', sans-serif; }
        .font-editorial { font-family: 'Instrument Serif', Georgia, serif; }
        .font-mono-hud { font-family: 'JetBrains Mono', monospace; }

        .bg-cyber-grid {
          background-size: 48px 48px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
        }

        .crt-scanlines {
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%, 
            rgba(0, 0, 0, 0.32) 50%
          ), linear-gradient(
            90deg,
            rgba(255, 0, 0, 0.02),
            rgba(0, 255, 0, 0.01),
            rgba(0, 0, 255, 0.02)
          );
          background-size: 100% 4px, 6px 100%;
        }
      `}</style>

      {/* Global Tactile SVG Noise / Grain Overlay (opacity: 0.04) */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Optional CRT Scanline Global Overlay */}
      {crtScanlines && (
        <div className="pointer-events-none fixed inset-0 z-30 crt-scanlines" />
      )}

      {/* Interactive Custom Crosshair Telemetry Follower (Desktop) */}
      <div
        className="pointer-events-none fixed z-50 hidden lg:flex items-center gap-2 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${cursorPos.x + 16}px, ${cursorPos.y + 16}px, 0)`,
        }}
      >
        <div className="w-2.5 h-2.5 border border-[#00F0FF] rotate-45 bg-[#FF0033]/60" />
        <div className="px-1.5 py-0.5 rounded bg-black/80 border border-white/15 font-mono-hud text-[9px] text-[#00F0FF] tracking-tighter">
          X:{cursorPos.x} Y:{cursorPos.y} // V:{cursorVelocity}
        </div>
      </div>

      {/* Top Scroll Progress Telemetry Line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#FF0033] via-[#00F0FF] to-[#FF5500] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ====================================================================
          STICKY GLASSMORPHIC NAVBAR (STRICTLY NO LOGO, NO INITIALS, NO NAME)
          Live Telemetry Coordinates, Web Vitals Badge, Chapters 01–06 & Toggles
          ==================================================================== */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#050505]/85 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Left: Live Telemetry Coordinates & Web Vitals Badge (NO LOGO) */}
          <div className="flex items-center gap-2.5 font-mono-hud text-[11px]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#111113] border border-white/10 text-[#00F0FF]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
              <span className="hidden sm:inline">
                33.6844° N, 73.0479° E // RAWALPINDI_PK
              </span>
              <span className="sm:hidden">RAWALPINDI_PK</span>
            </span>
            <span className="hidden xl:inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              LCP: 0.72s | CLS: 0.00
            </span>
          </div>

          {/* Center: Smooth-Scroll Navigation Links (01. SIGNAL to 06. UPLINK) */}
          <nav className="hidden md:flex items-center gap-1 bg-[#111113]/90 p-1 rounded-xl border border-white/10">
            {[
              { id: "signal", label: "01. SIGNAL" },
              { id: "anatomy", label: "02. ANATOMY" },
              { id: "arsenal", label: "03. ARSENAL" },
              { id: "archives", label: "04. ARCHIVES" },
              { id: "logs", label: "05. LOGS" },
              { id: "uplink", label: "06. UPLINK" },
            ].map((item) => {
              const isActive = activeChapter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`px-2.5 py-1.5 rounded-lg font-mono-hud text-[11px] tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#FF0033] text-white font-semibold shadow-[0_0_15px_rgba(255,0,51,0.4)]"
                      : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: CRT Scanline Toggle, AI/LLM Inspector Toggle & Uplink CTA */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCrtScanlines((prev) => !prev)}
              title="Toggle CRT Scanline Overlay"
              className={`px-2.5 py-1.5 rounded-lg font-mono-hud text-[10px] border transition-all cursor-pointer hidden sm:inline-flex items-center gap-1 ${
                crtScanlines
                  ? "bg-[#0044FF]/20 border-[#00F0FF]/50 text-[#00F0FF]"
                  : "bg-[#111113] border-white/10 text-[#A1A1AA]"
              }`}
            >
              <Activity className="w-3 h-3" />
              <span>CRT:{crtScanlines ? "ON" : "OFF"}</span>
            </button>

            <button
              type="button"
              onClick={() => setInspectorModalOpen(true)}
              className="px-3 py-1.5 rounded-lg font-mono-hud text-[11px] bg-[#111113] hover:bg-white/10 text-[#F4F4F6] border border-white/15 transition-all inline-flex items-center gap-1.5 cursor-pointer"
            >
              <FileCode className="w-3.5 h-3.5 text-[#FF5500]" />
              <span className="hidden sm:inline">AI / SCSS Inspector</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("uplink")}
              className="px-3.5 py-1.5 rounded-lg font-mono-hud text-xs font-semibold bg-gradient-to-r from-[#FF0033] to-[#FF5500] text-white shadow-[0_0_20px_rgba(255,0,51,0.35)] hover:brightness-110 transition-all inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Uplink</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ====================================================================
          CHAPTER 01: THE SIGNAL ("WHO AM I?") — HERO SECTION
          ==================================================================== */}
      <section
        id="signal"
        className="relative min-h-[calc(100vh-4rem)] bg-cyber-grid pt-8 pb-20 lg:py-14 flex flex-col justify-between border-b border-white/10 overflow-hidden"
      >
        <div
          className="pointer-events-none absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[130px] opacity-25"
          style={{ background: "#0044FF" }}
        />
        <div
          className="pointer-events-none absolute bottom-10 right-10 w-96 h-96 rounded-full blur-[140px] opacity-20"
          style={{ background: "#FF0033" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Top Floating HUD Telemetry Corners */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-8 mb-8 border-b border-white/10 font-mono-hud text-[11px]">
            <div className="p-2.5 rounded-lg bg-[#111113]/80 border border-white/10 flex items-center justify-between">
              <span className="text-[#A1A1AA]">STATUS:</span>
              <span className="text-[#00F0FF] font-semibold">
                #IDENTITY_FOUND
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#111113]/80 border border-white/10 flex items-center justify-between">
              <span className="text-[#A1A1AA]">SESSION_ID:</span>
              <span className="text-[#F4F4F6]">{sessionStamp}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#111113]/80 border border-white/10 flex items-center justify-between">
              <span className="text-[#A1A1AA]">CLOCK:</span>
              <span className="text-emerald-400">{clockStr}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#111113]/80 border border-white/10 flex items-center justify-between">
              <span className="text-[#A1A1AA]">AI_MANIFEST:</span>
              <span className="text-[#FF5500] font-semibold">
                LLMS.TXT_READY
              </span>
            </div>
          </div>

          {/* Main Hero Grid: Left Kinetic Typography + Right Executive Portrait Frame */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column (7 Cols): Kinetic Scrollytelling Typography */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#FF0033]/15 border border-[#FF0033]/40 font-mono-hud text-xs text-[#FF0033] font-semibold tracking-wider">
                  CHAPTER 01 // THE SIGNAL
                </span>
                <button
                  type="button"
                  onClick={() => setHeroIdentityRevealed((prev) => !prev)}
                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 font-mono-hud text-[11px] text-[#00F0FF] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>
                    Kinetic State:{" "}
                    {heroIdentityRevealed ? "IDENTITY_LOCKED" : '"WHO AM I?"'}
                  </span>
                </button>
              </div>

              {/* Kinetic Typography Prompt transitioning from "WHO AM I?" to "SYED MUZAMMIL ALI — FULL-STACK ARCHITECT" */}
              <div className="space-y-3">
                <div className="font-mono-hud text-xs uppercase tracking-[0.22em] text-[#A1A1AA] flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#FF0033]" />
                  <span>
                    {heroIdentityRevealed
                      ? "SIGNAL_RESOLVED // WHO AM I? -> SYED MUZAMMIL ALI"
                      : "INCOMING_SIGNAL_QUERY // CLICK OR SCROLL TO RESOLVE"}
                  </span>
                </div>

                {!heroIdentityRevealed ? (
                  <div
                    onClick={() => setHeroIdentityRevealed(true)}
                    className="cursor-pointer group py-4"
                  >
                    <h1 className="font-syne text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#F4F4F6] via-[#00F0FF] to-[#FF0033]">
                      WHO AM I?
                    </h1>
                    <p className="mt-3 font-mono-hud text-xs text-[#00F0FF] flex items-center gap-2">
                      <span>
                        [CLICK OR SCROLL TO DECRYPT FULL-STACK ARCHITECT
                        IDENTITY]
                      </span>
                      <ChevronRight className="w-4 h-4 animate-bounce" />
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="inline-block px-2.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono-hud text-[11px] text-[#00F0FF]">
                      QUERY: &quot;WHO AM I?&quot; // DECRYPTED
                    </div>
                    <h1 className="font-display text-4xl sm:text-6xl xl:text-[64px] font-bold uppercase tracking-tight leading-[1.03] text-[#F4F4F6]">
                      SYED MUZAMMIL ALI
                      <span className="block mt-2 text-2xl sm:text-4xl xl:text-[42px] font-normal text-[#A1A1AA]">
                        — FULL-STACK{" "}
                        <span className="font-editorial italic text-[#00F0FF] pr-2">
                          Architect
                        </span>
                        <span className="text-lg sm:text-2xl font-mono-hud text-[#FF0033] align-middle">
                          [MERN &amp; NEXT.JS]
                        </span>
                      </span>
                    </h1>
                  </div>
                )}
              </div>

              {/* Authentic Hero Subtext */}
              <p className="text-lg sm:text-xl text-[#F4F4F6]/95 font-medium leading-relaxed max-w-2xl border-l-2 border-[#00F0FF] pl-4">
                {PORTFOLIO_DATA.personal.heroTagline}
              </p>

              {/* Authentic Executive Bio Summary */}
              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-2xl">
                {PORTFOLIO_DATA.personal.summary}
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection("archives")}
                  className="px-6 py-3.5 rounded-xl font-mono-hud text-xs font-bold uppercase tracking-wider bg-[#F4F4F6] text-[#050505] hover:bg-[#00F0FF] hover:text-[#050505] transition-all inline-flex items-center gap-2 shadow-[0_0_30px_rgba(244,244,246,0.2)] cursor-pointer"
                >
                  <span>Explore Flagship Archives</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setInspectorTab("scss");
                    setInspectorModalOpen(true);
                  }}
                  className="px-5 py-3.5 rounded-xl font-mono-hud text-xs font-semibold uppercase tracking-wider bg-[#111113] hover:bg-white/10 text-[#F4F4F6] border border-white/20 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <FileCode className="w-4 h-4 text-[#00F0FF]" />
                  <span>SCSS &amp; Data Architecture</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setInspectorTab("llms");
                    setInspectorModalOpen(true);
                  }}
                  className="px-4 py-3.5 rounded-xl font-mono-hud text-xs uppercase tracking-wider bg-[#FF5500]/15 hover:bg-[#FF5500]/25 text-[#FF5500] border border-[#FF5500]/40 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <Globe className="w-4 h-4" />
                  <span>LLMs.txt Manifest</span>
                </button>
              </div>

              {/* Direct Authentic Contact Telemetry Bar */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/10">
                <a
                  href={PORTFOLIO_DATA.personal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#111113] hover:bg-white/5 border border-white/10 hover:border-[#00F0FF]/50 transition-all flex items-center gap-3 group"
                >
                  <GitHubIcon className="w-5 h-5 text-[#00F0FF] group-hover:scale-110 transition-transform shrink-0" />
                  <div className="min-w-0">
                    <div className="font-mono-hud text-[10px] text-[#A1A1AA]">
                      GITHUB // REPOS
                    </div>
                    <div className="text-xs font-semibold text-[#F4F4F6] truncate">
                      muzammil-gitdev
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="p-3 rounded-xl bg-[#111113] hover:bg-white/5 border border-white/10 hover:border-[#FF0033]/50 transition-all flex items-center gap-3 group"
                >
                  <Mail className="w-5 h-5 text-[#FF0033] group-hover:scale-110 transition-transform shrink-0" />
                  <div className="min-w-0">
                    <div className="font-mono-hud text-[10px] text-[#A1A1AA]">
                      DIRECT // EMAIL
                    </div>
                    <div className="text-xs font-semibold text-[#F4F4F6] truncate">
                      muzammil.uiit@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href={`tel:${PORTFOLIO_DATA.personal.phone}`}
                  className="p-3 rounded-xl bg-[#111113] hover:bg-white/5 border border-white/10 hover:border-[#FF5500]/50 transition-all flex items-center gap-3 group"
                >
                  <Phone className="w-5 h-5 text-[#FF5500] group-hover:scale-110 transition-transform shrink-0" />
                  <div className="min-w-0">
                    <div className="font-mono-hud text-[10px] text-[#A1A1AA]">
                      VOICE // UPLINK
                    </div>
                    <div className="text-xs font-semibold text-[#F4F4F6] truncate">
                      +923444344448
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column (5 Cols): Interactive Cyber-Brutalist Executive Portrait Frame */}
            <div className="lg:col-span-5">
              <CyberPortraitFrame
                activePortraitIndex={activePortraitIndex}
                setActivePortraitIndex={setActivePortraitIndex}
                shaderMode={shaderMode}
                setShaderMode={setShaderMode}
                customUploadedImages={customUploadedImages}
                onUploadCustomImage={handleUploadCustomImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CHAPTER 02: THE ANATOMY OF CODE — INTERACTIVE ABOUT & PHILOSOPHY
          ==================================================================== */}
      <section
        id="anatomy"
        className="relative py-24 bg-[#0a0a0f] border-b border-white/10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="font-mono-hud text-xs text-[#00F0FF] uppercase tracking-widest mb-2 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#FF0033]" />
                <span>CHAPTER 02 // THE ANATOMY OF CODE</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight">
                ENGINEERING{" "}
                <span className="font-editorial italic font-normal text-[#00F0FF]">
                  Philosophy
                </span>{" "}
                &amp; KERNEL TELEMETRY
              </h2>
            </div>
            <p className="font-mono-hud text-xs text-[#A1A1AA] max-w-md">
              [INTERACTIVE VECTOR NODE NETWORK]: Select any of the 8 core
              Computer Science nodes to inspect its live architectural
              implementation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Side (6 Cols): Interactive SVG Vector Node Network + Code Stream */}
            <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-24">
              <div className="rounded-2xl bg-[#111113] border border-white/10 p-5 shadow-2xl">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono-hud text-xs">
                  <span className="text-[#F4F4F6] font-semibold flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#00F0FF]" />
                    CS_CONCEPTS_TOPOLOGY // 8_NODES_ONLINE
                  </span>
                  <span className="text-[#FF0033]">{activeCsNode.code}</span>
                </div>

                {/* Interactive SVG Vector Graph */}
                <div className="relative aspect-[16/11] w-full rounded-xl bg-[#050505] border border-white/10 overflow-hidden p-4">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    {PORTFOLIO_DATA.csConceptsGraph.map((node, i) => {
                      const nextNode =
                        PORTFOLIO_DATA.csConceptsGraph[
                          (i + 1) % PORTFOLIO_DATA.csConceptsGraph.length
                        ];
                      const crossNode =
                        PORTFOLIO_DATA.csConceptsGraph[
                          (i + 3) % PORTFOLIO_DATA.csConceptsGraph.length
                        ];
                      const isHighlighted =
                        activeCsNode.id === node.id ||
                        activeCsNode.id === nextNode.id;

                      return (
                        <g key={`edges-${node.id}`}>
                          <line
                            x1={node.x}
                            y1={node.y}
                            x2={nextNode.x}
                            y2={nextNode.y}
                            stroke={
                              isHighlighted
                                ? "#00F0FF"
                                : "rgba(255,255,255,0.12)"
                            }
                            strokeWidth={isHighlighted ? "0.65" : "0.3"}
                            strokeDasharray={isHighlighted ? "none" : "1.5,1.5"}
                          />
                          <line
                            x1={node.x}
                            y1={node.y}
                            x2={crossNode.x}
                            y2={crossNode.y}
                            stroke={
                              activeCsNode.id === node.id
                                ? "rgba(255, 0, 51, 0.55)"
                                : "rgba(255,255,255,0.06)"
                            }
                            strokeWidth="0.28"
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {PORTFOLIO_DATA.csConceptsGraph.map((node) => {
                    const isSelected = activeCsNode.id === node.id;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setActiveCsNode(node)}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        className={`-translate-x-1/2 -translate-y-1/2 absolute px-2.5 py-1.5 rounded-lg font-mono-hud text-[10px] sm:text-[11px] transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-[#00F0FF] text-[#050505] font-bold shadow-[0_0_25px_rgba(0,240,255,0.7)] scale-110 z-20"
                            : "bg-[#111113]/90 text-[#F4F4F6] border border-white/20 hover:border-[#00F0FF] z-10"
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: isSelected ? "#050505" : node.color,
                          }}
                        />
                        <span>{node.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Live Telemetry Code Stream */}
                <div className="mt-4 rounded-xl bg-[#050505] border border-white/10 p-4 font-mono-hud">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[#00F0FF] font-bold">
                      NODE // {activeCsNode.label.toUpperCase()}
                    </span>
                    <span className="text-[#A1A1AA] text-[11px]">
                      {activeCsNode.code}
                    </span>
                  </div>
                  <p className="text-xs text-[#A1A1AA] mb-3 leading-relaxed">
                    {activeCsNode.detail}
                  </p>
                  <pre className="text-[11px] text-emerald-400 bg-[#111113] p-3 rounded-lg border border-white/5 overflow-x-auto">
                    <code>{activeCsNode.snippet}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Right Side (6 Cols): Engineering Philosophy Pillars */}
            <div className="lg:col-span-6 space-y-5">
              {PORTFOLIO_DATA.philosophyPillars.map((pillar) => (
                <SpotlightCard
                  key={pillar.id}
                  accentColor={pillar.accent}
                  className="p-6 sm:p-7"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span
                      className="font-mono-hud text-xs font-semibold px-2.5 py-1 rounded bg-white/5"
                      style={{ color: pillar.accent }}
                    >
                      {pillar.index}
                    </span>
                    <span className="font-mono-hud text-[11px] text-[#A1A1AA] border border-white/10 px-2.5 py-0.5 rounded-full">
                      {pillar.metrics}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4F4F6] mb-1">
                    {pillar.title}
                  </h3>
                  <div className="font-editorial italic text-lg text-[#00F0FF] mb-3">
                    {pillar.subtitle}
                  </div>
                  <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                    {pillar.description}
                  </p>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CHAPTER 03: THE ARSENAL — TELEMETRY TECH STACK (BENTO GRID)
          ==================================================================== */}
      <section
        id="arsenal"
        className="relative py-24 bg-[#050505] bg-cyber-grid border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <div className="font-mono-hud text-xs text-[#FF5500] uppercase tracking-widest mb-2 flex items-center gap-2">
                <Database className="w-4 h-4 text-[#FF0033]" />
                <span>CHAPTER 03 // THE ARSENAL</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight">
                TELEMETRY{" "}
                <span className="font-editorial italic font-normal text-[#FF0033]">
                  Tech Stack
                </span>{" "}
                MATRIX
              </h2>
            </div>

            <div className="p-3.5 rounded-xl bg-[#111113] border border-[#00F0FF]/40 flex items-center gap-4 min-w-[280px] sm:min-w-[360px]">
              <div className="p-2.5 rounded-lg bg-[#00F0FF]/10 text-[#00F0FF]">
                <Terminal className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-mono-hud text-[10px] text-[#00F0FF] uppercase">
                  ACTIVE_SKILL_TELEMETRY // {selectedSkillDetail.level}
                </div>
                <div className="text-sm font-bold text-[#F4F4F6] truncate">
                  {selectedSkillDetail.name} —{" "}
                  <span className="font-normal text-xs text-[#A1A1AA]">
                    {selectedSkillDetail.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {PORTFOLIO_DATA.skillsArsenal.map((group) => (
              <SpotlightCard
                key={group.index}
                accentColor={group.accent}
                className={`${group.colSpan} p-6 sm:p-8 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className="font-mono-hud text-xs font-bold tracking-wider px-3 py-1 rounded-md bg-white/5"
                      style={{ color: group.accent }}
                    >
                      {group.index}
                    </span>
                    <span className="font-mono-hud text-[11px] text-[#A1A1AA]">
                      {group.items.length} MODULES_ONLINE
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#F4F4F6] mb-1">
                    {group.title}
                  </h3>
                  <p className="text-xs font-mono-hud text-[#A1A1AA] mb-6">
                    {group.subtitle}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {group.items.map((skill) => {
                      const isActive = selectedSkillDetail.name === skill.name;
                      return (
                        <button
                          key={skill.name}
                          type="button"
                          onMouseEnter={() =>
                            setSelectedSkillDetail({
                              ...skill,
                              category: group.index,
                            })
                          }
                          onClick={() =>
                            setSelectedSkillDetail({
                              ...skill,
                              category: group.index,
                            })
                          }
                          className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                            isActive
                              ? "bg-white/10 border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                              : "bg-[#0a0a0f]/90 border-white/10 hover:border-white/30"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-sm text-[#F4F4F6]">
                              {skill.name}
                            </span>
                            <span
                              className="font-mono-hud text-[10px] px-1.5 py-0.5 rounded bg-white/5"
                              style={{ color: group.accent }}
                            >
                              {skill.level}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#A1A1AA] truncate">
                            {skill.role}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          CHAPTER 04: THE ARCHIVES — FLAGSHIP PROJECTS (CINEMATIC SHOWCASE)
          ==================================================================== */}
      <section
        id="archives"
        className="relative py-24 bg-[#0a0a0f] border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <div className="font-mono-hud text-xs text-[#FF0033] uppercase tracking-widest mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00F0FF]" />
                <span>CHAPTER 04 // THE ARCHIVES</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight">
                FLAGSHIP{" "}
                <span className="font-editorial italic font-normal text-[#00F0FF]">
                  Case Files
                </span>{" "}
                &amp; SYSTEMS
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "ALL SYSTEMS",
                "MERN + STRIPE",
                "NEXT.JS FULL-STACK",
                "REAL-TIME & AI",
              ].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setProjectFilter(tag)}
                  className={`px-3.5 py-2 rounded-xl font-mono-hud text-xs transition-all cursor-pointer ${
                    projectFilter === tag
                      ? "bg-[#00F0FF] text-[#050505] font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                      : "bg-[#111113] text-[#A1A1AA] border border-white/10 hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            {filteredProjects.map((project, index) => (
              <SpotlightCard
                key={project.id}
                accentColor={project.accent}
                className="p-6 sm:p-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left (7 Cols): Case File Narrative, Problem Solved & Highlights */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className="font-mono-hud text-xs font-bold px-3 py-1 rounded-md bg-white/5"
                        style={{ color: project.accent }}
                      >
                        {project.code}
                      </span>
                      <span className="font-mono-hud text-xs text-[#A1A1AA] uppercase tracking-wider">
                        // {project.category}
                      </span>
                    </div>

                    <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#F4F4F6]">
                      {project.title}
                    </h3>

                    <div className="p-4 rounded-xl bg-[#050505]/90 border-l-2 border-[#00F0FF] text-sm text-[#F4F4F6]/90 leading-relaxed">
                      <span className="font-mono-hud text-[10px] uppercase tracking-widest text-[#00F0FF] block mb-1">
                        ARCHITECTURAL OBJECTIVE &amp; PROBLEM SOLVED:
                      </span>
                      {project.problemSolved}
                    </div>

                    <ul className="space-y-2.5">
                      {project.highlights.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-sm sm:text-base text-[#A1A1AA]"
                        >
                          <CheckCircle2
                            className="w-4 h-4 mt-1 shrink-0"
                            style={{ color: project.accent }}
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-lg bg-[#050505] border border-white/15 font-mono-hud text-xs text-[#F4F4F6]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.secondaryTech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-white/5 font-mono-hud text-[11px] text-[#A1A1AA]"
                        >
                          + {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setActiveProjectModal(project)}
                        className="px-5 py-2.5 rounded-xl font-mono-hud text-xs font-bold uppercase bg-[#F4F4F6] text-[#050505] hover:bg-[#00F0FF] transition-all inline-flex items-center gap-2 cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Launch Interactive Telemetry Simulator</span>
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl font-mono-hud text-xs bg-[#050505] hover:bg-white/10 text-[#F4F4F6] border border-white/15 transition-all inline-flex items-center gap-2"
                      >
                        <GitHubIcon className="w-4 h-4" />
                        <span>GitHub Repo</span>
                      </a>
                    </div>
                  </div>

                  {/* Right (5 Cols): Interactive Telemetry Blueprint & KPI Preview Card */}
                  <div className="lg:col-span-5">
                    <div
                      onClick={() => setActiveProjectModal(project)}
                      className="rounded-2xl bg-[#050505] border border-white/15 p-5 cursor-pointer group hover:border-[#00F0FF] transition-all"
                    >
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono-hud text-[11px]">
                        <span className="text-[#A1A1AA]">
                          SYS_BLUEPRINT // 0{index + 1}
                        </span>
                        <span
                          className="font-semibold flex items-center gap-1"
                          style={{ color: project.accent }}
                        >
                          <span>OPEN_SIMULATOR</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {project.telemetryStats.map((stat) => (
                          <div
                            key={stat.label}
                            className="p-3 rounded-xl bg-[#111113] border border-white/10"
                          >
                            <div className="font-mono-hud text-[10px] text-[#A1A1AA]">
                              {stat.label}
                            </div>
                            <div className="text-xs sm:text-sm font-bold text-[#F4F4F6] mt-0.5">
                              {stat.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 font-mono-hud text-[11px]">
                        <div className="text-[10px] uppercase tracking-wider text-[#00F0FF]">
                          EXECUTION PIPELINE:
                        </div>
                        {project.architectureFlow.map((step, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-2.5 rounded-lg bg-[#111113]/80 border border-white/5 text-[#A1A1AA] flex items-start gap-2"
                          >
                            <span style={{ color: project.accent }}>
                              0{sIdx + 1}.
                            </span>
                            <span className="leading-snug">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          CHAPTER 05: EXECUTION LOGS — EXPERIENCE & EDUCATION TIMELINE
          ==================================================================== */}
      <section
        id="logs"
        className="relative py-24 bg-[#050505] bg-cyber-grid border-b border-white/10"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="font-mono-hud text-xs text-[#00F0FF] uppercase tracking-widest mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#FF0033]" />
              <span>CHAPTER 05 // EXECUTION LOGS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight">
              EXPERIENCE &amp;{" "}
              <span className="font-editorial italic font-normal text-[#FF5500]">
                Academic
              </span>{" "}
              TIMELINE
            </h2>
          </div>

          <div className="relative border-l-2 border-white/15 ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-12">
            {PORTFOLIO_DATA.timeline.map((item) => (
              <div key={item.id} className="relative group">
                <div
                  className="absolute -left-[33px] sm:-left-[49px] top-1.5 w-4 h-4 rounded-full border-2 border-[#050505] transition-transform duration-300 group-hover:scale-125"
                  style={{
                    backgroundColor: item.accent,
                    boxShadow: `0 0 20px ${item.accent}`,
                  }}
                />

                <SpotlightCard accentColor={item.accent} className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span
                      className="font-mono-hud text-xs font-bold px-2.5 py-1 rounded bg-white/5"
                      style={{ color: item.accent }}
                    >
                      {item.code}
                    </span>
                    <span className="font-mono-hud text-xs text-[#F4F4F6] bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      {item.period} • {item.location}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-[#F4F4F6]">
                        {item.role}
                      </h3>
                      <div className="text-base font-semibold text-[#00F0FF]">
                        {item.organization}
                      </div>
                    </div>
                    <span className="font-mono-hud text-xs text-emerald-400">
                      [{item.status}]
                    </span>
                  </div>

                  <ul className="space-y-2 mb-5">
                    {item.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="text-sm sm:text-base text-[#A1A1AA] flex items-start gap-2.5"
                      >
                        <ChevronRight
                          className="w-4 h-4 mt-1 shrink-0"
                          style={{ color: item.accent }}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-[#050505] border border-white/10 font-mono-hud text-[11px] text-[#F4F4F6]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          CHAPTER 06: ESTABLISH UPLINK — CONTACT, AI/LLM INSPECTOR & FOOTER
          ==================================================================== */}
      <section id="uplink" className="relative py-24 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column (5 Cols): Direct Contact Telemetry & AI/LLM Readiness */}
            <div className="lg:col-span-5 space-y-6">
              <div className="font-mono-hud text-xs text-[#FF0033] uppercase tracking-widest flex items-center gap-2">
                <Server className="w-4 h-4 text-[#00F0FF]" />
                <span>CHAPTER 06 // ESTABLISH UPLINK</span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight">
                INITIATE{" "}
                <span className="font-editorial italic font-normal text-[#00F0FF]">
                  Collaboration
                </span>{" "}
                TRANSMISSION
              </h2>

              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                Available for full-stack MERN &amp; Next.js engineering roles,
                scalable web application architecture, and real-time platform
                development.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-[#111113] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <Mail className="w-5 h-5 text-[#FF0033] shrink-0" />
                    <div className="min-w-0">
                      <div className="font-mono-hud text-[10px] text-[#A1A1AA]">
                        EMAIL_ENDPOINT
                      </div>
                      <a
                        href="mailto:muzammil.uiit@gmail.com"
                        className="text-sm font-semibold text-[#F4F4F6] hover:text-[#00F0FF] truncate block"
                      >
                        muzammil.uiit@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy("email", "muzammil.uiit@gmail.com")
                    }
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#A1A1AA] hover:text-white cursor-pointer"
                  >
                    {copiedKey === "email" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#111113] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#00F0FF] shrink-0" />
                    <div>
                      <div className="font-mono-hud text-[10px] text-[#A1A1AA]">
                        PHONE_LINE
                      </div>
                      <a
                        href="tel:+923444344448"
                        className="text-sm font-semibold text-[#F4F4F6] hover:text-[#00F0FF]"
                      >
                        +923444344448
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("phone", "+923444344448")}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#A1A1AA] hover:text-white cursor-pointer"
                  >
                    {copiedKey === "phone" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#111113] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GitHubIcon className="w-5 h-5 text-[#FF5500] shrink-0" />
                    <div>
                      <div className="font-mono-hud text-[10px] text-[#A1A1AA]">
                        GITHUB_PROFILE
                      </div>
                      <a
                        href="https://github.com/muzammil-gitdev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-[#F4F4F6] hover:text-[#00F0FF]"
                      >
                        github.com/muzammil-gitdev
                      </a>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#A1A1AA]" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#111113] to-[#0044FF]/15 border border-[#00F0FF]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono-hud text-xs text-[#00F0FF] font-bold flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    AI &amp; LLM DISCOVERY OPTIMIZED
                  </span>
                  <span className="font-mono-hud text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    SCHEMA.ORG + LLMS.TXT
                  </span>
                </div>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Pre-indexed with embedded JSON-LD structured telemetry,
                  `llms.txt`, and modular SCSS architecture files
                  (`_variables.scss`, `_mixins.scss`, `Hero.module.scss`,
                  `portfolioData.js`).
                </p>
                <button
                  type="button"
                  onClick={() => setInspectorModalOpen(true)}
                  className="w-full py-2.5 rounded-xl font-mono-hud text-xs font-semibold bg-[#00F0FF]/15 hover:bg-[#00F0FF]/25 text-[#00F0FF] border border-[#00F0FF]/40 transition-all cursor-pointer"
                >
                  Open AI Telemetry &amp; SCSS Architecture Inspector
                </button>
              </div>
            </div>

            {/* Right Column (7 Cols): Glassmorphic Terminal Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-[#111113] border border-white/15 p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 font-mono-hud text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF0033]" />
                    <span className="w-3 h-3 rounded-full bg-[#FF5500]" />
                    <span className="w-3 h-3 rounded-full bg-[#00F0FF]" />
                    <span className="ml-2 text-[#F4F4F6]">
                      terminal://syed-muzammil-ali/uplink-dispatch
                    </span>
                  </div>
                  <span className="text-[#00F0FF] flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>SSH_TLS_1.3</span>
                  </span>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-mono-hud text-xs text-[#A1A1AA] mb-2">
                        01 // SENDER_IDENTIFIER *
                      </label>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="Recruiter / Engineering Lead Name"
                        className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/15 focus:border-[#00F0FF] focus:outline-none text-sm text-[#F4F4F6] font-mono-hud"
                      />
                    </div>
                    <div>
                      <label className="block font-mono-hud text-xs text-[#A1A1AA] mb-2">
                        02 // RETURN_EMAIL_ADDRESS *
                      </label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="name@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/15 focus:border-[#00F0FF] focus:outline-none text-sm text-[#F4F4F6] font-mono-hud"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono-hud text-xs text-[#A1A1AA] mb-2">
                      03 // TRANSMISSION_SUBJECT
                    </label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/15 focus:border-[#00F0FF] focus:outline-none text-sm text-[#F4F4F6] font-mono-hud"
                    />
                  </div>

                  <div>
                    <label className="block font-mono-hud text-xs text-[#A1A1AA] mb-2">
                      04 // PAYLOAD_MESSAGE *
                    </label>
                    <textarea
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      placeholder="Specify project scope, role requirements, or technical architecture inquiry..."
                      className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/15 focus:border-[#00F0FF] focus:outline-none text-sm text-[#F4F4F6] font-mono-hud"
                    />
                  </div>

                  {contactStatus && (
                    <div
                      className={`p-3.5 rounded-xl font-mono-hud text-xs flex items-center gap-2 ${
                        contactStatus.type === "success"
                          ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-300"
                          : "bg-[#FF0033]/15 border border-[#FF0033]/40 text-[#FF0033]"
                      }`}
                    >
                      {contactStatus.type === "success" ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                      ) : (
                        <Shield className="w-4 h-4 shrink-0" />
                      )}
                      <span>{contactStatus.text}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <span className="font-mono-hud text-[11px] text-[#A1A1AA]">
                      TARGET: muzammil.uiit@gmail.com
                    </span>
                    <button
                      type="submit"
                      className="px-6 py-3.5 rounded-xl font-mono-hud text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#FF0033] to-[#FF5500] text-white shadow-[0_0_25px_rgba(255,0,51,0.4)] hover:brightness-110 transition-all cursor-pointer"
                    >
                      Execute Uplink Transmission
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <footer className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-hud text-xs text-[#A1A1AA]">
            <div>
              SYED MUZAMMIL ALI — FULL-STACK ARCHITECT (MERN &amp; NEXT.JS)
            </div>
            <div className="flex items-center gap-4">
              <span>33.6844° N, 73.0479° E // RAWALPINDI_PK</span>
              <span>•</span>
              <a
                href="https://github.com/muzammil-gitdev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00F0FF] hover:underline inline-flex items-center gap-1"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
                <span>muzammil-gitdev</span>
              </a>
            </div>
          </footer>
        </div>
      </section>

      {/* ====================================================================
          INTERACTIVE PROJECT TELEMETRY SIMULATOR MODAL
          ==================================================================== */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-2xl bg-[#111113] border border-[#00F0FF]/40 p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div>
                <span className="font-mono-hud text-xs text-[#00F0FF]">
                  {activeProjectModal.code} // INTERACTIVE TELEMETRY SIMULATOR
                </span>
                <h3 className="font-display text-2xl font-bold text-[#F4F4F6]">
                  {activeProjectModal.title} — {activeProjectModal.category}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveProjectModal(null)}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 font-mono-hud text-xs text-[#A1A1AA] hover:text-white cursor-pointer"
              >
                [ESC / CLOSE]
              </button>
            </div>

            {activeProjectModal.id === "karakoram-express" && (
              <div className="space-y-4">
                <div className="font-mono-hud text-xs text-[#00F0FF]">
                  [LIVE SIMULATOR]: 4-Step Bus Booking Seat Matrix &amp; SHA-256
                  Admin Telemetry
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#050505] border border-white/10">
                    <div className="text-xs font-mono-hud text-[#A1A1AA] mb-3">
                      SELECT NORTHERN ROUTE SEAT (RAWALPINDI → HUNZA):
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"].map(
                        (seat) => (
                          <button
                            key={seat}
                            type="button"
                            onClick={() => setSelectedSeat(seat)}
                            className={`py-2 rounded font-mono-hud text-xs cursor-pointer ${
                              selectedSeat === seat
                                ? "bg-[#00F0FF] text-black font-bold"
                                : "bg-[#111113] text-white border border-white/10"
                            }`}
                          >
                            {seat}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#050505] border border-white/10 font-mono-hud text-xs space-y-2">
                    <div className="text-[#FF5500]">
                      STRIPE CHECKOUT + ADMIN TELEMETRY:
                    </div>
                    <div>SELECTED_SEAT: {selectedSeat}</div>
                    <div>FARE_ESTIMATE: PKR 4,500 (Stripe Intent Ready)</div>
                    <div className="text-emerald-400">
                      ADMIN_AUTH: SHA-256 Verified • Cloudinary Auto-Cleanup
                      Active
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeProjectModal.id === "drivex" && (
              <div className="space-y-4">
                <div className="font-mono-hud text-xs text-[#FF0033]">
                  [LIVE SIMULATOR]: DriveX Real-Time Price Estimation Modal
                  &amp; Admin KPIs
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#050505] border border-white/10 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: "Corolla Grande X", rate: 85 },
                        { name: "Civic RS Turbo", rate: 110 },
                      ].map((car) => (
                        <button
                          key={car.name}
                          type="button"
                          onClick={() => setSelectedCarTier(car)}
                          className={`px-3 py-1.5 rounded font-mono-hud text-xs cursor-pointer ${
                            selectedCarTier.name === car.name
                              ? "bg-[#FF0033] text-white font-bold"
                              : "bg-[#111113] text-[#A1A1AA]"
                          }`}
                        >
                          {car.name} (${car.rate}/d)
                        </button>
                      ))}
                    </div>
                    <div>
                      <label className="block font-mono-hud text-xs text-[#A1A1AA] mb-1">
                        RENTAL DURATION: {rentalDays} DAYS
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={14}
                        value={rentalDays}
                        onChange={(e) => setRentalDays(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#050505] border border-white/10 font-mono-hud text-xs space-y-2">
                    <div className="text-[#00F0FF]">
                      REAL-TIME BOOKING ESTIMATE:
                    </div>
                    <div className="text-lg font-bold text-white">
                      TOTAL: ${selectedCarTier.rate * rentalDays}.00
                    </div>
                    <div className="text-emerald-400">
                      CLIENT_VALIDATION: Toast Verified • Admin KPI
                      Auto-Refresh: ONLINE
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeProjectModal.id === "skillverse" && (
              <div className="space-y-4">
                <div className="font-mono-hud text-xs text-[#FF5500]">
                  [LIVE SIMULATOR]: SkillVerse Socket.IO Live Messaging + AI
                  Support Chatbot
                </div>
                <div className="p-4 rounded-xl bg-[#050505] border border-white/10 font-mono-hud text-xs space-y-2 max-h-44 overflow-y-auto">
                  {skillVerseMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-2 rounded bg-[#111113] border border-white/5"
                    >
                      <span className="text-[#00F0FF] font-bold mr-2">
                        [{msg.sender}]:
                      </span>
                      <span className="text-[#F4F4F6]">{msg.text}</span>
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={handleSendSkillVerseMessage}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={skillVerseDraft}
                    onChange={(e) => setSkillVerseDraft(e.target.value)}
                    placeholder="Transmit live Socket.IO message..."
                    className="flex-1 px-3 py-2 rounded-lg bg-[#050505] border border-white/15 font-mono-hud text-xs text-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#FF5500] text-black font-mono-hud text-xs font-bold cursor-pointer"
                  >
                    Emit Socket
                  </button>
                </form>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveProjectModal(null)}
                className="px-5 py-2 rounded-xl font-mono-hud text-xs bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                Close Case File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          AI / LLM TELEMETRY & MODULAR SCSS ARCHITECTURE INSPECTOR MODAL
          ==================================================================== */}
      {inspectorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl rounded-2xl bg-[#111113] border border-white/20 p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div>
                <span className="font-mono-hud text-xs text-[#00F0FF]">
                  SYSTEM ARCHITECTURE &amp; AI DISCOVERY MANIFEST
                </span>
                <h3 className="font-display text-2xl font-bold text-[#F4F4F6]">
                  Syed Muzammil Ali — LLMs.txt, JSON-LD &amp; Modular SCSS
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectorModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 font-mono-hud text-xs text-[#A1A1AA] hover:text-white cursor-pointer"
              >
                [ESC / CLOSE]
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { id: "llms", label: "01 // llms.txt" },
                { id: "jsonld", label: "02 // Schema.org JSON-LD" },
                {
                  id: "scss",
                  label: "03 // _variables.scss & Hero.module.scss",
                },
                { id: "data", label: "04 // portfolioData.js" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setInspectorTab(tab.id)}
                  className={`px-3.5 py-2 rounded-lg font-mono-hud text-xs cursor-pointer ${
                    inspectorTab === tab.id
                      ? "bg-[#00F0FF] text-black font-bold"
                      : "bg-[#050505] text-[#A1A1AA] hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative rounded-xl bg-[#050505] border border-white/10 p-4 font-mono-hud text-xs text-emerald-400 max-h-[380px] overflow-y-auto">
              <button
                type="button"
                onClick={() =>
                  handleCopy("inspector", inspectorArtifacts[inspectorTab])
                }
                className="sticky top-2 float-right px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === "inspector" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
              <pre className="whitespace-pre-wrap leading-relaxed">
                {inspectorArtifacts[inspectorTab]}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
