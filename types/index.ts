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
}

export interface TableValueProps {
    rows: {
        cells: string[];
    }[];
}

export interface QuizValueProps {
    question: string;
    options: string[];
    correctAnswer: number;
}
