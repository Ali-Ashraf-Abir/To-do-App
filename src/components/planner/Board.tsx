import React, { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import Note from "./Note";


export default function Board({
    board,
    onAddNote,
}: {
    board: any;
    onAddNote: (boardId: string, content: string) => void;
}) {
    const [newNote, setNewNote] = useState("");

    return (
        <div className="bg-cardBgLight dark:bg-cardBgDark p-4 rounded shadow w-full md:w-[280px] text-textPrimaryLight  flex flex-col dark:text-textPrimaryDark">


            <h2 className="text-xl font-semibold mb-2">{board.name}</h2>


            <Droppable droppableId={board.id}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex-1 overflow-y-auto space-y-2 pr-1"
                        style={{ minHeight: "100px", display: "flex", flexDirection: "column" }}
                    >
                        {board.notes.map((note: any, index: number) => (
                            <Draggable draggableId={note.id} index={index} key={note.id}>
                                {(provided, snapshot) => (
                                    <Note
                                        note={note}
                                        provided={provided}
                                        snapshot={snapshot}
                                    />
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder && (
                            <div className="">{provided.placeholder}</div>
                        )}
                    </div>
                )}
            </Droppable>

            <div className="mt-3 ">
                <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={2}
                    className="w-full p-2 border rounded mb-2 dark:bg-bgSecondaryDark"
                />
                <button
                    onClick={() => {
                        if (newNote.trim()) {
                            onAddNote(board.id, newNote.trim());
                            setNewNote("");
                        }
                    }}
                    className="bg-btnBgPrimary dark:bg-btnBgDark text-white w-full py-1 rounded"
                >
                    Add Note
                </button>
            </div>
        </div>
    );
}
