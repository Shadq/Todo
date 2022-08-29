const Todo = require("../models/todoModel");
const mongoose = require("mongoose");

const getTodo = async (req, res) => {
  const todo = Todo.find({ user: req.user._id }, (err, data) => {
    res.json({ data: data });
  });
};

const createTodo = async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.json({ error: "invalid form" });
  }

  const newTodo = await Todo.create({
    user: req.user._id,
    todo: text,
  });

  res.json({ todo: newTodo });
};

const updateTodoText = async (req, res) => {
  const { todoToUpdate, newTodo } = req.body;

  const updatedTodo = await Todo.findOneAndUpdate(
    { todo: todoToUpdate },
    { todo: newTodo }
  );

  res.json({ todo: updatedTodo });
};

const deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id, async (err, data) => {
    if (data === null) {
      res.send({ error: "Todo not found" });
    } else {
      deleteTodo();
    }
  }).clone();
  const deleteTodo = async () => {
    await todo.remove();
  };
};

module.exports = {
  getTodo,
  createTodo,
  updateTodoText,
  deleteTodo,
};
