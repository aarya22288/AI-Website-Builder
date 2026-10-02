import { Sparkles, Code2, WandSparkles } from "lucide-react";

const Login = () => {
    return (
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#09090f] p-10 flex-col justify-between">

            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-600/15 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_70%)]" />
            </div>

            {/* Logo */}
            <div className="relative z-10 flex items-center gap-3">
                {/* Logo */}
<div className="relative z-10 flex items-center">
    <img
        src="/logo.svg"
        alt="Builder AI"
        className="h-10 w-auto object-contain"
    />
</div>

                <span className="text-xl font-semibold text-white">
                    Builder <span className="text-violet-400">AI</span>
                </span>
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-400/20 bg-violet-500/10 text-violet-300 text-xs mb-6">
                    <Sparkles size={14} />
                    AI-powered website creation
                </div>

                <h2 className="text-4xl xl:text-5xl font-semibold text-white leading-tight mb-5">
                    Turn your ideas into{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                        beautiful websites.
                    </span>
                </h2>

                <p className="text-zinc-400 text-base leading-relaxed max-w-md">
                    Describe your vision and let AI help you build,
                    customize, and preview your next website.
                </p>

                {/* Feature cards */}
                <div className="grid grid-cols-2 gap-3 mt-10">
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                        <WandSparkles size={21} className="text-violet-400 mb-3" />
                        <h3 className="text-sm font-medium text-white">
                            AI Generation
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1">
                            From prompt to website
                        </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                        <Code2 size={21} className="text-fuchsia-400 mb-3" />
                        <h3 className="text-sm font-medium text-white">
                            Live Preview
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1">
                            Edit and preview instantly
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 text-xs text-zinc-600">
                © {new Date().getFullYear()} Builder AI. All rights reserved.
            </div>
        </div>
    );
};

export default Login;