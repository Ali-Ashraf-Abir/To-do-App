import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...props }) => (
  <div className="mb-5">
    <label htmlFor={name} className="block mb-1 text-sm font-semibold dark:text-gray-300 text-black">
      {label}
    </label>
    <input
      id={name}
      name={name}
      placeholder={`Enter your ${label.toLowerCase()}`}
      {...props}
      className="w-full px-4 py-2 dark:bg-gray-800 bg-white border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
  </div>
);

export default Input;
