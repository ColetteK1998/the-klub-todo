import { PrismaClient, Todo } from "@prisma/client";

const prismaClient = new PrismaClient();

// Get all todos
export const getAllTodos = async (): Promise<Todo[]> => {
  return await prismaClient.todo.findMany();
};

// Update a todo
export const updateTodo = async (
  id: number,
  data: Partial<Todo>
): Promise<Todo | null> => {
  return await prismaClient.todo.update({
    where: { id },
    data,
  });
};

// Create a todo
export const createTodo = async (data: Partial<Todo>): Promise<Todo> => {
  const todoObj = {
    title: data.title ?? "",
    createdAt: new Date(),
    completed: false,
  };
  return await prismaClient.todo.create({ data: todoObj });
};

// Delete a todo by ID
export const deleteTodo = async (id: number): Promise<Todo> => {
  return await prismaClient.todo.delete({
    where: { id },
  });
};
