import type { Task } from "../../services/api";
import "./ListTodos.css";

interface ListTodosProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onDone: (id: string) => void;
}

export default function ListTodos({ tasks, loading, error, onDone }: ListTodosProps) {
  return (
    <>
      <h2 className="todo-recent-title">Recent (5)</h2>
      {loading && <p className="todo-loading">Loading...</p>}
      {error && <p className="todo-error">{error}</p>}
      <div className="todo-list">
        {tasks.map((t) => (
          <div className="todo-item" key={t.id}>
            <div>
              <strong className="todo-item-title">{t.title}</strong>
              {t.description && <p className="todo-item-desc">{t.description}</p>}
            </div>
            <button className="todo-done-btn" onClick={() => onDone(t.id)}>Done</button>
          </div>
        ))}
        {!loading && tasks.length === 0 && <p className="todo-empty">No pending tasks.</p>}
      </div>
    </>
  );
}
