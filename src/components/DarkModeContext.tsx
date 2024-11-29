import React, { createContext, useContext, useState, useEffect } from "react";

// Define the context type
interface DarkModeContextProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Create the context
const DarkModeContext = createContext<DarkModeContextProps | undefined>(undefined);

// Create a provider component
export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Check localStorage for saved theme on first render
  const [isDarkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark"; // Set to true if 'dark' is saved
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode); // Add/remove dark class on <html>
      localStorage.setItem("theme", newMode ? "dark" : "light"); // Save theme in localStorage
      return newMode;
    });
  };

  useEffect(() => {
    // Apply theme on first render
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Custom hook to use the context
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
