// Detect npm dependencies from import statements
export function detectDependencies(files) {
    const deps = {};

    if (!files) return deps;

    const allCode = Object.values(files).join("\n");

    // Match imports such as:
    // import React from "react"
    // import { Button } from "lucide-react"
    // import "some-package"
    const importRegex = /(?:from\s+|import\s*)['"]([^'"]+)['"]/g;

    let match;

    while ((match = importRegex.exec(allCode)) !== null) {
        const rawImport = match[1];

        // Ignore local files and aliases
        if (
            rawImport.startsWith(".") ||
            rawImport.startsWith("/") ||
            rawImport.startsWith("@/")
        ) {
            continue;
        }

        // Handle scoped packages, e.g. @scope/package
        const pkg = rawImport.startsWith("@")
            ? rawImport.split("/").slice(0, 2).join("/")
            : rawImport.split("/")[0];

        // React and React DOM are included in the template
        if (pkg !== "react" && pkg !== "react-dom") {
            deps[pkg] = "latest";
        }
    }

    return deps;
}