import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const dbConnectionString = process.env.DATABASE_URL;
const db = new pg.Pool({
  connectionString: dbConnectionString,
});

db.query(`INSERT INTO comments (name, description)
VALUES
('Tom Jones', 'This is a bad place to stay'),
('John Smith', 'This is a hell hole'),
('Jane Doe', 'This is a great place'),
('Dave Adams', 'How do people want to pay for this')`);
