// Type definitions for the portfolio

export interface ProfileType {
    _id: string;
    fullName: string;
    headline: string;
    profileImage: {
        image: string;
        lqip: string;
        alt: string;
    };
    shortBio: string;
    email: string;
    fullBio: any[];
    location: string;
    resumeURL: string;
    og: string;
    usage: any[];
}

export interface JobType {
    _id: string;
    name: string;
    jobTitle: string;
    logo: string;
    url: string;
    description: string;
    startDate: string;
    endDate: string;
}

export interface ProjectType {
    _id: string;
    name: string;
    slug: string;
    tagline: string;
    projectUrl: string;
    repository: string;
    logo: string;
    coverImage: {
        image: string;
        alt: string | null;
        lqip: string;
    };
    techStack: string[];
    metrics: string;
    category: string;
    highlights: string[];
    fullDescription: string;
    impact: string;
    description: any[];
}

export interface PostType {
    _id: string;
    _createdAt: string;
    title: string;
    slug: string;
    description: string;
    tags: string[];
    coverImage: {
        image: string;
        lqip: string;
        alt: string | null;
    };
    featured: boolean;
    isPublished: boolean;
    body?: string;
    readingTime?: string;
}

export interface TableValueProps {
    caption?: string;
    table?: {
        rows: {
            cells: string[];
        }[];
    };
    rows: {
        cells: string[];
    }[];
}

export interface QuizValueProps {
    _key: string;
    question: string;
    answer: string;
    options: string[];
    correctAnswer: number;
}
