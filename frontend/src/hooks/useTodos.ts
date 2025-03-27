import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "../services/todoService";
import { Todo } from "../types/Todo";

export const useTodoList = () => {
  const queryClient = useQueryClient();

  // Fetch full todo list
  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 60000,
  });

  // Mutation for creating a todo
  const createTodoMutation = useMutation({
    mutationFn: ({ data }: { data: { title?: string } }) => createTodo(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      const newTodo = { id: Date.now(), ...data, completed: false };
      queryClient.setQueryData(["todos"], [...previousTodos, newTodo]);

      return { previousTodos };
    },
    onError: (error, _newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos); // Rollback to previous todos on failure
      }
      console.error("Failed to create todo:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // Refresh todos after creation
    },
  });

  // Mutation for updating a todo
  const updateTodoMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: { title?: string; completed?: boolean };
    }) => updateTodo(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      queryClient.setQueryData(
        ["todos"],
        (oldTodos?: Todo[]) =>
          oldTodos?.map((todo) =>
            todo.id === id ? { ...todo, ...data } : todo
          ) || []
      );

      return { previousTodos };
    },
    onError: (error, _updatedTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos); // Rollback to previous todos on failure
      }
      console.error("Failed to update todo:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // Refresh todos after update
    },
  });

  // Mutation for deleting a todo
  const deleteTodoMutation = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      queryClient.setQueryData(
        ["todos"],
        (oldTodos?: Todo[]) => oldTodos?.filter((todo) => todo.id !== id) || []
      );

      return { previousTodos };
    },
    onError: (error, _deletedTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos); // Rollback to previous todos on failure
      }
      console.error("Failed to delete todo:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // Refresh todos after deletion
    },
  });

  return {
    tasks,
    isLoading,
    isError,
    error,
    onCreate: createTodoMutation.mutate,
    onUpdate: updateTodoMutation.mutate,
    onDelete: deleteTodoMutation.mutate,
  };
};
