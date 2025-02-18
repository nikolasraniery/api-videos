import pgPromise from 'pg-promise';
import 'dotenv/config';

const pgp = pgPromise();
const db = pgp({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
});

export { db };
