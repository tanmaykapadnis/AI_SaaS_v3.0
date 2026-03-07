import React from 'react';
import { SquarePen, Hash, Image, Eraser, Scissors, FileText } from 'lucide-react';

const tools = [
  {
    title: "Article Writer",
    desc: "Generate long-form articles with AI logic and structure.",
    icon: SquarePen,
    color: "from-violet-500/20 to-violet-500/5",
    accent: "text-violet-400",
    mockup: (
      <div className="space-y-2 opacity-40 group-hover:opacity-60 transition-opacity">
        <div className="h-2 w-3/4 bg-violet-400/30 rounded" />
        <div className="h-2 w-full bg-violet-400/20 rounded" />
        <div className="h-2 w-5/6 bg-violet-400/20 rounded" />
        <div className="h-2 w-2/3 bg-violet-400/30 rounded" />
      </div>
    )
  },
  {
    title: "Blog Titles",
    desc: "Catchy, SEO-friendly titles for your next viral post.",
    icon: Hash,
    color: "from-blue-500/20 to-blue-500/5",
    accent: "text-blue-400",
    mockup: (
      <div className="space-y-3 opacity-40 group-hover:opacity-60 transition-opacity">
        <div className="h-4 w-full border border-blue-400/20 rounded-md flex items-center px-2">
          <div className="h-1 w-1/2 bg-blue-400/30 rounded" />
        </div>
        <div className="h-4 w-full border border-blue-400/20 rounded-md flex items-center px-2">
          <div className="h-1 w-2/3 bg-blue-400/30 rounded" />
        </div>
        <div className="h-4 w-full border border-blue-400/20 rounded-md flex items-center px-2">
          <div className="h-1 w-3/4 bg-blue-400/30 rounded" />
        </div>
      </div>
    )
  },
  {
    title: "Image Generation",
    desc: "Turn your text descriptions into stunning visuals.",
    icon: Image,
    color: "from-emerald-500/20 to-emerald-500/5",
    accent: "text-emerald-400",
    mockup: (
      <div className="grid grid-cols-2 gap-2 opacity-40 group-hover:opacity-60 transition-opacity">
        <div className="aspect-square bg-emerald-400/10 border border-emerald-400/20 rounded-lg flex items-center justify-center">
            <Image className="w-4 h-4 text-emerald-400/30" />
        </div>
        <div className="aspect-square bg-emerald-400/15 border border-emerald-400/20 rounded-lg" />
        <div className="aspect-square bg-emerald-400/5 border border-emerald-400/20 rounded-lg" />
        <div className="aspect-square bg-emerald-400/20 border border-emerald-400/20 rounded-lg" />
      </div>
    )
  },
  {
    title: "Remove Background",
    desc: "Instantly isolate subjects with pro-level precision.",
    icon: Eraser,
    color: "from-orange-500/20 to-orange-500/5",
    accent: "text-orange-400",
    mockup: (
      <div className="relative h-20 w-full overflow-hidden rounded-lg border border-orange-400/20 opacity-40 group-hover:opacity-60 transition-opacity">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=200&auto=format&fit=crop')] bg-cover opacity-30" />
        <div className="absolute top-0 right-0 bottom-0 left-1/2 bg-orange-500/20 backdrop-blur-sm border-l border-white/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border border-orange-400" />
      </div>
    )
  },
  {
    title: "Remove Object",
    desc: "Clean up photos by removing unwanted elements.",
    icon: Scissors,
    color: "from-pink-500/20 to-pink-500/5",
    accent: "text-pink-400",
    mockup: (
      <div className="relative h-20 w-full rounded-lg border border-dashed border-pink-400/30 flex items-center justify-center opacity-40 group-hover:opacity-60 transition-opacity">
        <div className="w-10 h-10 rounded-full bg-pink-400/10 border border-pink-400/30 scale-125 animate-pulse" />
        <Scissors className="absolute w-4 h-4 text-pink-400 translate-x-4 -translate-y-4" />
      </div>
    )
  },
  {
    title: "Resume Review",
    desc: "AI-powered feedback to land your dream job offer.",
    icon: FileText,
    color: "from-cyan-500/20 to-cyan-500/5",
    accent: "text-cyan-400",
    mockup: (
      <div className="p-3 border border-bottom-0 border-cyan-400/20 rounded-t-xl bg-cyan-400/5 space-y-2 opacity-40 group-hover:opacity-60 transition-opacity">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border border-cyan-400/40 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            </div>
            <div className="h-1 w-1/2 bg-cyan-400/30 rounded" />
        </div>
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border border-cyan-400/20" />
            <div className="h-1 w-2/3 bg-cyan-400/10 rounded" />
        </div>
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border border-cyan-400/40 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            </div>
            <div className="h-1 w-1/3 bg-cyan-400/30 rounded" />
        </div>
      </div>
    )
  }
];

const Features = () => {
  return (
    <section className="px-4 sm:px-20 xl:px-32 py-24 bg-[#09090b]">
      <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Everything you need to create
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Powerful AI tools at your fingertips
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, idx) => (
          <div 
            key={idx}
            className={`group relative h-[420px] rounded-3xl overflow-hidden bg-gradient-to-b ${tool.color} border border-white/[0.08] hover:border-white/20 transition-all duration-500 flex flex-col`}
          >
            <div className="p-8 pb-0">
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-6 ${tool.accent}`}>
                <tool.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{tool.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {tool.desc}
              </p>
            </div>
            
            <div className="mt-auto p-10 pt-4 flex items-end justify-center overflow-hidden">
                <div className="w-full transform group-hover:scale-105 transition-transform duration-500 ease-out">
                    {tool.mockup}
                </div>
            </div>

            {/* Subtle glow on hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_50%_120%,var(--tw-gradient-from),transparent_70%)]`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
