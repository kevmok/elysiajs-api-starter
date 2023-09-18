import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';

export const tasks = sqliteTable('tasks', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	description: text('description').notNull(),
	completed: integer('completed', { mode: 'boolean' }).notNull(),
	// dueDate: date('dueDate'),
});

export type Task = typeof tasks.$inferSelect;
export type InsertTasks = typeof tasks.$inferInsert;

export const selectTaskSchema = createSelectSchema(tasks);
export const insertTaskSchema = createInsertSchema(tasks);
