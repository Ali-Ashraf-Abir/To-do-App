"use client";


import ProjectBoards from "@/components/planner/ProjectBoards";
import { useState } from "react";
import { DropResult } from "@hello-pangea/dnd";
import Sidebar from "@/components/planner/sidebar/Sidebar";

export default function PlannerPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [boards, setBoards] = useState<any[]>([]); // boards per project

  const handleAddProject = (name: string) => {
    const newProject = { id: crypto.randomUUID(), name };
    setProjects((prev) => [...prev, newProject]);
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    // fetch boards for project
    // For now dummy
    setBoards([
      { id: "board-1", name: "Homepage", notes: [] },
      { id: "board-2", name: "Dashboard", notes: [] },
    ]);
  };

  const handleAddBoard = (boardName: string) => {
    const newBoard = { id: crypto.randomUUID(), name: boardName, notes: [] };
    setBoards((prev) => [...prev, newBoard]);
  };

  const handleAddNote = (boardId: string, content: string) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === boardId
          ? {
            ...board,
            notes: [...board.notes, { id: crypto.randomUUID(), content }],
          }
          : board
      )
    );
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    // same board
    if (source.droppableId === destination.droppableId) {
      const boardIndex = boards.findIndex((b) => b.id === source.droppableId);
      if (boardIndex === -1) return;

      const board = boards[boardIndex];
      const newNotes = [...board.notes];
      const [movedNote] = newNotes.splice(source.index, 1);
      newNotes.splice(destination.index, 0, movedNote);

      const newBoards = [...boards];
      newBoards[boardIndex] = { ...board, notes: newNotes };
      setBoards(newBoards);
    } else {
      // across boards
      const sourceBoardIndex = boards.findIndex((b) => b.id === source.droppableId);
      const destBoardIndex = boards.findIndex((b) => b.id === destination.droppableId);
      if (sourceBoardIndex === -1 || destBoardIndex === -1) return;

      const sourceBoard = boards[sourceBoardIndex];
      const destBoard = boards[destBoardIndex];

      const sourceNotes = [...sourceBoard.notes];
      const destNotes = [...destBoard.notes];

      const [movedNote] = sourceNotes.splice(source.index, 1);
      destNotes.splice(destination.index, 0, movedNote);

      const newBoards = [...boards];
      newBoards[sourceBoardIndex] = { ...sourceBoard, notes: sourceNotes };
      newBoards[destBoardIndex] = { ...destBoard, notes: destNotes };

      setBoards(newBoards);
    }
  };

  return (
    <div className="flex min-h-screen bg-bgPrimaryLight dark:bg-bgPrimaryDark pt-16">
      <Sidebar
        projects={projects}
        onSelectProject={handleSelectProject}
        onAddProject={handleAddProject}
      />
      {selectedProjectId && (
        <ProjectBoards
          projectId={selectedProjectId}
          boards={boards}
          onDragEnd={handleDragEnd}
          onAddBoard={handleAddBoard}
          onAddNote={handleAddNote}
        />
      )}
    </div>
  );
}
