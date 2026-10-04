const { getTasks, addTask } = require("./store");

function listTasks({ page = 1, limit = 2, priority }) {
  page = Number(page);
  limit = Number(limit);

  let tasks = getTasks();

  if (priority) {
    tasks = tasks.filter((task) => task.priority === priority);
  }

  const start = (page - 1) * limit;

  return {
    items: tasks.slice(start, start + limit),
    total: tasks.length,
    page,
    limit,
  };
}

function createTask({ title, priority = "medium" }) {
  if (typeof title !== "string" || !title.trim()) {
    throw new Error("Title is required");
  }

  const allowedPriorities = ["low", "medium", "high"];

  if (!allowedPriorities.includes(priority)) {
    throw new Error("Invalid priority");
  }

  const tasks = getTasks();

  const id =
    tasks.length === 0
      ? 1
      : Math.max(...tasks.map((task) => task.id)) + 1;

  const task = {
    id,
    title,
    priority,
    completed: false,
  };

  addTask(task);

  return task;
}

function completeTask(id) {
  const task = getTasks().find((task) => task.id === Number(id));

  if (!task) {
    throw new Error("Task not found");
  }

  task.completed = true;

  return task;
}

module.exports = {
  listTasks,
  createTask,
  completeTask,
};