'use client';
import { useThemeColors } from "@/context/theme/ThemeColorContext";
import { useEffect, useState } from "react";

const COLOR_KEYS = [
  "bg-primary-light",
  "bg-secondary-light",
  "text-primary-light",
  "text-secondary-light",
  "btn-bg-light",
  "btn-bg-hover-light",
  "card-bg-light",
  "bg-primary-dark",
  "bg-secondary-dark",
  "text-primary-dark",
  "text-secondary-dark",
  "btn-bg-dark",
  "btn-bg-hover-dark",
  "card-bg-dark",
];

function ColorSettings() {
  const [colors, setColors] = useThemeColors();
  const [defaultColors, setDefaultColors] = useState<Record<string, string>>({});

  // Get default colors from :root
  useEffect(() => {
    const root = document.documentElement;
    const defaults: Record<string, string> = {};
    COLOR_KEYS.forEach((key) => {
      const value = getComputedStyle(root).getPropertyValue(`--${key}`).trim();
      defaults[key] = value;
    });
    setDefaultColors(defaults);
  }, []);

  const handleColorChange = (key: string, value: string) => {
    setColors((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRestoreDefaults = () => {
    const root = document.documentElement;

    // Reset each CSS variable
    COLOR_KEYS.forEach((key) => {
      if (defaultColors[key]) {
        root.style.setProperty(`--${key}`, defaultColors[key]);
      }
    });

    // Clear user override
    localStorage.removeItem("user-theme-colors");
    setColors(null);
  };

  return (
    <div className="px-10 py-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-textPrimaryLight dark:text-textPrimaryDark">Theme Color Settings</h2>
        <button
          onClick={handleRestoreDefaults}
          className="bg-btnBgLight dark:bg-btnBgDark text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Restore Defaults
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-textPrimaryLight dark:text-textPrimaryDark">
        {COLOR_KEYS.map((key) => (
          <div key={key} className="flex items-center gap-4">
            <label className="w-48 capitalize">{key.replace(/-/g, " ")}</label>
            <input
              type="color"
              value={
                colors?.[key] || defaultColors[key] || "#ffffff"
              }
              onChange={(e) => handleColorChange(key, e.target.value)}
              className="w-16 h-8 border rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColorSettings;
