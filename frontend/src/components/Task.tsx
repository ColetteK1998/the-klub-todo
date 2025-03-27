import {
  Box,
  Checkbox,
  Grid,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import { Todo } from "../types/Todo";
import DeleteIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SubmitIcon from "@mui/icons-material/Done";
import styled from "styled-components";
import { useState } from "react";
import theme from "../theme";

const TaskContainer = styled(Paper)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

interface TaskProps {
  task: Todo;
  onUpdate: (variables: {
    id: number;
    data: { title?: string; completed?: boolean };
  }) => void;
  onDelete: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>(task.title);

  const handleToggleComplete = () => {
    onUpdate({ id: task.id, data: { completed: !task.completed } });
  };

  const handleEditTask = () => {
    onUpdate({ id: task.id, data: { title: taskTitle } });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <Grid>
      <TaskContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Checkbox
            onClick={handleToggleComplete}
            checked={task.completed}
            sx={{ "&.Mui-checked": { color: "primary.main" } }}
            disabled={isEditing}
          />

          {isEditing ? (
            <TextField
              variant="outlined"
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
            />
          ) : (
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {taskTitle}
            </span>
          )}
        </Box>
        {!task.completed && !isEditing ? (
          <ButtonContainer>
            <IconButton
              aria-label="edit"
              color="info"
              size="small"
              sx={{ padding: 0, color: theme.palette.primary.main }}
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              color="error"
              size="small"
              sx={{ padding: 0 }}
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </ButtonContainer>
        ) : (
          isEditing && (
            <IconButton
              aria-label="submit"
              size="small"
              sx={{ color: theme.palette.primary.main }}
              onClick={handleEditTask}
            >
              <SubmitIcon />
            </IconButton>
          )
        )}
      </TaskContainer>
    </Grid>
  );
};

export default Task;
