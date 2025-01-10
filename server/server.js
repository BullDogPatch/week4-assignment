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

app.post('/comments', async (req, res) => {
  const {
    data: { name, description },
  } = req.body;

  // Destructure rows from comment at later point
  const comment = await db.query(
    `INSERT INTO comments (name, description) VALUES ($1, $2) RETURNING *`,
    [name, description]
  );

  res.json(comment.rows[0]);
});

app.delete('/comments', async (req, res) => {
  const { id } = req.body;
  try {
    const result = await db.query('DELETE FROM comments WHERE id = $1', [id]);

    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Delete request processed' });
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
});

// not sure if RETURNING * is needed as if I want to log I need it, but without RETURNING * it still goes to supabase and get my data on localhost

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
