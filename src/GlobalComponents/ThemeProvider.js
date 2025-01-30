import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

const ThemeProvider = (props) => {
    const [theme, setTheme] = useState(
        JSON.parse(localStorage.getItem('theme')) || false // Default to light mode
    );

    // useEffect to apply the dark class to body when the theme changes
    useEffect(() => {
        document.body.classList.toggle('dark', theme); // Add 'dark' class if theme is true (dark mode)
        localStorage.setItem('theme', JSON.stringify(theme)); // Store theme in localStorage
    }, [theme]);

    const setThemeMode = (mode) => setTheme(mode);

    return (
        <ThemeContext.Provider value={{ theme, setThemeMode }}>
            {props.children}
        </ThemeContext.Provider>
    );
};

const useThemeHook = () => {
    const { theme } = useContext(ThemeContext);
    return [theme];
}

export { ThemeProvider, ThemeContext, useThemeHook };
