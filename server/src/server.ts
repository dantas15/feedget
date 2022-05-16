import express from 'express';
import { config } from 'dotenv';
import { prisma } from './prisma';

config();
const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());

app.post('/feedbacks', async (request, response) => {
  const { type, comment, screenshot } = request.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  return response.status(201).json({ data: feedback });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
