'use client';

import { useState } from 'react';
import ColorSettings from "@/components/ColorPicker";
import { Settings2, X } from 'lucide-react';

export default function ThemeSettingsPopUp() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowSettings(prev => !prev)}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gray-900 dark:bg-zinc-700 text-white hover:bg-gray-700 dark:hover:bg-zinc-600 shadow-xl transition-colors"
        aria-label="Toggle Theme Settings"
      >
        <Settings2 className="w-6 h-6" />
      </button>


      {showSettings && (
        <div className="fixed bottom-24 right-6 z-50 w-[420px] rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl p-6 text-black dark:text-white transition-all">

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Theme Settings</h2>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

   
          <hr className="border-gray-200 dark:border-zinc-700 mb-4" />

    
          <div className="space-y-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Customize the theme color, background, and mode below. Your preferences will be saved.
            </div>


            <div className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-xl">
              <ColorSettings />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
