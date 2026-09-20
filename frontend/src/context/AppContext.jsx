import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/API";

export const AppContext = createContext();

export function AppContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(false);

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


    const value = {
        user,
        setUser,
        loadingUser,
        setLoadingUser,
        login,
        register
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