import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {
    Eye,
    EyeOff,
    Loader,
    Sparkles,
} from "lucide-react";
import Login from "../components/Login";

const AuthPage = ({ mode }) => {
    const isLogin = mode === "login";
    const { login, register } = useAppContext();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(name, email, password);
            }
        } catch (error) {
            setError(
                error.response?.data?.error ||
                error.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#09090f] text-white">

            {/* Left branding panel */}
            <Login />

            {/* Right form panel */}
            <div className="flex-1 flex items-center justify-center px-6 py-10 sm:px-10 relative overflow-hidden">

                {/* Mobile background glow */}
                <div className="absolute lg:hidden -top-40 -right-32 w-96 h-96 rounded-full bg-violet-600/10 blur-[100px]" />

                <div className="relative z-10 w-full max-w-md">

                    {/* Mobile logo */}
                    <div className="flex lg:hidden items-center justify-center gap-2 mb-10">
                        <div className="size-9 rounded-xl bg-violet-600/20 border border-violet-400/20 flex items-center justify-center">
                            <Sparkles className="text-violet-300" size={20} />
                        </div>
                        <span className="text-lg font-semibold">
                            Builder <span className="text-violet-400">AI</span>
                        </span>
                    </div>

                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                            {isLogin ? "Welcome back" : "Create your account"}
                        </h1>

                        <p className="text-sm text-zinc-400 mt-3">
                            {isLogin
                                ? "Sign in to continue building amazing websites."
                                : "Get started and turn your ideas into websites."}
                        </p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="mb-5 p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Google button - UI only */}
                    <button
                        type="button"
                        onClick={() =>
                            setError("Google sign-in will be available after backend integration.")
                        }
                        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-sm font-medium text-zinc-200 hover:bg-white/[0.08] transition"
                    >
                        <svg
                            viewBox="0 0 48 48"
                            className="size-5"
                            aria-hidden="true"
                        >
                            <path
                                fill="#EA4335"
                                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.03 13.22l7.98 6.19C11.93 13.72 17.49 9.5 24 9.5Z"
                                transform="translate(0 4)"
                            />
                            <path
                                fill="#4285F4"
                                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6C44.4 37.92 46.98 31.7 46.98 24.55Z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M10.01 28.59A14.4 14.4 0 0 1 9.25 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.03 10.78l7.98-6.19Z"
                                transform="translate(0 0)"
                            />
                            <path
                                fill="#34A853"
                                d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.14 1.45-4.89 2.3-8.17 2.3-6.51 0-12.07-4.22-14.01-10.09l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                            />
                        </svg>
                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-7">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-xs text-zinc-500">
                            OR CONTINUE WITH EMAIL
                        </span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>

                        {/* Name */}
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    autoComplete="name"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/10"
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                autoComplete="email"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/10"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-zinc-300">
                                    Password
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    autoComplete={isLogin ? "current-password" : "new-password"}
                                    required
                                    className="w-full px-4 py-3 pr-12 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/10"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-200 transition"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium shadow-lg shadow-violet-900/20 hover:from-violet-500 hover:to-fuchsia-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader size={18} className="animate-spin mr-2" />
                                    Please wait...
                                </>
                            ) : (
                                isLogin ? "Sign In" : "Create Account"
                            )}
                        </button>
                    </form>

                    {/* Switch login/register */}
                    <p className="text-sm text-zinc-500 mt-8 text-center">
                        {isLogin ? (
                            <>
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="text-violet-400 font-medium hover:text-violet-300 transition"
                                >
                                    Sign up
                                </Link>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-violet-400 font-medium hover:text-violet-300 transition"
                                >
                                    Sign in
                                </Link>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;