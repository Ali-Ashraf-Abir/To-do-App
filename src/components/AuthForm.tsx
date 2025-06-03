"use client";

import { useState } from "react";
import Input from "./Input";
import Link from "next/link";
import { Lock, User } from "lucide-react"; // ✅ Lucide icons
import apiRequest from '../utilities/apiCalls'
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
interface AuthFormProps {
  type: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();
  const { token, setToken } = useAuth();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await apiRequest(`/auth/${type}`, 'POST', form);
      console.log('Response from server:', data);

      if (data.token) {
        alert(`${type == 'login' ? 'login successful' : 'Registered Succesfully'}`)
        document.cookie = `token=${data.token}; path=/; max-age=86400; secure; samesite=strict`;
        setToken(data.token);
        router.push('/todo');

      } else {
        console.error('Unexpected response:', data);
        alert(data.error || 'Unknown response');
      }
    } catch (err: any) {
      console.log(err);
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('An unknown error occurred during authentication.');
      }
    }
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
