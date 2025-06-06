'use client';
import { useThemeColors } from "@/context/theme/ThemeColorContext";
import { useEffect, useState } from "react";

const LIGHT_KEYS: Record<string, string> = {
  "bg-primary-light": "BG Primary",
  "bg-secondary-light": "BG Secondary",
  "text-primary-light": "Text Primary",
  "text-secondary-light": "Text Secondary",
  "btn-bg-light": "Btn BG",
  "btn-bg-hover-light": "Btn Hover",
  "card-bg-light": "Card BG",
  "success-light": "Success",
  "error-light": "Error",
};

const DARK_KEYS: Record<string, string> = {
  "bg-primary-dark": "BG Primary",
  "bg-secondary-dark": "BG Secondary",
  "text-primary-dark": "Text Primary",
  "text-secondary-dark": "Text Secondary",
  "btn-bg-dark": "Btn BG",
  "btn-bg-hover-dark": "Btn Hover",
  "card-bg-dark": "Card BG",
  "success-dark": "Success",
  "error-dark": "Error",
};

function ColorSettings() {
  const [colors, setColors] = useThemeColors();
  const [defaultColors, setDefaultColors] = useState<Record<string, string>>({});
  const [showLight, setShowLight] = useState(true);
  const [showDark, setShowDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const defaults: Record<string, string> = {};
    [...Object.keys(LIGHT_KEYS), ...Object.keys(DARK_KEYS)].forEach((key) => {
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
    [...Object.keys(LIGHT_KEYS), ...Object.keys(DARK_KEYS)].forEach((key) => {
      if (defaultColors[key]) {
        root.style.setProperty(`--${key}`, defaultColors[key]);
      }
    });
    localStorage.removeItem("user-theme-colors");
    window.location.reload();
    setColors(null);
  };

  const renderColorGroup = (keys: Record<string, string>, title: string, show: boolean, toggle: () => void) => (
    <div>
      <button
        onClick={toggle}
        className="text-sm font-semibold w-full text-left mb-2 mt-3 underline underline-offset-2"
      >
        {title}
      </button>
      {show && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {Object.entries(keys).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <label className="w-[6.5rem] truncate">{label}</label>
              <input
                type="color"
                value={colors?.[key] || defaultColors[key] || "#ffffff"}
                onChange={(e) => handleColorChange(key, e.target.value)}
                className="w-9 h-5 border rounded"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4 text-sm text-textPrimaryLight dark:text-textPrimaryDark max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold">Theme Colors</h2>
        <button
          onClick={handleRestoreDefaults}
          className="text-xs px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
        >
          Reset
        </button>
      </div>

      {renderColorGroup(LIGHT_KEYS, "🌞 Light Mode", showLight, () => setShowLight(!showLight))}
      {renderColorGroup(DARK_KEYS, "🌙 Dark Mode", showDark, () => setShowDark(!showDark))}
    </div>
  );
}

export default ColorSettings;
