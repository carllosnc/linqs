import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config({ path: './.env.local', override: true });

export default defineConfig({
  out: './drizzle',
  schema: [
    './src/db/user-schema.ts',
  ],
  dialect: 'turso',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_TURSO_DATABASE_URL as string,
    authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN as string,
  },
});