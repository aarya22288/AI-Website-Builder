import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader } from "lucide-react";
import Login from "../components/Login";

const AuthPage = ({ mode }) => {

    const isLogin = mode === "login";

    // Form states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Error and loading
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="min-h-screen flex">

            {/* Left side */}
            <Login />

            {/* Right side */}
            <div className="flex-1 flex items-center justify-center p-6">

                <div className="w-full max-w-sm">

                    {/* Heading */}
                    <div className="mb-6">

                        <h1 className="text-3xl font-semibold text-zinc-900">
                            {isLogin ? "Sign in" : "Create an account"}
                        </h1>

                        <p className="text-sm text-zinc-400 mt-2">
                            {isLogin
                                ? "Enter your credentials to access your website builder."
                                : "Get started by entering your registration details."}
                        </p>

                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form className="space-y-5">

                        {/* Full Name - only for registration */}
                        {!isLogin && (
                            <div>

                                <label className="block text-sm font-medium text-zinc-700 mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                    required
                                    className="w-full px-4 py-3 border border-zinc-200 rounded-lg outline-none focus:border-zinc-500"
                                />

                            </div>
                        )}

                        {/* Email */}
                        <div>

                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="w-full px-4 py-3 border border-zinc-200 rounded-lg outline-none focus:border-zinc-500"
                            />

                        </div>

                        {/* Password */}
                        <div>

                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                                Password
                            </label>

                            <div className="relative">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full px-4 py-3 pr-12 border border-zinc-200 rounded-lg outline-none focus:border-zinc-500"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>

                            </div>

                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-lg bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition disabled:opacity-60"
                        >

                            {loading && (
                                <Loader
                                    size={18}
                                    className="animate-spin inline mr-2"
                                />
                            )}

                            {isLogin ? "Sign In" : "Sign Up"}

                        </button>

                    </form>

                    {/* Switch Login / Register */}
                    <p className="text-sm text-zinc-500 mt-6 text-center">

                        {isLogin ? (
                            <>
                                New to Builder AI?{" "}

                                <Link
                                    to="/register"
                                    className="text-zinc-900 font-medium hover:underline"
                                >
                                    Create an account
                                </Link>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}

                                <Link
                                    to="/login"
                                    className="text-zinc-900 font-medium hover:underline"
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