import { Elysia, t } from 'elysia';
import { Database } from 'bun:sqlite';

console.log('Hello via Bun!');

const db = new Database('sqlite.db');
const query1 = db.query(`CREATE TABLE IF NOT EXISTS Persons (
	PersonID int,
	LastName varchar(255),
	FirstName varchar(255),
	Address varchar(255),
	City varchar(255)
);`);
query1.run();
db.query(
	`INSERT INTO Persons (PersonID, LastName, FirstName, Address, City) VALUES (2, 'Dode', 'John', '123 Main St', 'Anytown');`,
).run();

const query = db.query('SELECT * FROM Persons');
console.log(query.all()); // => { message: "Hello world" }
const app = new Elysia()
	.guard({
		response: t.Object({
			message: t.String(),
			status: t.Number(),
		}),
	})
	.get('/', ({ set }) => {
		set.status = 200;
		set.headers['x-powered-by'] = 'Elysia';

		return { message: 'It works!', status: 200 };
	})
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
