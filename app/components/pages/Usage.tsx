"use client";

import { BiCodeAlt, BiServer, BiChip, BiCloud, BiTerminal, BiPalette } from "react-icons/bi";

// Static usage data
const usageData = {
  development: {
    title: "Development",
    icon: BiCodeAlt,
    items: [
      { name: "VS Code + Cursor", description: "Primary code editors" },
      { name: "Next.js / React", description: "Frontend frameworks" },
      { name: "TypeScript", description: "Type-safe JavaScript" },
      { name: "TailwindCSS", description: "Utility-first CSS" },
    ]
  },
  ai_ml: {
    title: "AI / ML",
    icon: BiChip,
    items: [
      { name: "PyTorch / TensorFlow", description: "Deep learning frameworks" },
      { name: "LangChain / LlamaIndex", description: "LLM orchestration" },
      { name: "HuggingFace", description: "Model hub & transformers" },
      { name: "Weights & Biases", description: "Experiment tracking" },
    ]
  },
  infrastructure: {
    title: "Infrastructure",
    icon: BiServer,
    items: [
      { name: "Docker / Kubernetes", description: "Container orchestration" },
      { name: "AWS / GCP", description: "Cloud platforms" },
      { name: "Vercel / Railway", description: "Deployment platforms" },
      { name: "PostgreSQL / Redis", description: "Databases" },
    ]
  },
  tools: {
    title: "Tools",
    icon: BiTerminal,
    items: [
      { name: "Git / GitHub", description: "Version control" },
      { name: "Notion", description: "Documentation & planning" },
      { name: "Figma", description: "Design & prototyping" },
      { name: "Linear", description: "Project management" },
    ]
  }
};

export default function Usage() {
  return (
    <section className="max-w-7xl">
      <div className="mb-10">
        <h2 className="text-4xl mb-3 font-bold font-headline tracking-tight">Tech Stack</h2>
        <p className="dark:text-zinc-400 text-zinc-600 max-w-xl text-lg">
          Tools, technologies and frameworks I use to build intelligent systems.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {Object.values(usageData).map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.title}
              className="group p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                  <Icon className="text-2xl text-zinc-600 dark:text-zinc-400" />
                </div>
                <h3 className="text-xl font-bold font-headline">{category.title}</h3>
              </div>

              <ul className="space-y-3">
                {category.items.map((item) => (
                  <li key={item.name} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2.5 shrink-0" />
                    <div>
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.name}</span>
                      <span className="text-zinc-500 dark:text-zinc-500 ml-2 text-sm">— {item.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
