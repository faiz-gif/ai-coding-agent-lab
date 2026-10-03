const express = require("express");
const {
  listTasks,
  createTask,
  completeTask,
} = require("./taskService");

const app = express();

app.use(express.json());

app.get("/tasks", (req, res) => {
  const result = listTasks(req.query);
  res.json(result);
});

app.post("/tasks", (req, res) => {
  try {
    const task = createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.patch("/tasks/:id/complete", (req, res) => {
  try {
    const task = completeTask(req.params.id);
    res.json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = app;