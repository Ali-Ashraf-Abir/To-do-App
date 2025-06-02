"use client";

import { useState } from "react";
import Input from "./Input";
import Link from "next/link";
import { Lock, User } from "lucide-react"; // ✅ Lucide icons

interface AuthFormProps {
  type: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md p-8 mx-auto mt-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-700 rounded-2xl shadow-xl"
    >
      <div className="flex items-center justify-center mb-6">
        <div className="text-3xl text-blue-500">
          {type === "login" ? <Lock size={28} /> : <User size={28} />}
        </div>
        <h2 className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">
          {type === "login" ? "Login" : "Register"}
        </h2>
      </div>

      <Input
        label="Email"
        name="email"
        
        type="email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        
        value={form.password}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="w-full py-2 mt-4 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        {type === "login" ? "Login" : "Register"}
      </button>

      <div className="mt-5 text-sm text-center text-gray-400">
        {type === "login" ? (
          <>
            Don’t have an account?{" "}
            <Link href="/register" className="text-blue-400 hover:underline">
              Register
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
