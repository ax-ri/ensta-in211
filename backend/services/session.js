import sqlite3 from 'sqlite3';
import session from 'express-session';
import sqliteStoreFactory from 'express-session-sqlite';

const SqliteStore = sqliteStoreFactory.default(session);

console.log(process.cwd());
export function main(app) {
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET || 'session-secret',
      cookie: {
        secure: false,
        httpOnly: true,
      },
      store: new SqliteStore({
        driver: sqlite3.Database,
        // for in-memory database
        // path: ':memory:'
        path: '/tmp/sessions.sqlite',
        // Session TTL in milliseconds
        ttl: 5_000,
        prefix: 'sess:',
        cleanupInterval: 30_000,
      }),
    }),
  );
}
