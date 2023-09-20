import { describe, expect, it } from "bun:test";
import { InsertTasks, Task } from "db/schema/taskSchema";
import { app } from "index";

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

    response = await app.handle(new Request("http://localhost:3000/api/tasks"));
    const listResJson = await response.json<Task[]>();
    expect(listResJson[listResJson.length - 1]).toMatchObject({
      description: "lorem ipsum",
      completed: false,
    } as InsertTasks);
  });
});
