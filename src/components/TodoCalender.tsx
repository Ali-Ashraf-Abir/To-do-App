'use client';

import { useEffect, useRef, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Calendar } from 'lucide-react';

interface Props {
  todoDates: string[];
  getTodoCount: (date: string) => number;
  onDateClick: (date: string) => void; // empty string "" means "All"
}

export default function TodoCalendarDropdown({
  todoDates,
  getTodoCount,
  onDateClick,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(''); // '' = "All"
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = (date: string) => {
    setSelectedDate(date);
    onDateClick(date);
    setOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-bgSecondaryLight dark:bg-bgSecondaryDark text-textPrimaryLight dark:text-textPrimaryDark hover:bg-bgSecondaryHoverLight dark:hover:bg-bgSecondaryHoverDark transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Calendar /> Calendar
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-64 bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-4 max-h-[320px] overflow-y-auto custom-scrollbar">
          <h2 className="text-sm font-semibold mb-3 text-zinc-800 dark:text-white">
            Select a date with todos
          </h2>

          <div className="grid grid-cols-3 gap-3">
            {/* "All" button */}
            <button
              onClick={() => handleClick('')}
              className={`relative px-2 py-2 rounded-md text-xs border text-center transition-all ${
                selectedDate === ''
                  ? 'bg-blue-600 text-white border-blue-700'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 border-transparent'
              }`}
            >
              All
            </button>

            {todoDates.map((date) => {
              const todoCount = getTodoCount(date);
              return (
                <button
                  key={date}
                  onClick={() => handleClick(date)}
                  className={`relative px-2 py-2 rounded-md text-xs border text-center transition-all ${
                    selectedDate === date
                      ? 'bg-green-600 text-white border-green-700'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 border-transparent'
                  }`}
                >
                  {format(parseISO(date), 'dd MMM')}
                  {todoCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] px-1 rounded-full translate-x-1/2 -translate-y-1/2">
                      {todoCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
