import {createContext, useContext, useEffect, useState} from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("taskflow-theme") || "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("taskflow-theme", theme);
    }, [theme]);

    function toggleTheme() {
        setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
    }

    const value = {
        theme,
        toggleTheme,
        isDarkMode: theme === "dark",
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }

    return context;
}
