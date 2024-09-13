"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Type of value the context has
interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

// Create a context to change theme between light and dark mode
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create a component that wraps other components to make use of the ThemeContext
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState("");

  function handleThemeChange() {
    if (mode === "light") {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.add("light");
    }
  }

  // Execute the theme change function whenever the mode state change
  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {/* children will have access to mode and setMode state */}
      {children}
    </ThemeContext.Provider>
  );
}

// Function to access the context values provided to the children
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(
      "useTheme() should be used inside components that use ThemeContext"
    );
  }

  return context;
}
