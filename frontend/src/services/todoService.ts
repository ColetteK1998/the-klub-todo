import { Todo } from "../types/Todo";

const API_URL = import.meta.env.VITE_API_URL;

// Fetch all todos
export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}/todos`);
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json() as Promise<Todo[]>;
};

// Create a new todo
export const createTodo = async (data: { title?: string }) => {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }

  return response.json();
};

// Update a todo by ID
export const updateTodo = async (
  id: number,
  data: { title?: string; completed?: boolean }
) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
};

// Delete a todo by ID
export const deleteTodo = async (id: number) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }

  return response.json();
};
