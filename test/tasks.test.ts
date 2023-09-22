import { describe, expect, it } from "bun:test";
import { InsertTasks, Task } from "db/schema/taskSchema";
import { app } from "index";

async function getAllTasks(): Promise<Task[]> {
  const response = await app.handle(
    new Request("http://localhost:3000/api/tasks")
  );
  return await response.json<Task[]>();
}

async function createTestTask(): Promise<{ message: string; task: Task }> {
  const response = await app.handle(
    new Request("http://localhost:3000/api/tasks", {
      body: JSON.stringify({
        description: "lorem ipsum",
        completed: false,
      } as InsertTasks),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
  );
  return await response.json<{
    message: string;
    task: Task;
  }>();
}

describe("Tasks Controller", () => {
  it("should get tasks", async () => {
    const response = await app.handle(
      new Request("http://localhost:3000/api/tasks")
    );
    expect(response.status).toEqual(200);
    expect(await response.json()).toBeArray();
  });

  it("should create task", async () => {
    let response = await app.handle(
      new Request("http://localhost:3000/api/tasks", {
        body: JSON.stringify({
          description: "lorem ipsum",
          completed: false,
        } as InsertTasks),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
    const createResJson = await response.json<{
      message: string;
      task: Task;
    }>();
    expect(response.status).toEqual(200);
    expect(createResJson.message).toEqual("Task created");

    const tasks = await getAllTasks();
    expect(tasks[tasks.length - 1]).toMatchObject({
      description: "lorem ipsum",
      completed: false,
    } as InsertTasks);
  });

  it("should update task", async () => {
    // first we create a task
    const testTask = await createTestTask();

    // and then we updated it
    const response = await app.handle(
      new Request(`http://localhost:3000/api/tasks/${testTask.task.id}`, {
        method: "PUT",
        body: JSON.stringify({
          completed: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
    const updateResJson = await response.json<{
      message: string;
      task: Task;
    }>();

    expect(response.status).toEqual(200);
    expect(updateResJson.task.completed).toBeTrue();
  });

  it("should delete task", async () => {
    // first we create a task
    const testTask = await createTestTask();

    // and then we delete it
    const response = await app.handle(
      new Request(`http://localhost:3000/api/tasks/${testTask.task.id}`, {
        method: "DELETE",
      })
    );
    expect(response.status).toEqual(200);

    // and then we check it doesn't exist anymore

    const tasks = await getAllTasks();
    expect(tasks[tasks.length - 1].id).not.toEqual(testTask.task.id);
  });
});
