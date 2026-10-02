import React from "react";
import {
    BriefcaseBusiness,
    LogOut,
    Megaphone,
    ShoppingBag,
    Sparkles,
    UserRound
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PromptInput from "../components/PromptInput.jsx";
import { useAppContext } from "../context/AppContext.jsx";

function HomePage() {

  const navigate = useNavigate();
  const {
    user,
    projects,
    loadingProjects,
    loadProjects,
     generatingProject
  } = useAppContext();

  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user]);

  const quickPrompts = [
    {
      label: "E-commerce",
      icon: ShoppingBag,
      prompt: "Create a modern e-commerce website"
    },
    {
      label: "Portfolio",
      icon: UserRound,
      prompt: "Create a modern personal portfolio website"
    },
    {
      label: "Business",
      icon: BriefcaseBusiness,
      prompt: "Create a professional business website"
    },
    {
      label: "Marketing",
      icon: Megaphone,
      prompt: "Create a modern marketing landing page"
    }
  ];

  const handleQuickPrompt = (text) => {
    setPrompt(text);
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-[#050505] text-white">

      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-violet-600/15 blur-[140px]" />

        <div className="absolute top-[450px] left-[-200px] w-[400px] h-[400px] rounded-full bg-fuchsia-600/10 blur-[120px]" />

      </div>


      {/* Main Content */}
      <div className="relative z-10 min-h-screen">


        {/* ================= NAVBAR ================= */}

        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">

          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

            {/* Logo */}
            <div className="flex items-center gap-3">

              <img
                src="/favicon.svg"
                alt="BuilderAI"
                className="size-9 object-contain"
              />


              <span className="text-lg font-semibold tracking-tight">
                BuilderAI
              </span>

            </div>


            {/* User */}
            <div className="flex items-center gap-4">

              <span className="hidden sm:block text-sm text-zinc-400">
                {user?.name}
              </span>

              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition text-sm"
              >

                <LogOut size={15} />

                <span className="hidden sm:block">
                  Sign out
                </span>

              </button>

            </div>

          </div>

        </nav>


        {/* ================= HERO ================= */}

        <main className="flex flex-col items-center px-6 pt-20 pb-24">


          {/* Promo Badge */}

          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-violet-400/20 bg-violet-500/10 text-violet-300 text-xs sm:text-sm backdrop-blur-md">

            <span className="px-2 py-1 rounded-full bg-violet-500 text-white text-[10px] font-semibold tracking-wide">
              AI
            </span>

            Build your first website for free

          </div>


          {/* Heading */}

          <h1 className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mt-8 max-w-4xl leading-[1.05]">

            Let's build your

            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              website together.
            </span>

          </h1>


          {/* Description */}

          <p className="text-center text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mt-6 leading-relaxed">

            Describe your idea and let AI design, structure,
            and build your website instantly.

          </p>


          {/* ================= PROMPT BOX ================= */}

          <PromptInput
            value={prompt}
            onChange={setPrompt}
            large={true}
            autoFocus={true}
            variant="glass"
            placeholder="Describe the website you want to build..."
            onSubmit={(prompt) => {
              console.log("Website prompt:", prompt);
            }}
          />


          {/* ================= QUICK PROMPTS ================= */}
{/* Scrolling Prompt Tags */}
<div className="w-full max-w-2xl mx-auto mt-5 overflow-hidden">
    <div className="marquee-container">
        <div className="animate-marquee">
            {[...quickPrompts, ...quickPrompts].map((tag, i) => (
                <button
                    key={i}
                    onClick={() => setPrompt(tag.prompt)}
                    disabled={generatingProject}
                    className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-sm text-zinc-300 hover:bg-violet-500/20 hover:border-violet-400/50 hover:text-white transition cursor-pointer"
                >
                    {React.createElement(tag.icon, { size: 16 })}
                    <span>{tag.label}</span>
                </button>
            ))}
        </div>
    </div>
</div>

         {/* ================= RECENT PROJECTS ================= */}

{projects.length > 0 && (
    <div className="w-full max-w-5xl mt-20">

        <h2 className="text-xl font-semibold mb-6">
            Your Recent Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {projects.map((project) => (
                <div
                    key={project._id}
                    onClick={() => navigate(`/builder/${project._id}`)}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-violet-500/40 transition cursor-pointer"
                >
                    <h3 className="text-base font-medium text-white">
                        {project.name}
                    </h3>

                    <p className="text-sm text-zinc-500 mt-2">
                        {project.description || "No description available"}
                    </p>
                </div>
            ))}

        </div>
    </div>
)}

          {/* ================= TRUST TEXT ================= */}

          <div className="mt-16 flex items-center gap-2 text-xs text-zinc-600">

            <Sparkles size={13} />

            Turn your idea into a real website with AI

          </div>


        </main>

      </div>

    </div>
  );
}

export default HomePage;