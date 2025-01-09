import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(
    '<h1 style="color: red; text-align: center;">This is the root route</h1>'
  );
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
