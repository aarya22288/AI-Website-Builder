import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const value = {
        user,
        setUser,
        loadingUser,
        setLoadingUser
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