import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import api from "../api/api.js";
import FullPagePreview from "../components/FullPagePreview";

function PreviewPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadProject() {
            setLoading(true);
            setError("");

            try {
                const { data } = await api.get(`/api/projects/${id}`);

                if (!cancelled) {
                    setProject(data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err.response?.data?.error ||
                        "Unable to load this project."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadProject();

        return () => {
            cancelled = true;
        };
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#050505] text-zinc-400">
                Loading preview...
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#050505] text-white">
                <p className="text-zinc-400">
                    {error || "Project not found."}
                </p>

                <button
                    onClick={() => navigate(`/builder/${id}`)}
                    className="rounded-lg bg-violet-600 px-4 py-2 hover:bg-violet-500"
                >
                    Back to Builder
                </button>
            </div>
        );
    }

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-[#050505]">
            <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4 text-white">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(`/builder/${id}`)}
                        className="rounded-lg p-2 transition hover:bg-white/10"
                        aria-label="Back to builder"
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <div>
                        <h1 className="text-sm font-medium">
                            {project.name || "Website Preview"}
                        </h1>
                        <p className="text-xs text-zinc-500">
                            Full-page preview
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => navigate(`/publish/${id}`)}
                    className="flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm transition hover:bg-violet-500"
                >
                    <ExternalLink size={15} />
                    Open Published View
                </button>
            </header>

            <main className="min-h-0 flex-1">
                <FullPagePreview files={project.files} />
            </main>
        </div>
    );
}

export default PreviewPage;