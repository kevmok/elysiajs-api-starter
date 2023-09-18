<div align="center">
<h1>Bun Starter REST API</h1>
  <p>This is a <a href="https://bun.sh" target="_blank">bun.sh</a> project bootstrapped with <code>bun init</code>, featuring <a href="https://orm.drizzle.team/" target="_blank"><b>Drizzle ORM</b></a> and <a href="https://elysiajs.com/" target="_blank"><b>ElysiaJS</b></a> setup. <br/> Start developing right away!</p>
</div>

## 📱 Packed template
- 🍞 **Bun**
- ⛓️ **TypeScript**
- 💧 **Drizzle ORM**
- 🦊 **ElysiaJS** - ⚡️ Fastest Typescript framework
- 🌳 **Biome** for linting, formatting, and sorting imports
- 🐺 **Husky** pre-commit hooks

[![CodeFactor](https://www.codefactor.io/repository/github/kevmok/elysiajs-api-starter/badge)](https://www.codefactor.io/repository/github/kevmok/elysiajs-api-starter)

## ⚠️ Pre-requisites

1. [Bun](https://bun.sh) installed.

## 🚀 Quick start

To install dependencies:

```bash
bun install
```

To run the development server:

```bash
bun run dev
```

## 💧 Drizzle

1. Create your schemas in `src/db/schema` see [Drizzle Docs](https://orm.drizzle.team/docs/sql-schema-declaration) for more info.
2. Generate your migrations based on your schemas by running the following command:

```bash
bun run db:generate
```

3. Push your schema changes directly to the database by running the following command:

```bash
bun run db:push
```

4. (Optional) Run Drizzle Kit studio to manage your database by running the following command(see [Drizzle Kit Studio Docs](https://orm.drizzle.team/drizzle-studio/overview) for more info.):

```bash
bun run db:studio
```

## License
This project is licensed under the MIT License.
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)