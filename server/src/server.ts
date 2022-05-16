import express from 'express';
import { routes } from './routes';
import { config } from 'dotenv';

config();
const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
