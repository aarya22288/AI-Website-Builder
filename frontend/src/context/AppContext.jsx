import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";

export const AppContext = createContext();

export function AppContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const [projects, setProjects] = useState([]);
    const [loadingProjects, setLoadingProjects] = useState(true);

    const [activeProject, setActiveProject] = useState(null);
    const [loadingActiveProject, setLoadingActiveProject] = useState(true);

    const [chatLoading, setChatLoading] = useState(false);
    const [generatingProject, setGeneratingProject] = useState(false);

    const [activeFile, setActiveFile] = useState("/app.js");
    const [showCode, setShowCode] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
    const loadUser = async () => {
        try {
            setLoadingUser(true);

            const { data } = await api.get("/api/auth/me");
            setUser(data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoadingUser(false);
        }
    };

    loadUser();
}, []);

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

    // Logout function
const logout = async () => {
    try {
        await api.post("/api/auth/logout");

        setUser(null);
        setProjects([]);
        setActiveProject(null);

        toast.success("Logged out successfully!");

        navigate("/login");
    } catch (error) {
        console.error("Logout failed:", error);
        toast.error("Failed to log out. Please try again.");
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
        logout,
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