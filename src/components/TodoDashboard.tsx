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
import Modal from "./ModalComponents";
import TodoCalendar from "./TodoCalender";
import TodoCalendarPopup from "./TodoCalender";
import TodoCalendarDropdown from "./TodoCalender";

type Todo = {
  id: string;
  title: string;
  description: string;
  date: string;
  sort_order: number;
  completed: boolean;
};

export default function TodoDashboard() {
  const { user } = useAuth();
  const [reload, setReload] = useState(false);
  const [todoDashboard, setTodoDashboard] = useState<any>([]);
  const [todoDates, setTodoDates] = useState<any[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [form, setForm] = useState({ title: "", description: "", date: "" });
  const [filter, setFilter] = useState("");
  const [modal, setModal] = useState('')
  const [filterDate, setFilterDate] = useState<string | null>('')
  const [id, setId] = useState<any>(null)
  const addTodo = () => {
    if (!form.title || !form.date) return;
    const newTodo: Todo = {
      ...form,
      id: crypto.randomUUID(),
      sort_order: todos.length,
      completed: false,
    };
    apiRequest(`/todos/${user?.id}`, "POST", newTodo)
      .then((data) => {
        if (data.status === "success") {
          alert("Todo added successfully");
          setReload(true);
        } else {
          alert("Failed to add todo: " + data.error);
        }
      })
      .catch((err) => {
        console.error("Error adding todo:", err);
        alert("An error occurred while adding the todo.");
      });

    setForm({ title: "", description: "", date: "" });
  };

  const removeTodo = (id: string) => {

    apiRequest(`/todos/${user?.id}/${id}`, "DELETE")
      .then((res) => {
        if (res.status === "success") {
          setTodos((prev) => prev.filter((todo) => todo.id !== id));
          setModal('')
        } else {
          alert("Failed to delete");
        }
      })
      .catch(console.error);
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
      .then((res) => {
        if (res.status !== "success") {
          alert("Failed to save new order");
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (!user) return;
    apiRequest(`/todos/todo-dashboard/${user.id}`, "GET")
      .then((data) => {
        setTodoDashboard(data.data || []);
        console.log(data.data)

      })
      .catch(console.error);
    apiRequest(`/todos/${user.id}/todo-dates`, "GET")
      .then((data) => {
        setTodoDates(data.dates || []);
        console.log(data.dates)

      })
      .catch(console.error);
    apiRequest(`/todos/${user.id}?date=${filterDate}`, "GET")
      .then((data) => {
        setTodos(data.todos || []);

      })
      .catch(console.error);

    setReload(false);
  }, [user, reload]);


  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6  bg-bgPrimaryLight dark:bg-bgPrimaryDark text-textPrimaryLight dark:text-textPrimaryDark">



      <Modal
        isOpen={modal == 'success' ? true : false}
        onClose={() => setModal('')}
        title={`Succesful Updated`}
        message={`Task has been updated`}
        type={`success`}

      />
      <Modal
        isOpen={modal == 'confirm' ? true : false}
        onClose={() => setModal('')}
        title={`Confirm Delete`}
        message={`you sure you want to delete this todo?`}
        type={`confirm`}
        onConfirm={() => { removeTodo(id) }}

      />
      <h2 className="text-2xl font-bold">
        Retro Task Dashboard
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-bgSecondaryLight dark:bg-bgSecondaryDark p-4 rounded shadow text-textPrimaryLight dark:text-textPrimaryDark">
          Total: {todoDashboard.total}
        </div>
        <div className="bg-bgSecondaryLight dark:bg-bgSecondaryDark p-4 rounded shadow text-textPrimaryLight dark:text-textPrimaryDark">Overdue: {todoDashboard.overdue}</div>
        <div className="bg-bgSecondaryLight dark:bg-bgSecondaryDark p-4 rounded shadow text-textPrimaryLight dark:text-textPrimaryDark">Upcoming: {todoDashboard.upcoming}</div>
        <div className="bg-bgSecondaryLight dark:bg-bgSecondaryDark p-4 rounded shadow text-textPrimaryLight dark:text-textPrimaryDark">Completed: {todoDashboard.completed}</div>
      </div>

      {/* Form */}
      <div className="bg-cardBgLight dark:bg-cardBgDark p-4 rounded-lg shadow space-y-4 text-textPrimaryLight dark:text-textPrimaryDark">
        <h3 className="text-lg font-semibold">Add New Todo</h3>
        <div className="grid md:grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="Title"
            className="p-2 rounded bg-bgPrimaryLight dark:bg-bgPrimaryDark text-textPrimaryLight dark:text-textPrimaryDark"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="date"
            className="p-2 rounded bg-bgPrimaryLight dark:bg-bgPrimaryDark text-textPrimaryLight dark:text-textPrimaryDark"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <button
            onClick={addTodo}
            className="flex items-center justify-center bg-btnBgLight dark:bg-btnBgDark hover:bg-btnBgHoverLight dark:hover:bg-btnBgHoverDark text-white p-2 rounded"
          >
            <Plus className="mr-1" size={18} /> Add
          </button>
        </div>
        <textarea
          placeholder="Description"
          className="w-full p-2 rounded bg-bgPrimaryLight dark:bg-bgPrimaryDark text-textPrimaryLight dark:text-textPrimaryDark"
          rows={2}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      {/* Search */}
      <div className="flex justify-between items-center mt-6">
        <h3 className="text-lg font-semibold">Your Tasks</h3>
        <input
          type="text"
          placeholder="Search title..."
          className="p-2 rounded bg-bgPrimaryLight dark:bg-bgPrimaryDark text-textPrimaryLight dark:text-textPrimaryDark border border-2 border-bgSecondaryLight dark:border-bgSecondaryDark"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <TodoCalendarDropdown
          todoDates={todoDates.map(d => d.date)}
          getTodoCount={(date) => {
            const found = todoDates.find(d => d.date === date);
            return found ? found.count : 0;
          }}
          onDateClick={(date) => {
            console.log('Selected date:', date);
            setFilterDate(date);
            setReload(true)
          }}
        />
      </div>

      {/* Task List */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todoList">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
              {filteredTodos.map((todo, index) => (
                <Draggable draggableId={todo.id} index={index} key={todo.id}>
                  {(provided) => {
                    const [edit, setEdit] = useState(false);
                    const [editData, setEditData] = useState({
                      title: todo.title,
                      description: todo.description,
                      date: todo.date,
                    });

                    const handleUpdate = () => {
                      const updatedTodo = { ...todo, ...editData };
                      apiRequest(`/todos/${user?.id}/${todo.id}`, "PUT", updatedTodo).then(
                        (res) => {
                          if (res.status === "success") {
                            setTodos((prev) =>
                              prev.map((t) => (t.id === todo.id ? updatedTodo : t))
                            );
                            setEdit(false);
                          } else {
                            alert("Failed to update todo");
                          }
                        }
                      );
                    };

                    const toggleComplete = () => {
                      apiRequest(`/todos/${user?.id}/${todo.id}/complete`, "PATCH").then(
                        (res) => {
                          if (res.status === "success") {


                            setModal('success')
                            setReload(true)
                            setTodos((prev) =>
                              prev.map((t) =>
                                t.id === todo.id ? { ...t, completed: !t.completed } : t
                              )
                            );
                          } else {
                            alert("Failed to toggle completion");
                          }
                        }
                      );
                    };

                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-cardBgLight dark:bg-cardBgDark p-4 rounded-lg shadow transition"
                      >
                        <div className="flex justify-between items-start gap-2">
                          {edit ? (
                            <div className="flex-1 space-y-2">
                              <input
                                type="text"
                                value={editData.title}
                                onChange={(e) =>
                                  setEditData({ ...editData, title: e.target.value })
                                }
                                className="w-full p-1 rounded bg-bgPrimaryLight dark:bg-bgPrimaryDark text-textPrimaryLight dark:text-textPrimaryDark"
                              />
                              <textarea
                                rows={2}
                                value={editData.description}
                                onChange={(e) =>
                                  setEditData({ ...editData, description: e.target.value })
                                }
                                className="w-full p-1 rounded bg-bgPrimaryLight dark:bg-bgPrimaryDark text-textPrimaryLight dark:text-textPrimaryDark"
                              />
                              <input
                                type="date"
                                value={editData.date}
                                onChange={(e) =>
                                  setEditData({ ...editData, date: e.target.value })
                                }
                                className="w-full p-1 rounded bg-bgPrimaryLight dark:bg-bgPrimaryDark text-textPrimaryLight dark:text-textPrimaryDark"
                              />
                              <div className="flex gap-2">
                                <button
                                  className="text-green-700 hover:underline"
                                  onClick={handleUpdate}
                                >
                                  Save
                                </button>
                                <button
                                  className="text-gray-500 hover:underline"
                                  onClick={() => setEdit(false)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex-1">
                              <h4
                                className={`font-semibold ${todo.completed
                                  ? "line-through text-gray-400"
                                  : "text-textPrimaryLight dark:text-textPrimaryDark"
                                  }`}
                              >
                                {todo.title}
                              </h4>
                              <p className="text-sm text-textSecondaryLight dark:text-textSecondaryDark">
                                {todo.description}
                              </p>
                              <p className="text-sm text-textSecondaryLight dark:text-textSecondaryDark mt-1">
                                Due: {dayjs(todo.date).format("DD MMM YYYY")}
                              </p>
                              <div className="mt-2 flex gap-3">
                                <button
                                  onClick={toggleComplete}
                                  className="text-errorLight dark:text-errorDark hover:underline"
                                >
                                  {todo.completed
                                    ? "Mark as Incomplete"
                                    : <p className="text-successLight dark:text-successDark">Mark as Complete</p>}
                                </button>
                                <button
                                  onClick={() => setEdit(true)}
                                  className="text-yellow-700 hover:underline"
                                >
                                  Edit
                                </button>
                              </div>
                            </div>
                          )}
                          <button
                            onClick={() => { setModal('confirm'); setId(todo.id) }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}