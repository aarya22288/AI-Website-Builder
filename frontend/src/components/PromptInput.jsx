import { useEffect, useRef } from "react";
import { ArrowUp, Sparkles, Loader } from "lucide-react";

const PromptInput = ({
    value,
    onChange,
    onSubmit,
    loading = false,
    placeholder = "Describe the website you want to build...",
    large = false,
    autoFocus = false,
    variant = "default"
}) => {
    const textareaRef = useRef(null);

    // Auto focus
    useEffect(() => {
        if (autoFocus && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [autoFocus]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!value.trim() || loading) {
            return;
        }

        onSubmit(value.trim());
        onChange("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`w-full ${
                large ? "max-w-3xl" : "max-w-2xl"
            }`}
        >
            <div
                className={`
                    relative
                    rounded-2xl
                    border
                    transition
                    ${
                        variant === "glass"
                            ? "border-white/10 bg-white/[0.04] backdrop-blur-xl focus-within:border-violet-500/50"
                            : "border-zinc-200 bg-white"
                    }
                `}
            >
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={large ? 5 : 3}
                    disabled={loading}
                    className={`
                        w-full
                        resize-none
                        outline-none
                        bg-transparent
                        px-5
                        pt-5
                        pb-16
                        text-sm
                        sm:text-base
                        ${
                            variant === "glass"
                                ? "text-white placeholder:text-zinc-600"
                                : "text-zinc-900 placeholder:text-zinc-400"
                        }
                    `}
                />

                {/* Bottom controls */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div
                        className={
                            variant === "glass"
                                ? "text-xs text-zinc-600"
                                : "text-xs text-zinc-400"
                        }
                    >
                        <Sparkles size={13} className="inline mr-1" />
                        AI Website Builder
                    </div>

                    <button
                        type="submit"
                        disabled={!value.trim() || loading}
                        className="
                            size-10
                            rounded-xl
                            bg-gradient-to-r
                            from-violet-500
                            to-fuchsia-500
                            flex
                            items-center
                            justify-center
                            hover:scale-105
                            transition
                            disabled:opacity-30
                            disabled:hover:scale-100
                        "
                    >
                        {loading ? (
                            <Loader
                                size={18}
                                className="animate-spin text-white"
                            />
                        ) : (
                            <ArrowUp
                                size={19}
                                className="text-white"
                            />
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PromptInput;