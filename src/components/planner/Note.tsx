export default function Note({ note, provided, snapshot }: any) {
    return (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`p-2 rounded shadow bg-yellow-200 text-sm
  ${snapshot.isDragging ? "opacity-70" : "opacity-100"}
  break-words overflow-y-auto
`}
        >
            {note.content}
        </div>
    );
}
