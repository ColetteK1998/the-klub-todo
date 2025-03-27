import express, { Request, Response } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todoController";

const router = express.Router();

router.get("/todos", async (req: Request, res: Response) => {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todo list" });
  }
});

router.put("/todos/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, completed } = req.body;
    const updatedTodo = await updateTodo(id, { title, completed });
    res.json(updatedTodo);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to update todo with id ${req.params.id}` });
  }
});

router.post("/todos", async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const newTodo = await createTodo({ title });
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ error: `Failed to create todo` });
  }
});

router.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedTodo = await deleteTodo(id);
    res.json(deletedTodo);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to delete todo with id ${req.params.id}` });
  }
});

export default router;
