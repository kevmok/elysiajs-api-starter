import { BunSQLiteDatabase, drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';

// create the connection
const sqlite = new Database('sqlite.db');
export const db: BunSQLiteDatabase = drizzle(sqlite, {
	logger: true,
});
