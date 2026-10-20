import {
    SandpackProvider,
    SandpackLayout,
    SandpackPreview,
} from "@codesandbox/sandpack-react";
import { detectDependencies } from "../utils/sandpackUtils";

function FullPagePreview({ files }) {
    const dependencies = detectDependencies(files || {});

    if (!files || Object.keys(files).length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#050505] text-zinc-400">
                No website files are available.
            </div>
        );
    }

    return (
        <div className="h-full w-full overflow-hidden bg-white">
            <SandpackProvider
                template="react"
                files={files}
                customSetup={{ dependencies }}
                theme="light"
                options={{
                    externalResources: [
                        "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
                    ],
                }}
            >
                <SandpackLayout>
                    <SandpackPreview
                        style={{ height: "100%", width: "100%" }}
                        showNavigator={false}
                        showRefreshButton
                    />
                </SandpackLayout>
            </SandpackProvider>
        </div>
    );
}

export default FullPagePreview;