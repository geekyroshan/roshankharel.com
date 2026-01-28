export const profile = {
    _id: "profile",
    fullName: "Roshan Kharel",
    headline: "AI Engineer, Full Stack, MLOps",
    profileImage: {
        image: "https://github.com/geekyroshan.png", // Fallback to github profile picture
        lqip: "",
        alt: "Roshan Kharel",
    },
    shortBio: "I build scalable AI systems, machine learning infrastructure, and autonomous agentsw.",
    email: "contact@roshankharel.com",
    fullBio: [
        {
            _key: "1",
            _type: "block",
            children: [
                {
                    _key: "1",
                    _type: "span",
                    text: "I am a passionate AI Engineer and Full Stack Developer with a deep focus on building intelligent systems. From architecting MLOps pipelines to deploying autonomous AI agents, I love solving complex problems with cutting-edge technology.",
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
                    text: "Currently, I lead AI engineering at AlysAI and run my own automation agency, Sarathi Studio. My expertise spans across the entire stack - from React/Next.js frontends to PyTorch/TensorFlow models and Kubernetes deployments.",
                    marks: [],
                }
            ],
            markDefs: [],
            style: "normal"
        }
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
        description: "Leading AI agency in Dubai. Shipped 2 big enterprise projects: AI agents and a vision-aware live interactive avatar webapp for a client. Built an all-in-one real estate agent for a France-based company. Overseeing all AI & backend tasks.",
        startDate: "2026-01-01",
        endDate: "", // Present
    },
    {
        _id: "sarathi",
        name: "Sarathi Studio",
        jobTitle: "Founder",
        logo: "/experience/sarathi.png",
        url: "https://sarathi.studio",
        description: "Started Sarathi Studio, my own AI automation agency for local businesses. Already shipped multiple agents for local clients automation workflows.",
        startDate: "2025-12-01",
        endDate: "",
    },
    {
        _id: "fundora",
        name: "Fundora",
        jobTitle: "MLOps Engineer",
        logo: "/experience/fundora.png",
        url: "https://vest-fundora.com/",
        description: "Developed ML recommendation algorithm for startup founders matching. Built the core ML algo that runs Fundora now, handled all ML & backend tasks. Built reinforcement learning pipeline for the model to learn.",
        startDate: "2025-06-01",
        endDate: "2025-12-01",
    },
    {
        _id: "magicsquare",
        name: "MagicSquare",
        jobTitle: "Founding Engineer",
        logo: "https://magicsquare.io/favicon.ico",
        url: "https://magicsquare.io",
        description: "Architected technical backbone of a Web3-native community platform. Built and scaled on-chain community infrastructure using Discord bots and Web3 auth flows. Spearheaded growth from <10k to 190k+ users.",
        startDate: "2022-05-01",
        endDate: "2023-11-30",
    },
    {
        _id: "lunarcrush",
        name: "LunarCrush",
        jobTitle: "Technical Community Lead",
        logo: "https://lunarcrush.com/favicon.ico",
        url: "https://lunarcrush.com",
        description: "Contributed to early development of blockchain tools and community infrastructure. Integrated Discord bots and wallet auth.",
        startDate: "2021-10-21",
        endDate: "2022-11-30",
    },
    {
        _id: "xcelpay",
        name: "XcelPay Wallet",
        jobTitle: "Fullstack Intern",
        logo: "https://xcelpay.io/favicon.ico",
        url: "https://xcelpay.io",
        description: "Worked on the mobile wallet app and backend services. Assisted in integrating crypto payment gateways.",
        startDate: "2021-01-01",
        endDate: "2021-06-30",
    }
];

export const projects = [
    {
        _id: "fundora-rl",
        name: "Fundora RL Engine",
        slug: "fundora-rl",
        tagline: "Reinforcement Learning pipeline for startup-investor matching.",
        projectUrl: "https://vest-fundora.com/",
        repository: "",
        logo: "https://vest-fundora.com/favicon.ico",
        coverImage: {
            image: "",
            alt: "Fundora AI",
            lqip: "",
        },
        description: []
    },
    {
        _id: "sarathi-agents",
        name: "Sarathi Agents",
        slug: "sarathi-agents",
        tagline: "Suite of autonomous AI agents for local business automation.",
        projectUrl: "https://sarathi.studio",
        repository: "",
        logo: "https://sarathi.studio/favicon.ico",
        coverImage: {
            image: "",
            alt: "Sarathi AI",
            lqip: "",
        },
        description: []
    },
    {
        _id: "documit",
        name: "Documit",
        slug: "documit",
        tagline: "Generate legal documents in seconds using AI.",
        projectUrl: "https://documit.com",
        repository: "",
        logo: "",
        coverImage: { image: "", alt: "", lqip: "" },
        description: []
    },
    {
        _id: "ml-tracker",
        name: "ML Model Tracker",
        slug: "ml-tracker",
        tagline: "A minimal experiment tracker for ML models.",
        projectUrl: "",
        repository: "",
        logo: "",
        coverImage: { image: "", alt: "", lqip: "" },
        description: []
    }
];
