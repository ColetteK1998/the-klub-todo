import "./App.css";
import { useTodoList } from "./hooks/useTodos";
import { AppBar, Container } from "@mui/material";
import TodoList from "./components/TodoList";
import styled from "styled-components";
import Logo from "./assets/the-klub-logo.svg";
import theme from "./theme";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddTaskCard from "./components/AddTaskCard";

const ContentWrapper = styled(Container)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem 6rem 2rem;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;

function App() {
  const { tasks, isLoading, error, onUpdate, onDelete, onCreate } =
    useTodoList();

  const [isAddTaskActive, setIsAddTaskActive] = useState<boolean>(false);

  if (isLoading) return <p>Your todo list is loading...</p>;
  if (error) return <p>Oops! An error has occurred fetching your todo list</p>;

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          padding: "16px",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <img src={Logo} width={"133px"} />
      </AppBar>
      <ContentWrapper>
        <TodoList tasks={tasks ?? []} onUpdate={onUpdate} onDelete={onDelete} />
        <AddTaskCard
          isAddTaskActive={isAddTaskActive}
          setIsAddTaskActive={setIsAddTaskActive}
          onCreate={onCreate}
        />
      </ContentWrapper>
      <AnimatePresence>
        {isAddTaskActive && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
