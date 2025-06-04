"use client";

import { useState } from "react";
import Input from "./Input";
import Link from "next/link";
import { Lock, User } from "lucide-react"; // ✅ Lucide icons
import apiRequest from '../utilities/apiCalls'
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
interface AuthFormProps {
  type: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();
  const { token, setToken,setUser } = useAuth();
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
        setUser(jwtDecode(data.token))
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
    className="w-full max-w-md font-mono p-8 mx-auto mt-12 bg-bgSecondaryLight dark:bg-bgSecondaryDark text-textPrimaryLight dark:text-textPrimaryDark border border-bgPrimaryDark dark:border-textSecondaryDark rounded-2xl shadow-xl"
  >
    <div className="flex items-center justify-center mb-6">
      <div className="text-3xl text-btnBgLight dark:text-btnBgDark">
        {type === "login" ? <Lock size={28} /> : <User size={28} />}
      </div>
      <h2 className="ml-2 text-2xl font-bold text-textPrimaryLight dark:text-textPrimaryDark">
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
      className="w-full py-2 mt-4 font-semibold text-white bg-btnBgLight dark:bg-btnBgDark rounded-lg transition hover:bg-btnBgHoverLight dark:hover:bg-btnBgHoverDark"
    >
      {type === "login" ? "Login" : "Register"}
    </button>

    <div className="mt-5 text-sm text-center text-textSecondaryLight dark:text-textSecondaryDark">
      {type === "login" ? (
        <>
          Don’t have an account?{" "}
          <Link href="/register" className="text-btnBgLight dark:text-btnBgDark hover:underline">
            Register
          </Link>
        </>
      ) : (
        <>
          Already have an account?{" "}
          <Link href="/login" className="text-btnBgLight dark:text-btnBgDark hover:underline">
            Login
          </Link>
        </>
      )}
    </div>
  </form>
);
}
export default AuthForm;