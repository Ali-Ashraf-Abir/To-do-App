"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react"; 

type Project = { id: string; name: string };

export default function Sidebar({
  projects,
  onSelectProject,
  onAddProject,
}: {
  projects: Project[];
  onSelectProject: (id: string) => void;
  onAddProject: (name: string) => void;
}) {
  const [newProjectName, setNewProjectName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-btnBgLight dark:bg-btnBgDark text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-bgSecondaryLight dark:bg-bgSecondaryDark p-4 z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:block`}
      >
        <h2 className="text-xl font-bold mb-4 text-textPrimaryLight dark:text-textPrimaryDark">
          Projects
        </h2>
        <ul className="space-y-2 overflow-y-auto max-h-[60vh] pr-1">
          {projects.map((project) => (
            <li key={project.id}>
              <button
                className="w-full bg-bgPrimaryLight dark:bg-bgPrimaryDark text-textPrimaryLight dark:text-textPrimaryDark p-2 rounded hover:bg-btnBgLight dark:hover:bg-btnBgDark transition-colors"
                onClick={() => {
                  onSelectProject(project.id);
                  setIsOpen(false); // close on mobile
                }}
              >
                {project.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <input
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="New project"
            className="w-full p-2 mb-2 rounded border dark:bg-bgSecondaryDark"
          />
          <button
            onClick={() => {
              if (newProjectName.trim()) {
                onAddProject(newProjectName.trim());
                setNewProjectName("");
                setIsOpen(false); // close on mobile
              }
            }}
            className="w-full bg-btnBgLight dark:bg-btnBgDark text-white p-2 rounded hover:bg-btnBgHoverLight dark:hover:bg-btnBgHoverDark"
          >
            Add Project
          </button>
        </div>
      </aside>
    </>
  );
}
