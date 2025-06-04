"use client";

import { useEffect, useState } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";
import dayjs from "dayjs";
import { Plus, Trash } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import apiRequest from "@/utilities/apiCalls";

type Todo = {
    id: string;
    title: string;
    description: string;
    date: string;
    sort_order:number;
};

export default function TodoDashboard() {
    const { user } = useAuth();
    const [reload, setReload] = useState(false)
    const [todos, setTodos] = useState<Todo[]>([]);
    const [form, setForm] = useState({ title: "", description: "", date: "" });
    const [filter, setFilter] = useState("");
    console.log(todos)
    const addTodo = () => {
        if (!form.title || !form.date) return;
        const newTodo: Todo = {
            ...form,
            id: crypto.randomUUID(),
            sort_order: todos.length,
        };
        apiRequest(`/todos/${user && user?.id}`, "POST", newTodo)
            .then(data => {
                if (data.status === 'success') {
                    alert("Todo added successfully");
                }
                else {
                    alert("Failed to add todo: " + data.error);
                }
            })
            .catch(err => {
                console.error("Error adding todo:", err);
                alert("An error occurred while adding the todo.");
            })
        setForm({ title: "", description: "", date: "" });
        setReload(true)
    };

    const removeTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(filter.toLowerCase())
    );

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const reordered = Array.from(todos);
        const [moved] = reordered.splice(source.index, 1);
        reordered.splice(destination.index, 0, moved);

        setTodos(reordered);

        const payload = reordered.map((todo, index) => ({
            id: todo.id,
            sort_order: index,
        }));

        apiRequest(`/todos/${user?.id}/reorder`, "PUT", payload)
            .then(res => {
                if (res.status !== "success") {
                    alert("Failed to save new order");
                }
            })
            .catch(err => {
                console.error("Error saving sort order:", err);
            });
    };

    useEffect(() => {
        apiRequest(`/todos/${user && user?.id}`, "GET")
            .then(data => {
                console.log(data);
                setTodos(data.todos || [])
            })
            .catch(err => { console.error("Error fetching todos:", err) })
        setReload(false)
    }, [user, reload])
    const overdue = todos.filter((t) => dayjs(t.date).isBefore(dayjs(), "day"));
    const upcoming = todos.filter((t) => dayjs(t.date).isAfter(dayjs(), "day"));

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-white">
                <div className="bg-blue-600 p-4 rounded-lg shadow">Total: {todos.length}</div>
                <div className="bg-red-600 p-4 rounded-lg shadow">Overdue: {overdue.length}</div>
                <div className="bg-green-600 p-4 rounded-lg shadow">Upcoming: {upcoming.length}</div>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Todo</h3>
                <div className="grid md:grid-cols-3 gap-2">
                    <input
                        type="text"
                        placeholder="Title"
                        className="p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                    <input
                        type="date"
                        className="p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                    <button
                        onClick={addTodo}
                        className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                    >
                        <Plus className="mr-1" size={18} /> Add
                    </button>
                </div>
                <textarea
                    placeholder="Description"
                    className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
                    rows={2}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
            </div>

            {/* Search */}
            <div className="flex justify-between items-center mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Tasks</h3>
                <input
                    type="text"
                    placeholder="Search title..."
                    className="p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            {/* Task List */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="todoList">
                    {(provided: any) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="space-y-4"
                        >
                            {todos.map((todo, index) => {
                                const isVisible = todo.title.toLowerCase().includes(filter.toLowerCase());
                                if (!isVisible) return null;

                                return (
                                    <Draggable draggableId={todo.id} index={index} key={todo.id}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h4 className="font-semibold text-gray-800 dark:text-white">
                                                            {todo.title}
                                                        </h4>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {todo.description}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                            Due: {dayjs(todo.date).format("DD MMM YYYY")}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeTodo(todo.id)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}
