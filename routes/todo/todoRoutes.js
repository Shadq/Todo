const express = require("express");
const router = express.Router();
const {
  getTodo,
  createTodo,
  updateTodoText,
  deleteTodo,
} = require("../../controllers/todoController");
const { authorized } = require("../../middleware/authMiddleware");

router.get("/getTodo", authorized, getTodo);
router.post("/createTodo", authorized, createTodo);
router.put("/updateTodoText", authorized, updateTodoText);
router.delete("/deleteTodo/:id", authorized, deleteTodo);

module.exports = router;
