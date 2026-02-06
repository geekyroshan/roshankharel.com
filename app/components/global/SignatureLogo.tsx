"use client";

export default function SignatureLogo() {
    return (
        <div className="flex items-center gap-2 group">
            {/* Unique terminal/code icon */}
            <div className="relative">
                <svg
                    viewBox="0 0 32 32"
                    className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Background square with rounded corners */}
                    <rect
                        x="2"
                        y="2"
                        width="28"
                        height="28"
                        rx="6"
                        className="fill-zinc-900 dark:fill-white"
                    />
                    {/* Terminal prompt > */}
                    <path
                        d="M8 12L12 16L8 20"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="stroke-white dark:stroke-zinc-900"
                    />
                    {/* Cursor line _ */}
                    <path
                        d="M15 20H24"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className="stroke-violet-400 dark:stroke-violet-600"
                    />
                    {/* Blinking dot (accent) */}
                    <circle
                        cx="24"
                        cy="12"
                        r="2"
                        className="fill-pink-500 animate-pulse"
                    />
                </svg>
            </div>

            {/* Signature text */}
            <span className="font-headline text-xl font-bold tracking-tight">
                <span className="text-zinc-800 dark:text-white">geeky</span>
                <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                    roshan
                </span>
            </span>
        </div>
    );
}
