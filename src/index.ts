import { api } from 'controllers/index';
import { Elysia, t } from 'elysia';

const app = new Elysia().use(api).listen(3000);
console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
