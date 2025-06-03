"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark";
    setTheme(saved ?? "light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800 border-b dark:border-gray-700 fixed top-0 left-0 right-0 z-50">
      <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
        ToDoApp
      </Link>

      <div className="hidden md:flex items-center space-x-6">
         <Link href="/" className="text-gray-700 dark:text-gray-300 hover:underline">
          Home
        </Link>
         <Link href="/todo" className="text-gray-700 dark:text-gray-300 hover:underline">
          Todo
        </Link>
         <Link href="/planner" className="text-gray-700 dark:text-gray-300 hover:underline">
          Planner
        </Link>
        <Link href="/login" className="text-gray-700 dark:text-gray-300 hover:underline">
          Login
        </Link>
        <Link href="/register" className="text-gray-700 dark:text-gray-300 hover:underline">
          Register
        </Link>
        <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-300">
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden text-gray-700 dark:text-gray-300"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 flex flex-col items-center bg-white dark:bg-gray-900 py-4 shadow-md md:hidden z-10">
          <Link href="/login" className="py-2 text-gray-700 dark:text-gray-300">
            Login
          </Link>
          <Link href="/register" className="py-2 text-gray-700 dark:text-gray-300">
            Register
          </Link>
          <button onClick={toggleTheme} className="py-2 text-gray-700 dark:text-gray-300">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
}
