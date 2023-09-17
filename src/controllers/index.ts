import Elysia from 'elysia';
import { tasksController } from './tasksController';

export const api = new Elysia({
	prefix: '/api',
}).use(tasksController);
