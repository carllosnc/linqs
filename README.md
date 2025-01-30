[![Linqs](https://github.com/carllosnc/linqs/actions/workflows/bun.yml/badge.svg)](https://github.com/carllosnc/linqs/actions/workflows/bun.yml)

# Linqs

>a simple way to organize and share links

## What's in the box?

- Next.js 15
- React 19
- Tailwind CSS
- Drizzle ORM
- Auth.js
- Bun

## First steps

Before you start, you need to create a `.env.local` file in the root of the project and add the following variables:

**Turso database connection**
```
NEXT_PUBLIC_TURSO_DATABASE_URL=""
NEXT_PUBLIC_TURSO_AUTH_TOKEN=""
```
**Auth.js config**
```
AUTH_DRIZZLE_URL=""
AUTH_SECRET=""
```
**Google auth config**
```
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
```

Google auth is the default auth provider.

## Development

**Database**

To start the database, you need to run the following command:

```bash
turso dev
```

This will start the database in development mode. To more details about turso, you can check the [turso documentation](https://docs.turso.tech/introduction).


**Database generation and migration**

To generate the database schema and run the migration, you need to run the following commands:

Generation
```bash
bun run generate
```

Migration
```bash
bun run migrate
```

The commands are abstraction of drizzle-kit commands, you can check the [drizzle-kit documentation](https://orm.drizzle.team/docs/kit-overview) for more details.

**Server**

To start the server:

```bash
bun run dev
```

## Test

To run the tests:

```bash
bun run test
```

This commands is configured to run with the correct environment variables file.

---

Carlos Costa @ 2025
