import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...props }) => (
  <div className="mb-5">
    <label
      htmlFor={name}
      className="block mb-1 text-sm font-semibold text-textPrimaryLight dark:text-textPrimaryDark"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      placeholder={`Enter your ${label.toLowerCase()}`}
      {...props}
      className="w-full px-4 py-2 bg-bgSecondaryLight dark:bg-bgSecondaryDark border border-bgPrimaryDark dark:border-textSecondaryDark text-textPrimaryLight dark:text-textPrimaryDark rounded-lg focus:outline-none focus:ring-2 focus:ring-btnBgLight dark:focus:ring-btnBgDark transition"
    />
  </div>
);

export default Input;
