export const profile = {
    _id: "profile",
    fullName: "Roshan Kharel",
    headline: "AI Engineer, Full Stack, MLOps",
    profileImage: {
        image: "https://github.com/geekyroshan.png", // Fallback to github profile picture
        lqip: "",
        alt: "Roshan Kharel",
    },
    shortBio: "I build scalable AI systems, machine learning infrastructure, and autonomous agents.",
    email: "contact@roshankharel.com",
    fullBio: [
        {
            _key: "1",
            _type: "block",
            children: [
                {
                    _key: "1",
                    _type: "span",
                    text: "I'm an AI Engineer and founder who builds intelligent systems that ship to production and serve real users. I specialize in the full lifecycle of AI -- from training and fine-tuning models to deploying them at scale with robust MLOps infrastructure. Whether it's an enterprise RAG pipeline with zero-hallucination guarantees or a 14-billion parameter avatar model running on a GPU cluster, I care about one thing: does it work for the people who use it?",
                    marks: [],
                },
            ],
            markDefs: [],
            style: "normal",
        },
        {
            _key: "2",
            _type: "block",
            children: [
                {
                    _key: "1",
                    _type: "span",
                    text: "My path to AI started in Web3. As a founding engineer at MagicSquare, I architected the technical backbone of a community platform and helped scale it from under 10,000 users to over 190,000. That experience taught me how to build systems that handle real-world traffic and messy user behavior -- lessons that transferred directly when I moved into machine learning and AI engineering.",
                    marks: [],
                },
            ],
            markDefs: [],
            style: "normal",
        },
        {
            _key: "3",
            _type: "block",
            children: [
                {
                    _key: "1",
                    _type: "span",
                    text: "Today, I lead AI engineering at AlysAI, a Dubai-based AI agency where I've shipped enterprise-grade projects including autonomous AI agents and LiveAvatar -- a real-time interactive avatar system powered by Alibaba's WanS2V-14B diffusion model, deployed across 5x H800 GPUs. In parallel, I founded Sarathi Studio, my own automation agency that builds AI-powered solutions for local businesses, helping them compete in a world increasingly shaped by intelligent software.",
                    marks: [],
                },
            ],
            markDefs: [],
            style: "normal",
        },
        {
            _key: "4",
            _type: "block",
            children: [
                {
                    _key: "1",
                    _type: "span",
                    text: "On the technical side, I work daily with PyTorch, Kubernetes, and the modern MLOps stack. I've built reinforcement learning pipelines that power production recommendation engines (Fundora), designed RAG architectures with 333+ passing tests and OWASP-compliant security (Aya KB), and trained RL agents that outperform baseline strategies by 80%. I'm comfortable across the entire stack -- React and Next.js on the frontend, FastAPI and distributed systems on the backend, and deep learning frameworks for everything in between.",
                    marks: [],
                },
            ],
            markDefs: [],
            style: "normal",
        },
        {
            _key: "5",
            _type: "block",
            children: [
                {
                    _key: "1",
                    _type: "span",
                    text: "What drives me most is making AI accessible to people and communities that are usually left behind. VisionSathi, my offline-first visual assistant, runs a 2B parameter model directly on mobile devices to help blind users navigate the world without needing internet access. Sarathi Voice Agent serves 31 million citizens in Northeast India by helping them navigate government services in their native languages -- Assamese, Bodo, Hindi, and English. I believe the most meaningful AI work happens not in research labs, but in the hands of the people who need it most.",
                    marks: [],
                },
            ],
            markDefs: [],
            style: "normal",
        },
    ],
    location: "India",
    resumeURL: "/resume.pdf", // Assumption, needs to be verified or updated
    og: "",
    usage: [],
};

export const jobs = [
    {
        _id: "alysai",
        name: "AlysAI",
        jobTitle: "Lead AI Engineer",
        logo: "/experience/allysai.png",
        url: "https://www.allysai.com/",
        description: "Leading AI engineering at a Dubai-based agency, shipping enterprise-grade products end-to-end. Built LiveAvatar, a real-time interactive avatar system using Alibaba's 14B WanS2V model deployed across 5x H800 GPUs at 20 FPS. Developed autonomous AI agents for a France-based real estate company handling property matching, document analysis, and client communication. Own the full AI and backend stack across all client projects.",
        startDate: "2026-01-01",
        endDate: "", // Present
    },
    {
        _id: "sarathi",
        name: "Sarathi Studio",
        jobTitle: "Founder",
        logo: "/experience/sarathi.png",
        url: "https://sarathi.studio",
        description: "Founded an AI automation agency focused on making intelligent software accessible to local businesses. Shipped voice-powered customer service agents, automated lead qualification systems, and WhatsApp-based market monitoring tools. Building the Sarathi Voice Agent to help 31M citizens in Northeast India navigate government services in Assamese and Bodo.",
        startDate: "2025-12-01",
        endDate: "",
    },
    {
        _id: "fundora",
        name: "Fundora",
        jobTitle: "MLOps Engineer",
        logo: "/experience/fundora.png",
        url: "https://vest-fundora.com/",
        description: "Built the core ML recommendation engine that powers Fundora's startup-investor matching platform. Designed and trained a reinforcement learning pipeline using PPO that learns from meeting outcomes and deal closures to continuously improve match quality. Handled the full ML lifecycle from data pipelines and model training to production deployment with FastAPI, PostgreSQL, and Redis.",
        startDate: "2025-06-01",
        endDate: "2025-12-01",
    },
    {
        _id: "magicsquare",
        name: "MagicSquare",
        jobTitle: "Founding Engineer",
        logo: "https://magicsquare.io/favicon.ico",
        url: "https://magicsquare.io",
        description: "Founding engineer at a Web3-native community platform. Architected the technical backbone including on-chain community infrastructure, Discord bot integrations, and Web3 authentication flows. Spearheaded growth from under 10,000 to over 190,000 users. Built scalable systems that handled real-world traffic spikes and complex user behavior patterns.",
        startDate: "2022-05-01",
        endDate: "2023-11-30",
    },
    {
        _id: "lunarcrush",
        name: "LunarCrush",
        jobTitle: "Technical Community Lead",
        logo: "https://lunarcrush.com/favicon.ico",
        url: "https://lunarcrush.com",
        description: "Led technical community initiatives for a social intelligence platform tracking crypto sentiment. Built Discord bot integrations for real-time social analytics, implemented wallet-based authentication flows, and contributed to blockchain tooling used by thousands of community members.",
        startDate: "2021-10-21",
        endDate: "2022-11-30",
    },
    {
        _id: "xcelpay",
        name: "XcelPay Wallet",
        jobTitle: "Fullstack Intern",
        logo: "https://xcelpay.io/favicon.ico",
        url: "https://xcelpay.io",
        description: "Contributed to the development of a multi-currency crypto wallet application. Worked on React Native mobile frontend and Node.js backend services, integrated crypto payment gateways, and assisted with transaction processing and wallet management features.",
        startDate: "2021-01-01",
        endDate: "2021-06-30",
    }
];

export const projects = [
    {
        _id: "visionsathi",
        name: "VisionSathi",
        slug: "visionsathi",
        tagline: "Offline-first AI assistant for blind users. On-device Moondream 3 (2B params) runs without internet.",
        projectUrl: "https://github.com/geekyroshan/visionsathi",
        repository: "https://github.com/geekyroshan/visionsathi",
        logo: "/projects/visionsathi.svg",
        coverImage: {
            image: "/projects/visionsathi.svg",
            alt: "VisionSathi - AI Visual Assistant",
            lqip: "",
        },
        techStack: ["React Native", "Expo", "ONNX Runtime", "Moondream 3", "FastAPI", "Zustand"],
        metrics: "WCAG AAA compliant | 7:1 contrast ratio | 46% complete",
        category: "Accessibility AI",
        highlights: [
            "On-device inference with quantized 2B parameter Moondream 3 model",
            "WCAG AAA compliant with 7:1 contrast ratio for maximum accessibility",
            "Multiple interaction modes: Quick Tap, Conversation, OCR, Navigation",
            "Cloud fallback after 5s timeout ensures reliability",
            "Full VoiceOver (iOS) and TalkBack (Android) support"
        ],
        fullDescription: "VisionSathi ('Vision Friend' in Hindi) is an offline-first visual assistant designed specifically for blind and visually impaired users. The app runs a quantized Moondream 3 vision-language model directly on mobile devices, enabling users to understand their visual environment without requiring internet connectivity. Features include instant scene description, text reading (OCR), and obstacle detection with directional guidance.",
        impact: "Designed to help millions of visually impaired users in India gain independence through AI-powered visual assistance.",
        description: []
    },
    {
        _id: "live-avatar",
        name: "LiveAvatar",
        slug: "live-avatar",
        tagline: "Real-time streaming avatar generation at 20 FPS. 14B parameter diffusion model deployed on 5x H800 GPUs.",
        projectUrl: "https://github.com/geekyroshan/avatar-alibaba",
        repository: "https://github.com/geekyroshan/avatar-alibaba",
        logo: "/projects/liveavatar.svg",
        coverImage: {
            image: "/projects/liveavatar.svg",
            alt: "LiveAvatar - Interactive AI Avatars",
            lqip: "",
        },
        techStack: ["PyTorch", "WanS2V-14B", "Diffusers", "DeepSpeed", "Gradio", "CUDA 12.4"],
        metrics: "1000+ GitHub stars | #1 HuggingFace Paper | 10,000+ sec video generation",
        category: "Generative AI",
        highlights: [
            "14B parameter WanS2V diffusion model for photorealistic avatar generation",
            "Real-time streaming at 20 FPS using 5x H800 GPU cluster",
            "Supports 10,000+ seconds of continuous video generation",
            "4-step sampling optimization with LoRA fine-tuning",
            "Apache 2.0 licensed with open model weights on HuggingFace"
        ],
        fullDescription: "LiveAvatar is an advanced AI system developed in collaboration with Alibaba Group that generates real-time, streaming, infinitely-long interactive avatar videos driven by audio input. The system uses a 14-billion parameter diffusion model (WanS2V-14B) to create convincing animated characters that respond naturally to speech. Deployed on a 5x H800 GPU cluster, it achieves 20 FPS output for production-grade avatar experiences.",
        impact: "Ranked #1 on HuggingFace Papers with 1000+ GitHub stars. Enables next-generation human-AI interaction for enterprise clients.",
        description: []
    },
    {
        _id: "aya-kb",
        name: "Aya Knowledge Base",
        slug: "aya-kb",
        tagline: "Enterprise RAG with zero hallucinations. Every answer traceable to source with provenance scores.",
        projectUrl: "https://github.com/geekyroshan/aya-kb",
        repository: "https://github.com/geekyroshan/aya-kb",
        logo: "/projects/aya-kb.svg",
        coverImage: {
            image: "/projects/aya-kb.svg",
            alt: "Aya Knowledge Base - Enterprise RAG",
            lqip: "",
        },
        techStack: ["FastAPI", "Pinecone", "OpenAI", "Docling", "PostgreSQL", "Celery", "Redis"],
        metrics: "333+ tests passing | 16,000+ lines | OWASP Top 10 secured | <0.3 hallucination threshold",
        category: "Enterprise RAG",
        highlights: [
            "Zero-hallucination guarantee with grounding scores and source provenance",
            "OWASP Top 10 security compliant with JWT auth and rate limiting",
            "Advanced document processing with PII detection and auto-redaction",
            "Complete audit trail for compliance and decision tracking",
            "Webhook integrations with HMAC-SHA256 signing"
        ],
        fullDescription: "Aya Knowledge Base is a production-grade RAG (Retrieval-Augmented Generation) backend designed for enterprise decision-making systems. It transforms raw documents into a searchable intelligence layer where every answer is traceable back to source material with provenance scores. The system includes hallucination detection (threshold <0.3), automatic PII redaction, document approval workflows, and complete audit logging for compliance.",
        impact: "333+ tests passing, 16,000+ lines of production code. Built for executive briefings, compliance reporting, and mission-critical decision tracking.",
        description: []
    },
    {
        _id: "sarathi-voice",
        name: "Sarathi Voice Agent",
        slug: "sarathi-voice",
        tagline: "Multilingual voice assistant for NE India. Helps 31M citizens navigate govt services in Assamese & Bodo.",
        projectUrl: "https://sarathi.studio",
        repository: "",
        logo: "/projects/sarathi-voice.svg",
        coverImage: {
            image: "/projects/sarathi-voice.svg",
            alt: "Sarathi Voice Agent",
            lqip: "",
        },
        techStack: ["FastAPI", "faster-whisper", "Bhashini TTS", "LangChain", "Qdrant", "React Native"],
        metrics: "Target: <500ms latency | 10+ govt services | Kiosk + Mobile + WhatsApp",
        category: "Conversational AI",
        highlights: [
            "Multilingual support for Assamese, Bodo, Hindi, and English",
            "Sub-500ms response latency for natural conversations",
            "Hybrid TTS combining pre-recorded phrases with Bhashini API",
            "Multi-channel: Kiosk, Mobile App, WhatsApp, and IVR",
            "Knowledge base covering 10+ critical government services"
        ],
        fullDescription: "Sarathi Voice Agent is an AI-powered voice assistant designed to help citizens in Northeast India navigate complex government services. The system functions as a multilingual, human-like voice bot that guides people through bureaucratic processes in their native languages. It reduces the average 5-7 government office visits to 1-2 visits by providing accurate, accessible information through natural voice conversations.",
        impact: "Designed to serve 31M+ citizens in Assam. Deployed across kiosks, mobile apps, WhatsApp, and toll-free IVR lines.",
        description: []
    },
    {
        _id: "uidai-analytics",
        name: "Aadhaar Intelligence",
        slug: "uidai-analytics",
        tagline: "National-scale identity analytics for 1.4B citizens. Benford's Law fraud detection + demand forecasting.",
        projectUrl: "https://github.com/geekyroshan/uidai-hackathon",
        repository: "https://github.com/geekyroshan/uidai-hackathon",
        logo: "/projects/uidai.svg",
        coverImage: {
            image: "/projects/uidai.svg",
            alt: "UIDAI Hackathon Analytics",
            lqip: "",
        },
        techStack: ["Pandas", "Dask", "XGBoost", "Prophet", "Streamlit", "Plotly", "Folium"],
        metrics: "Hackathon project | Predicts biometric demand years ahead | Mobile unit optimizer",
        category: "Data Science",
        highlights: [
            "Benford's Law analysis for fraud and anomaly detection",
            "Prophet-based demand forecasting for biometric updates",
            "Digital Inclusion Index to identify underserved regions",
            "Mobile unit recommender for optimal geographic deployment",
            "Interactive Streamlit dashboard with Folium maps"
        ],
        fullDescription: "The Aadhaar Ecosystem Intelligence Platform is a comprehensive analytics system built for the UIDAI Hackathon. It analyzes enrollment patterns, demographic trends, and service optimization opportunities within India's 1.4B citizen identity database. Features include Benford's Law fraud detection, future biometric demand prediction, and a Digital Inclusion Index that identifies populations falling through coverage gaps.",
        impact: "Enables data-driven staffing recommendations, mobile unit optimization, and evidence-based policy decisions for India's national identity infrastructure.",
        description: []
    },
    {
        _id: "ai-portfolio",
        name: "RL Portfolio Optimizer",
        slug: "ai-portfolio",
        tagline: "Deep reinforcement learning for portfolio allocation. PPO agent achieving 84.6% CAGR vs 47.1% baseline.",
        projectUrl: "https://github.com/geekyroshan/ai-portfolio-optimizer",
        repository: "https://github.com/geekyroshan/ai-portfolio-optimizer",
        logo: "/projects/portfolio-rl.svg",
        coverImage: {
            image: "/projects/portfolio-rl.svg",
            alt: "AI Portfolio Optimizer",
            lqip: "",
        },
        techStack: ["PyTorch", "Stable-Baselines3", "Gymnasium", "yfinance", "TensorBoard"],
        metrics: "1.33 Sharpe ratio | 50 features/asset | Multi-asset: AAPL, BTC, ETH, TSLA, SPY",
        category: "Reinforcement Learning",
        highlights: [
            "PPO (Proximal Policy Optimization) agent for portfolio allocation",
            "50 technical features per asset including SMA, EMA, RSI, volatility",
            "Trained on 2018-2024 historical data across crypto and stocks",
            "84.6% CAGR vs 47.1% equal-weight baseline (+80% outperformance)",
            "1.33 Sharpe ratio with TensorBoard monitoring"
        ],
        fullDescription: "This project uses deep reinforcement learning to optimize multi-asset portfolio allocation. A PPO agent learns to dynamically allocate capital across tech stocks (AAPL, TSLA), cryptocurrencies (BTC, ETH), and ETFs (SPY) based on 50 technical features per asset. The system significantly outperforms traditional equal-weight strategies through learned market timing and risk management.",
        impact: "Achieved 84.6% CAGR with 1.33 Sharpe ratio, outperforming the equal-weight baseline by 80%. Demonstrates practical application of RL in quantitative finance.",
        description: []
    },
    {
        _id: "fundora-rl",
        name: "Fundora RL Engine",
        slug: "fundora-rl",
        tagline: "Reinforcement learning pipeline powering startup-investor matching at scale.",
        projectUrl: "https://vest-fundora.com/",
        repository: "",
        logo: "/projects/fundora.svg",
        coverImage: {
            image: "/projects/fundora.svg",
            alt: "Fundora AI",
            lqip: "",
        },
        techStack: ["PyTorch", "FastAPI", "PostgreSQL", "Redis"],
        metrics: "Production system | Powers Fundora matching",
        category: "Production ML",
        highlights: [
            "RL-based matching algorithm for startup-investor pairing",
            "Learns from feedback: meetings, follow-ups, and deal closures",
            "State representation includes founder profiles and interaction history",
            "Reward signal based on successful matches and conversions",
            "Production system powering vest-fundora.com"
        ],
        fullDescription: "The Fundora RL Engine is a production reinforcement learning system that powers startup-investor matching at scale. The agent learns optimal matching policies by observing the outcomes of introductions (meetings booked, deals closed) and continuously improves its recommendations. This is the core ML algorithm that runs Fundora's matching platform.",
        impact: "Powers the live matching engine at vest-fundora.com. Continuously learning from real-world feedback to improve match quality.",
        description: []
    },
    {
        _id: "jobhunt-agent",
        name: "JobHunt AI Agent",
        slug: "jobhunt-agent",
        tagline: "Autonomous founder outreach system. Discovers AI/ML companies, researches, and generates personalized emails.",
        projectUrl: "https://github.com/geekyroshan/jobhunt-agent",
        repository: "https://github.com/geekyroshan/jobhunt-agent",
        logo: "/projects/jobhunt.svg",
        coverImage: {
            image: "/projects/jobhunt.svg",
            alt: "JobHunt AI Agent",
            lqip: "",
        },
        techStack: ["FastAPI", "Next.js 14", "Playwright", "Ollama", "Gmail API", "SQLite"],
        metrics: "Full CRM dashboard | Lead scoring | Multi-channel outreach",
        category: "AI Agents",
        highlights: [
            "Google Maps scraping for AI/ML company discovery",
            "Deep research: tech stack, funding status, recent news",
            "Ollama-powered personalized email generation",
            "Multi-channel outreach: Email, LinkedIn, Twitter",
            "Full CRM dashboard with follow-up automation"
        ],
        fullDescription: "JobHunt AI Agent is an intelligent founder outreach system that automates the process of discovering high-potential AI/ML companies and generating personalized outreach. The system scrapes Google Maps for company discovery, performs deep research on each lead (tech stack, funding, news), scores leads for fit, and generates context-aware personalized emails using a local Ollama LLM.",
        impact: "Automates the entire outreach pipeline from discovery to follow-up, bypassing traditional job portals for direct founder connections.",
        description: []
    },
    {
        _id: "resume-weaver",
        name: "Resume Weaver",
        slug: "resume-weaver",
        tagline: "AI resume tailoring that preserves your truth. Rewrites bullets for job fit without fabricating experience.",
        projectUrl: "https://resume-weaver.vercel.app",
        repository: "https://github.com/geekyroshan/resume-weaver",
        logo: "/projects/resume-weaver.svg",
        coverImage: {
            image: "/projects/resume-weaver.svg",
            alt: "Resume Weaver",
            lqip: "",
        },
        techStack: ["React 18", "TypeScript", "Vite", "OpenAI", "pdfjs-dist", "TanStack Query"],
        metrics: "Keyword gap analysis | Cover letter generation | PDF export with original styling",
        category: "Productivity AI",
        highlights: [
            "PDF parsing that preserves original resume structure",
            "AI rewrites bullets for job fit without fabricating experience",
            "Keyword gap analysis: matched, insertable, and missing keywords",
            "Personalized cover letter generation",
            "PDF export maintaining original visual styling"
        ],
        fullDescription: "Resume Weaver is an AI-powered resume tailoring tool that automatically customizes resumes for specific job applications while maintaining strict ethical constraints. The system never invents new experiences or changes dates - it only rewrites existing bullet points to better align with job requirements. Features include keyword gap analysis showing which skills are matched, can be inserted, or are missing.",
        impact: "Helps job seekers optimize their applications while maintaining authenticity. Live at resume-weaver.vercel.app",
        description: []
    },
    {
        _id: "youtube-recsys",
        name: "YouTube RecSys",
        slug: "youtube-recsys",
        tagline: "Collaborative filtering with Matrix Factorization + BPR. Explains recommendations with 'Because you watched'.",
        projectUrl: "https://github.com/geekyroshan/youtube-recommendation-system",
        repository: "https://github.com/geekyroshan/youtube-recommendation-system",
        logo: "/projects/youtube-rec.svg",
        coverImage: {
            image: "/projects/youtube-rec.svg",
            alt: "YouTube Recommendation System",
            lqip: "",
        },
        techStack: ["PyTorch", "Streamlit", "BPR Loss", "MovieLens-100K"],
        metrics: "128-dim embeddings | Popularity blending | Recall@K evaluation",
        category: "Recommendation Systems",
        highlights: [
            "Matrix Factorization with BPR (Bayesian Personalized Ranking) loss",
            "128-dimensional user and item embeddings",
            "Explainable recommendations with 'Because you watched' feature",
            "Adjustable popularity blending for discovery vs relevance",
            "Interactive Streamlit UI with Recall@K evaluation"
        ],
        fullDescription: "A collaborative filtering recommendation engine using Matrix Factorization with Bayesian Personalized Ranking (MF-BPR). The system learns user and item embeddings from interaction data and provides explainable recommendations by showing which previously watched items drove each suggestion. Trained on MovieLens-100K with a Streamlit web interface for exploration.",
        impact: "Demonstrates production-ready recommendation system with explainability - a key differentiator for user trust.",
        description: []
    },
    {
        _id: "mcp-lost-found",
        name: "MCP Lost & Found",
        slug: "mcp-lost-found",
        tagline: "Hyper-local community registry for 2-3km neighborhoods. Built for MCP 1st Birthday Hackathon.",
        projectUrl: "https://huggingface.co/spaces/geekyroshan/mcp-lost-found",
        repository: "https://github.com/geekyroshan/mcp-lost-found",
        logo: "/projects/mcp-lf.svg",
        coverImage: {
            image: "/projects/mcp-lf.svg",
            alt: "MCP Lost & Found",
            lqip: "",
        },
        techStack: ["Python", "Gradio 6", "MCP Protocol", "SQLite", "HuggingFace Spaces"],
        metrics: "Agent-friendly tools | Location blinding | Semantic item matching",
        category: "Hackathon Project",
        highlights: [
            "MCP Protocol tools for agent integration (report_found, search_lost)",
            "Location blinding: coordinates hidden until pickup confirmed",
            "Semantic item matching with optional embeddings",
            "Verified pickup flow with daily statistics",
            "Live demo on HuggingFace Spaces"
        ],
        fullDescription: "MCP Lost & Found is a hyper-local community registry designed for 2-3km radius neighborhoods. Built for the MCP 1st Birthday Hackathon (Track 2 - MCP in Action), it connects finders and seekers through MCP-compatible tools that AI agents can invoke. Features privacy-first design with location blinding until pickup is confirmed.",
        impact: "Demonstrates practical MCP integration for community tools. Enables AI agents to autonomously help neighbors recover lost items.",
        description: []
    },
    {
        _id: "whatsapp-scraper",
        name: "WhatsApp Market Monitor",
        slug: "whatsapp-scraper",
        tagline: "Real-time message capture system for premium watch marketplace. Webhooks + Google Sheets pipeline.",
        projectUrl: "",
        repository: "",
        logo: "/projects/whatsapp.svg",
        coverImage: {
            image: "/projects/whatsapp.svg",
            alt: "WhatsApp Market Monitor",
            lqip: "",
        },
        techStack: ["FastAPI", "WAHA", "Google Sheets API", "SQLite", "Docker"],
        metrics: "10 concurrent workers | Rate-limited batch writes | Contact discovery",
        category: "Data Engineering",
        highlights: [
            "WAHA headless WhatsApp client with NOWEB engine",
            "10 concurrent workers for high-throughput processing",
            "Rate-limited batch writes respecting Google Sheets API quotas",
            "Automatic contact discovery and group member tracking",
            "Dead letter queue for robust error recovery"
        ],
        fullDescription: "WhatsApp Market Monitor is a real-time message capture system built for a premium watch trading marketplace. It monitors WhatsApp group messages via webhooks from a WAHA container, processes them through a FastAPI backend with 10 concurrent workers, and stores structured data in Google Sheets. Includes SQLite deduplication, LID resolution for phone numbers, and graceful error handling.",
        impact: "Enables market intelligence gathering from WhatsApp communities with production-grade reliability and data integrity.",
        description: []
    }
];
