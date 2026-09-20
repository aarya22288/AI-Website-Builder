import React, { useState } from "react";
import {
  Sparkles,
  ArrowUp,
  ShoppingBag,
  UserRound,
  BriefcaseBusiness,
  Megaphone,
  LogOut
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

function HomePage() {

  const { user } = useAppContext();

  const [prompt, setPrompt] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    console.log("Website prompt:", prompt);
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

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-3xl mt-12"
          >

            <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl shadow-black/40 focus-within:border-violet-500/50 transition">


              {/* Textarea */}

              <textarea
                value={prompt}
                onChange={(e) =>
                  setPrompt(e.target.value)
                }
                placeholder="Describe the website you want to build..."
                rows={5}
                className="w-full resize-none bg-transparent outline-none px-5 pt-5 pb-16 text-sm sm:text-base text-white placeholder:text-zinc-600"
              />


              {/* Bottom controls */}

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">


                <span className="text-xs text-zinc-600 hidden sm:block">
                  Powered by AI
                </span>


                <button
                  type="submit"
                  disabled={!prompt.trim()}
                  className="ml-auto size-10 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center hover:scale-105 transition disabled:opacity-30 disabled:hover:scale-100"
                >

                  <ArrowUp
                    size={19}
                    className="text-white"
                  />

                </button>

              </div>

            </div>

          </form>


          {/* ================= QUICK PROMPTS ================= */}

          <div className="mt-8">

            <p className="text-center text-xs text-zinc-600 mb-4">
              Or start with a template
            </p>


            <div className="flex flex-wrap justify-center gap-2.5">

              {quickPrompts.map((item) => {

                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() =>
                      handleQuickPrompt(item.prompt)
                    }
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/5 transition text-sm"
                  >

                    <Icon size={15} />

                    {item.label}

                  </button>
                );

              })}

            </div>

          </div>


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