import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within an ThemeProvider');
    }
    return context;
}