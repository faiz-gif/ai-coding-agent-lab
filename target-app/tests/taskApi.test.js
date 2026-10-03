const request = require("supertest");
const app = require("../src/app");
const { resetTasks } = require("../src/store");

beforeEach(() => {
  resetTasks();
});

describe("Task API", () => {
  test("returns all tasks", async () => {
    const response = await request(app).get("/tasks?limit=10");

    expect(response.status).toBe(200);
    expect(response.body.items).toHaveLength(5);
  });

  test("filters tasks by priority", async () => {
    const response = await request(app).get(
      "/tasks?priority=high&limit=10"
    );

    expect(response.body.items).toHaveLength(2);
    expect(
      response.body.items.every((task) => task.priority === "high")
    ).toBe(true);
  });

  test("paginates correctly", async () => {
    const response = await request(app).get(
      "/tasks?page=2&limit=2"
    );

    expect(response.body.items.map((task) => task.id))
      .toEqual([3, 4]);
  });

  test("creates a task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({
        title: "Learn agent tool calling",
        priority: "high",
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(
      "Learn agent tool calling"
    );
  });

  test("rejects blank titles", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({
        title: "   ",
        priority: "high",
      });

    expect(response.status).toBe(400);
  });

  test("completes a task", async () => {
    const response = await request(app)
      .patch("/tasks/1/complete");

    expect(response.status).toBe(200);
    expect(response.body.completed).toBe(true);
  });
});