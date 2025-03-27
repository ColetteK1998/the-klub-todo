import { Box, Fab, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SubmitIcon from "@mui/icons-material/Done";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AddTaskContainer = styled(Box)`
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const AddTaskInputContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  padding: 8px;
  border-radius: 8px;
  z-index: 10;
`;

const IconWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
`;
interface AddTaskCardProps {
  isAddTaskActive: boolean;
  setIsAddTaskActive: React.Dispatch<React.SetStateAction<boolean>>;
  onCreate: (variables: { data: { title?: string } }) => void;
}

const AddTaskCard: React.FC<AddTaskCardProps> = ({
  isAddTaskActive,
  setIsAddTaskActive,
  onCreate,
}) => {
  const [newTask, setNewTask] = useState<string>();

  useEffect(() => {
    if (!isAddTaskActive) {
      setNewTask(undefined);
    }
  }, [isAddTaskActive]);

  const handleAddTask = () => {
    if (!newTask || newTask === "") {
      setIsAddTaskActive(false);
      return;
    }

    onCreate({ data: { title: newTask } });
    setIsAddTaskActive(false);
  };

  return (
    <AddTaskContainer>
      {isAddTaskActive && (
        <>
          <AddTaskInputContainer
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <TextField
              variant="outlined"
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
            />
          </AddTaskInputContainer>
        </>
      )}
      <Fab
        color="primary"
        aria-label="toggle-task"
        onClick={
          isAddTaskActive ? handleAddTask : () => setIsAddTaskActive(true)
        }
      >
        <IconWrapper
          key={isAddTaskActive ? "submit-icon" : "add-icon"}
          initial={{ rotate: -90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {isAddTaskActive ? <SubmitIcon /> : <AddIcon />}
        </IconWrapper>
      </Fab>
    </AddTaskContainer>
  );
};

export default AddTaskCard;
