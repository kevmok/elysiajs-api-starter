import { db } from 'db';
import Elysia from 'elysia';

export const ctx = new Elysia({
	name: '@app/ctx',
}).decorate('db', () => db);
