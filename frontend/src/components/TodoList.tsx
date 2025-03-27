import { Box, Grid, Typography } from "@mui/material";
import { Todo } from "../types/Todo";
import Task from "./Task";
import styled from "styled-components";

const TodoListWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
`;

interface TodoListProps {
  tasks: Todo[];
  onUpdate: (variables: {
    id: number;
    data: { title?: string; completed?: boolean };
  }) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, onUpdate, onDelete }) => {
  const incompleteTasks = tasks
    .filter((task) => !task.completed)
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  const completeTasks = tasks
    .filter((task) => task.completed)
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  return (
    <TodoListWrapper>
      <Typography variant="h5" marginBottom={"20px"}>
        My tasks
      </Typography>
      {incompleteTasks && incompleteTasks.length > 0 ? (
        <Grid direction={"column"} container spacing={2} sx={{ width: "100%" }}>
          {incompleteTasks?.map((task) => {
            return (
              <Task
                key={task.id}
                task={task}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            );
          })}
        </Grid>
      ) : completeTasks.length > 0 ? (
        <Typography>You've completed all your tasks!</Typography>
      ) : (
        <Typography>Add a task to get started</Typography>
      )}

      {completeTasks && completeTasks.length > 0 && (
        <>
          <Typography variant="h5" marginBottom={"20px"} marginTop={"24px"}>
            Complete tasks
          </Typography>
          <Grid
            direction={"column"}
            container
            spacing={2}
            sx={{ width: "100%" }}
          >
            {completeTasks?.map((task) => {
              return (
                <Task
                  key={task.id}
                  task={task}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              );
            })}
          </Grid>
        </>
      )}
    </TodoListWrapper>
  );
};

export default TodoList;
