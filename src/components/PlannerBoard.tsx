"use client";

import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Plus, Trash, Edit } from "lucide-react";

type Note = {
  id: string;
  content: string;
};

type Column = {
  id: string;
  title: string;
  notes: Note[];
};

const initialData: Record<string, Column> = {
  todo: {
    id: "todo",
    title: "To Do",
    notes: [],
  },
  inProgress: {
    id: "inProgress",
    title: "In Progress",
    notes: [],
  },
  done: {
    id: "done",
    title: "Done",
    notes: [],
  },
};

export default function PlannerBoard() {
  const [columns, setColumns] = useState(initialData);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [activeColumn, setActiveColumn] = useState<string | null>(null);


  const addNote = (columnId: string) => {
    if (!newNoteContent.trim()) return;
    const newNote: Note = {
      id: crypto.randomUUID(),
      content: newNoteContent.trim(),
    };
    setColumns((prev) => {
      return {
        ...prev,
        [columnId]: {
          ...prev[columnId],
          notes: [...prev[columnId].notes, newNote],
        },
      };
    });
    setNewNoteContent("");
    setActiveColumn(null);
  };


  const removeNote = (columnId: string, noteId: string) => {
    setColumns((prev) => {
      return {
        ...prev,
        [columnId]: {
          ...prev[columnId],
          notes: prev[columnId].notes.filter((note) => note.id !== noteId),
        },
      };
    });
  };


  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;


    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceNotes = Array.from(sourceCol.notes);
    const destNotes = Array.from(destCol.notes);


    if (source.droppableId === destination.droppableId) {
      const [movedNote] = sourceNotes.splice(source.index, 1);
      sourceNotes.splice(destination.index, 0, movedNote);

      setColumns((prev) => ({
        ...prev,
        [source.droppableId]: {
          ...prev[source.droppableId],
          notes: sourceNotes,
        },
      }));
    } else {

      const [movedNote] = sourceNotes.splice(source.index, 1);
      destNotes.splice(destination.index, 0, movedNote);

      setColumns((prev) => ({
        ...prev,
        [source.droppableId]: {
          ...prev[source.droppableId],
          notes: sourceNotes,
        },
        [destination.droppableId]: {
          ...prev[destination.droppableId],
          notes: destNotes,
        },
      }));
    }
  };

  console.log("Columns state:", columns);
  console.log("New note content:", newNoteContent);
  console.log("Active column:", activeColumn);

return (
  <div className="min-h-screen p-6  bg-bgPrimaryLight text-textPrimaryLight dark:bg-bgPrimaryDark dark:text-textPrimaryDark">
    <h1 className="text-3xl font-bold mb-6 text-center">Planner Board</h1>

    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 max-w-7xl mx-auto">
        {Object.entries(columns).map(([colId, column]) => (
          <div
            key={colId}
            className="rounded-lg shadow p-4 flex flex-col flex-grow min-w-[250px] bg-cardBgLight text-textSecondaryLight dark:bg-cardBgDark dark:text-textSecondaryDark"
          >
            <h2 className="text-xl font-semibold mb-4">{column.title}</h2>

            <Droppable droppableId={colId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col gap-3 min-h-[150px] flex-grow"
                >
                  {column.notes.map((note, index) => (
                    <Draggable key={note.id} draggableId={note.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-3 rounded-lg shadow cursor-move transition ${
                            snapshot.isDragging
                              ? "bg-bgSecondaryLight dark:bg-bgSecondaryDark"
                              : "bg-bgSecondaryLight dark:bg-btnBgHoverDark"
                          } text-textPrimaryLight dark:text-textPrimaryDark`}
                        >
                          <div className="flex justify-between items-start">
                            <p className="whitespace-pre-wrap">{note.content}</p>
                            <button
                              onClick={() => removeNote(colId, note.id)}
                              aria-label="Delete note"
                              className="hover:opacity-80 text-btnBgLight dark:text-btnBgDark"
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {activeColumn === colId ? (
              <div className="mt-4 flex gap-2">
                <textarea
                  rows={3}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Enter note..."
                  autoFocus
                  className="flex-grow p-2 rounded border border-btnBgLight dark:border-btnBgDark bg-bgSecondaryLight dark:bg-bgSecondaryDark text-textPrimaryLight dark:text-textPrimaryDark"
                />
                <button
                  onClick={() => addNote(colId)}
                  className="text-white px-4 rounded bg-btnBgLight hover:bg-btnBgHoverLight dark:bg-btnBgDark dark:hover:bg-btnBgHoverDark"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setActiveColumn(null);
                    setNewNoteContent("");
                  }}
                  className="px-3 rounded bg-bgSecondaryLight dark:bg-bgSecondaryDark text-textPrimaryLight dark:text-textPrimaryDark"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveColumn(colId)}
                className="mt-4 text-white px-3 py-1 rounded flex items-center justify-center gap-1 bg-btnBgLight hover:bg-btnBgHoverLight dark:bg-btnBgDark dark:hover:bg-btnBgHoverDark"
              >
                <Plus size={16} /> Add Note
              </button>
            )}
          </div>
        ))}
      </div>
    </DragDropContext>
  </div>
);
}