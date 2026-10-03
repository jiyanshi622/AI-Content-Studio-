import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema.ts';

// Add global connection pool caching to persist across hot-reloads
declare global {
  var _postgresPool: Pool | undefined;
}

export const isDbConfigured = Boolean(
  process.env.SQL_HOST && process.env.SQL_USER && process.env.SQL_DB_NAME
);

// Function to create or retrieve the connection pool.
export const createPool = () => {
  if (!isDbConfigured) {
    return null;
  }

  if (!global._postgresPool) {
    global._postgresPool = new Pool({
      host: process.env.SQL_HOST,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DB_NAME,
      max: 10,
      connectionTimeoutMillis: 5000,
    });

    // Prevent unhandled pool-level errors from crashing the application
    global._postgresPool.on('error', (err) => {
      console.warn('Unexpected error on idle SQL pool client:', err?.message || err);
    });
  }
  return global._postgresPool;
};

// Create or retrieve the pool instance if configured.
const pool = createPool();

let dbInstance: any;
if (pool) {
  try {
    dbInstance = drizzle(pool, { schema });
  } catch (err) {
    console.warn('[AI Studio] Database connection could not be established — using mock');
  }
}

export const db = dbInstance;

