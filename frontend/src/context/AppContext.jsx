import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/API";

export const AppContext = createContext();

export function AppContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(false);

    const [projects, setProjects] = useState([]);
    const [loadingProjects, setLoadingProjects] = useState(true);

    const [activeProject, setActiveProject] = useState(null);
    const [loadingActiveProject, setLoadingActiveProject] = useState(true);

    const [chatLoading, setChatLoading] = useState(false);
    const [generatingProject, setGeneratingProject] = useState(false);

    const [activeFile, setActiveFile] = useState("/app.js");
    const [showCode, setShowCode] = useState(false);

    const navigate = useNavigate();

    // Login function
    const login = async (email, password) => {

        try {

            const { data } = await api.post("/api/auth/login", {
                email,
                password
            });

            setUser(data.user);

            toast.success("Welcome back!");

            navigate("/");

        } catch (error) {

            console.error("Login failed:", error);

            const errorMessage =
                error.response?.data?.error ||
                "Invalid email or password";

            toast.error(errorMessage);

            throw new Error(errorMessage);
        }
    };


    // Register function
    const register = async (name, email, password) => {

        try {

            const { data } = await api.post("/api/auth/register", {
                name,
                email,
                password
            });

            setUser(data.user);

            toast.success("Account created successfully!");

            navigate("/");

        } catch (error) {

            console.error("Registration failed:", error);

            const errorMessage =
                error.response?.data?.error ||
                "Registration failed";

            toast.error(errorMessage);

            throw new Error(errorMessage);
        }
    };

    const loadProjects = async () => {
        if (!user) return;

        try {
            const { data } = await api.get("/api/projects");
            setProjects(data);
        } catch (error) {
            console.error("Failed to load projects:", error);
            toast.error("Failed to load project list");
        } finally {
            setLoadingProjects(false);
        }
    };


    const value = {
        user,
        setUser,
        loadingUser,
        setLoadingUser,
        login,
        register,
        projects,
        setProjects,
        loadingProjects,
        setLoadingProjects,
        activeProject,
        setActiveProject,
        loadingActiveProject,
        setLoadingActiveProject,
        chatLoading,
        setChatLoading,
        generatingProject,
        setGeneratingProject,
        activeFile,
        setActiveFile,
        showCode,
        setShowCode,
        loadProjects,
    };


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}


export function useAppContext() {

    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error(
            "useAppContext must be used within an AppContextProvider"
        );
    }

    return context;
}