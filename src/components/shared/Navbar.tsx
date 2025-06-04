"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon, LogOutIcon } from "lucide-react";
import getCookie from "@/utilities/getCookie";
import apiRequest from "@/utilities/apiCalls";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { token, setToken, user, setUser,loggedIn } = useAuth();
  const router= useRouter()
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark";
    setTheme(saved ?? "light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    const token = getCookie("token")
    setToken(token || '')

    if (token) {
      setUser(jwtDecode(token))
    }
  }, [loggedIn])

  const handleLogout = () => {
    apiRequest('/auth/logout', 'POST', {})
      .then((data) => {
        if (data.status = 'success') {
          document.cookie = "token=; path=/; max-age=0; secure; samesite=strict";
          setToken('');
          router.push('/')
        }
      }
      )
  }

  return (
  <nav className="flex items-center font-mono justify-between p-4 bg-bgPrimaryLight dark:bg-bgPrimaryDark shadow-md border-b border-bgPrimaryLight dark:shadow-gray-800 dark:border-gray-700 fixed top-0 left-0 right-0 z-50">
    <Link href="/" className="text-xl font-bold text-textPrimaryLight dark:text-textPrimaryDark">
      ToDoApp
    </Link>

    <div className="hidden md:flex items-center space-x-6">
      <Link href="/" className="text-textSecondaryLight dark:text-textSecondaryDark hover:underline">
        Home
      </Link>

      {token && (
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/todo" className="text-textSecondaryLight dark:text-textSecondaryDark hover:underline">
            Todo
          </Link>
          <Link href="/planner" className="text-textSecondaryLight dark:text-textSecondaryDark hover:underline">
            Planner
          </Link>
        </div>
      )}

      {!token && (
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/login" className="text-textSecondaryLight dark:text-textSecondaryDark hover:underline">
            Login
          </Link>
          <Link href="/register" className="text-textSecondaryLight dark:text-textSecondaryDark hover:underline">
            Register
          </Link>
        </div>
      )}

      {token && (
        <button onClick={handleLogout} className="py-2 text-textSecondaryLight dark:text-textSecondaryDark">
          <LogOutIcon />
        </button>
      )}

      <button onClick={toggleTheme} className="text-textSecondaryLight dark:text-textSecondaryDark">
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>

    <button
      onClick={() => setMobileOpen(!mobileOpen)}
      className="md:hidden text-textSecondaryLight dark:text-textSecondaryDark"
    >
      {mobileOpen ? <X size={24} /> : <Menu size={24} />}
    </button>

    {mobileOpen && (
      <div className="absolute top-16 left-0 right-0 flex flex-col items-center bg-bgPrimaryLight dark:bg-bgPrimaryDark py-4 shadow-md md:hidden z-10">
        {token && (
          <div className="flex flex-col items-center">
            <Link href="/todo" className="text-textSecondaryLight dark:text-textSecondaryDark py-2 hover:underline">
              Todo
            </Link>
            <Link href="/planner" className="text-textSecondaryLight dark:text-textSecondaryDark py-2 hover:underline">
              Planner
            </Link>
          </div>
        )}

        {!token && (
          <div className="flex flex-col items-center">
            <Link href="/login" className="text-textSecondaryLight dark:text-textSecondaryDark py-2 hover:underline">
              Login
            </Link>
            <Link href="/register" className="text-textSecondaryLight dark:text-textSecondaryDark py-2 hover:underline">
              Register
            </Link>
          </div>
        )}

        {token && (
          <button onClick={handleLogout} className="py-2 text-textSecondaryLight dark:text-textSecondaryDark">
            Logout
          </button>
        )}

        <button onClick={toggleTheme} className="py-2 text-textSecondaryLight dark:text-textSecondaryDark">
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    )}
  </nav>
);
}