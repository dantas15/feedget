import express from 'express';
import { config } from 'dotenv';

config();
const PORT = process.env.PORT || 3333;

const app = express();

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
