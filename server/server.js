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
  try {
    const query = await db.query(`SELECT * FROM comments`);
    res.json(query.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server is borked' });
  }
});

app.get('/comments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(`SELECT * FROM comments WHERE id = $1`, [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server is borked' });
  }
});

app.post('/comments', async (req, res) => {
  const {
    data: { name, description },
  } = req.body;

  const { rows } = await db.query(
    `INSERT INTO comments (name, description) VALUES ($1, $2) RETURNING *`,
    [name, description]
  );

  res.json(rows[0]);
});

app.delete('/comments', async (req, res) => {
  const { id } = req.body;
  // this is a rework of this https://abedshamia.hashnode.dev/crud-rest-api-application-using-nodejs-expressjs-and-postgresql-the-beginners-guide#heading-deleteproduct
  try {
    const result = await db.query('DELETE FROM comments WHERE id = $1', [id]);

    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Delete request processed' });
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
