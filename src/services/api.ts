import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: "PENDING" | "DONE";
  createdAt: string;
  updatedAt: string;
};

export async function listRecentTasks(limit = 5): Promise<Task[]> {
  const res = await api.get("/tasks", { params: { limit } });
  return res.data.data as Task[];
}

export async function createTask(payload: { title: string; description?: string }): Promise<Task> {
  const res = await api.post("/tasks", payload);
  return res.data.data as Task;
}

export async function markDone(id: string): Promise<Task> {
  const res = await api.patch(`/tasks/${id}/done`);
  return res.data.data as Task;
}
