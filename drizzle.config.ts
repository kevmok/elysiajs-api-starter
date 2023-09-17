import type { Config } from 'drizzle-kit';

export default {
	schema: './src/db/schema',
	out: './src/db/migrations',
	driver: 'better-sqlite',
	breakpoints: true,
	dbCredentials: {
		url: '/Users/kevin/code/src/github/kevmok/bun-elysia-rest-api/sqlite.db',
	},
} satisfies Config;
