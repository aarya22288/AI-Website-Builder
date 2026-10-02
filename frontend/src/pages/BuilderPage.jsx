import { Sandpack } from "@codesandbox/sandpack-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api.js";
import { useAppContext } from "../context/AppContext";
import { detectDependencies } from "../utils/sandpackUtils";

import {
    ArrowLeft,
    Code,
    Eye,
    FileCode,
    Folder,
} from "lucide-react";



function BuilderPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        activeProject,
        setActiveProject,
        loadingActiveProject,
        setLoadingActiveProject,
    } = useAppContext();

    const [activeView, setActiveView] = useState("preview");
    const [selectedFile, setSelectedFile] = useState("/App.js");
    const [projectError, setProjectError] = useState("");

    const sandpackFiles = activeProject?.files || {};
    const dependencies = detectDependencies(sandpackFiles);

    // Load project from API
    useEffect(() => {
        const loadProject = async () => {
            try {
                setLoadingActiveProject(true);
                setProjectError("");
                setActiveProject(null);

                const { data } = await api.get(`/api/projects/${id}`);

                setActiveProject(data);

                const firstFile = Object.keys(data.files || {})[0];
                if (firstFile) {
                    setSelectedFile(firstFile);
                }
            } catch (error) {
                console.error("Failed to load project:", error);
                setProjectError(
                    error.response?.data?.error || "Failed to load project."
                );
            } finally {
                setLoadingActiveProject(false);
            }
        };

        loadProject();
    }, [id, setActiveProject, setLoadingActiveProject]);

    // Loading screen
    if (loadingActiveProject) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
                <p className="text-zinc-400">Loading project...</p>
            </div>
        );
    }

    // Error or project not found
    if (!activeProject || projectError) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center gap-4">
                <p className="text-zinc-400">
                    {projectError || "Project not found."}
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="h-screen bg-[#050505] text-white flex flex-col overflow-hidden">

            {/* Top Navbar */}
            <header className="h-16 shrink-0 border-b border-white/10 flex items-center justify-between px-5">

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-lg hover:bg-white/10 transition"
                        aria-label="Go back"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <div>
                        <h1 className="font-semibold">
                            {activeProject.name}
                        </h1>

                        <p className="text-xs text-zinc-500">
                            AI Website Builder
                        </p>
                    </div>
                </div>

                {/* Code / Preview Buttons */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setActiveView("code")}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${activeView === "code"
                            ? "bg-violet-600 text-white"
                            : "bg-white/5 hover:bg-white/10 text-zinc-300"
                            }`}
                    >
                        <Code size={16} />
                        Code
                    </button>

                    <button
                        onClick={() => setActiveView("preview")}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${activeView === "preview"
                            ? "bg-violet-600 text-white"
                            : "bg-white/5 hover:bg-white/10 text-zinc-300"
                            }`}
                    >
                        <Eye size={16} />
                        Preview
                    </button>
                </div>
            </header>

            {/* Main Builder Layout */}
            <main className="flex flex-1 min-h-0">

                {/* Left Sidebar */}
                <aside className="w-60 shrink-0 border-r border-white/10 p-4 overflow-y-auto">

                    <h2 className="text-xs uppercase tracking-wider text-zinc-500 mb-4">
                        Explorer
                    </h2>

                    {/* Project Folder */}
                    <div className="flex items-center gap-2 text-sm text-zinc-300 mb-3">
                        <Folder size={16} className="text-violet-400" />
                        <span className="truncate">
                            {activeProject.name}
                        </span>
                    </div>

                    {/* Project Files */}
                    <div className="ml-4 space-y-1">
                        {Object.keys(sandpackFiles).map((file) => (
                            <button
                                key={file}
                                onClick={() => {
                                    setSelectedFile(file);
                                    setActiveView("code");
                                }}
                                className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-left transition ${selectedFile === file
                                    ? "bg-violet-500/15 text-violet-300"
                                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <FileCode size={15} />
                                <span className="truncate">
                                    {file.split("/").pop()}
                                </span>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Sandpack Editor and Preview */}
                <div className="flex-1 min-w-0 min-h-0 overflow-hidden">
                    {Object.keys(sandpackFiles).length > 0 ? (
                        <Sandpack
                            template="react"
                            files={sandpackFiles}
                            customSetup={{
                                dependencies,
                            }}
                            
                            options={{
                                activeFile: selectedFile,
                                visibleFiles: Object.keys(sandpackFiles),
                                showTabs: true,
                                showLineNumbers: true,
                                showConsole: true,
                                editorHeight: "100%",
                                editorWidthPercentage:
                                    activeView === "code" ? 100 : 50,
                                showNavigator: true,
                                layout: "preview",
                                externalResources: [
    "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
],
                            }}
                            theme="dark"
                            
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center text-zinc-500">
                            No project files available.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default BuilderPage;