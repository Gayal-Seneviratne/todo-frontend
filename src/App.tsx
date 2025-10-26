import { useEffect, useState } from "react";
import "./App.css";
import { createTask, listRecentTasks, markDone } from "./services/api";
import type { Task } from "./services/api";
import CreateTodo from "./components/CreateTodo/CreateTodo";
import ListTodos from "./components/ListTodos/ListTodos";
import { ToastProvider, useToast } from "./components/Toast/ToastContext";

function TodoApp() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listRecentTasks(5);
      setTasks(data);
    } catch (e: any) {
      setError(e?.message || "Failed to load tasks");
      showToast(e?.message || "Failed to load tasks", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await createTask({ title, description });
      setTitle("");
      setDescription("");
      refresh();
      showToast("Task created successfully", "success");
    } catch (e: any) {
      setError(e?.message || "Failed to create task");
      showToast(e?.message || "Failed to create task", "error");
    }
  };

  const onDone = async (id: string) => {
    try {
      await markDone(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      showToast("Task marked as done", "success");
    } catch (e: any) {
      setError(e?.message || "Failed to mark done");
      showToast(e?.message || "Failed to mark task as done", "error");
    }
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">ToDo</h1>
      <div className="todo-grid">
        <div className="left-pane">
          <CreateTodo
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
            onSubmit={onSubmit}
          />
        </div>

        <div className="divider" aria-hidden="true" />

        <div className="right-pane">
          <ListTodos
            tasks={tasks}
            loading={loading}
            error={error}
            onDone={onDone}
          />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <TodoApp />
    </ToastProvider>
  );
}
