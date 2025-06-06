'use client';
import React, { createContext, useContext, useState, useEffect } from "react";

const COLOR_KEYS = [
  "bg-primary-light",
  "bg-secondary-light",
  "text-primary-light",
  "text-secondary-light",
  "btn-bg-light",
  "btn-bg-hover-light",
  "card-bg-light",
  "success-light",
  "error-light",
  "bg-primary-dark",
  "bg-secondary-dark",
  "text-primary-dark",
  "text-secondary-dark",
  "btn-bg-dark",
  "btn-bg-hover-dark",
  "card-bg-dark",
  "success-dark",
  "error-dark",
];

type Colors = Record<string, string | null>;

const ThemeColorContext = createContext<
  [Colors | null, React.Dispatch<React.SetStateAction<Colors | null>>] | undefined
>(undefined);

export const ThemeColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colors, setColors] = useState<Colors | null>(() => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem("user-theme-colors");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (!colors) return;

    const root = document.documentElement;
    COLOR_KEYS.forEach((key) => {
      if (colors[key]) {
        root.style.setProperty(`--${key}`, colors[key]!);
      }
    });

    localStorage.setItem("user-theme-colors", JSON.stringify(colors));
  }, [colors]);

  return <ThemeColorContext.Provider value={[colors, setColors]}>{children}</ThemeColorContext.Provider>;
};

export function useThemeColors() {
  const context = useContext(ThemeColorContext);
  if (!context) throw new Error("useThemeColors must be used within a ThemeColorProvider");
  return context;
}
