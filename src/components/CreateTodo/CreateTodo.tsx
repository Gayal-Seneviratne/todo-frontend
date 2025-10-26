import React from "react";
import "./CreateTodo.css";

interface CreateTodoProps {
  title: string;
  description: string;
  setTitle: (v: string) => void;
  setDescription: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function CreateTodo({ title, description, setTitle, setDescription, onSubmit }: CreateTodoProps) {
  return (
    <form className="todo-form" onSubmit={onSubmit}>
      <input
        className="todo-input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={200}
        required
      />
      <textarea
        className="todo-textarea"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      <button className="todo-add-btn" type="submit">Add Task</button>
    </form>
  );
}
