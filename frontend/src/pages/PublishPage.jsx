import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api.js";
import FullPagePreview from "../components/FullPagePreview";

function PublishPage() {
    const { id } = useParams();

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
                        "Unable to load this website."
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
            <div className="flex min-h-screen items-center justify-center bg-white text-zinc-500">
                Loading website...
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white px-6 text-center">
                <p className="text-zinc-500">
                    {error || "Website not found."}
                </p>
            </div>
        );
    }

    return (
        <main className="h-screen w-full overflow-hidden bg-white">
            <FullPagePreview files={project.files} />
        </main>
    );
}

export default PublishPage;