import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL); // neon is a client for the Neon Database -> initializing the neon client

// drizzle is a library for interacting with the database using the neon client
const db = drizzle(sql);

export { db, sql };