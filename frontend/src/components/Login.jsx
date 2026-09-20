const Login = () => {
    return (
        <div
            className="hidden lg:flex lg:w-1/2 bg-cover bg-center p-10 flex-col justify-between"
            style={{ backgroundImage: "url('/bg-image.png')" }}
        >

            {/* Logo */}
            <div className="flex items-center gap-3">
                <img
                    src="/logo.svg"
                    alt="logo"
                    className="size-9.5"
                />

                <span className="text-xl font-medium text-white">
                    Builder AI
                </span>
            </div>

            {/* Description */}
            <div>
                <h2 className="text-4xl font-semibold text-white mb-4">
                    Build your presence on web
                </h2>

                <p className="text-white/70 max-w-md">
                    Create and customize beautiful websites with the power
                    of AI. Turn your ideas into fully functional websites
                    with just a simple prompt.
                </p>

                <p className="text-white/50 text-sm mt-6">
                    © {new Date().getFullYear()} Builder AI
                </p>
            </div>

        </div>
    );
};

export default Login;