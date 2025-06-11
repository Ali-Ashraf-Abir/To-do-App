export default function Note({ note, provided, snapshot }: any) {
    return (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`p-2 rounded shadow bg-yellow-200 text-sm text-textPrimaryLight dark:bg-yellow-800 dark:text-textPrimaryDark cursor-move transition-all
  ${snapshot.isDragging ? "opacity-70" : "opacity-100"}
  break-words overflow-y-auto
`}
        >
            {note.content}
        </div>
    );
}
