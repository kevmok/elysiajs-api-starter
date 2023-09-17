import { ctx } from 'context';
import { tasks } from 'db/schema/taskSchema';
import { eq } from 'drizzle-orm';
import Elysia, { t } from 'elysia';

export const tasksController = new Elysia({ prefix: '/tasks' })
	.use(ctx)
	.get(
		'/',
		async ({ db }) => {
			console.log('here');
			const taskList = await db().select().from(tasks);
			console.log(taskList);
			return taskList;
		},
		{
			response: t.Array(
				t.Object({
					id: t.Optional(t.Number()),
					description: t.String(),
					completed: t.Boolean(),
				}),
			),
		},
	)
	.post(
		'/',
		async ({ body, db }) => {
			try {
				const task = await db().insert(tasks).values(body).returning();
				return { message: 'Task created', task };
			} catch (error) {
				console.log(error);
				return { message: 'error' };
			}
		},
		{
			body: t.Object({
				description: t.String(),
				completed: t.Boolean(),
			}),
		},
	)
	.put(
		'/:id',
		async ({ params, body, db }) => {
			let [task] = await db()
				.select()
				.from(tasks)
				.where(eq(tasks.id, parseInt(params.id)));

			if (!task) return { message: 'Task does not exist' };

			[task] = await db()
				.update(tasks)
				.set({ completed: body.completed })
				.where(eq(tasks.id, parseInt(params.id)))
				.returning();

			return { task };
		},
		{ body: t.Object({ completed: t.Boolean() }) },
	)
	.delete('/:id', async ({ params, db }) => {
		let [task] = await db()
			.select()
			.from(tasks)
			.where(eq(tasks.id, parseInt(params.id)));

		if (!task) return { message: 'Task does not exist' };

		[task] = await db()
			.delete(tasks)
			.where(eq(tasks.id, parseInt(params.id)))
			.returning();

		return { message: 'Task succesfully deleted!', task };
	});
