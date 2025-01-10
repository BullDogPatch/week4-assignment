import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const dbConnectionString = process.env.DATABASE_URL;
const db = new pg.Pool({
  connectionString: dbConnectionString,
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(
    '<h1 style="color: red; text-align: center;">This is the root route</h1>'
  );
});

app.get('/comments', async (req, res) => {
  const query = await db.query(`SELECT * FROM comments`);
  res.json(query.rows);
});

app.post('/comments', (req, res) => {
  const {
    data: { name, description },
  } = req.body;
  console.log(name, description);
  res.json({ status: 'Message received' });
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
