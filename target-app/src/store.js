const initialTasks = [
  { id: 1, title: "Fix auth flow", priority: "high", completed: false },
  { id: 2, title: "Write tests", priority: "medium", completed: false },
  { id: 3, title: "Refactor service", priority: "low", completed: false },
  { id: 4, title: "Review PR", priority: "high", completed: false },
  { id: 5, title: "Update docs", priority: "medium", completed: false },
];

let tasks = [];

function resetTasks() {
  tasks = initialTasks.map((task) => ({ ...task }));
}

function getTasks() {
  return tasks;
}

function addTask(task) {
  tasks.push(task);
}

resetTasks();

module.exports = {
  getTasks,
  addTask,
  resetTasks,
};