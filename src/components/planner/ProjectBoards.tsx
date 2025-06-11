import React from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Board from "./Board";


export default function ProjectBoards({
    projectId,
    boards,
    onDragEnd,
    onAddBoard,
    onAddNote, 
}: {
    projectId: string;
    boards: any[];
    onDragEnd: (result: DropResult) => void;
    onAddBoard: (boardName: string) => void;
    onAddNote: (boardId: string, content: string) => void;
}) {
    const [newBoardName, setNewBoardName] = React.useState("");

    return (
        <div className="flex-1 p-6 bg-bgPrimaryLight dark:bg-bgPrimaryDark text-textPrimaryLight dark:text-textPrimaryDark">
            <h1 className="text-2xl font-bold mb-4 text-textPrimaryLight dark:text-textPrimaryDark">Boards</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex flex-wrap gap-4 ">
                    {boards.map((board) => (
                        <Board key={board.id} board={board} onAddNote={onAddNote} /> 
                    ))}
                    <div className="w-full md:w-[280px]">
                        <input
                            value={newBoardName}
                            onChange={(e) => setNewBoardName(e.target.value)}
                            placeholder="New board"
                            className="p-2 border rounded mb-2 w-full bg-bgSecondaryLight dark:bg-bgSecondaryDark text-textPrimaryLight dark:text-textPrimaryDark"
                        />
                        <button
                            onClick={() => {
                                if (newBoardName.trim()) {
                                    onAddBoard(newBoardName.trim());
                                    setNewBoardName("");
                                }
                            }}
                            className="w-full bg-btnBgLight dark:bg-btnBgDark text-white p-2 rounded"
                        >
                            Add Board
                        </button>
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
}
